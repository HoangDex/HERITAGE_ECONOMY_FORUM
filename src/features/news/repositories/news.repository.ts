/**
 * LAYER 3: DATA ACCESS / REPOSITORY CHO MODULE TIN TỨC
 */

import type {
  NewsCategory,
  NewsItem,
  NewsPageData,
  NewsFilterCategoryGroup,
  NewsPaginationData,
  NewsHeroProps,
  INewsRepository,
  NewsCategorySlug,
} from "../types/news.types";
import { prisma } from "@/lib/prisma";
import { pageRepository } from "@/features/pages/repositories/page.repository";
import { masterDataRepository } from "@/features/pages/repositories/master-data.repository";
import { CATEGORIES, MOCK_NEWS_ARTICLES } from "../data/news-fallback.data";

export { CATEGORIES, MOCK_NEWS_ARTICLES };

const DEFAULT_HERO: NewsHeroProps = {
  badge: "Trung Tâm Tri Thức & Truyền Thông",
  title: "Tin Tức, Nghiên Cứu & Góc Nhìn Chuyên Gia",
  description:
    "Cập nhật hoạt động, nghiên cứu, quan điểm chuyên gia và những mô hình thực tiễn góp phần làm rõ vai trò của di sản trong phát triển kinh tế, văn hóa và xã hội.",
};

const DEFAULT_FILTER_CATEGORIES: NewsFilterCategoryGroup[] = [
  {
    title: "Hoạt động & Chính sách",
    ids: [1, 2],
  },
  {
    title: "Mô hình & Thực tiễn",
    ids: [3],
  },
];

export class NewsRepository implements INewsRepository {
  private extractNewsPageProps(rawProps: Record<string, unknown> | null | undefined): {
    hero: NewsHeroProps;
    featuredNewsId: string;
    filterCategories: NewsFilterCategoryGroup[];
  } {
    if (!rawProps || typeof rawProps !== "object") {
      return {
        hero: DEFAULT_HERO,
        featuredNewsId: "news_1",
        filterCategories: DEFAULT_FILTER_CATEGORIES,
      };
    }

    const rawHero = (rawProps.hero ?? rawProps.banner) as Record<string, unknown> | undefined;
    const hero: NewsHeroProps = {
      badge:
        typeof rawHero?.badge === "string" && rawHero.badge.trim()
          ? rawHero.badge
          : DEFAULT_HERO.badge,
      title:
        typeof rawHero?.title === "string" && rawHero.title.trim()
          ? rawHero.title
          : DEFAULT_HERO.title,
      description:
        typeof rawHero?.description === "string" && rawHero.description.trim()
          ? rawHero.description
          : DEFAULT_HERO.description,
    };

    const rawFeatured = rawProps.featured_news ?? rawProps.featured;
    let featuredNewsId = "news_1";
    if (typeof rawFeatured === "string" && rawFeatured.trim()) {
      featuredNewsId = rawFeatured.trim();
    } else if (rawFeatured && typeof rawFeatured === "object") {
      const fObj = rawFeatured as Record<string, unknown>;
      if (typeof fObj.id === "string" && fObj.id.trim()) {
        featuredNewsId = fObj.id.trim();
      } else if (Array.isArray(fObj.ids) && typeof fObj.ids[0] === "string") {
        featuredNewsId = fObj.ids[0];
      }
    }

    const rawFilter = rawProps.filter as Record<string, unknown> | undefined;
    const rawCatList = Array.isArray(rawFilter?.categories)
      ? rawFilter.categories
      : Array.isArray(rawFilter?.groups)
        ? rawFilter.groups
        : null;

    const filterCategories: NewsFilterCategoryGroup[] =
      rawCatList && rawCatList.length > 0
        ? rawCatList
            .map((item) => {
              const obj = (item ?? {}) as Record<string, unknown>;
              const title = typeof obj.title === "string" ? obj.title.trim() : "";
              const ids = Array.isArray(obj.ids)
                ? obj.ids
                    .map((id) => {
                      if (typeof id === "number") return id;
                      const parsed = Number(id);
                      if (!Number.isNaN(parsed) && parsed > 0) return parsed;
                      const match = String(id).match(/(\d+)/);
                      return match ? Number(match[1]) : NaN;
                    })
                    .filter((id): id is number => !Number.isNaN(id) && id > 0)
                : [];
              return { title, ids };
            })
            .filter((g) => g.title.length > 0 && g.ids.length > 0)
        : DEFAULT_FILTER_CATEGORIES;

    return { hero, featuredNewsId, filterCategories };
  }

