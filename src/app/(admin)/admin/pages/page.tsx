import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HefIcon } from "@/components/icons/hef-icon";
import { pageService } from "@/features/pages";
import { formatDateTimeVN } from "@/lib/format-date";

export const metadata = {
  title: "Quản Lý 7 Trang Chuyên Đề | HEF Admin CMS",
  description: "Trung tâm quản trị nội dung và cấu trúc dynamic section cho 7 trang web HEF",
};

export default async function AdminPagesPage() {
  const pages = await pageService.getAllPages();
  const totalSections = pages.reduce((sum, p) => sum + (p.sections?.length || 0), 0);
  const publishedCount = pages.filter((p) => p.isPublished).length;

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Link href="/admin/dashboard" className="hover:text-[#0D4838]">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-[#0D4838] font-semibold">Quản Lý Trang</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#C29B57]/20">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0D4838]">
            Hệ Thống Quản Trị Nội Dung 7 Trang Chuyên Đề
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Toàn bộ 7 trang theo đề án Diễn đàn Kinh tế Di sản được cấu thành từ các khối section
            động. Chọn trang để sắp xếp thứ tự, bật/tắt hiển thị hoặc tùy biến props.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-[#C29B57]/40 text-[#0D4838] bg-white hover:bg-[#F5EFE5] transition-colors shadow-2xs"
          >
            <HefIcon name="ExternalLink" size="xs" />
            Xem Cổng Diễn Đàn
          </Link>
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-[#C29B57]/20 p-4 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Tổng Số Trang Chính</p>
            <p className="text-2xl font-serif font-bold text-[#0D4838] mt-0.5">{pages.length}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#0D4838]/10 text-[#0D4838] flex items-center justify-center font-bold">
            <HefIcon name="FileText" size="sm" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#C29B57]/20 p-4 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Khối Section Động (JSON)</p>
            <p className="text-2xl font-serif font-bold text-[#C29B57] mt-0.5">{totalSections}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#C29B57]/15 text-[#8B6B2F] flex items-center justify-center font-bold">
            <HefIcon name="Layers" size="sm" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#C29B57]/20 p-4 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Trạng Thái Xuất Bản</p>
            <p className="text-2xl font-serif font-bold text-emerald-700 mt-0.5">
              {publishedCount}/{pages.length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <HefIcon name="CheckCircle" size="sm" />
          </div>
        </div>
      </div>

      {/* Pages Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page, index) => {
          const publicUrl = `/${page.slug === "trang-chu" ? "" : page.slug}`;

          return (
            <Card
              key={page.id}
              className="border-[#C29B57]/25 shadow-xs hover:shadow-md transition-all bg-white flex flex-col justify-between group"
            >
              <CardHeader className="pb-3 border-b border-border/40">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#C29B57] uppercase tracking-wider font-mono">
                    Trang Chuyên Đề #{index + 1}
                  </span>
                  {page.isPublished ? (
                    <Badge className="bg-emerald-600 text-white text-[10px]">Đang hoạt động</Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs border-amber-400 text-amber-700">
                      Bản nháp
                    </Badge>
                  )}
                </div>
                <CardTitle className="font-serif text-lg text-[#0D4838] mt-2 group-hover:text-[#073327] transition-colors">
                  {page.name}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-xs text-[#5c554b]">
                  {page.description || page.title}
                </CardDescription>
              </CardHeader>

              <CardContent className="py-4 space-y-3 text-xs text-muted-foreground flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#292929]">Đường dẫn URL:</span>
                  <span className="font-mono text-[#0D4838] bg-[#0D4838]/5 px-2 py-0.5 rounded font-bold">
                    /{page.slug}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#292929]">Số lượng Section:</span>
                  <span className="font-semibold text-[#8B6B2F] bg-[#C29B57]/15 px-2 py-0.5 rounded">
                    {page.sections?.length || 0} Khối Section
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#292929]">Cập nhật lần cuối:</span>
                  <span className="font-mono text-[11px]">{formatDateTimeVN(page.updatedAt)}</span>
                </div>

                {/* Danh sách các section tóm tắt */}
                <div className="pt-2 border-t border-border/30">
                  <div className="text-[11px] font-semibold text-[#292929] mb-1.5 flex items-center justify-between">
                    <span>Cấu trúc Section:</span>
                    <span className="text-[10px] text-muted-foreground">
                      {page.sections?.filter((s) => s.isVisible).length || 0} hiển thị
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto pr-1">
                    {page.sections?.map((sec) => (
                      <span
                        key={sec.id}
                        className={`text-[10px] px-2 py-0.5 rounded border ${
                          sec.isVisible
                            ? "bg-[#F5EFE5] text-[#5e4b3c] border-[#C29B57]/20"
                            : "bg-slate-100 text-slate-400 border-dashed border-slate-300 line-through"
                        }`}
                        title={sec.title || sec.type}
                      >
                        {sec.type}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>

              <div className="p-4 bg-[#F5EFE5]/40 border-t border-border/30 flex items-center gap-2">
                <Link
                  href={`/admin/pages/${page.id}`}
                  className="flex-1 text-center text-xs font-semibold py-2 px-3 rounded-lg bg-[#0D4838] text-white hover:bg-[#073327] transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <HefIcon name="Sliders" size="xs" />
                  Quản Trị Khối Section
                </Link>
                <Link
                  href={publicUrl}
                  target="_blank"
                  className="p-2 rounded-lg border border-[#C29B57]/30 bg-white hover:bg-[#F5EFE5] text-[#0D4838] transition-colors shrink-0"
                  title="Xem trang thực tế"
                >
                  <HefIcon name="Eye" size="xs" />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
