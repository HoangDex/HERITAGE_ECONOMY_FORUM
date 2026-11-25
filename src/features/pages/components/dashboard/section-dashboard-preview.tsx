/**
 * COMPONENT: LIVE PREVIEW SECTION DASHBOARD CMS (REAL PRODUCTION ARCHITECTURE)
 * - Tái sử dụng 100% component UI thật của các trang (Home, About, Awards, Forum, Contact, News, Heritage)
 * - Dùng ScaledPreviewViewport giữ kích thước gốc (Desktop: 1200px, Mobile: 390px) và thu phóng CSS scale
 * - Preview phản hồi tức thì và hiển thị giống 100% giao diện thực tế của website công khai
 */

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Monitor,
  Smartphone,
  Maximize2,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PageSection } from "../../types/page.types";
import { getSectionMeta } from "./section-meta";

// 1. IMPORT CÁC COMPONENT GIAO DIỆN THẬT CỦA TRANG CHỦ (HOME)
import { HomeHero } from "@/features/home/components/home-hero";
import { IntroPillarsSection } from "@/features/home/components/intro-pillars-section";
import { EventHighlightSection } from "@/features/home/components/event-highlight-section";
import { AwardsShowcaseSection } from "@/features/home/components/awards-showcase-section";
import { FeaturedProjectsSection } from "@/features/home/components/featured-projects-section";
import { NewsFeedSection } from "@/features/home/components/news-feed-section";
import { PartnersSliderSection } from "@/features/home/components/partners-slider-section";
import { ConversionCtaSection } from "@/features/home/components/conversion-cta-section";
import { fallbackHomePageData } from "@/features/home/data/home-fallback.data";

// 2. IMPORT CÁC COMPONENT GIAO DIỆN THẬT CỦA TRANG GIỚI THIỆU (ABOUT)
import { AboutBanner } from "@/features/about/components/about-banner";
import { VisionMissionSection } from "@/features/about/components/vision-mission-section";
import { CouncilSection } from "@/features/about/components/council-section";
import { ExecutiveSection } from "@/features/about/components/executive-section";
import { PartnersSection } from "@/features/about/components/partners-section";
import {
  fallbackVisionMission,
  fallbackPersons,
  fallbackDepartments,
  fallbackPartners,
} from "@/features/about/data/about-fallback.data";

// Trích xuất nhân sự mẫu cho Hội đồng & Ban điều hành
const fallbackPresident = fallbackPersons.find((p) => p.councilRole === "PRESIDENT") || fallbackPersons[0];
const fallbackVicePresidents = fallbackPersons.filter((p) => p.councilRole === "VICE_PRESIDENT");
const fallbackCouncilMembers = fallbackPersons.filter((p) => p.councilRole === "COUNCIL_MEMBER");
const fallbackScientificAdvisors = fallbackPersons.filter((p) => p.councilRole === "SCIENTIFIC_ADVISOR");
const fallbackExecutiveHead = fallbackPersons.find((p) => p.executiveRole === "HEAD") || fallbackPersons[0];
const fallbackExecutiveAdvisor = fallbackPersons.find((p) => p.executiveRole === "ADVISOR");
const fallbackExecutiveDeputies = fallbackPersons.filter((p) => p.executiveRole === "DEPUTY_HEAD");

// 3. IMPORT CÁC COMPONENT GIAO DIỆN THẬT CỦA TRANG GIẢI THƯỞNG (AWARDS)
import { AwardsHero } from "@/features/awards/components/awards-hero";
import { AwardsCategoriesSection } from "@/features/awards/components/awards-categories-section";
import { AwardsCriteriaRulesSection } from "@/features/awards/components/awards-criteria-rules-section";
import { AwardsProcessSection } from "@/features/awards/components/awards-process-section";
import { AwardsCouncilSection } from "@/features/awards/components/awards-council-section";
import { MOCK_AWARDS_DATA } from "@/features/awards/data/awards-fallback.data";

// 4. IMPORT CÁC COMPONENT GIAO DIỆN THẬT CỦA TRANG LIÊN HỆ (CONTACT)
import { ContactInfoSection } from "@/features/contact/components/contact-info-section";
import { ContactForm } from "@/features/contact/components/contact-form";

