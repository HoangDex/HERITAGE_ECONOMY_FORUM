/**
 * LAYER 2: VALIDATION SCHEMAS CHO MODULE LIÊN HỆ
 */

import { z } from "zod";

export const contactRequestSchema = z.object({
  fullName: z.string().min(2, "Họ và tên tối thiểu 2 ký tự"),
  organization: z.string().min(2, "Vui lòng nhập tên đơn vị / tổ chức"),
  title: z.string().optional(),
  email: z.string().email("Địa chỉ email không hợp lệ"),
  phone: z.string().regex(/^[0-9+() -]{9,15}$/, "Số điện thoại không hợp lệ"),
  requestType: z.enum([
    "tham-du",
    "dien-gia",
    "hop-tac",
    "tai-tro",
    "du-an",
    "giai-thuong",
    "truyen-thong",
    "khac",
  ]),
  message: z.string().min(10, "Nội dung yêu cầu tối thiểu 10 ký tự"),
  consentDataPolicy: z.boolean().refine((val) => val === true, {
    message: "Bạn cần đồng ý với chính sách bảo vệ dữ liệu cá nhân",
  }),
});

export type ContactRequestInput = z.infer<typeof contactRequestSchema>;
