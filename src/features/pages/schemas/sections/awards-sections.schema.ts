/**
 * ZOD SCHEMAS & DTOS: CÁC SECTION CỦA TRANG GIẢI THƯỞNG (AWARDS PAGE SECTIONS)
 * Phân rã độc lập theo Mục 8: Giải thưởng - Đề án HEF
 */

import { z } from "zod";

// ==========================================
// SCHEMAS CON DÙNG CHO AWARDS
// ==========================================

export const awardCategoryItemSchema = z.object({
  id: z.string(),
  order: z.number().int().default(1),
  title: z.string().min(1, "Tiêu đề hạng mục không được để trống"),
  subtitle: z.string().default(""),
  description: z.string().default(""),
  iconName: z.string().default("Sparkles"),
  targetAudience: z.string().default(""),
});
export type AwardCategoryItemDTO = z.infer<typeof awardCategoryItemSchema>;

export const awardCriteriaItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Tên tiêu chí không được để trống"),
  weightPercent: z.number().min(0).max(100).default(25),
  description: z.string().default(""),
  evidenceRequirements: z.array(z.string()).default([]),
});
export type AwardCriteriaItemDTO = z.infer<typeof awardCriteriaItemSchema>;

export const awardProcessStepItemSchema = z.object({
  step: z.number().int().default(1),
  title: z.string().min(1, "Tên bước xét chọn không được để trống"),
  timeframe: z.string().default(""),
  description: z.string().default(""),
  actionLabel: z.string().optional(),
});
export type AwardProcessStepItemDTO = z.infer<typeof awardProcessStepItemSchema>;

export const awardJudgeItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Họ tên giám khảo không được để trống"),
  title: z.string().default(""),
  organization: z.string().default(""),
  avatarUrl: z.string().default(""),
  role: z.enum([
    "Chủ tịch Hội đồng",
    "Phó Chủ tịch",
    "Thành viên Thường trực",
    "Chuyên gia Thẩm định",
  ]),
});
export type AwardJudgeItemDTO = z.infer<typeof awardJudgeItemSchema>;

// ==========================================
// 1. SECTION: AWARDS HERO BANNER
// ==========================================

export const awardsHeroPropsSchema = z.object({
  title: z.string().default("Giải Thưởng Kinh Tế Di Sản"),
  englishTitle: z.string().default("HERITAGE ECONOMY AWARDS"),
  slogan: z.string().default("Tôn vinh cống hiến, thúc đẩy sáng kiến & nhân rộng mô hình kinh tế di sản bền vững"),
  philosophy: z.string().default("Giải thưởng tôn vinh các tổ chức, doanh nghiệp, cộng đồng và cá nhân có sáng kiến xuất sắc."),
  nominationDeadline: z.string().default("15/10/2026"),
  rulesVersion: z.string().default("2026.1"),
});
export type AwardsHeroPropsDTO = z.infer<typeof awardsHeroPropsSchema>;

export const awardsHeroSectionSchema = z.object({
  id: z.string(),
  type: z.literal("AWARDS_HERO"),
  order: z.number().int().default(1),
  isVisible: z.boolean().default(true),
  props: awardsHeroPropsSchema,
});
export type AwardsHeroSectionDTO = z.infer<typeof awardsHeroSectionSchema>;

// ==========================================
// 2. SECTION: AWARDS CATEGORIES (08 HẠNG MỤC)
// ==========================================

export const awardsCategoriesPropsSchema = z.object({
  title: z.string().default("08 Hạng Mục Xét Chọn Tham Khảo"),
  subtitle: z.string().default("Cơ Cấu Giải Thưởng"),
  description: z.string().default("Bao quát toàn diện các khía cạnh từ sáng kiến khoa học, mô hình kinh doanh di sản, ứng dụng công nghệ đến đóng góp cộng đồng."),
  categories: z.array(awardCategoryItemSchema).default([]),
});
export type AwardsCategoriesPropsDTO = z.infer<typeof awardsCategoriesPropsSchema>;

