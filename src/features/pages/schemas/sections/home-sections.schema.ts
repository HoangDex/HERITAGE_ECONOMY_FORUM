/**
 * ZOD SCHEMAS & DTOS: CÁC SECTION CỦA TRANG CHỦ (HOME PAGE SECTIONS)
 * Mỗi section được tách nhỏ độc lập, chặt chẽ để ràng buộc Request & Response
 */

import { z } from "zod";

// ==========================================
// 1. SECTION: HERO TRANG CHỦ
// ==========================================

export const homeHeroMetricSchema = z.object({
  value: z.number(),
  suffix: z.string().optional(),
  prefix: z.string().optional(),
  label: z.string(),
});

export const homeHeroPropsSchema = z.object({
  title: z.string().min(1, "Tiêu đề tiếng Anh không được rỗng"),
  vietnameseTitle: z.string().min(1, "Tiêu đề tiếng Việt không được rỗng"),
  slogan: z.string().min(1, "Khẩu hiệu không được rỗng"),
  description: z.string().min(1, "Mô tả không được rỗng"),
  primaryCta: z.object({
    label: z.string().min(1, "Nhãn nút chính không được rỗng"),
    href: z.string().min(1, "Liên kết nút chính không được rỗng"),
  }),
  secondaryCta: z.object({
    label: z.string().min(1, "Nhãn nút phụ không được rỗng"),
    href: z.string().min(1, "Liên kết nút phụ không được rỗng"),
  }),
  imageUrl: z.string().min(1, "Đường dẫn ảnh bìa không được rỗng"),
  imageAlt: z.string().default("Diễn đàn Kinh tế Di sản Việt Nam"),
  badgeText: z.string().default("NỀN TẢNG ĐỐI THOẠI & KẾT NỐI QUỐC GIA"),
  videoUrl: z.string().optional(),
  videoTitle: z.string().optional(),
  locationBadge: z.string().optional(),
  editionBadge: z.string().optional(),
  metrics: z.array(homeHeroMetricSchema).optional(),
});

export const homeHeroSectionSchema = z.object({
  id: z.string().default("sec_home_hero"),
  type: z.literal("HOME_HERO"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  order: z.number().int().default(1),
  isVisible: z.boolean().default(true),
  props: homeHeroPropsSchema,
});

export type HomeHeroPropsDTO = z.infer<typeof homeHeroPropsSchema>;
export type HomeHeroSectionDTO = z.infer<typeof homeHeroSectionSchema>;

// ==========================================
// 2. SECTION: 05 TRỤ CỘT & GIỚI THIỆU NHANH
// ==========================================

export const pillarItemSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  iconName: z.string(),
});

export const quickIntroSchema = z.object({
  content: z.string(),
  subContent: z.string(),
});

export const homeIntroPillarsPropsSchema = z.object({
  quickIntro: quickIntroSchema,
  pillars: z.array(pillarItemSchema).min(1, "Cần tối thiểu 1 trụ cột"),
});

