"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FadeIn, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/animations";
import { NewsTopStory } from "./news-top-story";
import { NewsArticleCard } from "./news-article-card";
import type { NewsPageData } from "../types/news.types";

interface NewsPageViewProps {
  data: NewsPageData;
}

export function NewsPageView({ data }: NewsPageViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = data.latestArticles.filter((article) => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.sapo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10 sm:py-14 space-y-12">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl space-y-8">
        {/* Header Section */}
        <FadeIn direction="up" className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#76232D]/10 text-[#76232D]">
            Trung Tâm Tri Thức & Truyền Thông
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#292929] tracking-tight">
            Tin Tức, Nghiên Cứu & Góc Nhìn Chuyên Gia
          </h1>
          <p className="text-[#5c554b] max-w-3xl text-base sm:text-lg">
            Cập nhật hoạt động, nghiên cứu, quan điểm chuyên gia và những mô hình thực tiễn góp phần
            làm rõ vai trò của di sản trong phát triển kinh tế, văn hóa và xã hội.
          </p>
        </FadeIn>

        {/* Top Story Section */}
        <NewsTopStory featured={data.featuredArticle} topSide={data.topSideArticles} />

        {/* Filter and Search Bar */}
        <div className="pt-6 border-t border-[#dfd7c8] space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Category Chips */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-[#76232D] text-white shadow-xs"
                    : "bg-white text-[#5c554b] border border-[#dfd7c8] hover:border-[#76232D]"
                }`}
              >
                Tất cả chuyên mục
              </button>
              {data.categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat.slug
                      ? "bg-[#76232D] text-white shadow-xs"
                      : "bg-white text-[#5c554b] border border-[#dfd7c8] hover:border-[#76232D]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72 shrink-0">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#5c554b]" />
              <Input
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white border-[#dfd7c8] text-xs h-9"
              />
            </div>
          </div>

          {/* 3-Column Articles Grid */}
          {filteredArticles.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {filteredArticles.map((article) => (
                <StaggerItem key={article.id}>
                  <InteractiveCard className="h-full">
                    <NewsArticleCard article={article} />
                  </InteractiveCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#dfd7c8] text-[#5c554b] text-sm">
              Không tìm thấy bài viết nào phù hợp với từ khóa hoặc chuyên mục đã chọn.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
