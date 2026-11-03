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
import {
  Briefcase,
  ArrowRight,
  Mail,
  Phone,
  Layers,
  CheckCircle,
  Eye,
  Building,
} from "lucide-react";
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
              <Briefcase className="w-3.5 h-3.5" />
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
                className="border-[#76232D] text-[#76232D] dark:text-[#C29B57] hover:bg-[#76232D]/10"
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
            className="group relative bg-card rounded-2xl border-2 border-[#76232D] p-5 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-[#76232D] text-white text-xs font-semibold">TRƯỞNG BAN</Badge>
                <span className="text-[11px] text-[#C29B57] font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Thường trực
                </span>
              </div>

              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-muted mb-4 border border-border">
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

              <h4 className="text-xl font-serif font-bold text-[#76232D] dark:text-[#F5EFE5] group-hover:text-[#C29B57] transition-colors">
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
              className="group relative bg-card rounded-2xl border border-border hover:border-[#C29B57] p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    variant="outline"
                    className="border-[#C29B57] text-[#C29B57] text-xs font-semibold"
                  >
                    PHÓ TRƯỞNG BAN
                  </Badge>
                  <span className="text-[11px] text-muted-foreground">Đã bổ nhiệm</span>
                </div>

                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-muted mb-4 border border-border">
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

                <h4 className="text-lg font-serif font-bold text-foreground group-hover:text-[#76232D] dark:group-hover:text-[#C29B57] transition-colors">
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

        {/* 2. SƠ ĐỒ CƠ CẤU 6 BỘ PHẬN CHỨC NĂNG & THÔNG TIN LIÊN HỆ */}
        <div className="rounded-2xl bg-card border-2 border-border shadow-md overflow-hidden">
          <div className="bg-muted/60 p-4 sm:p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-[#76232D] dark:text-[#C29B57]" />
              <h3 className="text-base sm:text-lg font-serif font-bold text-foreground">
                Cơ Cấu 6 Nhóm Chuyên Trách & Đầu Mối Liên Hệ
              </h3>
            </div>
            <span className="text-xs text-muted-foreground">
              Chọn nhóm để xem mô tả nhiệm vụ & nhân sự
            </span>
          </div>

          {/* Thanh chuyển Tab 6 bộ phận */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-b border-border bg-muted/20">
            {departments.map((dept) => {
              const isSelected = dept.id === selectedDeptId;
              return (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDeptId(dept.id)}
                  className={`p-3 text-xs font-semibold text-center transition-colors border-r border-b lg:border-b-0 border-border cursor-pointer ${
                    isSelected
                      ? "bg-[#76232D] text-white font-bold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {dept.name}
                </button>
              );
            })}
          </div>

          {/* Chi tiết bộ phận được chọn */}
          {activeDept && (
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Thông tin nhiệm vụ & liên hệ */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C29B57]/15 text-[#C29B57] text-xs font-bold uppercase">
                    <Building className="w-3.5 h-3.5" />
                    <span>Bộ phận chuyên trách</span>
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-[#76232D] dark:text-[#F5EFE5]">
                    {activeDept.name}
                  </h4>
                  <div className="bg-muted/40 p-4 rounded-xl border border-border">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Mô tả nhiệm vụ trọng tâm:
                    </h5>
                    <p className="text-sm text-foreground/90 leading-relaxed text-justify">
                      {activeDept.mission}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#C29B57]">
                      Đầu mối liên hệ trực tiếp:
                    </h5>
                    <div className="flex flex-wrap gap-4 text-xs">
                      <a
                        href={`mailto:${activeDept.contactEmail}`}
                        className="flex items-center gap-1.5 text-primary hover:underline bg-muted px-3 py-1.5 rounded-lg border border-border"
                      >
                        <Mail className="w-3.5 h-3.5 text-primary" />
                        <span>{activeDept.contactEmail}</span>
                      </a>
                      <a
                        href={`tel:${activeDept.contactPhone}`}
                        className="flex items-center gap-1.5 text-foreground hover:underline bg-muted px-3 py-1.5 rounded-lg border border-border"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#C29B57]" />
                        <span>{activeDept.contactPhone}</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Danh sách nhân sự phụ trách nhóm */}
                <div className="lg:col-span-6">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center justify-between">
                    <span>Nhân sự phụ trách ({activeDept.members.length})</span>
                    <span className="text-[11px] text-[#C29B57]">Bấm để xem hồ sơ</span>
                  </h5>

                  {activeDept.members.length === 0 ? (
                    <div className="p-6 rounded-xl border border-dashed border-border text-center text-xs text-muted-foreground">
                      Đang hoàn thiện cập nhật danh sách nhân sự bộ phận theo quyết định phê duyệt
                      mới.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeDept.members.map((member) => (
                        <div
                          key={member.id}
                          onClick={() => onOpenPersonModal(member)}
                          className="group bg-muted/30 hover:bg-muted p-3.5 rounded-xl border border-border hover:border-[#C29B57] transition-all cursor-pointer flex gap-3 items-center"
                        >
                          <div className="relative w-16 h-20 rounded-lg overflow-hidden shrink-0 border border-border bg-muted">
                            <Image
                              src={member.avatarUrl}
                              alt={member.altText}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                          <div className="space-y-0.5 overflow-hidden">
                            <span className="text-[10px] text-[#C29B57] font-semibold block">
                              {member.academicTitle}
                            </span>
                            <h6 className="text-sm font-serif font-bold text-foreground group-hover:text-[#76232D] transition-colors truncate">
                              {member.fullName}
                            </h6>
                            <p className="text-xs text-muted-foreground truncate">
                              {member.positionTitle}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
