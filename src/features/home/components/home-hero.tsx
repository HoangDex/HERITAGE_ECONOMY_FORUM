/**
 * COMPONENT: HOME HERO (DESKTOP: 2 CỘT | MOBILE: ẢNH 16:9 TRÊN, CTA XẾP DỌC)
 * Nội dung xuất bản chính: DIỄN ĐÀN KINH TẾ DI SẢN / HERITAGE ECONOMY FORUM
 * Slogan: "Di sản kiến tạo giá trị – Phát triển hướng tương lai"
 * Tối ưu hóa LCP với Next.js Image priority
 */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Sparkles, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HefIcon } from "@/components/icons";
import { FadeIn, AnimatedCounter } from "@/components/animations";
import type { HomeHero as HomeHeroType } from "../types/home.types";

interface HomeHeroProps {
  hero: HomeHeroType;
}

export function HomeHero({ hero }: HomeHeroProps) {
  return (
    <section className="relative overflow-hidden bg-radial-[at_top] from-[#76232D] via-[#52181F] to-[#1F1416] text-white py-14 sm:py-20 px-4 sm:px-8 border-b-4 border-[#C29B57]">
      {/* Pattern Họa Tiết Nền Trống Đồng Mờ */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C29B57_1.5px,transparent_1.5px)] [background-size:28px_28px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* CỘT TRÁI (DESKTOP) / XẾP DƯỚI (MOBILE): HEADLINE, SLOGAN, MÔ TẢ & 2 CTA */}
          <FadeIn
            direction="right"
            duration={0.6}
            className="lg:col-span-7 space-y-6 text-center lg:text-left order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C29B57]/20 border border-[#C29B57]/50 text-[#C29B57] text-xs font-bold tracking-widest uppercase backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{hero.badgeText}</span>
            </div>

            <div>
              <p className="text-xs sm:text-sm font-semibold tracking-wider text-white/70 uppercase">
                {hero.title}
              </p>
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-serif font-extrabold text-[#F5EFE5] leading-[1.15] tracking-tight mt-1 max-w-xl text-balance">
                {hero.vietnameseTitle}
              </h1>
            </div>

            <div className="border-l-4 border-[#C29B57] pl-4 py-2 mx-auto lg:mx-0 max-w-xl text-left bg-white/10 rounded-r-xl backdrop-blur-xs">
              <p className="text-lg sm:text-xl font-serif font-bold text-[#C29B57] italic">
                &ldquo;{hero.slogan}&rdquo;
              </p>
            </div>

            <p className="text-sm sm:text-base text-white/85 max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed">
              {hero.description}
            </p>

            {/* 2 TUYẾN CTA: Khám phá diễn đàn & Đăng ký tham dự */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href={hero.primaryCta.href} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#C29B57] hover:bg-[#a98342] text-[#292929] font-bold border border-white/20 shadow-lg cursor-pointer px-6 h-11"
                >
                  <HefIcon name="Compass" size="sm" variant="charcoal" />
                  <span className="ml-2">{hero.primaryCta.label}</span>
                </Button>
              </Link>

              <Link href={hero.secondaryCta.href} className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-[#F5EFE5] hover:bg-white text-[#76232D] hover:text-[#52181F] border border-[#C29B57]/60 font-bold cursor-pointer px-6 shadow-md h-11 transition-all"
                >
                  <Calendar className="w-4 h-4 mr-2 text-[#76232D]" />
                  <span>{hero.secondaryCta.label}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 text-[#76232D]" />
                </Button>
              </Link>
            </div>

            {/* Micro Metrics nhanh */}
            <div className="pt-4 border-t border-white/15 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <span className="block text-xl sm:text-2xl font-serif font-bold text-[#C29B57]">
                  <AnimatedCounter to={500} suffix="+" />
                </span>
                <span className="text-[11px] text-white/70">Đại biểu dự kiến</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-serif font-bold text-[#C29B57]">
                  <AnimatedCounter to={4} prefix="0" />
                </span>
                <span className="text-[11px] text-white/70">Phiên chuyên đề</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-serif font-bold text-[#C29B57]">
                  <AnimatedCounter to={30} suffix="+" />
                </span>
                <span className="text-[11px] text-white/70">Mô hình di sản</span>
              </div>
            </div>
          </FadeIn>

          {/* CỘT PHẢI (DESKTOP) / PHÍA TRÊN 16:9 (MOBILE): ẢNH DI SẢN TỐI ƯU LCP */}
          <FadeIn direction="left" duration={0.6} className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#C29B57]/60 shadow-2xl bg-black/40">
              <Image
                src={hero.imageUrl}
                alt={hero.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 550px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Tag nổi bật dưới ảnh */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#C29B57] block flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Địa điểm chính thức
                  </span>
                  <span className="text-xs sm:text-sm font-semibold truncate block">
                    Hoàng thành Thăng Long, Hà Nội
                  </span>
                </div>
                <Badge className="bg-[#76232D] text-white text-[10px] border border-[#C29B57]/50 shrink-0">
                  <Users className="w-3 h-3 mr-1" /> Kỳ 2026
                </Badge>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
