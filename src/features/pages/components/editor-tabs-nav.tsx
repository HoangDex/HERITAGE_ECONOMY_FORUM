"use client";

import React from "react";
import { Sliders, Layers, Settings, Layout } from "lucide-react";

export type EditorTabType = "dashboard" | "sections" | "settings" | "preview";

interface EditorTabsNavProps {
  activeTab: EditorTabType;
  onTabChange: (tab: EditorTabType) => void;
  sectionCount: number;
}

export function EditorTabsNav({ activeTab, onTabChange, sectionCount }: EditorTabsNavProps) {
  return (
    <div className="flex items-center gap-2 border-b border-[#dfd7c8] pb-1.5 overflow-x-auto no-scrollbar">
      <button
        type="button"
        onClick={() => onTabChange("dashboard")}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
          activeTab === "dashboard"
            ? "bg-[#0D4838] text-white shadow-xs"
            : "text-[#5c554b] hover:text-[#292929] hover:bg-white"
        }`}
      >
        <Sliders
          className={`w-4 h-4 ${activeTab === "dashboard" ? "text-[#C29B57]" : "text-[#76232D]"}`}
        />
        <span>Chỉnh Sửa Sections ({sectionCount})</span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange("sections")}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
          activeTab === "sections"
            ? "bg-[#0D4838] text-white shadow-xs"
            : "text-[#5c554b] hover:text-[#292929] hover:bg-white"
        }`}
      >
        <Layers
          className={`w-4 h-4 ${activeTab === "sections" ? "text-[#C29B57]" : "text-[#76232D]"}`}
        />
        <span>Sắp Xếp & Danh Sách</span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange("settings")}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
          activeTab === "settings"
            ? "bg-[#0D4838] text-white shadow-xs"
            : "text-[#5c554b] hover:text-[#292929] hover:bg-white"
        }`}
      >
        <Settings
          className={`w-4 h-4 ${activeTab === "settings" ? "text-[#C29B57]" : "text-[#76232D]"}`}
        />
        <span>Cài Đặt Trang & SEO</span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange("preview")}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
          activeTab === "preview"
            ? "bg-[#0D4838] text-white shadow-xs"
            : "text-[#5c554b] hover:text-[#292929] hover:bg-white"
        }`}
      >
        <Layout
          className={`w-4 h-4 ${activeTab === "preview" ? "text-[#C29B57]" : "text-[#76232D]"}`}
        />
        <span>Sơ Đồ Bố Cục</span>
      </button>
    </div>
  );
}
