/**
 * LAYER 5B: REST API CONTROLLER - NEWS CATEGORIES (/api/categories)
 * Quản lý bảng `categories` (chỉ gồm 2 trường: `id` và `name`).
 */

import { NextRequest } from "next/server";
import { apiSuccess, apiError, apiValidationError } from "@/lib/api-response";
import { masterDataService } from "@/features/pages/services/master-data.service";
import { createCategorySchema } from "@/features/pages/schemas/master-data.schema";

export async function GET() {
  try {
    const categories = await masterDataService.getCategories();
    return apiSuccess(categories, {
      message: "Lấy danh sách chuyên mục tin tức thành công",
    });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi hệ thống khi lấy danh sách chuyên mục",
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

    const created = await masterDataService.createCategory(validation.data);
    return apiSuccess(created, {
      statusCode: 201,
      message: "Tạo chuyên mục mới thành công",
    });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi hệ thống khi tạo chuyên mục",
      500
    );
  }
}
