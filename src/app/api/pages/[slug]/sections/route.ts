/**
 * LAYER 5: PUBLIC API ROUTE HANDLER - PAGE SECTIONS & PROPS JSON CRUD
 * Hỗ trợ đọc và cập nhật `page.props` (object chứa các section theo key ngắn gọn)
 * cũng như tương thích ngược với mảng `sections`.
 */

import { NextRequest } from "next/server";
import { apiSuccess, apiError, apiValidationError } from "@/lib/api-response";
import { pageService } from "@/features/pages/services/page.service";
import { pageRepository } from "@/features/pages/repositories/page.repository";
import { pagePropsMapSchema } from "@/features/pages/schemas/page.schema";
import { sectionsToPageProps, type PageSection } from "@/features/pages/types/page.types";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const cleanSlug = slug.toLowerCase().trim();

    const page = await pageService.getPageBySlug(cleanSlug);
    if (!page) {
      return apiError(`Không tìm thấy trang với slug: ${slug}`, 404);
    }

    return apiSuccess(
      {
        id: page.id,
        slug: page.slug,
        name: page.name,
        props: page.props,
        sections: page.sections,
      },
      {
        message: `Lấy cấu trúc Props & Sections của trang ${page.name} thành công`,
      }
    );
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi máy chủ khi lấy danh sách Section",
      500
    );
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const cleanSlug = slug.toLowerCase().trim();
    const body = await request.json();

    const page = await pageService.getPageBySlug(cleanSlug);
    if (!page) {
      return apiError(`Không tìm thấy trang với slug: ${slug}`, 404);
    }

    // Hỗ trợ cả định dạng mới `props: Record<string, UniversalSectionProps>` hoặc mảng `sections`
    const rawProps =
      body && typeof body === "object" && !Array.isArray(body) && "props" in body
        ? body.props
        : Array.isArray(body)
        ? sectionsToPageProps(body as PageSection[])
        : Array.isArray(body?.sections)
        ? sectionsToPageProps(body.sections as PageSection[])
        : body;

    const validation = pagePropsMapSchema.safeParse(rawProps);
    if (!validation.success) {
      return apiValidationError(validation.error);
    }

    const updatedPage = await pageRepository.updatePropsBySlug(cleanSlug, validation.data);
    return apiSuccess(updatedPage?.props || validation.data, {
      message: `Cập nhật cấu trúc Props của trang ${page.name} thành công`,
    });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi máy chủ khi cập nhật Section",
      500
    );
  }
}
