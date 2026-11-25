/**
 * LAYER 6A: TANSTACK QUERY HOOKS CHO DANH MỤC DỮ LIỆU DÙNG CHUNG (MASTER DATA CACHE)
 * Quản lý Client State, Stale-while-revalidate, và tự động Invalidate Cache khi thêm/sửa/xóa.
 */

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  MasterDataOverview,
  CreateProjectDTO,
  UpdateProjectDTO,
  CreateOrganizationDTO,
  UpdateOrganizationDTO,
  CreateNewsDTO,
  UpdateNewsDTO,
  CreateSpeakerDTO,
  UpdateSpeakerDTO,
  CreateAwardDTO,
  UpdateAwardDTO,
} from "../types/master-data.types";
import {
  createProjectAction,
  updateProjectAction,
  deleteProjectAction,
  createOrganizationAction,
  updateOrganizationAction,
  deleteOrganizationAction,
  createNewsAction,
  updateNewsAction,
  deleteNewsAction,
  createSpeakerAction,
  updateSpeakerAction,
  deleteSpeakerAction,
  createAwardAction,
  updateAwardAction,
  deleteAwardAction,
} from "../actions/master-data.actions";

export const MASTER_DATA_KEYS = {
  all: ["master-data"] as const,
  overview: () => [...MASTER_DATA_KEYS.all, "overview"] as const,
  projects: () => [...MASTER_DATA_KEYS.all, "projects"] as const,
  organizations: () => [...MASTER_DATA_KEYS.all, "organizations"] as const,
  news: () => [...MASTER_DATA_KEYS.all, "news"] as const,
  speakers: () => [...MASTER_DATA_KEYS.all, "speakers"] as const,
  awards: () => [...MASTER_DATA_KEYS.all, "awards"] as const,
};

/**
 * Hook quản lý Cache tổng quan Master Data với dữ liệu Server-rendered ban đầu
 * Sử dụng initialData kết hợp initialDataUpdatedAt để loại bỏ side-effect refetch không mong muốn khi component mount.
 */
export function useMasterDataOverview(initialData: MasterDataOverview) {
  return useQuery<MasterDataOverview>({
    queryKey: MASTER_DATA_KEYS.overview(),
    queryFn: () => initialData,
    initialData,
    initialDataUpdatedAt: () => Date.now(),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

// ==========================================
// 1. PROJECTS MUTATIONS
// ==========================================
export function useCreateProjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: CreateProjectDTO) => {
      const res = await createProjectAction(dto);
      if (!res.success || !res.data) throw new Error(res.error || "Lỗi tạo dự án");
      return res.data;
    },
    onSuccess: (newProject) => {
      queryClient.setQueryData<MasterDataOverview>(MASTER_DATA_KEYS.overview(), (old) => {
        if (!old) return old;
        return {
          ...old,
          projects: [newProject, ...old.projects],
          stats: { ...old.stats, totalProjects: old.projects.length + 1 },
        };
      });
      queryClient.invalidateQueries({ queryKey: MASTER_DATA_KEYS.all });
    },
  });
}

export function useUpdateProjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: UpdateProjectDTO }) => {
      const res = await updateProjectAction(id, dto);
      if (!res.success || !res.data) throw new Error(res.error || "Lỗi cập nhật dự án");
      return res.data;
    },
    onSuccess: (updatedProject) => {
      queryClient.setQueryData<MasterDataOverview>(MASTER_DATA_KEYS.overview(), (old) => {
        if (!old) return old;
        return {
          ...old,
          projects: old.projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)),
        };
      });
      queryClient.invalidateQueries({ queryKey: MASTER_DATA_KEYS.all });
    },
  });
}

export function useDeleteProjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteProjectAction(id);
      if (!res.success) throw new Error(res.error || "Lỗi xóa dự án");
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData<MasterDataOverview>(MASTER_DATA_KEYS.overview(), (old) => {
        if (!old) return old;
        return {
          ...old,
          projects: old.projects.filter((p) => p.id !== deletedId),
          stats: { ...old.stats, totalProjects: Math.max(0, old.projects.length - 1) },
        };
      });
      queryClient.invalidateQueries({ queryKey: MASTER_DATA_KEYS.all });
    },
  });
}

