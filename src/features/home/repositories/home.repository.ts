/**
 * LAYER 3: DATA ACCESS / REPOSITORY CHO MODULE HOME
 * Cung cấp dữ liệu chuẩn hóa cho Trang chủ: Hero, 5 Trụ cột, Sự kiện, Giải thưởng, Dự án, Tin tức, Đối tác
 * Tuân thủ Clean Architecture: Tách biệt dữ liệu fallback sang data/home-fallback.data.ts
 */

import type {
  IHomeRepository,
  HomePageData,
  EventHighlight,
  FeaturedProject,
  NewsArticle,
} from "../types/home.types";
import { pageRepository } from "@/features/pages/repositories/page.repository";
import { fallbackHomePageData } from "../data/home-fallback.data";

export class HomeRepository implements IHomeRepository {
  async getHomePageData(): Promise<HomePageData> {
    try {
      const page = await pageRepository.findBySlug("home");
      if (page && page.sections && page.sections.length > 0) {
        // Tìm các Section theo type
        const heroSec = page.sections.find((s) => s.type === "HOME_HERO" || s.type === "HERO");
        const pillarsSec = page.sections.find(
          (s) => s.type === "HOME_INTRO_PILLARS" || s.type === "PILLARS_5"
        );
        const eventSec = page.sections.find(
          (s) => s.type === "HOME_EVENT_HIGHLIGHT" || s.type === "EVENT_HIGHLIGHT"
        );
        const awardsSec = page.sections.find(
          (s) => s.type === "HOME_AWARDS_SHOWCASE" || s.type === "AWARDS_SHOWCASE"
        );
        const projectsSec = page.sections.find(
          (s) => s.type === "HOME_FEATURED_PROJECTS" || s.type === "PROJECT_GRID"
        );
        const newsSec = page.sections.find(
          (s) => s.type === "HOME_NEWS_FEED" || s.type === "NEWS_FEED"
        );
        const partnersSec = page.sections.find(
          (s) => s.type === "HOME_PARTNERS_SLIDER" || s.type === "PARTNERS_SLIDER"
        );
        const ctaSec = page.sections.find(
          (s) => s.type === "HOME_CONVERSION_CTA" || s.type === "CTA_BANNER"
        );

        const heroProps = heroSec?.props as Record<string, unknown> | undefined;
        const pillarsProps = pillarsSec?.props as Record<string, unknown> | undefined;
        const eventProps = eventSec?.props as Record<string, unknown> | undefined;
        const awardsProps = awardsSec?.props as Record<string, unknown> | undefined;
        const projectsProps = projectsSec?.props as Record<string, unknown> | undefined;
        const newsProps = newsSec?.props as Record<string, unknown> | undefined;
        const partnersProps = partnersSec?.props as Record<string, unknown> | undefined;
        const ctaProps = ctaSec?.props as Record<string, unknown> | undefined;

        // Xử lý Featured News (có thể là object đơn lẻ hoặc mảng)
        let resolvedFeaturedNews = fallbackHomePageData.featuredNews;
        if (Array.isArray(newsProps?.featuredNews) && newsProps.featuredNews.length > 0) {
          resolvedFeaturedNews = newsProps.featuredNews as HomePageData["featuredNews"];
        } else if (newsProps?.featuredNews && typeof newsProps.featuredNews === "object") {
          resolvedFeaturedNews = [newsProps.featuredNews as unknown as HomePageData["featuredNews"][0]];
        }

        // Xử lý Featured Projects (có thể lưu dưới dạng projects hoặc featuredProjects)
        const resolvedProjects =
          (projectsProps?.projects as HomePageData["featuredProjects"]) ||
          (projectsProps?.featuredProjects as HomePageData["featuredProjects"]) ||
          fallbackHomePageData.featuredProjects;

        return {
          hero: {
            ...fallbackHomePageData.hero,
            ...((heroProps as unknown as Partial<HomePageData["hero"]>) || {}),
            title: (heroProps?.title as string) || fallbackHomePageData.hero.title,
            vietnameseTitle:
              (heroProps?.vietnameseTitle as string) || fallbackHomePageData.hero.vietnameseTitle,
            slogan:
              (heroProps?.slogan as string) ||
              heroSec?.title ||
              fallbackHomePageData.hero.slogan,
            description:
              (heroProps?.description as string) || fallbackHomePageData.hero.description,
            badgeText:
              (heroProps?.badgeText as string) || fallbackHomePageData.hero.badgeText,
            imageUrl:
              (heroProps?.imageUrl as string) || fallbackHomePageData.hero.imageUrl,
            videoUrl:
              (heroProps?.videoUrl as string) || fallbackHomePageData.hero.videoUrl,
            videoTitle:
              (heroProps?.videoTitle as string) || fallbackHomePageData.hero.videoTitle,
            locationBadge:
              (heroProps?.locationBadge as string) || fallbackHomePageData.hero.locationBadge,
            editionBadge:
              (heroProps?.editionBadge as string) || fallbackHomePageData.hero.editionBadge,
            metrics:
              (heroProps?.metrics as HomePageData["hero"]["metrics"]) ||
              fallbackHomePageData.hero.metrics,
            primaryCta: {
              ...fallbackHomePageData.hero.primaryCta,
              ...((heroProps?.primaryCta as object) || {}),
            },
            secondaryCta: {
              ...fallbackHomePageData.hero.secondaryCta,
              ...((heroProps?.secondaryCta as object) || {}),
            },
          },
          quickIntro: {
            ...fallbackHomePageData.quickIntro,
            ...((pillarsProps?.quickIntro as unknown as HomePageData["quickIntro"]) || {}),
            title:
              pillarsSec?.title ||
              (pillarsProps?.title as string) ||
              fallbackHomePageData.quickIntro.title,
            badge: (pillarsProps?.badge as string) || fallbackHomePageData.quickIntro.badge,
          },
          pillars:
            (pillarsProps?.pillars as unknown as HomePageData["pillars"]) ||
            fallbackHomePageData.pillars,
          activeEvent: {
            ...fallbackHomePageData.activeEvent,
            ...((eventProps as unknown as Partial<HomePageData["activeEvent"]>) || {}),
            heading:
              eventSec?.title ||
              (eventProps?.heading as string) ||
              fallbackHomePageData.activeEvent.heading,
            subHeading:
              eventSec?.subtitle ||
              (eventProps?.subHeading as string) ||
              fallbackHomePageData.activeEvent.subHeading,
          },
          award: {
            ...fallbackHomePageData.award,
            ...((awardsProps as unknown as Partial<HomePageData["award"]>) || {}),
          },
          featuredProjects: resolvedProjects,
          featuredNews: resolvedFeaturedNews,
          latestNews:
            (newsProps?.latestNews as unknown as HomePageData["latestNews"]) ||
            fallbackHomePageData.latestNews,
          partners:
            (partnersProps?.partners as unknown as HomePageData["partners"]) ||
            fallbackHomePageData.partners,
          conversionCta: {
            ...fallbackHomePageData.conversionCta,
            ...((ctaProps as unknown as Partial<HomePageData["conversionCta"]>) || {}),
            title: (ctaProps?.title as string) || ctaSec?.title || fallbackHomePageData.conversionCta?.title,
            subtitle: (ctaProps?.subtitle as string) || ctaSec?.subtitle || fallbackHomePageData.conversionCta?.subtitle,
          },
          lastUpdated: page.updatedAt || fallbackHomePageData.lastUpdated,
        };
      }
      return fallbackHomePageData;
    } catch (error) {
      console.warn("[HomeRepository] Fallback to in-memory home data:", error);
      return fallbackHomePageData;
    }
  }

  async getActiveEvent(): Promise<EventHighlight> {
    const data = await this.getHomePageData();
    return data.activeEvent || fallbackHomePageData.activeEvent;
  }

  async getFeaturedProjects(): Promise<FeaturedProject[]> {
    const data = await this.getHomePageData();
    return data.featuredProjects || fallbackHomePageData.featuredProjects;
  }

  async getNewsFeed(): Promise<{ featured: NewsArticle; latest: NewsArticle[] }> {
    const data = await this.getHomePageData();
    return {
      featured: data.featuredNews[0] || fallbackHomePageData.featuredNews[0],
      latest: data.latestNews || fallbackHomePageData.latestNews,
    };
  }
}

export const homeRepository = new HomeRepository();
