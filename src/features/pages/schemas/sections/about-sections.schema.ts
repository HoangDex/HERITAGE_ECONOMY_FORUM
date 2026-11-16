/**
 * ZOD SCHEMAS & DTOS: CÁC SECTION CỦA TRANG GIỚI THIỆU (ABOUT PAGE SECTIONS)
 * Mỗi section được phân rã độc lập theo Mục 6: Giới thiệu - Đề án HEF
 */

import { z } from "zod";

// ==========================================
// SCHEMAS DÙNG CHUNG: PERSON & NHÂN SỰ
// ==========================================

export const personSchema = z.object({
  id: z.string(),
  fullName: z.string().min(1, "Họ tên không được để trống"),
  academicTitle: z.string(),
  councilRole: z
    .enum(["PRESIDENT", "VICE_PRESIDENT", "COUNCIL_MEMBER", "SCIENTIFIC_ADVISOR"])
    .optional(),
  executiveRole: z.enum(["HEAD", "ADVISOR", "DEPUTY_HEAD", "MEMBER"]).optional(),
  departmentCode: z
    .enum([
      "ACADEMIC",
      "OPERATIONS",
      "EXTERNAL_AFFAIRS",
      "COMMUNICATIONS",
      "PROJECTS",
      "SECRETARIAT",
    ])
    .optional(),
  positionTitle: z.string(),
  organization: z.string(),
  expertiseField: z.string(),
  avatarUrl: z.string().min(1, "Ảnh chân dung chuẩn 4:5"),
  altText: z.string().default("Hồ sơ nhân sự Diễn đàn Kinh tế Di sản"),
  bio: z.string(),
  papers: z.array(z.string()).default([]),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  isApproved: z.boolean().default(true),
  order: z.number().int().default(1),
  updatedAt: z.string(),
});

export type PersonDTO = z.infer<typeof personSchema>;

// ==========================================
// 1. SECTION: BANNER GIỚI THIỆU
// ==========================================

export const aboutBannerPropsSchema = z.object({
  title: z.string().default("VỀ DIỄN ĐÀN KINH TẾ DI SẢN"),
  englishTitle: z.string().default("VIETNAM HERITAGE ECONOMY FORUM (HEF)"),
  slogan: z.string().default("Di sản kiến tạo giá trị – Phát triển hướng tương lai"),
  description: z
    .string()
    .default(
      "Nền tảng đối thoại liên ngành, kết nối nguồn lực và bảo tồn thích ứng để di sản trở thành động lực phát triển kinh tế bền vững."
    ),
  bannerImageUrl: z.string().optional(),
  breadcrumb: z.string().optional(),
  lastUpdated: z.string().default("03/11/2026 15:00:00"),
});

export const aboutBannerSectionSchema = z.object({
  id: z.string().default("sec_about_banner"),
  type: z.literal("ABOUT_BANNER"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  order: z.number().int().default(1),
  isVisible: z.boolean().default(true),
  props: aboutBannerPropsSchema,
});

export type AboutBannerPropsDTO = z.infer<typeof aboutBannerPropsSchema>;
export type AboutBannerSectionDTO = z.infer<typeof aboutBannerSectionSchema>;

// ==========================================
// 2. SECTION: TẦM NHÌN – SỨ MỆNH – GIÁ TRỊ CỐT LÕI (MỤC 6.1)
// ==========================================

export const coreValueItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  iconName: z.string(),
});

export const aboutVisionMissionPropsSchema = z.object({
  aboutPlatform: z.string().min(1),
  vision: z.string().min(1),
  mission: z.string().min(1),
  coreValues: z.array(coreValueItemSchema).min(1),
});

export const aboutVisionMissionSectionSchema = z.object({
  id: z.string().default("sec_about_vision"),
  type: z.literal("ABOUT_VISION_MISSION"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  order: z.number().int().default(2),
  isVisible: z.boolean().default(true),
  props: aboutVisionMissionPropsSchema,
});

export const visionMissionSchema = aboutVisionMissionPropsSchema;
export type VisionMissionDTO = z.infer<typeof visionMissionSchema>;
export type AboutVisionMissionPropsDTO = z.infer<typeof aboutVisionMissionPropsSchema>;
export type AboutVisionMissionSectionDTO = z.infer<typeof aboutVisionMissionSectionSchema>;

// ==========================================
// 3. SECTION: HỘI ĐỒNG DIỄN ĐÀN (MỤC 6.2)
// ==========================================

export const aboutCouncilPropsSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  president: personSchema,
  vicePresidents: z.array(personSchema),
  councilMembers: z.array(personSchema),
  scientificAdvisors: z.array(personSchema),
});

