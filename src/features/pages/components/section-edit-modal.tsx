"use client";

import React from "react";
import { Code, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { PageSection } from "../types/page.types";

interface SectionEditModalProps {
  editingSection: PageSection | null;
  editTitle: string;
  setEditTitle: (val: string) => void;
  editSubtitle: string;
  setEditSubtitle: (val: string) => void;
  editPropsJson: string;
  setEditPropsJson: (val: string) => void;
  jsonError: string | null;
  setJsonError: (val: string | null) => void;
  isPending: boolean;
  onClose: () => void;
  onSave: () => void;
}

export function SectionEditModal({
  editingSection,
  editTitle,
  setEditTitle,
  editSubtitle,
  setEditSubtitle,
  editPropsJson,
  setEditPropsJson,
  jsonError,
  setJsonError,
  isPending,
  onClose,
  onSave,
}: SectionEditModalProps) {
  if (!editingSection) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border-2 border-[#C29B57] max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#dfd7c8] bg-[#F5EFE5]/50 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#C29B57] uppercase tracking-wider block">
              Chỉnh Sửa Thuộc Tính Khối
            </span>
            <h3 className="text-lg font-serif font-bold text-[#0D4838]">
              {editingSection.title || editingSection.type}
            </h3>
          </div>
          <Badge className="bg-[#0D4838] text-white font-mono text-xs">{editingSection.type}</Badge>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#292929] uppercase tracking-wider">
              Tiêu Đề Khối (Section Title)
            </label>
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="bg-[#FDFBF7] border-[#dfd7c8] text-sm font-serif font-bold"
              placeholder="Nhập tiêu đề hiển thị..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#292929] uppercase tracking-wider">
              Phụ Đề / Trích Dẫn (Subtitle)
            </label>
            <Input
              value={editSubtitle}
              onChange={(e) => setEditSubtitle(e.target.value)}
              className="bg-[#FDFBF7] border-[#dfd7c8] text-xs"
              placeholder="Nhập dòng phụ đề mô tả ngắn..."
            />
          </div>

          {/* JSON Props Editor */}
          <div className="space-y-1.5 pt-2 border-t border-[#dfd7c8]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#0D4838] flex items-center gap-1.5">
                <Code className="w-4 h-4 text-[#C29B57]" />
                <span>Dữ Liệu Thuộc Tính Động (JSON Props)</span>
              </label>
              <span className="text-[10px] text-[#5c554b] font-mono">Hỗ trợ JSON hợp lệ</span>
            </div>

            <textarea
              value={editPropsJson}
              onChange={(e) => {
                setEditPropsJson(e.target.value);
                setJsonError(null);
              }}
              rows={8}
              className="w-full rounded-xl border border-[#dfd7c8] bg-[#1e1e1e] text-[#4ec9b0] font-mono text-xs p-3 leading-relaxed focus:outline-none focus:border-[#C29B57]"
              placeholder='{"limit": 4, "ctaText": "Xem thêm"}'
            />

            {jsonError && (
              <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{jsonError}</span>
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#dfd7c8] bg-[#F5EFE5]/40 flex items-center justify-end gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-xs font-semibold cursor-pointer"
          >
            Hủy Bỏ
          </Button>
          <Button
            size="sm"
            onClick={onSave}
            disabled={isPending}
            className="bg-[#0D4838] hover:bg-[#073327] text-white font-bold px-5 cursor-pointer shadow-sm"
          >
            {isPending ? "Đang lưu..." : "Lưu Thay Đổi"}
          </Button>
        </div>
      </div>
    </div>
  );
}
