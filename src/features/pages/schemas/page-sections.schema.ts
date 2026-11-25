/**
 * LAYER 2: VALIDATION LAYER - COMPOUND PAGE SECTIONS SCHEMAS & DTOS
 * Gom toàn bộ các Section của 7 trang (Home, About, Awards, Forum, Contact, News, Heritage)
 * Ràng buộc chặt chẽ Request & Response cho toàn bộ hệ thống CMS
 */

import { z } from "zod";
import { createApiResponseSchema } from "@/types/api";

// 1. Home
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

// 2. About
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

// 3. Awards
import {
  awardsHeroSectionSchema,
  awardsHeroPropsSchema,
  awardsCategoriesSectionSchema,
  awardsCategoriesPropsSchema,
  awardsCriteriaRulesSectionSchema,
  awardsCriteriaRulesPropsSchema,
  awardsProcessSectionSchema,
  awardsProcessPropsSchema,
  awardsCouncilSectionSchema,
  awardsCouncilPropsSchema,
  anyAwardsSectionSchema,
  type AnyAwardsSectionDTO,
  type AwardsHeroPropsDTO,
  type AwardsCategoriesPropsDTO,
  type AwardsCriteriaRulesPropsDTO,
  type AwardsProcessPropsDTO,
  type AwardsCouncilPropsDTO,
} from "./sections/awards-sections.schema";

// 4. Forum
import {
  forumHeroSectionSchema,
  forumHeroPropsSchema,
  forumSessionsSectionSchema,
  forumSessionsPropsSchema,
  forumTimelineSectionSchema,
  forumTimelinePropsSchema,
  forumSpeakersSectionSchema,
  forumSpeakersPropsSchema,
  forumOutcomesSectionSchema,
  forumOutcomesPropsSchema,
  forumResourcesSectionSchema,
  forumResourcesPropsSchema,
  forumFaqSectionSchema,
  forumFaqPropsSchema,
  anyForumSectionSchema,
  type AnyForumSectionDTO,
  type ForumHeroPropsDTO,
  type ForumSessionsPropsDTO,
  type ForumTimelinePropsDTO,
  type ForumSpeakersPropsDTO,
  type ForumOutcomesPropsDTO,
  type ForumResourcesPropsDTO,
  type ForumFaqPropsDTO,
} from "./sections/forum-sections.schema";

// 5. Contact
import {
  contactBannerSectionSchema,
  contactBannerPropsSchema,
  contactInfoSectionSchema,
  contactInfoPropsSchema,
  contactFormSectionSchema,
  contactFormPropsSchema,
  anyContactSectionSchema,
  type AnyContactSectionDTO,
  type ContactBannerPropsDTO,
  type ContactInfoPropsDTO,
  type ContactFormPropsDTO,
} from "./sections/contact-sections.schema";

// 6. News
import {
  newsHeroSectionSchema,
  newsHeroPropsSchema,
  newsTopStorySectionSchema,
  newsTopStoryPropsSchema,
  newsGridSectionSchema,
  newsGridPropsSchema,
  anyNewsSectionSchema,
  type AnyNewsSectionDTO,
  type NewsHeroPropsDTO,
  type NewsTopStoryPropsDTO,
  type NewsGridPropsDTO,
} from "./sections/news-sections.schema";

// 7. Heritage / Projects
import {
  heritageHeroSectionSchema,
  heritageHeroPropsSchema,
  heritageGridSectionSchema,
  heritageGridPropsSchema,
  heritageProposalSectionSchema,
  heritageProposalPropsSchema,
  anyHeritageSectionSchema,
  type AnyHeritageSectionDTO,
  type HeritageHeroPropsDTO,
  type HeritageGridPropsDTO,
  type HeritageProposalPropsDTO,
} from "./sections/heritage-sections.schema";

// Re-export tất cả schemas và types con để dễ dàng import từ 1 nơi duy nhất
export * from "./sections/home-sections.schema";
export * from "./sections/about-sections.schema";
export * from "./sections/awards-sections.schema";
export * from "./sections/forum-sections.schema";
export * from "./sections/contact-sections.schema";
export * from "./sections/news-sections.schema";
export * from "./sections/heritage-sections.schema";

// ==========================================
// 1. GENERIC & CUSTOM SECTION SCHEMA
// ==========================================

export const genericCustomSectionSchema = z.object({
  id: z.string().min(1, "Mã định danh Section không được để trống"),
  type: z.string().min(1, "Loại Section không được để trống"),
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
  // Home Page (8 Sections)
  homeHeroSectionSchema,
  homeIntroPillarsSectionSchema,
  homeEventHighlightSectionSchema,
  homeAwardsShowcaseSectionSchema,
  homeFeaturedProjectsSectionSchema,
  homeNewsFeedSectionSchema,
  homePartnersSliderSectionSchema,
  homeConversionCtaSectionSchema,

  // About Page (5 Sections)
  aboutBannerSectionSchema,
  aboutVisionMissionSectionSchema,
  aboutCouncilSectionSchema,
  aboutExecutiveSectionSchema,
  aboutPartnersSectionSchema,

  // Awards Page (5 Sections)
  awardsHeroSectionSchema,
  awardsCategoriesSectionSchema,
  awardsCriteriaRulesSectionSchema,
  awardsProcessSectionSchema,
  awardsCouncilSectionSchema,

  // Forum Page (7 Sections)
  forumHeroSectionSchema,
  forumSessionsSectionSchema,
  forumTimelineSectionSchema,
  forumSpeakersSectionSchema,
  forumOutcomesSectionSchema,
  forumResourcesSectionSchema,
  forumFaqSectionSchema,

  // Contact Page (3 Sections)
  contactBannerSectionSchema,
  contactInfoSectionSchema,
  contactFormSectionSchema,

  // News Page (3 Sections)
  newsHeroSectionSchema,
  newsTopStorySectionSchema,
  newsGridSectionSchema,

  // Heritage / Projects Page (3 Sections)
  heritageHeroSectionSchema,
  heritageGridSectionSchema,
  heritageProposalSectionSchema,
]);

