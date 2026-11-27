import { z } from "zod";

export const AwardsActionLinkSchema = z
  .object({
    label: z.string().min(1, "Nhãn nút không được để trống"),
    href: z.string().min(1, "Đường dẫn không được để trống"),
  })
  .strict();

export const AwardsHeroSectionSchema = z
  .object({
    title: z.string().min(1, "Tiêu đề giải thưởng là bắt buộc"),
    subtitle: z.string().min(1, "Tiêu đề phụ tiếng Anh là bắt buộc"),
    quote: z.string().min(1, "Thông điệp / slogan là bắt buộc"),
    description: z.string().min(1, "Mô tả giải thưởng là bắt buộc"),
    actions: z.array(AwardsActionLinkSchema),
  })
  .strict();

export const AwardsCategoriesSectionSchema = z
  .object({
    title: z.string().min(1, "Tiêu đề mục hạng mục là bắt buộc"),
    description: z.string().min(1, "Mô tả mục hạng mục là bắt buộc"),
    awards: z.array(z.unknown()),
  })
  .strict();

export const AwardsCriteriaItemSchema = z
  .object({
    title: z.string().min(1, "Tên tiêu chí là bắt buộc"),
    weight: z.string().min(1, "Tỷ trọng (%) là bắt buộc"),
    description: z.string().min(1, "Mô tả tiêu chí là bắt buộc"),
    evidences: z.array(z.string().min(1, "Minh chứng không được rỗng")),
  })
  .strict();

export const AwardsCriteriaSectionSchema = z
  .object({
    title: z.string().min(1, "Tiêu đề khung đánh giá là bắt buộc"),
    description: z.string().min(1, "Mô tả khung đánh giá là bắt buộc"),
    action: AwardsActionLinkSchema,
    items: z.array(AwardsCriteriaItemSchema),
  })
  .strict();

export const AwardsProcessStepSchema = z
  .object({
    time: z.string().min(1, "Mốc thời gian là bắt buộc"),
    title: z.string().min(1, "Tên bước là bắt buộc"),
    description: z.string().min(1, "Mô tả bước là bắt buộc"),
  })
  .strict();

export const AwardsProcessSectionSchema = z
  .object({
    title: z.string().min(1, "Tiêu đề quy trình là bắt buộc"),
    description: z.string().min(1, "Mô tả quy trình là bắt buộc"),
    steps: z.array(AwardsProcessStepSchema),
  })
  .strict();

export const AwardsCouncilSectionSchema = z
  .object({
    title: z.string().min(1, "Tiêu đề hội đồng là bắt buộc"),
    description: z.string().min(1, "Mô tả hội đồng là bắt buộc"),
    members: z.array(z.unknown()),
  })
  .strict();

export const AwardsPagePropsRequestSchema = z
  .object({
    hero: AwardsHeroSectionSchema,
    categories: AwardsCategoriesSectionSchema,
    criteria: AwardsCriteriaSectionSchema,
    process: AwardsProcessSectionSchema,
    council: AwardsCouncilSectionSchema,
  })
  .strict();

export const AwardsPageResponseSchema = z
  .object({
    id: z.string(),
    slug: z.literal("awards"),
    name: z.string(),
    props: AwardsPagePropsRequestSchema,
    isPublished: z.boolean(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  })
  .strict();

export const AWARDS_SECTION_SCHEMAS = {
  hero: AwardsHeroSectionSchema,
  categories: AwardsCategoriesSectionSchema,
  criteria: AwardsCriteriaSectionSchema,
  process: AwardsProcessSectionSchema,
  council: AwardsCouncilSectionSchema,
} as const;
