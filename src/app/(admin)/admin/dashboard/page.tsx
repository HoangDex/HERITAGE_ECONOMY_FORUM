import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HefIcon } from "@/components/icons/hef-icon";
import { pageService } from "@/features/pages";

export const metadata = {
  title: "Dashboard Tổng Quan | HEF Admin CMS",
  description: "Bảng điều khiển quản trị trang và sections cho Diễn đàn Kinh tế Di sản",
};

export default async function AdminDashboardPage() {
  const pages = await pageService.getAllPages();

  const totalSections = pages.reduce((sum, p) => sum + (p.sections?.length || 0), 0);
  const publishedPages = pages.filter((p) => p.isPublished).length;

  return (
    <div className="space-y-8">
      {/* Page Title & Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#C29B57]/20">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#76232D]">
            Bảng Điều Khiển Quản Trị CMS
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Quản trị toàn bộ 7 trang chuyên đề và cấu trúc section động của Diễn đàn Kinh tế Di sản
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/pages"
            className="inline-flex items-center gap-2 text-sm font-semibold bg-[#76232D] text-white px-4 py-2 rounded-lg hover:bg-[#5f1b23] transition-colors shadow-xs"
          >
            <HefIcon name="FileEdit" size="sm" />
            Quản Lý 7 Trang Web
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="border-[#C29B57]/20 shadow-xs bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tổng Số Trang Chuyên Đề
            </CardTitle>
            <div className="p-2 bg-[#76232D]/10 rounded-lg text-[#76232D]">
              <HefIcon name="FileText" size="sm" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-serif text-[#76232D]">{pages.length}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <span className="text-emerald-600 font-semibold">{publishedPages} đã xuất bản</span>
              <span>/ {pages.length} trang chính</span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#C29B57]/20 shadow-xs bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Khối Section Động (JSON)
            </CardTitle>
            <div className="p-2 bg-[#C29B57]/15 rounded-lg text-[#C29B57]">
              <HefIcon name="Layers" size="sm" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-serif text-[#C29B57]">{totalSections}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Lưu trữ định dạng JSON trong CSDL MariaDB
            </p>
          </CardContent>
        </Card>

        <Card className="border-[#C29B57]/20 shadow-xs bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cơ Chế Xác Thực
            </CardTitle>
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
              <HefIcon name="ShieldCheck" size="sm" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-emerald-800">SSO Enterprise</div>
            <p className="text-xs text-muted-foreground mt-1">Tích hợp VNeID & Cổng CQNN</p>
          </CardContent>
        </Card>

        <Card className="border-[#C29B57]/20 shadow-xs bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Định Dạng Chuẩn Hóa
            </CardTitle>
            <div className="p-2 bg-amber-100 rounded-lg text-amber-800">
              <HefIcon name="Clock" size="sm" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-amber-900">UTC+7 (Việt Nam)</div>
            <p className="text-xs text-muted-foreground mt-1">Định dạng ngày giờ DD/MM/YYYY</p>
          </CardContent>
        </Card>
      </div>

      {/* Pages List CMS Management Overview */}
      <Card className="border-[#C29B57]/25 shadow-sm bg-white">
        <CardHeader className="border-b border-border/50 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-serif text-xl text-[#76232D]">
                Danh Sách Trang Web & Section Động Cần Quản Trị
              </CardTitle>
              <CardDescription>
                Mỗi trang là một module độc lập chứa các block section lưu trữ trong bảng pages
              </CardDescription>
            </div>
            <Link
              href="/admin/pages"
              className="text-xs font-semibold text-[#76232D] hover:underline flex items-center gap-1"
            >
              Xem chi tiết toàn bộ
              <HefIcon name="ArrowRight" size="xs" />
            </Link>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F5EFE5]/50 text-xs uppercase font-semibold text-muted-foreground border-y border-[#C29B57]/15">
                <tr>
                  <th className="py-3 px-4">Tên Trang</th>
                  <th className="py-3 px-4">Đường Dẫn (Slug)</th>
                  <th className="py-3 px-4">Số Lượng Section</th>
                  <th className="py-3 px-4">Trạng Thái</th>
                  <th className="py-3 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {pages.map((page) => (
                  <tr key={page.id} className="hover:bg-[#F5EFE5]/30 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-[#292929]">
                      <div className="flex items-center gap-2">
                        <HefIcon name="FileText" size="xs" className="text-[#76232D]" />
                        <span>{page.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{page.title}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-[#76232D]">
                      /{page.slug === "trang-chu" ? "" : page.slug}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-semibold text-xs bg-[#C29B57]/15 text-[#8B6B2F] px-2.5 py-1 rounded-md">
                        <HefIcon name="Layers" size="xs" />
                        {page.sections?.length || 0} sections
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {page.isPublished ? (
                        <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px]">
                          Đã xuất bản
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground text-[11px]">
                          Bản nháp
                        </Badge>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/pages/${page.id}`}
                          className="text-xs font-semibold px-3 py-1.5 rounded-md bg-[#76232D]/10 text-[#76232D] hover:bg-[#76232D] hover:text-white transition-colors"
                        >
                          Quản Lý Section
                        </Link>
                        <Link
                          href={`/${page.slug === "trang-chu" ? "" : page.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-md text-muted-foreground hover:text-[#76232D] transition-colors"
                          title="Xem thử trang"
                        >
                          <HefIcon name="ExternalLink" size="sm" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
