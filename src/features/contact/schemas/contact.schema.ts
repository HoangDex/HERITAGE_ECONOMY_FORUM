/**
 * LAYER 2: VALIDATION SCHEMAS CHO MODULE LIÊN HỆ
 */

import { z } from "zod";

export const contactRequestSchema = z.object({
  type: z.string().min(1, "Vui lòng chọn nhóm yêu cầu").optional(),
  requestType: z.string().optional(),
  fullName: z.string().min(2, "Họ và tên tối thiểu 2 ký tự"),
  organization: z.string().min(2, "Vui lòng nhập tên đơn vị / tổ chức"),
  position: z.string().optional(),
  title: z.string().optional(),
  email: z.string().email("Địa chỉ email không hợp lệ"),
  phone: z.string().min(8, "Số điện thoại không hợp lệ"),
  message: z.string().min(5, "Nội dung yêu cầu tối thiểu 5 ký tự"),
  consentDataPolicy: z.boolean().optional(),
});

export type ContactRequestInput = z.infer<typeof contactRequestSchema>;
