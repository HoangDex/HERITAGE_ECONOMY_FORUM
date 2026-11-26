/**
 * LAYER 5B: REST API CONTROLLER - /api/news/[section]
 * Phục vụ đồng thời 2 mục đích:
 * 1. Nếu tham số là tên section của trang `news` (hero, featured_news, filter, banner, feed):
 *    Chuyển tiếp tới bộ xử lý Section của Page (`/api/[namepage]/[section]`).
 * 2. Nếu tham số là `id` hoặc `slug` của một bản ghi `News`:
 *    Thực hiện CRUD trực tiếp trên bản ghi `News` (GET chi tiết, PUT/PATCH cập nhật, DELETE xóa).
 */

import { NextRequest } from "next/server";
import {
  GET as getPageSection,
  PUT as putPageSection,
  PATCH as patchPageSection,
  type SectionRouteContext,
} from "@/app/api/[namepage]/[section]/route";
import { apiSuccess, apiError, apiValidationError } from "@/lib/api-response";
import { masterDataRepository } from "@/features/pages/repositories/master-data.repository";
import { updateNewsSchema } from "@/features/pages/schemas/master-data.schema";

const NEWS_PAGE_SECTION_KEYS = new Set([
  "hero",
  "featured_news",
  "filter",
  "banner",
  "feed",
  "featured",
]);

export async function GET(request: NextRequest, context: SectionRouteContext) {
  const { section } = await context.params;
  const key = section.trim();

  if (NEWS_PAGE_SECTION_KEYS.has(key)) {
    return getPageSection(request, context);
  }

  try {
    const item = await masterDataRepository.getNewsById(key);
    if (!item) {
      return apiError(`Không tìm thấy bài viết tin tức với ID/Slug: ${key}`, 404);
    }
    return apiSuccess(item, { message: "Lấy thông tin bài viết tin tức thành công" });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi hệ thống khi lấy chi tiết tin tức",
      500
    );
  }
}

async function handleUpdateNewsOrSection(request: NextRequest, context: SectionRouteContext) {
  const { section } = await context.params;
  const key = section.trim();

  if (NEWS_PAGE_SECTION_KEYS.has(key)) {
    return putPageSection(request, context);
  }

  try {
    const body = await request.json();
    const validation = updateNewsSchema.safeParse(body);
    if (!validation.success) {
      return apiValidationError(validation.error);
    }
    const updated = await masterDataRepository.updateNews(key, validation.data);
    if (!updated) {
      return apiError(`Không tìm thấy bài viết tin tức với ID: ${key}`, 404);
    }
    return apiSuccess(updated, { message: "Cập nhật bài viết tin tức thành công" });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi hệ thống khi cập nhật tin tức",
      500
    );
  }
}

export async function PUT(request: NextRequest, context: SectionRouteContext) {
  return handleUpdateNewsOrSection(request, context);
}

export async function PATCH(request: NextRequest, context: SectionRouteContext) {
  const { section } = await context.params;
  if (NEWS_PAGE_SECTION_KEYS.has(section.trim())) {
    return patchPageSection(request, context);
  }
  return handleUpdateNewsOrSection(request, context);
}

export async function DELETE(_request: NextRequest, context: SectionRouteContext) {
  try {
    const { section } = await context.params;
    const id = section.trim();
    const deleted = await masterDataRepository.deleteNews(id);
    if (!deleted) {
      return apiError(`Không tìm thấy bài viết tin tức với ID: ${id}`, 404);
    }
    return apiSuccess({ id, deleted: true }, { message: "Đã xóa bài viết tin tức thành công" });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi hệ thống khi xóa tin tức",
      500
    );
  }
}
