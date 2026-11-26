/**
 * LAYER 5B: REST API CONTROLLER - SINGLE PROJECT CATEGORY (/api/project-categories/[id])
 * Cho phép Xem / Sửa (`name`) / Xóa một ProjectCategory theo `id`.
 */

import { NextRequest } from "next/server";
import { apiSuccess, apiError, apiValidationError } from "@/lib/api-response";
import { masterDataService } from "@/features/pages/services/master-data.service";
import { updateCategorySchema } from "@/features/pages/schemas/master-data.schema";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const category = await masterDataService.getProjectCategoryById(id);
    if (!category) {
      return apiError(`Không tìm thấy phân loại dự án với id: ${id}`, 404);
    }
    return apiSuccess(category, {
      message: "Lấy thông tin phân loại dự án thành công",
    });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi hệ thống khi tải phân loại dự án",
      500
    );
  }
}

async function handleUpdate(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const validation = updateCategorySchema.safeParse(body);
    if (!validation.success) {
      return apiValidationError(validation.error);
    }

    const updated = await masterDataService.updateProjectCategory(id, validation.data);
    if (!updated) {
      return apiError(`Không tìm thấy phân loại dự án với id: ${id}`, 404);
    }

    return apiSuccess(updated, {
      message: "Cập nhật tên phân loại dự án thành công",
    });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi hệ thống khi cập nhật phân loại dự án",
      500
    );
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return handleUpdate(request, context);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  return handleUpdate(request, context);
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const deleted = await masterDataService.deleteProjectCategory(id);
    if (!deleted) {
      return apiError(`Không tìm thấy phân loại dự án với id: ${id}`, 404);
    }
    return apiSuccess({ id }, { message: "Đã xóa phân loại dự án thành công" });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi hệ thống khi xóa phân loại dự án",
      500
    );
  }
}
