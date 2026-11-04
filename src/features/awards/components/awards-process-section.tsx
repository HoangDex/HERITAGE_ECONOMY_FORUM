"use client";

import { ArrowRight, Clock } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/animations";
import type { AwardProcessStep } from "../types/awards.types";

interface AwardsProcessSectionProps {
  steps: AwardProcessStep[];
}

export function AwardsProcessSection({ steps }: AwardsProcessSectionProps) {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl space-y-8">
        <FadeIn direction="up" className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#76232D]/10 text-[#76232D]">
            Quy Trình Xét Chọn
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#292929] tracking-tight">
            Sơ Đồ 07 Bước Đánh Giá Minh Bạch
          </h2>
          <p className="text-[#5c554b] max-w-3xl text-base">
            Quy trình khép kín đảm bảo tính độc lập, khách quan từ khâu tiếp nhận hồ sơ, thẩm định
            chuyên ngành, khảo sát thực tế đến công bố vinh danh.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {steps.map((st, idx) => (
            <StaggerItem key={st.step}>
              <InteractiveCard className="p-5 rounded-2xl bg-white border border-[#dfd7c8] shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-3 relative group h-full">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-full bg-[#76232D] text-white flex items-center justify-center font-bold text-sm">
                      0{st.step}
                    </div>
                    {idx < steps.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-[#dfd7c8] hidden xl:block" />
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#76232D] font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{st.timeframe}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#292929] leading-snug">{st.title}</h3>

                  <p className="text-xs text-[#5c554b] leading-relaxed">{st.description}</p>
                </div>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