  private resolveFeaturedArticle(allArticles: NewsItem[], featuredNewsId: string): NewsItem {
    const normalizedId = featuredNewsId.toLowerCase();
    const matched = allArticles.find(
      (a) =>
        a.id.toLowerCase() === normalizedId ||
        a.slug.toLowerCase() === normalizedId ||
        (normalizedId === "news_1" && (a.id === "news_feat_1" || a.id === "news-1"))
    );
    return matched || allArticles.find((a) => a.isFeatured) || allArticles[0];
  }

  async getPaginatedNews(params?: {
    page?: number;
    limit?: number;
    categoryIds?: Array<number | string>;
    category?: string;
    search?: string;
  }): Promise<NewsPaginationData> {
    const page = Math.max(1, params?.page || 1);
    const limit = Math.max(1, Math.min(100, params?.limit || 6));
    const categoryIds = (params?.categoryIds || [])
      .map((raw) => {
        if (typeof raw === "number") return raw;
        const direct = Number(raw);
        if (!Number.isNaN(direct) && direct > 0) return direct;
        const match = String(raw).match(/(\d+)/);
        return match ? Number(match[1]) : NaN;
      })
      .filter((n): n is number => !Number.isNaN(n) && n > 0);
    const category = params?.category?.trim();
    const search = params?.search?.trim().toLowerCase();

    const allArticles = await this.getAllArticles();

    const filtered = allArticles.filter((article) => {
      if (categoryIds.length > 0) {
        if (!categoryIds.includes(Number(article.categoryId))) {
          return false;
        }
      } else if (category && category !== "all" && category !== "Tất cả") {
        const matchSlug = article.category === category;
        const matchId = String(article.categoryId) === String(category);
        const matchName = article.categoryName
          .toLowerCase()
          .includes(category.toLowerCase());
        if (!matchSlug && !matchId && !matchName) return false;
      }

      if (search) {
        const inTitle = article.title.toLowerCase().includes(search);
        const inSapo = article.sapo.toLowerCase().includes(search);
        if (!inTitle && !inSapo) return false;
      }

      return true;
    });

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    const news = filtered.slice(start, start + limit);

    return {
      news,
      page,
      limit,
      total,
      totalPages,
    };
  }

  async getNewsPageData(): Promise<NewsPageData> {
    try {
      const pageEntity = await pageRepository.findBySlug("news").catch(() => null);
      const { hero, featuredNewsId, filterCategories } = this.extractNewsPageProps(
        pageEntity?.props as Record<string, unknown> | undefined
      );
      const allArticles = await this.getAllArticles();

      const featured = this.resolveFeaturedArticle(allArticles, featuredNewsId);
      const topSide = allArticles.filter((a) => a.slug !== featured.slug).slice(0, 4);
      const latest = allArticles.filter((a) => a.slug !== featured.slug);
      const newsPagination = await this.getPaginatedNews({ page: 1, limit: 6 });

      return {
        hero,
        featuredNewsId,
        featuredArticle: featured,
        topSideArticles: topSide,
        latestArticles: latest,
        categories: CATEGORIES,
        filterCategories,
        newsPagination,
      };
    } catch {
      const featured = MOCK_NEWS_ARTICLES.find((a) => a.isFeatured) || MOCK_NEWS_ARTICLES[0];
      const topSide = MOCK_NEWS_ARTICLES.filter((a) => a.slug !== featured.slug).slice(0, 4);
      const latest = MOCK_NEWS_ARTICLES.filter((a) => a.slug !== featured.slug);
      const total = MOCK_NEWS_ARTICLES.length;

      return {
        hero: DEFAULT_HERO,
        featuredNewsId: "news_1",
        featuredArticle: featured,
        topSideArticles: topSide,
        latestArticles: latest,
        categories: CATEGORIES,
        filterCategories: DEFAULT_FILTER_CATEGORIES,
        newsPagination: {
          news: MOCK_NEWS_ARTICLES.slice(0, 6),
          page: 1,
          limit: 6,
          total,
          totalPages: Math.max(1, Math.ceil(total / 6)),
        },
      };
    }
  }

