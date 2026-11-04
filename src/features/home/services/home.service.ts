/**
 * LAYER 4: BUSINESS LOGIC / SERVICE CHO MODULE HOME
 * Xử lý dữ liệu hiển thị trang chủ và xác thực đăng ký nhận bản tin / kỷ yếu
 */

import { homeRepository } from "../repositories/home.repository";
import { newsletterSubscriptionSchema } from "../schemas/home.schema";
import type { IHomeService, HomePageData } from "../types/home.types";

export class HomeService implements IHomeService {
  async getHomePageData(): Promise<HomePageData> {
    return homeRepository.getHomePageData();
  }

  async subscribeNewsletter(
    email: string,
    fullName?: string
  ): Promise<{ success: boolean; message: string }> {
    const parsed = newsletterSubscriptionSchema.safeParse({ email, fullName });
    if (!parsed.success) {
      const errorMsg = parsed.error.issues[0]?.message || "Dữ liệu không hợp lệ";
      return { success: false, message: errorMsg };
    }

    // Mô phỏng lưu trữ thông tin đăng ký nhận tin
    return {
      success: true,
      message:
        "Đăng ký thành công! Kỷ yếu Diễn đàn và Bản tin Kinh tế Di sản mới nhất sẽ được gửi tới email của bạn.",
    };
  }
}

export const homeService = new HomeService();
