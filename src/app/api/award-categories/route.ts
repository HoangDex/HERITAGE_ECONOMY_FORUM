/**
 * LAYER 5B: REST API CONTROLLER - AWARD CATEGORIES (/api/award-categories)
 * Quản lý bảng `award_categories` (chỉ gồm 2 trường: `id` và `name`).
 */

import { NextRequest } from "next/server";
import { apiSuccess, apiError, apiValidationError } from "@/lib/api-response";
import { masterDataService } from "@/features/pages/services/master-data.service";
import { createCategorySchema } from "@/features/pages/schemas/master-data.schema";

export async function GET() {
  try {
    const categories = await masterDataService.getAwardCategories();
    return apiSuccess(categories, {
      message: "Lấy danh sách hạng mục giải thưởng thành công",
    });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi hệ thống khi lấy danh sách hạng mục giải thưởng",
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

    const created = await masterDataService.createAwardCategory(validation.data);
    return apiSuccess(created, {
      statusCode: 201,
      message: "Tạo hạng mục giải thưởng mới thành công",
    });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi hệ thống khi tạo hạng mục giải thưởng",
      500
    );
  }
}
