/**
 * BARREL EXPORT CHO MODULE NEWS (TIN TỨC & NGHIÊN CỨU)
 * Tuân thủ Clean Architecture: Chỉ công khai Service, Types và Presentation Components
 * Ranh giới nội bộ Data Access được bảo vệ khép kín
 */

// Layer 1: Types & Entities
export type {
  NewsCategorySlug,
  NewsCategory,
  NewsAuthor,
  NewsItem,
  NewsPageData,
  INewsService,
} from "./types/news.types";

// Layer 4: Service
export { newsService } from "./services/news.service";

// Layer 6B: Presentation Components
export { NewsTopStory } from "./components/news-top-story";
export { NewsArticleCard } from "./components/news-article-card";
export { NewsPageView } from "./components/news-page-view";
export { NewsDetailView } from "./components/news-detail-view";
