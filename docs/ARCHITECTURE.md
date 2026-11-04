# Kiến Trúc Hệ Thống: Clean Architecture & Feature Apps

Dự án **Heritage Economy Forum** được xây dựng dựa trên sự kết hợp giữa **Next.js App Router (Fullstack)** và **Clean Architecture (Kiến trúc phân tầng sạch)** nhằm giải quyết bài toán mở rộng lâu dài, dễ kiểm thử và làm việc song song giữa nhiều thành viên.

---

## 1. Tổng Quan Mô Hình Kiến Trúc

> **Sơ đồ trực quan tương tác (Archify HTML):**
>
> - 🏛️ **Kiến trúc hệ thống:** [`docs/architecture/hef-architecture.html`](./architecture/hef-architecture.html)
> - Sinh lại sơ đồ: `pnpm run archify:generate`

Hệ thống được tổ chức theo từng domain nghiệp vụ độc lập đặt tại `src/features/`. Mỗi module đóng gói toàn bộ vòng đời của nó từ Định nghĩa Dữ liệu, Xác thực, Nghiệp vụ, Truy cập cơ sở dữ liệu đến Giao diện người dùng.

```
                  ┌─────────────────────────────────────┐
                  │          USER / BROWSER             │
                  └──────────────────┬──────────────────┘
                                     │
           ┌─────────────────────────┴─────────────────────────┐
           ▼                                                   ▼
┌─────────────────────────────────────┐   ┌─────────────────────────────────────┐
│       NEXT.JS APP ROUTER PAGES      │   │       REST API ROUTE HANDLERS       │
│  src/app/heritage/page.tsx          │   │  src/app/api/heritage/route.ts      │
│  (Server Components + Suspense)     │   │  (GET, POST, PUT, DELETE)           │
└──────────────────┬──────────────────┘   └──────────────────┬──────────────────┘
                   │                                         │
                   │ Calls Server Action or Service          │
                   ▼                                         ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                      LAYER 2: VALIDATION LAYER (Zod)                          │
│  - createHeritageSchema, heritageFilterSchema                                 │
│  - Chặn đứng dữ liệu sai ngay tại cổng vào, trả về field-level errors (422)   │
└──────────────────────────────────────┬────────────────────────────────────────┘
                                       ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                   LAYER 4: BUSINESS LOGIC / SERVICE LAYER                     │
│  - HeritageService (Triển khai IHeritageService)                              │
│  - Xử lý nghiệp vụ: Sinh slug tiếng Việt, tính toán chỉ số kinh tế            │
└──────────────────────────────────────┬────────────────────────────────────────┘
                                       ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                  LAYER 3: DATA ACCESS / REPOSITORY LAYER                      │
│  - HeritageRepository (Triển khai IHeritageRepository)                        │
│  - Giao tiếp cơ sở dữ liệu qua Prisma 7 Client                                │
│  - Tích hợp MySQL Connection Pool (@prisma/adapter-mariadb)                  │
│  - Graceful Fallback dữ liệu khi chưa bật DB MySQL                            │
└──────────────────────────────────────┬────────────────────────────────────────┘
                                       ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                    DATABASE & DRIVER ADAPTER (MySQL Pool)                     │
│  - src/lib/prisma.ts (Singleton Connection Pool)                              │
│  - src/prisma/schema.prisma (Models: User, Post, HeritageProject)             │
└───────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Trách Nhiệm Từng Tầng (Layer Responsibilities)

| Tầng (Layer)                  | Vị trí thư mục                        | Trách nhiệm chính                                                                                                          |
| :---------------------------- | :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------- |
| **Layer 1: Types & Entities** | `src/features/<module>/types/`        | Định nghĩa Domain Entities, Value Objects, DTOs và Interface contracts (`IRepository`, `IService`).                        |
| **Layer 2: Validation**       | `src/features/<module>/schemas/`      | Sử dụng Zod để kiểm tra tính hợp lệ của dữ liệu đầu vào trước khi tiến hành xử lý logic.                                   |
| **Layer 3: Repository**       | `src/features/<module>/repositories/` | Chịu trách nhiệm duy nhất về lưu trữ và truy vấn database (Prisma Client). Giấu kín chi tiết SQL/Prisma khỏi tầng Service. |
| **Layer 4: Service**          | `src/features/<module>/services/`     | Nơi tập trung toàn bộ quy tắc nghiệp vụ (Business Rules), tính toán và logic ứng dụng độc lập với framework.               |
| **Layer 5A: Server Actions**  | `src/features/<module>/actions/`      | Next.js Server Actions dành cho các tương tác form mutation, revalidate cache (`revalidatePath`).                          |
| **Layer 5B: REST API**        | `src/app/api/<module>/`               | Cung cấp RESTful API endpoint cho các ứng dụng ngoài hoặc client fetch động.                                               |
| **Layer 6A: React Hooks**     | `src/features/<module>/hooks/`        | Custom hooks quản lý state, data-fetching, transition client-side.                                                         |
| **Layer 6B: UI Components**   | `src/features/<module>/components/`   | Giao diện tương tác người dùng xây dựng trên Tailwind CSS và shadcn/ui.                                                    |
| **Layer 7: App Router Pages** | `src/app/<module>/`                   | Routing, Server-side rendering, generateMetadata SEO và React Suspense.                                                    |

---

## 3. Ranh Giới Module (Module Boundary & Barrel Export)

Mỗi module trong `src/features/<module>/index.ts` chỉ export ra bên ngoài những thành phần cần thiết:

- **ĐƯỢC EXPORT**: Types, Schemas, Service Instance, Server Actions, React Hooks, UI Components.
- **KHÔNG EXPORT**: Repository Implementation (để đảm bảo không tầng nào bên ngoài có thể gọi tắt vượt mặt Service).

Ví dụ import đúng:

```ts
// Tốt: Import qua barrel export
import { heritageService, HeritageCard, useHeritageProjects } from "@/features/heritage";
```

---

## 4. Dòng Dữ Liệu Thực Tế (Data Flow Examples)

### Luồng 1: Server Component Rendering (Trang Danh mục Dự án)

1. Người dùng truy cập URL `/heritage`.
2. Next.js thực thi `src/app/heritage/page.tsx` trên Server.
3. Server Component gọi trực tiếp `heritageService.getProjects()`.
4. `heritageService` gọi `heritageRepository.findAll()`.
5. `heritageRepository` truy vấn MySQL qua Prisma 7 pool adapter.
6. Dữ liệu được render thành HTML gửi về trình duyệt với **độ trễ 0ms network API**.

### Luồng 2: Form Mutation tạo Dự án mới (Server Action)

1. Người dùng mở Dialog, điền form và bấm "Lưu dự án".
2. Client Component gọi Server Action `createHeritageProjectAction(formData)`.
3. Server Action gọi `createHeritageSchema.safeParse(input)`. Nếu sai, trả về lỗi ngay.
4. Server Action chuyển tiếp dữ liệu hợp lệ cho `heritageService.createProject()`.
5. `heritageService` tự động sinh slug tiếng Việt không dấu duy nhất.
6. `heritageRepository.create()` thực thi lệnh INSERT vào MySQL.
7. Server Action gọi `revalidatePath("/heritage")` để làm mới cache trang.
8. Trả về `ApiResponse<HeritageProject>` có gắn nhãn thời gian Việt Nam.
