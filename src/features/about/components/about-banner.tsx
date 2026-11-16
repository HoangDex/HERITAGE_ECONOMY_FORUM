/**
 * COMPONENT: BANNER CHO TRANG GIỚI THIỆU
 * Đáp ứng Wireframe Desktop & Mobile với nhận diện thương hiệu HEF
 */

"use client";

import React from "react";
import { BrandLogo, HefIcon } from "@/components/icons";
import { FadeIn } from "@/components/animations";
import type { AboutTab } from "../hooks/use-about";

interface AboutBannerProps {
  activeTab?: AboutTab;
  onSelectTab?: (tab: AboutTab) => void;
  lastUpdated?: string;
}

export function AboutBanner({ lastUpdated }: AboutBannerProps) {
  return (
    <div className="w-full">
      {/* Banner chính */}
      <section className="relative overflow-hidden bg-radial-[at_top] from-[#0D4838] via-[#073327] to-[#292929] text-white py-16 sm:py-20 px-4 sm:px-8 border-b-4 border-[#C29B57]">
        {/* Background Họa Tiết Trống Đồng / Hoa Văn Di Sản */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C29B57_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="w-full max-w-[1840px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 relative z-10 text-center">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C29B57]/20 border border-[#C29B57]/40 text-[#C29B57] text-xs font-semibold mb-4 backdrop-blur-xs">
              <HefIcon name="ShieldCheck" size="xs" variant="gold" />
              <span>ĐỀ ÁN DIỄN ĐÀN KINH TẾ DI SẢN (HEF) • MỤC 06</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#F5EFE5] max-w-4xl mx-auto leading-tight">
              GIỚI THIỆU – VỀ DIỄN ĐÀN
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/85 max-w-3xl mx-auto font-sans leading-relaxed">
              Nền tảng kết nối liên ngành nhằm nghiên cứu, nhận diện và phát huy các giá trị di sản
              trong phát triển kinh tế, văn hóa và xã hội; lấy di sản làm nguồn lực sáng tạo và cộng
              đồng làm chủ thể phát triển.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <BrandLogo size="sm" showSubtitle={false} className="scale-75" />
                <span>Cơ cấu tổ chức chính thức</span>
              </span>
              <span>•</span>
              <span>Áp dụng từ 03/11/2026</span>
              {lastUpdated && (
                <>
                  <span>•</span>
                  <span>Ngày cập nhật: {lastUpdated}</span>
                </>
              )}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
