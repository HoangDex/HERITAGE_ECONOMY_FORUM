/**
 * LAYER 5: PUBLIC API ROUTE HANDLER - PAGES LIST
 * Cung cấp danh sách các trang động của Diễn đàn Kinh tế Di sản
 * Định dạng phản hồi chuẩn toàn cục: StandardApiResponse<PageEntity[]>
 */

import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api-response";
import { pageService } from "@/features/pages/services/page.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get("published") !== "false";

    const pages = await pageService.getAllPages(publishedOnly);

    return apiSuccess(pages, {
      message: "Lấy danh sách trang thành công",
    });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi máy chủ khi lấy danh sách trang",
      500
    );
  }
}
