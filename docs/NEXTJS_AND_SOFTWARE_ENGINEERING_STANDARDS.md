# Quy Chuẩn Lập Trình Next.js & Kỹ Thuật Phần Mềm (Software Engineering Standards)

Tài liệu này là cẩm nang kỹ thuật toàn diện, quy định các nguyên lý công nghệ phần mềm (Software Engineering Principles), kiến trúc phân lớp sạch (Clean Architecture) và thực hành chuẩn mực trong hệ sinh thái **Next.js App Router (Fullstack)**, **React 19**, **TypeScript** và **Prisma 7**.

---

## PHẦN I: NGUYÊN LÝ THIẾT KẾ PHẦN MỀM (SOFTWARE ENGINEERING PRINCIPLES)

Mọi dòng code trong dự án phải được thiết kế dựa trên các nguyên lý kỹ nghệ chuẩn mực:

### 1. Nguyên Lý SOLID Trong Hệ Thống Fullstack TypeScript

#### S - Single Responsibility Principle (Đơn Trách Nhiệm)

Mỗi lớp, hàm, và module chỉ đảm nhiệm duy nhất một lý do để thay đổi:

- **Repository**: Chỉ chịu trách nhiệm giao tiếp cơ sở dữ liệu (Database I/O). Không chứa nghiệp vụ tính toán hay logic định dạng.
- **Service**: Chỉ chịu trách nhiệm về quy tắc nghiệp vụ (Business Rules), tính toán và logic ứng dụng. Không phụ thuộc vào request/response của HTTP hay UI.
- **Server Action / Controller**: Chỉ chịu trách nhiệm nhận request, kích hoạt validation, gọi service, và trả response.
- **Component**: Chỉ chịu trách nhiệm hiển thị giao diện và nhận tương tác từ người dùng.

#### O - Open/Closed Principle (Mở Rộng Nhưng Đóng Kín)

Hệ thống mở để mở rộng tính năng mới nhưng đóng kín trước việc sửa đổi các module cốt lõi đã chạy ổn định:

- Sử dụng Interface Contracts (`IHeritageRepository`, `IHeritageService`).
- Khi cần thay đổi cơ chế lưu trữ (ví dụ từ MySQL sang PostgreSQL hoặc MongoDB), chỉ cần viết một Repository mới triển khai cùng Interface mà không cần sửa một dòng code nào trong `HeritageService`.

#### L - Liskov Substitution Principle (Thay Thế Liskov)

Các triển khai cụ thể của một Interface phải có khả năng thay thế lẫn nhau mà không làm hỏng tính đúng đắn của chương trình:

- `HeritageRepository` (sử dụng Prisma MySQL) và `MockHeritageRepository` (dùng trong Unit Test) đều triển khai `IHeritageRepository` và có hành vi hợp đồng giống hệt nhau.

#### I - Interface Segregation Principle (Phân Tách Interface)

Client không bị ép buộc phải phụ thuộc vào các interface mà nó không sử dụng:

- Tách nhỏ các DTOs: `CreateHeritageDTO` (chỉ chứa các trường cần khi tạo mới), `UpdateHeritageDTO` (các trường partial), `HeritageFilterDTO` (các tham số truy vấn tìm kiếm).

#### D - Dependency Inversion Principle (Đảo Ngược Phụ Thuộc)

Các module cấp cao (Service) không được phụ thuộc vào module cấp thấp (Repository cụ thể). Cả hai phải phụ thuộc vào abstraction (Interface):

```ts
// TỐT: Service phụ thuộc vào Interface contract qua Dependency Injection
export class HeritageService implements IHeritageService {
  constructor(private readonly repository: IHeritageRepository = heritageRepository) {}
}

// KHÔNG TỐT: Khởi tạo trực tiếp PrismaClient hoặc class cụ thể bên trong Service
export class BadHeritageService {
  private db = new PrismaClient(); // Vi phạm DIP!
}
```

---

### 2. Các Nguyên Lý Bổ Trợ: DRY, KISS & YAGNI

