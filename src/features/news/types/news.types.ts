/**
 * LAYER 1: TYPES & DOMAIN ENTITIES CHO MODULE TIN TỨC (NEWS)
 * Theo Đề án Mục 09. TIN TỨC – NEWS
 */

export type NewsCategorySlug =
  | "hoat-dong"
  | "goc-chuyen-gia"
  | "nghien-cuu-chinh-sach"
  | "kinh-te-di-san"
  | "dau-an-thanh-tuu"
  | "truyen-thong";

export interface NewsCategory {
  slug: NewsCategorySlug;
  name: string;
  description: string;
}

export interface NewsAuthor {
  name: string;
  title: string;
  avatarUrl?: string;
  organization?: string;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  sapo: string;
  content: string;
  category: NewsCategorySlug;
  categoryName: string;
  coverImage: string;
  author: NewsAuthor;
  publishedAt: string; // ISO 8601 GMT+7
  isFeatured?: boolean;
  readingMinutes: number;
  tags: string[];
}

export interface NewsPageData {
  featuredArticle: NewsItem;
  topSideArticles: NewsItem[];
  latestArticles: NewsItem[];
  categories: NewsCategory[];
}

export interface INewsRepository {
  getNewsPageData(): Promise<NewsPageData>;
  getArticleBySlug(slug: string): Promise<NewsItem | null>;
  getRelatedArticles(currentSlug: string, category: NewsCategorySlug): Promise<NewsItem[]>;
}

export interface INewsService {
  getNewsPageData(): Promise<NewsPageData>;
  getArticle(slug: string): Promise<NewsItem | null>;
  getRelatedArticles(currentSlug: string, category: NewsCategorySlug): Promise<NewsItem[]>;
}
