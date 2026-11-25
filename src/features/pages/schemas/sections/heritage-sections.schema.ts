/**
 * ZOD SCHEMAS & DTOS: CÁC SECTION CỦA TRANG MÔ HÌNH DI SẢN (HERITAGE / PROJECTS PAGE SECTIONS)
 * Phân rã độc lập theo Mục 10: Dự án & Mô hình thực tiễn - Đề án HEF
 */

import { z } from "zod";

// ==========================================
// SCHEMAS CON DÙNG CHO HERITAGE / PROJECTS
// ==========================================

export const heritageMetricsSchema = z.object({
  annualRevenue: z.string().default("Chưa công bố"),
  jobsCreated: z.number().int().default(0),
  conservationFundShare: z.string().default("0%"),
  imageUrl: z.string().optional(),
  gallery: z.array(z.string()).default([]),
});
export type HeritageMetricsDTO = z.infer<typeof heritageMetricsSchema>;

export const heritageProjectItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Tên mô hình di sản không được để trống"),
  slug: z.string().min(1, "Slug không được để trống"),
  location: z.string().default("Việt Nam"),
  category: z.string().default("Di sản văn hóa"),
  status: z.enum(["Đang vận hành", "Mở rộng đầu tư", "Đang nghiên cứu"]).default("Đang vận hành"),
  description: z.string().default(""),
  highlights: z.array(z.string()).default([]),
  economicMetrics: heritageMetricsSchema.default({
    annualRevenue: "Đang cập nhật",
    jobsCreated: 50,
    conservationFundShare: "10%",
    gallery: [],
  }),
  imageUrl: z.string().optional(),
  gallery: z.array(z.string()).default([]),
});
export type HeritageProjectItemDTO = z.infer<typeof heritageProjectItemSchema>;

// ==========================================
// 1. SECTION: HERITAGE HERO / STATS BANNER
// ==========================================

export const heritageHeroPropsSchema = z.object({
  badge: z.string().default("Bản Đồ Kinh Tế Di Sản Thực Tiễn"),
  title: z.string().default("Mô Hình Kinh Tế Di Sản Tiêu Biểu"),
  slogan: z.string().default("Hiện thực hóa giá trị di sản thành nguồn lực sinh kế và phát triển bền vững"),
  description: z.string().default("Không gian giới thiệu các mô hình kinh tế di sản thành công trên toàn quốc: từ bảo tồn làng nghề, du lịch văn hóa bền vững, ẩm thực truyền thống đến ứng dụng công nghệ số hóa di sản."),
  totalProjects: z.number().int().default(30),
  totalJobs: z.number().int().default(1250),
  totalRevenue: z.string().default("350+ tỷ VNĐ"),
});
export type HeritageHeroPropsDTO = z.infer<typeof heritageHeroPropsSchema>;

export const heritageHeroSectionSchema = z.object({
  id: z.string(),
  type: z.literal("HERITAGE_HERO"),
  order: z.number().int().default(1),
  isVisible: z.boolean().default(true),
  props: heritageHeroPropsSchema,
});
export type HeritageHeroSectionDTO = z.infer<typeof heritageHeroSectionSchema>;

// ==========================================
// 2. SECTION: HERITAGE DIRECTORY / GRID
// ==========================================

export const heritageGridPropsSchema = z.object({
  title: z.string().default("Danh Mục Các Mô Hình Kinh Tế Di Sản"),
  subtitle: z.string().default("Bộ Lọc Theo Lĩnh Vực"),
  projects: z.array(heritageProjectItemSchema).default([]),
});
export type HeritageGridPropsDTO = z.infer<typeof heritageGridPropsSchema>;

export const heritageGridSectionSchema = z.object({
  id: z.string(),
  type: z.literal("HERITAGE_GRID"),
  order: z.number().int().default(2),
  isVisible: z.boolean().default(true),
  props: heritageGridPropsSchema,
});
export type HeritageGridSectionDTO = z.infer<typeof heritageGridSectionSchema>;

// ==========================================
// 3. SECTION: HERITAGE PROPOSAL CTA
// ==========================================

export const heritageProposalPropsSchema = z.object({
  title: z.string().default("Đăng Ký Mô Hình Kinh Tế Di Sản Của Bạn"),
  subtitle: z.string().default("Kết Nối Nguồn Lực & Hỗ Trợ Chuyên Gia"),
  description: z.string().default("Diễn đàn đồng hành hỗ trợ truyền thông, tư vấn hoàn thiện mô hình tài chính và kết nối các nhà đầu tư chiến lược."),
  actionLabel: z.string().default("Nộp đề xuất mô hình"),
  actionUrl: z.string().default("/contact?type=du-an"),
});
export type HeritageProposalPropsDTO = z.infer<typeof heritageProposalPropsSchema>;

export const heritageProposalSectionSchema = z.object({
  id: z.string(),
  type: z.literal("HERITAGE_PROPOSAL"),
  order: z.number().int().default(3),
  isVisible: z.boolean().default(true),
  props: heritageProposalPropsSchema,
});
export type HeritageProposalSectionDTO = z.infer<typeof heritageProposalSectionSchema>;

// ==========================================
// COMPOUND DISCRIMINATED UNION
// ==========================================

export const anyHeritageSectionSchema = z.discriminatedUnion("type", [
  heritageHeroSectionSchema,
  heritageGridSectionSchema,
  heritageProposalSectionSchema,
]);
export type AnyHeritageSectionDTO = z.infer<typeof anyHeritageSectionSchema>;
