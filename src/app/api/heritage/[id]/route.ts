/**
 * LAYER 5C: REST API CONTROLLER (Single Item Endpoint)
 * Route Handler quản trị chi tiết dự án theo ID/Slug
 */

import { apiSuccess, apiError } from "@/lib/api-response";
import { heritageService } from "@/features/heritage/services/heritage.service";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const project = await heritageService.getProjectBySlug(id);

    if (!project) {
      return apiError("Không tìm thấy dự án di sản", 404);
    }

    return apiSuccess(project, { message: "Lấy chi tiết dự án thành công" });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Lỗi truy vấn dự án", 500);
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const deleted = await heritageService.removeProject(id);

    if (!deleted) {
      return apiError("Không tìm thấy dự án để xóa", 404);
    }

    return apiSuccess({ deleted: true }, { message: "Đã xóa dự án thành công" });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Lỗi khi xóa dự án", 500);
  }
}
