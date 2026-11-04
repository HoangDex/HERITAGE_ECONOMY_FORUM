/**
 * LAYER 1: DOMAIN TYPES & ENTITIES CHO MODULE TRANG CHỦ (HOME PAGE)
 * Định vị điểm vào chính, kỳ diễn đàn đang diễn ra và ba tuyến chuyển đổi: tham dự, đề cử, hợp tác
 */

export interface HomeHero {
  title: string;
  vietnameseTitle: string;
  slogan: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  imageUrl: string;
  imageAlt: string;
  badgeText: string;
}

export interface QuickIntro {
  content: string;
  subContent: string;
}

export interface Pillar {
  id: string;
  orderNumber: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface EventSession {
  id: string;
  time: string;
  title: string;
  chairperson?: string;
}

export interface EventHighlight {
  id: string;
  edition: string; // "Kỳ Diễn đàn 2026"
  statusBadge: string; // "ĐANG MỞ ĐĂNG KÝ"
  title: string;
  theme: string;
  dates: string; // "15 – 17 tháng 11 năm 2026"
  location: string; // "Trung tâm Hội nghị Quốc tế & Hoàng thành Thăng Long, Hà Nội"
  description: string;
  bannerUrl: string;
  sessions: EventSession[];
  attendeesExpected: number;
  registrationDeadline: string;
  registrationUrl: string;
}

export interface AwardShowcase {
  badge: string;
  awardName: string;
  subtitle: string;
  description: string;
  criteria: string[];
  nominationDeadline: string;
  regulationsUrl: string;
  nominationUrl: string;
  bannerUrl: string;
}

export interface FeaturedProject {
  id: string;
  name: string;
  slug: string;
  location: string;
  category: string;
  description: string;
  thumbnailUrl: string;
  annualRevenue: string;
  jobsCreated: number;
  conservationShare: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  author: string;
  summary: string;
  thumbnailUrl: string;
  isFeatured?: boolean;
}

export interface HomePartner {
  id: string;
  name: string;
  category: "STEERING" | "HOSTING" | "ORGANIZING" | "COMPANION" | "STRATEGIC" | "MEDIA";
  categoryLabel: string;
  logoUrl: string;
  websiteUrl: string;
  order: number;
}

export interface HomePageData {
  hero: HomeHero;
  quickIntro: QuickIntro;
  pillars: Pillar[];
  activeEvent: EventHighlight;
  award: AwardShowcase;
  featuredProjects: FeaturedProject[];
  featuredNews: NewsArticle[];
  latestNews: NewsArticle[];
  partners: HomePartner[];
  lastUpdated: string;
}

export interface IHomeRepository {
  getHomePageData(): Promise<HomePageData>;
  getActiveEvent(): Promise<EventHighlight>;
  getFeaturedProjects(): Promise<FeaturedProject[]>;
  getNewsFeed(): Promise<{ featured: NewsArticle; latest: NewsArticle[] }>;
}

export interface IHomeService {
  getHomePageData(): Promise<HomePageData>;
  subscribeNewsletter(
    email: string,
    fullName?: string
  ): Promise<{ success: boolean; message: string }>;
}
