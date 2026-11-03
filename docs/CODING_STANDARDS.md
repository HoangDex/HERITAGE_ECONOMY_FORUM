# Quy Chuẩn Lập Trình & Phong Cách Mã Nguồn (Coding Standards)

Tài liệu này quy định cấu trúc code, quy ước định dạng Request/Response, chuẩn múi giờ Việt Nam và cấu hình công cụ tự động format cho dự án **Heritage Economy Forum**.

---

## 1. Chuẩn Hóa API Response & Datetime Việt Nam

Mọi API Route Handler trong thư mục `src/app/api/` BẮT BUỘC sử dụng các tiện ích từ `src/lib/api-response.ts`.

### 1.1 Cấu Trúc Response Thành Công

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Lấy danh sách dự án thành công",
  "data": [ ... ],
  "meta": {
    "timestamp": "2026-11-03T11:30:00.000+07:00",
    "timestampFormatted": "03/11/2026 11:30:00",
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 45,
      "totalPages": 5,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

### 1.2 Cấu Trúc Response Lỗi Xác Thực (HTTP 422)

```json
{
  "success": false,
  "statusCode": 422,
  "error": "Tên dự án phải có ít nhất 5 ký tự",
  "message": "Lỗi xác thực dữ liệu đầu vào",
  "errors": {
    "name": ["Tên dự án phải có ít nhất 5 ký tự"],
    "jobsCreated": ["Số việc làm không được âm"]
  },
  "data": null,
  "meta": {
    "timestamp": "2026-11-03T11:30:00.000+07:00",
    "timestampFormatted": "03/11/2026 11:30:00"
  }
}
```

### 1.3 Cách Sử Dụng Trong Code

```ts
import { apiSuccess, apiPaginated, apiValidationError, apiError } from "@/lib/api-response";

// Thành công có phân trang:
return apiPaginated(items, { page, limit, total });

// Thành công đơn:
return apiSuccess(item, { statusCode: 201, message: "Tạo thành công" });

// Lỗi Zod:
if (!validation.success) return apiValidationError(validation.error);

// Lỗi hệ thống:
return apiError("Không tìm thấy dữ liệu", 404);
```

---

## 2. Tiện Ích Ngày Giờ Việt Nam (`src/lib/format-date.ts`)

Sử dụng thống nhất cho toàn bộ UI và backend:

- `formatDateTimeVN(date)`: "03/11/2026 14:30:25"
- `formatDateVN(date)`: "03/11/2026"
- `formatTimeVN(date)`: "14:30:25"
- `formatRelativeTimeVN(date)`: "vừa xong", "15 phút trước", "hôm qua lúc 09:30"

---

## 3. Cấu Hình Tự Động Định Dạng Code (Prettier)

Dự án đã cấu hình Prettier tập trung tại `.prettierrc`:

- Dấu nháy kép (`singleQuote: false`)
- Có dấu chấm phẩy (`semi: true`)
- Độ dài dòng: `printWidth: 100`
- Tab: 2 khoảng trắng (`tabWidth: 2`)

### Lệnh Format:

```bash
# Tự động format toàn bộ mã nguồn
pnpm format

# Kiểm tra định dạng (dùng cho CI/CD)
pnpm format:check
```

---

## 4. Hướng Dẫn Tạo Một Feature Module Mới

Khi tạo thêm module mới (ví dụ: `src/features/workshop/`):

1. **Bước 1 (Types)**: Tạo `types/workshop.types.ts` khai báo Entity, DTOs, `IWorkshopRepository`, `IWorkshopService`.
2. **Bước 2 (Schemas)**: Tạo `schemas/workshop.schema.ts` với Zod validation.
3. **Bước 3 (Repositories)**: Tạo `repositories/workshop.repository.ts` thao tác với Prisma Client.
4. **Bước 4 (Services)**: Tạo `services/workshop.service.ts` xử lý logic nghiệp vụ.
5. **Bước 5 (Actions & APIs)**: Tạo `actions/workshop.actions.ts` và Route Handlers tại `src/app/api/workshop/route.ts`.
6. **Bước 6 (Hooks & UI)**: Tạo `hooks/use-workshop.ts` và các Component trong `components/`.
7. **Bước 7 (Barrel Export)**: Export tất cả qua `src/features/workshop/index.ts`.
8. **Bước 8**: Chạy `pnpm format` và `pnpm lint` kiểm tra.
