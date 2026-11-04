import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatVietnameseDate } from "@/lib/format-date";
import type { NewsItem } from "../types/news.types";

interface NewsArticleCardProps {
  article: NewsItem;
}

export function NewsArticleCard({ article }: NewsArticleCardProps) {
  return (
    <Link href={`/tin-tuc/${article.slug}`} className="group block h-full">
      <Card className="border border-[#dfd7c8] bg-white overflow-hidden shadow-xs hover:shadow-md transition-all h-full flex flex-col justify-between hover:border-[#76232D]">
        <div>
          <div className="relative aspect-16/10 w-full bg-[#dfd7c8]/40 overflow-hidden">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-103 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-3 left-3">
              <Badge className="bg-[#76232D] text-white text-[11px] font-medium shadow-xs">
                {article.categoryName}
              </Badge>
            </div>
          </div>

          <CardContent className="p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-xs text-[#5c554b]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#C29B57]" />
                {formatVietnameseDate(article.publishedAt)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readingMinutes}p
              </span>
            </div>

            <h3 className="text-base font-bold text-[#292929] group-hover:text-[#76232D] transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h3>

            <p className="text-xs text-[#5c554b] line-clamp-2 leading-relaxed">{article.sapo}</p>
          </CardContent>
        </div>

        <div className="p-5 pt-0 border-t border-[#dfd7c8]/50 flex items-center justify-between text-xs font-semibold text-[#76232D] mt-2">
          <span className="truncate max-w-[140px] text-[#5c554b] font-normal">
            {article.author.name}
          </span>
          <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
            Xem bài <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
