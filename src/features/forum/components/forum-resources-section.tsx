"use client";

import { FileText, Download, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/animations";
import type { ForumResource } from "../types/forum-edition.types";

interface ForumResourcesSectionProps {
  resources: ForumResource[];
}

export function ForumResourcesSection({ resources }: ForumResourcesSectionProps) {
  return (
    <section id="tai-lieu" className="py-12 bg-white/70 border-t border-[#dfd7c8] scroll-mt-28">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl space-y-8">
        <FadeIn direction="up" className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#C29B57]/15 text-[#76232D]">
            Thư Viện & Kết Quả
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#292929] tracking-tight">
            Kỷ Yếu Khoa Học & Tài Liệu Xuất Bản
          </h2>
          <p className="text-[#5c554b] max-w-3xl text-base">
            Các văn bản, báo cáo kết quả và tham luận đã được Hội đồng Diễn đàn và Ban Thư ký thẩm
            định, cấp phép phát hành phục vụ công tác tra cứu học thuật.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {resources.map((res) => (
            <StaggerItem key={res.id}>
              <InteractiveCard className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#dfd7c8] shadow-2xs hover:border-[#76232D] transition-colors gap-4">
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="p-3 bg-[#76232D]/10 rounded-lg text-[#76232D] shrink-0 mt-0.5">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="text-[10px] font-semibold uppercase border-[#C29B57] text-[#76232D] px-2 py-0"
                      >
                        {res.type.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-[#5c554b]">{res.fileSize}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#292929] line-clamp-2 leading-snug">
                      {res.title}
                    </h3>
                  </div>
                </div>

                <div className="shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#76232D] text-[#76232D] hover:bg-[#76232D]/10 gap-1.5 font-medium cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Tải về</span>
                  </Button>
                </div>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn
          direction="up"
          delay={0.2}
          className="p-4 rounded-xl bg-[#F5EFE5] border border-[#dfd7c8] flex items-center gap-3 text-xs text-[#5c554b]"
        >
          <ShieldCheck className="w-5 h-5 text-[#76232D] shrink-0" />
          <span>
            Toàn bộ tài liệu được số hóa tuân thủ theo Giấy phép Bản quyền Xuất bản & Nghị quyết của
            Hội đồng Diễn đàn Kinh tế Di sản 2026.
          </span>
        </FadeIn>
      </div>
    </section>
  );
}
