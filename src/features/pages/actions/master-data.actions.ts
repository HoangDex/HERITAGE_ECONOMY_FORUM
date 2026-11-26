/**
 * LAYER 5A: SERVER ACTIONS CHO DANH MỤC DỮ LIỆU DÙNG CHUNG (MASTER DATA MUTATIONS)
 * Cung cấp đầy đủ CRUD Server Actions với revalidatePath đồng bộ sang cả CMS và Website công khai.
 */

"use server";

import { revalidatePath } from "next/cache";
import {
  createCategorySchema,
  updateCategorySchema,
  createProjectSchema,
  updateProjectSchema,
  createOrganizationSchema,
  updateOrganizationSchema,
  createNewsSchema,
  updateNewsSchema,
  createSpeakerSchema,
  updateSpeakerSchema,
  createAwardSchema,
  updateAwardSchema,
} from "../schemas/master-data.schema";
import { masterDataService } from "../services/master-data.service";
import type {
  MasterDataCategory,
  MasterDataAwardCategory,
  CreateCategoryDTO,
  UpdateCategoryDTO,
  MasterDataProject,
  CreateProjectDTO,
  UpdateProjectDTO,
  MasterDataOrganization,
  CreateOrganizationDTO,
  UpdateOrganizationDTO,
  MasterDataNews,
  CreateNewsDTO,
  UpdateNewsDTO,
  MasterDataSpeaker,
  CreateSpeakerDTO,
  UpdateSpeakerDTO,
  MasterDataAward,
  CreateAwardDTO,
  UpdateAwardDTO,
} from "../types/master-data.types";
import type { ApiResponse } from "@/types";

function revalidateMasterData(reusedPages: string[] = []) {
  try {
    revalidatePath("/admin/data");
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/about");
    revalidatePath("/forum");
    revalidatePath("/news");
    revalidatePath("/awards");
    for (const page of reusedPages) {
      if (page && page.startsWith("/")) {
        revalidatePath(page);
      }
    }
  } catch (err) {
    console.warn("[revalidateMasterData] warning:", err);
  }
}

// ========================================================
// 1. PROJECTS (DỰ ÁN DI SẢN)
// ========================================================
export async function createProjectAction(
  input: CreateProjectDTO
): Promise<ApiResponse<MasterDataProject>> {
  const validation = createProjectSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Dữ liệu dự án không hợp lệ",
    };
  }

  try {
    const project = await masterDataService.createProject(validation.data as CreateProjectDTO);
    revalidateMasterData(["/", "/projects"]);
    return {
      success: true,
      data: project,
      message: "Thêm mới dự án di sản thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi thêm dự án",
    };
  }
}

export async function updateProjectAction(
  id: string,
  input: UpdateProjectDTO
): Promise<ApiResponse<MasterDataProject>> {
  const validation = updateProjectSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Dữ liệu cập nhật dự án không hợp lệ",
    };
  }

  try {
    const updated = await masterDataService.updateProject(id, validation.data as UpdateProjectDTO);
    if (!updated) return { success: false, error: "Không tìm thấy dự án" };

    revalidateMasterData(["/", "/projects"]);
    return {
      success: true,
      data: updated,
      message: "Cập nhật dự án di sản thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi cập nhật dự án",
    };
  }
}

export async function deleteProjectAction(id: string): Promise<ApiResponse<null>> {
  try {
    const deleted = await masterDataService.deleteProject(id);
    if (!deleted) return { success: false, error: "Không thể xóa dự án hoặc không tìm thấy" };

    revalidateMasterData(["/", "/projects"]);
    return {
      success: true,
      data: null,
      message: "Đã xóa dự án di sản thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi xóa dự án",
    };
  }
}

// ========================================================
// 2. ORGANIZATIONS (ĐỐI TÁC & CƠ QUAN)
// ========================================================
export async function createOrganizationAction(
  input: CreateOrganizationDTO
): Promise<ApiResponse<MasterDataOrganization>> {
  const validation = createOrganizationSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Dữ liệu cơ quan/đối tác không hợp lệ",
    };
  }

  try {
    const org = await masterDataService.createOrganization(
      validation.data as CreateOrganizationDTO
    );
    revalidateMasterData(["/", "/about", "/forum"]);
    return {
      success: true,
      data: org,
      message: "Thêm mới cơ quan/đối tác thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi thêm cơ quan/đối tác",
    };
  }
}

