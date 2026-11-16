/**
 * LAYER 2: VALIDATION LAYER - COMPOUND PAGE SECTIONS SCHEMAS & DTOS
 * Gom toàn bộ các Section của Home & About thành Main Schema có phân biệt (Discriminated Union)
 * Ràng buộc chặt chẽ Request & Response cho cả 2 trang và toàn bộ hệ thống
 */

import { z } from "zod";
import { createApiResponseSchema } from "@/types/api";
import {
  homeHeroSectionSchema,
  homeHeroPropsSchema,
  homeIntroPillarsSectionSchema,
  homeIntroPillarsPropsSchema,
  pillarItemSchema,
  quickIntroSchema,
  homeEventHighlightSectionSchema,
  homeEventHighlightPropsSchema,
  eventSessionItemSchema,
  eventSpeakerItemSchema,
  homeAwardsShowcaseSectionSchema,
  homeAwardsShowcasePropsSchema,
  homeFeaturedProjectsSectionSchema,
  homeFeaturedProjectsPropsSchema,
  featuredProjectItemSchema,
  homeNewsFeedSectionSchema,
  homeNewsFeedPropsSchema,
  newsArticleItemSchema,
  homePartnersSliderSectionSchema,
  homePartnersSliderPropsSchema,
  homePartnerItemSchema,
  homeConversionCtaSectionSchema,
  homeConversionCtaPropsSchema,
  conversionCardSchema,
  anyHomeSectionSchema,
  type AnyHomeSectionDTO,
  type HomeHeroPropsDTO,
  type HomeIntroPillarsPropsDTO,
  type HomeEventHighlightPropsDTO,
  type HomeAwardsShowcasePropsDTO,
  type HomeFeaturedProjectsPropsDTO,
  type HomeNewsFeedPropsDTO,
  type HomePartnersSliderPropsDTO,
  type HomeConversionCtaPropsDTO,
} from "./sections/home-sections.schema";

import {
  personSchema,
  executiveDepartmentSchema,
  partnerOrganizationSchema,
  visionMissionSchema,
  aboutBannerSectionSchema,
  aboutBannerPropsSchema,
  aboutVisionMissionSectionSchema,
  aboutVisionMissionPropsSchema,
  aboutCouncilSectionSchema,
  aboutCouncilPropsSchema,
  aboutExecutiveSectionSchema,
  aboutExecutivePropsSchema,
  aboutPartnersSectionSchema,
  aboutPartnersPropsSchema,
  anyAboutSectionSchema,
  type AnyAboutSectionDTO,
  type PersonDTO,
  type ExecutiveDepartmentDTO,
  type PartnerOrganizationDTO,
  type VisionMissionDTO,
  type AboutBannerPropsDTO,
  type AboutVisionMissionPropsDTO,
  type AboutCouncilPropsDTO,
  type AboutExecutivePropsDTO,
  type AboutPartnersPropsDTO,
} from "./sections/about-sections.schema";

// Re-export tất cả schemas và types con để dễ dàng import từ 1 nơi duy nhất
export * from "./sections/home-sections.schema";
export * from "./sections/about-sections.schema";

// ==========================================
// 1. GENERIC & CUSTOM SECTION SCHEMA
// ==========================================

export const genericCustomSectionSchema = z.object({
  id: z.string().min(1, "Mã định danh Section không được để trống"),
  type: z.enum([
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
  ]),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  order: z.number().int().default(0),
  isVisible: z.boolean().default(true),
  props: z.record(z.string(), z.unknown()).default({}),
});

export type GenericCustomSectionDTO = z.infer<typeof genericCustomSectionSchema>;

// ==========================================
// 2. SCHEMA CHÍNH GOM TẤT CẢ SECTIONS (DISCRIMINATED UNION)
// ==========================================

export const anyPageSectionSchema = z.discriminatedUnion("type", [
  // 8 Sections của Home Page
  homeHeroSectionSchema,
  homeIntroPillarsSectionSchema,
  homeEventHighlightSectionSchema,
  homeAwardsShowcaseSectionSchema,
  homeFeaturedProjectsSectionSchema,
  homeNewsFeedSectionSchema,
  homePartnersSliderSectionSchema,
  homeConversionCtaSectionSchema,
  // 5 Sections của About Page
  aboutBannerSectionSchema,
  aboutVisionMissionSectionSchema,
  aboutCouncilSectionSchema,
  aboutExecutiveSectionSchema,
  aboutPartnersSectionSchema,
]);

