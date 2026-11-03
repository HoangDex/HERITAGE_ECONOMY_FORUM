# Hướng Dẫn Cơ Sở Dữ Liệu: Prisma 7 & MySQL Pool Adapter

Tài liệu này hướng dẫn chi tiết về cấu hình, kiến trúc và cách vận hành cơ sở dữ liệu MySQL bằng **Prisma 7** trong dự án **Heritage Economy Forum**.

---

## 1. Điểm Mới Quan Trọng Trong Prisma 7

Prisma 7 giới thiệu bước tiến lớn về hiệu năng và phân tách trách nhiệm:

1. **Loại bỏ `url` khỏi `schema.prisma`**:
   - `schema.prisma` chỉ định nghĩa cấu trúc dữ liệu (`generator` & `model`).
   - Đường dẫn kết nối migrate được chuyển sang file trung tâm `prisma.config.ts`.
2. **Hỗ trợ Driver Adapters chính thức**:
   - Thay vì sử dụng binary Rust engine nặng nề quản lý connection ngầm, Prisma 7 sử dụng Driver Adapter thuần JavaScript/TypeScript (`@prisma/adapter-mariadb`).
   - Cho phép kết nối trực tiếp với các connection pool hiệu năng cao của Node.js.

---

## 2. Cấu Trúc Thư Mục Cơ Sở Dữ Liệu

Thư mục Prisma được đặt ngang cấp với `src/features`:

```
HERITAGE_ECONOMY_FORUM/
├── prisma.config.ts            # Cấu hình datasource tập trung (dành cho Prisma CLI)
└── src/
    ├── prisma/                 # Thư mục Prisma (Ngang cấp với src/features)
    │   ├── schema.prisma       # Mô hình thực thể & Generator Client
    │   └── seed.ts             # Script gieo mầm dữ liệu mẫu
    ├── lib/
    │   └── prisma.ts           # Singleton PrismaClient kết nối MySQL Connection Pool
    └── services/
        └── prisma.service.ts   # Service kiểm tra sức khỏe Pool (Health check)
```

---

## 3. Cấu Hình MySQL Connection Pool (`src/lib/prisma.ts`)

Để tránh cạn kiệt connection pool khi Next.js Fast Refresh/HMR ở môi trường development:

```ts
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import mariadb, { type Pool } from "mariadb";

function createMySQLPool(): Pool {
  const rawUrl =
    process.env.DATABASE_URL || "mysql://root:password@localhost:3306/heritage_economy_forum";
  const connectionString = rawUrl.replace(/^mysql:\/\//i, "mariadb://");

  return mariadb.createPool(connectionString);
}

function createPrismaClient(): { client: PrismaClient; pool: Pool } {
  const pool = global.__mysqlPool ?? createMySQLPool();
  const adapter = new PrismaMariaDb(pool);

  const client = new PrismaClient({ adapter });
  return { client, pool };
}
```

---

## 4. Các Lệnh CLI Thường Dùng

```bash
# 1. Sinh Prisma Client từ schema (Chạy mỗi khi cập nhật schema.prisma)
pnpm prisma:generate

# 2. Kiểm tra cú pháp schema & prisma.config.ts
pnpm prisma:validate

# 3. Chạy migration cập nhật bảng vào MySQL
pnpm prisma:migrate

# 4. Gieo mầm dữ liệu mẫu (Seeding)
pnpm db:seed

# 5. Mở giao diện trực quan Prisma Studio
pnpm prisma:studio

# 6. Chạy script demo kiểm tra kết nối & CRUD độc lập
pnpm demo:prisma
```

---

## 5. Bảng Dữ Liệu Chính

- **`users`**: Quản lý tài khoản, mật khẩu, vai trò (`USER`, `EXPERT`, `POLICYMAKER`, `ADMIN`) và đơn vị công tác.
- **`posts`**: Bài thảo luận, chuyên mục, tags, số lượt thích, số lượt xem, trạng thái ghim đầu trang.
- **`post_upvotes`**: Quản lý trạng thái like bài viết chống gian lận lặp lại (`@@unique([postId, userId])`).
- **`comments`**: Ý kiến phản hồi chuyên môn cho bài viết.
- **`heritage_projects`**: Dự án kinh tế di sản, địa bàn, quy mô doanh thu, số việc làm tạo lập và tỷ lệ trích quỹ trùng tu.
