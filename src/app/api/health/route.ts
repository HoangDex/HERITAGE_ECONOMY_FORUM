import { NextResponse } from "next/server";
import { prismaService } from "@/services";

export async function GET() {
  const startTime = Date.now();
  const dbHealth = await prismaService.healthCheck();
  const responseTime = `${Date.now() - startTime}ms`;

  return NextResponse.json(
    {
      status: dbHealth.connected ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      responseTime,
      database: {
        type: "MySQL",
        orm: "Prisma 7",
        adapter: "@prisma/adapter-mariadb",
        connected: dbHealth.connected,
        pool: dbHealth.poolStatus,
        error: dbHealth.error || null,
      },
      system: {
        nodeVersion: process.version,
        uptime: `${Math.floor(process.uptime())}s`,
        memoryUsage: {
          rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024)}MB`,
          heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
        },
      },
    },
    { status: dbHealth.connected ? 200 : 503 }
  );
}
