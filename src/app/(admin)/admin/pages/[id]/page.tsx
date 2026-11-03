import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HefIcon } from "@/components/icons/hef-icon";
import { pageService } from "@/features/pages";
import { formatDateTimeVN } from "@/lib/format-date";

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

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Link href="/admin/dashboard" className="hover:text-[#76232D]">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/admin/pages" className="hover:text-[#76232D]">
          Quản Lý Trang
        </Link>
        <span>/</span>
        <span className="text-[#76232D] font-semibold">{page.name}</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#C29B57]/20">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-serif font-bold text-[#76232D]">{page.name}</h1>
            <Badge className="bg-[#C29B57] text-[#292929] font-mono text-xs">/{page.slug}</Badge>
            {page.isPublished ? (
              <Badge className="bg-emerald-600 text-white text-xs">Đang Hoạt Động</Badge>
            ) : (
              <Badge variant="outline" className="text-xs">
                Bản Nháp
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{page.title}</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/${page.slug === "trang-chu" ? "" : page.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-md border border-[#C29B57]/30 text-[#76232D] bg-white hover:bg-[#F5EFE5] transition-colors"
          >
            <HefIcon name="Eye" size="xs" />
            Xem Thử Giao Diện Web
          </Link>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-md bg-[#76232D] text-white hover:bg-[#5e1c24] transition-colors shadow-xs"
          >
            <HefIcon name="Plus" size="xs" />
            Thêm Section Mới
          </button>
        </div>
      </div>

      {/* SEO & Meta Info Card */}
      <Card className="border-[#C29B57]/25 shadow-xs bg-white">
        <CardHeader className="pb-3 border-b border-border/40">
          <CardTitle className="text-base font-serif text-[#76232D]">
            Thuộc Tính Trang & SEO Metadata (Lưu trữ JSON)
          </CardTitle>
          <CardDescription className="text-xs">
            Thông tin định tuyến, thẻ Meta OpenGraph phục vụ chỉ mục tìm kiếm và mạng xã hội
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="font-semibold text-muted-foreground block mb-1">Mô Tả Trang:</span>
            <p className="text-[#292929] bg-[#F5EFE5]/40 p-2.5 rounded border border-[#C29B57]/15">
              {page.description || "Chưa có mô tả"}
            </p>
          </div>
          <div>
            <span className="font-semibold text-muted-foreground block mb-1">SEO Title:</span>
            <p className="text-[#292929] bg-[#F5EFE5]/40 p-2.5 rounded border border-[#C29B57]/15 font-mono">
              {page.seoProps?.metaTitle || page.title}
            </p>
          </div>
          <div>
            <span className="font-semibold text-muted-foreground block mb-1">
              Thời Điểm Cập Nhật:
            </span>
            <p className="text-[#292929] bg-[#F5EFE5]/40 p-2.5 rounded border border-[#C29B57]/15">
              {formatDateTimeVN(page.updatedAt)} (GMT+7)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Sections Management List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-serif font-bold text-[#76232D]">
              Danh Sách Khối Section Động ({page.sections.length} khối)
            </h2>
            <p className="text-xs text-muted-foreground">
              Thứ tự hiển thị được sắp xếp tự động theo trường order. Quản trị viên có thể bật/tắt
              hiển thị hoặc điều chỉnh nội dung props JSON.
            </p>
          </div>
          <span className="text-xs font-mono text-[#8B6B2F] bg-[#C29B57]/15 px-2.5 py-1 rounded">
            JSON Schema Validated
          </span>
        </div>

        <div className="space-y-3">
          {page.sections.map((section, index) => (
            <Card
              key={section.id}
              className="border-[#C29B57]/20 shadow-xs hover:border-[#C29B57]/50 transition-colors bg-white"
            >
              <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start md:items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#76232D]/10 text-[#76232D] flex items-center justify-center font-bold text-xs shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-sm text-[#292929]">
                        {section.title || section.type}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-[10px] border-[#C29B57] text-[#8B6B2F]"
                      >
                        {section.type}
                      </Badge>
                      {section.isVisible ? (
                        <span
                          className="w-2 h-2 rounded-full bg-emerald-500"
                          title="Đang hiển thị"
                        />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-400" title="Đã ẩn" />
                      )}
                    </div>
                    {section.subtitle && (
                      <p className="text-xs text-muted-foreground mt-0.5">{section.subtitle}</p>
                    )}
                    <span className="text-[10px] font-mono text-muted-foreground">
                      ID: {section.id} | Order: {section.order}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    className="p-1.5 rounded-md hover:bg-[#F5EFE5] text-muted-foreground hover:text-[#76232D] transition-colors"
                    title="Di chuyển lên"
                  >
                    <HefIcon name="ArrowUp" size="xs" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 rounded-md hover:bg-[#F5EFE5] text-muted-foreground hover:text-[#76232D] transition-colors"
                    title="Di chuyển xuống"
                  >
                    <HefIcon name="ArrowDown" size="xs" />
                  </button>
                  <button
                    type="button"
                    className="text-xs font-semibold px-3 py-1.5 rounded-md bg-[#F5EFE5] text-[#76232D] hover:bg-[#76232D] hover:text-white transition-colors"
                  >
                    Chỉnh Sửa Props JSON
                  </button>
                  <button
                    type="button"
                    className="p-1.5 rounded-md text-destructive hover:bg-destructive/10 transition-colors"
                    title="Xóa section"
                  >
                    <HefIcon name="Trash2" size="xs" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
