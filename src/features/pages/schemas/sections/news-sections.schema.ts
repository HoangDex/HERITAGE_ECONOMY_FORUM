/**
 * ZOD SCHEMAS & DTOS: CÁC SECTION CỦA TRANG TIN TỨC (NEWS PAGE SECTIONS)
 * Phân rã độc lập theo Mục 9: Tin tức - Đề án HEF
 */

import { z } from "zod";

// ==========================================
// SCHEMAS CON DÙNG CHO NEWS
// ==========================================

export const newsAuthorItemSchema = z.object({
  name: z.string().min(1, "Họ tên tác giả không được để trống"),
  title: z.string().default(""),
  avatarUrl: z.string().optional(),
  organization: z.string().optional(),
});
export type NewsAuthorItemDTO = z.infer<typeof newsAuthorItemSchema>;

export const newsPageArticleItemSchema = z.object({
  id: z.string(),
  slug: z.string().min(1, "Slug bài viết không được để trống"),
  title: z.string().min(1, "Tiêu đề bài viết không được để trống"),
  sapo: z.string().default(""),
  category: z.string().default("hoat-dong"),
  categoryName: z.string().default("Hoạt động"),
  coverImage: z.string().default("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800"),
  author: newsAuthorItemSchema.default({ name: "Ban Biên Tập HEF", title: "Thành viên Ban Thư ký" }),
  publishedAt: z.string().default(new Date().toISOString()),
  isFeatured: z.boolean().default(false),
  readingMinutes: z.number().int().default(5),
  tags: z.array(z.string()).default([]),
});
export type NewsPageArticleItemDTO = z.infer<typeof newsPageArticleItemSchema>;

// ==========================================
// 1. SECTION: NEWS HERO / BANNER
// ==========================================

export const newsHeroPropsSchema = z.object({
  badge: z.string().default("Trung Tâm Tri Thức & Truyền Thông"),
  title: z.string().default("Tin Tức, Nghiên Cứu & Góc Nhìn Chuyên Gia"),
  description: z.string().default("Cập nhật hoạt động, nghiên cứu, quan điểm chuyên gia và những mô hình thực tiễn góp phần làm rõ vai trò của di sản trong phát triển kinh tế, văn hóa và xã hội."),
});
export type NewsHeroPropsDTO = z.infer<typeof newsHeroPropsSchema>;

export const newsHeroSectionSchema = z.object({
  id: z.string(),
  type: z.literal("NEWS_HERO"),
  order: z.number().int().default(1),
  isVisible: z.boolean().default(true),
  props: newsHeroPropsSchema,
});
export type NewsHeroSectionDTO = z.infer<typeof newsHeroSectionSchema>;

// ==========================================
// 2. SECTION: NEWS TOP STORY (BÀI ĐINH & BÀI BÊN CẠNH)
// ==========================================

export const newsTopStoryPropsSchema = z.object({
  featuredArticle: newsPageArticleItemSchema.optional(),
  topSideArticles: z.array(newsPageArticleItemSchema).default([]),
});
export type NewsTopStoryPropsDTO = z.infer<typeof newsTopStoryPropsSchema>;

export const newsTopStorySectionSchema = z.object({
  id: z.string(),
  type: z.literal("NEWS_TOP_STORY"),
  order: z.number().int().default(2),
  isVisible: z.boolean().default(true),
  props: newsTopStoryPropsSchema,
});
export type NewsTopStorySectionDTO = z.infer<typeof newsTopStorySectionSchema>;

// ==========================================
// 3. SECTION: NEWS GRID (DANH SÁCH BÀI VIẾT)
// ==========================================

export const newsGridPropsSchema = z.object({
  title: z.string().default("Dòng Chảy Tin Tức & Nghiên Cứu Mới"),
  selectedCategory: z.string().default("all"),
  itemsPerPage: z.number().int().default(9),
  articles: z.array(newsPageArticleItemSchema).default([]),
});
export type NewsGridPropsDTO = z.infer<typeof newsGridPropsSchema>;

export const newsGridSectionSchema = z.object({
  id: z.string(),
  type: z.literal("NEWS_GRID"),
  order: z.number().int().default(3),
  isVisible: z.boolean().default(true),
  props: newsGridPropsSchema,
});
export type NewsGridSectionDTO = z.infer<typeof newsGridSectionSchema>;

// ==========================================
// COMPOUND DISCRIMINATED UNION
// ==========================================

export const anyNewsSectionSchema = z.discriminatedUnion("type", [
  newsHeroSectionSchema,
  newsTopStorySectionSchema,
  newsGridSectionSchema,
]);
export type AnyNewsSectionDTO = z.infer<typeof anyNewsSectionSchema>;
