/**
 * LAYER 2: VALIDATION LAYER (Zod Schema)
 * Xác thực dữ liệu đầu vào (Input Validation & Data Sanitization)
 */

import { z } from "zod";

export const PROJECT_STATUS_ENUM = ["Đang vận hành", "Mở rộng đầu tư", "Đang nghiên cứu"] as const;

export const createHeritageSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Tên dự án phải có ít nhất 5 ký tự" })
    .max(200, { message: "Tên dự án không được vượt quá 200 ký tự" })
    .trim(),
  location: z
    .string()
    .min(2, { message: "Địa danh / tỉnh thành không được để trống" })
    .max(100, { message: "Tên địa danh quá dài" })
    .trim(),
  category: z.string().min(2, { message: "Vui lòng chọn loại hình di sản" }).max(100).trim(),
  status: z
    .enum(PROJECT_STATUS_ENUM, {
      message: "Trạng thái dự án không hợp lệ",
    })
    .default("Đang vận hành"),
  description: z
    .string()
    .min(20, { message: "Mô tả mô hình kinh tế di sản tối thiểu 20 ký tự" })
    .max(2000, { message: "Mô tả không được vượt quá 2000 ký tự" })
    .trim(),
  highlights: z
    .array(z.string().min(2, { message: "Điểm nổi bật không được để trống" }))
    .min(1, { message: "Cần ít nhất 1 điểm nổi bật của mô hình" }),
  annualRevenue: z.string().min(2, { message: "Vui lòng nhập ước tính doanh thu hàng năm" }).trim(),
  jobsCreated: z
    .number({ message: "Số việc làm tạo ra phải là chữ số" })
    .int({ message: "Số việc làm phải là số nguyên" })
    .nonnegative({ message: "Số việc làm không được âm" }),
  conservationFundShare: z
    .string()
    .min(1, { message: "Vui lòng nhập tỷ lệ trích quỹ bảo tồn (VD: 10%)" })
    .trim(),
});

export const updateHeritageSchema = createHeritageSchema.partial();

export const heritageFilterSchema = z.object({
  location: z.string().optional(),
  category: z.string().optional(),
  status: z.string().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
});

export type CreateHeritageInput = z.infer<typeof createHeritageSchema>;
export type UpdateHeritageInput = z.infer<typeof updateHeritageSchema>;
export type HeritageFilterInput = z.infer<typeof heritageFilterSchema>;
