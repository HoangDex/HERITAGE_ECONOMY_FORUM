/**
 * COMPONENT TỔNG HỢP GIAO DIỆN TRANG CHỦ (HOME PAGE VIEW)
 * Tích hợp toàn diện các khối: Hero 2 cột, 05 Trụ cột, Sự kiện nổi bật, Giải thưởng & Dự án, Tin tức, Đối tác, 3 Tuyến chuyển đổi
 */

"use client";

import React from "react";
import { HomeHero } from "./home-hero";
import { IntroPillarsSection } from "./intro-pillars-section";
import { EventHighlightSection } from "./event-highlight-section";
import { AwardsShowcaseSection } from "./awards-showcase-section";
import { FeaturedProjectsSection } from "./featured-projects-section";
import { NewsFeedSection } from "./news-feed-section";
import { PartnersSliderSection } from "./partners-slider-section";
import { ConversionCtaSection } from "./conversion-cta-section";
import type { HomePageData } from "../types/home.types";

interface HomePageViewProps {
  initialData: HomePageData;
}

export function HomePageView({ initialData }: HomePageViewProps) {
  return (
    <div className="w-full flex flex-col">
      {/* 1. HERO 2 CỘT (DESKTOP) / XẾP DỌC (MOBILE) */}
      <HomeHero hero={initialData.hero} />

      {/* 2. GIỚI THIỆU NHANH (40%) + 05 TRỤ CỘT (60%) */}
      <IntroPillarsSection intro={initialData.quickIntro} pillars={initialData.pillars} />

      {/* 3. KỲ DIỄN ĐÀN NỔI BẬT (BANNER RỘNG + CÁC PHIÊN + CTA) */}
      <EventHighlightSection event={initialData.activeEvent} />

      {/* 4. GIẢI THƯỞNG / DỰ ÁN (2 CỘT CARD NỔI BẬT) */}
      <section className="py-14 sm:py-20 bg-muted/40 border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Cột Trái: Banner riêng Giải thưởng */}
            <div className="lg:col-span-6 flex">
              <AwardsShowcaseSection award={initialData.award} />
            </div>

            {/* Cột Phải: Danh mục 3 dự án điển hình đã được duyệt */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <FeaturedProjectsSection projects={initialData.featuredProjects} />
            </div>
          </div>
        </div>
      </section>

      {/* 5. TIN TỨC & GÓC CHUYÊN GIA (1 BÀI NỔI BẬT + 3 BÀI MỚI) */}
      <NewsFeedSection
        featuredNews={initialData.featuredNews}
        latestNews={initialData.latestNews}
      />

      {/* 6. ĐỐI TÁC ĐỒNG HÀNH (DẢI LOGO PHÂN NHÓM) */}
      <PartnersSliderSection partners={initialData.partners} />

      {/* 7. KHỐI CUỐI: CÙNG KIẾN TẠO GIÁ TRỊ DI SẢN & 3 TUYẾN CHUYỂN ĐỔI */}
      <ConversionCtaSection />
    </div>
  );
}
