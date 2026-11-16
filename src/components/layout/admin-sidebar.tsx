"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/icons/brand-logo";
import { HefIcon, type IconName } from "@/components/icons/hef-icon";

interface PageNavItem {
  id: string;
  name: string;
  slug: string;
  iconName: IconName;
}

// 7 Trang Chuyên Đề Cốt Lõi của HEF CMS
const WEBSITE_PAGES: PageNavItem[] = [
  { id: "page_home", name: "Trang chủ", slug: "home", iconName: "Home" },
  { id: "page_about", name: "Giới thiệu", slug: "about", iconName: "Info" },
  { id: "page_forum", name: "Sự kiện & Diễn đàn", slug: "forum", iconName: "Calendar" },
  { id: "page_awards", name: "Giải thưởng", slug: "awards", iconName: "Award" },
  { id: "page_projects", name: "Dự án nổi bật", slug: "projects", iconName: "FolderKanban" },
  { id: "page_news", name: "Tin tức & Báo chí", slug: "news", iconName: "Newspaper" },
  { id: "page_contact", name: "Liên hệ & Hợp tác", slug: "contact", iconName: "Mail" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isDashboardActive = pathname === "/admin/dashboard" || pathname === "/admin";

  return (
    <aside className="w-68 bg-[#073327] text-[#F7F5EE] flex flex-col shrink-0 h-full z-20 shadow-xl border-r border-[#041D16] select-none">
      {/* Brand & Crest Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BrandLogo size="sm" href="/admin/dashboard" />
          <div className="min-w-0">
            <div className="font-serif font-bold text-xs leading-tight text-white truncate">
              Diễn Đàn Kinh Tế Di Sản
            </div>
            <div className="text-[9px] font-bold tracking-widest text-[#C29B57] uppercase mt-0.5">
              KHU VỰC QUẢN TRỊ
            </div>
          </div>
        </div>
        <button
          type="button"
          className="text-white/40 hover:text-white p-1 rounded transition-colors text-xs"
          title="Thu gọn sidebar"
        >
          «
        </button>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto custom-scrollbar">
        {/* NHÓM 1: TỔNG QUAN */}
        <div className="space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#C29B57]/90 px-2.5 pb-1">
            TỔNG QUAN
          </div>
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              isDashboardActive
                ? "bg-[#C29B57] text-[#041D16] shadow-sm font-bold"
                : "text-[#E6D7C3] hover:bg-white/10 hover:text-white"
            }`}
          >
            <HefIcon
              name="LayoutDashboard"
              size="xs"
              className={isDashboardActive ? "text-[#041D16]" : "text-[#C29B57]"}
            />
            <span>Bảng điều khiển</span>
          </Link>
        </div>

        {/* NHÓM 2: NỘI DUNG WEBSITE (CÁC PAGES) */}
        <div className="space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#C29B57]/90 px-2.5 pb-1">
            NỘI DUNG WEBSITE
          </div>

          <div className="space-y-0.5">
            {WEBSITE_PAGES.map((page) => {
              const pageHref = `/admin/pages/${page.id}`;
              const isPageActive =
                pathname === pageHref || pathname === `/admin/pages/${page.slug}`;

              return (
                <Link
                  key={page.id}
                  href={pageHref}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all ${
                    isPageActive
                      ? "bg-[#C29B57] text-[#041D16] font-bold shadow-sm"
                      : "text-[#E6D7C3] hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <HefIcon
                      name={page.iconName}
                      size="xs"
                      className={`shrink-0 ${
                        isPageActive ? "text-[#041D16]" : "text-[#C29B57]/90"
                      }`}
                    />
                    <span className="truncate">{page.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* NHÓM 3: HỆ THỐNG / QUẢN LÝ DỮ LIỆU */}
        <div className="space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#C29B57]/90 px-2.5 pb-1">
            HỆ THỐNG
          </div>

          <div className="space-y-0.5">
            <Link
              href="/admin/pages"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all ${
                pathname === "/admin/pages"
                  ? "bg-[#C29B57] text-[#041D16] font-bold shadow-sm"
                  : "text-[#E6D7C3] hover:bg-white/10 hover:text-white"
              }`}
            >
              <HefIcon name="Database" size="xs" className="text-[#C29B57]/90 shrink-0" />
              <span>Danh mục dữ liệu</span>
            </Link>

            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-[#E6D7C3] hover:bg-white/10 hover:text-white transition-all"
            >
              <HefIcon name="Users" size="xs" className="text-[#C29B57]/90 shrink-0" />
              <span>Tài khoản & Phân quyền</span>
            </Link>

            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-[#E6D7C3] hover:bg-white/10 hover:text-white transition-all"
            >
              <HefIcon name="Activity" size="xs" className="text-[#C29B57]/90 shrink-0" />
              <span>Nhật ký hoạt động</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* User Info & Footer Profile */}
      <div className="p-3 border-t border-white/10 bg-black/20 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#C29B57] text-[#041D16] flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
            AD
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-white truncate">Quản Trị Viên (Admin)</div>
            <div className="text-[9px] font-mono tracking-wider text-[#C29B57] uppercase">
              ADMINISTRATOR
            </div>
          </div>
        </div>

        <Link
          href="/login"
          className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          title="Đăng xuất"
        >
          <HefIcon name="LogOut" size="xs" />
        </Link>
      </div>
    </aside>
  );
}
