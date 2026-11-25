"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import type { PageEntity, PageSection, SectionType } from "../types/page.types";
import {
  usePageDetailQuery,
  useReorderSectionsMutation,
  useToggleSectionVisibilityMutation,
  useUpdateSectionMutation,
  useRemoveSectionMutation,
  useAddSectionMutation,
  useUpdatePageMutation,
} from "../hooks/use-page-sections-query";
import { EditorHeader } from "./editor-header";
import { EditorTabsNav, type EditorTabType } from "./editor-tabs-nav";
import { SectionDashboardView } from "./section-dashboard-view";
import { SectionsTab } from "./sections-tab";
import { SettingsTab } from "./settings-tab";
import { LayoutMockupTab } from "./layout-mockup-tab";
import { SectionEditModal } from "./section-edit-modal";
import { SectionAddModal } from "./section-add-modal";

interface PageContentEditorProps {
  initialPage: PageEntity;
}

export function PageContentEditor({ initialPage }: PageContentEditorProps) {
  // TanStack Query Cache State & Mutations
  const { data: page = initialPage } = usePageDetailQuery(initialPage);
  const reorderMutation = useReorderSectionsMutation(page.id);
  const toggleVisibilityMutation = useToggleSectionVisibilityMutation(page.id);
  const updateSectionMutation = useUpdateSectionMutation(page.id);
  const removeSectionMutation = useRemoveSectionMutation(page.id);
  const addSectionMutation = useAddSectionMutation(page.id);
  const updatePageMutation = useUpdatePageMutation(page.id);

  const isPending =
    reorderMutation.isPending ||
    toggleVisibilityMutation.isPending ||
    updateSectionMutation.isPending ||
    removeSectionMutation.isPending ||
    addSectionMutation.isPending ||
    updatePageMutation.isPending;

  const [activeTab, setActiveTab] = useState<EditorTabType>("dashboard");
  const [selectedSectionId, setSelectedSectionId] = useState<string>(
    page.sections[0]?.id || ""
  );
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  // Modal / Editing State
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Edit Section Form State
  const [editTitle, setEditTitle] = useState("");
  const [editSubtitle, setEditSubtitle] = useState("");
  const [editPropsJson, setEditPropsJson] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);

  // New Section Form State
  const [newType, setNewType] = useState<SectionType>("HERO");
  const [newTitle, setNewTitle] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");

  // Page Settings Form State
  const [pageTitle, setPageTitle] = useState(page.title);
  const [pageDescription, setPageDescription] = useState(page.description || "");
  const [isPublished, setIsPublished] = useState(page.isPublished);
  const [metaTitle, setMetaTitle] = useState(page.seoProps?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(page.seoProps?.metaDescription || "");
  const [ogImage, setOgImage] = useState(page.seoProps?.ogImage || "");

  const isFirstMount = React.useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setPageTitle(page.title);
    setPageDescription(page.description || "");
    setIsPublished(page.isPublished);
    setMetaTitle(page.seoProps?.metaTitle || "");
    setMetaDescription(page.seoProps?.metaDescription || "");
    setOgImage(page.seoProps?.ogImage || "");
  }, [page.id, page.updatedAt]);

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

  // 1. Move Section Up/Down
  const handleMove = async (currentIndex: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= page.sections.length) return;

    const reordered = [...page.sections];
    const [moved] = reordered.splice(currentIndex, 1);
    reordered.splice(targetIndex, 0, moved);

    const sectionIds = reordered.map((s) => s.id);
    try {
      await reorderMutation.mutateAsync(sectionIds);
      showNotification("success", "Đã cập nhật thứ tự các khối section");
    } catch (err: unknown) {
      showNotification("error", err instanceof Error ? err.message : "Lỗi cập nhật thứ tự");
    }
  };

  // 2. Toggle Section Visibility
  const handleToggleVisibility = async (section: PageSection) => {
    try {
      await toggleVisibilityMutation.mutateAsync({
        sectionId: section.id,
        isVisible: !section.isVisible,
      });
      showNotification(
        "success",
        `Đã ${!section.isVisible ? "bật" : "tắt"} hiển thị khối "${section.title || section.type}"`
      );
    } catch (err: unknown) {
      showNotification("error", err instanceof Error ? err.message : "Lỗi thay đổi trạng thái");
    }
  };

  // 3. Open Edit Section Modal
  const openEditModal = (section: PageSection) => {
    setEditingSection(section);
    setEditTitle(section.title || "");
    setEditSubtitle(section.subtitle || "");
    setEditPropsJson(JSON.stringify(section.props || {}, null, 2));
    setJsonError(null);
  };

  // 4. Save Edited Section
  const handleSaveSection = async () => {
    if (!editingSection) return;

    let parsedProps = {};
    try {
      if (editPropsJson.trim()) {
        parsedProps = JSON.parse(editPropsJson);
      }
    } catch {
      setJsonError("Định dạng JSON Props không hợp lệ. Vui lòng kiểm tra dấu ngoặc hoặc dấu phẩy.");
      return;
    }

    try {
      await updateSectionMutation.mutateAsync({
        sectionId: editingSection.id,
        dto: {
          title: editTitle,
          subtitle: editSubtitle,
          props: parsedProps,
        },
      });
      setEditingSection(null);
      showNotification("success", "Đã lưu nội dung section thành công");
    } catch (err: unknown) {
      showNotification("error", err instanceof Error ? err.message : "Lỗi lưu section");
    }
  };

  // 5. Delete Section
  const handleDeleteSection = async (section: PageSection) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa khối "${section.title || section.type}"?`)) return;

    try {
      await removeSectionMutation.mutateAsync(section.id);
      showNotification("success", `Đã xóa khối "${section.title || section.type}"`);
    } catch (err: unknown) {
      showNotification("error", err instanceof Error ? err.message : "Lỗi khi xóa section");
    }
  };

  // 6. Add New Section
  const handleAddSection = async () => {
    if (!newTitle.trim()) {
      showNotification("error", "Vui lòng nhập tiêu đề cho khối section mới");
      return;
    }

    try {
      await addSectionMutation.mutateAsync({
        type: newType,
        title: newTitle,
        subtitle: newSubtitle,
        order: page.sections.length + 1,
        isVisible: true,
        props: {},
      });
      setIsAddModalOpen(false);
      setNewTitle("");
      setNewSubtitle("");
      showNotification("success", "Đã thêm khối section mới thành công");
    } catch (err: unknown) {
      showNotification("error", err instanceof Error ? err.message : "Lỗi thêm section");
    }
  };

  // 7. Save Page Settings & SEO
  const handleSavePageSettings = async () => {
    try {
      await updatePageMutation.mutateAsync({
        title: pageTitle,
        description: pageDescription,
        isPublished,
        seoProps: {
          metaTitle,
          metaDescription,
          ogImage,
        },
      });
      showNotification("success", "Đã cập nhật thông tin trang & SEO thành công");
    } catch (err: unknown) {
      showNotification("error", err instanceof Error ? err.message : "Lỗi lưu thông tin trang");
    }
  };

  const publicUrl = `/${page.slug === "trang-chu" ? "" : page.slug}`;

  return (
    <div className="space-y-4">
      {/* Toast Notification */}
      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between text-sm shadow-md transition-all ${
            feedback.type === "success"
              ? "bg-emerald-50 border border-emerald-300 text-emerald-800"
              : "bg-red-50 border border-red-300 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span className="font-medium">{feedback.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-xs font-bold px-2 py-1 rounded hover:bg-black/5 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      )}

      {/* Page Title & Breadcrumb Header */}
      <EditorHeader
        pageName={page.name}
        slug={page.slug}
        isPublished={page.isPublished}
        title={page.title}
        publicUrl={publicUrl}
      />

      {/* Tabs Navigation (Chỉ hiện khi ở ngoài tab dashboard vì tab dashboard đã tích hợp thanh nav dài duy nhất) */}
      {activeTab !== "dashboard" && (
        <EditorTabsNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          sectionCount={page.sections.length}
        />
      )}

      {/* Tab 0: Bảng Điều Khiển Khối Section (Tích hợp Thanh Nav Dài Duy Nhất & Live Preview) */}
      {activeTab === "dashboard" && (
        <SectionDashboardView
          pageId={page.id}
          pageSlug={page.slug}
          sections={page.sections}
          selectedSectionId={selectedSectionId || page.sections[0]?.id || ""}
          onSelectSection={(secId) => setSelectedSectionId(secId)}
          onSectionUpdated={() => {
            showNotification("success", "Đã lưu cập nhật khối section thành công");
          }}
          onMoveSection={handleMove}
          onToggleVisibility={handleToggleVisibility}
          onDeleteSection={handleDeleteSection}
          isPending={isPending}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      )}

      {/* Tab 1: Sections Dynamic List */}
      {activeTab === "sections" && (
        <SectionsTab
          sections={page.sections}
          isPending={isPending}
          onMove={handleMove}
          onToggleVisibility={handleToggleVisibility}
          onEdit={openEditModal}
          onDelete={handleDeleteSection}
          onSelectDashboard={(secId) => {
            setSelectedSectionId(secId);
            setActiveTab("dashboard");
          }}
        />
      )}

      {/* Tab 2: Page Settings & SEO */}
      {activeTab === "settings" && (
        <SettingsTab
          pageTitle={pageTitle}
          setPageTitle={setPageTitle}
          isPublished={isPublished}
          setIsPublished={setIsPublished}
          pageDescription={pageDescription}
          setPageDescription={setPageDescription}
          metaTitle={metaTitle}
          setMetaTitle={setMetaTitle}
          metaDescription={metaDescription}
          setMetaDescription={setMetaDescription}
          ogImage={ogImage}
          setOgImage={setOgImage}
          isPending={isPending}
          onSave={handleSavePageSettings}
        />
      )}

      {/* Tab 3: Visual Layout Mockup */}
      {activeTab === "preview" && (
        <LayoutMockupTab pageName={page.name} publicUrl={publicUrl} sections={page.sections} />
      )}

      {/* Modal 1: Edit Section */}
      <SectionEditModal
        editingSection={editingSection}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        editSubtitle={editSubtitle}
        setEditSubtitle={setEditSubtitle}
        editPropsJson={editPropsJson}
        setEditPropsJson={setEditPropsJson}
        jsonError={jsonError}
        setJsonError={setJsonError}
        isPending={isPending}
        onClose={() => setEditingSection(null)}
        onSave={handleSaveSection}
      />

      {/* Modal 2: Add New Section */}
      <SectionAddModal
        isOpen={isAddModalOpen}
        pageName={page.name}
        newType={newType}
        setNewType={setNewType}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newSubtitle={newSubtitle}
        setNewSubtitle={setNewSubtitle}
        isPending={isPending}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddSection}
      />
    </div>
  );
}
