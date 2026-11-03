import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/icons/brand-logo";
import { HefIcon } from "@/components/icons/hef-icon";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "HEF Admin CMS - Quản trị Nội dung Di sản",
  description: "Hệ thống quản lý nội dung đa tầng và dynamic sections cho Diễn đàn Kinh tế Di sản",
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    href: "/admin/dashboard",
    label: "Tổng quan Dashboard",
    iconName: "LayoutDashboard" as const,
  },
  {
    href: "/admin/pages",
    label: "Quản lý Trang (Pages CMS)",
    iconName: "FileText" as const,
    badge: "7 Trang",
  },
  {
    href: "/admin/sections",
    label: "Khối Section Động",
    iconName: "Layers" as const,
  },
  {
    href: "/admin/awards",
    label: "Giải thưởng & Bình chọn",
    iconName: "Award" as const,
  },
  {
    href: "/admin/events",
    label: "Diễn đàn & Sự kiện",
    iconName: "Calendar" as const,
  },
  {
    href: "/admin/media",
    label: "Thư viện Di sản số",
    iconName: "Image" as const,
  },
  {
    href: "/admin/settings",
    label: "Cấu hình Hệ thống",
    iconName: "Settings" as const,
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5EFE5]/40 text-[#292929] flex">
      {/* Sidebar Admin */}
      <aside className="w-72 bg-white border-r border-[#C29B57]/20 flex flex-col shrink-0 shadow-xs">
        <div className="p-5 border-b border-[#C29B57]/15">
          <BrandLogo size="md" href="/admin/dashboard" />
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#76232D] uppercase tracking-wider bg-[#76232D]/10 px-2 py-0.5 rounded">
              CMS Portal v1.0
            </span>
            <span className="text-xs text-muted-foreground">Admin Workspace</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-3 py-2">
            Quản trị Nội dung CMS
          </div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-[#76232D]/10 hover:text-[#76232D] text-[#292929] group"
            >
              <div className="flex items-center gap-3">
                <HefIcon
                  name={item.iconName}
                  size="sm"
                  className="text-muted-foreground group-hover:text-[#76232D] transition-colors"
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] bg-[#C29B57]/20 text-[#8B6B2F] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* User Info & Logout footer */}
        <div className="p-4 border-t border-[#C29B57]/15 bg-[#F5EFE5]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#76232D] text-[#C29B57] flex items-center justify-center font-bold text-sm shadow-xs">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">Ban Thư Ký HEF</div>
              <div className="text-xs text-muted-foreground truncate">admin@disan.vn</div>
            </div>
            <Badge variant="outline" className="text-[10px] border-[#C29B57] text-[#C29B57]">
              SSO
            </Badge>
          </div>
          <div className="mt-3 pt-3 border-t border-border/40 flex justify-between items-center text-xs text-muted-foreground">
            <Link
              href="/"
              className="hover:text-[#76232D] transition-colors flex items-center gap-1"
            >
              <HefIcon name="ExternalLink" size="xs" />
              Xem Web Public
            </Link>
            <Link
              href="/login"
              className="hover:text-destructive transition-colors flex items-center gap-1"
            >
              <HefIcon name="LogOut" size="xs" />
              Đăng xuất
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-[#C29B57]/20 px-8 flex items-center justify-between shrink-0 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="font-serif text-lg font-bold text-[#76232D]">
              Diễn Đàn Kinh Tế Di Sản Việt Nam
            </div>
            <span className="text-xs text-muted-foreground hidden md:inline">|</span>
            <span className="text-xs text-muted-foreground hidden md:inline">
              Hệ thống Quản trị Trang & Section Động
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-muted-foreground">
              Môi trường: <span className="font-semibold text-emerald-700">Production Ready</span>
            </div>
            <Link
              href="/admin/pages"
              className="text-xs font-semibold bg-[#76232D] text-[#F5EFE5] px-3.5 py-1.5 rounded-md hover:bg-[#5e1c24] transition-colors flex items-center gap-1.5"
            >
              <HefIcon name="Plus" size="xs" />
              Thêm Section Mới
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