// 5. IMPORT CÁC COMPONENT GIAO DIỆN THẬT CỦA TRANG DIỄN ĐÀN (FORUM)
import { ForumHero } from "@/features/forum/components/forum-hero";
import { ForumSessionsSection } from "@/features/forum/components/forum-sessions-section";
import { ForumTimelineSection } from "@/features/forum/components/forum-timeline-section";
import { ForumSpeakersSection } from "@/features/forum/components/forum-speakers-section";
import { ForumOutcomesSection } from "@/features/forum/components/forum-outcomes-section";
import { ForumResourcesSection } from "@/features/forum/components/forum-resources-section";
import { ForumPartnersSection } from "@/features/forum/components/forum-partners-section";
import { ForumFaqSection } from "@/features/forum/components/forum-faq-section";
import { HEF_2026_EDITION } from "@/features/forum/data/forum-fallback.data";

// 6. IMPORT CÁC COMPONENT GIAO DIỆN THẬT CỦA TRANG TIN TỨC (NEWS)
import { NewsTopStory } from "@/features/news/components/news-top-story";
import { MOCK_NEWS_ARTICLES } from "@/features/news/data/news-fallback.data";

// 7. IMPORT CÁC COMPONENT GIAO DIỆN THẬT CỦA TRANG DỰ ÁN DI SẢN (HERITAGE)
import { ProjectsHero } from "@/features/heritage/components/projects-hero";
import { HeritageGrid } from "@/features/heritage/components/heritage-grid";
import { INITIAL_HERITAGE_PROJECTS } from "@/lib/mock-data";

interface ScaledPreviewViewportProps {
  children: React.ReactNode;
  viewMode: "desktop" | "mobile";
  isExpanded?: boolean;
}

/**
 * ScaledPreviewViewport:
 * Giữ nguyên kích thước gốc chuẩn của Section trên website (Desktop: 1200px, Mobile: 390px)
 * và tự động co dãn (CSS scale transform) vừa vặn theo chiều rộng của khung Admin CMS.
 * Giúp giao diện hiển thị 100% chuẩn xác như web thật, không bị vỡ layout, tràn chữ hay chồng chéo cột.
 */
