"use client";

import React from "react";
import Link from "next/link";
import { Plus, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EditorHeaderProps {
  pageName: string;
  slug: string;
  isPublished: boolean;
  title: string;
  publicUrl: string;
  onOpenAddModal: () => void;
}

export function EditorHeader({
  pageName,
  slug,
  isPublished,
  title,
  publicUrl,
  onOpenAddModal,
}: EditorHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#C29B57]/20">
      <div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
          <Link href="/admin/dashboard" className="hover:text-[#0D4838]">
            Dashboard
          </Link>
          <span>/</span>
          <Link href="/admin/pages" className="hover:text-[#0D4838]">
            Quản lý Trang
          </Link>
          <span>/</span>
          <span className="text-[#0D4838] font-semibold">{pageName}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0D4838]">{pageName}</h1>
          <Badge className="bg-[#C29B57] text-[#292929] font-mono text-xs font-bold">/{slug}</Badge>
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
        </div>
        <p className="text-xs sm:text-sm text-[#5c554b] mt-1">{title}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <Link
          href={publicUrl}
          target="_blank"
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg border border-[#C29B57]/40 text-[#0D4838] bg-white hover:bg-[#F5EFE5] transition-colors shadow-2xs"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#C29B57]" />
          Xem Thử Trang Thực Tế
        </Link>
        <Button
          onClick={onOpenAddModal}
          className="bg-[#0D4838] hover:bg-[#073327] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm cursor-pointer flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Thêm Section Mới
        </Button>
      </div>
    </div>
  );
}
