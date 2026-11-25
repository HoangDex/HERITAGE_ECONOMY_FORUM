"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HefIcon } from "@/components/icons/hef-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, X, Loader2, Sparkles, AlertCircle } from "lucide-react";
import type {
  MasterDataOverview,
  MasterDataProject,
  MasterDataOrganization,
  MasterDataNews,
  MasterDataSpeaker,
  MasterDataAward,
} from "../types/master-data.types";
import {
  useMasterDataOverview,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
  useCreateSpeakerMutation,
  useUpdateSpeakerMutation,
  useDeleteSpeakerMutation,
  useCreateAwardMutation,
  useUpdateAwardMutation,
  useDeleteAwardMutation,
} from "../hooks/use-master-data-query";

interface MasterDataCatalogViewProps {
  data: MasterDataOverview;
}

type TabKey = "projects" | "organizations" | "news" | "speakers" | "awards";

export function MasterDataCatalogView({ data }: MasterDataCatalogViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionMessage, setActionMessage] = useState<{ text: string; isError?: boolean } | null>(
    null
  );

  // TanStack Query Cache State
  const { data: cachedOverview } = useMasterDataOverview(data);

  const projects = cachedOverview.projects;
  const organizations = cachedOverview.organizations;
  const news = cachedOverview.news;
  const speakers = cachedOverview.speakers;
  const awards = cachedOverview.awards;

  // TanStack Query Mutations
  const createProject = useCreateProjectMutation();
  const updateProject = useUpdateProjectMutation();
  const deleteProject = useDeleteProjectMutation();

  const createOrg = useCreateOrganizationMutation();
  const updateOrg = useUpdateOrganizationMutation();
  const deleteOrg = useDeleteOrganizationMutation();

  const createNews = useCreateNewsMutation();
  const updateNews = useUpdateNewsMutation();
  const deleteNews = useDeleteNewsMutation();

  const createSpeaker = useCreateSpeakerMutation();
  const updateSpeaker = useUpdateSpeakerMutation();
  const deleteSpeaker = useDeleteSpeakerMutation();

  const createAward = useCreateAwardMutation();
  const updateAward = useUpdateAwardMutation();
  const deleteAward = useDeleteAwardMutation();

  const isPending =
    createProject.isPending ||
    updateProject.isPending ||
    deleteProject.isPending ||
    createOrg.isPending ||
    updateOrg.isPending ||
    deleteOrg.isPending ||
    createNews.isPending ||
    updateNews.isPending ||
    deleteNews.isPending ||
    createSpeaker.isPending ||
    updateSpeaker.isPending ||
    deleteSpeaker.isPending ||
    createAward.isPending ||
    updateAward.isPending ||
    deleteAward.isPending;

  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{
    tab: TabKey;
    data?: unknown;
  } | null>(null);

  // Filtered lists
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    const q = searchQuery.toLowerCase();
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [projects, searchQuery]);

  const filteredOrganizations = useMemo(() => {
    if (!searchQuery.trim()) return organizations;
    const q = searchQuery.toLowerCase();
    return organizations.filter(
      (org) =>
        org.name.toLowerCase().includes(q) ||
        (org.shortName && org.shortName.toLowerCase().includes(q)) ||
        org.categoryLabel.toLowerCase().includes(q)
    );
  }, [organizations, searchQuery]);

  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) return news;
    const q = searchQuery.toLowerCase();
    return news.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.categoryName.toLowerCase().includes(q) ||
        (n.authorName && n.authorName.toLowerCase().includes(q))
    );
  }, [news, searchQuery]);

  const filteredSpeakers = useMemo(() => {
    if (!searchQuery.trim()) return speakers;
    const q = searchQuery.toLowerCase();
    return speakers.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.organization.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q)
    );
  }, [speakers, searchQuery]);

  const filteredAwards = useMemo(() => {
    if (!searchQuery.trim()) return awards;
    const q = searchQuery.toLowerCase();
    return awards.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.theme.toLowerCase().includes(q) ||
        a.categories.some((c) => c.name.toLowerCase().includes(q))
    );
  }, [awards, searchQuery]);

  // Open Create Dialog
  const handleOpenCreate = () => {
    setEditingItem({ tab: activeTab });
    setIsDialogOpen(true);
    setActionMessage(null);
  };

  // Open Edit Dialog
  const handleOpenEdit = (tab: TabKey, itemData: unknown) => {
    setEditingItem({ tab, data: itemData });
    setIsDialogOpen(true);
    setActionMessage(null);
  };

  // Delete Handlers
  const handleDeleteProject = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa dự án "${name}" khỏi danh mục dùng chung?`)) return;
    try {
      await deleteProject.mutateAsync(id);
      setActionMessage({ text: "Đã xóa dự án thành công" });
    } catch (err: unknown) {
      setActionMessage({ text: err instanceof Error ? err.message : "Không thể xóa dự án", isError: true });
    }
  };

  const handleDeleteOrganization = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa đối tác "${name}" khỏi danh mục dùng chung?`)) return;
    try {
      await deleteOrg.mutateAsync(id);
      setActionMessage({ text: "Đã xóa đối tác thành công" });
    } catch (err: unknown) {
      setActionMessage({ text: err instanceof Error ? err.message : "Không thể xóa đối tác", isError: true });
    }
  };

  const handleDeleteNews = async (id: string, title: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}"?`)) return;
    try {
      await deleteNews.mutateAsync(id);
      setActionMessage({ text: "Đã xóa bài viết thành công" });
    } catch (err: unknown) {
      setActionMessage({ text: err instanceof Error ? err.message : "Không thể xóa bài viết", isError: true });
    }
  };

  const handleDeleteSpeaker = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa diễn giả "${name}"?`)) return;
    try {
      await deleteSpeaker.mutateAsync(id);
      setActionMessage({ text: "Đã xóa diễn giả thành công" });
    } catch (err: unknown) {
      setActionMessage({ text: err instanceof Error ? err.message : "Không thể xóa diễn giả", isError: true });
    }
  };

  const handleDeleteAward = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa kỳ giải thưởng "${name}"?`)) return;
    try {
      await deleteAward.mutateAsync(id);
      setActionMessage({ text: "Đã xóa kỳ giải thưởng thành công" });
    } catch (err: unknown) {
      setActionMessage({ text: err instanceof Error ? err.message : "Không thể xóa giải thưởng", isError: true });
    }
  };

  // Form Submit Handler
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingItem) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      if (editingItem.tab === "projects") {
        const payload = {
          name: formData.get("name") as string,
          location: formData.get("location") as string,
          category: formData.get("category") as string,
          status: (formData.get("status") as string) || "Đang vận hành",
          annualRevenue: (formData.get("annualRevenue") as string) || undefined,
          jobsCreated: Number(formData.get("jobsCreated")) || 0,
          conservationFundShare: (formData.get("conservationFundShare") as string) || undefined,
        };

        if (editingItem.data) {
          const item = editingItem.data as MasterDataProject;
          await updateProject.mutateAsync({ id: item.id, dto: payload });
          setActionMessage({ text: "Đã cập nhật dự án thành công" });
        } else {
          await createProject.mutateAsync(payload);
          setActionMessage({ text: "Đã thêm mới dự án thành công" });
        }
        setIsDialogOpen(false);
      } else if (editingItem.tab === "organizations") {
        const payload = {
          name: formData.get("name") as string,
          shortName: (formData.get("shortName") as string) || undefined,
          category: (formData.get("category") as "STEERING" | "HOSTING" | "ORGANIZING" | "COMPANION" | "STRATEGIC" | "MEDIA") || "COMPANION",
          logoUrl: (formData.get("logoUrl") as string) || "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&h=200&q=80",
          websiteUrl: (formData.get("websiteUrl") as string) || undefined,
        };

        if (editingItem.data) {
          const item = editingItem.data as MasterDataOrganization;
          await updateOrg.mutateAsync({ id: item.id, dto: payload });
          setActionMessage({ text: "Đã cập nhật đối tác thành công" });
        } else {
          await createOrg.mutateAsync(payload);
          setActionMessage({ text: "Đã thêm mới đối tác thành công" });
        }
        setIsDialogOpen(false);
      } else if (editingItem.tab === "news") {
        const payload = {
          title: formData.get("title") as string,
          excerpt: formData.get("excerpt") as string,
          categoryName: (formData.get("categoryName") as string) || "Thời sự Di sản",
          authorName: (formData.get("authorName") as string) || undefined,
          status: ((formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED") || "PUBLISHED"),
        };

        if (editingItem.data) {
          const item = editingItem.data as MasterDataNews;
          await updateNews.mutateAsync({ id: item.id, dto: payload });
          setActionMessage({ text: "Đã cập nhật bài viết thành công" });
        } else {
          await createNews.mutateAsync(payload);
          setActionMessage({ text: "Đã thêm mới bài viết thành công" });
        }
        setIsDialogOpen(false);
      } else if (editingItem.tab === "speakers") {
        const payload = {
          name: formData.get("name") as string,
          degree: (formData.get("degree") as string) || undefined,
          title: formData.get("title") as string,
          organization: formData.get("organization") as string,
          avatarUrl: (formData.get("avatarUrl") as string) || undefined,
          bio: (formData.get("bio") as string) || undefined,
        };

        if (editingItem.data) {
          const item = editingItem.data as MasterDataSpeaker;
          await updateSpeaker.mutateAsync({ id: item.id, dto: payload });
          setActionMessage({ text: "Đã cập nhật diễn giả thành công" });
        } else {
          await createSpeaker.mutateAsync(payload);
          setActionMessage({ text: "Đã thêm mới diễn giả thành công" });
        }
        setIsDialogOpen(false);
      } else if (editingItem.tab === "awards") {
        const payload = {
          year: Number(formData.get("year")) || 2026,
          name: formData.get("name") as string,
          theme: formData.get("theme") as string,
          nominationDeadline: (formData.get("nominationDeadline") as string) || "2026-10-15T23:59:59.000Z",
          isOpen: formData.get("isOpen") === "true",
        };

        if (editingItem.data) {
          const item = editingItem.data as MasterDataAward;
          await updateAward.mutateAsync({ id: item.id, dto: payload });
          setActionMessage({ text: "Đã cập nhật giải thưởng thành công" });
        } else {
          await createAward.mutateAsync(payload);
          setActionMessage({ text: "Đã thêm mới giải thưởng thành công" });
        }
        setIsDialogOpen(false);
      }
    } catch (err: unknown) {
      setActionMessage({ text: err instanceof Error ? err.message : "Có lỗi xảy ra", isError: true });
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Link href="/admin/dashboard" className="hover:text-[#0D4838]">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-[#0D4838] font-semibold">Danh Mục Dữ Liệu Dùng Chung</span>
      </div>

      {/* Header & Architectural Callout */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#C29B57]/20">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0D4838]/10 text-[#0D4838] text-[11px] font-bold mb-2">
            <HefIcon name="Database" size="xs" />
            <span>Master Data Repository • CSDL Quan Hệ MySQL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0D4838]">
            Danh Mục Dữ Liệu Dùng Chung (Master Data)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-3xl">
            Các thực thể dữ liệu quan hệ được lưu trữ chuẩn hóa dưới MySQL Database và tự động tái
            sử dụng trên nhiều trang web khác nhau (Trang chủ, Giới thiệu, Diễn đàn, Tin tức, Dự án,
            Giải thưởng).
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            onClick={handleOpenCreate}
            className="bg-[#0D4838] hover:bg-[#073327] text-white text-xs font-semibold h-9 rounded-xl shadow-xs gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#C29B57]" />
            <span>Thêm Mới Vào Danh Mục</span>
          </Button>

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border border-[#dfd7c8] bg-white text-[#292929] hover:bg-stone-50 transition-colors shadow-2xs h-9"
          >
            <HefIcon name="ExternalLink" size="xs" />
            <span>Xem Cổng Diễn Đàn</span>
          </Link>
        </div>
      </div>

      {/* Notification banner */}
      {actionMessage && (
        <div
          className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-2 ${
            actionMessage.isError
              ? "bg-red-50 text-red-800 border-red-200"
              : "bg-emerald-50 text-emerald-800 border-emerald-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {actionMessage.isError ? (
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            ) : (
              <Sparkles className="w-4 h-4 shrink-0 text-emerald-600" />
            )}
            <span>{actionMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionMessage(null)}
            className="text-stone-400 hover:text-stone-600 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Phân biệt rõ ràng: Master Data vs Page Sections */}
      <div className="bg-[#F5EFE5]/70 border border-[#C29B57]/30 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#C29B57]/20 text-[#0D4838] flex items-center justify-center shrink-0 mt-0.5">
            <HefIcon name="Info" size="sm" />
          </div>
          <div>
            <span className="font-bold text-[#0D4838]">
              Phân biệt Danh Mục Dữ Liệu và Khối Section:
            </span>
            <span className="text-[#292929] ml-1">
              Dữ liệu tại đây là các thực thể quan hệ dùng chung (Đối tác, Dự án, Diễn giả, Bài
              viết, Giải thưởng). Khi chỉnh sửa tại CSDL, dữ liệu sẽ tự động đồng bộ sang tất cả
              các Section đang nhúng thực thể đó trên toàn bộ 7 trang web.
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          type="button"
          onClick={() => setActiveTab("projects")}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            activeTab === "projects"
              ? "bg-[#0D4838] text-white border-[#0D4838] shadow-sm"
              : "bg-white border-[#C29B57]/20 hover:border-[#0D4838]/40 text-[#292929]"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold opacity-85">Dự án Di sản</span>
            <HefIcon
              name="FolderKanban"
              size="sm"
              className={activeTab === "projects" ? "text-[#C29B57]" : "text-[#0D4838]"}
            />
          </div>
          <div className="text-2xl font-bold font-serif mt-1">{projects.length}</div>
          <div className="text-xs opacity-75 mt-0.5">Tái sử dụng: 2 trang</div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("organizations")}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            activeTab === "organizations"
              ? "bg-[#0D4838] text-white border-[#0D4838] shadow-sm"
              : "bg-white border-[#C29B57]/20 hover:border-[#0D4838]/40 text-[#292929]"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold opacity-85">Đối tác & Cơ quan</span>
            <HefIcon
              name="Building2"
              size="sm"
              className={activeTab === "organizations" ? "text-[#C29B57]" : "text-[#0D4838]"}
            />
          </div>
          <div className="text-2xl font-bold font-serif mt-1">{organizations.length}</div>
          <div className="text-xs opacity-75 mt-0.5">Tái sử dụng: 3 trang</div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("news")}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            activeTab === "news"
              ? "bg-[#0D4838] text-white border-[#0D4838] shadow-sm"
              : "bg-white border-[#C29B57]/20 hover:border-[#0D4838]/40 text-[#292929]"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold opacity-85">Tin tức & Bài viết</span>
            <HefIcon
              name="Newspaper"
              size="sm"
              className={activeTab === "news" ? "text-[#C29B57]" : "text-[#0D4838]"}
            />
          </div>
          <div className="text-2xl font-bold font-serif mt-1">{news.length}</div>
          <div className="text-xs opacity-75 mt-0.5">Tái sử dụng: 2 trang</div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("speakers")}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            activeTab === "speakers"
              ? "bg-[#0D4838] text-white border-[#0D4838] shadow-sm"
              : "bg-white border-[#C29B57]/20 hover:border-[#0D4838]/40 text-[#292929]"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold opacity-85">Chuyên gia & Diễn giả</span>
            <HefIcon
              name="GraduationCap"
              size="sm"
              className={activeTab === "speakers" ? "text-[#C29B57]" : "text-[#0D4838]"}
            />
          </div>
          <div className="text-2xl font-bold font-serif mt-1">{speakers.length}</div>
          <div className="text-xs opacity-75 mt-0.5">Tái sử dụng: 3 trang</div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("awards")}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            activeTab === "awards"
              ? "bg-[#0D4838] text-white border-[#0D4838] shadow-sm"
              : "bg-white border-[#C29B57]/20 hover:border-[#0D4838]/40 text-[#292929]"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold opacity-85">Giải thưởng</span>
            <HefIcon
              name="Award"
              size="sm"
              className={activeTab === "awards" ? "text-[#C29B57]" : "text-[#0D4838]"}
            />
          </div>
          <div className="text-2xl font-bold font-serif mt-1">{awards.length}</div>
          <div className="text-xs opacity-75 mt-0.5">Tái sử dụng: 2 trang</div>
        </button>
      </div>

      {/* Search Bar & Tab Navigation */}
      <div className="bg-white rounded-xl border border-[#C29B57]/20 p-4 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Tab buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setActiveTab("projects")}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === "projects"
                  ? "bg-[#0D4838] text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              Dự án Di sản ({filteredProjects.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("organizations")}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === "organizations"
                  ? "bg-[#0D4838] text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              Đối tác & Cơ quan ({filteredOrganizations.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("news")}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === "news"
                  ? "bg-[#0D4838] text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              Tin tức ({filteredNews.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("speakers")}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === "speakers"
                  ? "bg-[#0D4838] text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              Diễn giả ({filteredSpeakers.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("awards")}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === "awards"
                  ? "bg-[#0D4838] text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              Giải thưởng ({filteredAwards.length})
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <HefIcon
              name="Search"
              size="sm"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-[#C29B57]/30 bg-[#F5EFE5]/30 focus:outline-hidden focus:ring-1 focus:ring-[#0D4838]"
            />
          </div>
        </div>

        {/* Tab 1: Heritage Projects */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {filteredProjects.map((project: MasterDataProject) => (
              <div
                key={project.id}
                className="bg-white rounded-xl border border-[#C29B57]/20 p-4 shadow-2xs hover:border-[#0D4838]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-mono text-[10px] text-muted-foreground">
                      ID: {project.id}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Badge
                        variant="outline"
                        className="text-[10px] border-emerald-600/40 text-emerald-800 bg-emerald-50"
                      >
                        {project.status}
                      </Badge>
                      <button
                        type="button"
                        onClick={() => handleOpenEdit("projects", project)}
                        className="p-1 rounded-md text-stone-400 hover:text-[#0D4838] hover:bg-stone-100 transition-colors cursor-pointer"
                        title="Chỉnh sửa dự án"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(project.id, project.name)}
                        className="p-1 rounded-md text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Xóa dự án"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-[#0D4838] line-clamp-1">{project.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    <HefIcon name="MapPin" size="xs" />
                    <span>{project.location}</span> • <span>{project.category}</span>
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-muted/50 text-[11px]">
                    <div>
                      <span className="text-muted-foreground block text-[10px]">Doanh thu năm</span>
                      <span className="font-semibold text-[#0D4838]">
                        {project.annualRevenue || "Chưa công bố"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[10px]">
                        Việc làm tạo ra
                      </span>
                      <span className="font-semibold text-[#0D4838]">
                        {project.jobsCreated} lao động
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#C29B57]/15">
                  <div className="text-[10px] font-bold text-[#C29B57] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <HefIcon name="Repeat" size="xs" />
                    <span>Tái sử dụng tại các trang:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.reusedPages.map((page, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center text-[10px] px-2 py-0.5 rounded-md bg-[#0D4838]/10 text-[#0D4838] font-medium"
                      >
                        {page}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Organizations & Partners */}
        {activeTab === "organizations" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {filteredOrganizations.map((org: MasterDataOrganization) => (
              <div
                key={org.id}
                className="bg-white rounded-xl border border-[#C29B57]/20 p-4 shadow-2xs hover:border-[#0D4838]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-mono text-[10px] text-muted-foreground">ID: {org.id}</span>
                    <div className="flex items-center gap-1.5">
                      <Badge
                        variant="outline"
                        className="text-[10px] border-[#C29B57]/50 text-[#0D4838] bg-[#F5EFE5]"
                      >
                        {org.categoryLabel}
                      </Badge>
                      <button
                        type="button"
                        onClick={() => handleOpenEdit("organizations", org)}
                        className="p-1 rounded-md text-stone-400 hover:text-[#0D4838] hover:bg-stone-100 transition-colors cursor-pointer"
                        title="Chỉnh sửa đối tác"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteOrganization(org.id, org.name)}
                        className="p-1 rounded-md text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Xóa đối tác"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-[#0D4838] line-clamp-1">{org.name}</h3>
                  {org.shortName && (
                    <p className="text-xs text-muted-foreground mt-0.5">Tên viết tắt: {org.shortName}</p>
                  )}
                  {org.websiteUrl && (
                    <a
                      href={org.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-[#0D4838] hover:underline mt-1 inline-flex items-center gap-1"
                    >
                      <HefIcon name="Globe" size="xs" />
                      <span>{org.websiteUrl}</span>
                    </a>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[#C29B57]/15">
                  <div className="text-[10px] font-bold text-[#C29B57] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <HefIcon name="Repeat" size="xs" />
                    <span>Tái sử dụng tại các trang:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {org.reusedPages.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center text-[10px] px-2 py-0.5 rounded-md bg-[#0D4838]/10 text-[#0D4838] font-medium"
                      >
                        {item.pageName || item.pageSlug} ({item.roleLabel})
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: News & Articles */}
        {activeTab === "news" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {filteredNews.map((n: MasterDataNews) => (
              <div
                key={n.id}
                className="bg-white rounded-xl border border-[#C29B57]/20 p-4 shadow-2xs hover:border-[#0D4838]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-mono text-[10px] text-muted-foreground">ID: {n.id}</span>
                    <div className="flex items-center gap-1.5">
                      <Badge
                        variant="outline"
                        className="text-[10px] border-emerald-600/40 text-emerald-800 bg-emerald-50"
                      >
                        {n.status}
                      </Badge>
                      <button
                        type="button"
                        onClick={() => handleOpenEdit("news", n)}
                        className="p-1 rounded-md text-stone-400 hover:text-[#0D4838] hover:bg-stone-100 transition-colors cursor-pointer"
                        title="Chỉnh sửa bài viết"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteNews(n.id, n.title)}
                        className="p-1 rounded-md text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Xóa bài viết"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-[#0D4838] line-clamp-2">{n.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{n.excerpt}</p>

                  <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-3 pt-3 border-t border-muted/50">
                    <span>{n.categoryName}</span>
                    <span>{n.authorName || "Ban Biên Tập"}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#C29B57]/15">
                  <div className="text-[10px] font-bold text-[#C29B57] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <HefIcon name="Repeat" size="xs" />
                    <span>Tái sử dụng tại các trang:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {n.reusedPages.map((page, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center text-[10px] px-2 py-0.5 rounded-md bg-[#0D4838]/10 text-[#0D4838] font-medium"
                      >
                        {page}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Speakers & Experts */}
        {activeTab === "speakers" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {filteredSpeakers.map((speaker: MasterDataSpeaker) => (
              <div
                key={speaker.id}
                className="bg-white rounded-xl border border-[#C29B57]/20 p-4 shadow-2xs hover:border-[#0D4838]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-mono text-[10px] text-muted-foreground">
                      ID: {speaker.id}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {speaker.degree && (
                        <Badge
                          variant="outline"
                          className="text-[10px] border-[#C29B57]/50 text-[#0D4838] bg-[#F5EFE5]"
                        >
                          {speaker.degree}
                        </Badge>
                      )}
                      <button
                        type="button"
                        onClick={() => handleOpenEdit("speakers", speaker)}
                        className="p-1 rounded-md text-stone-400 hover:text-[#0D4838] hover:bg-stone-100 transition-colors cursor-pointer"
                        title="Chỉnh sửa diễn giả"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSpeaker(speaker.id, speaker.name)}
                        className="p-1 rounded-md text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Xóa diễn giả"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-[#0D4838] line-clamp-1">{speaker.name}</h3>
                  <p className="text-xs text-[#76232D] font-medium mt-0.5">{speaker.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{speaker.organization}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#C29B57]/15">
                  <div className="text-[10px] font-bold text-[#C29B57] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <HefIcon name="Repeat" size="xs" />
                    <span>Tái sử dụng tại các trang:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {speaker.reusedPages.map((page, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center text-[10px] px-2 py-0.5 rounded-md bg-[#0D4838]/10 text-[#0D4838] font-medium"
                      >
                        {page}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Awards */}
        {activeTab === "awards" && (
          <div className="space-y-4 pt-2">
            {filteredAwards.map((award: MasterDataAward) => (
              <div
                key={award.id}
                className="bg-white rounded-xl border border-[#C29B57]/20 p-5 shadow-2xs hover:border-[#0D4838]/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-muted/50">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-muted-foreground">
                        ID: {award.id}
                      </span>
                      <Badge className="bg-[#C29B57] text-[#041D16] text-[10px] font-bold">
                        Năm {award.year}
                      </Badge>
                      {award.isOpen && (
                        <Badge
                          variant="outline"
                          className="text-[10px] border-emerald-600/40 text-emerald-800 bg-emerald-50"
                        >
                          Đang mở tiếp nhận đề cử
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-[#0D4838] mt-1">{award.name}</h3>
                    <p className="text-xs text-[#76232D] italic mt-0.5">
                      Chủ đề: &ldquo;{award.theme}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div>
                      <div className="text-[10px] font-bold text-[#C29B57] uppercase tracking-wider mb-1">
                        Tái sử dụng tại:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {award.reusedPages.map((page, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center text-[10px] px-2 py-0.5 rounded-md bg-[#0D4838]/10 text-[#0D4838] font-medium"
                          >
                            {page}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 pl-3 border-l border-stone-200">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit("awards", award)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-[#0D4838] hover:bg-stone-100 transition-colors cursor-pointer"
                        title="Chỉnh sửa giải thưởng"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteAward(award.id, award.name)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Xóa giải thưởng"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-xs font-bold text-[#0D4838] uppercase tracking-wider mb-2">
                    Các hạng mục xét giải ({award.categories.length} hạng mục):
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {award.categories.map((cat) => (
                      <div
                        key={cat.id}
                        className="p-3 rounded-lg bg-[#F5EFE5]/40 border border-[#C29B57]/20"
                      >
                        <div className="font-bold text-xs text-[#0D4838]">{cat.name}</div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">
                          {cat.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CRUD MODAL DIALOG */}
      {isDialogOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-[#dfd7c8] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#dfd7c8]">
              <div>
                <h2 className="text-lg font-bold text-[#0D4838]">
                  {editingItem.data ? "Chỉnh Sửa" : "Thêm Mới Vào"}{" "}
                  {editingItem.tab === "projects" && "Dự Án Di Sản"}
                  {editingItem.tab === "organizations" && "Cơ Quan / Đối Tác"}
                  {editingItem.tab === "news" && "Bài Viết Tin Tức"}
                  {editingItem.tab === "speakers" && "Diễn Giả / Chuyên Gia"}
                  {editingItem.tab === "awards" && "Kỳ Giải Thưởng"}
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Dữ liệu quan hệ CSDL MySQL, tự động đồng bộ trên toàn bộ website.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              {/* FORM FIELDS BY TAB */}
              {editingItem.tab === "projects" && (
                <>
                  <div>
                    <label className="font-bold block mb-1">Tên dự án *</label>
                    <Input
                      name="name"
                      defaultValue={(editingItem.data as MasterDataProject)?.name || ""}
                      required
                      placeholder="VD: Không gian Lụa tơ tằm Nam Cao"
                      className="h-9 text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold block mb-1">Địa phương / Tỉnh thành *</label>
                      <Input
                        name="location"
                        defaultValue={(editingItem.data as MasterDataProject)?.location || ""}
                        required
                        placeholder="VD: Thái Bình"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">Phân loại di sản *</label>
                      <Input
                        name="category"
                        defaultValue={(editingItem.data as MasterDataProject)?.category || ""}
                        required
                        placeholder="VD: Làng nghề Truyền thống"
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold block mb-1">Trạng thái vận hành</label>
                      <Input
                        name="status"
                        defaultValue={
                          (editingItem.data as MasterDataProject)?.status || "Đang vận hành"
                        }
                        className="h-9 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">Doanh thu năm</label>
                      <Input
                        name="annualRevenue"
                        defaultValue={
                          (editingItem.data as MasterDataProject)?.annualRevenue || "15 Tỷ VNĐ"
                        }
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold block mb-1">Việc làm tạo ra (lao động)</label>
                      <Input
                        name="jobsCreated"
                        type="number"
                        defaultValue={(editingItem.data as MasterDataProject)?.jobsCreated || 200}
                        className="h-9 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">Tỷ lệ tái đầu tư bảo tồn</label>
                      <Input
                        name="conservationFundShare"
                        defaultValue={
                          (editingItem.data as MasterDataProject)?.conservationFundShare || "10%"
                        }
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>
                </>
              )}

              {editingItem.tab === "organizations" && (
                <>
                  <div>
                    <label className="font-bold block mb-1">Tên cơ quan / tổ chức *</label>
                    <Input
                      name="name"
                      defaultValue={(editingItem.data as MasterDataOrganization)?.name || ""}
                      required
                      placeholder="VD: Hội Di sản Văn hóa Việt Nam"
                      className="h-9 text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold block mb-1">Tên viết tắt</label>
                      <Input
                        name="shortName"
                        defaultValue={(editingItem.data as MasterDataOrganization)?.shortName || ""}
                        placeholder="VD: VCHA"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">Phân loại đối tác *</label>
                      <select
                        name="category"
                        defaultValue={
                          (editingItem.data as MasterDataOrganization)?.category || "COMPANION"
                        }
                        className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-xs"
                      >
                        <option value="STEERING">Cơ quan Chỉ đạo</option>
                        <option value="HOSTING">Cơ quan Chủ trì & Đăng cai</option>
                        <option value="ORGANIZING">Đơn vị Thường trực Tổ chức</option>
                        <option value="COMPANION">Đối tác Học thuật & Đồng hành</option>
                        <option value="STRATEGIC">Nhà Tài trợ Chiến lược</option>
                        <option value="MEDIA">Bảo trợ Truyền thông & Báo chí</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Đường dẫn Logo URL</label>
                    <Input
                      name="logoUrl"
                      defaultValue={
                        (editingItem.data as MasterDataOrganization)?.logoUrl ||
                        "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&h=200&q=80"
                      }
                      placeholder="https://..."
                      className="h-9 text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Website liên kết</label>
                    <Input
                      name="websiteUrl"
                      defaultValue={(editingItem.data as MasterDataOrganization)?.websiteUrl || ""}
                      placeholder="https://..."
                      className="h-9 text-xs"
                    />
                  </div>
                </>
              )}

              {editingItem.tab === "news" && (
                <>
                  <div>
                    <label className="font-bold block mb-1">Tiêu đề bài viết *</label>
                    <Input
                      name="title"
                      defaultValue={(editingItem.data as MasterDataNews)?.title || ""}
                      required
                      placeholder="Tiêu đề bài viết..."
                      className="h-9 text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Tóm tắt ngắn (Sapo) *</label>
                    <textarea
                      name="excerpt"
                      rows={3}
                      defaultValue={(editingItem.data as MasterDataNews)?.excerpt || ""}
                      required
                      placeholder="Đoạn văn tóm tắt bài viết..."
                      className="w-full p-2.5 rounded-lg border border-input text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold block mb-1">Chuyên mục</label>
                      <Input
                        name="categoryName"
                        defaultValue={
                          (editingItem.data as MasterDataNews)?.categoryName || "Thời sự Di sản"
                        }
                        className="h-9 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">Tác giả</label>
                      <Input
                        name="authorName"
                        defaultValue={
                          (editingItem.data as MasterDataNews)?.authorName || "Ban Biên Tập HEF"
                        }
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Trạng thái xuất bản</label>
                    <select
                      name="status"
                      defaultValue={(editingItem.data as MasterDataNews)?.status || "PUBLISHED"}
                      className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-xs"
                    >
                      <option value="PUBLISHED">Xuất bản công khai (PUBLISHED)</option>
                      <option value="DRAFT">Bản nháp (DRAFT)</option>
                      <option value="ARCHIVED">Lưu trữ (ARCHIVED)</option>
                    </select>
                  </div>
                </>
              )}

              {editingItem.tab === "speakers" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold block mb-1">Họ và tên *</label>
                      <Input
                        name="name"
                        defaultValue={(editingItem.data as MasterDataSpeaker)?.name || ""}
                        required
                        placeholder="VD: GS.TS. Trần Quốc Vượng"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">Học hàm / Học vị</label>
                      <Input
                        name="degree"
                        defaultValue={(editingItem.data as MasterDataSpeaker)?.degree || "GS.TS"}
                        placeholder="VD: GS.TS, PGS.TS, ThS"
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Chức vụ khoa học *</label>
                    <Input
                      name="title"
                      defaultValue={(editingItem.data as MasterDataSpeaker)?.title || ""}
                      required
                      placeholder="VD: Chủ tịch Hội đồng Khoa học"
                      className="h-9 text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Đơn vị công tác *</label>
                    <Input
                      name="organization"
                      defaultValue={(editingItem.data as MasterDataSpeaker)?.organization || ""}
                      required
                      placeholder="VD: Hội Di sản Văn hóa Việt Nam"
                      className="h-9 text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Đường dẫn ảnh đại diện (Avatar URL)</label>
                    <Input
                      name="avatarUrl"
                      defaultValue={(editingItem.data as MasterDataSpeaker)?.avatarUrl || ""}
                      placeholder="https://..."
                      className="h-9 text-xs"
                    />
                  </div>
                </>
              )}

              {editingItem.tab === "awards" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold block mb-1">Năm tổ chức *</label>
                      <Input
                        name="year"
                        type="number"
                        defaultValue={(editingItem.data as MasterDataAward)?.year || 2026}
                        required
                        className="h-9 text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">Trạng thái nhận hồ sơ</label>
                      <select
                        name="isOpen"
                        defaultValue={
                          (editingItem.data as MasterDataAward)?.isOpen ? "true" : "false"
                        }
                        className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-xs"
                      >
                        <option value="true">Đang mở tiếp nhận đề cử</option>
                        <option value="false">Đã kết thúc / Đóng cổng</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Tên kỳ giải thưởng *</label>
                    <Input
                      name="name"
                      defaultValue={
                        (editingItem.data as MasterDataAward)?.name ||
                        "Giải Thưởng Phát Triển Bền Vững Chủ Động 2026"
                      }
                      required
                      className="h-9 text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Chủ đề chính *</label>
                    <Input
                      name="theme"
                      defaultValue={
                        (editingItem.data as MasterDataAward)?.theme ||
                        "Kiến tạo giá trị – Phụng sự vị nhân sinh"
                      }
                      required
                      className="h-9 text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Thời hạn nộp hồ sơ *</label>
                    <Input
                      name="nominationDeadline"
                      defaultValue={
                        (editingItem.data as MasterDataAward)?.nominationDeadline ||
                        "2026-10-15T23:59:59.000Z"
                      }
                      required
                      className="h-9 text-xs"
                    />
                  </div>
                </>
              )}

              {/* ACTION BUTTONS */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#dfd7c8]">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isPending}
                  className="h-9 text-xs rounded-xl"
                >
                  Hủy Bỏ
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="h-9 text-xs bg-[#0D4838] hover:bg-[#073327] text-white rounded-xl px-5 font-bold cursor-pointer"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                      Đang Lưu...
                    </>
                  ) : editingItem.data ? (
                    "Lưu Thay Đổi"
                  ) : (
                    "Thêm Vào CSDL"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
