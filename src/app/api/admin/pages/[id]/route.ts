/**
 * LAYER 5B: ADMIN API ROUTE HANDLER - SINGLE PAGE MANAGEMENT
 * Quản trị chi tiết 1 trang động (Xem, Cập nhật thông tin, Xóa)
 */

import { NextRequest } from "next/server";
import { apiSuccess, apiError, apiValidationError } from "@/lib/api-response";
import { pageService } from "@/features/pages/services/page.service";
import { updatePageSchema } from "@/features/pages/schemas/page.schema";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const page = await pageService.getPageById(id);

    if (!page) {
      return apiError(`Không tìm thấy trang với mã: ${id}`, 404);
    }

    return apiSuccess(page, { message: `Lấy thông tin trang ${page.name} thành công` });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi máy chủ khi lấy thông tin trang",
      500
    );
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const validation = updatePageSchema.safeParse(body);
    if (!validation.success) {
      return apiValidationError(validation.error);
    }

    const updated = await pageService.updatePage(id, validation.data);
    if (!updated) {
      return apiError(`Không tìm thấy trang để cập nhật: ${id}`, 404);
    }

    return apiSuccess(updated, { message: `Cập nhật trang ${updated.name} thành công` });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi máy chủ khi cập nhật trang",
      500
    );
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const success = await pageService.deletePage(id);

    if (!success) {
      return apiError(`Không tìm thấy trang để xóa: ${id}`, 404);
    }

    return apiSuccess({ deletedId: id }, { message: "Xóa trang thành công" });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi máy chủ khi xóa trang",
      500
    );
  }
}
