"use client";

import React from "react";
import { Eye, EyeOff, ArrowUp, ArrowDown, Edit3, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PageSection } from "../types/page.types";

interface SectionItemCardProps {
  section: PageSection;
  index: number;
  totalSections: number;
  isPending: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onToggleVisibility: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function SectionItemCard({
  section,
  index,
  totalSections,
  isPending,
  onMoveUp,
  onMoveDown,
  onToggleVisibility,
  onEdit,
  onDelete,
}: SectionItemCardProps) {
  const propsCount = Object.keys(section.props || {}).length;

  return (
    <div
      className={`rounded-2xl border p-4 transition-all bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs ${
        section.isVisible
          ? "border-[#dfd7c8] hover:border-[#C29B57]"
          : "border-dashed border-gray-300 opacity-60 bg-gray-50"
      }`}
    >
      {/* Section Info */}
      <div className="flex items-start md:items-center gap-3">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
            section.isVisible ? "bg-[#0D4838] text-[#F7F5EE]" : "bg-gray-200 text-gray-500"
          }`}
        >
          {section.order < 10 ? `0${section.order}` : section.order}
        </div>

        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#292929]">
              {section.title || section.type}
            </h3>
            <Badge
              variant="outline"
              className="text-[10px] font-mono border-[#C29B57] text-[#8B6B2F] bg-[#F5EFE5]/50 px-2 py-0.5"
            >
              {section.type}
            </Badge>
            {section.isVisible ? (
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                <Eye className="w-3 h-3 text-emerald-600" /> Đang hiển thị
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                <EyeOff className="w-3 h-3" /> Đã ẩn
              </span>
            )}
          </div>

          {section.subtitle && (
            <p className="text-xs text-[#5c554b] line-clamp-1">{section.subtitle}</p>
          )}

          <div className="flex items-center gap-3 text-[11px] font-mono text-[#8c8273]">
            <span>ID: {section.id}</span>
            <span>•</span>
            <span>Thứ tự: #{section.order}</span>
            <span>•</span>
            <span>Props: {propsCount} thuộc tính</span>
          </div>
        </div>
      </div>

      {/* Controls (Move Up/Down, Edit, Visibility, Delete) */}
      <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
        <button
          type="button"
          onClick={onMoveUp}
          disabled={index === 0 || isPending}
          className="p-2 rounded-lg border border-[#dfd7c8] hover:bg-[#F5EFE5] text-[#5c554b] hover:text-[#0D4838] transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          title="Di chuyển lên trên"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={onMoveDown}
          disabled={index === totalSections - 1 || isPending}
          className="p-2 rounded-lg border border-[#dfd7c8] hover:bg-[#F5EFE5] text-[#5c554b] hover:text-[#0D4838] transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          title="Di chuyển xuống dưới"
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={onToggleVisibility}
          disabled={isPending}
          className={`p-2 rounded-lg border transition-colors cursor-pointer ${
            section.isVisible
              ? "border-[#dfd7c8] text-emerald-700 hover:bg-emerald-50"
              : "border-gray-300 text-gray-400 hover:bg-gray-100"
          }`}
          title={section.isVisible ? "Bấm để ẩn khỏi website" : "Bấm để kích hoạt hiển thị"}
        >
          {section.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>

        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="text-xs font-semibold border-[#C29B57]/50 text-[#0D4838] hover:bg-[#F5EFE5] cursor-pointer h-8"
        >
          <Edit3 className="w-3.5 h-3.5 mr-1 text-[#C29B57]" />
          Chỉnh Sửa
        </Button>

        <button
          type="button"
          onClick={onDelete}
          disabled={isPending}
          className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          title="Xóa section này"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
