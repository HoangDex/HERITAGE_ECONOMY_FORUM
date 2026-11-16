# Heritage Economy Forum (Diễn đàn Kinh tế Di sản)

Nền tảng Fullstack kết nối đối thoại chính sách, bảo tồn thích ứng và thúc đẩy các mô hình kinh tế di sản văn hóa bền vững tại Việt Nam.

---

## 📚 Bộ Tài Liệu Kỹ Thuật (Architecture & Guidelines)

Dự án cung cấp bộ tài liệu kỹ thuật chi tiết theo chuẩn công nghệ phần mềm tại thư mục [`docs/`](./docs/):

- 📐 [**Chuẩn Mực Kỹ Thuật Phần Mềm & Next.js (SOLID, Clean Code, React 19)**](./docs/NEXTJS_AND_SOFTWARE_ENGINEERING_STANDARDS.md)
- 🏛️ [**Kiến Trúc Hệ Thống (Clean Architecture 7-Layer & Feature Apps)**](./docs/ARCHITECTURE.md)
- 🎨 [**Quy Chuẩn Thiết Kế & Hệ Thống UI/UX (Design System Guidelines)**](./DESIGN.md)
- 🗄️ [**Cơ Sở Dữ Liệu: Prisma 7 & MySQL Pool Adapter**](./docs/PRISMA7_DATABASE.md)
- ⏱️ [**Quy Chuẩn Code & Định Dạng Request/Response/Datetime VN**](./docs/CODING_STANDARDS.md)
- 🤖 [**Bộ Hướng Dẫn AI Dùng Chung Cho Mọi Trợ Lý (Universal AI Coding Rules)**](./AI_INSTRUCTIONS.md)

---

## 🤖 Bộ Quy Tắc AI Cho Mọi Trợ Lý (AI-Agnostic Coding Skills)

Thay vì cố định cho một AI duy nhất, dự án thiết kế tài liệu [`AI_INSTRUCTIONS.md`](./AI_INSTRUCTIONS.md) chuẩn mở (Single Source of Truth) tương thích với **tất cả các công cụ AI hiện nay**:

| Công cụ AI                                           | File cấu hình liên kết                                                           | Mô tả                                                   |
| :--------------------------------------------------- | :------------------------------------------------------------------------------- | :------------------------------------------------------ |
| **Mọi AI (ChatGPT, Claude, Gemini, DeepSeek, v.v.)** | [`AI_INSTRUCTIONS.md`](./AI_INSTRUCTIONS.md)                                     | File quy chuẩn gốc dùng làm Prompt / System Instruction |
| **Claude Code & Anthropic**                          | [`CLAUDE.md`](./CLAUDE.md)                                                       | Tự động nạp khi chạy Claude Code CLI                    |
| **GitHub Copilot**                                   | [`.github/copilot-instructions.md`](./.github/copilot-instructions.md)           | Tự động nạp trong VS Code / JetBrains                   |
| **Cursor IDE & Windsurf**                            | [`.cursorrules`](./.cursorrules)                                                 | Tự động kích hoạt khi lập trình bằng Cursor             |
| **Google Antigravity / Agents**                      | [`.agent/skills/.../SKILL.md`](./.agent/skills/heritage-code-standards/SKILL.md) | Kỹ năng chuẩn cho AI coding agents                      |

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

