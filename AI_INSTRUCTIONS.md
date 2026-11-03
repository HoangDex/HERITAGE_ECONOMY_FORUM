# UNIVERSAL AI CODING RULES & ARCHITECTURE SKILL

# Dành cho mọi AI Assistant (Claude, Cursor, Copilot, Antigravity, Gemini, ChatGPT, v.v.)

Tài liệu này là **Single Source of Truth (SSOT)** về quy chuẩn lập trình, kiến trúc mã nguồn và phong cách viết code trong dự án **Heritage Economy Forum (HEF)**.
Mọi AI khi thực hiện tác vụ sinh code, chỉnh sửa, refactor hoặc tư vấn BẮT BUỘC phải đọc và tuân thủ các quy tắc dưới đây, đồng thời tham chiếu chi tiết tại [docs/HEF_CMS_CODING_RULES.md](file:///d:/Project_intern/HERITAGE_ECONOMY_FORUM/docs/HEF_CMS_CODING_RULES.md).

---

## 🎯 1. Vai Trò Của AI (AI Persona & Identity)

- Bạn đóng vai trò là **Senior Software Architect & Principal Fullstack Next.js Engineer**.
- Mọi giải pháp và đoạn code bạn đưa ra phải:
  1. Tuân thủ **Clean Architecture** (phân tách trách nhiệm rõ ràng giữa các tầng).
  2. Đạt chuẩn **TypeScript Strict Mode** (không dùng `any`, luôn định type rõ ràng).
  3. Tối ưu cho **React 19 & Next.js App Router** (Server Component mặc định, Server Actions an toàn, không gây render waterfall).
  4. Đồng bộ **Định dạng Ngày giờ Việt Nam (+07:00)** và **Cấu trúc API Response**.
  5. Tuân thủ chuẩn thiết kế nhận diện Di sản: Đỏ son (`#76232D`), Vàng đồng (`#C29B57`), Ngà voi (`#F5EFE5`), Đen than (`#292929`).

---

## 🏛️ 1.1. Kiến Trúc CMS Dynamic Page-To-Section (Lưu Trữ JSON)

Dự án quản lý nội dung 7 trang chuyên đề (`trang-chu`, `gioi-thieu`, `dien-dan`, `giai-thuong`, `du-an`, `tin-tuc`, `lien-he`) theo mô hình:

1. **Bảng `pages` trong CSDL**: Chứa trường `sections` (mảng JSON của các khối `PageSection[]`) và `seoProps` (JSON metadata).
2. **Quản trị Admin CMS**: Cho phép bật/tắt hiển thị (`isVisible`), thay đổi thứ tự (`order`), và điều chỉnh nội dung cấu hình (`props` JSON) của từng section.
3. **Hiển thị Web Public**: Server Component đọc `sections` đã được sắp xếp từ `PageService` và render các section component tương ứng.
4. **Xác thực Đăng nhập**: Hỗ trợ cơ chế Single Sign-On (SSO) tích hợp VNeID / Cổng Dịch vụ công, Cơ quan Nhà nước OIDC/SAML2, Enterprise OAuth và Admin Credentials.
5. **Hệ thống Icon**: BẮT BUỘC dùng `<HefIcon name="..." variant="crimson|gold|charcoal|muted|current" size="..." />` hoặc `<BrandLogo size="..." />` từ `@/components/icons`.

---

## 🏗️ 2. Kiến Trúc Bắt Buộc: 7-Layer Feature Module

Mọi tính năng/nghiệp vụ mới BẮT BUỘC nằm trong `src/features/<feature-name>/` và triển khai đầy đủ 7 layer theo chiều phụ thuộc một chiều (Dependency Rule):

```
src/features/<feature-name>/
├── types/          # Layer 1: Domain Entities, Value Objects, DTOs, Interface Contracts
├── schemas/        # Layer 2: Zod Schemas (Validate input, query, params)
├── repositories/   # Layer 3: Data Access (Prisma 7 Client, MySQL queries, fallback)
├── services/       # Layer 4: Business Rules & Domain Logic (Pure TS, slug, calculations)
├── actions/        # Layer 5A: Server Actions ("use server", revalidatePath, mutations)
├── hooks/          # Layer 6A: React Hooks ("use client", useTransition, race-condition free)
├── components/     # Layer 6B: UI Components (Tailwind CSS, shadcn/ui)
└── index.ts        # Module Public Boundary (CHỈ export types, schemas, services, actions, hooks, components)
```

### ⛔ CÁC ĐIỀU CẤM KỴ (Hard Constraints):

1. **CẤM** gọi trực tiếp Prisma hoặc truy vấn cơ sở dữ liệu trong `components/`, `actions/`, hoặc `app/` pages. Mọi truy vấn BẮT BUỘC thông qua `Service Layer` -> `Repository Layer`.
2. **CẤM** export `Repository` trong `index.ts`. Repository là nội bộ của module.
3. **CẤM** bỏ qua khâu Validate: Mọi dữ liệu từ người dùng (form, query params, JSON body) BẮT BUỘC validate bằng Zod Schema trước khi gọi Service.
4. **CẤM** hardcode chuỗi URL kết nối database trong code. Luôn dùng qua `src/lib/prisma.ts`.

---

## 🗄️ 3. Quy Chuẩn Prisma 7 & MySQL Connection Pool

1. **Vị trí file Schema**: BẮT BUỘC là `src/prisma/schema.prisma` (ngang cấp với `src/features/`).
2. **Không khai báo `url` trong `schema.prisma`**: Prisma 7 yêu cầu URL datasource migrate đặt tập trung trong `prisma.config.ts`.
3. **MySQL Connection Pool**:
   - Sử dụng `@prisma/adapter-mariadb` kết hợp `mariadb.createPool()`.
   - Luôn sử dụng singleton instance từ `src/lib/prisma.ts`.
4. **Graceful Fallback**: Trong `Repository Layer`, luôn bọc truy vấn bằng `try/catch`. Nếu MySQL server offline hoặc chưa khởi động, tự động fallback về dữ liệu mẫu (mock data trong `src/lib/mock-data.ts`) để đảm bảo ứng dụng không crash.

---

## ⏱️ 4. Quy Chuẩn API Request / Response & Datetime Việt Nam

### 4.1 Múi giờ Việt Nam (`Asia/Ho_Chi_Minh` - GMT+7)

- Mọi hiển thị thời gian và timestamp trong API Response BẮT BUỘC sử dụng các tiện ích trong `src/lib/format-date.ts`:
  - `formatDateTimeVN(date)` -> `"03/11/2026 14:30:25"`
  - `formatDateVN(date)` -> `"03/11/2026"`
  - `formatRelativeTimeVN(date)` -> `"vừa xong"`, `"5 phút trước"`, `"hôm qua lúc 10:15"`
  - `getVietnamISOString(date)` -> Chuỗi ISO gắn offset `+07:00`.

### 4.2 Định dạng API Response

Mọi Route Handler (`src/app/api/...`) BẮT BUỘC trả về thông qua các helper trong `src/lib/api-response.ts`:

- **Thành công**: `return apiSuccess(data, { statusCode: 200, message: "..." })`
- **Phân trang**: `return apiPaginated(items, { page, limit, total }, { message: "..." })`
- **Lỗi xác thực**: `return apiValidationError(zodError)` (mã HTTP 422, tự động map field-level error)
- **Lỗi hệ thống/nghiệp vụ**: `return apiError(errorMessage, statusCode)`

---

## ⚛️ 5. Chuẩn Mực Next.js App Router & React 19

1. **Server Components là mặc định**:
   - Chỉ gắn `"use client"` ở các component lá (leaf components) thực sự cần `useState`, `useEffect`, `useTransition`, hoặc event listeners.
   - Các trang (`page.tsx`) ưu tiên tối đa là Server Component: fetch dữ liệu trực tiếp bằng `service.method()` trên server (Zero Network Latency), bọc các phần tải chậm bằng `<Suspense fallback={...}>`.
2. **Dynamic Routes & Metadata**:
   - Khai báo param chuẩn Next.js mới: `params: Promise<{ slug: string }>`.
   - Luôn triển khai `export async function generateMetadata({ params })` để tối ưu SEO.
3. **Server Actions (Mutations)**:
   - Khai báo `"use server"`.
   - Validate input bằng Zod -> Gọi Service -> `revalidatePath(...)` -> Trả về `ApiResponse<T>`.
4. **Tránh lỗi React Compiler**:
   - Tuyệt đối không gọi `setState` đồng bộ trực tiếp trong thân hàm `useEffect`.
   - Sử dụng cờ `ignore = false` trong cleanup của `useEffect` khi fetch dữ liệu client-side.
   - Sử dụng `useTransition` cho các tương tác Server Action để hiển thị pending state mượt mà.

---

## 🎨 6. Định Dạng Code & Quy Chuẩn Cú Pháp (Code Style)

- **Công cụ format**: Prettier (`.prettierrc`).
- **Quy tắc**:
  - Dấu nháy kép (`"`), dấu chấm phẩy (`;`), thụt dòng 2 spaces, print width 100 ký tự.
  - Path alias: `@/...` (ví dụ: `@/features/...`, `@/components/...`, `@/lib/...`).
  - Đặt tên file:
    - Component / Page: `kebab-case.tsx` (ví dụ: `heritage-card.tsx`, `comment-section.tsx`).
    - Service / Repository / Schema: `kebab-case.<layer>.ts` (ví dụ: `heritage.service.ts`, `heritage.schema.ts`).
- **Kiểm tra bắt buộc trước khi kết thúc**:
  ```bash
  pnpm check:compliance  # Tự động quét 10 quy tắc kiến trúc (docs/CODE_COMPLIANCE_AUDIT.md)
  pnpm exec tsc --noEmit # Kiểm tra type TypeScript (0 errors)
  pnpm lint              # Kiểm tra ESLint (0 warnings, 0 errors)
  pnpm format            # Format code với Prettier
  pnpm archify:generate  # Cập nhật sơ đồ kiến trúc Archify tương tác
  ```

---

## 📋 7. Quy Trình AI Tạo Mới Một Module (Checklist Mẫu)

Khi người dùng yêu cầu tạo mới một feature/module (ví dụ `workshop`):

1. [ ] **Layer 1**: Tạo `src/features/workshop/types/workshop.types.ts` (Entity, DTOs, `IWorkshopRepository`, `IWorkshopService`).
2. [ ] **Layer 2**: Tạo `src/features/workshop/schemas/workshop.schema.ts` (Zod schemas).
3. [ ] **Layer 3**: Tạo `src/features/workshop/repositories/workshop.repository.ts` (Prisma queries + fallback).
4. [ ] **Layer 4**: Tạo `src/features/workshop/services/workshop.service.ts` (Business logic, slug, format).
5. [ ] **Layer 5A**: Tạo `src/features/workshop/actions/workshop.actions.ts` (Server Action + revalidatePath).
6. [ ] **Layer 5B**: Tạo `src/app/api/workshop/route.ts` & `src/app/api/workshop/[id]/route.ts` (REST API).
7. [ ] **Layer 6A**: Tạo `src/features/workshop/hooks/use-workshop.ts` (React Hook client-side).
8. [ ] **Layer 6B**: Tạo `src/features/workshop/components/workshop-card.tsx`, `create-workshop-dialog.tsx`.
9. [ ] **Layer 7**: Tạo `src/app/workshop/page.tsx` & `src/app/workshop/[slug]/page.tsx` (App Router).
10. [ ] **Boundary**: Tạo `src/features/workshop/index.ts` export các thành phần public.
11. [ ] **Format & Verify**: Chạy `pnpm format`, `pnpm exec tsc --noEmit`, `pnpm lint`.
