"use client";

import React from "react";
import {
  Save,
  Sliders,
  Code,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PageSection } from "../../types/page.types";
import { getSectionMeta } from "./section-meta";

interface SectionDashboardHeaderProps {
  section: PageSection;
  index: number;
  totalSections: number;
  editorMode: "visual" | "json";
  onSetEditorMode: (mode: "visual" | "json") => void;
  showPreview?: boolean;
  onTogglePreview?: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onToggleVisibility: () => void;
  onDelete: () => void;
  onSave: () => void;
  isPending: boolean;
}

export function SectionDashboardHeader({
  section,
  index,
  totalSections,
  editorMode,
  onSetEditorMode,
  showPreview = true,
  onTogglePreview,
  onMoveUp,
  onMoveDown,
  onToggleVisibility,
  onDelete,
  onSave,
  isPending,
}: SectionDashboardHeaderProps) {
  const meta = getSectionMeta(section.type, section.title);
  const ActiveIcon = meta.icon;

  return (
    <div className="sticky top-2 z-20 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-[#dfd7c8] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-3">
      {/* Thông tin khối hiện tại */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-[#F5EFE5] border border-[#C29B57]/40 flex items-center justify-center text-[#76232D] shrink-0">
          <ActiveIcon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-mono font-bold text-[#C29B57]">Khối #{index + 1}</span>
            <Badge className="bg-[#76232D] text-white text-xs font-mono">{section.type}</Badge>
            {section.isVisible ? (
              <Badge className="bg-emerald-600 text-white text-xs">Đang hiển thị</Badge>
            ) : (
              <Badge variant="outline" className="text-xs border-stone-400 text-stone-600">
                Đã ẩn
              </Badge>
            )}
          </div>
          <h2 className="text-base sm:text-lg font-serif font-bold text-[#292929] truncate mt-0.5">
            {section.title || meta.label}
          </h2>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="flex items-center gap-2 flex-wrap shrink-0">
        {/* Chuyển tab Visual / JSON */}
        <div className="flex items-center bg-[#F5EFE5] p-1 rounded-xl border border-[#dfd7c8] text-sm">
          <button
            type="button"
            onClick={() => onSetEditorMode("visual")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              editorMode === "visual"
                ? "bg-white text-[#76232D] shadow-2xs"
                : "text-[#5c554b] hover:text-[#292929]"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Trực Quan</span>
          </button>
          <button
            type="button"
            onClick={() => onSetEditorMode("json")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              editorMode === "json"
                ? "bg-white text-[#76232D] shadow-2xs"
                : "text-[#5c554b] hover:text-[#292929]"
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>
        </div>

        {/* Nút Bật/Tắt Live Preview */}
        {onTogglePreview && (
          <Button
            size="sm"
            variant="outline"
            onClick={onTogglePreview}
            className={`h-9 text-sm font-semibold rounded-xl cursor-pointer ${
              showPreview
                ? "border-[#C29B57] text-[#0D4838] bg-[#F5EFE5]"
                : "border-stone-300 text-stone-600 bg-white"
            }`}
            title={showPreview ? "Thu gọn màn hình xem trước" : "Mở màn hình xem trước"}
          >
            <Eye className="w-4 h-4 mr-1.5 text-[#C29B57]" />
            <span className="hidden sm:inline">{showPreview ? "Ẩn Xem Trước" : "Xem Trước"}</span>
          </Button>
        )}

        {/* Nút Bật/Ẩn */}
        <Button
          size="sm"
          variant="outline"
          onClick={onToggleVisibility}
          disabled={isPending}
          className={`h-9 text-sm font-semibold rounded-xl cursor-pointer ${
            section.isVisible
              ? "border-emerald-300 text-emerald-800 bg-emerald-50/60 hover:bg-emerald-100"
              : "border-stone-300 text-stone-600 bg-stone-50 hover:bg-stone-100"
          }`}
          title={section.isVisible ? "Ẩn khối này trên web" : "Bật hiển thị khối này trên web"}
        >
          {section.isVisible ? (
            <>
              <Eye className="w-4 h-4 sm:mr-1.5 text-emerald-600" />
              <span className="hidden sm:inline">Hiện</span>
            </>
          ) : (
            <>
              <EyeOff className="w-4 h-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Ẩn</span>
            </>
          )}
        </Button>

        {/* Nút Thứ tự Lên / Xuống */}
        <div className="flex items-center border border-[#dfd7c8] rounded-xl overflow-hidden bg-[#FDFBF7]">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0 || isPending}
            className="p-2 hover:bg-[#F5EFE5] text-[#5c554b] hover:text-[#0D4838] transition-colors disabled:opacity-30 cursor-pointer"
            title="Đẩy lên trước"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-4 bg-[#dfd7c8]" />
          <button
            type="button"
            onClick={onMoveDown}
            disabled={index === totalSections - 1 || isPending}
            className="p-2 hover:bg-[#F5EFE5] text-[#5c554b] hover:text-[#0D4838] transition-colors disabled:opacity-30 cursor-pointer"
            title="Đẩy xuống dưới"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>

        {/* Nút Xóa */}
        <button
          type="button"
          onClick={onDelete}
          disabled={isPending}
          className="p-2 rounded-xl text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
          title="Xóa section này"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* Nút Lưu CSDL Duy Nhất */}
        <Button
          onClick={onSave}
          disabled={isPending}
          className="h-9 text-sm bg-[#0D4838] hover:bg-[#073327] text-white rounded-xl px-4.5 cursor-pointer font-bold shadow-xs hover:shadow-md transition-all ring-1 ring-[#C29B57]/50"
        >
          <Save className="w-4 h-4 mr-2 text-[#C29B57]" />
          <span>{isPending ? "Đang lưu..." : "Lưu Thay Đổi"}</span>
        </Button>
      </div>
    </div>
  );
}
