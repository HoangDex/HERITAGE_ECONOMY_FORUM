"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Compass, Users, Sparkles, Building2 } from "lucide-react";

interface AboutSectionsFormProps {
  type: string;
  propsData: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

export function AboutSectionsForm({ type, propsData, onChange }: AboutSectionsFormProps) {
  if (type === "ABOUT_BANNER") {
    return (
      <div className="space-y-4">
        <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#76232D] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#C29B57]" />
            <span>Nhóm 1: Tiêu Đề Banner Giới Thiệu</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#292929] block mb-1">Tiêu Đề Tiếng Việt</label>
              <Input
                value={String(propsData.title || "")}
                onChange={(e) => onChange("title", e.target.value)}
                placeholder="VỀ DIỄN ĐÀN KINH TẾ DI SẢN"
                className="h-9 text-xs bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#292929] block mb-1">Tiêu Đề Tiếng Anh</label>
              <Input
                value={String(propsData.englishTitle || "")}
                onChange={(e) => onChange("englishTitle", e.target.value)}
                placeholder="VIETNAM HERITAGE ECONOMY FORUM (HEF)"
                className="h-9 text-xs bg-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Slogan</label>
            <Input
              value={String(propsData.slogan || "")}
              onChange={(e) => onChange("slogan", e.target.value)}
              placeholder="Di sản kiến tạo giá trị – Phát triển hướng tương lai"
              className="h-9 text-xs bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Mô Tả Nền Tảng</label>
            <textarea
              rows={3}
              value={String(propsData.description || "")}
              onChange={(e) => onChange("description", e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-[#dfd7c8] bg-white"
              placeholder="Quy tụ các nhà khoa học, chuyên gia bảo tồn..."
            />
          </div>
        </div>
      </div>
    );
  }

  if (type === "ABOUT_VISION_MISSION") {
    const coreValues = Array.isArray(propsData.coreValues) ? propsData.coreValues : [];

    return (
      <div className="space-y-4">
        <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#0D4838] uppercase tracking-wider">
            <Compass className="w-4 h-4 text-[#C29B57]" />
            <span>Nhóm 1: Tôn Chỉ & Định Hướng Nền Tảng</span>
          </div>

          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Giới Thiệu Nền Tảng</label>
            <textarea
              rows={3}
              value={String(propsData.aboutPlatform || "")}
              onChange={(e) => onChange("aboutPlatform", e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-[#dfd7c8] bg-white"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#292929] block mb-1">Tầm Nhìn (Vision)</label>
              <textarea
                rows={2}
                value={String(propsData.vision || "")}
                onChange={(e) => onChange("vision", e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#dfd7c8] bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#292929] block mb-1">Sứ Mệnh (Mission)</label>
              <textarea
                rows={2}
                value={String(propsData.mission || "")}
                onChange={(e) => onChange("mission", e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#dfd7c8] bg-white"
              />
            </div>
          </div>
        </div>

        {coreValues.length > 0 && (
          <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#76232D] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#C29B57]" />
              <span>Nhóm 2: 05 Giá Trị Cốt Lõi ({coreValues.length} giá trị)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
              {coreValues.map((val: Record<string, unknown>, idx: number) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg border border-[#dfd7c8] bg-white text-xs flex items-center justify-between shadow-2xs"
                >
                  <span className="font-semibold text-[#292929]">{String(val.title || "")}</span>
                  <span className="text-[10px] text-[#8c8273]">{String(val.iconName || "")}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ABOUT_COUNCIL, ABOUT_EXECUTIVE, ABOUT_PARTNERS
  const president = (propsData.president as Record<string, unknown>) || {};
  const executiveHead = (propsData.executiveHead as Record<string, unknown>) || {};
  const items = Array.isArray(propsData.partners)
    ? propsData.partners
    : Array.isArray(propsData.councilMembers)
      ? propsData.councilMembers
      : [];

  return (
    <div className="space-y-4">
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#0D4838] uppercase tracking-wider">
          <Users className="w-4 h-4 text-[#C29B57]" />
          <span>Nhóm 1: Tiêu Đề Khối & Người Đứng Đầu</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Tiêu Đề Khối</label>
            <Input
              value={String(propsData.title || "")}
              onChange={(e) => onChange("title", e.target.value)}
              placeholder="Tiêu đề khối"
              className="h-9 text-xs bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Tiêu Đề Phụ</label>
            <Input
              value={String(propsData.subtitle || "")}
              onChange={(e) => onChange("subtitle", e.target.value)}
              placeholder="Mô tả tiêu đề phụ"
              className="h-9 text-xs bg-white"
            />
          </div>
        </div>

        {Boolean(president.fullName) && (
          <div className="p-3 rounded-xl border border-[#dfd7c8] bg-white text-xs space-y-1">
            <span className="text-[10px] font-bold text-[#76232D] uppercase">Chủ Tịch Hội Đồng</span>
            <p className="font-bold text-sm text-[#292929]">{String(president.fullName)}</p>
            <p className="text-[#5c554b]">{String(president.organization || "")}</p>
          </div>
        )}

        {Boolean(executiveHead.fullName) && (
          <div className="p-3 rounded-xl border border-[#dfd7c8] bg-white text-xs space-y-1">
            <span className="text-[10px] font-bold text-[#0D4838] uppercase">Trưởng Ban Điều Hành</span>
            <p className="font-bold text-sm text-[#292929]">{String(executiveHead.fullName)}</p>
            <p className="text-[#5c554b]">{String(executiveHead.positionTitle || "")}</p>
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#76232D] uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-[#C29B57]" />
            <span>Nhóm 2: Danh Sách Thành Phần ({items.length} thành viên/đối tác)</span>
          </div>

          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {items.map((item: Record<string, unknown>, idx: number) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg border border-[#dfd7c8] bg-white text-xs flex justify-between shadow-2xs"
              >
                <span className="font-semibold text-[#292929]">
                  {String(item.fullName || item.name || "")}
                </span>
                <span className="text-[10px] text-[#8c8273]">
                  {String(item.positionTitle || item.category || "")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