  async getAllArticles(): Promise<NewsItem[]> {
    try {
      const dbNews = await prisma.news.findMany({
        include: {
          category: true,
          contentDetail: true,
        },
        orderBy: { publishedAt: "desc" },
      });

      if (dbNews.length > 0) {
        return dbNews.map((n) => {
          const mockMatch = MOCK_NEWS_ARTICLES.find(
            (m) => m.slug.toLowerCase() === n.slug.toLowerCase() || m.id === n.id
          );
          return {
            id: n.id,
            slug: n.slug,
            title: n.title,
            sapo: n.excerpt,
            content:
              n.contentDetail?.contentHtml ||
              mockMatch?.content ||
              `## ${n.title}\n\n${n.excerpt}`,
            contentJson:
              (n.contentDetail?.contentJson as Record<string, unknown> | undefined) ||
              mockMatch?.contentJson,
            coverImage:
              n.coverImageUrl ||
              mockMatch?.coverImage ||
              "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&h=630&q=80",
            categoryId: n.category?.id ?? n.categoryId,
            category: mockMatch?.category || "nghien-cuu-chinh-sach",
            categoryName: n.category?.name || "Chính Sách & Nghiên Cứu",
            author: {
              name: n.authorName || "Ban Biên Tập HEF",
              title: n.authorTitle || "Văn phòng Thường trực",
              organization: "Heritage Economy Forum",
            },
            publishedAt: (n.publishedAt || n.createdAt).toISOString(),
            readingMinutes: n.readingTimeMinutes || 5,
            tags: mockMatch?.tags || ["Tin tức", n.category?.name || "Diễn đàn"],
          };
        });
      }
    } catch {
      // Fallback sang in-memory nếu chưa kết nối MySQL
    }

    return MOCK_NEWS_ARTICLES;
  }

  async getArticleBySlug(slug: string): Promise<NewsItem | null> {
    if (!slug) return null;

    const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();
    const all = await this.getAllArticles();

    // 1. Tìm chính xác theo slug (case-insensitive) hoặc theo ID
    const found = all.find(
      (a) => a.slug.toLowerCase() === normalizedSlug || a.id.toLowerCase() === normalizedSlug
    );
    if (found) return found;

    // 2. Tìm kiếm dự phòng theo substring nếu slug có thể bị cắt hoặc khác dấu gạch nối
    const fuzzy = all.find(
      (a) =>
        a.slug.toLowerCase().includes(normalizedSlug) ||
        normalizedSlug.includes(a.slug.toLowerCase())
    );
    if (fuzzy) return fuzzy;

    // 3. Fallback tìm trực tiếp từ masterDataRepository
    try {
      const masterItem = await masterDataRepository.getNewsById(slug).catch(() => null);
      if (masterItem) {
        return {
          id: masterItem.id,
          slug: masterItem.slug,
          title: masterItem.title,
          sapo: masterItem.excerpt,
          content: `## ${masterItem.title}\n\n${masterItem.excerpt}\n\nNội dung đang được cập nhật.`,
          coverImage:
            masterItem.coverImageUrl ||
            "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&h=630&q=80",
          categoryId: masterItem.category?.id ?? 1,
          category: "hoat-dong",
          categoryName: masterItem.category?.name || masterItem.categoryName,
          author: {
            name: masterItem.authorName || "Ban Biên Tập HEF",
            title: masterItem.authorTitle || "Văn phòng Thường trực",
            organization: "Heritage Economy Forum",
          },
          publishedAt: masterItem.publishedAt || new Date().toISOString(),
          readingMinutes: masterItem.readingTimeMinutes || 5,
          tags: ["Tin tức", masterItem.category?.name || masterItem.categoryName],
        };
      }
    } catch {
      // Ignored
    }

    return null;
  }

  async getRelatedArticles(currentSlug: string, category: NewsCategorySlug): Promise<NewsItem[]> {
    const all = await this.getAllArticles();
    const cleanCurrent = decodeURIComponent(currentSlug).trim().toLowerCase();

    const sameCategory = all.filter(
      (a) => a.slug.toLowerCase() !== cleanCurrent && a.category === category
    );
    const otherArticles = all.filter(
      (a) => a.slug.toLowerCase() !== cleanCurrent && a.category !== category
    );

    // Luôn ưu tiên bài cùng chuyên mục, sau đó bù các bài khác để không bao giờ bị rỗng
    return [...sameCategory, ...otherArticles].slice(0, 6);
  }
}

export const newsRepository = new NewsRepository();
