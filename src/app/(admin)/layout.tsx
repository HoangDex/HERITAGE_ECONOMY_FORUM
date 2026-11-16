import React from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { HefIcon } from "@/components/icons/hef-icon";

export const metadata = {
  title: "HEF Admin CMS - Quản trị Nội dung Di sản",
  description: "Hệ thống quản trị nội dung đa tầng và dynamic sections cho Diễn đàn Kinh tế Di sản",
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#FBF9F5] text-[#292929] flex">
      {/* Sidebar Admin phong cách Xanh Ngọc Lục Bảo Di Sản & Vàng Đồng */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 h-full flex flex-col min-w-0">
        {/* Top Header thanh thoát: Breadcrumb + Theme Toggle + Xem Website */}
        <header className="h-14 bg-white border-b border-[#E8E2D5] px-6 sm:px-8 flex items-center justify-between shrink-0 shadow-2xs z-10">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium text-[#0D4838]">Quản trị</span>
            <span>›</span>
            <span className="font-semibold text-[#132A24]">Trang chủ & Dynamic Sections</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Pill (☀️ 🌙) */}
            <div className="flex items-center bg-[#F7F5EE] p-1 rounded-full border border-[#DCD3C3] text-xs">
              <span className="p-1 rounded-full bg-white shadow-2xs text-[#0D4838] leading-none">
                <HefIcon name="Sun" size="xs" />
              </span>
              <span className="p-1 text-muted-foreground leading-none">
                <HefIcon name="Moon" size="xs" />
              </span>
            </div>

            {/* Nút Xem Website */}
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#C29B57]/40 text-[#0D4838] bg-[#FDFBF7] hover:bg-[#F7F5EE] transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <HefIcon name="ExternalLink" size="xs" className="text-[#C29B57]" />
              <span>Xem website</span>
            </Link>
          </div>
        </header>

        {/* Content Body - Cuộn độc lập */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
