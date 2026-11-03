/**
 * LAYER 5A: NEXT.JS SERVER ACTIONS CHO MODULE ABOUT
 * Cung cấp các hành động server-side cho giao diện người dùng
 */

"use server";

import { aboutService } from "../services/about.service";
import { personDetailQuerySchema } from "../schemas/about.schema";
import type {
  AboutPageData,
  Person,
  PartnerOrganization,
  PartnerCategory,
} from "../types/about.types";

export interface ServerActionResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Lấy toàn bộ dữ liệu trang Giới thiệu cho SSR / Client Hydration
 */
export async function getAboutPageDataAction(): Promise<ServerActionResponse<AboutPageData>> {
  try {
    const data = await aboutService.getAboutPageData();
    return { success: true, data };
  } catch (error) {
    console.error("[getAboutPageDataAction] Error:", error);
    return { success: false, error: "Không thể tải dữ liệu trang Giới thiệu" };
  }
}

/**
 * Lấy thông tin chi tiết một nhân sự phục vụ modal xem tiểu sử & tham luận
 */
export async function getPersonDetailAction(id: string): Promise<ServerActionResponse<Person>> {
  try {
    const parsed = personDetailQuerySchema.safeParse({ id });
    if (!parsed.success) {
      return { success: false, error: "ID nhân sự không hợp lệ" };
    }

    const person = await aboutService.getPersonDetail(parsed.data.id);
    if (!person) {
      return { success: false, error: "Không tìm thấy thông tin nhân sự" };
    }

    return { success: true, data: person };
  } catch (error) {
    console.error("[getPersonDetailAction] Error:", error);
    return { success: false, error: "Lỗi hệ thống khi tải thông tin nhân sự" };
  }
}

/**
 * Lọc danh sách đối tác theo nhóm danh mục
 */
export async function getPartnersByCategoryAction(
  category: PartnerCategory | "ALL"
): Promise<ServerActionResponse<PartnerOrganization[]>> {
  try {
    const allPartners = (await aboutService.getAboutPageData()).partners;
    if (category === "ALL") {
      return { success: true, data: allPartners };
    }
    const filtered = allPartners.filter((p) => p.category === category);
    return { success: true, data: filtered };
  } catch (error) {
    console.error("[getPartnersByCategoryAction] Error:", error);
    return { success: false, error: "Lỗi tải danh sách đối tác" };
  }
}
