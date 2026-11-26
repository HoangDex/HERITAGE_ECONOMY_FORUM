/**
 * LAYER 5B: REST API CONTROLLER - PAGINATED PROJECTS ENDPOINT (/api/projects)
 * Phục vụ trang Mô hình & Dự án (/projects): Không lưu mảng `ids` trong Page.props,
 * mà gọi trực tiếp API này để lấy tất cả HeritageProject có phân trang và bộ lọc.
 */

import { NextRequest } from "next/server";
import { apiPaginated, apiSuccess, apiError } from "@/lib/api-response";
import { heritageRepository } from "@/features/heritage/repositories/heritage.repository";
import { masterDataRepository } from "@/features/pages/repositories/master-data.repository";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.max(1, Math.min(100, Number(searchParams.get("limit")) || 12));
    const category = searchParams.get("category") || undefined;
    const location = searchParams.get("location") || undefined;
    const status = searchParams.get("status") || undefined;
    const search = searchParams.get("search") || undefined;

    const allProjects = await heritageRepository.findAll({
      category: category && category !== "Tất cả" ? (category as never) : undefined,
      location,
      status: status as never,
      search,
    });

    const start = (page - 1) * limit;
    const paginatedItems = allProjects.slice(start, start + limit);

    return apiPaginated(
      paginatedItems,
      {
        page,
        limit,
        total: allProjects.length,
      },
      { message: "Lấy danh sách dự án kinh tế di sản có phân trang thành công" }
    );
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi hệ thống khi tải danh sách dự án",
      500
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const created = await masterDataRepository.createProject(body);
    return apiSuccess(created, {
      statusCode: 201,
      message: "Tạo dự án kinh tế di sản thành công",
    });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi hệ thống khi tạo dự án",
      500
    );
  }
}
