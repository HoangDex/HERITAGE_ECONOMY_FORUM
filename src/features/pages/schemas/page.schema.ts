/**
 * LAYER 2: VALIDATION LAYER (Zod Schemas)
 * Ràng buộc và xác thực cấu trúc JSON của Page và từng Section
 */

import { z } from "zod";

export const SECTION_TYPES_ENUM = [
  "HERO",
  "PILLARS_5",
  "EVENT_HIGHLIGHT",
  "AWARDS_SHOWCASE",
  "PROJECT_GRID",
  "NEWS_FEED",
  "PARTNERS_SLIDER",
  "ABOUT_COUNCIL",
  "ABOUT_EXECUTIVE",
  "TIMELINE",
  "SPEAKERS_GRID",
  "CONTACT_FORM",
  "CTA_BANNER",
  "CUSTOM_HTML",
] as const;

export const pageSectionSchema = z.object({
  id: z.string().min(1, "Mã định danh Section không được để trống"),
  type: z.enum(SECTION_TYPES_ENUM, { message: "Loại Section không hợp lệ" }),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  order: z.number().int().default(0),
  isVisible: z.boolean().default(true),
  props: z.record(z.string(), z.unknown()).default({}),
});

export const seoPropsSchema = z.object({
  metaTitle: z.string().max(100).optional(),
  metaDescription: z.string().max(300).optional(),
  keywords: z.array(z.string()).optional(),
  ogImage: z.string().url("Đường dẫn ảnh OG không hợp lệ").optional().or(z.literal("")),
  canonicalUrl: z.string().optional(),
});

export const createPageSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug không được để trống")
    .max(150)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug chỉ bao gồm chữ thường, số và dấu gạch nối (VD: gioi-thieu)"
    )
    .trim(),
  name: z.string().min(2, "Tên trang quản lý tối thiểu 2 ký tự").max(150).trim(),
  title: z.string().min(5, "Tiêu đề trang tối thiểu 5 ký tự").max(255).trim(),
  description: z.string().max(1000).optional(),
  seoProps: seoPropsSchema.optional(),
  sections: z.array(pageSectionSchema).default([]),
  isPublished: z.boolean().default(false),
  order: z.number().int().default(0),
});

export const updatePageSchema = createPageSchema.partial();

export const addSectionSchema = z.object({
  type: z.enum(SECTION_TYPES_ENUM, { message: "Vui lòng chọn loại Section hợp lệ" }),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  order: z.number().int().optional(),
  isVisible: z.boolean().default(true),
  props: z.record(z.string(), z.unknown()).default({}),
});

export const updateSectionSchema = addSectionSchema.partial();

export const reorderSectionsSchema = z.object({
  sectionIds: z.array(z.string()).min(1, "Danh sách thứ tự Section không được rỗng"),
});

export type CreatePageInput = z.infer<typeof createPageSchema>;
export type UpdatePageInput = z.infer<typeof updatePageSchema>;
export type AddSectionInput = z.infer<typeof addSectionSchema>;
export type UpdateSectionInput = z.infer<typeof updateSectionSchema>;
export type ReorderSectionsInput = z.infer<typeof reorderSectionsSchema>;
