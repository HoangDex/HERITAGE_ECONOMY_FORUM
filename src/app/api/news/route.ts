/**
 * LAYER 5B: REST API CONTROLLER - PAGINATED NEWS ENDPOINT (/api/news)
 * Phục vụ trang Tin tức (/news): Không lưu mảng `ids` trong Page.props,
 * mà gọi trực tiếp API này để lấy tất cả News có phân trang và lọc theo chuyên mục.
 */

import { NextRequest } from "next/server";
import { apiPaginated, apiSuccess, apiError, apiValidationError } from "@/lib/api-response";
import { newsRepository } from "@/features/news/repositories/news.repository";
import { masterDataRepository } from "@/features/pages/repositories/master-data.repository";
import { createNewsSchema } from "@/features/pages/schemas/master-data.schema";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.max(1, Math.min(100, Number(searchParams.get("limit")) || 6));
    const category = searchParams.get("category") || undefined;
    const rawCategoryIds = searchParams.get("categoryIds") || "";
    const categoryIds = rawCategoryIds
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
    const search = searchParams.get("search") || undefined;

    const newsPagination = await newsRepository.getPaginatedNews({
      page,
      limit,
      categoryIds,
      category,
      search,
    });

    return apiPaginated(
      newsPagination.news,
      {
        page: newsPagination.page,
        limit: newsPagination.limit,
        total: newsPagination.total,
      },
      { message: "Lấy danh sách tin tức phân trang thành công" }
    );
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi hệ thống khi tải danh sách tin tức",
      500
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = createNewsSchema.safeParse(body);
    if (!validation.success) {
      return apiValidationError(validation.error);
    }
    const created = await masterDataRepository.createNews(validation.data);
    return apiSuccess(created, {
      statusCode: 201,
      message: "Tạo bài viết tin tức mới thành công",
    });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi hệ thống khi tạo tin tức",
      500
    );
  }
}
