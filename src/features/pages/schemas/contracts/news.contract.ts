import { z } from "zod";

export const NewsHeroSectionSchema = z
  .object({
    badge: z.string().min(1, "Nhãn badge là bắt buộc"),
    title: z.string().min(1, "Tiêu đề trang tin tức là bắt buộc"),
    description: z.string().min(1, "Mô tả trang tin tức là bắt buộc"),
  })
  .strict();

export const NewsFeaturedSectionSchema = z
  .string()
  .min(1, "ID bài viết featured_news không được để trống");

export const NewsFilterCategoryGroupSchema = z
  .object({
    title: z.string().min(1, "Tên nút bộ lọc là bắt buộc"),
    ids: z
      .array(z.coerce.number().int().positive("ID Category phải là số nguyên dương"))
      .min(1, "Mỗi nhóm bộ lọc phải có ít nhất 1 Category ID"),
  })
  .strict();

export const NewsFilterSectionSchema = z
  .object({
    categories: z.array(NewsFilterCategoryGroupSchema),
  })
  .strict();

export const NewsPagePropsRequestSchema = z
  .object({
    hero: NewsHeroSectionSchema,
    featured_news: NewsFeaturedSectionSchema,
    filter: NewsFilterSectionSchema,
  })
  .strict();

export const NewsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(6),
  category: z.string().trim().min(1).optional(),
  categoryIds: z
    .string()
    .regex(/^[1-9]\d*(,[1-9]\d*)*$/, "categoryIds phải là danh sách số nguyên dương cách nhau bởi dấu phẩy (VD: 1,2)")
    .transform((val) => [...new Set(val.split(",").map(Number))])
    .optional(),
  search: z.string().trim().optional(),
});

export const NEWS_SECTION_SCHEMAS = {
  hero: NewsHeroSectionSchema,
  featured_news: NewsFeaturedSectionSchema,
  filter: NewsFilterSectionSchema,
} as const;
