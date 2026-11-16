/**
 * LAYER 5: PUBLIC API ROUTE HANDLER - PAGE SECTIONS JSON CRUD
 * Quản lý trực tiếp mảng JSON sections của từng trang (Home, About, ...)
 * Ràng buộc chặt chẽ Request & Response bằng Zod Schemas riêng biệt
 */

import { NextRequest } from "next/server";
import { apiSuccess, apiError, apiValidationError } from "@/lib/api-response";
import { pageService } from "@/features/pages/services/page.service";
import {
  homePageSectionsListSchema,
  aboutPageSectionsListSchema,
  pageSectionsListSchema,
} from "@/features/pages/schemas";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const cleanSlug = slug.toLowerCase().trim();

    const page = await pageService.getPageBySlug(cleanSlug);
    if (!page) {
      return apiError(`Không tìm thấy trang với slug: ${slug}`, 404);
    }

    return apiSuccess(page.sections, {
      message: `Lấy danh sách Section của trang ${page.name} thành công`,
    });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi máy chủ khi lấy danh sách Section",
      500
    );
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const cleanSlug = slug.toLowerCase().trim();
    const body = await request.json();

    const page = await pageService.getPageBySlug(cleanSlug);
    if (!page) {
      return apiError(`Không tìm thấy trang với slug: ${slug}`, 404);
    }

    // Xác thực danh sách sections gửi lên: có thể là mảng trực tiếp hoặc { sections: [...] }
    const rawSections = Array.isArray(body) ? body : body.sections;

    if (!Array.isArray(rawSections)) {
      return apiError("Dữ liệu sections phải là một mảng", 422);
    }

    // Validate theo schema chuyên biệt của từng page
    if (cleanSlug === "home") {
      const validation = homePageSectionsListSchema.safeParse(rawSections);
      if (!validation.success) {
        return apiValidationError(validation.error);
      }
      const updatedPage = await pageService.updateSectionsBySlug(cleanSlug, validation.data);
      return apiSuccess(updatedPage?.sections || validation.data, {
        message: "Cập nhật các Section của Trang Chủ (Home) thành công",
      });
    }

    if (cleanSlug === "about") {
      const validation = aboutPageSectionsListSchema.safeParse(rawSections);
      if (!validation.success) {
        return apiValidationError(validation.error);
      }
      const updatedPage = await pageService.updateSectionsBySlug(cleanSlug, validation.data);
      return apiSuccess(updatedPage?.sections || validation.data, {
        message: "Cập nhật các Section của Trang Giới Thiệu (About) thành công",
      });
    }

    // Các trang khác dùng generic schema
    const validation = pageSectionsListSchema.safeParse(rawSections);
    if (!validation.success) {
      return apiValidationError(validation.error);
    }

    const updatedPage = await pageService.updateSectionsBySlug(cleanSlug, validation.data);
    return apiSuccess(updatedPage?.sections || validation.data, {
      message: `Cập nhật các Section của trang ${page.name} thành công`,
    });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi máy chủ khi cập nhật Section",
      500
    );
  }
}
