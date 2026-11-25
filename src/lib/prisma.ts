import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import mariadb, { type Pool } from "mariadb";

declare global {
  var __prisma: PrismaClient | undefined;
  var __mysqlPool: Pool | undefined;
  var __dbLastFailureTimestamp: number | undefined;
}

const CIRCUIT_BREAKER_COOLDOWN_MS = 30000; // 30 giây ngắt mạch nếu CSDL offline

/**
 * Kiểm tra trạng thái sức khỏe kết nối CSDL (Circuit Breaker)
 * Trả về false nếu vừa có lỗi kết nối trong 30 giây qua, giúp kích hoạt fallback in-memory tức thời trong 0.001ms
 */
export function isDatabaseHealthy(): boolean {
  const lastFailure = global.__dbLastFailureTimestamp || 0;
  if (lastFailure === 0) return true;
  return Date.now() - lastFailure > CIRCUIT_BREAKER_COOLDOWN_MS;
}

export function recordDatabaseSuccess(): void {
  global.__dbLastFailureTimestamp = 0;
}

export function recordDatabaseFailure(): void {
  global.__dbLastFailureTimestamp = Date.now();
}

/**
 * Phân tích cấu hình và khởi tạo MySQL / MariaDB Connection Pool
 */
function createMySQLPool(): Pool {
  const rawUrl =
    process.env.DATABASE_URL ||
    `mysql://${process.env.DATABASE_USER || "root"}:${process.env.DATABASE_PASSWORD || "root"}@${process.env.DATABASE_HOST || "localhost"}:${process.env.DATABASE_PORT || 3306}/${process.env.DATABASE_NAME || "heritage_economy_forum_db"}`;

  try {
    const parsed = new URL(rawUrl.replace(/^mariadb:\/\//i, "http://").replace(/^mysql:\/\//i, "http://"));
    return mariadb.createPool({
      host: parsed.hostname || "localhost",
      port: parsed.port ? Number(parsed.port) : 3306,
      user: decodeURIComponent(parsed.username || "root"),
      password: decodeURIComponent(parsed.password || "root"),
      database: parsed.pathname.replace(/^\//, "") || "heritage_economy_forum_db",
      acquireTimeout: 1200, // Timeout nhanh trong 1.2s thay vì 20s
      connectTimeout: 1200,
      connectionLimit: 10,
    });
  } catch {
    return mariadb.createPool({
      host: process.env.DATABASE_HOST || "localhost",
      port: Number(process.env.DATABASE_PORT) || 3306,
      user: process.env.DATABASE_USER || "root",
      password: process.env.DATABASE_PASSWORD || "root",
      database: process.env.DATABASE_NAME || "heritage_economy_forum_db",
      acquireTimeout: 1200,
      connectTimeout: 1200,
      connectionLimit: 10,
    });
  }
}

/**
 * Khởi tạo Prisma Client v7 sử dụng Adapter Pool MySQL (PrismaMariaDb)
 */
function createPrismaClient(): { client: PrismaClient; pool: Pool } {
  const pool = global.__mysqlPool ?? createMySQLPool();
  const adapter = new PrismaMariaDb(pool);

  const rawClient = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

  // Tích hợp Circuit Breaker thông qua Query Extensions của Prisma 7
  const client = (rawClient as any).$extends({
    query: {
      $allModels: {
        async $allOperations({ query, args }: { query: (args: unknown) => Promise<unknown>; args: unknown }) {
          if (!isDatabaseHealthy()) {
            throw new Error("DATABASE_CIRCUIT_BREAKER_OPEN: CSDL đang ở trạng thái ngắt mạch (Offline)");
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
  global.__prisma && global.__mysqlPool
    ? { client: global.__prisma, pool: global.__mysqlPool }
    : createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.__prisma = prismaInstance;
  global.__mysqlPool = poolInstance;
}

export const prisma = prismaInstance;
export const mysqlPool = poolInstance;
export { PrismaClient };
export default prisma;
