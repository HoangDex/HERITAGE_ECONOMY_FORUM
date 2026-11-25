"use client";

import React from "react";
import Link from "next/link";
import {
  Layers,
  LayoutDashboard,
  Calendar,
  Award,
  FolderKanban,
  BookOpen,
  Mail,
  Home,
  Info,
  ExternalLink,
  Sliders,
  CheckCircle2,
  Database,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Clock,
  Activity,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PageEntity } from "../types/page.types";
import { formatDateTimeVN } from "@/lib/format-date";

interface AdminOverviewDashboardProps {
  pages: PageEntity[];
}

export function AdminOverviewDashboard({ pages }: AdminOverviewDashboardProps) {
  const totalSections = pages.reduce((sum, p) => sum + (p.sections?.length || 0), 0);
  const publishedPages = pages.filter((p) => p.isPublished).length;
  const homePage = pages.find((p) => p.slug === "home" || p.slug === "trang-chu") || pages[0];
  const aboutPage = pages.find((p) => p.slug === "about" || p.slug === "gioi-thieu");

  const getPageIcon = (slug: string) => {
    switch (slug) {
      case "home":
      case "trang-chu":
        return Home;
      case "about":
      case "gioi-thieu":
        return Info;
      case "forum":
      case "dien-dan":
        return Calendar;
      case "awards":
      case "giai-thuong":
        return Award;
      case "projects":
      case "du-an":
        return FolderKanban;
      case "news":
      case "tin-tuc":
        return BookOpen;
      case "contact":
      case "lien-he":
        return Mail;
      default:
        return Layers;
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. EXECUTIVE WELCOME BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#073327] via-[#0D4838] to-[#132A24] p-6 sm:p-8 text-white shadow-lg border border-[#C29B57]/30">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C29B57]/20 border border-[#C29B57]/50 text-[#C29B57] text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#C29B57]" />
              Trung Tâm Điều Hành Quản Trị HEF CMS
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
              Diễn Đàn Kinh Tế Di Sản
            </h1>
            <p className="text-xs sm:text-sm text-[#F5EFE5]/80 leading-relaxed font-sans">
              Hệ thống quản lý nội dung đa tầng, kiểm soát dữ liệu JSON động và kết nối 5 trụ cột phát triển bền vững:
              Chính sách – Doanh nghiệp – Nhà khoa học – Cộng đồng – Truyền thông.
            </p>
            <div className="flex items-center gap-4 text-xs text-[#C29B57] pt-1 flex-wrap">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Quản trị viên: admin@hef.vn
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#C29B57]" />
                Giờ hệ thống: GMT+7 (Hà Nội)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Activity className="w-4 h-4" />
                MariaDB/MySQL: Đã kết nối
              </span>
            </div>
          </div>

          <div className="flex flex-row lg:flex-col gap-3 shrink-0">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#C29B57] text-[#073327] hover:bg-[#d4ad67] transition-all shadow-md active:scale-95"
            >
              <ExternalLink className="w-4 h-4" />
              Xem Cổng Thông Tin Web
            </Link>
            {homePage && (
              <Link
                href={`/admin/pages/${homePage.id}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all active:scale-95"
              >
                <Sliders className="w-4 h-4 text-[#C29B57]" />
                Cấu Hình Khối Section Trang Chủ
              </Link>
            )}
          </div>
        </div>

        {/* Decorative Watermark Emblem */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#C29B57]/10 blur-3xl pointer-events-none" />
      </div>

      {/* 2. BỐN THẺ CHỈ SỐ TỔNG QUAN (KEY METRICS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Trang Chuyên Đề */}
        <div className="bg-white p-5 rounded-2xl border border-[#dfd7c8] shadow-2xs hover:border-[#C29B57]/60 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5c554b]">
              Trang Chuyên Đề
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#0D4838]/10 text-[#0D4838] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-[#0D4838]">{pages.length} Trang</div>
          <p className="text-xs text-[#5c554b] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{publishedPages}/{pages.length} trang đang hoạt động</span>
          </p>
        </div>

        {/* Metric 2: Khối Section Động */}
        <div className="bg-white p-5 rounded-2xl border border-[#dfd7c8] shadow-2xs hover:border-[#C29B57]/60 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5c554b]">
              Khối Sections Động
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#C29B57]/15 text-[#8B6B2F] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-[#8B6B2F]">{totalSections} Khối</div>
          <p className="text-xs text-[#5c554b] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>100% Lưu trữ JSON CSDL</span>
          </p>
        </div>

        {/* Metric 3: Kỳ Diễn Đàn 2026 */}
        <div className="bg-white p-5 rounded-2xl border border-[#dfd7c8] shadow-2xs hover:border-[#C29B57]/60 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5c554b]">
              Kỳ Diễn Đàn 2026
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#76232D]/10 text-[#76232D] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-[#76232D]">15–17/11</div>
          <p className="text-xs text-[#5c554b] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#76232D]" />
            <span>4 Phiên chuyên đề • 500+ đại biểu</span>
          </p>
        </div>

        {/* Metric 4: Mạng Lưới Đối Tác & Chuyên Gia */}
        <div className="bg-white p-5 rounded-2xl border border-[#dfd7c8] shadow-2xs hover:border-[#C29B57]/60 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5c554b]">
              Đối Tác & Hội Đồng
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-blue-900">25+ Đơn Vị</div>
          <p className="text-xs text-[#5c554b] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Hội đồng Khoa học & Ban điều hành</span>
          </p>
        </div>
      </div>

      {/* 3. TRUNG TÂM QUẢN TRỊ 7 TRANG CHUYÊN ĐỀ CỐT LÕI */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#0D4838] flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#C29B57]" />
              Trung Tâm Quản Trị 7 Trang Chuyên Đề Cốt Lõi
            </h2>
            <p className="text-xs text-[#5c554b] mt-0.5">
              Mỗi trang được cấu thành từ các khối Section độc lập. Bấm chọn trang để mở thanh Nav và Bảng điều khiển.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#8c8273]">
            {pages.length} trang có cấu hình động
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pages.map((page, index) => {
            const Icon = getPageIcon(page.slug);
            const sectionCount = page.sections?.length || 0;
            const publicUrl = `/${page.slug === "home" || page.slug === "trang-chu" ? "" : page.slug}`;

            return (
              <div
                key={page.id}
                className="bg-white rounded-2xl border border-[#dfd7c8] hover:border-[#C29B57] p-5 shadow-2xs transition-all flex flex-col justify-between group hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#F5EFE5] border border-[#C29B57]/40 flex items-center justify-center text-[#76232D] group-hover:bg-[#76232D] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Badge className="bg-[#F5EFE5] text-[#8B6B2F] border border-[#C29B57]/40 font-mono text-[10px]">
                        /{page.slug}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-[#8c8273]">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-serif font-bold text-base text-[#292929] group-hover:text-[#0D4838] transition-colors">
                        {page.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[#5c554b] mt-1 line-clamp-2">
                      {page.title || page.description || "Cấu hình khối nội dung trang"}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#f1ede6] space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#5c554b] font-medium flex items-center gap-1">
                      <Database className="w-3.5 h-3.5 text-[#C29B57]" />
                      Số khối section:
                    </span>
                    <span className="font-bold text-[#0D4838] font-mono bg-[#0D4838]/10 px-2 py-0.5 rounded-md">
                      {sectionCount} khối
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      href={`/admin/pages/${page.id}`}
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2 rounded-xl bg-[#0D4838] hover:bg-[#073327] text-white transition-all shadow-2xs"
                    >
                      <Sliders className="w-3 h-3 text-[#C29B57]" />
                      Bảng ĐK
                    </Link>
                    <Link
                      href={publicUrl}
                      target="_blank"
                      className="inline-flex items-center justify-center gap-1 text-xs font-semibold py-2 rounded-xl border border-[#dfd7c8] hover:bg-[#F5EFE5] text-[#5c554b] hover:text-[#0D4838] transition-all"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Xem Web
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. PHÍM TẮT HÀNH ĐỘNG NHANH & TRẠNG THÁI HỆ THỐNG */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Phím tắt thao tác nhanh (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-[#dfd7c8] shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#dfd7c8]/60 pb-3">
            <h3 className="font-serif font-bold text-base text-[#0D4838] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C29B57]" />
              Phím Tắt Biên Tập Section Trọng Điểm
            </h3>
            <span className="text-xs text-[#8c8273]">Thao tác trực tiếp</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {homePage && (
              <Link
                href={`/admin/pages/${homePage.id}`}
                className="p-3.5 rounded-xl border border-[#dfd7c8] hover:border-[#0D4838] bg-[#FDFBF7] hover:bg-[#F5EFE5] transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#0D4838]">Hero & Slogan Trang Chủ</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0D4838] group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-[#5c554b]">
                  Cập nhật khẩu hiệu, nút bấm CTA và ảnh banner chính
                </p>
              </Link>
            )}

            {aboutPage && (
              <Link
                href={`/admin/pages/${aboutPage.id}`}
                className="p-3.5 rounded-xl border border-[#dfd7c8] hover:border-[#76232D] bg-[#FDFBF7] hover:bg-[#F5EFE5] transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#76232D]">Hội Đồng & Ban Điều Hành</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#76232D] group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-[#5c554b]">
                  Quản lý nhân sự, chủ tịch hội đồng và trưởng ban điều hành
                </p>
              </Link>
            )}

            {homePage && (
              <Link
                href={`/admin/pages/${homePage.id}`}
                className="p-3.5 rounded-xl border border-[#dfd7c8] hover:border-[#8B6B2F] bg-[#FDFBF7] hover:bg-[#F5EFE5] transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#8B6B2F]">Kỳ Diễn Đàn 2026</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8B6B2F] group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-[#5c554b]">
                  Điều chỉnh 4 phiên chuyên đề, địa điểm và đại biểu dự kiến
                </p>
              </Link>
            )}

            {homePage && (
              <Link
                href={`/admin/pages/${homePage.id}`}
                className="p-3.5 rounded-xl border border-[#dfd7c8] hover:border-[#0D4838] bg-[#FDFBF7] hover:bg-[#F5EFE5] transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#0D4838]">Mạng Lưới Đối Tác</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0D4838] group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-[#5c554b]">
                  Cập nhật các cơ quan chỉ đạo, chủ trì và đối tác chiến lược
                </p>
              </Link>
            )}
          </div>
        </div>

        {/* Thông tin kỹ thuật & Kiểm định kiến trúc (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-[#dfd7c8] shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between border-b border-[#dfd7c8]/60 pb-3">
            <h3 className="font-serif font-bold text-base text-[#0D4838] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Kiểm Định Hệ Thống CMS
            </h3>
            <Badge className="bg-emerald-600 text-white text-[10px]">10/10 Chuẩn</Badge>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-[#f1ede6]">
              <span className="text-[#5c554b]">Cơ sở dữ liệu:</span>
              <span className="font-mono font-bold text-emerald-800">MariaDB / MySQL 3306</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#f1ede6]">
              <span className="text-[#5c554b]">ORM & Driver:</span>
              <span className="font-mono font-bold text-[#0D4838]">Prisma 7 (adapter-mariadb)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#f1ede6]">
              <span className="text-[#5c554b]">Kiến trúc Backend:</span>
              <span className="font-bold text-[#76232D]">7-Layer Clean Architecture</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#f1ede6]">
              <span className="text-[#5c554b]">Xác thực Payload:</span>
              <span className="font-bold text-emerald-700">Zod Schema Validation</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#5c554b]">Quy chuẩn múi giờ:</span>
              <span className="font-bold text-[#292929]">GMT+7 (Asia/Ho_Chi_Minh)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
