"use client";

import React from "react";
import { Layers, Settings, Layout } from "lucide-react";

export type EditorTabType = "sections" | "settings" | "preview";

interface EditorTabsNavProps {
  activeTab: EditorTabType;
  onTabChange: (tab: EditorTabType) => void;
  sectionCount: number;
}

export function EditorTabsNav({ activeTab, onTabChange, sectionCount }: EditorTabsNavProps) {
  return (
    <div className="flex items-center gap-2 border-b border-[#dfd7c8] pb-1">
      <button
        type="button"
        onClick={() => onTabChange("sections")}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-colors cursor-pointer border-b-2 ${
          activeTab === "sections"
            ? "border-[#0D4838] text-[#0D4838] bg-white shadow-2xs"
            : "border-transparent text-[#5c554b] hover:text-[#292929] hover:bg-[#F5EFE5]"
        }`}
      >
        <Layers className="w-4 h-4 text-[#C29B57]" />
        <span>Khối Sections Động ({sectionCount})</span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange("settings")}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-colors cursor-pointer border-b-2 ${
          activeTab === "settings"
            ? "border-[#0D4838] text-[#0D4838] bg-white shadow-2xs"
            : "border-transparent text-[#5c554b] hover:text-[#292929] hover:bg-[#F5EFE5]"
        }`}
      >
        <Settings className="w-4 h-4 text-[#C29B57]" />
        <span>Cài Đặt Trang & SEO</span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange("preview")}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-colors cursor-pointer border-b-2 ${
          activeTab === "preview"
            ? "border-[#0D4838] text-[#0D4838] bg-white shadow-2xs"
            : "border-transparent text-[#5c554b] hover:text-[#292929] hover:bg-[#F5EFE5]"
        }`}
      >
        <Layout className="w-4 h-4 text-[#C29B57]" />
        <span>Sơ Đồ Bố Cục (Mockup)</span>
      </button>
    </div>
  );
}