export type AnyPageSectionDTO = z.infer<typeof anyPageSectionSchema>;

// ==========================================
// 3. DANH SÁCH SECTION THEO TRANG (ARRAY SCHEMAS)
// ==========================================

export const homePageSectionsListSchema = z.array(anyHomeSectionSchema);
export type HomePageSectionsListDTO = z.infer<typeof homePageSectionsListSchema>;

export const aboutPageSectionsListSchema = z.array(anyAboutSectionSchema);
export type AboutPageSectionsListDTO = z.infer<typeof aboutPageSectionsListSchema>;

export const awardsPageSectionsListSchema = z.array(anyAwardsSectionSchema);
export type AwardsPageSectionsListDTO = z.infer<typeof awardsPageSectionsListSchema>;

export const forumPageSectionsListSchema = z.array(anyForumSectionSchema);
export type ForumPageSectionsListDTO = z.infer<typeof forumPageSectionsListSchema>;

export const contactPageSectionsListSchema = z.array(anyContactSectionSchema);
export type ContactPageSectionsListDTO = z.infer<typeof contactPageSectionsListSchema>;

export const newsPageSectionsListSchema = z.array(anyNewsSectionSchema);
export type NewsPageSectionsListDTO = z.infer<typeof newsPageSectionsListSchema>;

export const heritagePageSectionsListSchema = z.array(anyHeritageSectionSchema);
export type HeritagePageSectionsListDTO = z.infer<typeof heritagePageSectionsListSchema>;

export const pageSectionsListSchema = z.array(z.union([anyPageSectionSchema, genericCustomSectionSchema]));
export type PageSectionsListDTO = z.infer<typeof pageSectionsListSchema>;

// ==========================================
// 4. REQUEST SCHEMAS (RÀNG BUỘC REQUEST ĐẦU VÀO)
// ==========================================

export const updateHomePageSectionsRequestSchema = z.object({
  sections: homePageSectionsListSchema,
});

export const updateAboutPageSectionsRequestSchema = z.object({
  sections: aboutPageSectionsListSchema,
});

export const updateAwardsPageSectionsRequestSchema = z.object({
  sections: awardsPageSectionsListSchema,
});

export const updateForumPageSectionsRequestSchema = z.object({
  sections: forumPageSectionsListSchema,
});

export const updateContactPageSectionsRequestSchema = z.object({
  sections: contactPageSectionsListSchema,
});

export const updateNewsPageSectionsRequestSchema = z.object({
  sections: newsPageSectionsListSchema,
});

export const updateHeritagePageSectionsRequestSchema = z.object({
  sections: heritagePageSectionsListSchema,
});

export const updatePageSectionsRequestSchema = z.object({
  sections: pageSectionsListSchema,
});

export type UpdateHomePageSectionsRequestDTO = z.infer<typeof updateHomePageSectionsRequestSchema>;
export type UpdateAboutPageSectionsRequestDTO = z.infer<typeof updateAboutPageSectionsRequestSchema>;
export type UpdateAwardsPageSectionsRequestDTO = z.infer<typeof updateAwardsPageSectionsRequestSchema>;
export type UpdateForumPageSectionsRequestDTO = z.infer<typeof updateForumPageSectionsRequestSchema>;
export type UpdateContactPageSectionsRequestDTO = z.infer<typeof updateContactPageSectionsRequestSchema>;
export type UpdateNewsPageSectionsRequestDTO = z.infer<typeof updateNewsPageSectionsRequestSchema>;
export type UpdateHeritagePageSectionsRequestDTO = z.infer<typeof updateHeritagePageSectionsRequestSchema>;
export type UpdatePageSectionsRequestDTO = z.infer<typeof updatePageSectionsRequestSchema>;

// ==========================================
// 5. RESPONSE SCHEMAS (RÀNG BUỘC RESPONSE TRẢ VỀ)
// ==========================================

export const homeSectionsApiResponseSchema = createApiResponseSchema(homePageSectionsListSchema);
export const aboutSectionsApiResponseSchema = createApiResponseSchema(aboutPageSectionsListSchema);
export const awardsSectionsApiResponseSchema = createApiResponseSchema(awardsPageSectionsListSchema);
export const forumSectionsApiResponseSchema = createApiResponseSchema(forumPageSectionsListSchema);
export const contactSectionsApiResponseSchema = createApiResponseSchema(contactPageSectionsListSchema);
export const newsSectionsApiResponseSchema = createApiResponseSchema(newsPageSectionsListSchema);
export const heritageSectionsApiResponseSchema = createApiResponseSchema(heritagePageSectionsListSchema);
export const pageSectionsApiResponseSchema = createApiResponseSchema(pageSectionsListSchema);
