/**
 * LAYER 6A: TANSTACK QUERY HOOKS CHO QUẢN TRỊ TRANG VÀ SECTIONS (PAGES CACHE)
 * Tự động cập nhật cache của trang khi thay đổi Section, di chuyển thứ tự hoặc bật/tắt hiển thị.
 */

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { PageEntity, UpdateSectionDTO, AddSectionDTO, UpdatePageDTO } from "../types/page.types";
import {
  updateSectionAction,
  reorderSectionsAction,
  toggleSectionVisibilityAction,
  removeSectionAction,
  addSectionAction,
  updatePageAction,
} from "../actions/page.actions";

export const PAGE_QUERY_KEYS = {
  all: ["pages"] as const,
  detail: (idOrSlug: string) => [...PAGE_QUERY_KEYS.all, idOrSlug] as const,
};

/**
 * Hook quản lý Cache của một Page Entity
 * Sử dụng initialData kết hợp initialDataUpdatedAt để loại bỏ side-effect refetch không mong muốn khi component mount.
 */
export function usePageDetailQuery(initialPage: PageEntity) {
  return useQuery<PageEntity>({
    queryKey: PAGE_QUERY_KEYS.detail(initialPage.id || initialPage.slug),
    queryFn: () => initialPage,
    initialData: initialPage,
    initialDataUpdatedAt: () => Date.now(),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Mutation: Cập nhật Section
 */
export function useUpdateSectionMutation(pageId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      sectionId,
      dto,
    }: {
      sectionId: string;
      dto: UpdateSectionDTO;
    }) => {
      const res = await updateSectionAction(pageId, sectionId, dto);
      if (!res.success || !res.data) throw new Error(res.error || "Lỗi cập nhật section");
      return res.data;
    },
    onSuccess: (updatedPage) => {
      queryClient.setQueryData(PAGE_QUERY_KEYS.detail(pageId), updatedPage);
      queryClient.setQueryData(PAGE_QUERY_KEYS.detail(updatedPage.slug), updatedPage);
      queryClient.invalidateQueries({ queryKey: PAGE_QUERY_KEYS.all });
    },
  });
}

/**
 * Mutation: Sắp xếp lại thứ tự Section
 */
export function useReorderSectionsMutation(pageId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sectionIds: string[]) => {
      const res = await reorderSectionsAction(pageId, sectionIds);
      if (!res.success || !res.data) throw new Error(res.error || "Lỗi sắp xếp sections");
      return res.data;
    },
    onSuccess: (updatedPage) => {
      queryClient.setQueryData(PAGE_QUERY_KEYS.detail(pageId), updatedPage);
      queryClient.setQueryData(PAGE_QUERY_KEYS.detail(updatedPage.slug), updatedPage);
      queryClient.invalidateQueries({ queryKey: PAGE_QUERY_KEYS.all });
    },
  });
}

/**
 * Mutation: Bật/Tắt hiển thị Section
 */
export function useToggleSectionVisibilityMutation(pageId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      sectionId,
      isVisible,
    }: {
      sectionId: string;
      isVisible: boolean;
    }) => {
      const res = await toggleSectionVisibilityAction(pageId, sectionId, isVisible);
      if (!res.success || !res.data) throw new Error(res.error || "Lỗi đổi trạng thái section");
      return res.data;
    },
    onSuccess: (updatedPage) => {
      queryClient.setQueryData(PAGE_QUERY_KEYS.detail(pageId), updatedPage);
      queryClient.setQueryData(PAGE_QUERY_KEYS.detail(updatedPage.slug), updatedPage);
      queryClient.invalidateQueries({ queryKey: PAGE_QUERY_KEYS.all });
    },
  });
}

/**
 * Mutation: Thêm Section mới
 */
export function useAddSectionMutation(pageId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: AddSectionDTO) => {
      const res = await addSectionAction(pageId, {
        type: dto.type,
        title: dto.title,
        subtitle: dto.subtitle,
        order: dto.order,
        isVisible: dto.isVisible ?? true,
        props: dto.props ?? {},
      });
      if (!res.success || !res.data) throw new Error(res.error || "Lỗi thêm section");
      return res.data;
    },
    onSuccess: (updatedPage) => {
      queryClient.setQueryData(PAGE_QUERY_KEYS.detail(pageId), updatedPage);
      queryClient.setQueryData(PAGE_QUERY_KEYS.detail(updatedPage.slug), updatedPage);
      queryClient.invalidateQueries({ queryKey: PAGE_QUERY_KEYS.all });
    },
  });
}

/**
 * Mutation: Xóa Section
 */
export function useRemoveSectionMutation(pageId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sectionId: string) => {
      const res = await removeSectionAction(pageId, sectionId);
      if (!res.success || !res.data) throw new Error(res.error || "Lỗi xóa section");
      return res.data;
    },
    onSuccess: (updatedPage) => {
      queryClient.setQueryData(PAGE_QUERY_KEYS.detail(pageId), updatedPage);
      queryClient.setQueryData(PAGE_QUERY_KEYS.detail(updatedPage.slug), updatedPage);
      queryClient.invalidateQueries({ queryKey: PAGE_QUERY_KEYS.all });
    },
  });
}

/**
 * Mutation: Cập nhật thông tin Trang & Cài đặt SEO
 */
export function useUpdatePageMutation(pageId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: UpdatePageDTO) => {
      const res = await updatePageAction(pageId, dto);
      if (!res.success || !res.data) throw new Error(res.error || "Lỗi cập nhật cài đặt trang");
      return res.data;
    },
    onSuccess: (updatedPage) => {
      queryClient.setQueryData(PAGE_QUERY_KEYS.detail(pageId), updatedPage);
      queryClient.setQueryData(PAGE_QUERY_KEYS.detail(updatedPage.slug), updatedPage);
      queryClient.invalidateQueries({ queryKey: PAGE_QUERY_KEYS.all });
    },
  });
}
