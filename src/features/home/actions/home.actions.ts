/**
 * LAYER 5A: NEXT.JS SERVER ACTIONS CHO MODULE HOME
 * Đăng ký nhận bản tin, kỷ yếu và lấy dữ liệu trang chủ
 */

"use server";

import { homeService } from "../services/home.service";
import type { HomePageData } from "../types/home.types";

export interface ServerActionResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export async function getHomePageDataAction(): Promise<ServerActionResponse<HomePageData>> {
  try {
    const data = await homeService.getHomePageData();
    return { success: true, data };
  } catch (error) {
    console.error("[getHomePageDataAction] Error:", error);
    return { success: false, error: "Không thể tải dữ liệu trang chủ" };
  }
}

export async function subscribeNewsletterAction(
  formData: FormData
): Promise<ServerActionResponse<{ subscribed: boolean }>> {
  try {
    const email = (formData.get("email") as string) || "";
    const fullName = (formData.get("fullName") as string) || "";

    const res = await homeService.subscribeNewsletter(email, fullName);
    if (!res.success) {
      return { success: false, error: res.message };
    }

    return {
      success: true,
      message: res.message,
      data: { subscribed: true },
    };
  } catch (error) {
    console.error("[subscribeNewsletterAction] Error:", error);
    return { success: false, error: "Đã có lỗi xảy ra khi đăng ký nhận tin." };
  }
}
