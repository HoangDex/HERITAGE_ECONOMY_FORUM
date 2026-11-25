/**
 * ZOD SCHEMAS & DTOS: CÁC SECTION CỦA TRANG LIÊN HỆ (CONTACT PAGE SECTIONS)
 * Phân rã độc lập theo Mục 11: Liên hệ - Đề án HEF
 */

import { z } from "zod";

// ==========================================
// SCHEMAS CON DÙNG CHO CONTACT
// ==========================================

export const contactInfoItemSchema = z.object({
  secretariatTitle: z.string().default("Ban Thư Ký Diễn Đàn Kinh Tế Di Sản"),
  address: z.string().default("Trung tâm Hội nghị Quốc tế & Hoàng thành Thăng Long, Ba Đình, Hà Nội"),
  hotline: z.string().default("+84 (0) 24 3838 8888"),
  email: z.string().email().default("contact@heritageforum.vn"),
  workingHours: z.string().default("Thứ Hai – Thứ Sáu: 08:00 – 17:30 (GMT+7)"),
  mapEmbedUrl: z.string().optional(),
});
export type ContactInfoItemDTO = z.infer<typeof contactInfoItemSchema>;

export const contactFaqItemSchema = z.object({
  question: z.string().min(1, "Câu hỏi không được để trống"),
  answer: z.string().min(1, "Câu trả lời không được để trống"),
});
export type ContactFaqItemDTO = z.infer<typeof contactFaqItemSchema>;

// ==========================================
// 1. SECTION: CONTACT BANNER
// ==========================================

export const contactBannerPropsSchema = z.object({
  badge: z.string().default("Cổng Tiếp Nhận Thông Tin"),
  title: z.string().default("Kết Nối Ban Tổ Chức & Ban Thư Ký"),
  slogan: z.string().default("Đồng hành kiến tạo giá trị – Thúc đẩy hợp tác đa phương"),
  description: z.string().default("Mọi thông tin liên quan đến đăng ký tham dự, đề cử giải thưởng, tài trợ đồng hành hoặc đề xuất tham luận xin gửi trực tiếp qua cổng tiếp nhận chính thức."),
});
export type ContactBannerPropsDTO = z.infer<typeof contactBannerPropsSchema>;

export const contactBannerSectionSchema = z.object({
  id: z.string(),
  type: z.literal("CONTACT_BANNER"),
  order: z.number().int().default(1),
  isVisible: z.boolean().default(true),
  props: contactBannerPropsSchema,
});
export type ContactBannerSectionDTO = z.infer<typeof contactBannerSectionSchema>;

// ==========================================
// 2. SECTION: CONTACT INFO
// ==========================================

export const contactInfoPropsSchema = z.object({
  title: z.string().default("Thông Tin Liên Hệ & Trụ Sở Ban Thư Ký"),
  info: contactInfoItemSchema.default({
    secretariatTitle: "Ban Thư Ký Diễn Đàn Kinh Tế Di Sản",
    address: "Trung tâm Hội nghị Quốc tế & Hoàng thành Thăng Long, Ba Đình, Hà Nội",
    hotline: "+84 (0) 24 3838 8888",
    email: "contact@heritageforum.vn",
    workingHours: "Thứ Hai – Thứ Sáu: 08:00 – 17:30 (GMT+7)",
  }),
  faqs: z.array(contactFaqItemSchema).default([]),
});
export type ContactInfoPropsDTO = z.infer<typeof contactInfoPropsSchema>;

export const contactInfoSectionSchema = z.object({
  id: z.string(),
  type: z.literal("CONTACT_INFO"),
  order: z.number().int().default(2),
  isVisible: z.boolean().default(true),
  props: contactInfoPropsSchema,
});
export type ContactInfoSectionDTO = z.infer<typeof contactInfoSectionSchema>;

// ==========================================
// 3. SECTION: CONTACT FORM
// ==========================================

export const contactFormPropsSchema = z.object({
  title: z.string().default("Gửi Yêu Cầu Kết Nối"),
  subtitle: z.string().default("Biểu Mẫu Trực Tuyến"),
  allowedTypes: z.array(z.string()).default([
    "tham-du",
    "dien-gia",
    "hop-tac",
    "tai-tro",
    "du-an",
    "giai-thuong",
    "truyen-thong",
    "khac",
  ]),
  submitButtonText: z.string().default("Gửi thông tin xác nhận"),
  successMessage: z.string().default("Cảm ơn bạn đã gửi liên hệ. Ban Thư ký sẽ phản hồi trong vòng 24 giờ làm việc."),
});
export type ContactFormPropsDTO = z.infer<typeof contactFormPropsSchema>;

export const contactFormSectionSchema = z.object({
  id: z.string(),
  type: z.literal("CONTACT_FORM"),
  order: z.number().int().default(3),
  isVisible: z.boolean().default(true),
  props: contactFormPropsSchema,
});
export type ContactFormSectionDTO = z.infer<typeof contactFormSectionSchema>;

// ==========================================
// COMPOUND DISCRIMINATED UNION
// ==========================================

export const anyContactSectionSchema = z.discriminatedUnion("type", [
  contactBannerSectionSchema,
  contactInfoSectionSchema,
  contactFormSectionSchema,
]);
export type AnyContactSectionDTO = z.infer<typeof anyContactSectionSchema>;
