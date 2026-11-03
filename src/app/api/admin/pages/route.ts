/**
 * LAYER 5B: ADMIN API ROUTE HANDLER - PAGES COLLECTION
 * Endpoint quản trị danh sách các trang động của CMS
 */

import { apiSuccess, apiError, apiValidationError } from "@/lib/api-response";
import { pageService } from "@/features/pages/services/page.service";
import { createPageSchema } from "@/features/pages/schemas/page.schema";

export async function GET() {
  try {
    const pages = await pageService.getAllPages(false);
    return apiSuccess(pages, { message: "Lấy danh sách trang CMS thành công" });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Lỗi khi lấy danh sách trang", 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = createPageSchema.safeParse(body);

    if (!validation.success) {
      return apiValidationError(validation.error);
    }

    const created = await pageService.createPage(validation.data);
    return apiSuccess(created, {
      statusCode: 201,
      message: "Tạo trang CMS thành công",
    });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Lỗi khi tạo trang", 500);
  }
}
