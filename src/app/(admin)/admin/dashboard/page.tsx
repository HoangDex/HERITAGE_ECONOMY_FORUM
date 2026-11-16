import React from "react";
import { notFound } from "next/navigation";
import { pageService, DashboardLiveEditor } from "@/features/pages";

export const metadata = {
  title: "Quản Lý Trang Chủ & Bảng Điều Khiển | HEF Admin CMS",
  description: "Chỉnh sửa nội dung Hero, Giới thiệu, Chuyên mục và Banner hỗ trợ",
};

export default async function AdminDashboardPage() {
  const page =
    (await pageService.getPageBySlug("home")) || (await pageService.getPageBySlug("trang-chu"));
  const fallbackPage = (await pageService.getAllPages())[0];

  const targetPage = page || fallbackPage;

  if (!targetPage) {
    notFound();
  }

  return <DashboardLiveEditor initialPage={targetPage} />;
}
