/**
 * BARREL EXPORT CHO MODULE HOME (TRANG CHỦ)
 * Tuân thủ Clean Architecture: Chỉ công khai Service, Actions, Types, Hooks và Presentation Components
 * Ranh giới nội bộ Data Access được bảo vệ khép kín
 */

// Layer 1: Types & Entities
export type {
  HomeHero as HomeHeroData,
  QuickIntro,
  Pillar,
  EventSession,
  EventHighlight,
  AwardShowcase,
  FeaturedProject,
  NewsArticle,
  HomePartner,
  HomePageData,
  IHomeService,
} from "./types/home.types";

// Layer 2: Schemas
export { newsletterSubscriptionSchema, eventRegistrationQuerySchema } from "./schemas/home.schema";
export type {
  NewsletterSubscriptionInput,
  EventRegistrationQueryInput,
} from "./schemas/home.schema";

// Layer 4: Service
export { homeService } from "./services/home.service";

// Layer 5A: Server Actions
export { getHomePageDataAction, subscribeNewsletterAction } from "./actions/home.actions";

// Layer 6A: React Client Hook
export { useHome } from "./hooks/use-home";

// Layer 6B: Presentation Components
export { HomeHero } from "./components/home-hero";
export { IntroPillarsSection } from "./components/intro-pillars-section";
export { EventHighlightSection } from "./components/event-highlight-section";
export { AwardsShowcaseSection } from "./components/awards-showcase-section";
export { FeaturedProjectsSection } from "./components/featured-projects-section";
export { NewsFeedSection } from "./components/news-feed-section";
export { PartnersSliderSection } from "./components/partners-slider-section";
export { ConversionCtaSection } from "./components/conversion-cta-section";
export { HomePageView } from "./components/home-page-view";
