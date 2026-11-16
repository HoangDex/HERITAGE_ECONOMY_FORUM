"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { SectionType } from "../types/page.types";

export interface SectionTypeOption {
  type: SectionType;
  label: string;
  desc: string;
  icon: string;
}

export const DEFAULT_SECTION_TYPE_OPTIONS: SectionTypeOption[] = [
  {
    type: "HERO",
    label: "Hero Banner",
    desc: "Tiêu đề lớn, slogan, ảnh bìa & 2 nút CTA",
    icon: "Layout",
  },
  {
    type: "PILLARS_5",
    label: "05 Trụ Cột",
    desc: "Khối giới thiệu 5 trụ cột hoạt động di sản",
    icon: "Layers",
  },
  {
    type: "EVENT_HIGHLIGHT",
    label: "Tiêu Điểm Kỳ Diễn Đàn",
    desc: "Thời gian, địa điểm, các phiên chuyên đề",
    icon: "Calendar",
  },
  {
    type: "AWARDS_SHOWCASE",
    label: "Vinh Danh Giải Thưởng",
    desc: "Giới thiệu giải thưởng bền vững & bình chọn",
    icon: "Award",
  },
  {
    type: "PROJECT_GRID",
    label: "Lưới Dự Án Kinh Tế",
    desc: "Danh sách mô hình di sản & chỉ số kinh tế",
    icon: "Folder",
  },
  {
    type: "NEWS_FEED",
    label: "Tin Tức & Báo Chí",
    desc: "Bài viết, nghiên cứu & thông cáo báo chí",
    icon: "FileText",
  },
  {
    type: "PARTNERS_SLIDER",
    label: "Dải Logo Đối Tác",
    desc: "Cơ quan chỉ đạo, chủ trì, tổ chức & đồng hành",
    icon: "Handshake",
  },
  {
    type: "CTA_BANNER",
    label: "Banner Kêu Gọi Hợp Tác",
    desc: "Khối kêu gọi đăng ký tham dự hoặc tài trợ",
    icon: "Sparkles",
  },
  {
    type: "TIMELINE",
    label: "Trục Thời Gian Lịch Trình",
    desc: "Lịch trình chi tiết các phiên tham luận",
    icon: "Clock",
  },
  {
    type: "SPEAKERS_GRID",
    label: "Hội Đồng Diễn Giả",
    desc: "Chân dung học giả, chuyên gia & đại biểu",
    icon: "Users",
  },
  {
    type: "ABOUT_COUNCIL",
    label: "Hội Đồng Diễn Đàn",
    desc: "Ban lãnh đạo khoa học & cố vấn quốc tế",
    icon: "Shield",
  },
  {
    type: "ABOUT_EXECUTIVE",
    label: "Ban Điều Hành Chuyên Trách",
    desc: "6 nhóm bộ phận tác nghiệp & liên hệ",
    icon: "Briefcase",
  },
  {
    type: "CUSTOM_HTML",
    label: "Khối Tùy Biến (Custom HTML)",
    desc: "Nội dung văn bản tự do hoặc nhúng mã",
    icon: "Code",
  },
];

interface SectionAddModalProps {
  isOpen: boolean;
  pageName: string;
  newType: SectionType;
  setNewType: (val: SectionType) => void;
  newTitle: string;
  setNewTitle: (val: string) => void;
  newSubtitle: string;
  setNewSubtitle: (val: string) => void;
  isPending: boolean;
  onClose: () => void;
  onAdd: () => void;
}

export function SectionAddModal({
  isOpen,
  pageName,
  newType,
  setNewType,
  newTitle,
  setNewTitle,
  newSubtitle,
  setNewSubtitle,
  isPending,
  onClose,
  onAdd,
}: SectionAddModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border-2 border-[#C29B57] max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-5 border-b border-[#dfd7c8] bg-[#F5EFE5]/50 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#C29B57] uppercase tracking-wider block">
              Trang: {pageName}
            </span>
            <h3 className="text-lg font-serif font-bold text-[#0D4838]">Thêm Khối Section Mới</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 font-bold text-sm p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#292929] uppercase tracking-wider">
              Chọn Loại Khối Section
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto p-1 border rounded-xl border-[#dfd7c8] bg-[#FDFBF7]">
              {DEFAULT_SECTION_TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => setNewType(opt.type)}
                  className={`p-2.5 rounded-lg text-left transition-all border cursor-pointer ${
                    newType === opt.type
                      ? "bg-[#0D4838] text-white border-[#0D4838] shadow-xs"
                      : "bg-white text-[#292929] border-[#dfd7c8] hover:border-[#C29B57]"
                  }`}
                >
                  <span className="text-xs font-bold block">{opt.label}</span>
                  <span
                    className={`text-[10px] line-clamp-1 ${newType === opt.type ? "text-white/80" : "text-[#5c554b]"}`}
                  >
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#292929] uppercase tracking-wider">
              Tiêu Đề Khối Mới
            </label>
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="VD: Không Gian Tọa Đàm Di Sản..."
              className="bg-[#FDFBF7] border-[#dfd7c8] text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#292929] uppercase tracking-wider">
              Phụ Đề (Tùy chọn)
            </label>
            <Input
              value={newSubtitle}
              onChange={(e) => setNewSubtitle(e.target.value)}
              placeholder="VD: Giới thiệu các chủ đề chuyên sâu..."
              className="bg-[#FDFBF7] border-[#dfd7c8] text-xs"
            />
          </div>
        </div>

        <div className="p-4 border-t border-[#dfd7c8] bg-[#F5EFE5]/40 flex items-center justify-end gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-xs font-semibold cursor-pointer"
          >
            Đóng
          </Button>
          <Button
            size="sm"
            onClick={onAdd}
            disabled={isPending}
            className="bg-[#0D4838] hover:bg-[#073327] text-white font-bold px-5 cursor-pointer shadow-sm"
          >
            {isPending ? "Đang thêm..." : "Tạo Section"}
          </Button>
        </div>
      </div>
    </div>
  );
}
