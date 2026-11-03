/**
 * LAYER 5B: REST API CONTROLLER (Collection Endpoint)
 * Sử dụng chuẩn hóa Response & Datetime Việt Nam (apiSuccess, apiPaginated, apiValidationError, apiError)
 */

import { apiPaginated, apiSuccess, apiError, apiValidationError } from "@/lib/api-response";
import { heritageService } from "@/features/heritage/services/heritage.service";
import {
  createHeritageSchema,
  heritageFilterSchema,
} from "@/features/heritage/schemas/heritage.schema";

/**
 * GET /api/heritage
 * Truy vấn danh sách dự án với bộ lọc và phân trang chuẩn
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      location: searchParams.get("location") || undefined,
      category: searchParams.get("category") || undefined,
      status: searchParams.get("status") || undefined,
      search: searchParams.get("search") || undefined,
      page: searchParams.get("page") || undefined,
      limit: searchParams.get("limit") || undefined,
    };

    // 1. Validate query params bằng Zod
    const validatedQuery = heritageFilterSchema.safeParse(queryParams);
    if (!validatedQuery.success) {
      return apiValidationError(validatedQuery.error);
    }

    // 2. Gọi Service
    const projects = await heritageService.getProjects(validatedQuery.data);

    // 3. Trả về định dạng phân trang chuẩn có kèm thời gian Việt Nam
    return apiPaginated(
      projects,
      {
        page: validatedQuery.data.page,
        limit: validatedQuery.data.limit,
        total: projects.length,
      },
      { message: "Lấy danh sách dự án thành công" }
    );
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi hệ thống khi tải danh sách dự án",
      500
    );
  }
}

/**
 * POST /api/heritage
 * Tạo mới một mô hình kinh tế di sản
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validate JSON payload
    const validation = createHeritageSchema.safeParse(body);
    if (!validation.success) {
      return apiValidationError(validation.error);
    }

    // 2. Gọi Service tạo dự án
    const created = await heritageService.createProject(validation.data);

    // 3. Trả về HTTP 201 Created chuẩn
    return apiSuccess(created, {
      statusCode: 201,
      message: "Tạo dự án kinh tế di sản thành công",
    });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Lỗi hệ thống khi lưu dự án", 500);
  }
}
