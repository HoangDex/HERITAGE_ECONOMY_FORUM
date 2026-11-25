/**
 * COMPONENT: FORUM STICKY NAV (ĐIỀU HƯỚNG NỘI TRANG KỲ DIỄN ĐÀN)
 * Wireframe Desktop:
 * - ĐIỀU HƯỚNG STICKY: Tổng quan | Các phiên | Timeline | Diễn giả | Tài liệu | Kết quả
 * Wireframe Mobile:
 * - MENU NỘI TRANG: Tabs cuộn ngang
 */

"use client";

import React, { useEffect, useState } from "react";
import {
  Compass,
  Layers,
  Clock,
  Users,
  FolderDown,
  Award,
} from "lucide-react";

interface NavLinkItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const FORUM_NAV_LINKS: NavLinkItem[] = [
  { id: "tong-quan", label: "Tổng quan", icon: Compass, href: "#tong-quan" },
  { id: "cac-phien", label: "Các phiên", icon: Layers, href: "#cac-phien" },
  { id: "timeline", label: "Timeline", icon: Clock, href: "#timeline" },
  { id: "dien-gia", label: "Diễn giả", icon: Users, href: "#dien-gia" },
  { id: "tai-lieu", label: "Tài liệu", icon: FolderDown, href: "#tai-lieu" },
  { id: "ket-qua", label: "Kết quả", icon: Award, href: "#ket-qua" },
];

export function ForumStickyNav() {
  const [activeId, setActiveId] = useState("tong-quan");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = 180;

      for (let i = FORUM_NAV_LINKS.length - 1; i >= 0; i--) {
        const item = FORUM_NAV_LINKS[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop - offset;
          if (scrollY >= top) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -85;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Mục lục nội trang Kỳ Diễn đàn"
      className="sticky top-16 sm:top-[72px] z-30 w-full bg-[#FBF9F4]/95 backdrop-blur-md border-b border-[#dfd7c8] shadow-xs"
    >
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
        <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-3 overflow-x-auto py-2.5 no-scrollbar text-xs sm:text-sm font-medium">
          {FORUM_NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = activeId === link.id;

            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`whitespace-nowrap inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#0D4838] text-white shadow-xs font-semibold"
                    : "bg-white/80 hover:bg-white text-[#5c554b] hover:text-[#0D4838] border border-[#dfd7c8]/80 hover:border-[#C29B57]/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#C29B57]" : "text-[#7D7063]"}`} />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
