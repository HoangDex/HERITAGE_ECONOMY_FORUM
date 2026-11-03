import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HefIcon } from "@/components/icons/hef-icon";
import { pageService } from "@/features/pages";
import { formatDateTimeVN } from "@/lib/format-date";

export const metadata = {
  title: "Quản Lý Trang Web | HEF Admin CMS",
  description: "Danh sách 7 trang chuyên đề và quản lý các khối nội dung Section",
};

export default async function AdminPagesPage() {
  const pages = await pageService.getAllPages();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#C29B57]/20">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#76232D]">
            Quản Trị Trang Web & Dynamic Section
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Theo đề án Diễn đàn Kinh tế Di sản: Toàn bộ 7 trang chuyên đề được cấu thành từ các
            section lưu trữ trong CSDL JSON.
          </p>
        </div>
      </div>

      {/* Pages Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page, index) => (
          <Card
            key={page.id}
            className="border-[#C29B57]/25 shadow-xs hover:shadow-md transition-shadow bg-white flex flex-col justify-between"
          >
            <CardHeader className="pb-3 border-b border-border/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#C29B57] uppercase tracking-wider font-mono">
                  Module #{index + 1}
                </span>
                {page.isPublished ? (
                  <Badge className="bg-emerald-600 text-white text-[10px]">Xuất bản</Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    Bản nháp
                  </Badge>
                )}
              </div>
              <CardTitle className="font-serif text-lg text-[#76232D] mt-2">{page.name}</CardTitle>
              <CardDescription className="line-clamp-2 text-xs">
                {page.description || page.title}
              </CardDescription>
            </CardHeader>

            <CardContent className="py-4 space-y-3 text-xs text-muted-foreground flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#292929]">Slug URL:</span>
                <span className="font-mono text-[#76232D] bg-[#76232D]/5 px-2 py-0.5 rounded">
                  /{page.slug}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#292929]">Khối Section Động:</span>
                <span className="font-semibold text-[#8B6B2F] bg-[#C29B57]/15 px-2 py-0.5 rounded">
                  {page.sections?.length || 0} Sections
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#292929]">Cập nhật lần cuối:</span>
                <span>{formatDateTimeVN(page.updatedAt)}</span>
              </div>

              {/* Danh sách các section tóm tắt */}
              <div className="pt-2 border-t border-border/30">
                <div className="text-[11px] font-semibold text-[#292929] mb-1.5">
                  Các Section Cấu Thành:
                </div>
                <div className="flex flex-wrap gap-1">
                  {page.sections?.map((sec) => (
                    <span
                      key={sec.id}
                      className="text-[10px] bg-[#F5EFE5] text-[#5e4b3c] px-2 py-0.5 rounded border border-[#C29B57]/20"
                    >
                      {sec.type}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>

            <div className="p-4 bg-[#F5EFE5]/40 border-t border-border/30 flex items-center justify-between gap-2">
              <Link
                href={`/admin/pages/${page.id}`}
                className="w-full text-center text-xs font-semibold py-2 px-3 rounded-md bg-[#76232D] text-white hover:bg-[#5e1c24] transition-colors flex items-center justify-center gap-1.5"
              >
                <HefIcon name="Sliders" size="xs" />
                Cấu Hình & Kéo Thả Section
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
