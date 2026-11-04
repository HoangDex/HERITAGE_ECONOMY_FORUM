"use client";

import { Suspense } from "react";
import { ContactForm } from "./contact-form";
import { ContactInfoSection } from "./contact-info-section";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations";
import type { ContactPageData } from "../types/contact.types";

interface ContactPageViewProps {
  data: ContactPageData;
}

export function ContactPageView({ data }: ContactPageViewProps) {
  return (
    <div className="py-10 sm:py-16 space-y-12">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl space-y-10">
        {/* Banner */}
        <FadeIn direction="up" className="space-y-3 max-w-3xl">
          <Badge className="bg-[#76232D] text-white">Cổng Tiếp Nhận Thông Tin</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#292929] tracking-tight">
            {data.title}
          </h1>
          <p className="text-lg sm:text-xl font-semibold text-[#76232D]">{data.slogan}</p>
          <p className="text-sm sm:text-base text-[#5c554b] leading-relaxed">{data.description}</p>
        </FadeIn>

        {/* 2-Column Grid (Desktop 12 cols: Left 5 cols, Right 7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <FadeIn direction="right" className="lg:col-span-5 order-2 lg:order-1">
            <ContactInfoSection info={data.info} faqs={data.faqs} />
          </FadeIn>

          <FadeIn direction="left" className="lg:col-span-7 order-1 lg:order-2">
            <Suspense
              fallback={
                <div className="p-8 text-center bg-white rounded-3xl border">
                  Đang tải biểu mẫu...
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
