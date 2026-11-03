# CLAUDE INSTRUCTIONS & GUIDELINES

This repository uses a strict Clean Layered Architecture with Next.js App Router and Prisma 7.
Claude MUST follow the complete specification defined in [`AI_INSTRUCTIONS.md`](./AI_INSTRUCTIONS.md).

## Quick Reference Summary

1. **Architecture**: Every feature in `src/features/<feature>/` has 7 layers:
   `types/` -> `schemas/` (Zod) -> `repositories/` (Prisma 7) -> `services/` -> `actions/` (Server Actions) -> `hooks/` -> `components/`.
2. **Database**: Prisma 7 schema is located at `src/prisma/schema.prisma`. No `url` in schema (placed in `prisma.config.ts`). Driver adapter is `@prisma/adapter-mariadb` with connection pooling.
3. **API & Response**: All route handlers MUST use `src/lib/api-response.ts` (`apiSuccess`, `apiPaginated`, `apiError`, `apiValidationError`).
4. **Timezone**: All timestamps and date displays MUST use Vietnam standard (`Asia/Ho_Chi_Minh`, GMT+7) via `src/lib/format-date.ts`.
5. **Design Tokens & Icons**: Brand colors: Crimson `#76232D`, Gold `#C29B57`, Ivory `#F5EFE5`, Charcoal `#292929`. Serif headings, sans-serif body. Always use `<HefIcon />` and `<BrandLogo />` from `@/components/icons`.
6. **Dynamic Sections CMS & SSO**: 7 official pages with dynamic sections JSON stored in `pages` table. Managed in Admin CMS (`/admin/dashboard`, `/admin/pages`). SSO authentication for VNeID, Gov IdP, and Enterprise OAuth.
7. **Code Style**: Run `pnpm format`, ensure `pnpm exec tsc --noEmit` and `pnpm lint` pass with 0 errors.

Refer to [`docs/HEF_CMS_CODING_RULES.md`](./docs/HEF_CMS_CODING_RULES.md), [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) and [`docs/CODING_STANDARDS.md`](./docs/CODING_STANDARDS.md) for full architecture manuals.
