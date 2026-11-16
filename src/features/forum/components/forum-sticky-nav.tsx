/**
 * COMPONENT: FORUM STICKY NAV (ĐIỀU HƯỚNG NỘI TRANG KỲ DIỄN ĐÀN)
 * Thanh điều hướng ghim (sticky) đồng bộ chính xác theo từng phân đoạn nội dung:
 * [Tổng quan] | [4 Phiên Nghị sự] | [Lịch trình (Timeline)] | [Diễn giả Tiêu biểu] | [Kỷ yếu & Tài liệu] | [Ban Tổ Chức & Đối tác] | [Hỏi đáp (FAQ)]
 */

"use client";

import { useEffect, useState } from "react";

interface NavLinkItem {
  id: string;
  label: string;
  href: string;
}

const FORUM_NAV_LINKS: NavLinkItem[] = [
  { id: "tong-quan", label: "Tổng quan", href: "#tong-quan" },
  { id: "cac-phien", label: "4 Phiên Nghị sự", href: "#cac-phien" },
  { id: "timeline", label: "Lịch trình (Timeline)", href: "#timeline" },
  { id: "dien-gia", label: "Diễn giả Tiêu biểu", href: "#dien-gia" },
  { id: "tai-lieu", label: "Kỷ yếu & Tài liệu", href: "#tai-lieu" },
  { id: "doi-tac", label: "Ban Tổ Chức & Đối tác", href: "#doi-tac" },
  { id: "faq", label: "Hỏi đáp (FAQ)", href: "#faq" },
];

export function ForumStickyNav() {
  const [activeHash, setActiveHash] = useState("#tong-quan");

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash) {
        setActiveHash(window.location.hash);
      }
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <div className="sticky top-16 z-30 bg-[#F7F5EE]/95 backdrop-blur-md border-b border-[#dfd7c8] shadow-2xs">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        <nav className="flex items-center justify-start sm:justify-center gap-1 sm:gap-2.5 overflow-x-auto py-2.5 no-scrollbar text-xs sm:text-sm font-medium">
          {FORUM_NAV_LINKS.map((link) => {
            const isActive = activeHash === link.href;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setActiveHash(link.href)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#0D4838] text-white shadow-xs font-semibold"
                    : "text-[#5c554b] hover:text-[#0D4838] hover:bg-[#dfd7c8]/40"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