export const awardsCategoriesSectionSchema = z.object({
  id: z.string(),
  type: z.literal("AWARDS_CATEGORIES"),
  order: z.number().int().default(2),
  isVisible: z.boolean().default(true),
  props: awardsCategoriesPropsSchema,
});
export type AwardsCategoriesSectionDTO = z.infer<typeof awardsCategoriesSectionSchema>;

// ==========================================
// 3. SECTION: AWARDS CRITERIA & RULES
// ==========================================

export const awardsCriteriaRulesPropsSchema = z.object({
  title: z.string().default("Khung Đánh Giá Định Lượng & Quy Chế"),
  subtitle: z.string().default("Bộ Tiêu Chí Khoa Học"),
  description: z.string().default("Mỗi hồ sơ được thẩm định độc lập theo thang điểm 100 với trọng số phân bổ rõ ràng."),
  rulesVersion: z.string().default("2026.1"),
  criteriaList: z.array(awardCriteriaItemSchema).default([]),
});
export type AwardsCriteriaRulesPropsDTO = z.infer<typeof awardsCriteriaRulesPropsSchema>;

export const awardsCriteriaRulesSectionSchema = z.object({
  id: z.string(),
  type: z.literal("AWARDS_CRITERIA"),
  order: z.number().int().default(3),
  isVisible: z.boolean().default(true),
  props: awardsCriteriaRulesPropsSchema,
});
export type AwardsCriteriaRulesSectionDTO = z.infer<typeof awardsCriteriaRulesSectionSchema>;

// ==========================================
// 4. SECTION: AWARDS PROCESS (07 BƯỚC)
// ==========================================

export const awardsProcessPropsSchema = z.object({
  title: z.string().default("Sơ Đồ 07 Bước Đánh Giá Minh Bạch"),
  subtitle: z.string().default("Quy Trình Xét Chọn"),
  description: z.string().default("Quy trình 07 bước từ nộp hồ sơ, sơ loại độc lập, thẩm định thực địa đến đêm vinh danh."),
  processSteps: z.array(awardProcessStepItemSchema).default([]),
});
export type AwardsProcessPropsDTO = z.infer<typeof awardsProcessPropsSchema>;

export const awardsProcessSectionSchema = z.object({
  id: z.string(),
  type: z.literal("AWARDS_PROCESS"),
  order: z.number().int().default(4),
  isVisible: z.boolean().default(true),
  props: awardsProcessPropsSchema,
});
export type AwardsProcessSectionDTO = z.infer<typeof awardsProcessSectionSchema>;

// ==========================================
// 5. SECTION: AWARDS COUNCIL (HỘI ĐỒNG GIÁM KHẢO)
// ==========================================

export const awardsCouncilPropsSchema = z.object({
  title: z.string().default("Hội Đồng Giám Khảo & Thẩm Định Độc Lập"),
  subtitle: z.string().default("Hội Đồng Chuyên Môn"),
  description: z.string().default("Quy tụ các nhà khoa học, chuyên gia bảo tồn và đại diện tổ chức quốc tế uy tín."),
  judges: z.array(awardJudgeItemSchema).default([]),
});
export type AwardsCouncilPropsDTO = z.infer<typeof awardsCouncilPropsSchema>;

export const awardsCouncilSectionSchema = z.object({
  id: z.string(),
  type: z.literal("AWARDS_COUNCIL"),
  order: z.number().int().default(5),
  isVisible: z.boolean().default(true),
  props: awardsCouncilPropsSchema,
});
export type AwardsCouncilSectionDTO = z.infer<typeof awardsCouncilSectionSchema>;

// ==========================================
// COMPOUND DISCRIMINATED UNION
// ==========================================

export const anyAwardsSectionSchema = z.discriminatedUnion("type", [
  awardsHeroSectionSchema,
  awardsCategoriesSectionSchema,
  awardsCriteriaRulesSectionSchema,
  awardsProcessSectionSchema,
  awardsCouncilSectionSchema,
]);
export type AnyAwardsSectionDTO = z.infer<typeof anyAwardsSectionSchema>;
