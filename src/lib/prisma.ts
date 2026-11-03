import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import mariadb, { type Pool } from "mariadb";

declare global {
  var __prisma: PrismaClient | undefined;
  var __mysqlPool: Pool | undefined;
}

/**
 * Phân tích cấu hình và khởi tạo MySQL / MariaDB Connection Pool
 */
function createMySQLPool(): Pool {
  const rawUrl =
    process.env.DATABASE_URL ||
    `mysql://${process.env.DATABASE_USER || "root"}:${process.env.DATABASE_PASSWORD || "password"}@${process.env.DATABASE_HOST || "localhost"}:${process.env.DATABASE_PORT || 3306}/${process.env.DATABASE_NAME || "heritage_economy_forum"}`;

  // Chuẩn hóa giao thức kết nối cho mariadb connector
  const connectionString = rawUrl.replace(/^mysql:\/\//i, "mariadb://");

  return mariadb.createPool(connectionString);
}

/**
 * Khởi tạo Prisma Client v7 sử dụng Adapter Pool MySQL (PrismaMariaDb)
 */
function createPrismaClient(): { client: PrismaClient; pool: Pool } {
  const pool = global.__mysqlPool ?? createMySQLPool();
  const adapter = new PrismaMariaDb(pool);

  const client = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

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
