/**
 * LAYER 5C: ADMIN API ROUTE HANDLER - PAGE SECTIONS
 * Quản trị thêm section hoặc sắp xếp lại thứ tự section trong trang
 */

import { apiSuccess, apiError, apiValidationError } from "@/lib/api-response";
import { pageService } from "@/features/pages/services/page.service";
import { addSectionSchema, reorderSectionsSchema } from "@/features/pages/schemas/page.schema";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/admin/pages/[id]/sections
 * Thêm một Section mới vào trang
 */
export async function POST(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const validation = addSectionSchema.safeParse(body);
    if (!validation.success) {
      return apiValidationError(validation.error);
    }

    const updatedPage = await pageService.addSection(id, validation.data);
    if (!updatedPage) {
      return apiError("Không tìm thấy trang để thêm section", 404);
    }

    return apiSuccess(updatedPage, {
      statusCode: 201,
      message: "Thêm section vào trang thành công",
    });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Lỗi khi thêm section", 500);
  }
}

/**
 * PUT /api/admin/pages/[id]/sections
 * Sắp xếp lại thứ tự (reorder) các Section trong trang
 */
export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const validation = reorderSectionsSchema.safeParse(body);
    if (!validation.success) {
      return apiValidationError(validation.error);
    }

    const updatedPage = await pageService.reorderSections(id, validation.data.sectionIds);
    if (!updatedPage) {
      return apiError("Không tìm thấy trang", 404);
    }

    return apiSuccess(updatedPage, {
      message: "Đã cập nhật thứ tự các section thành công",
    });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi khi cập nhật thứ tự section",
      500
    );
  }
}
