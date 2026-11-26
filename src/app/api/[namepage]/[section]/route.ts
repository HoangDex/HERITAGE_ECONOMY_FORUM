/**
 * LAYER 5: DEDICATED SECTION API ROUTE HANDLER - /api/[namepage]/[section]
 * API riêng cho từng section của từng page (không gộp chung vào toàn bộ page).
 * Ví dụ:
 * - GET /api/home/hero -> Lấy cấu hình JSON của section `hero` trong trang `home`
 * - PUT /api/home/hero -> Cập nhật riêng section `hero` của trang `home`
 * - PATCH /api/home/showcase -> Cập nhật một phần (ví dụ mảng `ids`) của section `showcase`
 */

import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { apiSuccess, apiError, apiValidationError } from "@/lib/api-response";
import { pageService } from "@/features/pages/services/page.service";
import { universalSectionPropsSchema } from "@/features/pages/schemas/page.schema";

export interface SectionRouteContext {
  params: Promise<{ namepage?: string; slug?: string; section: string }>;
}

function resolvePageSlug(params: { namepage?: string; slug?: string }, url: string): string {
  if (params.namepage) return params.namepage.toLowerCase().trim();
  if (params.slug) return params.slug.toLowerCase().trim();
  const segments = new URL(url).pathname.split("/").filter(Boolean);
  // /api/{namepage}/{section}
  if (segments[0] === "api" && segments.length >= 3) {
    return segments[1].toLowerCase().trim();
  }
  return "home";
}

function revalidatePageRoutes(slug: string, pageId?: string) {
  try {
    revalidatePath("/admin/pages");
    if (pageId) revalidatePath(`/admin/pages/${pageId}`);
    revalidatePath(`/${slug}`);
    if (slug === "home") revalidatePath("/");
  } catch {
    // Ignore revalidate warnings outside request context
  }
}

export async function GET(request: NextRequest, context: SectionRouteContext) {
  try {
    const rawParams = await context.params;
    const pageSlug = resolvePageSlug(rawParams, request.url);
    const sectionKey = rawParams.section.trim();

    const page = await pageService.getPageBySlug(pageSlug);
    if (!page) {
      return apiError(`Không tìm thấy trang: ${pageSlug}`, 404);
    }

    const sectionProps = page.props[sectionKey];
    if (!sectionProps) {
      return apiError(
        `Không tìm thấy section '${sectionKey}' trong trang '${pageSlug}'`,
        404
      );
    }

    return apiSuccess(
      {
        page: pageSlug,
        section: sectionKey,
        props: sectionProps,
      },
      {
        message: `Lấy dữ liệu section '${sectionKey}' của trang '${pageSlug}' thành công`,
      }
    );
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi máy chủ khi lấy dữ liệu section",
      500
    );
  }
}

async function handleUpsertSection(request: NextRequest, context: SectionRouteContext) {
  try {
    const rawParams = await context.params;
    const pageSlug = resolvePageSlug(rawParams, request.url);
    const sectionKey = rawParams.section.trim();
    const body = await request.json();

    // Hỗ trợ section dạng chuỗi đơn (ví dụ: featured_news: "news_1")
    if (typeof body === "string") {
      const updatedPage = await pageService.updateSectionByKey(
        pageSlug,
        sectionKey,
        body as unknown as Record<string, unknown>
      );
      if (!updatedPage) {
        return apiError(
          `Không tìm thấy trang '${pageSlug}' để cập nhật section '${sectionKey}'`,
          404
        );
      }
      revalidatePageRoutes(updatedPage.slug, updatedPage.id);
      return apiSuccess(
        {
          page: updatedPage.slug,
          section: sectionKey,
          props: updatedPage.props[sectionKey],
          updatedPage,
        },
        {
          message: `Đã cập nhật section '${sectionKey}' của trang '${updatedPage.name}' thành công`,
        }
      );
    }

    // Hỗ trợ cả body trực tiếp là UniversalSectionProps hoặc { props: UniversalSectionProps }
    const payload =
      body &&
      typeof body === "object" &&
      "props" in body &&
      body.props !== undefined
        ? body.props
        : body;

    if (typeof payload === "string") {
      const updatedPage = await pageService.updateSectionByKey(
        pageSlug,
        sectionKey,
        payload as unknown as Record<string, unknown>
      );
      if (!updatedPage) {
        return apiError(
          `Không tìm thấy trang '${pageSlug}' để cập nhật section '${sectionKey}'`,
          404
        );
      }
      revalidatePageRoutes(updatedPage.slug, updatedPage.id);
      return apiSuccess(
        {
          page: updatedPage.slug,
          section: sectionKey,
          props: updatedPage.props[sectionKey],
          updatedPage,
        },
        {
          message: `Đã cập nhật section '${sectionKey}' của trang '${updatedPage.name}' thành công`,
        }
      );
    }

    const validation = universalSectionPropsSchema.safeParse(payload);
    if (!validation.success) {
      return apiValidationError(validation.error);
    }

    const updatedPage = await pageService.updateSectionByKey(
      pageSlug,
      sectionKey,
      validation.data
    );

    if (!updatedPage) {
      return apiError(`Không tìm thấy trang '${pageSlug}' để cập nhật section '${sectionKey}'`, 404);
    }

    revalidatePageRoutes(updatedPage.slug, updatedPage.id);

    return apiSuccess(
      {
        page: updatedPage.slug,
        section: sectionKey,
        props: updatedPage.props[sectionKey],
        updatedPage,
      },
      {
        message: `Đã cập nhật section '${sectionKey}' của trang '${updatedPage.name}' thành công`,
      }
    );
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi máy chủ khi cập nhật section",
      500
    );
  }
}

export async function PUT(request: NextRequest, context: SectionRouteContext) {
  return handleUpsertSection(request, context);
}

export async function PATCH(request: NextRequest, context: SectionRouteContext) {
  return handleUpsertSection(request, context);
}
