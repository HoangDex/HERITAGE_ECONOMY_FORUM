/**
 * LAYER 5A: SERVER ACTIONS LAYER (Next.js Mutations)
 * Cung cấp các mutation an toàn từ Server, tích hợp validation và revalidate cache.
 */

"use server";

import { revalidatePath } from "next/cache";
import { createHeritageSchema, type CreateHeritageInput } from "../schemas/heritage.schema";
import { heritageService } from "../services/heritage.service";
import type { ApiResponse } from "@/types";
import type { HeritageProject } from "../types/heritage.types";

/**
 * Server Action: Tạo mới mô hình kinh tế di sản
 */
export async function createHeritageProjectAction(
  input: CreateHeritageInput
): Promise<ApiResponse<HeritageProject>> {
  // 1. Validate dữ liệu qua Zod Schema
  const validation = createHeritageSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Dữ liệu không hợp lệ",
    };
  }

  try {
    // 2. Chuyển tiếp cho Service xử lý nghiệp vụ
    const project = await heritageService.createProject(validation.data);

    // 3. Revalidate App Router caches
    revalidatePath("/heritage");
    revalidatePath("/");

    return {
      success: true,
      data: project,
      message: "Tạo dự án kinh tế di sản thành công",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Đã có lỗi xảy ra trên máy chủ",
    };
  }
}

/**
 * Server Action: Xóa dự án di sản
 */
export async function deleteHeritageProjectAction(id: string): Promise<ApiResponse<null>> {
  if (!id) {
    return { success: false, error: "Thiếu mã định danh dự án" };
  }

  try {
    const success = await heritageService.removeProject(id);
    if (!success) {
      return { success: false, error: "Không tìm thấy dự án để xóa" };
    }

    revalidatePath("/heritage");
    return { success: true, message: "Đã xóa dự án thành công" };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Lỗi khi xóa dự án",
    };
  }
}
