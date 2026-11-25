/**
 * LAYER 3: DATA ACCESS / REPOSITORY CHO MODULE TIN TỨC
 */

import type {
  NewsCategory,
  NewsItem,
  NewsPageData,
  INewsRepository,
  NewsCategorySlug,
} from "../types/news.types";
import { pageRepository } from "@/features/pages/repositories/page.repository";
import { masterDataRepository } from "@/features/pages/repositories/master-data.repository";
import { CATEGORIES, MOCK_NEWS_ARTICLES } from "../data/news-fallback.data";

export { CATEGORIES, MOCK_NEWS_ARTICLES };

export class NewsRepository implements INewsRepository {
  async getNewsPageData(): Promise<NewsPageData> {
    try {
      await pageRepository.findBySlug("news").catch(() => null);
      const allArticles = await this.getAllArticles();

      const featured = allArticles.find((a) => a.isFeatured) || allArticles[0];
      const topSide = allArticles.filter((a) => a.slug !== featured.slug).slice(0, 4);
      const latest = allArticles.filter((a) => a.slug !== featured.slug);

      return {
        featuredArticle: featured,
        topSideArticles: topSide,
        latestArticles: latest,
        categories: CATEGORIES,
      };
    } catch {
      const featured = MOCK_NEWS_ARTICLES.find((a) => a.isFeatured) || MOCK_NEWS_ARTICLES[0];
      const topSide = MOCK_NEWS_ARTICLES.filter((a) => a.slug !== featured.slug).slice(0, 4);
      const latest = MOCK_NEWS_ARTICLES.filter((a) => a.slug !== featured.slug);

      return {
        featuredArticle: featured,
        topSideArticles: topSide,
        latestArticles: latest,
        categories: CATEGORIES,
      };
    }
  }

  async getAllArticles(): Promise<NewsItem[]> {
    try {
      const masterNews = await masterDataRepository.getNews().catch(() => []);

      // Bắt đầu bằng Map các bài viết chuẩn từ Fallback data
      const articlesMap = new Map<string, NewsItem>();

      for (const item of MOCK_NEWS_ARTICLES) {
        articlesMap.set(item.slug.toLowerCase(), item);
      }

      // Đồng bộ / bổ sung dữ liệu từ Master Data
      if (masterNews && masterNews.length > 0) {
        for (const [idx, mn] of masterNews.entries()) {
          const key = mn.slug.toLowerCase();
          const existing = articlesMap.get(key);

          if (existing) {
            // Giữ lại nội dung rich markdown chuyên sâu và cập nhật các trường mới
            articlesMap.set(key, {
              ...existing,
              id: mn.id || existing.id,
              title: mn.title || existing.title,
              sapo: mn.excerpt || existing.sapo,
              categoryName: mn.categoryName || existing.categoryName,
              isFeatured: mn.isFeatured !== undefined ? mn.isFeatured : existing.isFeatured,
              publishedAt: mn.publishedAt || existing.publishedAt,
            });
          } else {
            // Bài viết mới thêm từ Master Data
            const fallbackCategory: NewsCategorySlug =
              idx % 2 === 0 ? "hoat-dong" : "nghien-cuu-chinh-sach";
            articlesMap.set(key, {
              id: mn.id,
              slug: mn.slug,
              title: mn.title,
              sapo: mn.excerpt,
              content: `## ${mn.title}\n\n${mn.excerpt}\n\nNội dung chi tiết đang được Ban Thư ký phê duyệt và cập nhật chính thức.`,
              coverImage:
                "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&h=630&q=80",
              imageCaption: mn.title,
              category: fallbackCategory,
              categoryName: mn.categoryName || "Tin tức & Nghiên cứu",
              isFeatured: mn.isFeatured,
              author: {
                name: mn.authorName || "Ban Biên Tập HEF",
                title: mn.authorTitle || "Văn phòng Thường trực",
                organization: "Heritage Economy Forum",
              },
              publishedAt: mn.publishedAt || new Date().toISOString(),
              readingMinutes: 4,
              tags: ["Tin tức", mn.categoryName || "Diễn đàn"],
            });
          }
        }
      }

      return Array.from(articlesMap.values());
    } catch {
      return MOCK_NEWS_ARTICLES;
    }
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
            "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&h=630&q=80",
          category: "hoat-dong",
          categoryName: masterItem.categoryName,
          isFeatured: masterItem.isFeatured,
          author: {
            name: masterItem.authorName || "Ban Biên Tập HEF",
            title: masterItem.authorTitle || "Văn phòng Thường trực",
            organization: "Heritage Economy Forum",
          },
          publishedAt: masterItem.publishedAt || new Date().toISOString(),
          readingMinutes: 4,
          tags: ["Tin tức", masterItem.categoryName],
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