export async function updateOrganizationAction(
  id: string,
  input: UpdateOrganizationDTO
): Promise<ApiResponse<MasterDataOrganization>> {
  const validation = updateOrganizationSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Dữ liệu cập nhật đối tác không hợp lệ",
    };
  }

  try {
    const updated = await masterDataService.updateOrganization(
      id,
      validation.data as UpdateOrganizationDTO
    );
    if (!updated) return { success: false, error: "Không tìm thấy cơ quan/đối tác" };

    revalidateMasterData(["/", "/about", "/forum"]);
    return {
      success: true,
      data: updated,
      message: "Cập nhật cơ quan/đối tác thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi cập nhật đối tác",
    };
  }
}

export async function deleteOrganizationAction(id: string): Promise<ApiResponse<null>> {
  try {
    const deleted = await masterDataService.deleteOrganization(id);
    if (!deleted) return { success: false, error: "Không thể xóa đối tác hoặc không tìm thấy" };

    revalidateMasterData(["/", "/about", "/forum"]);
    return {
      success: true,
      data: null,
      message: "Đã xóa cơ quan/đối tác thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi xóa đối tác",
    };
  }
}

// ========================================================
// 3. NEWS (TIN TỨC & BÀI VIẾT)
// ========================================================
export async function createNewsAction(
  input: CreateNewsDTO
): Promise<ApiResponse<MasterDataNews>> {
  const validation = createNewsSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Dữ liệu bài viết không hợp lệ",
    };
  }

  try {
    const news = await masterDataService.createNews(validation.data as CreateNewsDTO);
    revalidateMasterData(["/", "/news"]);
    return {
      success: true,
      data: news,
      message: "Thêm mới bài viết tin tức thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi thêm bài viết",
    };
  }
}

export async function updateNewsAction(
  id: string,
  input: UpdateNewsDTO
): Promise<ApiResponse<MasterDataNews>> {
  const validation = updateNewsSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Dữ liệu cập nhật bài viết không hợp lệ",
    };
  }

  try {
    const updated = await masterDataService.updateNews(id, validation.data as UpdateNewsDTO);
    if (!updated) return { success: false, error: "Không tìm thấy bài viết" };

    revalidateMasterData(["/", "/news"]);
    return {
      success: true,
      data: updated,
      message: "Cập nhật bài viết thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi cập nhật bài viết",
    };
  }
}

export async function deleteNewsAction(id: string): Promise<ApiResponse<null>> {
  try {
    const deleted = await masterDataService.deleteNews(id);
    if (!deleted) return { success: false, error: "Không thể xóa bài viết hoặc không tìm thấy" };

    revalidateMasterData(["/", "/news"]);
    return {
      success: true,
      data: null,
      message: "Đã xóa bài viết thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi xóa bài viết",
    };
  }
}

// ========================================================
// 4. SPEAKERS (DIỄN GIẢ & CHUYÊN GIA)
// ========================================================
export async function createSpeakerAction(
  input: CreateSpeakerDTO
): Promise<ApiResponse<MasterDataSpeaker>> {
  const validation = createSpeakerSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Dữ liệu diễn giả không hợp lệ",
    };
  }

  try {
    const speaker = await masterDataService.createSpeaker(validation.data as CreateSpeakerDTO);
    revalidateMasterData(["/", "/forum", "/about"]);
    return {
      success: true,
      data: speaker,
      message: "Thêm mới diễn giả / chuyên gia thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi thêm diễn giả",
    };
  }
}

export async function updateSpeakerAction(
  id: string,
  input: UpdateSpeakerDTO
): Promise<ApiResponse<MasterDataSpeaker>> {
  const validation = updateSpeakerSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Dữ liệu cập nhật diễn giả không hợp lệ",
    };
  }

  try {
    const updated = await masterDataService.updateSpeaker(
      id,
      validation.data as UpdateSpeakerDTO
    );
    if (!updated) return { success: false, error: "Không tìm thấy diễn giả" };

    revalidateMasterData(["/", "/forum", "/about"]);
    return {
      success: true,
      data: updated,
      message: "Cập nhật thông tin diễn giả thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi cập nhật diễn giả",
    };
  }
}

export async function deleteSpeakerAction(id: string): Promise<ApiResponse<null>> {
  try {
    const deleted = await masterDataService.deleteSpeaker(id);
    if (!deleted) return { success: false, error: "Không thể xóa diễn giả hoặc không tìm thấy" };

    revalidateMasterData(["/", "/forum", "/about"]);
    return {
      success: true,
      data: null,
      message: "Đã xóa diễn giả thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi xóa diễn giả",
    };
  }
}

// ========================================================
// 5. AWARDS (GIẢI THƯỞNG & HẠNG MỤC)
// ========================================================
export async function createAwardAction(
  input: CreateAwardDTO
): Promise<ApiResponse<MasterDataAward>> {
  const validation = createAwardSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Dữ liệu giải thưởng không hợp lệ",
    };
  }

  try {
    const award = await masterDataService.createAward(validation.data as CreateAwardDTO);
    revalidateMasterData(["/", "/awards"]);
    return {
      success: true,
      data: award,
      message: "Thêm mới kỳ giải thưởng thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi thêm giải thưởng",
    };
  }
}