1. **DRY (Don't Repeat Yourself)**:
   - Tái sử dụng logic xác thực bằng Zod schemas chung.
   - Chuẩn hóa định dạng phản hồi qua `src/lib/api-response.ts`.
   - Chuẩn hóa xử lý thời gian qua `src/lib/format-date.ts`.
   - _Lưu ý_: Không áp dụng DRY một cách cực đoan nếu hai đoạn code có bản chất nghiệp vụ khác nhau và có thể phát triển theo hai hướng độc lập.

2. **KISS (Keep It Simple, Stupid)**:
   - Ưu tiên cấu trúc code rõ ràng, dễ đọc hơn là các kỹ thuật meta-programming hay abstraction quá mức phức tạp.
   - Tránh lồng ghép quá nhiều toán tử ba ngôi (ternary operators) trong JSX.

3. **YAGNI (You Aren't Gonna Need It)**:
   - Chỉ xây dựng những tính năng và abstraction thực sự cần thiết cho nghiệp vụ hiện tại. Không dự đoán quá xa những thứ chưa có yêu cầu thực tế.

---

## PHẦN II: TIÊU CHUẨN NEXT.JS APP ROUTER & REACT 19

### 1. Mô Hình Quyết Định Server Components vs Client Components

```
                    ┌──────────────────────────────────┐
                    │  Component có cần tương tác UI?  │
                    │  (useState, useEffect, onClick)  │
                    └────────────────┬─────────────────┘
                                     │
                    ┌────────────────┴────────────────┐
                    │                                 │
                   Có                               Không
                    │                                 │
                    ▼                                 ▼
      ┌───────────────────────────┐     ┌───────────────────────────┐
      │     CLIENT COMPONENT      │     │     SERVER COMPONENT      │
      │    Thêm "use client"      │     │      Mặc định 100%        │
      │   Đẩy xuống node lá (leaf)│     │  Fetch trực tiếp DB/API   │
      └───────────────────────────┘     │ Zero client-side JS bundle│
                                        └───────────────────────────┘
```

### 2. Data Fetching Chuẩn: Zero Network Latency

Trong Server Component (như `src/app/heritage/page.tsx`), **TUYỆT ĐỐI KHÔNG** dùng `fetch("http://localhost:3000/api/heritage")` vì sẽ gây lãng phí một vòng lặp mạng HTTP (Network Roundtrip).
Thay vào đó, gọi trực tiếp Service Layer trên server:

```tsx
// CHUẨN: Gọi trực tiếp Service trên server (Độ trễ 0ms network)
export default async function HeritagePage() {
  const projects = await heritageService.getProjects();
  return <HeritageGrid projects={projects} />;
}
```

### 3. Server Actions & Form Mutations An Toàn

1. Khai báo `"use server"`.
2. Bắt buộc validate input bằng Zod:
   ```ts
   export async function myAction(input: MyInput) {
     const validation = mySchema.safeParse(input);
     if (!validation.success) {
       return { success: false, error: validation.error.issues[0]?.message };
     }
     const result = await myService.execute(validation.data);
     revalidatePath("/my-path");
     return { success: true, data: result };
   }
   ```
3. Phía Client Component, luôn bọc Server Action bằng `useTransition`:
   ```tsx
   const [isPending, startTransition] = useTransition();

   const handleSubmit = () => {
     startTransition(async () => {
       const res = await myAction(data);
       if (res.success) {
         /* cập nhật UI */
       }
     });
   };
   ```

### 4. Xử Lý Bất Đồng Bộ Trong React 19 & Tránh Lỗi Linter

1. **Không gọi setState đồng bộ trong `useEffect`**: Sẽ gây cascading renders làm giảm hiệu năng và bị React Compiler từ chối.
2. **Cơ chế chống Race Condition**: Khi fetch dữ liệu trong `useEffect`, luôn sử dụng cờ dọn dẹp `ignore`:
   ```tsx
   useEffect(() => {
     let ignore = false;
     async function load() {
       const data = await fetchData();
       if (!ignore) setState(data);
     }
     load();
     return () => {
       ignore = true;
     };
   }, [deps]);
   ```

### 5. Dynamic Routing & Tối Ưu SEO

Với Next.js mới, route params là một Promise:

```tsx
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await myService.getBySlug(slug);
  if (!item) return { title: "Không tìm thấy" };
  return {
    title: `${item.name} | Heritage Economy Forum`,
    description: item.description.slice(0, 160),
  };
}

export default async function DetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = await myService.getBySlug(slug);
  if (!item) notFound();
  return <DetailView item={item} />;
}
```

---

## PHẦN III: QUY CHUẨN CƠ SỞ DỮ LIỆU & PRISMA 7

1. **Kiến trúc Datasource Prisma 7**:
   - File `src/prisma/schema.prisma` chỉ khai báo `provider = "mysql"`, **KHÔNG** chứa `url`.
   - File `prisma.config.ts` chịu trách nhiệm cấu hình URL migrate và seed CLI.
2. **Quản lý Connection Pool**:
   - Sử dụng Driver Adapter `@prisma/adapter-mariadb` kết nối thư viện `mariadb`.
   - Giữ singleton instance trong `src/lib/prisma.ts` trên biến `globalThis` để tránh rò rỉ connection khi reload dev server.
3. **Graceful Fallback**:
   - Mọi thao tác Database trong Repository phải có khối `try/catch`.
   - Khi MySQL chưa được bật trên máy lập trình viên, tự động fallback dữ liệu mẫu thay vì làm sập trang web.

---

## PHẦN IV: ĐỊNH DẠNG DỮ LIỆU & BẢN ĐỊA HÓA (LOCALIZATION)

1. **Múi giờ bắt buộc**: `Asia/Ho_Chi_Minh` (GMT+7).
2. **Format ngày tháng**:
   - Toàn diện: `DD/MM/YYYY HH:mm:ss` (sử dụng `formatDateTimeVN()`).
   - Ngắn gọn: `DD/MM/YYYY` (sử dụng `formatDateVN()`).
   - Nhân văn: `formatRelativeTimeVN()` ("vừa xong", "15 phút trước", "hôm qua lúc...").
3. **Cấu trúc Response**:
   Mọi API Route Handler phải tuân thủ schema `StandardApiResponse`:
   ```ts
   {
     success: boolean;
     statusCode: number;
     message?: string;
     data?: T;
     error?: string;
     errors?: Record<string, string[]>;
     meta: {
       timestamp: string;      // ISO String với offset +07:00
       timestampFormatted: string; // "DD/MM/YYYY HH:mm:ss"
       pagination?: PaginationMeta;
     }
   }
   ```

---

## PHẦN V: QUY TRÌNH KIỂM SOÁT CHẤT LƯỢNG MÃ NGUỒN (QA / VERIFICATION)

Trước khi hoàn tất bất kỳ task lập trình nào (dù do AI hay lập trình viên thực hiện), **BẮT BUỘC** chạy và vượt qua 3 lệnh kiểm tra sau:

```bash
# 1. Tự động format toàn bộ mã nguồn
pnpm format

# 2. Kiểm tra type an toàn TypeScript (Yêu cầu 0 lỗi)
pnpm exec tsc --noEmit

# 3. Kiểm tra quy tắc Lint & React Compiler (Yêu cầu 0 warnings, 0 errors)
pnpm lint
```
