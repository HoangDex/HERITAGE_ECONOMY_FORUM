import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatVietnameseDate } from "@/lib/format-date";
import type { NewsItem } from "../types/news.types";

interface NewsTopStoryProps {
  featured: NewsItem;
  topSide: NewsItem[];
}

export function NewsTopStory({ featured, topSide }: NewsTopStoryProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* 1 bài nổi bật lớn bên trái (7 cols) */}
      <div className="lg:col-span-7">
        <Link href={`/news/${featured.slug}`} className="group block">
          <div className="bg-white rounded-2xl border border-[#dfd7c8] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col">
            {/* Ảnh bìa bài nổi bật */}
            <div className="relative aspect-16/9 w-full bg-[#dfd7c8]/40 overflow-hidden">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                priority
                className="object-cover group-hover:scale-103 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-[#0D4838] text-white font-semibold shadow-xs">
                  {featured.categoryName}
                </Badge>
              </div>
            </div>

            {/* Nội dung bài nổi bật */}
            <div className="p-5 sm:p-6 space-y-3.5">
              <div className="flex items-center gap-3 text-xs text-[#5c554b]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#C29B57]" />
                  {formatVietnameseDate(featured.publishedAt)}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featured.readingMinutes} phút đọc
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#292929] group-hover:text-[#0D4838] transition-colors leading-snug">
                {featured.title}
              </h2>

              <p className="text-sm text-[#5c554b] line-clamp-3 leading-relaxed">{featured.sapo}</p>

              {/* Tags từ khóa */}
              {featured.tags && featured.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-[#0D4838]/5 text-[#0D4838] text-[11px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Tác giả & Link đọc toàn văn */}
              <div className="pt-3.5 border-t border-[#dfd7c8]/70 flex items-center justify-between text-xs font-semibold text-[#0D4838]">
                <span className="flex items-center gap-1.5 text-[#5c554b]">
                  <User className="w-3.5 h-3.5 text-[#C29B57]" />
                  <span>{featured.author.name}</span>
                </span>
                <span className="inline-flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform">
                  Đọc toàn văn <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* 4 bài nhỏ bên phải (5 cols) - Khoảng cách đều đặn, không bị giãn xa */}
      <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-3.5">
        {topSide.map((article) => (
          <Link key={article.id} href={`/news/${article.slug}`} className="group block">
            <div className="bg-white p-3.5 rounded-xl border border-[#dfd7c8] shadow-2xs hover:shadow-xs hover:border-[#0D4838] transition-all flex gap-3.5 items-start">
              {/* Ảnh thu nhỏ tỉ lệ 4/3 */}
              <div className="relative w-24 sm:w-28 aspect-4/3 rounded-lg overflow-hidden shrink-0 bg-[#dfd7c8]/40 border border-[#dfd7c8]/50">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="120px"
                />
              </div>

              {/* Chi tiết bài viết */}
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <Badge
                    variant="outline"
                    className="border-[#C29B57]/60 text-[#0D4838] text-[10px] font-semibold px-2 py-0"
                  >
                    {article.categoryName}
                  </Badge>
                  <span className="text-[10px] text-[#5c554b] shrink-0">
                    {formatVietnameseDate(article.publishedAt)}
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-serif font-bold text-[#292929] group-hover:text-[#0D4838] transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h3>

                {article.sapo && (
                  <p className="text-[11px] text-[#5c554b] line-clamp-1 leading-normal">
                    {article.sapo}
                  </p>
                )}

                <div className="flex items-center gap-2 text-[10px] text-[#8C6D32] font-medium pt-0.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {article.readingMinutes} phút đọc
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
