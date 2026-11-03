# GitHub Copilot Instructions - Heritage Economy Forum

When suggesting code, refactoring, or generating files in this repository, follow the rules specified in `AI_INSTRUCTIONS.md`:

1. **Clean Layered Architecture (7 Layers per Feature)**:
   - Module path: `src/features/<feature>/`
   - Layers: `types/`, `schemas/` (Zod), `repositories/` (Prisma 7), `services/` (Business logic), `actions/` (Server Actions), `hooks/` (React Hooks), `components/` (shadcn/ui).
   - Only public APIs are exported through `src/features/<feature>/index.ts`. Never export repositories.

2. **Prisma 7 & MySQL Pool Adapter**:
   - Schema path: `src/prisma/schema.prisma` (peer of `src/features/`).
   - Datasource URL is configured in `prisma.config.ts`, NEVER in `schema.prisma`.
   - Use singleton connection pool from `src/lib/prisma.ts`.
   - Always implement graceful fallback in repositories if the database connection fails.

3. **Standard API Response & Vietnam Datetime**:
   - Route handlers in `src/app/api/` must return `apiSuccess`, `apiPaginated`, `apiError`, or `apiValidationError` from `src/lib/api-response.ts`.
   - All timestamps and date strings must use Vietnam GMT+7 (`Asia/Ho_Chi_Minh`) via `src/lib/format-date.ts`.

4. **Brand Design Tokens, Icons & CMS Architecture**:
   - Primary: Crimson `#76232D`, Gold `#C29B57`, Ivory `#F5EFE5`, Charcoal `#292929`.
   - Typography: `font-serif` for headers, `font-sans` (`Be Vietnam Pro`) for text.
   - Icons: Use `<HefIcon name="..." variant="..." size="..." />` and `<BrandLogo />` from `@/components/icons`.
   - Dynamic Sections CMS: 7 official pages (`trang-chu`, `gioi-thieu`, `dien-dan`, `giai-thuong`, `du-an`, `tin-tuc`, `lien-he`) with `sections` JSON array. Admin CMS in `/admin/dashboard`.
   - SSO Login: Single Sign-On supporting VNeID, Gov IdP, and Enterprise OAuth.
   - Mandatory rules documentation: `docs/HEF_CMS_CODING_RULES.md`.

5. **Code Quality**:
   - Strict TypeScript without `any`.
   - React 19 standards: Server Components by default; `"use client"` only where necessary.
   - Run `pnpm format`, `pnpm exec tsc --noEmit`, and `pnpm lint`.