- **Framework**: [Next.js (App Router)](https://nextjs.org/) - Fullstack React Framework
- **Database & ORM**: [Prisma 7](https://www.prisma.io/) + Driver Adapter MySQL/MariaDB Connection Pool
- **Driver Adapter**: [`@prisma/adapter-mariadb`](https://www.npmjs.com/package/@prisma/adapter-mariadb) & [`mariadb`](https://www.npmjs.com/package/mariadb)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type-checking)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Component Library**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **Formatter & Linter**: [Prettier](https://prettier.io/) + [ESLint](https://eslint.org/)
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## 🏗️ Kiến trúc dự án: Clean Architecture & Feature Apps

Thư mục `src/prisma/` được đặt **ngang cấp với `src/features/`**:

```
HERITAGE_ECONOMY_FORUM/
├── docs/                       # 📚 BỘ TÀI LIỆU KIẾN TRÚC & HƯỚNG DẪN
│   ├── NEXTJS_AND_SOFTWARE_ENGINEERING_STANDARDS.md # Chuẩn mực phần mềm & Next.js
│   ├── ARCHITECTURE.md         # Phân tầng kiến trúc sạch (Clean Layered Architecture)
│   ├── PRISMA7_DATABASE.md     # Cấu hình Prisma 7 & MySQL Driver Adapter Pool
│   └── CODING_STANDARDS.md     # Quy chuẩn cú pháp, API Response, Datetime VN
│
├── AI_INSTRUCTIONS.md          # 🤖 BỘ QUY TẮC AI DÙNG CHUNG CHO MỌI AI ASSISTANT
├── CLAUDE.md                   # Cấu hình cho Claude Code
├── .github/copilot-instructions.md # Cấu hình cho GitHub Copilot
├── .cursorrules                # Cấu hình cho Cursor IDE
├── .agent/skills/              # Kỹ năng cho Google Antigravity & AI Agents
│
├── prisma.config.ts            # Cấu hình Datasource & Migration Prisma 7 tập trung
├── .prettierrc                 # Cấu hình format code Prettier tự động
├── .prettierignore             # File/thư mục loại trừ khỏi format
│
└── src/
    ├── prisma/                 # 🗄️ THƯ MỤC PRISMA (Ngang cấp với features)
    │   ├── schema.prisma       # Mô hình thực thể & Generator
    │   └── seed.ts             # Script gieo mầm dữ liệu mẫu
    │
    ├── features/               # 🌟 FEATURE APPS (Module nghiệp vụ tự đóng gói)
    │   ├── auth/               # Module: Xác thực & Quản lý tài khoản
    │   ├── forum/              # Module: Diễn đàn thảo luận
    │   └── heritage/           # Module: Dự án & Mô hình kinh tế di sản (Mẫu 7 Layer chuẩn)
    │       ├── types/          # Layer 1: Domain Entities & DTOs
    │       ├── schemas/        # Layer 2: Zod Schemas
    │       ├── repositories/   # Layer 3: Prisma Data Access (MySQL Pool + Fallback)
    │       ├── services/       # Layer 4: Business Rules & Logic
    │       ├── actions/        # Layer 5A: Server Actions
    │       ├── hooks/          # Layer 6A: React Hooks
    │       ├── components/     # Layer 6B: UI Components
    │       └── index.ts        # Module Public Boundary
    │
    ├── app/                    # Routing Layer (Next.js App Router)
    │   ├── (auth)/             # Route group: Login / Register
    │   ├── forum/              # Route: Diễn đàn thảo luận
    │   ├── heritage/           # Route: Danh mục & Chi tiết dự án di sản
    │   ├── api/                # RESTful API Route Handlers
    │   ├── layout.tsx          # Root Layout (App Shell)
    │   └── page.tsx            # Trang chủ (Landing page)
    │
    ├── components/             # UI Components dùng chung (shadcn/ui, layout)
    ├── lib/                    # api-response.ts, format-date.ts, prisma.ts, utils.ts
    └── types/                  # Types toàn cục
```

---

## 🚀 Hướng dẫn cài đặt & Khởi chạy (Getting Started)

### 1. Cài đặt Dependencies

```bash
pnpm install
```

### 2. Cấu hình biến môi trường

Sao chép `.env.example` thành `.env`:

```bash
cp .env.example .env
```

Cập nhật chuỗi kết nối MySQL:

```env
DATABASE_URL="mysql://root:password@localhost:3306/heritage_economy_forum"
```

### 3. Các Lệnh Thao Tác Cơ Sở Dữ Liệu & Code

```bash
# Tự động format toàn bộ mã nguồn bằng Prettier
pnpm format

# Sinh mã Prisma Client (từ src/prisma/schema.prisma)
pnpm prisma:generate

# Kiểm tra cú pháp schema & prisma.config.ts
pnpm prisma:validate

# Đồng bộ schema lên MySQL
pnpm prisma:migrate

# Gieo mầm dữ liệu mẫu
pnpm db:seed

# Mở giao diện Prisma Studio
pnpm prisma:studio

# Kiểm thử độc lập Service & Pool
pnpm demo:prisma
```

### 4. Chạy môi trường phát triển (Dev Server)

```bash
pnpm dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000).

---

## ⏱️ Định Dạng Response & Datetime Việt Nam (GMT+7)

Mọi API Response trả về đều tuân thủ cấu trúc chuẩn, kèm nhãn thời gian Việt Nam:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Thành công",
  "data": { ... },
  "meta": {
    "timestamp": "2026-11-03T11:30:00.000+07:00",
    "timestampFormatted": "03/11/2026 11:30:00"
  }
}
```

Chi tiết xin xem thêm tại [`docs/CODING_STANDARDS.md`](./docs/CODING_STANDARDS.md).
