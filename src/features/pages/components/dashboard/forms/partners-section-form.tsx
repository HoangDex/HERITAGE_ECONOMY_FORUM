"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Network, Building2, ChevronDown, ChevronUp } from "lucide-react";

interface PartnerItem {
  id?: string;
  name?: string;
  shortName?: string;
  category?: string;
  categoryLabel?: string;
  logoUrl?: string;
  websiteUrl?: string;
  order?: number;
}

interface PartnersSectionFormProps {
  propsData: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

export function PartnersSectionForm({ propsData, onChange }: PartnersSectionFormProps) {
  const partners = (Array.isArray(propsData.partners) ? propsData.partners : []) as PartnerItem[];
  const [expandedPartner, setExpandedPartner] = useState<number | null>(0);

  const updatePartner = (index: number, field: keyof PartnerItem, value: string | number) => {
    const updated = [...partners];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange("partners", updated);
  };

  return (
    <div className="space-y-4">
      {/* NHÓM 1: TIÊU ĐỀ KHỐI ĐỐI TÁC */}
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#0D4838] uppercase tracking-wider">
          <Network className="w-4 h-4 text-[#C29B57]" />
          <span>Nhóm 1: Tiêu Đề & Phân Cấp Đối Tác</span>
        </div>

        <div>
          <label className="text-xs font-bold text-[#292929] block mb-1">
            Tiêu Đề Khối Đối Tác
          </label>
          <Input
            value={String(propsData.title || "")}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="Mạng Lưới Đối Tác Đồng Hành"
            className="h-9 text-xs bg-white"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-[#292929] block mb-1">Mô Tả Phân Nhóm Cấp Độ</label>
          <Input
            value={String(propsData.subtitle || "")}
            onChange={(e) => onChange("subtitle", e.target.value)}
            placeholder="Đơn vị Chỉ đạo, Chủ trì, Tổ chức và Đối tác Chiến lược"
            className="h-9 text-xs bg-white"
          />
        </div>
      </div>

      {/* NHÓM 2: DANH SÁCH ĐỐI TÁC */}
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#76232D] uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#C29B57]" />
            <span>Nhóm 2: Mạng Lưới Tổ Chức & Đối Tác ({partners.length} đơn vị)</span>
          </div>
        </div>

        <div className="space-y-2">
          {partners.map((p, idx) => {
            const isExpanded = expandedPartner === idx;
            return (
              <div
                key={String(p.id || idx)}
                className="rounded-xl border border-[#dfd7c8] bg-white overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setExpandedPartner(isExpanded ? null : idx)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-[#FDFBF7] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[#F5EFE5] text-[#76232D] font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <h6 className="font-bold text-xs text-[#292929] line-clamp-1">{p.name || ""}</h6>
                      <p className="text-[10px] text-[#8c8273]">
                        {p.shortName || ""} • {p.categoryLabel || p.category || ""}
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-stone-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-500" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-3 pt-0 border-t border-[#dfd7c8]/60 space-y-2 bg-[#FAF7F2]/40">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Tên Đầy Đủ
                        </label>
                        <Input
                          value={String(p.name || "")}
                          onChange={(e) => updatePartner(idx, "name", e.target.value)}
                          placeholder="Bộ Văn hóa, Thể thao và Du lịch"
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Tên Viết Tắt (Short Name)
                        </label>
                        <Input
                          value={String(p.shortName || "")}
                          onChange={(e) => updatePartner(idx, "shortName", e.target.value)}
                          placeholder="BVHTTDL"
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Nhóm Cấp Bậc (Category)
                        </label>
                        <Input
                          value={String(p.categoryLabel || p.category || "")}
                          onChange={(e) => {
                            updatePartner(idx, "categoryLabel", e.target.value);
                            updatePartner(idx, "category", e.target.value);
                          }}
                          placeholder="Cơ quan Chỉ đạo / Nhà Tài trợ..."
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Website Liên Kết
                        </label>
                        <Input
                          value={String(p.websiteUrl || "")}
                          onChange={(e) => updatePartner(idx, "websiteUrl", e.target.value)}
                          placeholder="https://..."
                          className="h-8 text-xs bg-white"
                        />
                      </div>
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
