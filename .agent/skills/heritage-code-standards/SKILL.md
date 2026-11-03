---
name: heritage-code-standards
description: Strict coding standards, layered clean architecture, Prisma 7 patterns, and syntax rules for the Heritage Economy Forum fullstack codebase. Use whenever creating or modifying code in this project.
---

# Heritage Economy Forum - Bộ Quy Tắc Code Chuẩn (Coding Standards)

Bộ quy tắc này bắt buộc áp dụng cho toàn bộ AI Agents và Lập trình viên khi tạo mới, sửa đổi hoặc sinh code trong dự án **Heritage Economy Forum (HEF)**.
Chi tiết đầy đủ tham chiếu tại tài liệu bắt buộc: `docs/HEF_CMS_CODING_RULES.md`.

---

## 0. Quy Chuẩn Nhận Diện Thương Hiệu & Giao Diện (Design Tokens)

- **Màu sắc chủ đạo**:
  - Đỏ son (Crimson): `#76232D` (Primary button, headers, highlight).
  - Vàng đồng (Gold): `#C29B57` (Borders, accent icons, badges).
  - Ngà voi (Ivory): `#F5EFE5` (Page background, subtle cards).
  - Đen than (Charcoal): `#292929` (Body text, deep contrast).
- **Typography**:
  - Tiêu đề: Phông có chân Serif (`font-serif`, Playfair Display, Cinzel, Merriweather, Times New Roman).
  - Nội dung: Phông không chân Sans-serif (`font-sans`, `Be Vietnam Pro`, `Inter`).
- **Icon Component**: BẮT BUỘC dùng `<HefIcon />` và `<BrandLogo />` từ `@/components/icons`.
- **SSO Login**: Giao diện đăng nhập hỗ trợ VNeID / Dịch vụ công, Cổng CQNN OIDC/SAML2, Enterprise OAuth và Admin credentials.

---

## 1. Kiến Trúc Phân Lớp Module (Clean Layered Architecture)

Mọi module nghiệp vụ trong `src/features/<feature-name>/` BẮT BUỘC tuân thủ đúng 7 Layer:

```
src/features/<feature-name>/
├── types/          # Layer 1: Domain Entities, DTOs, Repository/Service Interfaces
├── schemas/        # Layer 2: Zod Schemas (input/query validation & type inference)
├── repositories/   # Layer 3: Data Access Layer (Prisma 7 Client, database queries, fallback)
├── services/       # Layer 4: Business Logic (slug generation, calculations, validation rules)
├── actions/        # Layer 5A: Next.js Server Actions ("use server", revalidatePath, mutations)
├── hooks/          # Layer 6A: React Client Hooks ("use client", state management, SWR/fetch)
├── components/     # Layer 6B: Presentation UI (shadcn/ui, forms, cards, dialogs)
└── index.ts        # Clean Boundary Barrel Export (chỉ export những gì public)
```

### Nguyên tắc ranh giới (Boundary Rules):

1. **Không truy cập trực tiếp Database từ Component/Action**: Luôn thông qua `Service Layer` và `Repository Layer`.
2. **Không bypass Validation**: Mọi payload và query string BẮT BUỘC validate bằng Zod Schema trước khi gọi Service.
3. **App Router đóng vai trò Routing**: Thư mục `src/app/` chỉ làm nhiệm vụ Routing và Layout, delegate toàn bộ UI cho `src/features/`.

---

## 2. Tiêu Chuẩn Prisma 7 & MySQL Connection Pool

1. **Vị trí Schema**: BẮT BUỘC đặt tại `src/prisma/schema.prisma` (ngang cấp với `src/features`).
2. **Không khai báo `url` trong `schema.prisma`**: Prisma 7 cấm thuộc tính `url` trong datasource. Connection URL migrate được đặt trong `prisma.config.ts`.
3. **MySQL Connection Pool**:
   - Sử dụng `@prisma/adapter-mariadb` kết hợp `mariadb.createPool()`.
   - Luôn sử dụng singleton instance từ `src/lib/prisma.ts`.
   - Hỗ trợ cả định dạng `mysql://` và `mariadb://`.
4. **Graceful Fallback**: Trong Repository, luôn bọc try/catch gọi database; nếu MySQL chưa kết nối thì fallback dữ liệu bộ nhớ để môi trường dev không bị crash.

---

## 3. Chuẩn Hóa Request / Response & Datetime Việt Nam

1. **Response định dạng chuẩn**:
   Mọi REST API Route Handler (`src/app/api/...`) BẮT BUỘC sử dụng các helper từ `src/lib/api-response.ts`:
   - `apiSuccess(data, { statusCode: 200, message: "..." })`
   - `apiPaginated(items, { page, limit, total }, { message: "..." })`
   - `apiError(errorMessage, statusCode)`
   - `apiValidationError(zodError)` (tự động map lỗi từng field, HTTP 422)

2. **Datetime Việt Nam (GMT+7 - Asia/Ho_Chi_Minh)**:
   - Mọi metadata trả về từ API phải có:
     - `timestamp`: ISO String UTC+7 (ví dụ: `2026-11-03T11:30:00.000+07:00`)
     - `timestampFormatted`: Định dạng `DD/MM/YYYY HH:mm:ss` (ví dụ: `03/11/2026 11:30:00`)
   - Khi hiển thị trên UI, sử dụng các helper từ `src/lib/format-date.ts`:
     - `formatDateTimeVN(date)`
     - `formatDateVN(date)`
     - `formatRelativeTimeVN(date)` ("vừa xong", "5 phút trước", "hôm qua lúc...")

---

## 4. Quy Chuẩn Cú Pháp & Code Style (Syntax Guidelines)

1. **Imports & Aliases**:
   - Sử dụng path alias `@/...`:
     - `@/features/...`
     - `@/components/...`
     - `@/lib/...`
     - `@/types/...`
     - `@/services/...`
   - Tuyệt đối không dùng relative import quá 2 cấp (tránh `../../../`).

2. **React 19 & Next.js Server Components**:
   - Server Component là mặc định; chỉ thêm `"use client"` khi có tương tác (hooks, event handlers).
   - Server Actions BẮT BUỘC có `"use server"` ở đầu file hoặc đầu hàm.
   - Tránh gọi `setState` đồng bộ ngay trong `useEffect` để tuân thủ React Compiler.
   - Sử dụng `useTransition` cho các hành động mutation Server Action.

3. **Format Code**:
   - Luôn chạy `pnpm format` trước khi commit.
   - Thụt lề 2 spaces, dấu nháy kép `"`, luôn có dấu chấm phẩy `;`.