function ScaledPreviewViewport({
  children,
  viewMode,
  isExpanded = false,
}: ScaledPreviewViewportProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  // Kích thước gốc chuẩn của giao diện website:
  // Desktop: 1200px (tương đương chuẩn khung nhìn max-w-7xl trên desktop)
  // Mobile: 390px (chuẩn màn hình di động smartphone)
  const baseWidth = viewMode === "desktop" ? 1200 : 390;

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const cWidth = containerRef.current.clientWidth;

      if (cWidth > 0) {
        if (viewMode === "desktop") {
          const calculatedScale = cWidth / baseWidth;
          setScale(calculatedScale);
        } else {
          const calculatedScale = cWidth < baseWidth ? cWidth / baseWidth : 1;
          setScale(calculatedScale);
        }
      }

      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (contentRef.current) resizeObserver.observe(contentRef.current);

    window.addEventListener("resize", handleResize);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [baseWidth, viewMode, isExpanded]);

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden rounded-2xl border border-[#DFD8C8] bg-[#F7F5EE]/40 shadow-xs relative transition-all duration-200 ${
        viewMode === "mobile" ? "flex justify-center" : ""
      }`}
      style={{
        height: contentHeight && scale > 0 ? Math.ceil(contentHeight * scale) : "auto",
        minHeight: 160,
      }}
    >
      <div
        ref={contentRef}
        className="preview-viewport-isolated shrink-0 select-text font-sans text-foreground"
        style={{
          width: baseWidth,
          minWidth: baseWidth,
          transform: `scale(${scale})`,
          transformOrigin: viewMode === "desktop" ? "top left" : "top center",
          pointerEvents: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface SectionDashboardPreviewProps {
  section: PageSection;
  title: string;
  subtitle: string;
  propsData: Record<string, unknown>;
  publicUrl: string;
  order: number;
}

function SectionDashboardPreviewComponent({
  section,
  title,
  subtitle,
  propsData,
  publicUrl,
  order,
}: SectionDashboardPreviewProps) {
  const meta = getSectionMeta(section.type, title);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * RENDER GIAO DIỆN CHUẨN XÁC DỰA TRÊN COMPONENT THỰC TẾ CỦA TỪNG TRANG
   */
  const renderSectionPreview = () => {
    switch (section.type) {
      // ==========================================
      // 1. CÁC SECTION TRANG CHỦ (HOME PAGE)
      // ==========================================
      case "HOME_HERO":
      case "HERO": {
        const heroProps = {
          title: String(propsData.englishTitle || propsData.title || fallbackHomePageData.hero.title),
          vietnameseTitle: String(propsData.vietnameseTitle || propsData.vnTitle || fallbackHomePageData.hero.vietnameseTitle),
          slogan: String(propsData.slogan || subtitle || fallbackHomePageData.hero.slogan),
          description: String(propsData.description || fallbackHomePageData.hero.description),
          primaryCta: (propsData.primaryCta as { label: string; href: string }) || fallbackHomePageData.hero.primaryCta,
          secondaryCta: (propsData.secondaryCta as { label: string; href: string }) || fallbackHomePageData.hero.secondaryCta,
          imageUrl: String(propsData.imageUrl || fallbackHomePageData.hero.imageUrl),
          imageAlt: String(propsData.imageAlt || fallbackHomePageData.hero.imageAlt),
          badgeText: String(propsData.badgeText || fallbackHomePageData.hero.badgeText),
          videoUrl: String(propsData.videoUrl || fallbackHomePageData.hero.videoUrl),
          videoTitle: String(propsData.videoTitle || fallbackHomePageData.hero.videoTitle),
          locationBadge: String(propsData.locationBadge || fallbackHomePageData.hero.locationBadge),
          editionBadge: String(propsData.editionBadge || fallbackHomePageData.hero.editionBadge),
          metrics: (Array.isArray(propsData.metrics) && propsData.metrics.length > 0
            ? propsData.metrics
            : fallbackHomePageData.hero.metrics) as Array<{ value: number; suffix?: string; prefix?: string; label: string }>,
        };
        return <HomeHero hero={heroProps} />;
      }

      case "HOME_INTRO_PILLARS":
      case "PILLARS_5": {
        const intro = (propsData.quickIntro as { content: string; subContent: string; title?: string; badge?: string; actionLabel?: string }) || {
          content: String(propsData.content || fallbackHomePageData.quickIntro.content),
          subContent: String(propsData.subContent || fallbackHomePageData.quickIntro.subContent),
        };
        const pillars = (Array.isArray(propsData.pillars) && propsData.pillars.length > 0
          ? propsData.pillars
          : fallbackHomePageData.pillars) as typeof fallbackHomePageData.pillars;
        return <IntroPillarsSection intro={intro} pillars={pillars} />;
      }

      case "HOME_EVENT_HIGHLIGHT":
      case "EVENT_HIGHLIGHT": {
        const eventData = {
          ...fallbackHomePageData.activeEvent,
          ...propsData,
          sessions: Array.isArray(propsData.sessions) && propsData.sessions.length > 0
            ? propsData.sessions
            : fallbackHomePageData.activeEvent.sessions,
        } as typeof fallbackHomePageData.activeEvent;
        return <EventHighlightSection event={eventData} />;
      }

      case "HOME_AWARDS_SHOWCASE":
      case "AWARDS_SHOWCASE": {
        const awardData = {
          ...fallbackHomePageData.award,
          ...propsData,
          criteria: Array.isArray(propsData.criteria) && propsData.criteria.length > 0
            ? propsData.criteria
            : fallbackHomePageData.award.criteria,
        } as typeof fallbackHomePageData.award;
        return <AwardsShowcaseSection award={awardData} />;
      }

      case "HOME_FEATURED_PROJECTS":
      case "PROJECT_GRID": {
        const projects = (Array.isArray(propsData.projects) && propsData.projects.length > 0
          ? propsData.projects
          : Array.isArray(propsData.featuredProjects) && propsData.featuredProjects.length > 0
          ? propsData.featuredProjects
          : fallbackHomePageData.featuredProjects) as typeof fallbackHomePageData.featuredProjects;
        return <FeaturedProjectsSection projects={projects} />;
      }

      case "HOME_NEWS_FEED":
      case "NEWS_FEED": {
        const featured = (propsData.featuredNews as typeof fallbackHomePageData.featuredNews) || fallbackHomePageData.featuredNews;
        const latest = (Array.isArray(propsData.latestNews) && propsData.latestNews.length > 0
          ? propsData.latestNews
          : fallbackHomePageData.latestNews) as typeof fallbackHomePageData.latestNews;
        return <NewsFeedSection featuredNews={featured} latestNews={latest} />;
      }

      case "HOME_PARTNERS_SLIDER":
      case "PARTNERS_SLIDER": {
        const partners = (Array.isArray(propsData.partners) && propsData.partners.length > 0
          ? propsData.partners
          : fallbackHomePageData.partners) as typeof fallbackHomePageData.partners;
        return <PartnersSliderSection partners={partners} />;
      }

      case "HOME_CONVERSION_CTA":
      case "CTA_BANNER": {
        const baseCta = fallbackHomePageData.conversionCta || {
          headline: "Cùng Kiến Tạo Giá Trị Di Sản",
          description: "Mỗi sáng kiến của quý vị đều góp phần hồi sinh và phát huy bền vững kho tàng văn hóa di sản.",
          cards: [],
        };
        const ctaData = {
          ...baseCta,
          ...propsData,
          cards: Array.isArray(propsData.cards) && propsData.cards.length > 0
            ? propsData.cards
            : baseCta.cards,
        } as typeof fallbackHomePageData.conversionCta;
        return <ConversionCtaSection cta={ctaData} />;
      }

      // ==========================================
      // 2. CÁC SECTION TRANG GIỚI THIỆU (ABOUT PAGE)
      // ==========================================
      case "ABOUT_BANNER": {
        return <AboutBanner lastUpdated={propsData.lastUpdated as string} />;
      }

      case "ABOUT_VISION_MISSION": {
        const vmData = {
          ...fallbackVisionMission,
          ...propsData,
          coreValues: Array.isArray(propsData.coreValues) && propsData.coreValues.length > 0
            ? propsData.coreValues
            : fallbackVisionMission.coreValues,
        } as typeof fallbackVisionMission;
        return <VisionMissionSection data={vmData} />;
      }

      case "ABOUT_COUNCIL": {
        return (
          <CouncilSection
            president={(propsData.president as typeof fallbackPresident) || fallbackPresident}
            vicePresidents={(Array.isArray(propsData.vicePresidents) && propsData.vicePresidents.length > 0
              ? propsData.vicePresidents
              : fallbackVicePresidents) as typeof fallbackVicePresidents}
            councilMembers={(Array.isArray(propsData.councilMembers) && propsData.councilMembers.length > 0
              ? propsData.councilMembers
              : fallbackCouncilMembers) as typeof fallbackCouncilMembers}
            scientificAdvisors={(Array.isArray(propsData.scientificAdvisors) && propsData.scientificAdvisors.length > 0
              ? propsData.scientificAdvisors
              : fallbackScientificAdvisors) as typeof fallbackScientificAdvisors}
            onOpenPersonModal={() => {}}
            showFullViewLink={false}
          />
        );
      }

      case "ABOUT_EXECUTIVE": {
        return (
          <ExecutiveSection
            head={(propsData.head as typeof fallbackExecutiveHead) || (propsData.executiveHead as typeof fallbackExecutiveHead) || fallbackExecutiveHead}
            advisor={(propsData.advisor as typeof fallbackExecutiveAdvisor) || (propsData.executiveAdvisor as typeof fallbackExecutiveAdvisor) || fallbackExecutiveAdvisor}
            deputies={(Array.isArray(propsData.deputies) && propsData.deputies.length > 0
              ? propsData.deputies
              : fallbackExecutiveDeputies) as typeof fallbackExecutiveDeputies}
            departments={(Array.isArray(propsData.departments) && propsData.departments.length > 0
              ? propsData.departments
              : fallbackDepartments) as typeof fallbackDepartments}
            onOpenPersonModal={() => {}}
            showFullViewLink={false}
          />
        );
      }

      case "ABOUT_PARTNERS": {
        const partners = (Array.isArray(propsData.partners) && propsData.partners.length > 0
          ? propsData.partners
          : fallbackPartners) as typeof fallbackPartners;
        return <PartnersSection partners={partners} />;
      }

      // ==========================================
      // 3. CÁC SECTION TRANG GIẢI THƯỞNG (AWARDS PAGE)
      // ==========================================
      case "AWARDS_HERO": {
        return (
          <AwardsHero
            title={String(propsData.title || MOCK_AWARDS_DATA.title)}
            englishTitle={String(propsData.englishTitle || MOCK_AWARDS_DATA.englishTitle)}
            slogan={String(propsData.slogan || MOCK_AWARDS_DATA.slogan)}
            philosophy={String(propsData.philosophy || MOCK_AWARDS_DATA.philosophy)}
          />
        );
      }

      case "AWARDS_CATEGORIES": {
        const categories = (Array.isArray(propsData.categories) && propsData.categories.length > 0
          ? propsData.categories
          : MOCK_AWARDS_DATA.categories) as typeof MOCK_AWARDS_DATA.categories;
        return <AwardsCategoriesSection categories={categories} />;
      }

      case "AWARDS_CRITERIA":
      case "AWARDS_RULES": {
        const criteriaList = (Array.isArray(propsData.criteriaList) && propsData.criteriaList.length > 0
          ? propsData.criteriaList
          : MOCK_AWARDS_DATA.criteriaList) as typeof MOCK_AWARDS_DATA.criteriaList;
        return (
          <AwardsCriteriaRulesSection
            criteriaList={criteriaList}
            rulesVersion={String(propsData.rulesVersion || MOCK_AWARDS_DATA.rulesVersion)}
          />
        );
      }

      case "AWARDS_PROCESS": {
        const steps = (Array.isArray(propsData.processSteps) && propsData.processSteps.length > 0
          ? propsData.processSteps
          : Array.isArray(propsData.steps) && propsData.steps.length > 0
          ? propsData.steps
          : MOCK_AWARDS_DATA.processSteps) as typeof MOCK_AWARDS_DATA.processSteps;
        return <AwardsProcessSection steps={steps} />;
      }

      case "AWARDS_COUNCIL": {
        const judges = (Array.isArray(propsData.judges) && propsData.judges.length > 0
          ? propsData.judges
          : MOCK_AWARDS_DATA.judges) as typeof MOCK_AWARDS_DATA.judges;
        return <AwardsCouncilSection judges={judges} />;
      }

      // ==========================================
      // 4. CÁC SECTION TRANG LIÊN HỆ (CONTACT PAGE)
      // ==========================================
      case "CONTACT_BANNER": {
        return (
          <div className="py-12 bg-white border-b border-[#dfd7c8] text-center space-y-3 px-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0D4838] text-white">
              {String(propsData.badge || "Cổng Tiếp Nhận Thông Tin")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#292929]">
              {String(propsData.title || "Kết Nối Ban Tổ Chức & Ban Thư Ký")}
            </h2>
            <p className="text-base font-semibold text-[#0D4838]">
              {String(propsData.slogan || "Đồng hành kiến tạo giá trị – Thúc đẩy hợp tác đa phương")}
            </p>
            <p className="text-sm text-[#5c554b] max-w-2xl mx-auto leading-relaxed">
              {String(propsData.description || "Mọi thông tin xin gửi trực tiếp qua cổng tiếp nhận chính thức.")}
            </p>
          </div>
        );
      }

      case "CONTACT_INFO": {
        const info = (propsData.info as { secretariatTitle: string; address: string; hotline: string; email: string; workingHours: string }) || {
          secretariatTitle: "Ban Thư Ký Diễn Đàn Kinh Tế Di Sản",
          address: "Trung tâm Hội nghị Quốc tế & Hoàng thành Thăng Long, Ba Đình, Hà Nội",
          hotline: "+84 (0) 24 3838 8888",
          email: "contact@heritageforum.vn",
          workingHours: "Thứ Hai – Thứ Sáu: 08:00 – 17:30 (GMT+7)",
        };
        const faqs = (Array.isArray(propsData.faqs) && propsData.faqs.length > 0
          ? propsData.faqs
          : [
              {
                question: "Đăng ký đại biểu chính thức theo hình thức nào?",
                answer: "Quý đại biểu có thể đăng ký trực tuyến qua cổng thông tin hoặc gửi công văn đề xuất tới Ban Thư ký.",
              },
              {
                question: "Thời hạn tiếp nhận hồ sơ đề cử giải thưởng?",
                answer: "Ban Tổ chức tiếp nhận hồ sơ đề cử đến hết ngày 15/10/2026.",
              },
            ]) as Array<{ question: string; answer: string }>;
        return <ContactInfoSection info={info} faqs={faqs} />;
      }

      case "CONTACT_FORM": {
        return (
          <div className="p-6 bg-white rounded-2xl border border-[#dfd7c8] shadow-xs">
            <ContactForm />
          </div>
        );
      }

      // ==========================================
      // 5. CÁC SECTION TRANG DIỄN ĐÀN (FORUM PAGE)
      // ==========================================
      case "FORUM_HERO": {
        const edition = {
          ...HEF_2026_EDITION,
          ...propsData,
        } as typeof HEF_2026_EDITION;
        return <ForumHero edition={edition} />;
      }

      case "FORUM_SESSIONS": {
        const sessions = (Array.isArray(propsData.sessions) && propsData.sessions.length > 0
          ? propsData.sessions
          : HEF_2026_EDITION.sessions) as typeof HEF_2026_EDITION.sessions;
        return <ForumSessionsSection sessions={sessions} />;
      }

      case "FORUM_TIMELINE": {
        const timeline = (Array.isArray(propsData.timeline) && propsData.timeline.length > 0
          ? propsData.timeline
          : HEF_2026_EDITION.timeline) as typeof HEF_2026_EDITION.timeline;
        return <ForumTimelineSection timeline={timeline} />;
      }

      case "FORUM_SPEAKERS": {
        const speakers = (Array.isArray(propsData.speakers) && propsData.speakers.length > 0
          ? propsData.speakers
          : HEF_2026_EDITION.speakers) as typeof HEF_2026_EDITION.speakers;
        return <ForumSpeakersSection speakers={speakers} />;
      }

      case "FORUM_OUTCOMES": {
        const edition = {
          ...HEF_2026_EDITION,
          ...propsData,
        } as typeof HEF_2026_EDITION;
        return <ForumOutcomesSection edition={edition} />;
      }

      case "FORUM_RESOURCES": {
        const resources = (Array.isArray(propsData.resources) && propsData.resources.length > 0
          ? propsData.resources
          : HEF_2026_EDITION.resources) as typeof HEF_2026_EDITION.resources;
        return <ForumResourcesSection resources={resources} gallery={propsData.gallery as typeof HEF_2026_EDITION.gallery} />;
      }

      case "FORUM_PARTNERS": {
        return <ForumPartnersSection />;
      }

      case "FORUM_FAQ": {
        return <ForumFaqSection />;
      }

      // ==========================================
      // 6. CÁC SECTION TRANG TIN TỨC (NEWS PAGE)
      // ==========================================
      case "NEWS_HERO": {
        return (
          <div className="py-12 bg-white border-b border-[#dfd7c8] text-center space-y-3 px-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0D4838]/10 text-[#0D4838]">
              {String(propsData.badge || "Trung Tâm Tri Thức & Truyền Thông")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#292929]">
              {String(propsData.title || "Tin Tức, Nghiên Cứu & Góc Nhìn Chuyên Gia")}
            </h2>
            <p className="text-sm text-[#5c554b] max-w-2xl mx-auto leading-relaxed">
              {String(propsData.description || "Cập nhật hoạt động, nghiên cứu, quan điểm chuyên gia và những mô hình thực tiễn.")}
            </p>
          </div>
        );
      }

      case "NEWS_TOP_STORY": {
        const featured = ((propsData.featuredArticle as any) || MOCK_NEWS_ARTICLES[0]) as typeof MOCK_NEWS_ARTICLES[0];
        const topSide = (Array.isArray(propsData.topSideArticles) && propsData.topSideArticles.length > 0
          ? propsData.topSideArticles
          : MOCK_NEWS_ARTICLES.slice(1, 5)) as typeof MOCK_NEWS_ARTICLES;
        return <NewsTopStory featured={featured} topSide={topSide} />;
      }

      // ==========================================
      // 7. CÁC SECTION TRANG DỰ ÁN DI SẢN (HERITAGE / PROJECTS)
      // ==========================================
      case "HERITAGE_HERO": {
        return <ProjectsHero />;
      }

      case "HERITAGE_GRID": {
        const projects = (Array.isArray(propsData.projects) && propsData.projects.length > 0
          ? propsData.projects
          : INITIAL_HERITAGE_PROJECTS) as typeof INITIAL_HERITAGE_PROJECTS;
        return <HeritageGrid projects={projects} />;
      }

      // ==========================================
      // DEFAULT FALLBACK (KHỐI TÙY BIẾN HOẶC CHƯA CÓ TRONG DANH MỤC)
      // ==========================================
      default: {
        return (
          <div className="rounded-2xl bg-white p-6 border border-[#dfd7c8] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#C29B57] bg-[#F5EFE5] px-2.5 py-0.5 rounded-full">
                {section.type}
              </span>
              <span className="text-xs text-muted-foreground font-mono">#{order}</span>
            </div>
            <h4 className="font-serif font-bold text-base text-[#0D4838]">
              {title || meta.label}
            </h4>
            {Boolean(subtitle) && <p className="text-xs text-[#76232D] italic">{subtitle}</p>}
            <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#dfd7c8] text-xs text-[#5c554b] space-y-1">
              {Object.entries(propsData)
                .slice(0, 4)
                .map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <span className="font-mono text-[10px] text-muted-foreground">{k}:</span>
                    <span className="font-semibold truncate max-w-[180px]">
                      {typeof v === "object" ? JSON.stringify(v) : String(v)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="sticky top-4 space-y-3">
      {/* Top Preview Control Header */}
      <div className="bg-white p-3.5 rounded-2xl border border-[#dfd7c8] shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-[#0D4838]">Live Preview Khối #{order}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Chuyển đổi màn hình Desktop / Mobile */}
          <div className="flex items-center bg-[#F5EFE5] p-0.5 rounded-lg border border-[#dfd7c8]">
            <button
              type="button"
              onClick={() => setViewMode("desktop")}
              className={`p-1 rounded-md transition-all cursor-pointer ${
                viewMode === "desktop"
                  ? "bg-white text-[#0D4838] shadow-2xs"
                  : "text-muted-foreground hover:text-[#0D4838]"
              }`}
              title="Xem giao diện chuẩn Desktop (1200px)"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("mobile")}
              className={`p-1 rounded-md transition-all cursor-pointer ${
                viewMode === "mobile"
                  ? "bg-white text-[#0D4838] shadow-2xs"
                  : "text-muted-foreground hover:text-[#0D4838]"
              }`}
              title="Xem giao diện thu nhỏ Mobile (390px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="p-1.5 rounded-lg hover:bg-[#F5EFE5] text-[#0D4838] border border-[#dfd7c8] transition-colors cursor-pointer"
            title="Phóng to toàn màn hình xem trước"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#C29B57]" />
          </button>

          <Link
            href={publicUrl}
            target="_blank"
            className="p-1.5 rounded-lg hover:bg-[#F5EFE5] text-[#0D4838] border border-[#dfd7c8] transition-colors"
            title="Mở xem trên website"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#0D4838]" />
          </Link>
        </div>
      </div>

      {/* Main Scaled Preview Container (Chuẩn hóa tỉ lệ gốc 1200px Desktop / 390px Mobile) */}
      <ScaledPreviewViewport viewMode={viewMode}>
        {renderSectionPreview()}
      </ScaledPreviewViewport>

      {/* Quick Footer info */}
      <div className="text-center">
        <span className="text-[11px] text-muted-foreground">
          Xem trước cập nhật tức thì khi thay đổi nội dung bên cạnh
        </span>
      </div>

      {/* Modal Phóng To Toàn Màn Hình Khi Bấm Nút Phóng To */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 sm:p-8 flex flex-col justify-center items-center overflow-y-auto">
          <div className="w-full max-w-6xl bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-[#C29B57]/50 space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#dfd7c8]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-serif font-bold text-base text-[#0D4838]">
                  Xem Trước Toàn Cảnh: Khối #{order} - {title || meta.label}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-[#F5EFE5] p-0.5 rounded-lg border border-[#dfd7c8]">
                  <button
                    type="button"
                    onClick={() => setViewMode("desktop")}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      viewMode === "desktop"
                        ? "bg-white text-[#0D4838] shadow-2xs"
                        : "text-stone-600 hover:text-[#0D4838]"
                    }`}
                  >
                    Desktop
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("mobile")}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      viewMode === "mobile"
                        ? "bg-white text-[#0D4838] shadow-2xs"
                        : "text-stone-600 hover:text-[#0D4838]"
                    }`}
                  >
                    Mobile
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 rounded-xl hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
                  title="Đóng cửa sổ phóng to"
                >
                  <X className="w-5 h-5 text-stone-700" />
                </button>
              </div>
            </div>

            <div className="w-full">
              <ScaledPreviewViewport viewMode={viewMode} isExpanded={true}>
                {renderSectionPreview()}
              </ScaledPreviewViewport>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const SectionDashboardPreview = React.memo(
  SectionDashboardPreviewComponent,
  (prev, next) =>
    prev.section.id === next.section.id &&
    prev.section.type === next.section.type &&
    prev.title === next.title &&
    prev.subtitle === next.subtitle &&
    prev.publicUrl === next.publicUrl &&
    prev.order === next.order &&
    prev.propsData === next.propsData
);
