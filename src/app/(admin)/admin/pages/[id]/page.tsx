import React from "react";
import { notFound } from "next/navigation";
import { pageService, PageContentEditor } from "@/features/pages";

export const metadata = {
  title: "Cấu Hình Khối Section Trang | HEF Admin CMS",
  description: "Quản trị thứ tự, hiển thị và dữ liệu JSON các khối section động",
};

interface PageDetailProps {
  params: Promise<{ id: string }>;
}

export default async function AdminPageDetailPage({ params }: PageDetailProps) {
  const { id } = await params;
  const page = await pageService.getPageById(id);

  if (!page) {
    notFound();
  }

  return <PageContentEditor initialPage={page} />;
}
