/**
 * LAYER 3: DATA ACCESS / REPOSITORY CHO MODULE HOME
 * Đọc `page.props` (7 sections: hero, pillars, event, showcase, news, partners, cta)
 * và giải tham chiếu mảng `ids: string[]` sang các bảng danh mục (HeritageProject, News, Organization, Award).
 */

import type {
  IHomeRepository,
  HomePageData,
  EventHighlight,
  FeaturedProject,
  NewsArticle,
  HomePartner,
} from "../types/home.types";
import { pageRepository } from "@/features/pages/repositories/page.repository";
import { masterDataRepository } from "@/features/pages/repositories/master-data.repository";
import { fallbackHomePageData } from "../data/home-fallback.data";

export class HomeRepository implements IHomeRepository {
  async getHomePageData(): Promise<HomePageData> {
    try {
      const page = await pageRepository.findBySlug("home");
      if (!page || !page.props) {
        return fallbackHomePageData;
      }

      const props = page.props;
      const heroSec = props.hero || {};
      const pillarsSec = props.pillars || {};
      const eventSec = props.event || {};
      const showcaseSec = props.showcase || {};
      const newsSec = props.news || {};
      const partnersSec = props.partners || {};
      const ctaSec = props.cta || {};

      // 1. Giải tham chiếu `ids` cho Dự án tiêu biểu (showcase.groups[1].ids hoặc showcase.ids)
      const showcaseGroups = Array.isArray(showcaseSec.groups) ? showcaseSec.groups : [];
      const awardGroup = showcaseGroups[0] || {};
      const projectGroup = showcaseGroups[1] || {};
      const projectIds =
        (Array.isArray(projectGroup.ids) && projectGroup.ids.length > 0
          ? projectGroup.ids
          : Array.isArray(showcaseSec.ids)
          ? showcaseSec.ids
          : []) as string[];

      // 2. Giải tham chiếu `ids` cho Tin tức (news.ids: phần tử đầu là tiêu điểm, các phần tử sau là bài mới)
      const newsIds = (Array.isArray(newsSec.ids) ? newsSec.ids : []) as string[];

      // 3. Giải tham chiếu `ids` cho Đối tác (partners.groups[].ids hoặc partners.ids)
      const partnerGroupIds = Array.isArray(partnersSec.groups)
        ? partnersSec.groups.flatMap((g) => (Array.isArray(g.ids) ? g.ids : []))
        : [];
      const partnerIds =
        partnerGroupIds.length > 0
          ? partnerGroupIds
          : Array.isArray(partnersSec.ids)
          ? partnersSec.ids
          : [];

      const [resolvedMasterProjects, resolvedMasterNews, resolvedMasterOrgs] = await Promise.all([
        projectIds.length > 0 ? masterDataRepository.getProjectsByIds(projectIds) : Promise.resolve([]),
        newsIds.length > 0 ? masterDataRepository.getNewsByIds(newsIds) : Promise.resolve([]),
        partnerIds.length > 0
          ? masterDataRepository.getOrganizationsByIds(partnerIds)
          : Promise.resolve([]),
      ]);

      // Map Projects từ danh mục theo mảng `ids`
      const featuredProjects: FeaturedProject[] =
        resolvedMasterProjects.length > 0
          ? resolvedMasterProjects.map((p) => ({
              id: p.id,
              name: p.name,
              slug: p.slug,
              location: p.location,
              category: p.category,
              description:
                p.description ||
                "Mô hình bảo tồn di sản thích ứng gắn liền phát triển kinh tế và sinh kế cộng đồng bền vững.",
              thumbnailUrl:
                p.thumbnailUrl ||
                "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&h=520&q=80",
              annualRevenue: p.annualRevenue || "Đang cập nhật",
              jobsCreated: p.jobsCreated || 0,
              conservationShare: p.conservationFundShare
                ? `${p.conservationFundShare} trích quỹ bảo tồn`
                : "15% doanh thu tái đầu tư",
            }))
          : fallbackHomePageData.featuredProjects;

      // Map News từ danh mục theo mảng `ids`
      const mappedNews: NewsArticle[] = resolvedMasterNews.map((n, index) => ({
        id: n.id,
        title: n.title,
        slug: n.slug,
        category: n.category?.name || n.categoryName,
        publishedAt: n.publishedAt || "02/11/2026",
        author: n.authorName || "Ban Biên Tập HEF",
        summary: n.excerpt,
        thumbnailUrl:
          n.coverImageUrl ||
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&h=500&q=80",
        isFeatured: index === 0,
      }));

      const featuredNews: NewsArticle[] =
        mappedNews.length > 0 ? [mappedNews[0]] : fallbackHomePageData.featuredNews;
      const latestNews: NewsArticle[] =
        mappedNews.length > 1
          ? mappedNews.slice(1)
          : mappedNews.length === 1
          ? fallbackHomePageData.latestNews
          : fallbackHomePageData.latestNews;

      // Map Partners từ danh mục theo mảng `ids`
      const partners: HomePartner[] =
        resolvedMasterOrgs.length > 0
          ? resolvedMasterOrgs.map((org, idx) => ({
              id: org.id,
              name: org.name,
              shortName: org.shortName || org.name,
              category: org.category as HomePartner["category"],
              categoryLabel: org.categoryLabel,
              logoUrl: org.logoUrl,
              websiteUrl: org.websiteUrl || "",
              order: idx + 1,
            }))
          : fallbackHomePageData.partners;

      // Map Hero universal props -> HomePageData.hero
      const heroActions = Array.isArray(heroSec.actions) ? heroSec.actions : [];
      const heroStats = Array.isArray(heroSec.stats) ? heroSec.stats : [];
      const heroCards = Array.isArray(heroSec.cards) ? heroSec.cards : [];
      const firstHeroCard = heroCards[0];

      const parsedMetrics =
        heroStats.length > 0
          ? heroStats.map((st) => {
              const rawVal = String(st.value || "0");
              const numMatch = rawVal.match(/\d+/);
              const numericVal = numMatch ? Number(numMatch[0]) : 0;
              const hasLeadingZero = rawVal.startsWith("0") && rawVal.length > 1;
              const suffix = rawVal.includes("+") ? "+" : undefined;
              return {
                value: numericVal,
                prefix: hasLeadingZero ? "0" : undefined,
                suffix,
                label: st.label,
              };
            })
          : fallbackHomePageData.hero.metrics;

      // Map Pillars universal props -> HomePageData.quickIntro & pillars
      const pillarCards = Array.isArray(pillarsSec.cards) ? pillarsSec.cards : [];
      const resolvedPillars =
        pillarCards.length > 0
          ? pillarCards.map((c, idx) => ({
              id: `pillar_${idx + 1}`,
              orderNumber: (c.badge || `0${idx + 1}`).replace(/[^0-9]/g, "") || `0${idx + 1}`,
              title: c.title || "",
              subtitle: c.subtitle || "",
              description: c.description || "",
              iconName: c.icon || "BookOpen",
            }))
          : fallbackHomePageData.pillars;

      // Map Event universal props -> HomePageData.activeEvent
      const eventGroups = Array.isArray(eventSec.groups) ? eventSec.groups : [];
      const eventOverview = eventGroups[0] || {};
      const eventAgenda = eventGroups[1] || {};
      const eventStats = Array.isArray(eventOverview.stats) ? eventOverview.stats : [];
      const agendaCards = Array.isArray(eventAgenda.cards) ? eventAgenda.cards : [];

      const resolvedSessions =
        agendaCards.length > 0
          ? agendaCards.map((card, idx) => {
              const fallbackSess =
                fallbackHomePageData.activeEvent.sessions[idx] ||
                fallbackHomePageData.activeEvent.sessions[0];
              const [timePart, datePart] = (card.subtitle || "").split("|").map((s) => s.trim());
              return {
                ...fallbackSess,
                id: `sess_${idx + 1}`,
                order: idx + 1,
                time: timePart || fallbackSess.time,
                date: datePart || fallbackSess.date,
                title: card.title || fallbackSess.title,
                subTitle: card.badge
                  ? `${card.badge} • ${card.subBadge || fallbackSess.room}`
                  : fallbackSess.subTitle,
                description: card.description || fallbackSess.description,
                room: card.subBadge || fallbackSess.room,
                chairperson:
                  (card.note || "").replace(/^Chủ trì phiên:\s*/i, "") || fallbackSess.chairperson,
              };
            })
          : fallbackHomePageData.activeEvent.sessions;

      // Map Award universal props (từ showcase.groups[0]) -> HomePageData.award
      const awardCards = Array.isArray(awardGroup.cards) ? awardGroup.cards : [];
      const awardActions = Array.isArray(awardGroup.actions) ? awardGroup.actions : [];

      // Map CTA universal props -> HomePageData.conversionCta
      const ctaCards = Array.isArray(ctaSec.cards) ? ctaSec.cards : [];

      return {
        hero: {
          ...fallbackHomePageData.hero,
          badgeText: heroSec.badge || fallbackHomePageData.hero.badgeText,
          title: heroSec.subBadge || fallbackHomePageData.hero.title,
          vietnameseTitle: heroSec.title || fallbackHomePageData.hero.vietnameseTitle,
          slogan: heroSec.quote || heroSec.subtitle || fallbackHomePageData.hero.slogan,
          description: heroSec.description || fallbackHomePageData.hero.description,
          imageUrl:
            firstHeroCard?.imageUrl || heroSec.imageUrl || fallbackHomePageData.hero.imageUrl,
          imageAlt:
            firstHeroCard?.imageAlt || heroSec.imageAlt || fallbackHomePageData.hero.imageAlt,
          videoUrl: heroSec.videoUrl || fallbackHomePageData.hero.videoUrl,
          videoTitle: heroSec.videoTitle || fallbackHomePageData.hero.videoTitle,
          locationBadge: firstHeroCard?.title || fallbackHomePageData.hero.locationBadge,
          editionBadge: firstHeroCard?.subBadge || fallbackHomePageData.hero.editionBadge,
          primaryCta: heroActions[0]
            ? { label: heroActions[0].label, href: heroActions[0].href }
            : fallbackHomePageData.hero.primaryCta,
          secondaryCta: heroActions[1]
            ? { label: heroActions[1].label, href: heroActions[1].href }
            : fallbackHomePageData.hero.secondaryCta,
          metrics: parsedMetrics,
        },
        quickIntro: {
          badge: pillarsSec.badge || "ĐỊNH VỊ DIỄN ĐÀN",
          title:
            pillarsSec.title || "Không Gian Đối Thoại & Chuyển Hóa Nguồn Lực Di Sản",
          content: pillarsSec.description || fallbackHomePageData.quickIntro.content,
          subContent: pillarsSec.quote || fallbackHomePageData.quickIntro.subContent,
        },
        pillars: resolvedPillars,
        activeEvent: {
          ...fallbackHomePageData.activeEvent,
          id: String((eventSec.ids && eventSec.ids[0]) || fallbackHomePageData.activeEvent.id),
          edition: eventSec.badge || fallbackHomePageData.activeEvent.edition,
          heading: eventSec.title || "Kỳ Diễn Đàn Nổi Bật 2026",
          subHeading:
            eventSec.subtitle ||
            "Không gian hội tụ các nhà khoa học, nhà quản lý và doanh nghiệp",
          statusBadge: eventSec.subBadge || fallbackHomePageData.activeEvent.statusBadge,
          title: eventOverview.title || fallbackHomePageData.activeEvent.title,
          theme: eventOverview.quote || fallbackHomePageData.activeEvent.theme,
          description:
            eventOverview.description || fallbackHomePageData.activeEvent.description,
          bannerUrl: eventOverview.imageUrl || fallbackHomePageData.activeEvent.bannerUrl,
          dates: eventStats[0]?.value || fallbackHomePageData.activeEvent.dates,
          location: eventStats[1]?.value || fallbackHomePageData.activeEvent.location,
          registrationDeadline:
            (eventStats[3]?.value || "").replace(/^Trước ngày\s*/i, "") ||
            fallbackHomePageData.activeEvent.registrationDeadline,
          registrationUrl:
            eventSec.actions?.[0]?.href || fallbackHomePageData.activeEvent.registrationUrl,
          sessions: resolvedSessions,
        },
        award: {
          ...fallbackHomePageData.award,
          badge: awardGroup.badge || fallbackHomePageData.award.badge,
          awardName: awardGroup.title || fallbackHomePageData.award.awardName,
          subtitle: awardGroup.quote || fallbackHomePageData.award.subtitle,
          description: awardGroup.description || fallbackHomePageData.award.description,
          nominationDeadline:
            (awardGroup.subBadge || "").replace(/^Hạn đề cử:\s*/i, "") ||
            fallbackHomePageData.award.nominationDeadline,
          criteria:
            awardCards.length > 0
              ? awardCards.map((c) => c.title || "").filter(Boolean)
              : fallbackHomePageData.award.criteria,
          nominationUrl:
            awardActions[0]?.href || fallbackHomePageData.award.nominationUrl,
          regulationsUrl:
            awardActions[1]?.href || fallbackHomePageData.award.regulationsUrl,
        },
        featuredProjects,
        featuredNews,
        latestNews,
        partners,
        conversionCta: {
          title: ctaSec.title || fallbackHomePageData.conversionCta?.title || "",
          subtitle:
            ctaSec.description ||
            ctaSec.subtitle ||
            fallbackHomePageData.conversionCta?.subtitle ||
            "",
          cards:
            ctaCards.length > 0
              ? ctaCards.map((c) => ({
                  title: c.title || "",
                  description: c.description || "",
                  ctaText: c.actionLabel || "Tìm hiểu thêm",
                  ctaLink: c.href || "/contact",
                }))
              : fallbackHomePageData.conversionCta?.cards || [],
        },
        lastUpdated: page.updatedAt || fallbackHomePageData.lastUpdated,
      };
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
