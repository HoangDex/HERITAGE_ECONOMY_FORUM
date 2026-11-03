/**
 * COMPONENT: MODAL CHI TIẾT HỒ SƠ NHÂN SỰ (PERSON DETAIL DIALOG)
 * Hiển thị toàn bộ chân dung tỉ lệ 4:5, học hàm học vị, tiểu sử và danh sách tham luận
 */

"use client";

import React from "react";
import Image from "next/image";
import {
  X,
  BookOpen,
  Building2,
  Briefcase,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HefIcon } from "@/components/icons";
import type { Person } from "../types/about.types";

interface PersonDetailDialogProps {
  person: Person | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PersonDetailDialog({ person, isOpen, onClose }: PersonDetailDialogProps) {
  if (!isOpen || !person) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="person-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-card border-2 border-[#C29B57]/40 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng Modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Đóng cửa sổ"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Cột Trái: Ảnh chân dung tỉ lệ 4:5 */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden border-2 border-[#C29B57]/50 shadow-md bg-muted">
              <Image
                src={person.avatarUrl}
                alt={person.altText || person.fullName}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover"
                priority
              />
              <div className="absolute top-2 left-2">
                <Badge className="bg-[#76232D] text-white border border-[#C29B57]/40">
                  {person.academicTitle}
                </Badge>
              </div>
            </div>

            <div className="w-full mt-3 flex items-center justify-between text-xs text-muted-foreground px-1">
              <span className="flex items-center gap-1 text-[#C29B57]">
                <ShieldCheck className="w-3.5 h-3.5" /> Hồ sơ đã xác nhận
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Cập nhật: {person.updatedAt}
              </span>
            </div>
          </div>

          {/* Cột Phải: Thông tin chi tiết */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <HefIcon name="Award" size="sm" variant="gold" />
                <span className="text-xs font-semibold tracking-wider uppercase text-[#C29B57]">
                  {person.councilRole ? "Hội đồng Diễn đàn" : "Ban Điều hành HEF"}
                </span>
              </div>
              <h2
                id="person-dialog-title"
                className="text-2xl sm:text-3xl font-bold font-serif text-[#76232D] dark:text-[#F5EFE5] leading-tight"
              >
                {person.fullName}
              </h2>
              <p className="text-sm font-semibold text-foreground/90 mt-1">
                {person.positionTitle}
              </p>
            </div>

            {/* Thông tin đơn vị & lĩnh vực */}
            <div className="space-y-2 text-sm bg-muted/50 p-3.5 rounded-lg border border-border">
              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-[#C29B57] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-muted-foreground block">Đơn vị công tác:</span>
                  <span className="font-medium">{person.organization}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Briefcase className="w-4 h-4 text-[#C29B57] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-muted-foreground block">Lĩnh vực chuyên môn:</span>
                  <span className="font-medium text-[#76232D] dark:text-[#C29B57]">
                    {person.expertiseField}
                  </span>
                </div>
              </div>

              {person.email && (
                <div className="flex items-center gap-2.5 pt-1">
                  <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                  <a
                    href={`mailto:${person.email}`}
                    className="text-xs text-primary hover:underline"
                  >
                    {person.email}
                  </a>
                </div>
              )}

              {person.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-xs">{person.phone}</span>
                </div>
              )}
            </div>

            {/* Tiểu sử */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Tiểu sử & Đóng góp
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed text-justify">
                {person.bio}
              </p>
            </div>

            {/* Tham luận & Công trình nghiên cứu liên quan */}
            {person.papers && person.papers.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#76232D] dark:text-[#C29B57] flex items-center gap-1.5 mb-2">
                  <BookOpen className="w-4 h-4" /> Tham luận & Đề tài liên quan (
                  {person.papers.length})
                </h3>
                <ul className="space-y-1.5">
                  {person.papers.map((paper, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-muted-foreground flex items-start gap-2 bg-background p-2 rounded border border-border/60"
                    >
                      <span className="w-4 h-4 rounded-full bg-[#C29B57]/20 text-[#C29B57] flex items-center justify-center shrink-0 font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="leading-tight italic text-foreground/90">{paper}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Nút đóng ở dưới cùng */}
        <div className="mt-6 pt-4 border-t border-border flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            Đóng cửa sổ
          </Button>
        </div>
      </div>
    </div>
  );
}