export type AnyPageSectionDTO = z.infer<typeof anyPageSectionSchema>;

// ==========================================
// 3. DANH SÁCH SECTION THEO TRANG (ARRAY SCHEMAS)
// ==========================================

export const homePageSectionsListSchema = z.array(anyHomeSectionSchema);
export type HomePageSectionsListDTO = z.infer<typeof homePageSectionsListSchema>;

export const aboutPageSectionsListSchema = z.array(anyAboutSectionSchema);
export type AboutPageSectionsListDTO = z.infer<typeof aboutPageSectionsListSchema>;

export const pageSectionsListSchema = z.array(z.union([anyPageSectionSchema, genericCustomSectionSchema]));
export type PageSectionsListDTO = z.infer<typeof pageSectionsListSchema>;

// ==========================================
// 4. TOÀN BỘ DỮ LIỆU UI HOME PAGE (COMPOUND UI DATA SCHEMA)
// ==========================================

export const homePageDataSchema = z.object({
  hero: homeHeroPropsSchema,
  quickIntro: quickIntroSchema,
  pillars: z.array(pillarItemSchema),
  activeEvent: homeEventHighlightPropsSchema,
  award: homeAwardsShowcasePropsSchema,
  featuredProjects: z.array(featuredProjectItemSchema),
  featuredNews: z.array(newsArticleItemSchema),
  latestNews: z.array(newsArticleItemSchema),
  partners: z.array(homePartnerItemSchema),
  lastUpdated: z.string(),
});

export type HomePageDataDTO = z.infer<typeof homePageDataSchema>;

// ==========================================
// 5. TOÀN BỘ DỮ LIỆU UI ABOUT PAGE (COMPOUND UI DATA SCHEMA)
// ==========================================

export const aboutPageDataSchema = z.object({
  visionMission: visionMissionSchema,
  president: personSchema,
  vicePresidents: z.array(personSchema),
  councilMembers: z.array(personSchema),
  scientificAdvisors: z.array(personSchema),
  executiveHead: personSchema,
  executiveAdvisor: personSchema.optional(),
  executiveDeputies: z.array(personSchema),
  executiveDepartments: z.array(executiveDepartmentSchema),
  partners: z.array(partnerOrganizationSchema),
  lastUpdated: z.string(),
});

export type AboutPageDataDTO = z.infer<typeof aboutPageDataSchema>;

// ==========================================
// 6. REQUEST SCHEMAS (RÀNG BUỘC REQUEST ĐẦU VÀO)
// ==========================================

export const updateHomePageSectionsRequestSchema = z.object({
  sections: homePageSectionsListSchema,
});

export const updateAboutPageSectionsRequestSchema = z.object({
  sections: aboutPageSectionsListSchema,
});

export const updatePageSectionsRequestSchema = z.object({
  sections: pageSectionsListSchema,
});

export type UpdateHomePageSectionsRequestDTO = z.infer<typeof updateHomePageSectionsRequestSchema>;
export type UpdateAboutPageSectionsRequestDTO = z.infer<typeof updateAboutPageSectionsRequestSchema>;
export type UpdatePageSectionsRequestDTO = z.infer<typeof updatePageSectionsRequestSchema>;

// ==========================================
// 7. RESPONSE SCHEMAS (RÀNG BUỘC RESPONSE TRẢ VỀ)
// ==========================================

export const homePageApiResponseSchema = createApiResponseSchema(homePageDataSchema);
export const aboutPageApiResponseSchema = createApiResponseSchema(aboutPageDataSchema);
export const homeSectionsApiResponseSchema = createApiResponseSchema(homePageSectionsListSchema);
export const aboutSectionsApiResponseSchema = createApiResponseSchema(aboutPageSectionsListSchema);
export const pageSectionsApiResponseSchema = createApiResponseSchema(pageSectionsListSchema);
