"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Award, Calendar, CheckCircle2, Link as LinkIcon, Plus, Trash2 } from "lucide-react";

interface AwardsSectionFormProps {
  propsData: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

export function AwardsSectionForm({ propsData, onChange }: AwardsSectionFormProps) {
  const criteria = (Array.isArray(propsData.criteria) ? propsData.criteria : []) as string[];
  const [newCrit, setNewCrit] = useState("");

  const addCriterion = () => {
    if (!newCrit.trim()) return;
    onChange("criteria", [...criteria, newCrit.trim()]);
    setNewCrit("");
  };

  const removeCriterion = (idx: number) => {
    onChange("criteria", criteria.filter((_, i) => i !== idx));
  };

  const updateCriterion = (idx: number, val: string) => {
    const updated = [...criteria];
    updated[idx] = val;
    onChange("criteria", updated);
  };

  return (
    <div className="space-y-4">
      {/* NHÓM 1: NHẬN DIỆN & TÊN GIẢI THƯỞNG */}
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#76232D] uppercase tracking-wider">
          <Award className="w-4 h-4 text-[#C29B57]" />
          <span>Nhóm 1: Nhận Diện & Tên Giải Thưởng</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Huy Hiệu Giải Thưởng (Badge)</label>
            <Input
              value={String(propsData.badge || "")}
              onChange={(e) => onChange("badge", e.target.value)}
              placeholder="GIẢI THƯỞNG QUỐC GIA 2026"
              className="h-9 text-xs bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Tên Giải Thưởng (Award Name)</label>
            <Input
              value={String(propsData.awardName || "")}
              onChange={(e) => onChange("awardName", e.target.value)}
              placeholder="Giải Thưởng Phát Triển Bền Vững Chủ Động"
              className="h-9 text-xs bg-white"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#292929] block mb-1">Khẩu Hiệu / Tuyên Ngôn (Subtitle)</label>
          <Input
            value={String(propsData.subtitle || "")}
            onChange={(e) => onChange("subtitle", e.target.value)}
            placeholder="Kiến tạo giá trị – Phụng sự vị nhân sinh"
            className="h-9 text-xs bg-white"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-[#292929] block mb-1">Mô Tả & Ý Nghĩa Giải Thưởng</label>
          <textarea
            rows={3}
            value={String(propsData.description || "")}
            onChange={(e) => onChange("description", e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-[#dfd7c8] bg-white leading-relaxed"
            placeholder="Hệ thống giải thưởng tôn vinh các tổ chức, doanh nghiệp..."
          />
        </div>
      </div>

      {/* NHÓM 2: LỊCH TRÌNH & NÚT HÀNH ĐỘNG */}
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#0D4838] uppercase tracking-wider">
          <Calendar className="w-4 h-4 text-[#C29B57]" />
          <span>Nhóm 2: Lịch Trình & Tuyến Hành Động</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Hạn Chót Đề Cử</label>
            <Input
              value={String(propsData.nominationDeadline || "")}
              onChange={(e) => onChange("nominationDeadline", e.target.value)}
              placeholder="15/10/2026"
              className="h-9 text-xs bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Link Nộp Hồ Sơ</label>
            <Input
              value={String(propsData.nominationUrl || "")}
              onChange={(e) => onChange("nominationUrl", e.target.value)}
              placeholder="/contact?loai=giai-thuong#contact-form"
              className="h-9 text-xs bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Link Quy Chế Giải</label>
            <Input
              value={String(propsData.regulationsUrl || "")}
              onChange={(e) => onChange("regulationsUrl", e.target.value)}
              placeholder="/awards"
              className="h-9 text-xs bg-white"
            />
          </div>
        </div>
      </div>

      {/* NHÓM 3: TIÊU CHÍ ĐÁNH GIÁ */}
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#0D4838] uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C29B57]" />
            <span>Nhóm 3: Tiêu Chí Đánh Giá Xét Thưởng ({criteria.length} tiêu chí)</span>
          </div>
        </div>

        <div className="space-y-2">
          {criteria.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#C29B57] text-[#041D16] flex items-center justify-center font-bold text-xs shrink-0">
                0{idx + 1}
              </span>
              <Input
                value={item}
                onChange={(e) => updateCriterion(idx, e.target.value)}
                className="h-8 text-xs bg-white flex-1"
              />
              <button
                type="button"
                onClick={() => removeCriterion(idx)}
                className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                title="Xóa tiêu chí"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          <div className="flex items-center gap-2 pt-1">
            <Input
              value={newCrit}
              onChange={(e) => setNewCrit(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCriterion();
                }
              }}
              placeholder="Thêm tiêu chí mới..."
              className="h-8 text-xs bg-white flex-1"
            />
            <button
              type="button"
              onClick={addCriterion}
              className="px-3 h-8 rounded-lg bg-[#0D4838] text-white text-xs font-bold flex items-center gap-1 hover:bg-[#073327] transition-colors shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
