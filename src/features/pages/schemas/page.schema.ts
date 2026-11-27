/**
 * LAYER 2: VALIDATION LAYER (Zod Schemas)
 * Ràng buộc và xác thực cấu trúc JSON Universal Props của Page và từng Section
 */

import { z } from "zod";

export const SECTION_TYPES_ENUM = [
  // Short meaningful section keys
  "hero",
  "pillars",
  "event",
  "showcase",
  "news",
  "partners",
  "cta",
  "banner",
  "vision",
  "council",
  "executive",
  "sessions",
  "timeline",
  "speakers",
  "resources",
  "faq",
  "categories",
  "criteria",
  "process",
  "directory",
  "feed",
  "featured_news",
  "filter",
  "info",
  "form",
  // Legacy / Generic Section identifiers
  "HOME_HERO",
  "HOME_INTRO_PILLARS",
  "HOME_EVENT_HIGHLIGHT",
  "HOME_AWARDS_SHOWCASE",
  "HOME_FEATURED_PROJECTS",
  "HOME_NEWS_FEED",
  "HOME_PARTNERS_SLIDER",
  "HOME_CONVERSION_CTA",
  "ABOUT_BANNER",
  "ABOUT_VISION_MISSION",
  "ABOUT_COUNCIL",
  "ABOUT_EXECUTIVE",
  "ABOUT_PARTNERS",
  "HERO",
  "PILLARS_5",
  "EVENT_HIGHLIGHT",
  "AWARDS_SHOWCASE",
  "PROJECT_GRID",
  "NEWS_FEED",
  "PARTNERS_SLIDER",
  "TIMELINE",
  "SPEAKERS_GRID",
  "CONTACT_FORM",
  "CTA_BANNER",
  "CUSTOM_HTML",
] as const;

export const actionItemSchema = z.object({
  label: z.string(),
  href: z.string(),
  icon: z.string().optional(),
});

export const statItemSchema = z.object({
  value: z.string(),
  label: z.string(),
  icon: z.string().optional(),
  note: z.string().optional(),
});

const stringOrNumberIdSchema = z.union([z.string(), z.number()]);

export const cardItemSchema = z.object({
  badge: z.string().optional(),
  subBadge: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  quote: z.string().optional(),
  description: z.string().optional(),
  note: z.string().optional(),
  icon: z.string().optional(),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional(),
  actionLabel: z.string().optional(),
  href: z.string().optional(),
  ids: z.array(stringOrNumberIdSchema).optional(),
  stats: z.array(statItemSchema).optional(),
  actions: z.array(actionItemSchema).optional(),
});

export const groupItemSchema = z.object({
  badge: z.string().optional(),
  subBadge: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  quote: z.string().optional(),
  description: z.string().optional(),
  note: z.string().optional(),
  icon: z.string().optional(),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional(),
  actionLabel: z.string().optional(),
  href: z.string().optional(),
  ids: z.array(stringOrNumberIdSchema).optional(),
  stats: z.array(statItemSchema).optional(),
  actions: z.array(actionItemSchema).optional(),
  cards: z.array(cardItemSchema).optional(),
});

export const faqQuestionItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const formFieldConfigItemSchema = z.object({
  label: z.string(),
  placeholder: z.string().optional(),
  options: z.array(z.string()).optional(),
});

export const criteriaItemSchema = z.object({
  title: z.string(),
  weight: z.string().optional(),
  description: z.string().optional(),
  evidences: z.array(z.string()).optional(),
});

export const processStepItemSchema = z.object({
  time: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
});

export const universalSectionPropsSchema = z
  .object({
    id: stringOrNumberIdSchema.optional(),
    badge: z.string().optional(),
    subBadge: z.string().optional(),
    title: z.string().optional(),
    subtitle: z.string().optional(),
    quote: z.string().optional(),
    description: z.string().optional(),
    note: z.string().optional(),
    icon: z.string().optional(),
    imageUrl: z.string().optional(),
    imageAlt: z.string().optional(),
    videoUrl: z.string().optional(),
    videoTitle: z.string().optional(),
    actionLabel: z.string().optional(),
    href: z.string().optional(),
    address: z.string().optional(),
    hotline: z.string().optional(),
    email: z.string().optional(),
    workingHours: z.string().optional(),
    consentText: z.string().optional(),
    submitLabel: z.string().optional(),
    action: actionItemSchema.optional(),
    ids: z.array(stringOrNumberIdSchema).optional(),
    actions: z.array(actionItemSchema).optional(),
    stats: z.array(statItemSchema).optional(),
    cards: z.array(cardItemSchema).optional(),
    groups: z.array(groupItemSchema).optional(),
    categories: z.array(groupItemSchema).optional(),
    questions: z.array(faqQuestionItemSchema).optional(),
    fields: z.record(z.string(), formFieldConfigItemSchema).optional(),
    items: z.array(criteriaItemSchema).optional(),
    steps: z.array(processStepItemSchema).optional(),
    awards: z.array(z.unknown()).optional(),
    members: z.array(z.unknown()).optional(),
  })
  .passthrough();

export const pagePropsMapSchema = z.record(
  z.string(),
  z.union([
    universalSectionPropsSchema,
    z.string().transform((val) => val as unknown as z.infer<typeof universalSectionPropsSchema>),
  ])
);

export const pageSectionSchema = z.object({
  id: z.string().min(1, "Mã định danh Section không được để trống"),
  type: z.enum(SECTION_TYPES_ENUM, { message: "Loại Section không hợp lệ" }).or(z.string()),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  order: z.number().int().default(0),
  isVisible: z.boolean().default(true),
  props: universalSectionPropsSchema.default({}),
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
  props: pagePropsMapSchema.optional(),
  title: z.string().max(255).optional(),
  description: z.string().max(1000).optional(),
  seoProps: seoPropsSchema.optional(),
  sections: z.array(pageSectionSchema).optional(),
  isPublished: z.boolean().default(false),
  order: z.number().int().default(0),
});

export const updatePageSchema = createPageSchema.partial();

export const addSectionSchema = z.object({
  key: z.string().optional(),
  type: z.enum(SECTION_TYPES_ENUM, { message: "Vui lòng chọn loại Section hợp lệ" }).or(z.string()),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  order: z.number().int().optional(),
  isVisible: z.boolean().default(true),
  props: universalSectionPropsSchema.default({}),
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
