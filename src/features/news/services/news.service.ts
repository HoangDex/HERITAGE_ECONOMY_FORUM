/**
 * LAYER 4: SERVICE CHO MODULE TIN TỨC
 */

import { newsRepository } from "../repositories/news.repository";
import type { NewsCategorySlug, NewsItem, NewsPageData, INewsService } from "../types/news.types";

export class NewsService implements INewsService {
  async getNewsPageData(): Promise<NewsPageData> {
    return newsRepository.getNewsPageData();
  }

  async getArticle(slug: string): Promise<NewsItem | null> {
    return newsRepository.getArticleBySlug(slug);
  }

  async getRelatedArticles(currentSlug: string, category: NewsCategorySlug): Promise<NewsItem[]> {
    return newsRepository.getRelatedArticles(currentSlug, category);
  }
}

export const newsService = new NewsService();
