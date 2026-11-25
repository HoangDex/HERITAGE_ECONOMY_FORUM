import React from "react";
import { pageService, AdminOverviewDashboard } from "@/features/pages";

export const metadata = {
  title: "Bảng Điều Khiển Tổng Quan CMS | HEF Admin CMS",
  description:
    "Trung tâm điều hành và quản trị cấu trúc 7 trang chuyên đề Diễn đàn Kinh tế Di sản",
};

export default async function AdminDashboardPage() {
  const pages = await pageService.getAllPages();
  return <AdminOverviewDashboard pages={pages} />;
}
