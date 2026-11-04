import { defineConfig } from "prisma/config";

// Tự động nạp biến môi trường từ file .env vào process.env
if (typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile(".env");
  } catch {
    // Bỏ qua nếu môi trường không có file .env
  }
}

export default defineConfig({
  schema: "src/prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL || "mysql://root:root@localhost:3306/heritage_economy_forum_db",
  },
});
