/**
 * COMPONENT: FORUM HERO (BANNER KỲ DIỄN ĐÀN THEO ĐÚNG WIREFRAME PRD)
 * Thể hiện tên, chủ đề, thời gian, địa điểm, quy mô, bộ chọn năm và cảnh báo xác nhận lịch
 */

"use client";

import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  Building,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/animations";
import type { ForumEdition } from "../types/forum-edition.types";

interface ForumHeroProps {
  edition: ForumEdition;
}

export function ForumHero({ edition }: ForumHeroProps) {
  const isConcluded = edition.status === "concluded";

  return (
    <section className="relative overflow-hidden bg-radial-[at_top] from-[#0D4838]/15 via-[#F7F5EE] to-[#F7F5EE] border-b border-[#dfd7c8] py-12 sm:py-16">
      {/* Background Hoa Văn Tinh Tế */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#0D4838_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-8 max-w-6xl relative z-10">
        <FadeIn direction="up" className="max-w-3xl space-y-5">
          {/* Hàng trên: Huy hiệu kỳ diễn đàn 2026 & Badge trạng thái */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge className="bg-[#0D4838] text-white text-xs font-semibold px-3.5 py-1 rounded-full">
              Kỳ 2026 • Kế hoạch
            </Badge>

            {/* Trạng thái xác nhận lịch của kỳ 2026 */}
            {!edition.isDateConfirmed ? (
              <Badge
                variant="outline"
                className="bg-amber-50/80 border-amber-300 text-amber-800 text-[11px] font-semibold gap-1.5 py-1 px-2.5"
              >
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Lịch dự kiến (Chờ xác nhận chính thức)</span>
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="bg-emerald-50 border-emerald-300 text-emerald-800 text-[11px] font-semibold gap-1.5 py-1 px-2.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Lịch chính thức đã phê duyệt</span>
              </Badge>
            )}
          </div>

          {/* Tên kỳ Diễn đàn */}
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#132A24] tracking-tight leading-tight">
            {edition.title}
          </h1>

          {/* Chủ đề chính */}
          <p className="text-lg sm:text-xl font-serif font-medium text-[#0D4838] italic">
            “{edition.theme}”
          </p>

          {/* Cảnh báo ghi chú kế hoạch 18/11/2026 theo đúng PRD */}
          {!edition.isDateConfirmed && (
            <div className="p-3 bg-white/80 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2 max-w-2xl">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Lưu ý:</strong> Mốc ngày 18/11/2026 là kế hoạch công tác được trao đổi gần
                đây giữa các cơ quan thường trực. Ban Tổ Chức sẽ công bố thông cáo chính thức ngay
                sau khi hoàn tất thủ tục phê duyệt hành chính.
              </span>
            </div>
          )}

          {/* Khối thông số nhanh tinh gọn (Quick Info Pills) */}
          <div className="flex flex-wrap gap-2.5 pt-1 text-xs">
            <div className="inline-flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-[#dfd7c8] shadow-2xs text-[#132A24] font-medium">
              <Calendar className="w-4 h-4 text-[#C29B57] shrink-0" />
              <span>{edition.datesText}</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-[#dfd7c8] shadow-2xs text-[#132A24] font-medium">
              <MapPin className="w-4 h-4 text-[#C29B57] shrink-0" />
              <span>{edition.venueName}</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-[#dfd7c8] shadow-2xs text-[#132A24] font-medium">
              <Users className="w-4 h-4 text-[#C29B57] shrink-0" />
              <span>{edition.scaleDescription}</span>
            </div>

            <div className="inline-flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-[#dfd7c8] shadow-2xs text-[#132A24] font-medium">
              <Building className="w-4 h-4 text-[#C29B57] shrink-0" />
              <span>{edition.organizer}</span>
            </div>
          </div>

          {/* Nút hành động chính (Wireframe Mobile: Full width, Desktop: Inline) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
            {!isConcluded ? (
              <Link
                href="/contact?loai=tham-du#contact-form"
                className={cn(
                  buttonVariants({ size: "default" }),
                  "w-full sm:w-auto bg-[#0D4838] hover:bg-[#073327] text-white gap-2 shadow-sm font-semibold h-11 px-6 justify-center cursor-pointer"
                )}
              >
                <span>Đăng ký tham dự</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <a
                href="#ket-qua"
                className={cn(
                  buttonVariants({ size: "default" }),
                  "w-full sm:w-auto bg-[#0D4838] hover:bg-[#073327] text-white gap-2 shadow-sm font-semibold h-11 px-6 justify-center cursor-pointer"
                )}
              >
                <span>Xem kết quả kỳ {edition.year}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}

            <a
              href="#timeline"
              className={cn(
                buttonVariants({ size: "default", variant: "outline" }),
                "w-full sm:w-auto border-[#0D4838] text-[#0D4838] hover:bg-[#0D4838]/10 font-semibold h-11 px-5 justify-center cursor-pointer"
              )}
            >
              Xem chương trình
            </a>

            <a
              href="#tai-lieu"
              className={cn(
                buttonVariants({ size: "default", variant: "ghost" }),
                "w-full sm:w-auto text-[#5c554b] hover:text-[#0D4838] font-medium h-11 px-4 justify-center cursor-pointer"
              )}
            >
              Tải tài liệu
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
