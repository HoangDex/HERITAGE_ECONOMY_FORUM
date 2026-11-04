import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, Share2, Tag, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatVietnameseDate } from "@/lib/format-date";
import type { NewsItem } from "../types/news.types";

interface NewsDetailViewProps {
  article: NewsItem;
  relatedArticles: NewsItem[];
}

export function NewsDetailView({ article, relatedArticles }: NewsDetailViewProps) {
  return (
    <article className="py-10 sm:py-14 space-y-10">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        {/* Breadcrumb / Back button */}
        <div className="mb-6">
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#76232D] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại Tin tức & Nghiên cứu
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-3">
              <Badge className="bg-[#76232D] text-white text-xs font-medium">
                {article.categoryName}
              </Badge>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#292929] leading-tight tracking-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#5c554b] pt-2 pb-4 border-b border-[#dfd7c8]">
                <span>
                  Tác giả: <strong className="text-[#292929]">{article.author.name}</strong>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#C29B57]" />
                  {formatVietnameseDate(article.publishedAt)}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readingMinutes} phút đọc
                </span>
              </div>
            </div>

            {/* Sapo */}
            <p className="text-base sm:text-lg font-medium text-[#292929] bg-[#F5EFE5] p-5 rounded-2xl border-l-4 border-[#76232D] leading-relaxed">
              {article.sapo}
            </p>

            {/* Cover Image */}
            <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-[#dfd7c8]/40 shadow-xs">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>

            {/* Body */}
            <div className="prose prose-neutral max-w-none text-[#292929] leading-relaxed text-sm sm:text-base space-y-4">
              <div
                className="whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, "<br/>") }}
              />
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="pt-6 border-t border-[#dfd7c8] flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-[#76232D]" />
                <span className="text-xs font-semibold text-[#5c554b]">Chủ đề:</span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 bg-white border border-[#dfd7c8] rounded-md text-[#292929]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Author Box */}
            <div className="p-6 bg-white rounded-2xl border border-[#dfd7c8] shadow-xs space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#76232D] block">
                Thông tin tác giả
              </span>
              <h3 className="font-bold text-[#292929] text-base">{article.author.name}</h3>
              <p className="text-xs text-[#76232D] font-medium">{article.author.title}</p>
              {article.author.organization && (
                <p className="text-xs text-[#5c554b]">{article.author.organization}</p>
              )}
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="p-6 bg-white rounded-2xl border border-[#dfd7c8] shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-[#76232D] font-bold text-sm uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Bài viết cùng chuyên mục</span>
                </div>

                <div className="space-y-4 divide-y divide-[#dfd7c8]/60">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/tin-tuc/${rel.slug}`}
                      className="block pt-3 first:pt-0 group"
                    >
                      <h4 className="text-xs sm:text-sm font-bold text-[#292929] group-hover:text-[#76232D] transition-colors line-clamp-2 leading-snug">
                        {rel.title}
                      </h4>
                      <span className="text-[11px] text-[#5c554b] mt-1 block">
                        {formatVietnameseDate(rel.publishedAt)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share and Action */}
            <div className="p-6 bg-[#F5EFE5] rounded-2xl border border-[#dfd7c8] space-y-3 text-center">
              <h4 className="font-bold text-[#292929] text-sm">Chia sẻ bài viết</h4>
              <p className="text-xs text-[#5c554b]">
                Lan tỏa tri thức và nhận thức cộng đồng về phát triển kinh tế di sản.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-[#76232D] text-[#76232D] hover:bg-[#76232D]/10 gap-1.5 w-full text-xs font-medium"
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Đã sao chép liên kết bài viết!");
                  }
                }}
              >
                <Share2 className="w-3.5 h-3.5" />
                Sao chép liên kết
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
