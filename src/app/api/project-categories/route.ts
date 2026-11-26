/**
 * LAYER 5B: REST API CONTROLLER - PROJECT CATEGORIES (/api/project-categories)
 * Quản lý bảng `project_categories` (chỉ gồm 2 trường: `id` và `name`).
 */

import { NextRequest } from "next/server";
import { apiSuccess, apiError, apiValidationError } from "@/lib/api-response";
import { masterDataService } from "@/features/pages/services/master-data.service";
import { createCategorySchema } from "@/features/pages/schemas/master-data.schema";

export async function GET() {
  try {
    const categories = await masterDataService.getProjectCategories();
    return apiSuccess(categories, {
      message: "Lấy danh sách phân loại dự án thành công",
    });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi hệ thống khi lấy danh sách phân loại dự án",
      500
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = createCategorySchema.safeParse(body);
    if (!validation.success) {
      return apiValidationError(validation.error);
    }

    const created = await masterDataService.createProjectCategory(validation.data);
    return apiSuccess(created, {
      statusCode: 201,
      message: "Tạo phân loại dự án mới thành công",
    });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi hệ thống khi tạo phân loại dự án",
      500
    );
  }
}
