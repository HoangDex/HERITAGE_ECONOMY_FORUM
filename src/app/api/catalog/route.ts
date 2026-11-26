/**
 * LAYER 5: CATALOG OVERVIEW API (/api/catalog)
 * Cung cấp danh sách các thực thể danh mục (News, HeritageProject, Organization, Speaker, Award)
 * để Admin CMS có thể chọn nhanh các `ids: string[]` gắn vào từng Section của Page.props.
 */

import { apiSuccess, apiError } from "@/lib/api-response";
import { masterDataRepository } from "@/features/pages/repositories/master-data.repository";

export async function GET() {
  try {
    const overview = await masterDataRepository.getOverview();
    return apiSuccess(overview, {
      message: "Lấy danh mục dữ liệu dùng chung thành công",
    });
  } catch (error) {
    return apiError(
      error instanceof Error ? error.message : "Lỗi máy chủ khi tải danh mục dữ liệu",
      500
    );
  }
}
