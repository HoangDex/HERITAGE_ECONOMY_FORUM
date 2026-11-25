import React from "react";
import { masterDataService } from "@/features/pages";
import { MasterDataCatalogView } from "@/features/pages";

export const metadata = {
  title: "Danh Mục Dữ Liệu Dùng Chung (Master Data) | HEF Admin CMS",
  description:
    "Quản trị các thực thể dữ liệu quan hệ dùng chung (Đối tác, Dự án, Tin tức, Diễn giả, Giải thưởng) lưu trong MySQL và tái sử dụng trên toàn bộ 7 trang web.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminMasterDataPage() {
  const data = await masterDataService.getMasterDataOverview();

  return <MasterDataCatalogView data={data} />;
}
