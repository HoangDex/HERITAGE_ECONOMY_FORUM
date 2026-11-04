/**
 * COMPONENT: BAN ĐIỀU HÀNH & SƠ ĐỒ CƠ CẤU (MỤC 6.3)
 * Wireframe Desktop: Sơ đồ cơ cấu và thẻ nhân sự phân loại 6 bộ phận
 * Wireframe Mobile: Card 2 cột, tabs bộ phận, thông tin nhiệm vụ & liên hệ
 * Điều hướng CTA: Xem Ban Điều hành -> /gioi-thieu/ban-dieu-hanh
 */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, ArrowRight, Mail, Phone, Layers, CheckCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Person, ExecutiveDepartment } from "../types/about.types";

interface ExecutiveSectionProps {
  head: Person;
  deputies: Person[];
  departments: ExecutiveDepartment[];
  onOpenPersonModal: (person: Person) => void;
  showFullViewLink?: boolean;
}

export function ExecutiveSection({
  head,
  deputies,
  departments,
  onOpenPersonModal,
  showFullViewLink = true,
}: ExecutiveSectionProps) {
  const [selectedDeptId, setSelectedDeptId] = useState<string>(
    departments[0]?.id || "dept_academic"
  );
  const activeDept = departments.find((d) => d.id === selectedDeptId) || departments[0];

  return (
    <section id="executive" className="py-12 sm:py-16 scroll-mt-28">
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        {/* Tiêu Đề Mục 6.3 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#76232D]/10 text-[#76232D] dark:text-[#C29B57] text-xs font-semibold uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5 text-[#C29B57]" />
              <span>Mục 6.3 • Bộ Máy Vận Hành Chuyên Trách</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#76232D] dark:text-[#F5EFE5]">
              Ban Điều Hành Diễn Đàn
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
              Đội ngũ điều phối thường trực, triển khai chuyên sâu các chương trình nghị sự, giải
              thưởng, liên kết quốc tế và vận hành cổng thông tin số.
            </p>
          </div>

          {showFullViewLink && (
            <Link href="/gioi-thieu/ban-dieu-hanh" className="shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="border-[#76232D] text-[#76232D] hover:bg-[#76232D]/10 cursor-pointer"
              >
                <span>Xem sơ đồ & nhân sự</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          )}
        </div>

        {/* 1. LÃNH ĐẠO BAN ĐIỀU HÀNH (Trưởng ban & 2 Phó Trưởng ban) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* TRƯỞNG BAN */}
          <div
            onClick={() => onOpenPersonModal(head)}
            className="group relative bg-white dark:bg-card rounded-2xl border-2 border-[#76232D] p-5 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-[#76232D] text-white text-xs font-semibold">TRƯỞNG BAN</Badge>
                <span className="text-[11px] text-[#C29B57] font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Thường trực
                </span>
              </div>

              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-muted mb-4 border border-[#dfd7c8]">
                <Image
                  src={head.avatarUrl}
                  alt={head.altText}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs text-white bg-black/60 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#C29B57]" /> Xem hồ sơ
                  </span>
                </div>
              </div>

              <h4 className="text-xl font-serif font-bold text-[#76232D] group-hover:text-[#52181F] transition-colors">
                {head.fullName}
              </h4>
              <p className="text-xs font-semibold text-foreground/90 mt-1">{head.positionTitle}</p>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{head.organization}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-primary" /> {head.email}
              </span>
              <ArrowRight className="w-4 h-4 text-[#76232D] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 2 PHÓ TRƯỞNG BAN */}
          {deputies.map((deputy) => (
            <div
              key={deputy.id}
              onClick={() => onOpenPersonModal(deputy)}
              className="group relative bg-white dark:bg-card rounded-2xl border border-[#dfd7c8] hover:border-[#C29B57] p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    variant="outline"
                    className="border-[#C29B57] text-[#76232D] text-xs font-semibold bg-[#F5EFE5]/50"
                  >
                    PHÓ TRƯỞNG BAN
                  </Badge>
                  <span className="text-[11px] text-muted-foreground">Đã bổ nhiệm</span>
                </div>

                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-muted mb-4 border border-[#dfd7c8]">
                  <Image
                    src={deputy.avatarUrl}
                    alt={deputy.altText}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs text-white bg-black/60 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#C29B57]" /> Xem hồ sơ
                    </span>
                  </div>
                </div>

                <h4 className="text-lg font-serif font-bold text-foreground group-hover:text-[#76232D] transition-colors">
                  {deputy.fullName}
                </h4>
                <p className="text-xs font-semibold text-[#C29B57] mt-1 line-clamp-2">
                  {deputy.positionTitle}
                </p>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                  {deputy.organization}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-primary" /> {deputy.email}
                </span>
                <ArrowRight className="w-4 h-4 text-[#C29B57] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* 2. SƠ ĐỒ CƠ CẤU 6 BỘ PHẬN CHỨC NĂNG & THÔNG TIN LIÊN HỆ (BỐ CỤC MASTER-DETAIL GỌN GÀNG, KHÔNG THỪA) */}
        <div className="rounded-2xl bg-white border border-[#dfd7c8] shadow-sm overflow-hidden">
          {/* Header thanh gọn */}
          <div className="bg-[#F5EFE5]/70 p-4 sm:p-5 border-b border-[#dfd7c8] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-[#76232D]" />
              <div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#292929]">
                  Cơ Cấu 6 Nhóm Chuyên Trách & Đầu Mối Liên Hệ
                </h3>
                <p className="text-xs text-[#5c554b]">
                  Quy chế phân công nhiệm vụ và nhân sự thường trực Ban Điều hành
                </p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-[#76232D] bg-[#76232D]/10 px-2.5 py-1 rounded-full self-start sm:self-auto border border-[#76232D]/20">
              06 Bộ Phận Chức Năng
            </span>
          </div>

          {/* Master-Detail Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Cột Trái (4 Cột): Menu 6 Nhóm theo chiều dọc (Desktop) hoặc cuộn ngang (Mobile) */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#dfd7c8] bg-[#FDFBF7] p-2 sm:p-3 space-y-1 overflow-x-auto lg:overflow-x-visible flex lg:flex-col no-scrollbar">
              {departments.map((dept, idx) => {
                const isSelected = dept.id === selectedDeptId;
                return (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDeptId(dept.id)}
                    className={`w-full text-left p-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between shrink-0 cursor-pointer ${
                      isSelected
                        ? "bg-[#76232D] text-white shadow-sm font-bold"
                        : "text-[#5c554b] hover:bg-white hover:text-[#292929]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isSelected
                            ? "bg-[#C29B57] text-[#292929]"
                            : "bg-[#dfd7c8]/60 text-[#76232D]"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span>{dept.name}</span>
                    </div>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? "text-[#C29B57] translate-x-0.5" : "text-[#dfd7c8] opacity-50"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Cột Phải (8 Cột): Khối Nội Dung & Nhân Sự Gọn Gàng, Đầy Đặn */}
            {activeDept && (
              <div className="lg:col-span-8 p-5 sm:p-7 flex flex-col justify-between space-y-5 bg-white">
                <div>
                  {/* Top row: Badge + Title + Code */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#dfd7c8]/60">
                    <div>
                      <span className="text-[11px] font-bold text-[#C29B57] uppercase tracking-wider block">
                        Bộ phận chuyên trách
                      </span>
                      <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#76232D] mt-0.5">
                        {activeDept.name}
                      </h4>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-[#C29B57] text-[#76232D] text-[10px] font-mono px-2 py-0.5 bg-[#F5EFE5]/50"
                    >
                      MÃ: {activeDept.code}
                    </Badge>
                  </div>

                  {/* Mission Card */}
                  <div className="mt-4 p-4 rounded-xl bg-[#F5EFE5]/50 border-l-4 border-[#C29B57] border border-[#dfd7c8]/80 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#76232D] block">
                      Mô tả nhiệm vụ trọng tâm:
                    </span>
                    <p className="text-xs sm:text-sm text-[#292929] leading-relaxed">
                      {activeDept.mission}
                    </p>
                  </div>
                </div>

                {/* Row 2: Nhân sự phụ trách & Đầu mối liên hệ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Nhân sự phụ trách */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#5c554b] block">
                      Trưởng nhóm phụ trách:
                    </span>
                    {activeDept.members.length > 0 ? (
                      activeDept.members.map((member) => (
                        <div
                          key={member.id}
                          onClick={() => onOpenPersonModal(member)}
                          className="group bg-[#FDFBF7] hover:bg-white p-3 rounded-xl border border-[#dfd7c8] hover:border-[#C29B57] transition-all cursor-pointer flex gap-3 items-center shadow-2xs hover:shadow-xs"
                        >
                          <div className="relative w-12 h-15 rounded-lg overflow-hidden shrink-0 border border-[#dfd7c8] bg-muted">
                            <Image
                              src={member.avatarUrl}
                              alt={member.altText}
                              fill
                              sizes="50px"
                              className="object-cover"
                            />
                          </div>
                          <div className="space-y-0.5 min-w-0 flex-1">
                            <span className="text-[10px] text-[#C29B57] font-bold block">
                              {member.academicTitle}
                            </span>
                            <h5 className="text-xs sm:text-sm font-serif font-bold text-[#292929] group-hover:text-[#76232D] transition-colors truncate">
                              {member.fullName}
                            </h5>
                            <p className="text-[11px] text-[#5c554b] truncate">
                              {member.organization}
                            </p>
                          </div>
                          <Eye className="w-3.5 h-3.5 text-[#C29B57] group-hover:scale-110 transition-transform shrink-0" />
                        </div>
                      ))
                    ) : (
                      <div className="p-3 rounded-xl border border-dashed border-[#dfd7c8] text-xs text-[#5c554b]">
                        Đang cập nhật nhân sự bổ nhiệm.
                      </div>
                    )}
                  </div>

                  {/* Đầu mối liên hệ */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#5c554b] block">
                      Đầu mối liên hệ trực tiếp:
                    </span>
                    <div className="space-y-2">
                      <a
                        href={`mailto:${activeDept.contactEmail}`}
                        className="flex items-center gap-2 text-xs text-[#76232D] font-medium bg-[#FDFBF7] hover:bg-white p-2.5 rounded-xl border border-[#dfd7c8] hover:border-[#C29B57] transition-colors"
                      >
                        <div className="w-6 h-6 rounded-md bg-[#76232D]/10 text-[#76232D] flex items-center justify-center shrink-0">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <span className="truncate">{activeDept.contactEmail}</span>
                      </a>
                      <a
                        href={`tel:${activeDept.contactPhone}`}
                        className="flex items-center gap-2 text-xs text-[#292929] font-medium bg-[#FDFBF7] hover:bg-white p-2.5 rounded-xl border border-[#dfd7c8] hover:border-[#C29B57] transition-colors"
                      >
                        <div className="w-6 h-6 rounded-md bg-[#C29B57]/15 text-[#C29B57] flex items-center justify-center shrink-0">
                          <Phone className="w-3.5 h-3.5" />
                        </div>
                        <span className="truncate">{activeDept.contactPhone}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