// ==========================================
// 2. ORGANIZATIONS MUTATIONS
// ==========================================
export function useCreateOrganizationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: CreateOrganizationDTO) => {
      const res = await createOrganizationAction(dto);
      if (!res.success || !res.data) throw new Error(res.error || "Lỗi tạo đối tác");
      return res.data;
    },
    onSuccess: (newOrg) => {
      queryClient.setQueryData<MasterDataOverview>(MASTER_DATA_KEYS.overview(), (old) => {
        if (!old) return old;
        return {
          ...old,
          organizations: [newOrg, ...old.organizations],
          stats: { ...old.stats, totalOrganizations: old.organizations.length + 1 },
        };
      });
      queryClient.invalidateQueries({ queryKey: MASTER_DATA_KEYS.all });
    },
  });
}

export function useUpdateOrganizationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: UpdateOrganizationDTO }) => {
      const res = await updateOrganizationAction(id, dto);
      if (!res.success || !res.data) throw new Error(res.error || "Lỗi cập nhật đối tác");
      return res.data;
    },
    onSuccess: (updatedOrg) => {
      queryClient.setQueryData<MasterDataOverview>(MASTER_DATA_KEYS.overview(), (old) => {
        if (!old) return old;
        return {
          ...old,
          organizations: old.organizations.map((o) => (o.id === updatedOrg.id ? updatedOrg : o)),
        };
      });
      queryClient.invalidateQueries({ queryKey: MASTER_DATA_KEYS.all });
    },
  });
}

export function useDeleteOrganizationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteOrganizationAction(id);
      if (!res.success) throw new Error(res.error || "Lỗi xóa đối tác");
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData<MasterDataOverview>(MASTER_DATA_KEYS.overview(), (old) => {
        if (!old) return old;
        return {
          ...old,
          organizations: old.organizations.filter((o) => o.id !== deletedId),
          stats: { ...old.stats, totalOrganizations: Math.max(0, old.organizations.length - 1) },
        };
      });
      queryClient.invalidateQueries({ queryKey: MASTER_DATA_KEYS.all });
    },
  });
}

// ==========================================
// 3. NEWS MUTATIONS
// ==========================================
export function useCreateNewsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: CreateNewsDTO) => {
      const res = await createNewsAction(dto);
      if (!res.success || !res.data) throw new Error(res.error || "Lỗi tạo bài viết");
      return res.data;
    },
    onSuccess: (newArticle) => {
      queryClient.setQueryData<MasterDataOverview>(MASTER_DATA_KEYS.overview(), (old) => {
        if (!old) return old;
        return {
          ...old,
          news: [newArticle, ...old.news],
          stats: { ...old.stats, totalNews: old.news.length + 1 },
        };
      });
      queryClient.invalidateQueries({ queryKey: MASTER_DATA_KEYS.all });
    },
  });
}

export function useUpdateNewsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: UpdateNewsDTO }) => {
      const res = await updateNewsAction(id, dto);
      if (!res.success || !res.data) throw new Error(res.error || "Lỗi cập nhật bài viết");
      return res.data;
    },
    onSuccess: (updatedNews) => {
      queryClient.setQueryData<MasterDataOverview>(MASTER_DATA_KEYS.overview(), (old) => {
        if (!old) return old;
        return {
          ...old,
          news: old.news.map((n) => (n.id === updatedNews.id ? updatedNews : n)),
        };
      });
      queryClient.invalidateQueries({ queryKey: MASTER_DATA_KEYS.all });
    },
  });
}

export function useDeleteNewsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteNewsAction(id);
      if (!res.success) throw new Error(res.error || "Lỗi xóa bài viết");
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData<MasterDataOverview>(MASTER_DATA_KEYS.overview(), (old) => {
        if (!old) return old;
        return {
          ...old,
          news: old.news.filter((n) => n.id !== deletedId),
          stats: { ...old.stats, totalNews: Math.max(0, old.news.length - 1) },
        };
      });
      queryClient.invalidateQueries({ queryKey: MASTER_DATA_KEYS.all });
    },
  });
}

