"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Sparkles, Users, Clock, ChevronDown, ChevronUp, Image as ImageIcon } from "lucide-react";

interface SessionItem {
  id?: string;
  order?: number;
  time?: string;
  title?: string;
  description?: string;
  room?: string;
  chairperson?: string;
  imageUrl?: string;
}

interface EventSectionFormProps {
  propsData: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

export function EventSectionForm({ propsData, onChange }: EventSectionFormProps) {
  const sessions = (Array.isArray(propsData.sessions) ? propsData.sessions : []) as SessionItem[];
  const [expandedSession, setExpandedSession] = useState<number | null>(0);

  const updateSession = (index: number, field: keyof SessionItem, value: string | number) => {
    const updated = [...sessions];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange("sessions", updated);
  };

  return (
    <div className="space-y-4">
      {/* NHÓM 1: NHẬN DIỆN & CHỦ ĐỀ SỰ KIỆN */}
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#76232D] uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#C29B57]" />
          <span>Nhóm 1: Nhận Diện & Chủ Đề Kỳ Diễn Đàn</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Phiên Bản Kỳ Diễn Đàn</label>
            <Input
              value={String(propsData.edition || "")}
              onChange={(e) => onChange("edition", e.target.value)}
              placeholder="Kỳ Diễn Đàn Thường Niên 2026"
              className="h-9 text-xs bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Huy Hiệu Trạng Thái</label>
            <Input
              value={String(propsData.statusBadge || "")}
              onChange={(e) => onChange("statusBadge", e.target.value)}
              placeholder="ĐANG MỞ ĐĂNG KÝ ĐẠI BIỂU"
              className="h-9 text-xs bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Tiêu Đề Khối (Heading H2)</label>
            <Input
              value={String(propsData.heading || "")}
              onChange={(e) => onChange("heading", e.target.value)}
              placeholder="Kỳ Diễn Đàn Đang Diễn Ra"
              className="h-9 text-xs bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Tiêu Đề Chủ Đề (Topic Title)</label>
            <Input
              value={String(propsData.title || "")}
              onChange={(e) => onChange("title", e.target.value)}
              placeholder="Kinh Tế Di Sản Trong Kỷ Nguyên Số..."
              className="h-9 text-xs bg-white"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#292929] block mb-1">Mô Tả Tổng Quan Chủ Đề</label>
          <textarea
            rows={2}
            value={String(propsData.description || "")}
            onChange={(e) => onChange("description", e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-[#dfd7c8] bg-white leading-relaxed"
            placeholder="Quy tụ hơn 500 đại biểu là lãnh đạo các bộ ban ngành, đại sứ quán..."
          />
        </div>
      </div>

      {/* NHÓM 2: THỜI GIAN & ĐỊA ĐIỂM TỔ CHỨC */}
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#0D4838] uppercase tracking-wider">
          <Calendar className="w-4 h-4 text-[#C29B57]" />
          <span>Nhóm 2: Lịch Trình, Địa Điểm & Đăng Ký</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Thời Gian Diễn Ra</label>
            <Input
              value={String(propsData.dates || "")}
              onChange={(e) => onChange("dates", e.target.value)}
              placeholder="15 – 17 tháng 11 năm 2026"
              className="h-9 text-xs bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Địa Điểm Tổ Chức</label>
            <Input
              value={String(propsData.location || "")}
              onChange={(e) => onChange("location", e.target.value)}
              placeholder="Trung tâm Hội nghị Quốc tế & Hoàng thành Thăng Long, Hà Nội"
              className="h-9 text-xs bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Đại Biểu Dự Kiến</label>
            <Input
              type="number"
              value={Number(propsData.attendeesExpected || 500)}
              onChange={(e) => onChange("attendeesExpected", Number(e.target.value))}
              className="h-9 text-xs bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Hạn Chót Đăng Ký</label>
            <Input
              value={String(propsData.registrationDeadline || "")}
              onChange={(e) => onChange("registrationDeadline", e.target.value)}
              placeholder="10/11/2026"
              className="h-9 text-xs bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Đường Dẫn Đăng Ký</label>
            <Input
              value={String(propsData.registrationUrl || "")}
              onChange={(e) => onChange("registrationUrl", e.target.value)}
              placeholder="/contact?loai=tham-du#contact-form"
              className="h-9 text-xs bg-white"
            />
          </div>
        </div>
      </div>

      {/* NHÓM 3: PHIÊN LÀM VIỆC SỰ KIỆN */}
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#0D4838] uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C29B57]" />
            <span>Nhóm 3: Các Phiên Thảo Luận Chuyên Đề ({sessions.length} phiên)</span>
          </div>
        </div>

        <div className="space-y-2">
          {sessions.map((s, idx) => {
            const isExpanded = expandedSession === idx;
            return (
              <div
                key={String(s.id || idx)}
                className="rounded-xl border border-[#dfd7c8] bg-white overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setExpandedSession(isExpanded ? null : idx)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-[#FDFBF7] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[#0D4838] text-white flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-xs text-[#292929] line-clamp-1">
                      {s.title || `Phiên ${idx + 1}`}
                    </span>
                    <span className="text-[11px] text-[#C29B57] font-semibold hidden sm:inline">
                      • {s.time || ""}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-stone-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-500" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-3 pt-0 border-t border-[#dfd7c8]/60 space-y-2.5 bg-[#FAF7F2]/40">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Tên Phiên Thảo Luận
                        </label>
                        <Input
                          value={String(s.title || "")}
                          onChange={(e) => updateSession(idx, "title", e.target.value)}
                          placeholder="Phiên toàn thể / Chuyên đề..."
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Khung Giờ & Ngày
                        </label>
                        <Input
                          value={String(s.time || "")}
                          onChange={(e) => updateSession(idx, "time", e.target.value)}
                          placeholder="08:00 - 11:30 | 15/11/2026"
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Hội Trường / Phòng Họp
                        </label>
                        <Input
                          value={String(s.room || "")}
                          onChange={(e) => updateSession(idx, "room", e.target.value)}
                          placeholder="Đại sảnh Hội nghị Thăng Long"
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Chủ Trì / Diễn Giả Chính
                        </label>
                        <Input
                          value={String(s.chairperson || "")}
                          onChange={(e) => updateSession(idx, "chairperson", e.target.value)}
                          placeholder="GS.TS. Trần Quốc Vượng"
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#292929] block mb-1">
                        Ảnh Minh Họa Phiên (URL)
                      </label>
                      <Input
                        value={String(s.imageUrl || "")}
                        onChange={(e) => updateSession(idx, "imageUrl", e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="h-8 text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#292929] block mb-1">
                        Mô Tả Trọng Tâm Phiên
                      </label>
                      <textarea
                        rows={2}
                        value={String(s.description || "")}
                        onChange={(e) => updateSession(idx, "description", e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border border-[#dfd7c8] bg-white leading-relaxed"
                        placeholder="Nội dung chính được thảo luận trong phiên..."
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
