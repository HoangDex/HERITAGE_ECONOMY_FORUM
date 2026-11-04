/**
 * COMPONENT: TIN TỨC & GÓC CHUYÊN GIA (1 BÀI NỔI BẬT + 3 BÀI MỚI)
 * Wireframe Desktop: Lưới bài 3 cột / Card nổi bật + danh sách
 * Wireframe Mobile: Card nổi bật trên, danh sách bên dưới
 */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Newspaper, ArrowRight, Calendar, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/animations";
import type { NewsArticle } from "../types/home.types";

interface NewsFeedSectionProps {
  featuredNews: NewsArticle[];
  latestNews: NewsArticle[];
}

export function NewsFeedSection({ featuredNews, latestNews }: NewsFeedSectionProps) {
  const mainFeatured = featuredNews[0];

  return (
    <section className="py-14 sm:py-20 bg-background border-b border-border">
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        <FadeIn
          direction="up"
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#76232D]/10 text-[#76232D] dark:text-[#C29B57] text-xs font-bold uppercase tracking-wider mb-2">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Góc Nhìn Học Thuật & Hoạt Động</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#76232D] dark:text-[#F5EFE5] leading-tight">
              Tin Tức & Phân Tích Chuyên Sâu
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              Cập nhật thông tin chính sách, kết quả nghiên cứu và góc nhìn đa chiều từ các chuyên
              gia hàng đầu.
            </p>
          </div>

          <Link href="/tin-tuc">
            <Button
              variant="outline"
              size="sm"
              className="border-[#76232D] text-[#76232D] dark:text-[#C29B57] hover:bg-[#76232D]/10 cursor-pointer"
            >
              <span>Xem tất cả tin tức & bài viết</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </FadeIn>

        {/* LƯỚI TIN TỨC: TRÁI 1 BÀI NỔI BẬT LỚN | PHẢI 3 BÀI MỚI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* BÀI NỔI BẬT LỚN (7 CỘT) */}
          {mainFeatured && (
            <FadeIn direction="right" className="lg:col-span-7">
              <InteractiveCard className="group bg-card rounded-2xl border-2 border-[#C29B57]/40 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative w-full aspect-[16/10] bg-muted overflow-hidden">
                    <Image
                      src={mainFeatured.thumbnailUrl}
                      alt={mainFeatured.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 650px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-[#76232D] text-white text-xs font-bold px-3 py-1 border border-[#C29B57]/50">
                        {mainFeatured.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#C29B57]" />{" "}
                        {mainFeatured.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" /> {mainFeatured.author}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground group-hover:text-[#76232D] dark:group-hover:text-[#C29B57] transition-colors leading-snug">
                      {mainFeatured.title}
                    </h3>

                    <p className="text-sm text-foreground/80 leading-relaxed text-justify line-clamp-3">
                      {mainFeatured.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <Link
                    href={`/tin-tuc/${mainFeatured.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#76232D] dark:text-[#C29B57] group-hover:underline cursor-pointer"
                  >
                    <span>Đọc toàn văn nghiên cứu</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </InteractiveCard>
            </FadeIn>
          )}

          {/* 3 BÀI MỚI (5 CỘT) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Bài Viết Mới Nhất
              </span>
              <span className="text-[11px] text-[#C29B57] flex items-center gap-1">
                <Clock className="w-3 h-3" /> Cập nhật liên tục
              </span>
            </div>

            <StaggerContainer className="space-y-4">
              {latestNews.map((article) => (
                <StaggerItem key={article.id}>
                  <Link href={`/tin-tuc/${article.slug}`} className="block cursor-pointer">
                    <InteractiveCard className="group bg-card rounded-xl border border-border hover:border-[#C29B57] p-3.5 sm:p-4 transition-all hover:shadow-md">
                      <div className="flex gap-4 items-start">
                        <div className="relative w-24 h-20 sm:w-28 sm:h-24 rounded-lg overflow-hidden bg-muted shrink-0 border border-border">
                          <Image
                            src={article.thumbnailUrl}
                            alt={article.title}
                            fill
                            sizes="110px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        <div className="space-y-1 overflow-hidden">
                          <Badge
                            variant="secondary"
                            className="text-[10px] font-semibold text-[#76232D] dark:text-[#C29B57] px-2 py-0"
                          >
                            {article.category}
                          </Badge>
                          <h4 className="text-xs sm:text-sm font-serif font-bold text-foreground group-hover:text-[#76232D] dark:group-hover:text-[#C29B57] transition-colors line-clamp-2 leading-snug">
                            {article.title}
                          </h4>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">
                            {article.summary}
                          </p>
                          <span className="text-[10px] text-muted-foreground block pt-1">
                            {article.publishedAt}
                          </span>
                        </div>
                      </div>
                    </InteractiveCard>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