export async function updateAwardAction(
  id: string,
  input: UpdateAwardDTO
): Promise<ApiResponse<MasterDataAward>> {
  const validation = updateAwardSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Dữ liệu cập nhật giải thưởng không hợp lệ",
    };
  }

  try {
    const updated = await masterDataService.updateAward(id, validation.data as UpdateAwardDTO);
    if (!updated) return { success: false, error: "Không tìm thấy giải thưởng" };

    revalidateMasterData(["/", "/awards"]);
    return {
      success: true,
      data: updated,
      message: "Cập nhật giải thưởng thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi cập nhật giải thưởng",
    };
  }
}

export async function deleteAwardAction(id: string): Promise<ApiResponse<null>> {
  try {
    const deleted = await masterDataService.deleteAward(id);
    if (!deleted) return { success: false, error: "Không thể xóa giải thưởng hoặc không tìm thấy" };

    revalidateMasterData(["/", "/awards"]);
    return {
      success: true,
      data: null,
      message: "Đã xóa giải thưởng thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi xóa giải thưởng",
    };
  }
}

// ========================================================
// 6. CATEGORIES (CHUYÊN MỤC TIN TỨC - CHỈ GỒM ID & NAME)
// ========================================================
export async function createCategoryAction(
  input: CreateCategoryDTO
): Promise<ApiResponse<MasterDataCategory>> {
  const validation = createCategorySchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Tên danh mục không hợp lệ",
    };
  }

  try {
    const cat = await masterDataService.createCategory(validation.data);
    revalidateMasterData(["/", "/news"]);
    return {
      success: true,
      data: cat,
      message: "Thêm danh mục thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi thêm danh mục",
    };
  }
}

export async function updateCategoryAction(
  id: string,
  input: UpdateCategoryDTO
): Promise<ApiResponse<MasterDataCategory>> {
  const validation = updateCategorySchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Dữ liệu cập nhật danh mục không hợp lệ",
    };
  }

  try {
    const updated = await masterDataService.updateCategory(id, validation.data);
    if (!updated) return { success: false, error: "Không tìm thấy danh mục" };

    revalidateMasterData(["/", "/news"]);
    return {
      success: true,
      data: updated,
      message: "Cập nhật danh mục thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi cập nhật danh mục",
    };
  }
}

export async function deleteCategoryAction(id: string): Promise<ApiResponse<null>> {
  try {
    const deleted = await masterDataService.deleteCategory(id);
    if (!deleted) return { success: false, error: "Không tìm thấy danh mục để xóa" };

    revalidateMasterData(["/", "/news"]);
    return {
      success: true,
      data: null,
      message: "Đã xóa danh mục thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi xóa danh mục",
    };
  }
}

// ========================================================
// 7. AWARD CATEGORIES (HẠNG MỤC GIẢI THƯỞNG - CHỈ GỒM ID & NAME)
// ========================================================
export async function createAwardCategoryAction(
  input: CreateCategoryDTO
): Promise<ApiResponse<MasterDataAwardCategory>> {
  const validation = createCategorySchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Tên hạng mục giải thưởng không hợp lệ",
    };
  }

  try {
    const cat = await masterDataService.createAwardCategory(validation.data);
    revalidateMasterData(["/", "/awards"]);
    return {
      success: true,
      data: cat,
      message: "Thêm hạng mục giải thưởng thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi thêm hạng mục giải thưởng",
    };
  }
}

export async function updateAwardCategoryAction(
  id: string,
  input: UpdateCategoryDTO
): Promise<ApiResponse<MasterDataAwardCategory>> {
  const validation = updateCategorySchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Dữ liệu cập nhật hạng mục không hợp lệ",
    };
  }

  try {
    const updated = await masterDataService.updateAwardCategory(id, validation.data);
    if (!updated) return { success: false, error: "Không tìm thấy hạng mục giải thưởng" };

    revalidateMasterData(["/", "/awards"]);
    return {
      success: true,
      data: updated,
      message: "Cập nhật hạng mục giải thưởng thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi cập nhật hạng mục giải thưởng",
    };
  }
}

export async function deleteAwardCategoryAction(id: string): Promise<ApiResponse<null>> {
  try {
    const deleted = await masterDataService.deleteAwardCategory(id);
    if (!deleted) return { success: false, error: "Không tìm thấy hạng mục giải thưởng để xóa" };

    revalidateMasterData(["/", "/awards"]);
    return {
      success: true,
      data: null,
      message: "Đã xóa hạng mục giải thưởng thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi xóa hạng mục giải thưởng",
    };
  }
}
