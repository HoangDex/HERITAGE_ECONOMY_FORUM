"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { MessageSquare, ListOrdered, ChevronDown, ChevronUp } from "lucide-react";

interface PillarItem {
  id?: string;
  orderNumber?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  iconName?: string;
}

interface PillarsSectionFormProps {
  propsData: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

export function PillarsSectionForm({ propsData, onChange }: PillarsSectionFormProps) {
  const quickIntro =
    (propsData.quickIntro as {
      badge?: string;
      title?: string;
      content?: string;
      subContent?: string;
      actionLabel?: string;
      actionHref?: string;
    }) || {};

  const pillars = (Array.isArray(propsData.pillars)
    ? propsData.pillars
    : []) as PillarItem[];

  const [expandedPillar, setExpandedPillar] = useState<number | null>(0);

  const updatePillar = (index: number, field: keyof PillarItem, value: string) => {
    const updated = [...pillars];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange("pillars", updated);
  };

  return (
    <div className="space-y-4">
      {/* NHÓM 1: ĐỊNH HƯỚNG & GIỚI THIỆU NHANH (CỘT TRÁI WEB UI) */}
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#0D4838] uppercase tracking-wider">
          <MessageSquare className="w-4 h-4 text-[#C29B57]" />
          <span>Nhóm 1: Định Hướng & Giới Thiệu Nhanh (Cột Trái 40%)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">
              Huy Hiệu Khối (Badge)
            </label>
            <Input
              value={String(quickIntro.badge || "")}
              onChange={(e) =>
                onChange("quickIntro", { ...quickIntro, badge: e.target.value })
              }
              placeholder="Định Vị Diễn Đàn"
              className="h-9 text-xs bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">
              Tiêu Đề Định Hướng (H2)
            </label>
            <Input
              value={String(quickIntro.title || "")}
              onChange={(e) =>
                onChange("quickIntro", { ...quickIntro, title: e.target.value })
              }
              placeholder="Không Gian Đối Thoại & Chuyển Hóa Nguồn Lực Di Sản"
              className="h-9 text-xs bg-white"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#292929] block mb-1">
            Đoạn Văn Giới Thiệu Nhanh (Content Paragraph)
          </label>
          <textarea
            rows={3}
            value={String(quickIntro.content || "")}
            onChange={(e) =>
              onChange("quickIntro", { ...quickIntro, content: e.target.value })
            }
            className="w-full text-xs p-2.5 rounded-xl border border-[#dfd7c8] bg-white leading-relaxed"
            placeholder="Diễn đàn Kinh tế Di sản là không gian đối thoại liên ngành..."
          />
        </div>

        <div>
          <label className="text-xs font-bold text-[#292929] block mb-1">
            Thông Điệp Trích Dẫn Viền Vàng (Sub Content Quote)
          </label>
          <Input
            value={String(quickIntro.subContent || "")}
            onChange={(e) =>
              onChange("quickIntro", { ...quickIntro, subContent: e.target.value })
            }
            placeholder="Lấy di sản làm nguồn lực sáng tạo, lấy cộng đồng làm chủ thể..."
            className="h-9 text-xs bg-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">
              Nhãn Nút Tìm Hiểu (CTA Label)
            </label>
            <Input
              value={String(quickIntro.actionLabel || "")}
              onChange={(e) =>
                onChange("quickIntro", { ...quickIntro, actionLabel: e.target.value })
              }
              placeholder="Tìm hiểu tôn chỉ & cơ cấu tổ chức"
              className="h-9 text-xs bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">
              Đường Dẫn Nút (CTA Href)
            </label>
            <Input
              value={String(quickIntro.actionHref || "")}
              onChange={(e) =>
                onChange("quickIntro", { ...quickIntro, actionHref: e.target.value })
              }
              placeholder="/about"
              className="h-9 text-xs bg-white"
            />
          </div>
        </div>
      </div>

      {/* NHÓM 2: 05 TRỤ CỘT CHIẾN LƯỢC (CỘT PHẢI WEB UI) */}
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#dfd7c8]/60">
          <div className="flex items-center gap-2 text-xs font-bold text-[#76232D] uppercase tracking-wider">
            <ListOrdered className="w-4 h-4 text-[#C29B57]" />
            <span>Nhóm 2: 05 Trụ Cột Chiến Lược ({pillars.length} trụ cột)</span>
          </div>
        </div>

        <div className="space-y-2">
          {pillars.map((pil, idx) => {
            const isExpanded = expandedPillar === idx;
            return (
              <div
                key={String(pil.id || idx)}
                className="rounded-xl border border-[#dfd7c8] bg-white overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setExpandedPillar(isExpanded ? null : idx)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-[#FDFBF7] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#0D4838] text-white flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
                      {pil.orderNumber || `0${idx + 1}`}
                    </span>
                    <span className="font-bold text-xs text-[#292929]">
                      {pil.title || `Trụ cột ${idx + 1}`}
                    </span>
                    <span className="text-[11px] text-[#C29B57] font-semibold hidden sm:inline">
                      • {pil.subtitle || ""}
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Số Thứ Tự
                        </label>
                        <Input
                          value={String(pil.orderNumber || "")}
                          onChange={(e) => updatePillar(idx, "orderNumber", e.target.value)}
                          placeholder={`0${idx + 1}`}
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Tên Trụ Cột
                        </label>
                        <Input
                          value={String(pil.title || "")}
                          onChange={(e) => updatePillar(idx, "title", e.target.value)}
                          placeholder="Tên trụ cột"
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Tiêu Đề Phụ (Subtitle)
                        </label>
                        <Input
                          value={String(pil.subtitle || "")}
                          onChange={(e) => updatePillar(idx, "subtitle", e.target.value)}
                          placeholder="Khảo sát & Dữ liệu"
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#292929] block mb-1">
                        Mô Tả Chi Tiết Nhiệm Vụ Trụ Cột
                      </label>
                      <textarea
                        rows={2}
                        value={String(pil.description || "")}
                        onChange={(e) => updatePillar(idx, "description", e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border border-[#dfd7c8] bg-white leading-relaxed"
                        placeholder="Mô tả cụ thể định hướng hoạt động..."
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
