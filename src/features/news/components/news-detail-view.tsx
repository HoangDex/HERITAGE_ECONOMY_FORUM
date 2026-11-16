/**
 * COMPONENT: TRANG ĐỌC TIN TỨC CHUYÊN SÂU (2-COLUMN EDITORIAL READER)
 * Bố cục:
 * - Cột bên trái (8 - 8.5 cols): Khung bài báo chính với độ rộng (width) mở rộng tối đa, typography di sản sắc nét.
 * - Cột bên phải (3.5 - 4 cols): Danh sách "Tin Tức & Nghiên Cứu Khác" (bấm vào là chuyển sang bài tương ứng).
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  Tag,
  Check,
  ChevronRight,
  ShieldCheck,
  Printer,
  Sparkles,
  Layers,
  Newspaper,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatVietnameseDate } from "@/lib/format-date";
import type { NewsItem } from "../types/news.types";

interface NewsDetailViewProps {
  article: NewsItem;
  relatedArticles: NewsItem[];
  allArticles?: NewsItem[];
  prevArticle?: NewsItem | null;
  nextArticle?: NewsItem | null;
}

/**
 * Helper parse nội dung bài viết sang Typography học thuật chuẩn mực
 */
function renderArticleContent(content: string) {
  if (!content) return null;

  const blocks = content.trim().split(/\n\s*\n/);

  return blocks.map((block, idx) => {
    const trimmed = block.trim();

    // Tiêu đề H2 (##)
    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={idx}
          className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#0D4838] pt-6 pb-2.5 border-b border-[#DFD8C8] flex items-center gap-2.5"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#C29B57] shrink-0" />
          <span>{trimmed.replace(/^##\s+/, "")}</span>
        </h2>
      );
    }

    // Tiêu đề H3 (###)
    if (trimmed.startsWith("### ")) {
      return (
        <h3 key={idx} className="text-lg sm:text-xl font-serif font-bold text-[#132A24] pt-4 pb-1">
          {trimmed.replace(/^###\s+/, "")}
        </h3>
      );
    }

    // Khối trích dẫn danh ngôn / Blockquote (>)
    if (trimmed.startsWith("> ")) {
      const quoteText = trimmed.replace(/^>\s+/, "");
      return (
        <blockquote
          key={idx}
          className="my-6 p-6 sm:p-7 rounded-2xl bg-[#F7F5EE] border-l-4 border-[#C29B57] text-[#0D4838] italic font-serif text-base sm:text-lg lg:text-xl leading-relaxed shadow-2xs space-y-2"
        >
          <p>
            &ldquo;
            {quoteText
              .replace(/—\s*\*(.*?)\*/g, "")
              .replace(/^"/, "")
              .replace(/"$/, "")}
            &rdquo;
          </p>
          {quoteText.includes("—") && (
            <footer className="text-xs sm:text-sm font-sans font-bold text-[#8C6D32] not-italic text-right pt-1">
              {quoteText.slice(quoteText.indexOf("—"))}
            </footer>
          )}
        </blockquote>
      );
    }

    // Danh sách có thứ tự (1. , 2. ...)
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = trimmed.split(/\n(?=\d+\.\s+)/);
      return (
        <ol key={idx} className="space-y-4 my-5 pl-1">
          {items.map((item, itemIdx) => {
            const cleanItem = item.replace(/^\d+\.\s+/, "");
            const parts = cleanItem.split(/(\*\*.*?\*\*)/g);
            return (
              <li
                key={itemIdx}
                className="flex items-start gap-3.5 text-base sm:text-lg text-[#2E433C] leading-relaxed"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0D4838] text-white font-bold text-xs shrink-0 mt-0.5 shadow-2xs">
                  {itemIdx + 1}
                </span>
                <span className="flex-1">
                  {parts.map((p, pIdx) => {
                    if (p.startsWith("**") && p.endsWith("**")) {
                      return (
                        <strong key={pIdx} className="font-bold text-[#0D4838]">
                          {p.slice(2, -2)}
                        </strong>
                      );
                    }
                    return p;
                  })}
                </span>
              </li>
            );
          })}
        </ol>
      );
    }

    // Đoạn văn thông thường có hỗ trợ bôi đậm **...**
    const parts = trimmed.split(/(\*\*.*?\*\*)/g);
    return (
      <p
        key={idx}
        className="text-base sm:text-lg text-[#2E433C] leading-relaxed text-justify space-y-1"
      >
        {parts.map((p, pIdx) => {
          if (p.startsWith("**") && p.endsWith("**")) {
            return (
              <strong key={pIdx} className="font-bold text-[#132A24]">
                {p.slice(2, -2)}
              </strong>
            );
          }
          return p;
        })}
      </p>
    );
  });
}

export function NewsDetailView({
  article,
  relatedArticles,
  allArticles = [],
  prevArticle,
  nextArticle,
}: NewsDetailViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Danh sách các tin tức đầy đủ
  const fullArticlesList = allArticles.length > 0 ? allArticles : [article, ...relatedArticles];

  return (
    <div className="py-8 sm:py-14 bg-[#F7F5EE]/60 min-h-screen">
      {/* Khung mở rộng Container toàn trang (Ultrawide) */}
      <div className="w-full max-w-[1780px] 2xl:max-w-[1880px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-6">
        {/* ======================================================== */}
        {/* THANH ĐIỀU HƯỚNG NHANH TRÊN ĐỈNH (TOP BREADCRUMB)        */}
        {/* ======================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#DFD8C8]">
          <div className="flex items-center gap-2 text-xs text-[#5C6E67]">
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 font-bold text-[#0D4838] hover:text-[#073327] hover:underline transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Trung Tâm Tin Tức & Nghiên Cứu</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#DFD8C8]" />
            <span className="font-semibold text-[#8C6D32] truncate max-w-[200px] sm:max-w-[320px]">
              {article.categoryName}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#DFD8C8] hidden sm:inline" />
            <span className="text-[#5C6E67] truncate max-w-[240px] hidden sm:inline">
              {article.title}
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="h-8 px-3 text-xs font-semibold border-[#DFD8C8] bg-white hover:bg-[#F7F5EE] text-[#0D4838] gap-1.5 cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Đã sao chép</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#C29B57]" />
                  <span>Chia sẻ bài viết</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="h-8 px-3 text-xs font-semibold border-[#DFD8C8] bg-white hover:bg-[#F7F5EE] text-[#5C6E67] gap-1.5 cursor-pointer shadow-2xs hidden sm:inline-flex"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In trang</span>
            </Button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* BỐ CỤC 2 CỘT: TRÁI LÀ BÀI BÁO RỘNG | PHẢI LÀ CÁC BÀI KHÁC */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
          {/* ====================================================== */}
          {/* CỘT TRÁI (8 - 8.5 COLS): BÀI BÁO VỚI WIDTH MỞ RỘNG     */}
          {/* ====================================================== */}
          <main className="lg:col-span-8 xl:col-span-8 2xl:col-span-8.5">
            <article className="bg-white rounded-3xl border-2 border-[#DFD8C8] shadow-xl p-6 sm:p-10 lg:p-12 xl:p-14 space-y-8">
              {/* Header bài viết: Chuyên mục & Tiêu đề lớn */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-[#0D4838] text-white text-xs font-bold px-3.5 py-1 border border-[#C29B57]/40 shadow-xs">
                    <Sparkles className="w-3 h-3 text-[#C29B57] mr-1.5" />
                    {article.categoryName}
                  </Badge>
                  {article.isFeatured && (
                    <Badge
                      variant="outline"
                      className="border-[#C29B57] text-[#8C6D32] text-xs font-bold px-3 py-1 bg-[#C29B57]/10"
                    >
                      Nghiên cứu tiêu điểm
                    </Badge>
                  )}
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-serif font-bold text-[#0D4838] leading-[1.2] tracking-tight">
                  {article.title}
                </h1>

                {/* Thông tin tác giả & Thời gian xuất bản */}
                <div className="pt-3 pb-5 border-y border-[#DFD8C8]/80 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-[#4A5E57]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#0D4838]/10 border border-[#C29B57]/50 flex items-center justify-center font-serif font-bold text-[#0D4838] text-base shrink-0 shadow-2xs">
                      {article.author.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-[#0D4838] flex items-center gap-1.5 text-sm sm:text-base">
                        <span>{article.author.name}</span>
                        <ShieldCheck className="w-4 h-4 text-[#C29B57]" />
                      </div>
                      <div className="text-xs text-[#5C6E67]">
                        {article.author.title} • {article.author.organization || "HEF"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#5C6E67] font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#C29B57]" />
                      {formatVietnameseDate(article.publishedAt)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-emerald-700" />
                      {article.readingMinutes} phút đọc
                    </span>
                  </div>
                </div>
              </div>

              {/* Đoạn Sapo mở đầu */}
              {article.sapo && (
                <div className="p-6 sm:p-7 rounded-2xl bg-[#F7F5EE] border-l-4 border-[#0D4838] shadow-2xs">
                  <p className="text-base sm:text-lg lg:text-xl font-medium text-[#132A24] leading-relaxed italic">
                    {article.sapo}
                  </p>
                </div>
              )}

              {/* Ảnh bìa bài viết mở rộng (Full Width Image) */}
              <div className="space-y-2">
                <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-[#DFD8C8]/40 border border-[#DFD8C8] shadow-sm">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 1200px"
                  />
                </div>
                <p className="text-center text-xs text-[#5C6E67] italic pt-1">
                  Ảnh tư liệu minh họa: Báo cáo Khoa học & Tư liệu Di sản HEF
                </p>
              </div>

              {/* Nội dung toàn văn bài nghiên cứu / tin tức */}
              <div className="pt-4 border-t border-[#DFD8C8]/60 space-y-6">
                {renderArticleContent(article.content)}
              </div>

              {/* Danh sách Tags chủ đề */}
              {article.tags && article.tags.length > 0 && (
                <div className="pt-6 border-t border-[#DFD8C8] flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0D4838] mr-1">
                    <Tag className="w-4 h-4 text-[#C29B57]" />
                    <span>Chủ đề nghiên cứu:</span>
                  </div>
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3.5 py-1.5 bg-[#F7F5EE] border border-[#DFD8C8] hover:border-[#0D4838] rounded-full text-[#0D4838] font-semibold transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Điều hướng 2 chiều: Bài trước ↔ Bài tiếp theo */}
              {(prevArticle || nextArticle) && (
                <div className="pt-6 border-t border-[#DFD8C8] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {prevArticle ? (
                    <Link
                      href={`/news/${prevArticle.slug}`}
                      className="group p-4 rounded-2xl bg-[#F7F5EE]/70 hover:bg-[#F7F5EE] border border-[#DFD8C8] hover:border-[#0D4838] transition-all flex items-center gap-3.5 shadow-2xs"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#DFD8C8] group-hover:border-[#0D4838] flex items-center justify-center shrink-0 text-[#0D4838] shadow-2xs group-hover:-translate-x-1 transition-transform">
                        <ArrowLeft className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold text-[#8C6D32] uppercase tracking-wider block">
                          ← Bài trước đó
                        </span>
                        <h4 className="text-xs sm:text-sm font-serif font-bold text-[#132A24] group-hover:text-[#0D4838] transition-colors truncate">
                          {prevArticle.title}
                        </h4>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {nextArticle ? (
                    <Link
                      href={`/news/${nextArticle.slug}`}
                      className="group p-4 rounded-2xl bg-[#F7F5EE]/70 hover:bg-[#F7F5EE] border border-[#DFD8C8] hover:border-[#0D4838] transition-all flex items-center justify-end text-right gap-3.5 shadow-2xs"
                    >
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold text-[#8C6D32] uppercase tracking-wider block">
                          Bài tiếp theo →
                        </span>
                        <h4 className="text-xs sm:text-sm font-serif font-bold text-[#132A24] group-hover:text-[#0D4838] transition-colors truncate">
                          {nextArticle.title}
                        </h4>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#DFD8C8] group-hover:border-[#0D4838] flex items-center justify-center shrink-0 text-[#0D4838] shadow-2xs group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              )}

              {/* Khối hộp tác giả & bản quyền học thuật */}
              <div className="p-6 rounded-2xl bg-[#F7F5EE]/80 border border-[#DFD8C8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D32] block">
                    Cơ quan chủ quản & Bản quyền học thuật
                  </span>
                  <h4 className="font-serif font-bold text-base text-[#0D4838]">
                    {article.author.organization || "Diễn đàn Kinh tế Di sản (HEF)"}
                  </h4>
                  <p className="text-xs text-[#5C6E67]">
                    Mọi trích dẫn khoa học xin vui lòng ghi rõ nguồn và tác giả theo quy chuẩn quốc
                    tế.
                  </p>
                </div>

                <Button
                  size="sm"
                  onClick={handleCopyLink}
                  className="bg-[#0D4838] hover:bg-[#073327] text-white text-xs font-bold border border-[#C29B57]/40 shrink-0 cursor-pointer"
                >
                  {copied ? "Đã chép link" : "Trích dẫn bài viết"}
                </Button>
              </div>
            </article>
          </main>

          {/* ====================================================== */}
          {/* CỘT PHẢI (3.5 - 4 COLS): CÁC BÀI TIN TỨC KHÁC (STICKY)  */}
          {/* ====================================================== */}
          <aside className="lg:col-span-4 xl:col-span-4 2xl:col-span-3.5 space-y-6 lg:sticky lg:top-24">
            {/* Header danh sách tin tức khác */}
            <div className="p-5 rounded-2xl bg-white border border-[#DFD8C8] shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#DFD8C8]/80">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#0D4838]/10 flex items-center justify-center text-[#0D4838]">
                    <Layers className="w-4 h-4 text-[#C29B57]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#0D4838]">
                      Tin Tức & Nghiên Cứu Khác
                    </h3>
                    <p className="text-[11px] text-[#5C6E67]">
                      Bấm vào bài viết để chuyển đọc ngay
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0D4838] text-white">
                  {fullArticlesList.length} bài
                </span>
              </div>

              {/* Danh sách thẻ bài viết dạng cuộn dọc mượt mà */}
              <div className="space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {fullArticlesList.map((item) => {
                  const isCurrent = item.slug === article.slug;
                  return (
                    <Link
                      key={item.id}
                      href={`/news/${item.slug}`}
                      className={`group block p-3 rounded-xl border transition-all ${
                        isCurrent
                          ? "bg-[#0D4838]/8 border-[#0D4838] shadow-xs ring-1 ring-[#0D4838]/20"
                          : "bg-[#F7F5EE]/60 hover:bg-[#F7F5EE] border-[#DFD8C8] hover:border-[#0D4838] shadow-2xs hover:shadow-xs"
                      }`}
                    >
                      <div className="flex gap-3 items-start">
                        {/* Ảnh thu nhỏ */}
                        <div className="relative w-20 h-16 sm:w-22 sm:h-18 rounded-lg overflow-hidden shrink-0 bg-[#DFD8C8]/40 border border-[#DFD8C8]/60">
                          <Image
                            src={item.coverImage}
                            alt={item.title}
                            fill
                            sizes="90px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {isCurrent && (
                            <div className="absolute inset-0 bg-[#0D4838]/30 flex items-center justify-center">
                              <span className="px-1.5 py-0.5 rounded-sm bg-[#0D4838] text-white text-[8px] font-bold">
                                Đang đọc
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Thông tin nhanh */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={`text-[10px] font-bold truncate ${
                                isCurrent ? "text-[#0D4838]" : "text-[#8C6D32]"
                              }`}
                            >
                              {item.categoryName}
                            </span>
                            <span className="text-[10px] text-[#5C6E67] shrink-0">
                              {item.readingMinutes}p
                            </span>
                          </div>

                          <h4
                            className={`text-xs sm:text-sm font-serif font-bold line-clamp-2 leading-snug transition-colors ${
                              isCurrent
                                ? "text-[#0D4838]"
                                : "text-[#132A24] group-hover:text-[#0D4838]"
                            }`}
                          >
                            {item.title}
                          </h4>

                          <div className="flex items-center gap-1.5 text-[10px] text-[#5C6E67] pt-0.5">
                            <Calendar className="w-3 h-3 text-[#C29B57]" />
                            <span>{formatVietnameseDate(item.publishedAt)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Nút quay về toàn bộ danh mục */}
              <div className="pt-2 border-t border-[#DFD8C8]/80 text-center">
                <Link
                  href="/news"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D4838] hover:text-[#073327] hover:underline"
                >
                  <Newspaper className="w-3.5 h-3.5 text-[#C29B57]" />
                  <span>Xem toàn bộ thư viện tin tức →</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