// ==========================================
// 4. SPEAKERS MUTATIONS
// ==========================================
export function useCreateSpeakerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: CreateSpeakerDTO) => {
      const res = await createSpeakerAction(dto);
      if (!res.success || !res.data) throw new Error(res.error || "Lỗi tạo diễn giả");
      return res.data;
    },
    onSuccess: (newSpeaker) => {
      queryClient.setQueryData<MasterDataOverview>(MASTER_DATA_KEYS.overview(), (old) => {
        if (!old) return old;
        return {
          ...old,
          speakers: [newSpeaker, ...old.speakers],
          stats: { ...old.stats, totalSpeakers: old.speakers.length + 1 },
        };
      });
      queryClient.invalidateQueries({ queryKey: MASTER_DATA_KEYS.all });
    },
  });
}

export function useUpdateSpeakerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: UpdateSpeakerDTO }) => {
      const res = await updateSpeakerAction(id, dto);
      if (!res.success || !res.data) throw new Error(res.error || "Lỗi cập nhật diễn giả");
      return res.data;
    },
    onSuccess: (updatedSpeaker) => {
      queryClient.setQueryData<MasterDataOverview>(MASTER_DATA_KEYS.overview(), (old) => {
        if (!old) return old;
        return {
          ...old,
          speakers: old.speakers.map((s) => (s.id === updatedSpeaker.id ? updatedSpeaker : s)),
        };
      });
      queryClient.invalidateQueries({ queryKey: MASTER_DATA_KEYS.all });
    },
  });
}

export function useDeleteSpeakerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteSpeakerAction(id);
      if (!res.success) throw new Error(res.error || "Lỗi xóa diễn giả");
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData<MasterDataOverview>(MASTER_DATA_KEYS.overview(), (old) => {
        if (!old) return old;
        return {
          ...old,
          speakers: old.speakers.filter((s) => s.id !== deletedId),
          stats: { ...old.stats, totalSpeakers: Math.max(0, old.speakers.length - 1) },
        };
      });
      queryClient.invalidateQueries({ queryKey: MASTER_DATA_KEYS.all });
    },
  });
}

// ==========================================
// 5. AWARDS MUTATIONS
// ==========================================
export function useCreateAwardMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: CreateAwardDTO) => {
      const res = await createAwardAction(dto);
      if (!res.success || !res.data) throw new Error(res.error || "Lỗi tạo giải thưởng");
      return res.data;
    },
    onSuccess: (newAward) => {
      queryClient.setQueryData<MasterDataOverview>(MASTER_DATA_KEYS.overview(), (old) => {
        if (!old) return old;
        return {
          ...old,
          awards: [newAward, ...old.awards],
          stats: {
            ...old.stats,
            totalAwardCategories: old.stats.totalAwardCategories + newAward.categories.length,
          },
        };
      });
      queryClient.invalidateQueries({ queryKey: MASTER_DATA_KEYS.all });
    },
  });
}

export function useUpdateAwardMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: UpdateAwardDTO }) => {
      const res = await updateAwardAction(id, dto);
      if (!res.success || !res.data) throw new Error(res.error || "Lỗi cập nhật giải thưởng");
      return res.data;
    },
    onSuccess: (updatedAward) => {
      queryClient.setQueryData<MasterDataOverview>(MASTER_DATA_KEYS.overview(), (old) => {
        if (!old) return old;
        return {
          ...old,
          awards: old.awards.map((a) => (a.id === updatedAward.id ? updatedAward : a)),
        };
      });
      queryClient.invalidateQueries({ queryKey: MASTER_DATA_KEYS.all });
    },
  });
}

export function useDeleteAwardMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteAwardAction(id);
      if (!res.success) throw new Error(res.error || "Lỗi xóa giải thưởng");
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData<MasterDataOverview>(MASTER_DATA_KEYS.overview(), (old) => {
        if (!old) return old;
        const deletedAward = old.awards.find((a) => a.id === deletedId);
        const categoriesCount = deletedAward?.categories.length || 0;
        return {
          ...old,
          awards: old.awards.filter((a) => a.id !== deletedId),
          stats: {
            ...old.stats,
            totalAwardCategories: Math.max(0, old.stats.totalAwardCategories - categoriesCount),
          },
        };
      });
      queryClient.invalidateQueries({ queryKey: MASTER_DATA_KEYS.all });
    },
  });
}
