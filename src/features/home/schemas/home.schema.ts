/**
 * LAYER 2: ZOD VALIDATION SCHEMAS CHO MODULE HOME
 * Validate form đăng ký nhận bản tin, đăng ký tham dự và truy vấn trang chủ
 */

import { z } from "zod";

export const newsletterSubscriptionSchema = z.object({
  email: z.string().email("Địa chỉ email không hợp lệ"),
  fullName: z.string().min(2, "Họ tên phải từ 2 ký tự trở lên").optional(),
  organization: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

export type NewsletterSubscriptionInput = z.infer<typeof newsletterSubscriptionSchema>;

export const eventRegistrationQuerySchema = z.object({
  eventId: z.string().min(1, "Mã sự kiện không được để trống"),
  type: z.enum(["tham-du", "hop-tac", "de-cu"]).default("tham-du"),
});

export type EventRegistrationQueryInput = z.infer<typeof eventRegistrationQuerySchema>;