export const homeIntroPillarsSectionSchema = z.object({
  id: z.string().default("sec_home_pillars"),
  type: z.literal("HOME_INTRO_PILLARS"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  order: z.number().int().default(2),
  isVisible: z.boolean().default(true),
  props: homeIntroPillarsPropsSchema,
});

export type HomeIntroPillarsPropsDTO = z.infer<typeof homeIntroPillarsPropsSchema>;
export type HomeIntroPillarsSectionDTO = z.infer<typeof homeIntroPillarsSectionSchema>;

// ==========================================
// 3. SECTION: KỲ DIỄN ĐÀN NỔI BẬT (EVENT HIGHLIGHT)
// ==========================================

export const eventSpeakerSchema = z.object({
  id: z.string(),
  name: z.string(),
  degree: z.string().optional(),
  title: z.string(),
  organization: z.string(),
  avatarUrl: z.string(),
  bio: z.string().optional(),
  sessionTitle: z.string().optional(),
  topicSummary: z.string().optional(),
  slug: z.string().optional(),
});

export const eventSessionSchema = z.object({
  id: z.string(),
  order: z.number().optional(),
  time: z.string(),
  date: z.string().optional(),
  title: z.string(),
  subTitle: z.string().optional(),
  description: z.string().optional(),
  room: z.string().optional(),
  chairperson: z.string().optional(),
  imageUrl: z.string().optional(),
  speakers: z.array(eventSpeakerSchema).optional(),
});

export const eventSpeakerItemSchema = eventSpeakerSchema;
export const eventSessionItemSchema = eventSessionSchema;

export const homeEventHighlightPropsSchema = z.object({
  id: z.string().default("event_hef_2026"),
  edition: z.string(),
  statusBadge: z.string(),
  title: z.string(),
  theme: z.string(),
  dates: z.string(),
  location: z.string(),
  description: z.string(),
  bannerUrl: z.string(),
  sessions: z.array(eventSessionSchema),
  attendeesExpected: z.number().default(800),
  registrationDeadline: z.string(),
  registrationUrl: z.string(),
});

export const homeEventHighlightSectionSchema = z.object({
  id: z.string().default("sec_home_event"),
  type: z.literal("HOME_EVENT_HIGHLIGHT"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  order: z.number().int().default(3),
  isVisible: z.boolean().default(true),
  props: homeEventHighlightPropsSchema,
});

export type HomeEventHighlightPropsDTO = z.infer<typeof homeEventHighlightPropsSchema>;
export type HomeEventHighlightSectionDTO = z.infer<typeof homeEventHighlightSectionSchema>;

// ==========================================
// 4. SECTION: GIẢI THƯỞNG PHÁT TRIỂN BỀN VỮNG
// ==========================================

export const homeAwardsShowcasePropsSchema = z.object({
  badge: z.string(),
  awardName: z.string(),
  subtitle: z.string(),
  description: z.string(),
  criteria: z.array(z.string()),
  nominationDeadline: z.string(),
  regulationsUrl: z.string(),
  nominationUrl: z.string(),
  bannerUrl: z.string(),
});

export const homeAwardsShowcaseSectionSchema = z.object({
  id: z.string().default("sec_home_awards"),
  type: z.literal("HOME_AWARDS_SHOWCASE"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  order: z.number().int().default(4),
  isVisible: z.boolean().default(true),
  props: homeAwardsShowcasePropsSchema,
});

export type HomeAwardsShowcasePropsDTO = z.infer<typeof homeAwardsShowcasePropsSchema>;
export type HomeAwardsShowcaseSectionDTO = z.infer<typeof homeAwardsShowcaseSectionSchema>;

// ==========================================
// 5. SECTION: MÔ HÌNH DỰ ÁN DI SẢN TIÊU BIỂU
// ==========================================

export const featuredProjectItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  location: z.string(),
  category: z.string(),
  description: z.string(),
  thumbnailUrl: z.string(),
  annualRevenue: z.string(),
  jobsCreated: z.number(),
  conservationShare: z.string(),
});

export const homeFeaturedProjectsPropsSchema = z.object({
  title: z.string().optional().default("Mô Hình Kinh Tế Di Sản Tiêu Biểu"),
  subtitle: z.string().optional().default("Các mô hình thực tiễn hài hòa giữa bảo tồn và sinh kế"),
  projects: z.array(featuredProjectItemSchema).default([]),
  featuredProjects: z.array(featuredProjectItemSchema).optional(),
  viewAllLink: z.string().default("/projects"),
});

export const homeFeaturedProjectsSectionSchema = z.object({
  id: z.string().default("sec_home_projects"),
  type: z.literal("HOME_FEATURED_PROJECTS"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  order: z.number().int().default(5),
  isVisible: z.boolean().default(true),
  props: homeFeaturedProjectsPropsSchema,
});

export type HomeFeaturedProjectsPropsDTO = z.infer<typeof homeFeaturedProjectsPropsSchema>;
export type HomeFeaturedProjectsSectionDTO = z.infer<typeof homeFeaturedProjectsSectionSchema>;

// ==========================================
// 6. SECTION: BÀI BÁO & TIN TỨC NỔI BẬT
// ==========================================

export const newsFeedItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  category: z.string(),
  publishedAt: z.string(),
  author: z.string(),
  summary: z.string(),
  thumbnailUrl: z.string(),
  isFeatured: z.boolean().optional(),
});

export const newsArticleItemSchema = newsFeedItemSchema;

export const homeNewsFeedPropsSchema = z.object({
  title: z.string().optional().default("Tin Tức & Góc Chuyên Gia"),
  subtitle: z.string().optional().default("Thông tin hoạt động, nghiên cứu và quan điểm chính sách"),
  featuredNews: newsFeedItemSchema,
  latestNews: z.array(newsFeedItemSchema),
  viewAllLink: z.string().default("/news"),
});

