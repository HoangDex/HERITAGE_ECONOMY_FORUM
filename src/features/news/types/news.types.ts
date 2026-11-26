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
  content: string; // Nội dung bài báo HTML
  contentJson?: Record<string, unknown> | Array<unknown>; // Cấu trúc khối CKEditor JSON
  categoryId: number;
  category: NewsCategorySlug;
  categoryName: string;
  coverImage: string;
  imageCaption?: string;
  author: NewsAuthor;
  source?: string;
  publishedAt: string; // ISO 8601 GMT+7
  isFeatured?: boolean;
  readingMinutes: number;
  tags: string[];
}

export interface NewsFilterCategoryGroup {
  title: string;
  ids: number[];
}

export interface NewsPaginationData {
  news: NewsItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface NewsHeroProps {
  badge?: string;
  title: string;
  description: string;
}

export interface NewsPageData {
  hero?: NewsHeroProps;
  featuredNewsId?: string;
  featuredArticle: NewsItem;
  topSideArticles: NewsItem[];
  latestArticles: NewsItem[];
  categories: NewsCategory[];
  filterCategories?: NewsFilterCategoryGroup[];
  newsPagination?: NewsPaginationData;
}

export interface INewsRepository {
  getNewsPageData(): Promise<NewsPageData>;
  getArticleBySlug(slug: string): Promise<NewsItem | null>;
  getRelatedArticles(currentSlug: string, category: NewsCategorySlug): Promise<NewsItem[]>;
  getAllArticles(): Promise<NewsItem[]>;
}

export interface INewsService {
  getNewsPageData(): Promise<NewsPageData>;
  getArticle(slug: string): Promise<NewsItem | null>;
  getRelatedArticles(currentSlug: string, category: NewsCategorySlug): Promise<NewsItem[]>;
  getAllArticles(): Promise<NewsItem[]>;
}
