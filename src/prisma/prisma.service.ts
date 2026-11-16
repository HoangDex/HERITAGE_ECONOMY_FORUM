import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import mariadb, { type Pool } from "mariadb";

declare global {
  var __prisma: PrismaClient | undefined;
  var __mysqlPool: Pool | undefined;
}

/**
 * Khởi tạo MySQL / MariaDB Connection Pool với cấu hình tối ưu hiệu năng
 */
export function createMySQLPool(): Pool {
  const rawUrl =
    process.env.DATABASE_URL ||
    `mysql://${process.env.DATABASE_USER || "root"}:${process.env.DATABASE_PASSWORD || "root"}@${process.env.DATABASE_HOST || "localhost"}:${process.env.DATABASE_PORT || 3306}/${process.env.DATABASE_NAME || "heritage_economy_forum_db"}`;

  // Chuẩn hóa giao thức kết nối cho mariadb connector driver
  const connectionString = rawUrl.replace(/^mysql:\/\//i, "mariadb://");

  return mariadb.createPool(connectionString);
}

/**
 * Khởi tạo Singleton Prisma Client kết hợp với Adapter MariaDb / MySQL Pool
 */
export function createPrismaClient(): { client: PrismaClient; pool: Pool } {
  const pool = global.__mysqlPool ?? createMySQLPool();
  const adapter = new PrismaMariaDb(pool);

  const client = new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

  return { client, pool };
}

// Khởi tạo hoặc tái sử dụng Singleton qua global object (ngăn tràn pool trong Next.js HMR)
const { client: prismaInstance, pool: poolInstance } =
  global.__prisma && global.__mysqlPool
    ? { client: global.__prisma, pool: global.__mysqlPool }
    : createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.__prisma = prismaInstance;
  global.__mysqlPool = poolInstance;
}

/**
 * Lớp PrismaService chuyên biệt trong thư mục src/prisma/
 * Quản trị kết nối, adapter pool, healthcheck và đóng kết nối an toàn
 */
export class PrismaService {
  public readonly client: PrismaClient = prismaInstance;
  public readonly pool: Pool = poolInstance;

  /**
   * Kiểm tra tình trạng kết nối tới CSDL MySQL và thông số Connection Pool
   */
  async healthCheck(): Promise<{
    connected: boolean;
    poolStatus: {
      totalConnections: number;
      activeConnections: number;
      idleConnections: number;
    };
    latencyMs?: number;
    error?: string;
  }> {
    const start = performance.now();
    try {
      await this.client.$queryRaw`SELECT 1`;
      const latencyMs = Math.round(performance.now() - start);
      return {
        connected: true,
        latencyMs,
        poolStatus: {
          totalConnections: this.pool.totalConnections(),
          activeConnections: this.pool.activeConnections(),
          idleConnections: this.pool.idleConnections(),
        },
      };
    } catch (error) {
      return {
        connected: false,
        poolStatus: {
          totalConnections: this.pool.totalConnections(),
          activeConnections: this.pool.activeConnections(),
          idleConnections: this.pool.idleConnections(),
        },
        error: error instanceof Error ? error.message : "Database connection failed",
      };
    }
  }

  /**
   * Chạy transaction an toàn với Prisma Client
   */
  async transaction<T>(
    fn: (tx: Parameters<Parameters<PrismaClient["$transaction"]>[0]>[0]) => Promise<T>
  ): Promise<T> {
    return this.client.$transaction(fn);
  }

  /**
   * Ngắt kết nối Prisma Client và giải phóng Connection Pool
   */
  async disconnect(): Promise<void> {
    await this.client.$disconnect();
    await this.pool.end();
  }
}

// Export singleton instance và các hằng số dùng chung
export const prismaService = new PrismaService();
export const prisma = prismaInstance;
export const mysqlPool = poolInstance;

export default prismaService;
