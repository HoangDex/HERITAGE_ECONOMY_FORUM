"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PageSection } from "../types/page.types";

interface LayoutMockupTabProps {
  pageName: string;
  publicUrl: string;
  sections: PageSection[];
}

export function LayoutMockupTab({ pageName, publicUrl, sections }: LayoutMockupTabProps) {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-white border border-[#dfd7c8] flex items-center justify-between">
        <div>
          <h3 className="font-serif font-bold text-base text-[#0D4838]">
            Mô Phỏng Trực Quan Bố Cục Trang ({pageName})
          </h3>
          <p className="text-xs text-[#5c554b]">
            Thứ tự các khối section thực tế từ đỉnh trang (Header) xuống chân trang (Footer).
          </p>
        </div>
        <Link
          href={publicUrl}
          target="_blank"
          className="text-xs font-semibold text-[#0D4838] bg-[#F5EFE5] hover:bg-[#dfd7c8] px-3 py-1.5 rounded-lg border border-[#C29B57]/40 flex items-center gap-1.5"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Mở Tab Xem Thực Tế
        </Link>
      </div>

      <div className="max-w-2xl mx-auto space-y-2 py-4">
        {/* Mock Header */}
        <div className="p-3 rounded-lg bg-[#0D4838] text-white text-center text-xs font-bold uppercase tracking-widest shadow-xs">
          Thanh Điều Hướng Toàn Cục (Header & Menu Di Sản)
        </div>

        {/* Sections Wireframe */}
        {sections.map((sec, i) => (
          <div
            key={sec.id}
            className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between shadow-2xs ${
              sec.isVisible
                ? "bg-[#FDFBF7] border-[#C29B57]/60"
                : "bg-gray-100 border-dashed border-gray-300 opacity-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#0D4838]/10 text-[#0D4838] flex items-center justify-center font-bold text-xs">
                {i + 1}
              </span>
              <div>
                <span className="font-serif font-bold text-xs sm:text-sm text-[#292929] block">
                  {sec.title || sec.type}
                </span>
                <span className="text-[10px] text-[#8c8273] font-mono">Khối: {sec.type}</span>
              </div>
            </div>

            <Badge
              className={`text-[10px] font-semibold ${
                sec.isVisible ? "bg-[#0D4838] text-white" : "bg-gray-400 text-white"
              }`}
            >
              {sec.isVisible ? "Hiển thị" : "Đã ẩn"}
            </Badge>
          </div>
        ))}

        {/* Mock Footer */}
        <div className="p-3 rounded-lg bg-[#292929] text-white/80 text-center text-xs font-semibold shadow-xs">
          Chân Trang Toàn Cục (Footer, Bản Quyền & Đầu Mối Liên Hệ)
        </div>
      </div>
    </div>
  );
}
