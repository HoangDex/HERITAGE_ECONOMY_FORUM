/**
 * LAYER 5: PUBLIC API ROUTE HANDLER - PAGE DETAIL BY SLUG
 * Truy xuất chi tiết trang động (Home, About, ...) bao gồm metadata và sections JSON
 * Định dạng phản hồi chuẩn toàn cục: StandardApiResponse<PageEntity>
 */

import { NextRequest } from "next/server";
import { apiSuccess, apiError, apiValidationError } from "@/lib/api-response";
import { pageService } from "@/features/pages/services/page.service";
import { newsRepository } from "@/features/news/repositories/news.repository";
import {
  updatePageSchema,
  homePageSectionsListSchema,
  aboutPageSectionsListSchema,
  pageSectionsListSchema,
} from "@/features/pages/schemas";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;

    if (!slug || typeof slug !== "string") {
      return apiError("Tham số slug không hợp lệ", 400);
    }

    const cleanSlug = slug.toLowerCase().trim();
    const page = await pageService.getPageBySlug(cleanSlug);
    if (!page) {
      return apiError(`Không tìm thấy trang với định danh: ${slug}`, 404);
    }

    const cleanPage = {
      id: page.id,
      slug: page.slug,
      name: page.name,
      props: page.props,
      isPublished: page.isPublished,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt,
    };

    // Khi gọi GET /api/pages/news, truy vấn kèm thêm phân trang bài viết newsPagination trả trong response
    if (cleanSlug === "news") {
      const { searchParams } = new URL(request.url);
      const pageNum = Math.max(1, Number(searchParams.get("page")) || 1);
      const limit = Math.max(1, Math.min(100, Number(searchParams.get("limit")) || 6));
      const rawCategoryIds = searchParams.get("categoryIds") || "";
      const categoryIds = rawCategoryIds
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean);
      const search = searchParams.get("search") || undefined;

      const newsPagination = await newsRepository.getPaginatedNews({
        page: pageNum,
        limit,
        categoryIds,
        search,
      });

      return apiSuccess(
        {
          ...cleanPage,
          newsPagination,
        },
        {
          message: `Lấy thông tin trang ${page.name} kèm danh sách tin tức phân trang thành công`,
        }
      );
    }

    return apiSuccess(cleanPage, {
      message: `Lấy thông tin trang ${page.name} thành công`,
    });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi máy chủ khi truy xuất trang",
      500
    );
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const body = await request.json();

    // 1. Kiểm tra trang tồn tại
    const existingPage = await pageService.getPageBySlug(slug.toLowerCase().trim());
    if (!existingPage) {
      return apiError(`Không tìm thấy trang với định danh: ${slug}`, 404);
    }

    // 2. Validate metadata cập nhật
    const metaValidation = updatePageSchema.safeParse(body);
    if (!metaValidation.success) {
      return apiValidationError(metaValidation.error);
    }

    // 3. Nếu có cập nhật mảng sections, validate theo từng trang chuyên biệt
    if (body.sections && Array.isArray(body.sections)) {
      if (slug === "home") {
        const homeSecValidation = homePageSectionsListSchema.safeParse(body.sections);
        if (!homeSecValidation.success) {
          return apiValidationError(homeSecValidation.error);
        }
      } else if (slug === "about") {
        const aboutSecValidation = aboutPageSectionsListSchema.safeParse(body.sections);
        if (!aboutSecValidation.success) {
          return apiValidationError(aboutSecValidation.error);
        }
      } else {
        const genericSecValidation = pageSectionsListSchema.safeParse(body.sections);
        if (!genericSecValidation.success) {
          return apiValidationError(genericSecValidation.error);
        }
      }
    }

    // 4. Cập nhật trang
    const updatedPage = await pageService.updatePage(existingPage.id, metaValidation.data);
    if (body.sections && Array.isArray(body.sections)) {
      await pageService.updateSectionsBySlug(existingPage.slug, body.sections);
    }

    const finalPage = await pageService.getPageById(existingPage.id);

    return apiSuccess(finalPage || updatedPage, {
      message: `Cập nhật trang ${existingPage.name} thành công`,
    });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi máy chủ khi cập nhật trang",
      500
    );
  }
}
