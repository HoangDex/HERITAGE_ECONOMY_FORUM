import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatVietnameseDate } from "@/lib/format-date";
import type { NewsItem } from "../types/news.types";

interface NewsTopStoryProps {
  featured: NewsItem;
  topSide: NewsItem[];
}

export function NewsTopStory({ featured, topSide }: NewsTopStoryProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 1 bài nổi bật lớn bên trái (7 cols) */}
      <div className="lg:col-span-7">
        <Link href={`/tin-tuc/${featured.slug}`} className="group block h-full">
          <div className="bg-white rounded-2xl border border-[#dfd7c8] overflow-hidden shadow-xs hover:shadow-md transition-all h-full flex flex-col justify-between">
            <div className="relative aspect-16/9 w-full bg-[#dfd7c8]/40 overflow-hidden">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                priority
                className="object-cover group-hover:scale-103 transition-transform duration-300"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-[#76232D] text-white font-semibold">
                  {featured.categoryName}
                </Badge>
              </div>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
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

                <h2 className="text-xl sm:text-2xl font-bold text-[#292929] group-hover:text-[#76232D] transition-colors leading-snug">
                  {featured.title}
                </h2>

                <p className="text-sm text-[#5c554b] line-clamp-3 leading-relaxed">
                  {featured.sapo}
                </p>
              </div>

              <div className="pt-4 border-t border-[#dfd7c8]/60 flex items-center justify-between text-xs font-semibold text-[#76232D]">
                <span>Tác giả: {featured.author.name}</span>
                <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Đọc toàn văn <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* 3 bài nhỏ bên phải (5 cols) */}
      <div className="lg:col-span-5 flex flex-col justify-between gap-4">
        {topSide.map((article) => (
          <Link key={article.id} href={`/tin-tuc/${article.slug}`} className="group block">
            <div className="bg-white p-4 rounded-xl border border-[#dfd7c8] shadow-2xs hover:shadow-xs hover:border-[#76232D] transition-all flex gap-4">
              <div className="relative w-28 sm:w-32 aspect-4/3 rounded-lg overflow-hidden shrink-0 bg-[#dfd7c8]/40">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="128px"
                />
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <Badge
                  variant="outline"
                  className="border-[#C29B57] text-[#76232D] text-[10px] font-semibold px-2 py-0"
                >
                  {article.categoryName}
                </Badge>
                <h3 className="text-sm font-bold text-[#292929] group-hover:text-[#76232D] transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 text-[11px] text-[#5c554b]">
                  <span>{formatVietnameseDate(article.publishedAt)}</span>
                  <span>•</span>
                  <span>{article.readingMinutes}p</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
