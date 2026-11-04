"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Tổng quan", href: "#tong-quan" },
  { label: "4 Phiên Nghị sự", href: "#cac-phien" },
  { label: "Lịch trình (Timeline)", href: "#timeline" },
  { label: "Diễn giả Tiêu biểu", href: "#dien-gia" },
  { label: "Kỷ yếu & Tài liệu", href: "#tai-lieu" },
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
    <div className="sticky top-16 z-30 bg-[#F5EFE5]/95 backdrop-blur-md border-b border-[#dfd7c8] shadow-xs">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        <nav className="flex items-center gap-2 sm:gap-6 overflow-x-auto py-3 no-scrollbar text-sm font-medium">
          {NAV_LINKS.map((link) => {
            const isActive = activeHash === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveHash(link.href)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full transition-colors ${
                  isActive
                    ? "bg-[#76232D] text-white shadow-xs"
                    : "text-[#5c554b] hover:text-[#76232D] hover:bg-[#dfd7c8]/40"
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
