/**
 * COMPONENT: HỘI ĐỒNG DIỄN ĐÀN (MỤC 6.2)
 * Wireframe Desktop: Chủ tịch nổi bật; cấp dưới lưới 3-4 cột
 * Wireframe Mobile: Card 2 cột; nhấn mở hồ sơ chi tiết
 * Điều hướng CTA: Xem Hội đồng -> /gioi-thieu/hoi-dong
 */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, ArrowRight, BookOpen, Building2, Eye, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HefIcon } from "@/components/icons";
import type { Person } from "../types/about.types";

interface CouncilSectionProps {
  president: Person;
  vicePresidents: Person[];
  councilMembers: Person[];
  scientificAdvisors: Person[];
  onOpenPersonModal: (person: Person) => void;
  showFullViewLink?: boolean;
}

export function CouncilSection({
  president,
  vicePresidents,
  councilMembers,
  scientificAdvisors,
  onOpenPersonModal,
  showFullViewLink = true,
}: CouncilSectionProps) {
  return (
    <section
      id="council"
      className="py-12 sm:py-16 bg-muted/30 border-y border-border scroll-mt-28"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        {/* Tiêu Đề Mục 6.2 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C29B57]/15 text-[#C29B57] text-xs font-semibold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Mục 6.2 • Cơ Cấu Lãnh Đạo Học Thuật</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#76232D] dark:text-[#F5EFE5]">
              Hội Đồng Diễn Đàn
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
              Hội đồng quy tụ các nhà khoa học, chuyên gia bảo tồn hàng đầu và đại diện cơ quan văn
              hóa uy tín, chịu trách nhiệm định hướng học thuật và thẩm định nội dung.
            </p>
          </div>

          {showFullViewLink && (
            <Link href="/gioi-thieu/hoi-dong" className="shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="border-[#C29B57] text-[#76232D] dark:text-[#C29B57] hover:bg-[#C29B57]/10"
              >
                <span>Xem toàn bộ Hội đồng</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          )}
        </div>

        {/* 1. CHỦ TỊCH HỘI ĐỒNG (Thẻ lớn nổi bật) */}
        <div className="mb-12">
          <div className="relative rounded-2xl bg-card border-2 border-[#C29B57] shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="absolute top-0 right-0 bg-[#76232D] text-[#C29B57] px-4 py-1.5 rounded-bl-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
              <HefIcon name="Crown" size="xs" variant="gold" />
              <span>Chủ Tịch Hội Đồng</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center">
              {/* Ảnh chân dung 4:5 */}
              <div className="md:col-span-4 flex justify-center">
                <div
                  onClick={() => onOpenPersonModal(president)}
                  className="group relative w-full max-w-[280px] aspect-[4/5] rounded-xl overflow-hidden border-2 border-[#C29B57]/60 shadow-lg cursor-pointer bg-muted"
                >
                  <Image
                    src={president.avatarUrl}
                    alt={president.altText}
                    fill
                    sizes="(max-width: 768px) 280px, 320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                    <span className="text-xs text-white bg-[#76232D]/90 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-[#C29B57]/50">
                      <Eye className="w-3.5 h-3.5 text-[#C29B57]" /> Bấm xem hồ sơ đầy đủ
                    </span>
                  </div>
                </div>
              </div>

              {/* Thông tin Chủ tịch */}
              <div className="md:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-[#76232D] text-white font-semibold">
                    {president.academicTitle}
                  </Badge>
                  <Badge variant="outline" className="border-[#C29B57] text-[#C29B57]">
                    <ShieldCheck className="w-3 h-3 mr-1" /> Đã xác nhận bổ nhiệm
                  </Badge>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#76232D] dark:text-[#F5EFE5]">
                    {president.fullName}
                  </h3>
                  <p className="text-base font-semibold text-foreground/90 mt-1">
                    {president.positionTitle}
                  </p>
                </div>

                <div className="space-y-1.5 text-sm text-muted-foreground border-y border-border/80 py-3">
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-[#C29B57] shrink-0 mt-0.5" />
                    <span>
                      <strong>Đơn vị:</strong> {president.organization}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-[#C29B57] shrink-0 mt-0.5" />
                    <span>
                      <strong>Lĩnh vực:</strong> {president.expertiseField}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-foreground/80 leading-relaxed text-justify line-clamp-3">
                  {president.bio}
                </p>

                {president.papers && president.papers.length > 0 && (
                  <div className="pt-1">
                    <div className="text-xs font-semibold text-[#76232D] dark:text-[#C29B57] flex items-center gap-1.5 mb-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Tham luận tiêu biểu:</span>
                    </div>
                    <p className="text-xs italic text-muted-foreground bg-muted/60 p-2.5 rounded-lg border border-border/60">
                      &ldquo;{president.papers[0]}&rdquo;
                    </p>
                  </div>
                )}

                <div className="pt-2 flex gap-3">
                  <Button
                    onClick={() => onOpenPersonModal(president)}
                    size="sm"
                    className="bg-[#76232D] hover:bg-[#5e1c24] text-white border border-[#C29B57]/40 shadow-xs"
                  >
                    Xem tiểu sử & công trình
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. CẤP DƯỚI: PHÓ CHỦ TỊCH, THÀNH VIÊN & CỐ VẤN KHOA HỌC */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-5 w-1 bg-[#C29B57] rounded-full" />
              <h3 className="text-lg sm:text-xl font-serif font-bold text-foreground">
                Phó Chủ Tịch, Ủy Viên Hội Đồng & Cố Vấn Khoa Học
              </h3>
            </div>

            {/* Lưới 3-4 cột Desktop | 2 cột Mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...vicePresidents, ...councilMembers, ...scientificAdvisors].map((person) => (
                <div
                  key={person.id}
                  onClick={() => onOpenPersonModal(person)}
                  className="group relative bg-card rounded-xl border border-border hover:border-[#C29B57] p-3 sm:p-4 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Ảnh chân dung tỉ lệ 4:5 */}
                    <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-muted mb-3 border border-border">
                      <Image
                        src={person.avatarUrl}
                        alt={person.altText}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge
                          variant="secondary"
                          className="bg-[#76232D]/90 text-white text-[10px] sm:text-xs font-semibold backdrop-blur-xs px-2 py-0.5 border border-[#C29B57]/30"
                        >
                          {person.academicTitle}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[11px] text-white bg-black/60 px-2.5 py-1 rounded-full flex items-center gap-1">
                          <Eye className="w-3 h-3 text-[#C29B57]" /> Xem hồ sơ
                        </span>
                      </div>
                    </div>

                    {/* Tên & Chức danh */}
                    <div className="space-y-1">
                      <h4 className="text-sm sm:text-base font-serif font-bold text-foreground group-hover:text-[#76232D] dark:group-hover:text-[#C29B57] transition-colors line-clamp-1">
                        {person.fullName}
                      </h4>
                      <p className="text-xs font-medium text-[#C29B57] line-clamp-2 leading-tight">
                        {person.positionTitle}
                      </p>
                    </div>

                    {/* Đơn vị công tác */}
                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-2 line-clamp-2 leading-snug">
                      {person.organization}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="truncate max-w-[120px]">{person.expertiseField}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C29B57] group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
