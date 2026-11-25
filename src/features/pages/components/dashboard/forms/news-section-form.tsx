"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { BookOpen, Star, Newspaper, ChevronDown, ChevronUp } from "lucide-react";

interface NewsItem {
  id?: string;
  title?: string;
  slug?: string;
  category?: string;
  publishedAt?: string;
  author?: string;
  summary?: string;
  thumbnailUrl?: string;
}

interface NewsSectionFormProps {
  propsData: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

export function NewsSectionForm({ propsData, onChange }: NewsSectionFormProps) {
  const featuredNews = (propsData.featuredNews as NewsItem) || {};
  const latestNews = (Array.isArray(propsData.latestNews) ? propsData.latestNews : []) as NewsItem[];
  const [expandedNews, setExpandedNews] = useState<number | null>(0);

  const updateFeatured = (field: keyof NewsItem, value: string) => {
    onChange("featuredNews", {
      ...featuredNews,
      [field]: value,
    });
  };

  const updateLatest = (index: number, field: keyof NewsItem, value: string) => {
    const updated = [...latestNews];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange("latestNews", updated);
  };

  return (
    <div className="space-y-4">
      {/* NHÓM 1: TIÊU ĐỀ KHỐI TIN TỨC */}
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#0D4838] uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-[#C29B57]" />
          <span>Nhóm 1: Tiêu Đề Khối Tin Tức</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Tiêu Đề Khối Tin Tức</label>
            <Input
              value={String(propsData.title || "")}
              onChange={(e) => onChange("title", e.target.value)}
              placeholder="Tin Tức & Góc Chuyên Gia"
              className="h-9 text-xs bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Đường Dẫn Xem Tất Cả</label>
            <Input
              value={String(propsData.viewAllLink || "/news")}
              onChange={(e) => onChange("viewAllLink", e.target.value)}
              placeholder="/news"
              className="h-9 text-xs bg-white"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#292929] block mb-1">Tiêu Đề Phụ (Subtitle)</label>
          <Input
            value={String(propsData.subtitle || "")}
            onChange={(e) => onChange("subtitle", e.target.value)}
            placeholder="Thông tin hoạt động, nghiên cứu và quan điểm chính sách"
            className="h-9 text-xs bg-white"
          />
        </div>
      </div>

      {/* NHÓM 2: BÀI VIẾT NỔI BẬT LỚN (CỘT TRÁI) */}
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#76232D] uppercase tracking-wider">
          <Star className="w-4 h-4 text-[#C29B57]" />
          <span>Nhóm 2: Bài Viết Tiêu Điểm Lớn (Featured Article - 7 Cột)</span>
        </div>

        <div className="space-y-2.5">
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Tiêu Đề Bài Viết Tiêu Điểm</label>
            <Input
              value={String(featuredNews.title || "")}
              onChange={(e) => updateFeatured("title", e.target.value)}
              placeholder="Khung Thể Chế Đối Tác Công Tư (PPP)..."
              className="h-9 text-xs bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] font-bold text-[#292929] block mb-1">Chuyên Mục</label>
              <Input
                value={String(featuredNews.category || "")}
                onChange={(e) => updateFeatured("category", e.target.value)}
                placeholder="Chính Sách & Thể Chế"
                className="h-8 text-xs bg-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-[#292929] block mb-1">Tác Giả / Chuyên Gia</label>
              <Input
                value={String(featuredNews.author || "")}
                onChange={(e) => updateFeatured("author", e.target.value)}
                placeholder="GS.TS. Trần Quốc Vượng"
                className="h-8 text-xs bg-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-[#292929] block mb-1">Ngày Xuất Bản</label>
              <Input
                value={String(featuredNews.publishedAt || "")}
                onChange={(e) => updateFeatured("publishedAt", e.target.value)}
                placeholder="02/11/2026"
                className="h-8 text-xs bg-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Đường Dẫn Ảnh Bìa</label>
            <Input
              value={String(featuredNews.thumbnailUrl || "")}
              onChange={(e) => updateFeatured("thumbnailUrl", e.target.value)}
              placeholder="https://..."
              className="h-8 text-xs bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Tóm Tắt Bài Viết</label>
            <textarea
              rows={2}
              value={String(featuredNews.summary || "")}
              onChange={(e) => updateFeatured("summary", e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-[#dfd7c8] bg-white leading-relaxed"
              placeholder="Tóm tắt ngắn gọn nội dung tham luận..."
            />
          </div>
        </div>
      </div>

      {/* NHÓM 3: BÀI VIẾT MỚI TIẾP THEO (CỘT PHẢI) */}
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#0D4838] uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-[#C29B57]" />
            <span>Nhóm 3: Các Bài Viết Tiếp Theo ({latestNews.length} bài)</span>
          </div>
        </div>

        <div className="space-y-2">
          {latestNews.map((item, idx) => {
            const isExpanded = expandedNews === idx;
            return (
              <div
                key={String(item.id || idx)}
                className="rounded-xl border border-[#dfd7c8] bg-white overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setExpandedNews(isExpanded ? null : idx)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-[#FDFBF7] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[#F5EFE5] text-[#76232D] flex items-center justify-center font-bold text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-xs text-[#292929] line-clamp-1">
                      {item.title || `Bài viết ${idx + 1}`}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-stone-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-500" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-3 pt-0 border-t border-[#dfd7c8]/60 space-y-2 bg-[#FAF7F2]/40">
                    <div className="pt-2">
                      <label className="text-[11px] font-bold text-[#292929] block mb-1">
                        Tiêu Đề Bài Viết
                      </label>
                      <Input
                        value={String(item.title || "")}
                        onChange={(e) => updateLatest(idx, "title", e.target.value)}
                        placeholder="Tiêu đề..."
                        className="h-8 text-xs bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Chuyên Mục
                        </label>
                        <Input
                          value={String(item.category || "")}
                          onChange={(e) => updateLatest(idx, "category", e.target.value)}
                          placeholder="Nghiên Cứu & Dữ Liệu"
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Ngày Xuất Bản
                        </label>
                        <Input
                          value={String(item.publishedAt || "")}
                          onChange={(e) => updateLatest(idx, "publishedAt", e.target.value)}
                          placeholder="30/10/2026"
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Ảnh Thumbnail
                        </label>
                        <Input
                          value={String(item.thumbnailUrl || "")}
                          onChange={(e) => updateLatest(idx, "thumbnailUrl", e.target.value)}
                          placeholder="https://..."
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
