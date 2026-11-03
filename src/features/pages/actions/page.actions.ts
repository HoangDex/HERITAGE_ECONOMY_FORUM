/**
 * LAYER 5A: SERVER ACTIONS LAYER (Page & Sections Mutations)
 * Cung cấp các thao tác Server Actions cho trang quản trị Admin CMS
 */

"use server";

import { revalidatePath } from "next/cache";
import {
  createPageSchema,
  updatePageSchema,
  addSectionSchema,
  updateSectionSchema,
  reorderSectionsSchema,
  type CreatePageInput,
  type UpdatePageInput,
  type AddSectionInput,
  type UpdateSectionInput,
} from "../schemas/page.schema";
import { pageService } from "../services/page.service";
import type { ApiResponse } from "@/types";
import type { PageEntity } from "../types/page.types";

/**
 * Server Action: Tạo mới một trang web
 */
export async function createPageAction(input: CreatePageInput): Promise<ApiResponse<PageEntity>> {
  const validation = createPageSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Dữ liệu trang không hợp lệ",
    };
  }

  try {
    const page = await pageService.createPage(validation.data);
    revalidatePath("/admin/pages");
    revalidatePath(`/${page.slug}`);
    return {
      success: true,
      data: page,
      message: "Tạo trang thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi tạo trang",
    };
  }
}

/**
 * Server Action: Cập nhật thông tin trang
 */
export async function updatePageAction(
  id: string,
  input: UpdatePageInput
): Promise<ApiResponse<PageEntity>> {
  const validation = updatePageSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Dữ liệu cập nhật không hợp lệ",
    };
  }

  try {
    const updated = await pageService.updatePage(id, validation.data);
    if (!updated) return { success: false, error: "Không tìm thấy trang" };

    revalidatePath("/admin/pages");
    revalidatePath(`/${updated.slug}`);
    return {
      success: true,
      data: updated,
      message: "Cập nhật trang thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi cập nhật trang",
    };
  }
}

/**
 * Server Action: Thêm Section mới vào trang
 */
export async function addSectionAction(
  pageId: string,
  input: AddSectionInput
): Promise<ApiResponse<PageEntity>> {
  const validation = addSectionSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Dữ liệu section không hợp lệ",
    };
  }

  try {
    const updated = await pageService.addSection(pageId, validation.data);
    if (!updated) return { success: false, error: "Không tìm thấy trang để thêm section" };

    revalidatePath("/admin/pages");
    revalidatePath(`/${updated.slug}`);
    return {
      success: true,
      data: updated,
      message: "Thêm section thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi thêm section",
    };
  }
}

/**
 * Server Action: Cập nhật nội dung Section trong trang
 */
export async function updateSectionAction(
  pageId: string,
  sectionId: string,
  input: UpdateSectionInput
): Promise<ApiResponse<PageEntity>> {
  const validation = updateSectionSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Dữ liệu cập nhật section không hợp lệ",
    };
  }

  try {
    const updated = await pageService.updateSection(pageId, sectionId, validation.data);
    if (!updated) return { success: false, error: "Không tìm thấy trang hoặc section" };

    revalidatePath("/admin/pages");
    revalidatePath(`/${updated.slug}`);
    return {
      success: true,
      data: updated,
      message: "Cập nhật section thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi cập nhật section",
    };
  }
}

/**
 * Server Action: Sắp xếp lại thứ tự các Section
 */
export async function reorderSectionsAction(
  pageId: string,
  sectionIds: string[]
): Promise<ApiResponse<PageEntity>> {
  const validation = reorderSectionsSchema.safeParse({ sectionIds });
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Dữ liệu thứ tự không hợp lệ",
    };
  }

  try {
    const updated = await pageService.reorderSections(pageId, validation.data.sectionIds);
    if (!updated) return { success: false, error: "Không tìm thấy trang" };

    revalidatePath("/admin/pages");
    revalidatePath(`/${updated.slug}`);
    return {
      success: true,
      data: updated,
      message: "Đã cập nhật thứ tự các khối thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi sắp xếp section",
    };
  }
}

/**
 * Server Action: Bật/Tắt hiển thị Section
 */
export async function toggleSectionVisibilityAction(
  pageId: string,
  sectionId: string,
  isVisible: boolean
): Promise<ApiResponse<PageEntity>> {
  try {
    const updated = await pageService.toggleSection(pageId, sectionId, isVisible);
    if (!updated) return { success: false, error: "Không tìm thấy trang hoặc section" };

    revalidatePath("/admin/pages");
    revalidatePath(`/${updated.slug}`);
    return {
      success: true,
      data: updated,
      message: isVisible ? "Đã bật hiển thị section" : "Đã ẩn section",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi đổi trạng thái section",
    };
  }
}
