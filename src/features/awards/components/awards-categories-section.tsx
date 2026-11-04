"use client";

import {
  Sparkles,
  Landmark,
  Cpu,
  Building2,
  Users,
  Shield,
  Award,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/animations";
import type { AwardCategory } from "../types/awards.types";

interface AwardsCategoriesSectionProps {
  categories: AwardCategory[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  Landmark,
  Cpu,
  Building2,
  Users,
  Shield,
  Award,
  HeartHandshake,
};

export function AwardsCategoriesSection({ categories }: AwardsCategoriesSectionProps) {
  return (
    <section id="hang-muc" className="py-14 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl space-y-8">
        <FadeIn direction="up" className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#76232D]/10 text-[#76232D]">
            Cơ Cấu Giải Thưởng
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#292929] tracking-tight">
            08 Hạng Mục Xét Chọn Tham Khảo
          </h2>
          <p className="text-[#5c554b] max-w-3xl text-base">
            Bao quát toàn diện các khía cạnh từ sáng kiến khoa học, mô hình kinh doanh di sản, ứng
            dụng công nghệ, đóng góp cộng đồng cho tới thành tựu cống hiến trọn đời.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = ICON_MAP[cat.iconName] || Award;
            return (
              <StaggerItem key={cat.id}>
                <InteractiveCard className="h-full">
                  <Card className="border border-[#dfd7c8] bg-white shadow-xs hover:shadow-md transition-all hover:border-[#76232D] flex flex-col justify-between group h-full">
                    <CardHeader className="space-y-3 pb-3">
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 rounded-xl bg-[#76232D]/10 text-[#76232D] group-hover:bg-[#76232D] group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <Badge
                          variant="outline"
                          className="border-[#C29B57] text-[#76232D] text-xs font-semibold"
                        >
                          Hạng mục 0{cat.order}
                        </Badge>
                      </div>

                      <CardTitle className="text-base sm:text-lg font-bold text-[#292929] leading-snug group-hover:text-[#76232D] transition-colors">
                        {cat.title}
                      </CardTitle>
                      <p className="text-xs font-medium text-[#76232D] leading-relaxed">
                        {cat.subtitle}
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-3 pt-0">
                      <p className="text-xs text-[#5c554b] leading-relaxed">{cat.description}</p>

                      <div className="pt-3 border-t border-[#dfd7c8]/60">
                        <span className="text-[11px] font-semibold text-[#5c554b] uppercase tracking-wider block">
                          Đối tượng trọng tâm:
                        </span>
                        <span className="text-xs font-medium text-[#292929] flex items-center gap-1.5 mt-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C29B57] shrink-0" />
                          {cat.targetAudience}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </InteractiveCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
