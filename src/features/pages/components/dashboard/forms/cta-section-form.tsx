"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Sparkles, Calendar, Award, Handshake, ChevronDown, ChevronUp } from "lucide-react";

interface CtaCardItem {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

interface CtaSectionFormProps {
  propsData: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

export function CtaSectionForm({ propsData, onChange }: CtaSectionFormProps) {
  const cards = (Array.isArray(propsData.cards) && propsData.cards.length > 0
    ? propsData.cards
    : [
        {
          title: "Đăng Ký Tham Dự Phiên Toàn Thể",
          description: "Tham dự các phiên nghị sự, đối thoại chính sách và kết nối chuyên gia.",
          ctaText: "Đăng ký ngay",
          ctaLink: "/contact?loai=tham-du#contact-form",
        },
        {
          title: "Nộp Hồ Sơ Đề Cử Giải Thưởng",
          description: "Gửi hồ sơ tham gia Giải thưởng Phát triển Bền vững Chủ động 2026.",
          ctaText: "Nộp hồ sơ đề cử",
          ctaLink: "/contact?loai=giai-thuong#contact-form",
        },
        {
          title: "Đối Tác Chiến Lược & Hợp Tác",
          description: "Kết nối tài trợ, đồng hành học thuật và bảo trợ truyền thông.",
          ctaText: "Liên hệ hợp tác",
          ctaLink: "/contact?loai=hop-tac#contact-form",
        },
      ]) as CtaCardItem[];

  const [expandedCard, setExpandedCard] = useState<number | null>(0);

  const updateCard = (index: number, field: keyof CtaCardItem, value: string) => {
    const updated = [...cards];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange("cards", updated);
  };

  return (
    <div className="space-y-4">
      {/* NHÓM 1: THÔNG ĐIỆP KÊU GỌI HÀNH ĐỘNG */}
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#76232D] uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#C29B57]" />
          <span>Nhóm 1: Thông Điệp Kêu Gọi</span>
        </div>

        <div>
          <label className="text-xs font-bold text-[#292929] block mb-1">
            Tiêu Đề Lớn (Headline Kêu Gọi)
          </label>
          <Input
            value={String(propsData.title || propsData.headline || "")}
            onChange={(e) => {
              onChange("title", e.target.value);
              onChange("headline", e.target.value);
            }}
            placeholder="Cùng Kiến Tạo Giá Trị Di Sản"
            className="h-9 text-xs bg-white"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-[#292929] block mb-1">Đoạn Văn Mô Tả</label>
          <textarea
            rows={2}
            value={String(propsData.subtitle || propsData.description || "")}
            onChange={(e) => {
              onChange("subtitle", e.target.value);
              onChange("description", e.target.value);
            }}
            className="w-full text-xs p-2.5 rounded-xl border border-[#dfd7c8] bg-white leading-relaxed"
            placeholder="Mỗi sáng kiến, tham luận và nguồn lực của quý vị..."
          />
        </div>
      </div>

      {/* NHÓM 2: 03 TUYẾN CHUYỂN ĐỔI CHÍNH */}
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#0D4838] uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Handshake className="w-4 h-4 text-[#C29B57]" />
            <span>Nhóm 2: 03 Tuyến Chuyển Đổi Hành Động</span>
          </div>
        </div>

        <div className="space-y-2">
          {cards.map((card, idx) => {
            const isExpanded = expandedCard === idx;
            const CardIcon = idx === 0 ? Calendar : idx === 1 ? Award : Handshake;
            return (
              <div
                key={idx}
                className="rounded-xl border border-[#dfd7c8] bg-white overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setExpandedCard(isExpanded ? null : idx)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-[#FDFBF7] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[#0D4838] text-white flex items-center justify-center shrink-0">
                      <CardIcon className="w-3.5 h-3.5 text-[#C29B57]" />
                    </div>
                    <span className="font-bold text-xs text-[#292929] line-clamp-1">
                      Tuyến 0{idx + 1}: {card.title || ""}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-stone-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-500" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-3 pt-0 border-t border-[#dfd7c8]/60 space-y-2 bg-[#FAF7F2]/40">
                    <div className="pt-2">
                      <label className="text-[11px] font-bold text-[#292929] block mb-1">
                        Tiêu Đề Thẻ
                      </label>
                      <Input
                        value={String(card.title || "")}
                        onChange={(e) => updateCard(idx, "title", e.target.value)}
                        placeholder="Tiêu đề..."
                        className="h-8 text-xs bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Nhãn Nút Bấm
                        </label>
                        <Input
                          value={String(card.ctaText || "")}
                          onChange={(e) => updateCard(idx, "ctaText", e.target.value)}
                          placeholder="Đăng ký ngay"
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Đường Dẫn Nút Bấm
                        </label>
                        <Input
                          value={String(card.ctaLink || "")}
                          onChange={(e) => updateCard(idx, "ctaLink", e.target.value)}
                          placeholder="/contact"
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#292929] block mb-1">
                        Mô Tả Hướng Dẫn
                      </label>
                      <textarea
                        rows={2}
                        value={String(card.description || "")}
                        onChange={(e) => updateCard(idx, "description", e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border border-[#dfd7c8] bg-white leading-relaxed"
                        placeholder="Mô tả cụ thể hành động..."
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
