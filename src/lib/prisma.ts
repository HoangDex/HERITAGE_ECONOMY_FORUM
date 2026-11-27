import net from "node:net";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import mariadb, { type Pool } from "mariadb";

declare global {
  var __prisma: PrismaClient | undefined;
  var __mysqlPool: Pool | undefined;
  var __prismaVersion: number | undefined;
  var __dbLastFailureTimestamp: number | undefined;
  var __dbLastSuccessTimestamp: number | undefined;
  var __dbProbePromise: Promise<boolean> | undefined;
}

const PRISMA_SINGLETON_VERSION = 2;

const CIRCUIT_BREAKER_COOLDOWN_MS = 30000; // 30 giây ngắt mạch nếu CSDL offline
const SUCCESS_CACHE_MS = 5000; // 5 giây cache trạng thái healthy

/**
 * Kiểm tra trạng thái sức khỏe kết nối CSDL (Circuit Breaker)
 * Trả về false nếu vừa có lỗi kết nối trong 30 giây qua, giúp kích hoạt fallback in-memory tức thời
 */
export function isDatabaseHealthy(): boolean {
  const lastFailure = global.__dbLastFailureTimestamp || 0;
  if (lastFailure === 0) return true;
  return Date.now() - lastFailure > CIRCUIT_BREAKER_COOLDOWN_MS;
}

export function recordDatabaseSuccess(): void {
  global.__dbLastFailureTimestamp = 0;
  global.__dbLastSuccessTimestamp = Date.now();
}

export function recordDatabaseFailure(): void {
  global.__dbLastFailureTimestamp = Date.now();
  global.__dbLastSuccessTimestamp = 0;
}

function getDbConfig() {
  const rawUrl =
    process.env.DATABASE_URL ||
    `mysql://${process.env.DATABASE_USER || "root"}:${process.env.DATABASE_PASSWORD || "root"}@${process.env.DATABASE_HOST || "localhost"}:${process.env.DATABASE_PORT || 3306}/${process.env.DATABASE_NAME || "heritage_economy_forum_db"}`;

  try {
    const parsed = new URL(
      rawUrl.replace(/^mariadb:\/\//i, "http://").replace(/^mysql:\/\//i, "http://")
    );
    return {
      host: parsed.hostname || "localhost",
      port: parsed.port ? Number(parsed.port) : 3306,
      user: decodeURIComponent(parsed.username || "root"),
      password: decodeURIComponent(parsed.password || "root"),
      database: parsed.pathname.replace(/^\//, "") || "heritage_economy_forum_db",
    };
  } catch {
    return {
      host: process.env.DATABASE_HOST || "localhost",
      port: Number(process.env.DATABASE_PORT) || 3306,
      user: process.env.DATABASE_USER || "root",
      password: process.env.DATABASE_PASSWORD || "root",
      database: process.env.DATABASE_NAME || "heritage_economy_forum_db",
    };
  }
}

function checkTcpPort(host: string, port: number, timeoutMs = 250): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let settled = false;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      resolve(ok);
    };
    socket.setTimeout(timeoutMs);
    socket.once("connect", () => finish(true));
    socket.once("timeout", () => finish(false));
    socket.once("error", () => finish(false));
    socket.connect(port, host);
  });
}

async function ensureDatabaseReachable(): Promise<boolean> {
  if (!isDatabaseHealthy()) {
    return false;
  }

  const lastSuccess = global.__dbLastSuccessTimestamp || 0;
  if (lastSuccess > 0 && Date.now() - lastSuccess < SUCCESS_CACHE_MS) {
    return true;
  }

  if (!global.__dbProbePromise) {
    const { host, port } = getDbConfig();
    global.__dbProbePromise = checkTcpPort(host, port, 250)
      .then((ok) => {
        if (ok) {
          recordDatabaseSuccess();
        } else {
          recordDatabaseFailure();
        }
        return ok;
      })
      .finally(() => {
        global.__dbProbePromise = undefined;
      });
  }

  return global.__dbProbePromise;
}

/**
 * Phân tích cấu hình và khởi tạo MySQL / MariaDB Connection Pool
 */
function createMySQLPool(): Pool {
  const cfg = getDbConfig();
  return mariadb.createPool({
    host: cfg.host,
    port: cfg.port,
    user: cfg.user,
    password: cfg.password,
    database: cfg.database,
    acquireTimeout: 1000,
    connectTimeout: 1000,
    connectionLimit: Number(process.env.DATABASE_CONNECTION_LIMIT) || 10,
  });
}

/**
 * Khởi tạo Prisma Client v7 sử dụng Adapter Pool MySQL (PrismaMariaDb)
 */
function createPrismaClient(): { client: PrismaClient; pool: Pool } {
  const pool = global.__mysqlPool ?? createMySQLPool();
  const adapter = new PrismaMariaDb(pool);

  const rawClient = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn"] : [],
  });

  // Tích hợp Circuit Breaker + Single-Flight TCP Probe thông qua Query Extensions của Prisma 7
  const client = (rawClient as unknown as { $extends: (ext: unknown) => PrismaClient }).$extends({
    query: {
      $allModels: {
        async $allOperations({
          query,
          args,
        }: {
          query: (args: unknown) => Promise<unknown>;
          args: unknown;
        }) {
          const reachable = await ensureDatabaseReachable();
          if (!reachable) {
            throw new Error(
              "DATABASE_CIRCUIT_BREAKER_OPEN: CSDL đang ở trạng thái ngắt mạch (Offline)"
            );
          }
          try {
            const res = await query(args);
            recordDatabaseSuccess();
            return res;
          } catch (error) {
            recordDatabaseFailure();
            throw error;
          }
        },
      },
    },
  }) as PrismaClient;

  return { client, pool };
}

const { client: prismaInstance, pool: poolInstance } =
  global.__prisma &&
  global.__mysqlPool &&
  global.__prismaVersion === PRISMA_SINGLETON_VERSION
    ? { client: global.__prisma, pool: global.__mysqlPool }
    : createPrismaClient();

global.__prisma = prismaInstance;
global.__mysqlPool = poolInstance;
global.__prismaVersion = PRISMA_SINGLETON_VERSION;

export const prisma = prismaInstance;
export const mysqlPool = poolInstance;
export { PrismaClient };
export default prisma;
