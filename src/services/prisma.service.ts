import { prisma, mysqlPool } from "@/lib/prisma";

export class PrismaService {
  public readonly client = prisma;
  public readonly pool = mysqlPool;

  /**
   * Kiểm tra trạng thái kết nối MySQL Database Pool
   */
  async healthCheck(): Promise<{
    connected: boolean;
    poolStatus: {
      totalConnections: number;
      activeConnections: number;
      idleConnections: number;
    };
    error?: string;
  }> {
    try {
      await this.client.$queryRaw`SELECT 1`;
      return {
        connected: true,
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
   * Đóng kết nối Prisma và MySQL Pool khi cần giải phóng tài nguyên
   */
  async disconnect(): Promise<void> {
    await this.client.$disconnect();
    await this.pool.end();
  }
}

export const prismaService = new PrismaService();
