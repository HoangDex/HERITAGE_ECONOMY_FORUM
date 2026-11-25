"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EditorHeaderProps {
  pageName: string;
  slug: string;
  isPublished: boolean;
  title: string;
  publicUrl: string;
  onOpenAddModal?: () => void;
}

export function EditorHeader({
  pageName,
  slug,
  isPublished,
  title,
  publicUrl,
}: EditorHeaderProps) {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#dfd7c8] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-1.5">
          <Link href="/admin/dashboard" className="hover:text-[#0D4838]">
            Dashboard
          </Link>
          <span>›</span>
          <span className="text-[#0D4838] font-bold">{pageName}</span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0D4838]">{pageName}</h1>
          <Badge className="bg-[#F5EFE5] text-[#76232D] border border-[#C29B57]/40 font-mono text-xs font-bold">
            /{slug}
          </Badge>
          {isPublished ? (
            <Badge className="bg-emerald-600 text-white text-xs">Đang hoạt động</Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-xs border-amber-500 text-amber-700 bg-amber-50"
            >
              Bản nháp
            </Badge>
          )}
          {title && <span className="text-sm text-[#5c554b] hidden md:inline">• {title}</span>}
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <Link
          href={publicUrl}
          target="_blank"
          className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl border border-[#C29B57]/40 text-[#0D4838] bg-[#FDFBF7] hover:bg-[#F5EFE5] transition-colors shadow-2xs"
        >
          <ExternalLink className="w-4 h-4 text-[#C29B57]" />
          <span>Xem Thực Tế Trang Web</span>
        </Link>
      </div>
    </div>
  );
}