export const homeNewsFeedSectionSchema = z.object({
  id: z.string().default("sec_home_news"),
  type: z.literal("HOME_NEWS_FEED"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  order: z.number().int().default(6),
  isVisible: z.boolean().default(true),
  props: homeNewsFeedPropsSchema,
});

export type HomeNewsFeedPropsDTO = z.infer<typeof homeNewsFeedPropsSchema>;
export type HomeNewsFeedSectionDTO = z.infer<typeof homeNewsFeedSectionSchema>;

// ==========================================
// 7. SECTION: ĐỐI TÁC ĐỒNG HÀNH
// ==========================================

export const homePartnerItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string().optional(),
  category: z.enum([
    "STEERING",
    "HOSTING",
    "ORGANIZING",
    "COMPANION",
    "STRATEGIC",
    "MEDIA",
  ]),
  categoryLabel: z.string(),
  logoUrl: z.string(),
  websiteUrl: z.string(),
  order: z.number(),
});

export const homePartnersSliderPropsSchema = z.object({
  title: z.string().optional().default("Mạng Lưới Đối Tác Đồng Hành"),
  subtitle: z
    .string()
    .optional()
    .default("Các cơ quan chỉ đạo, đơn vị chủ trì, thường trực tổ chức và đối tác chiến lược"),
  partners: z.array(homePartnerItemSchema),
});

export const homePartnersSliderSectionSchema = z.object({
  id: z.string().default("sec_home_partners"),
  type: z.literal("HOME_PARTNERS_SLIDER"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  order: z.number().int().default(7),
  isVisible: z.boolean().default(true),
  props: homePartnersSliderPropsSchema,
});

export type HomePartnersSliderPropsDTO = z.infer<typeof homePartnersSliderPropsSchema>;
export type HomePartnersSliderSectionDTO = z.infer<typeof homePartnersSliderSectionSchema>;

// ==========================================
// 8. SECTION: 3 TUYẾN CHUYỂN ĐỔI (CONVERSION CTA)
// ==========================================

export const conversionCardSchema = z.object({
  title: z.string(),
  description: z.string(),
  ctaText: z.string(),
  ctaLink: z.string(),
  iconName: z.string().optional(),
});

export const homeConversionCtaPropsSchema = z.object({
  title: z.string().default("Cùng Kiến Tạo Giá Trị Di Sản Bền Vững"),
  subtitle: z
    .string()
    .default(
      "Đồng hành cùng Diễn đàn trong các hoạt động nghiên cứu, đề cử giải thưởng và hợp tác dự án"
    ),
  cards: z.array(conversionCardSchema).default([
    {
      title: "Đăng ký tham dự",
      description: "Tham dự các phiên nghị sự, đối thoại chính sách và kết nối chuyên gia.",
      ctaText: "Đăng ký ngay",
      ctaLink: "/contact?loai=tham-du#contact-form",
    },
    {
      title: "Đề cử giải thưởng",
      description: "Gửi hồ sơ tham gia Giải thưởng Phát triển Bền vững Chủ động 2026.",
      ctaText: "Nộp hồ sơ đề cử",
      ctaLink: "/contact?loai=giai-thuong#contact-form",
    },
    {
      title: "Hợp tác chiến lược",
      description: "Kết nối tài trợ, đồng hành học thuật và bảo trợ truyền thông.",
      ctaText: "Liên hệ hợp tác",
      ctaLink: "/contact?loai=hop-tac#contact-form",
    },
  ]),
});

export const homeConversionCtaSectionSchema = z.object({
  id: z.string().default("sec_home_cta"),
  type: z.literal("HOME_CONVERSION_CTA"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  order: z.number().int().default(8),
  isVisible: z.boolean().default(true),
  props: homeConversionCtaPropsSchema,
});

export type HomeConversionCtaPropsDTO = z.infer<typeof homeConversionCtaPropsSchema>;
export type HomeConversionCtaSectionDTO = z.infer<typeof homeConversionCtaSectionSchema>;

// ==========================================
// TỔNG HỢP TOÀN BỘ CÁC SECTION TRANG CHỦ
// ==========================================

export const anyHomeSectionSchema = z.discriminatedUnion("type", [
  homeHeroSectionSchema,
  homeIntroPillarsSectionSchema,
  homeEventHighlightSectionSchema,
  homeAwardsShowcaseSectionSchema,
  homeFeaturedProjectsSectionSchema,
  homeNewsFeedSectionSchema,
  homePartnersSliderSectionSchema,
  homeConversionCtaSectionSchema,
]);

export type AnyHomeSectionDTO = z.infer<typeof anyHomeSectionSchema>;
