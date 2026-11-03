# Trung Tâm Tài Liệu Dự Án (Documentation Index)

Chào mừng bạn đến với bộ tài liệu kỹ thuật của **Heritage Economy Forum**. Vui lòng tham khảo các tài liệu chuyên đề chi tiết dưới đây:

---

### 📚 Danh Mục Tài Liệu Kỹ Thuật

1. [**Bộ Quy Tắc Phát Triển Bắt Buộc & Kiến Trúc CMS (HEF Mandatory Coding Rules)**](./HEF_CMS_CODING_RULES.md) 🌟 _(Tài liệu quan trọng nhất)_
   - Kiến trúc Dynamic Page-to-Section JSON CMS (7 trang chuyên đề, bảng `pages` CSDL).
   - Quy chuẩn 7 Layer và cú pháp Function Signature bắt buộc.
   - Design tokens: Đỏ son (`#76232D`), Vàng đồng (`#C29B57`), Ngà voi (`#F5EFE5`), Đen than (`#292929`).
   - Icon Component System (`HefIcon`, `BrandLogo`) và Xác thực Đơn điểm SSO (VNeID, Gov IdP, Enterprise).

2. [**Kiến Trúc Phần Mềm & Chuẩn Mực Next.js (Software Engineering Standards)**](./NEXTJS_AND_SOFTWARE_ENGINEERING_STANDARDS.md)
   - Áp dụng nguyên lý SOLID, DRY, KISS, YAGNI trong fullstack TypeScript.
   - Chuẩn mực Next.js App Router (Server vs Client Components, Server Actions an toàn, SEO động).
   - Xử lý bất đồng bộ trong React 19, chống race condition và cascading renders.

3. [**Kiến Trúc Phân Lớp Sạch & Feature Apps (Clean Architecture)**](./ARCHITECTURE.md)
   - Chi tiết cấu trúc 7 Layer trong mỗi Feature module.
   - Sơ đồ dòng dữ liệu từ User/Browser đến MySQL Database.
   - Nguyên tắc ranh giới module (Module Boundary) và Barrel Export.

4. [**Cơ Sở Dữ Liệu: Prisma 7 & MySQL Connection Pool**](./PRISMA7_DATABASE.md)
   - Điểm mới của Prisma 7 (chuyển đổi datasource migrate sang `prisma.config.ts`).
   - Cấu hình Connection Pool hiệu năng cao với `@prisma/adapter-mariadb`.
   - Danh sách bảng, schema và quy trình migration, seeding.

5. [**Quy Chuẩn Code & Định Dạng Request/Response (Coding Standards)**](./CODING_STANDARDS.md)
   - Cấu trúc chuẩn hóa API Response (`apiSuccess`, `apiPaginated`, `apiValidationError`, `apiError`).
   - Quy chuẩn múi giờ và định dạng ngày giờ Việt Nam (`Asia/Ho_Chi_Minh` - GMT+7).
   - Hướng dẫn cấu hình Prettier, format tự động và checklist tạo module mới.

6. [**Hướng Dẫn & Checklist Kiểm Tra Tuân Thủ Code (Compliance Audit)**](./CODE_COMPLIANCE_AUDIT.md) 🔍
   - Công cụ tự động quét 10 quy tắc kiến trúc (`pnpm check:compliance`).
   - Ma trận 10 tiêu chí tuân thủ bắt buộc trước khi commit/merge.
   - Hướng dẫn khắc phục nhanh khi phát hiện vi phạm ranh giới layer.

7. [**Đặc Tả Toàn Bộ Luồng Dự Án (Project End-to-End Workflow)**](./PROJECT_WORKFLOW.md) ⚡
   - Sơ đồ luồng xác thực SSO (VNeID / CQNN / Entra).
   - Quy trình quản trị kéo thả Dynamic Section JSON trong CMS.
   - Luồng biên dịch SSR từ database JSON lên giao diện Web Public.
   - Vòng đời hồ sơ giải thưởng và bình chọn trực tuyến.

8. [**Sơ Đồ Kiến Trúc & Flow Archify Tương Tác (Archify System Visualizer)**](./architecture/hef-architecture.html) 🗺️
   - Mô hình hóa hệ thống bằng Archify JSON IR ([`hef-system-architecture.archify.json`](./architecture/hef-system-architecture.archify.json) & [`hef-flow.archify.json`](./architecture/hef-flow.archify.json)).
   - **Chế độ 1**: _Modular Architecture_ (6 Boundaries, 11 Components).
   - **Chế độ 2**: _Project End-to-End Flow_ (4 Giai đoạn, 8 Bước luân chuyển nghiệp vụ khép kín).
   - Lệnh tự động tái tạo sơ đồ: `pnpm archify:generate`.

---

### 🤖 Bộ Quy Tắc AI Cho Mọi Trợ Lý (Universal AI Coding Rules)

Dự án cung cấp bộ quy tắc AI mở, dùng chung cho **MỌI công cụ AI** thay vì chỉ phụ thuộc vào một phần mềm cố định:

- [**`AI_INSTRUCTIONS.md` (Root)**](../AI_INSTRUCTIONS.md): Tài liệu hướng dẫn AI cốt lõi (Single Source of Truth) dành cho ChatGPT, Gemini, Claude, Cursor, Copilot, DeepSeek, Antigravity, v.v.
- [**`CLAUDE.md`**](../CLAUDE.md): File hướng dẫn cho Claude Code CLI & Claude Desktop.
- [**`.github/copilot-instructions.md`**](../.github/copilot-instructions.md): File cấu hình cho GitHub Copilot.
- [**`.cursorrules`**](../.cursorrules): File cấu hình cho Cursor IDE.
- [**`.agent/skills/heritage-code-standards/SKILL.md`**](../.agent/skills/heritage-code-standards/SKILL.md): Bộ kỹ năng định dạng chuẩn cho Google Antigravity & Agentic systems.

---

### ⚡ Lệnh Thao Tác Nhanh

```bash
pnpm dev              # Chạy dev server
pnpm format           # Tự động format toàn bộ code với Prettier
pnpm lint             # Kiểm tra lỗi lint
pnpm prisma:generate  # Sinh mã Prisma Client từ src/prisma/schema.prisma
pnpm db:seed          # Gieo mầm dữ liệu mẫu
pnpm demo:prisma      # Kiểm thử kết nối & dịch vụ DB độc lập
```
