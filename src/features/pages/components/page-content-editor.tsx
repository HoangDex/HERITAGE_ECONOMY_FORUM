"use client";

import React, { useState, useTransition } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import {
  updatePageAction,
  addSectionAction,
  updateSectionAction,
  removeSectionAction,
  reorderSectionsAction,
  toggleSectionVisibilityAction,
} from "../actions/page.actions";
import type { PageEntity, PageSection, SectionType } from "../types/page.types";
import { EditorHeader } from "./editor-header";
import { EditorTabsNav, type EditorTabType } from "./editor-tabs-nav";
import { SectionsTab } from "./sections-tab";
import { SettingsTab } from "./settings-tab";
import { LayoutMockupTab } from "./layout-mockup-tab";
import { SectionEditModal } from "./section-edit-modal";
import { SectionAddModal } from "./section-add-modal";

interface PageContentEditorProps {
  initialPage: PageEntity;
}

export function PageContentEditor({ initialPage }: PageContentEditorProps) {
  const [page, setPage] = useState<PageEntity>(initialPage);
  const [activeTab, setActiveTab] = useState<EditorTabType>("sections");
  const [isPending, startTransition] = useTransition();
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

  const showNotification = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  // 1. Move Section Up/Down
  const handleMove = (currentIndex: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= page.sections.length) return;

    const reordered = [...page.sections];
    const [moved] = reordered.splice(currentIndex, 1);
    reordered.splice(targetIndex, 0, moved);

    const updatedWithOrder = reordered.map((sec, idx) => ({ ...sec, order: idx + 1 }));
    setPage((prev) => ({ ...prev, sections: updatedWithOrder }));

    const sectionIds = updatedWithOrder.map((s) => s.id);
    startTransition(async () => {
      const res = await reorderSectionsAction(page.id, sectionIds);
      if (res.success && res.data) {
        setPage(res.data);
        showNotification("success", "Đã cập nhật thứ tự các khối section");
      } else {
        showNotification("error", res.error || "Lỗi cập nhật thứ tự");
      }
    });
  };

  // 2. Toggle Section Visibility
  const handleToggleVisibility = (section: PageSection) => {
    const updatedSections = page.sections.map((s) =>
      s.id === section.id ? { ...s, isVisible: !s.isVisible } : s
    );
    setPage((prev) => ({ ...prev, sections: updatedSections }));

    startTransition(async () => {
      const res = await toggleSectionVisibilityAction(page.id, section.id, !section.isVisible);
      if (res.success && res.data) {
        setPage(res.data);
        showNotification(
          "success",
          `Đã ${!section.isVisible ? "bật" : "tắt"} hiển thị khối "${section.title || section.type}"`
        );
      } else {
        showNotification("error", res.error || "Lỗi thay đổi trạng thái");
      }
    });
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
  const handleSaveSection = () => {
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

    startTransition(async () => {
      const res = await updateSectionAction(page.id, editingSection.id, {
        title: editTitle,
        subtitle: editSubtitle,
        props: parsedProps,
      });

      if (res.success && res.data) {
        setPage(res.data);
        setEditingSection(null);
        showNotification("success", "Đã lưu nội dung section thành công");
      } else {
        showNotification("error", res.error || "Lỗi lưu section");
      }
    });
  };

  // 5. Delete Section
  const handleDeleteSection = (section: PageSection) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa khối "${section.title || section.type}"?`)) return;

    startTransition(async () => {
      const res = await removeSectionAction(page.id, section.id);
      if (res.success && res.data) {
        setPage(res.data);
        showNotification("success", `Đã xóa khối "${section.title || section.type}"`);
      } else {
        showNotification("error", res.error || "Lỗi khi xóa section");
      }
    });
  };

  // 6. Add New Section
  const handleAddSection = () => {
    if (!newTitle.trim()) {
      showNotification("error", "Vui lòng nhập tiêu đề cho khối section mới");
      return;
    }

    startTransition(async () => {
      const res = await addSectionAction(page.id, {
        type: newType,
        title: newTitle,
        subtitle: newSubtitle,
        order: page.sections.length + 1,
        isVisible: true,
        props: {},
      });

      if (res.success && res.data) {
        setPage(res.data);
        setIsAddModalOpen(false);
        setNewTitle("");
        setNewSubtitle("");
        showNotification("success", "Đã thêm khối section mới thành công");
      } else {
        showNotification("error", res.error || "Lỗi thêm section");
      }
    });
  };

  // 7. Save Page Settings & SEO
  const handleSavePageSettings = () => {
    startTransition(async () => {
      const res = await updatePageAction(page.id, {
        title: pageTitle,
        description: pageDescription,
        isPublished,
        seoProps: {
          metaTitle,
          metaDescription,
          ogImage,
        },
      });

      if (res.success && res.data) {
        setPage(res.data);
        showNotification("success", "Đã cập nhật thông tin trang & SEO thành công");
      } else {
        showNotification("error", res.error || "Lỗi lưu thông tin trang");
      }
    });
  };

  const publicUrl = `/${page.slug === "trang-chu" ? "" : page.slug}`;

  return (
    <div className="space-y-6">
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
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* Tabs Navigation */}
      <EditorTabsNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        sectionCount={page.sections.length}
      />

      {/* Tab 1: Sections Dynamic List */}
      {activeTab === "sections" && (
        <SectionsTab
          sections={page.sections}
          isPending={isPending}
          onMove={handleMove}
          onToggleVisibility={handleToggleVisibility}
          onEdit={openEditModal}
          onDelete={handleDeleteSection}
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
