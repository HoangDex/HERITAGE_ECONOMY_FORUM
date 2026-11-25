"use client";

import React, { useState, useEffect, useDeferredValue } from "react";
import {
  CheckCircle,
  AlertCircle,
  Layers,
  Sliders,
  Settings,
  Layout,
  Eye,
  EyeOff,
  Save,
  Code,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { PageEntity, PageSection } from "../types/page.types";
import { useUpdateSectionMutation } from "../hooks/use-page-sections-query";
import {
  getSectionMeta,
  SectionDashboardPreview,
  RawJsonEditor,
  SectionFormDispatcher,
} from "./dashboard";

export { getSectionMeta };

interface SectionDashboardViewProps {
  pageId: string;
  pageSlug: string;
  sections: PageSection[];
  selectedSectionId: string;
  onSelectSection: (sectionId: string) => void;
  onSectionUpdated: (updatedPage: PageEntity) => void;
  onMoveSection: (currentIndex: number, direction: "up" | "down") => void;
  onToggleVisibility: (section: PageSection) => void;
  onDeleteSection: (section: PageSection) => void;
  onOpenAddModal?: () => void;
  isPending: boolean;
  activeTab?: "dashboard" | "sections" | "settings" | "preview";
  onTabChange?: (tab: "dashboard" | "sections" | "settings" | "preview") => void;
}

export function SectionDashboardView({
  pageId,
  pageSlug,
  sections,
  selectedSectionId,
  onSelectSection,
  onSectionUpdated,
  onMoveSection,
  onToggleVisibility,
  onDeleteSection,
  onOpenAddModal,
  isPending: parentPending,
  activeTab = "dashboard",
  onTabChange,
}: SectionDashboardViewProps) {
  // TanStack Query Mutation
  const updateSectionMutation = useUpdateSectionMutation(pageId);
  const isPending = parentPending || updateSectionMutation.isPending;

  // Active section
  const activeSection = sections.find((s) => s.id === selectedSectionId) || sections[0];
  const activeIndex = sections.findIndex((s) => s.id === activeSection?.id);

  // Form states for active section
  const [sectionTitle, setSectionTitle] = useState(activeSection?.title || "");
  const [sectionSubtitle, setSectionSubtitle] = useState(activeSection?.subtitle || "");
  const [propsData, setPropsData] = useState<Record<string, unknown>>(
    (activeSection?.props as Record<string, unknown>) || {}
  );
  const [editorMode, setEditorMode] = useState<"visual" | "json">("visual");
  const [showPreview, setShowPreview] = useState(true);
  const [rawJson, setRawJson] = useState(JSON.stringify(activeSection?.props || {}, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  // useDeferredValue để tối ưu hiệu năng render Preview thời gian thực:
  // Cho phép người dùng gõ phím mượt mà ở form mà không bị giật lag re-render preview DOM
  const deferredPropsData = useDeferredValue(propsData);
  const deferredTitle = useDeferredValue(sectionTitle);
  const deferredSubtitle = useDeferredValue(sectionSubtitle);

  const isFirstMount = React.useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (activeSection) {
      setSectionTitle(activeSection.title || "");
      setSectionSubtitle(activeSection.subtitle || "");
      const propsObj = (activeSection.props as Record<string, unknown>) || {};
      setPropsData(propsObj);
      setRawJson(JSON.stringify(propsObj, null, 2));
      setJsonError(null);
    }
  }, [activeSection?.id]);

  const feedbackTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const showNotification = (type: "success" | "error", message: string) => {
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    setFeedback({ type, message });
    feedbackTimerRef.current = setTimeout(() => setFeedback(null), 4000);
  };

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    };
  }, []);

  // Tối ưu hóa: Không gọi JSON.stringify trên mỗi ký tự nhập vào để tránh garbage collection và đơ UI
  const handlePropChange = (key: string, value: unknown) => {
    setPropsData((prev) => ({ ...prev, [key]: value }));
  };

  const handleModeSwitch = (mode: "visual" | "json") => {
    if (mode === "json") {
      setRawJson(JSON.stringify(propsData, null, 2));
      setJsonError(null);
    }
    setEditorMode(mode);
  };

  const handleRawJsonChange = (text: string) => {
    setRawJson(text);
    try {
      if (!text.trim()) {
        setPropsData({});
        setJsonError(null);
        return;
      }
      const parsed = JSON.parse(text);
      setPropsData(parsed);
      setJsonError(null);
    } catch {
      setJsonError("Lỗi cú pháp JSON. Vui lòng kiểm tra dấu phẩy hoặc dấu ngoặc.");
    }
  };

  const handleSaveCurrentSection = async () => {
    if (!activeSection) return;

    if (jsonError) {
      showNotification("error", "Vui lòng sửa lỗi cú pháp JSON trước khi lưu");
      return;
    }

    try {
      const updatedPage = await updateSectionMutation.mutateAsync({
        sectionId: activeSection.id,
        dto: {
          title: sectionTitle,
          subtitle: sectionSubtitle,
          props: propsData,
        },
      });

      onSectionUpdated(updatedPage);
      showNotification(
        "success",
        `Đã lưu dữ liệu khối "${sectionTitle || activeSection.type}" vào CSDL`
      );
    } catch (err: unknown) {
      showNotification(
        "error",
        err instanceof Error ? err.message : "Lỗi lưu dữ liệu section"
      );
    }
  };

  if (!activeSection) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-[#dfd7c8]">
        <Layers className="w-10 h-10 text-[#C29B57] mx-auto mb-3" />
        <h3 className="text-base font-serif font-bold text-[#292929]">Chưa có khối Section nào</h3>
        <p className="text-xs text-[#5c554b] mt-1 mb-4">
          Không tìm thấy khối Section nào trong trang này.
        </p>
      </div>
    );
  }

  const publicUrl = `/${pageSlug === "home" ? "" : pageSlug}`;

  return (
    <div className="space-y-4">
      {/* Toast Feedback */}
      {feedback && (
        <div
          className={`p-3.5 rounded-xl flex items-center justify-between text-xs font-semibold shadow-xs animate-in fade-in duration-200 ${
            feedback.type === "success"
              ? "bg-emerald-50 border border-emerald-300 text-emerald-800"
              : "bg-red-50 border border-red-300 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-[11px] underline opacity-80 hover:opacity-100 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      )}

      {/* KHỐI NAV CHUNG GROUP (TÁCH 2 HÀNG NỘI BỘ: HÀNG 1 TABS TRANG & NÚT LƯU | HÀNG 2 NAV SECTION) */}
      <div className="sticky top-2 z-20 bg-white/95 backdrop-blur-md rounded-2xl border border-[#dfd7c8] shadow-md overflow-hidden">
        {/* HÀNG 1: CÁC TAB ĐIỀU HƯỚNG TRANG CHÍNH & CỤM NÚT LƯU + XEM TRƯỚC */}
        <div className="p-2.5 flex items-center justify-between gap-3">
          {/* CÁC TAB ĐIỀU HƯỚNG TRANG CHÍNH */}
          {onTabChange && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => onTabChange("dashboard")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "dashboard"
                    ? "bg-[#0D4838] text-white shadow-xs"
                    : "text-[#5c554b] hover:text-[#292929] hover:bg-[#F5EFE5]"
                }`}
              >
                <Sliders
                  className={`w-3.5 h-3.5 ${
                    activeTab === "dashboard" ? "text-[#C29B57]" : "text-[#76232D]"
                  }`}
                />
                <span>Chỉnh Sửa Sections ({sections.length})</span>
              </button>

              <button
                type="button"
                onClick={() => onTabChange("sections")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "sections"
                    ? "bg-[#0D4838] text-white shadow-xs"
                    : "text-[#5c554b] hover:text-[#292929] hover:bg-[#F5EFE5]"
                }`}
              >
                <Layers
                  className={`w-3.5 h-3.5 ${
                    activeTab === "sections" ? "text-[#C29B57]" : "text-[#76232D]"
                  }`}
                />
                <span>Sắp Xếp & Danh Sách</span>
              </button>

              <button
                type="button"
                onClick={() => onTabChange("settings")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "settings"
                    ? "bg-[#0D4838] text-white shadow-xs"
                    : "text-[#5c554b] hover:text-[#292929] hover:bg-[#F5EFE5]"
                }`}
              >
                <Settings
                  className={`w-3.5 h-3.5 ${
                    activeTab === "settings" ? "text-[#C29B57]" : "text-[#76232D]"
                  }`}
                />
                <span>Cài Đặt Trang & SEO</span>
              </button>

              <button
                type="button"
                onClick={() => onTabChange("preview")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "preview"
                    ? "bg-[#0D4838] text-white shadow-xs"
                    : "text-[#5c554b] hover:text-[#292929] hover:bg-[#F5EFE5]"
                }`}
              >
                <Layout
                  className={`w-3.5 h-3.5 ${
                    activeTab === "preview" ? "text-[#C29B57]" : "text-[#76232D]"
                  }`}
                />
                <span>Sơ Đồ Bố Cục</span>
              </button>
            </div>
          )}

          {/* CỤM NÚT XEM TRƯỚC VÀ NÚT LƯU THAY ĐỔI DUY NHẤT */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowPreview((prev) => !prev)}
              className={`h-8 text-xs sm:text-sm font-semibold rounded-xl cursor-pointer ${
                showPreview
                  ? "border-[#C29B57] text-[#0D4838] bg-[#F5EFE5]"
                  : "border-[#dfd7c8] text-stone-600 bg-white"
              }`}
              title={showPreview ? "Thu gọn màn hình xem trước" : "Mở màn hình xem trước"}
            >
              <Eye className="w-3.5 h-3.5 mr-1 text-[#C29B57]" />
              <span className="hidden sm:inline">{showPreview ? "Ẩn Xem Trước" : "Xem Trước"}</span>
            </Button>

            <Button
              size="sm"
              onClick={handleSaveCurrentSection}
              disabled={isPending}
              className="h-8 text-xs sm:text-sm bg-[#0D4838] hover:bg-[#073327] text-white rounded-xl px-4 cursor-pointer font-bold shadow-xs hover:shadow-md transition-all ring-1 ring-[#C29B57]/50"
            >
              <Save className="w-3.5 h-3.5 mr-1.5 text-[#C29B57]" />
              <span>{isPending ? "Đang lưu..." : "Lưu Thay Đổi"}</span>
            </Button>
          </div>
        </div>

        {/* ĐƯỜNG PHÂN TÁCH NỘI BỘ (CHUNG GROUP, KHÔNG CÓ GAP RỜI RẠC) */}
        <div className="h-[1px] bg-[#dfd7c8]/80" />

        {/* HÀNG 2: NAV CHO CÁC KHỐI SECTION (LINE DƯỚI TINH GỌN, KHÔNG BORDER 2 BÊN) */}
        <div className="w-full flex items-stretch border-b border-[#dfd7c8]/80 bg-white overflow-x-auto no-scrollbar">
          {sections.map((sec) => {
            const secMeta = getSectionMeta(sec.type, sec.title);
            const Icon = secMeta.icon;
            const isSelected = sec.id === activeSection.id;

            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => onSelectSection(sec.id)}
                className={`flex-1 min-w-[125px] flex items-center justify-center gap-2 py-3 px-3 text-xs sm:text-sm cursor-pointer whitespace-nowrap transition-colors select-none -mb-[1px] border-b-2 ${
                  isSelected
                    ? "border-[#76232D] text-[#76232D] font-bold bg-[#76232D]/[0.03]"
                    : "border-transparent text-[#5c554b] hover:text-[#292929] hover:bg-stone-50 font-medium"
                }`}
                title={sec.title || secMeta.shortName}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isSelected ? "text-[#76232D]" : "text-[#76232D]/70"
                  }`}
                />
                <span className="tracking-tight truncate">
                  {secMeta.shortName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Khung Soạn Thảo Nội Dung (Gom nhóm khoa học + Live Preview thời gian thực) */}
      <div
        className={`grid grid-cols-1 ${
          showPreview ? "lg:grid-cols-12" : "grid-cols-1"
        } gap-5 items-start`}
      >
        {/* CỘT FORM TRÁI: GOM NHÓM KHOA HỌC, DỄ NHẬP LIỆU */}
        <div
          className={`${
            showPreview
              ? "lg:col-span-6 xl:col-span-6 2xl:col-span-6"
              : "col-span-1"
          } bg-white p-5 sm:p-6 rounded-2xl border border-[#dfd7c8] shadow-2xs space-y-4`}
        >
          {/* 1. Nhóm Thông tin cơ bản của khối + Toggle trạng thái hiển thị */}
          <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#dfd7c8]/60">
              <div className="flex items-center gap-2 text-xs font-bold text-[#76232D] uppercase tracking-wider">
                <span className="w-1.5 h-4 bg-[#76232D] rounded-full" />
                <span>
                  Khối #{activeIndex + 1}: {sectionTitle || activeSection.type}
                </span>
              </div>
              {/* Trạng thái hiển thị toggle */}
              <button
                type="button"
                onClick={() => onToggleVisibility(activeSection)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer border transition-colors ${
                  activeSection.isVisible
                    ? "bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100"
                    : "bg-stone-100 border-stone-300 text-stone-600 hover:bg-stone-200"
                }`}
                title={activeSection.isVisible ? "Bấm để ẩn khối này trên web" : "Bấm để hiện khối này trên web"}
              >
                {activeSection.isVisible ? (
                  <>
                    <Eye className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Đang hiển thị</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-stone-500" />
                    <span>Đang ẩn</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#292929] block mb-1">
                  Tiêu Đề Khối Hiển Thị
                </label>
                <Input
                  value={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                  placeholder="Tiêu đề section..."
                  className="h-9 text-xs bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#292929] block mb-1">
                  Tiêu Đề Phụ (Subtitle)
                </label>
                <Input
                  value={sectionSubtitle}
                  onChange={(e) => setSectionSubtitle(e.target.value)}
                  placeholder="Tiêu đề phụ / mô tả ngắn..."
                  className="h-9 text-xs bg-white"
                />
              </div>
            </div>
          </div>

          {/* 2. Cấu hình chi tiết trường dữ liệu (Gom nhóm theo nghiệp vụ) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-[#5c554b] uppercase tracking-wider">
                Dữ Liệu Nội Dung Khối
              </span>
              <div className="flex items-center bg-[#F5EFE5] p-0.5 rounded-lg border border-[#dfd7c8]">
                <button
                  type="button"
                  onClick={() => handleModeSwitch("visual")}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                    editorMode === "visual"
                      ? "bg-white text-[#0D4838] shadow-xs"
                      : "text-[#5c554b] hover:text-[#292929]"
                  }`}
                >
                  <FileText className="w-3 h-3" />
                  <span>Trực Quan</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleModeSwitch("json")}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                    editorMode === "json"
                      ? "bg-white text-[#0D4838] shadow-xs"
                      : "text-[#5c554b] hover:text-[#292929]"
                  }`}
                >
                  <Code className="w-3 h-3" />
                  <span>Mã Nguồn JSON</span>
                </button>
              </div>
            </div>

            {/* Chế độ Visual Form hoặc Raw JSON */}
            {editorMode === "visual" ? (
              <SectionFormDispatcher
                type={activeSection.type}
                propsData={propsData}
                onChange={handlePropChange}
              />
            ) : (
              <RawJsonEditor
                rawJson={rawJson}
                jsonError={jsonError}
                onChange={handleRawJsonChange}
              />
            )}
          </div>

          {/* Thanh tác vụ cuối trang: Chỉ giữ khôi phục, nút Lưu duy nhất ở thanh tác vụ trên */}
          <div className="pt-4 border-t border-[#dfd7c8]/60 flex items-center justify-between gap-3 text-xs text-[#5c554b]">
            <span>
              Đang sửa Khối #{activeIndex + 1}:{" "}
              <strong className="text-[#292929]">
                {sectionTitle || activeSection.type}
              </strong>
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setSectionTitle(activeSection.title || "");
                setSectionSubtitle(activeSection.subtitle || "");
                const propsObj =
                  (activeSection.props as Record<string, unknown>) || {};
                setPropsData(propsObj);
                setRawJson(JSON.stringify(propsObj, null, 2));
              }}
              disabled={isPending}
              className="h-8 text-xs cursor-pointer border-[#dfd7c8] hover:bg-[#F5EFE5] text-[#5c554b]"
            >
              Khôi Phục Ban Đầu
            </Button>
          </div>
        </div>

        {/* CỘT PHẢI: LIVE PREVIEW DÀNH RIÊNG CHO TỪNG SECTION (BỐ CỤC CHUẨN XÁC NHƯ WEBSITE THẬT) */}
        {showPreview && (
          <div className="lg:col-span-6 xl:col-span-6 2xl:col-span-6">
            <SectionDashboardPreview
              section={activeSection}
              title={deferredTitle}
              subtitle={deferredSubtitle}
              propsData={deferredPropsData}
              publicUrl={publicUrl}
              order={activeIndex + 1}
            />
          </div>
        )}
      </div>
    </div>
  );
}
