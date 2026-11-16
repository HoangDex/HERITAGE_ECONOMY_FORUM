/**
 * COMPONENT: SPEAKER DETAIL DIALOG (HỒ SƠ CHI TIẾT DIỄN GIẢ DIỄN ĐÀN)
 * Hiển thị chân dung 4:5, chức danh, đơn vị, phiên tham gia và tóm tắt bài nói theo đúng PRD
 */

"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Building, Calendar, MessageSquareQuote, User, ExternalLink } from "lucide-react";
import type { Speaker } from "../types/forum-edition.types";

interface SpeakerDetailDialogProps {
  speaker: Speaker | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SpeakerDetailDialog({ speaker, isOpen, onClose }: SpeakerDetailDialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !speaker) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="speaker-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FDFBF7] border border-[#C29B57]/50 shadow-2xl rounded-2xl overflow-hidden p-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Đóng cửa sổ"
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#132A24] border border-[#dfd7c8] shadow-xs transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Nội dung hồ sơ diễn giả */}
        <div className="flex flex-col sm:flex-row">
          {/* Cột ảnh chân dung 4:5 */}
          <div className="relative w-full sm:w-56 aspect-[4/5] sm:aspect-auto shrink-0 bg-[#0D4838]/10 overflow-hidden min-h-[260px]">
            <Image
              src={speaker.avatarUrl}
              alt={`Chân dung ${speaker.name}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 240px"
            />
            {speaker.degree && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-[#0D4838] text-white font-bold text-xs px-2.5 py-0.5 shadow-sm">
                  {speaker.degree}
                </Badge>
              </div>
            )}
          </div>

          {/* Cột thông tin chi tiết */}
          <div className="p-6 sm:p-7 flex-1 space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase font-bold text-[#C29B57] bg-[#C29B57]/10 px-2.5 py-0.5 rounded-full mb-2">
                <User className="w-3 h-3 text-[#C29B57]" />
                <span>Diễn giả chính thức</span>
              </div>
              <h3
                id="speaker-dialog-title"
                className="text-xl sm:text-2xl font-serif font-bold text-[#0D4838] leading-tight"
              >
                {speaker.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#132A24] mt-0.5">
                {speaker.title}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-[#5c554b] mt-1">
                <Building className="w-3.5 h-3.5 text-[#C29B57] shrink-0" />
                <span className="line-clamp-2">{speaker.organization}</span>
              </div>
            </div>

            {/* Phiên tham gia */}
            {speaker.sessionTitle && (
              <div className="p-3 bg-white rounded-xl border border-[#dfd7c8] space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0D4838]">
                  <Calendar className="w-3.5 h-3.5 text-[#C29B57]" />
                  <span>Phiên tham gia: {speaker.sessionTitle}</span>
                </div>
              </div>
            )}

            {/* Chủ đề và tóm tắt bài nói */}
            <div className="space-y-1.5 p-3.5 bg-white rounded-xl border border-[#dfd7c8]">
              <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#0D4838]">
                <MessageSquareQuote className="w-4 h-4 text-[#C29B57] shrink-0" />
                <span>Chủ đề tham luận</span>
              </div>
              <p className="text-xs text-[#132A24] font-medium leading-relaxed italic">
                “{speaker.topicSummary}”
              </p>
            </div>

            {/* Tiểu sử tóm tắt */}
            {speaker.bio && (
              <div className="space-y-1">
                <h4 className="text-[11px] font-mono uppercase font-bold tracking-wider text-[#736a5c]">
                  Tiểu sử & Kinh nghiệm
                </h4>
                <p className="text-xs text-[#4A5E57] leading-relaxed line-clamp-3">{speaker.bio}</p>
              </div>
            )}

            {/* Điều hướng xem hồ sơ chi tiết */}
            <div className="pt-2 flex items-center justify-between border-t border-[#dfd7c8]">
              <Link
                href={`/dien-gia/${speaker.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D4838] hover:text-[#C29B57] transition-colors"
              >
                <span>Hồ sơ chuyên gia chi tiết</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="border-[#dfd7c8] hover:bg-[#eae5d9] text-xs h-8 px-3 cursor-pointer"
              >
                Đóng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