export const aboutCouncilSectionSchema = z.object({
  id: z.string().default("sec_about_council"),
  type: z.literal("ABOUT_COUNCIL"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  order: z.number().int().default(3),
  isVisible: z.boolean().default(true),
  props: aboutCouncilPropsSchema,
});

export type AboutCouncilPropsDTO = z.infer<typeof aboutCouncilPropsSchema>;
export type AboutCouncilSectionDTO = z.infer<typeof aboutCouncilSectionSchema>;

// ==========================================
// 4. SECTION: BAN ĐIỀU HÀNH & CƠ CẤU CHUYÊN TRÁCH (MỤC 6.3)
// ==========================================

export const executiveDepartmentSchema = z.object({
  id: z.string(),
  code: z.enum([
    "ACADEMIC",
    "OPERATIONS",
    "EXTERNAL_AFFAIRS",
    "COMMUNICATIONS",
    "PROJECTS",
    "SECRETARIAT",
  ]),
  name: z.string(),
  mission: z.string(),
  contactEmail: z.string().email(),
  contactPhone: z.string(),
  members: z.array(personSchema),
});

export const aboutExecutivePropsSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  executiveHead: personSchema,
  executiveAdvisor: personSchema.optional(),
  executiveDeputies: z.array(personSchema),
  executiveDepartments: z.array(executiveDepartmentSchema),
});

export const aboutExecutiveSectionSchema = z.object({
  id: z.string().default("sec_about_executive"),
  type: z.literal("ABOUT_EXECUTIVE"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  order: z.number().int().default(4),
  isVisible: z.boolean().default(true),
  props: aboutExecutivePropsSchema,
});

export type ExecutiveDepartmentDTO = z.infer<typeof executiveDepartmentSchema>;
export type AboutExecutivePropsDTO = z.infer<typeof aboutExecutivePropsSchema>;
export type AboutExecutiveSectionDTO = z.infer<typeof aboutExecutiveSectionSchema>;

// ==========================================
// 5. SECTION: MẠNG LƯỚI ĐỐI TÁC ĐỒNG HÀNH (MỤC 6.4)
// ==========================================

export const partnerOrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string().optional(),
  logoUrl: z.string(),
  category: z.enum([
    "STEERING",
    "HOSTING",
    "ORGANIZING",
    "COMPANION",
    "STRATEGIC",
    "MEDIA",
  ]),
  roleDescription: z.string(),
  websiteUrl: z.string(),
  relatedEvents: z.array(z.string()).default([]),
  order: z.number(),
  isApproved: z.boolean().default(true),
  updatedAt: z.string(),
});

export const aboutPartnersPropsSchema = z.object({
  title: z.string().optional().default("Mạng Lưới Đối Tác Đồng Hành"),
  subtitle: z
    .string()
    .optional()
    .default("Các cơ quan chỉ đạo, cơ quan chủ trì, đơn vị thường trực và đối tác chiến lược"),
  partners: z.array(partnerOrganizationSchema),
});

export const aboutPartnersSectionSchema = z.object({
  id: z.string().default("sec_about_partners"),
  type: z.literal("ABOUT_PARTNERS"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  order: z.number().int().default(5),
  isVisible: z.boolean().default(true),
  props: aboutPartnersPropsSchema,
});

export type PartnerOrganizationDTO = z.infer<typeof partnerOrganizationSchema>;
export type AboutPartnersPropsDTO = z.infer<typeof aboutPartnersPropsSchema>;
export type AboutPartnersSectionDTO = z.infer<typeof aboutPartnersSectionSchema>;

// ==========================================
// TỔNG HỢP TOÀN BỘ CÁC SECTION TRANG ABOUT
// ==========================================

export const anyAboutSectionSchema = z.discriminatedUnion("type", [
  aboutBannerSectionSchema,
  aboutVisionMissionSectionSchema,
  aboutCouncilSectionSchema,
  aboutExecutiveSectionSchema,
  aboutPartnersSectionSchema,
]);

export type AnyAboutSectionDTO = z.infer<typeof anyAboutSectionSchema>;
