"use client";

import React from "react";
import type { PageSection } from "../../types/page.types";
import { getSectionMeta } from "./section-meta";

interface SectionDashboardNavProps {
  sections: PageSection[];
  activeSectionId: string;
  onSelectSection: (sectionId: string) => void;
  onOpenAddModal?: () => void;
}

export function SectionDashboardNav({
  sections,
  activeSectionId,
  onSelectSection,
}: SectionDashboardNavProps) {
  return (
    <div className="bg-white p-2.5 rounded-2xl border border-[#dfd7c8] shadow-2xs flex items-center gap-2.5">
      {/* Label & Total badge */}
      <div className="hidden sm:flex items-center gap-2 pl-2 pr-1 shrink-0 text-sm font-bold text-[#0D4838]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#C29B57]" />
        <span>Sections ({sections.length}):</span>
      </div>

      {/* Danh sách tabs section cuộn ngang */}
      <div className="flex-1 flex items-center gap-2 overflow-x-auto py-0.5 no-scrollbar scroll-smooth">
        {sections.map((sec, idx) => {
          const secMeta = getSectionMeta(sec.type, sec.title);
          const Icon = secMeta.icon;
          const isSelected = sec.id === activeSectionId;

          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => onSelectSection(sec.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                isSelected
                  ? "bg-[#76232D] text-white shadow-xs ring-1 ring-[#C29B57]"
                  : "bg-[#FDFBF7] text-[#292929] hover:bg-[#F5EFE5] hover:border-[#C29B57]/50 border border-[#dfd7c8]"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold transition-colors ${
                  isSelected
                    ? "bg-[#C29B57] text-[#132A24]"
                    : "bg-white text-[#5c554b] border border-[#dfd7c8]"
                }`}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <Icon className={`w-4 h-4 ${isSelected ? "text-[#C29B57]" : "text-[#76232D]"}`} />
              <span className="tracking-tight text-sm font-semibold">{secMeta.shortName}</span>
              {sec.isVisible ? (
                <span
                  className="w-2 h-2 rounded-full bg-emerald-500 shadow-2xs"
                  title="Đang hiển thị"
                />
              ) : (
                <span className="w-2 h-2 rounded-full bg-stone-300" title="Đã ẩn" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
