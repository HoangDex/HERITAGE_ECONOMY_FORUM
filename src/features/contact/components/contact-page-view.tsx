"use client";

import { Suspense, useState, useEffect } from "react";
import { ContactForm } from "./contact-form";
import { ContactInfoSection } from "./contact-info-section";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations";
import type { ContactPageData, ContactFormConfig } from "../types/contact.types";

interface ContactPageViewProps {
  data: ContactPageData;
}

export function ContactPageView({ data: initialData }: ContactPageViewProps) {
  const [data, setData] = useState<ContactPageData>(initialData);

  // Đồng bộ trực tiếp dữ liệu từ API GET /api/pages/contact
  useEffect(() => {
    let isMounted = true;
    async function fetchContactPageApi() {
      try {
        const res = await fetch("/api/pages/contact");
        if (!res.ok) return;
        const json = await res.json();
        const props = json?.data?.props;
        if (!isMounted || !props) return;

        const hero = props.hero || {};
        const info = props.info || {};
        const faq = props.faq || {};
        const form = props.form || {};
        const fields = form.fields || {};

        setData((prev) => ({
          badge: hero.badge ?? prev.badge,
          title: hero.title || prev.title,
          slogan: hero.quote || prev.slogan,
          description: hero.description || prev.description,
          info: {
            title: info.title || prev.info.title,
            address: info.address || prev.info.address,
            hotline: info.hotline || prev.info.hotline,
            email: info.email || prev.info.email,
            workingHours: info.workingHours || prev.info.workingHours,
          },
          faqTitle: faq.title || prev.faqTitle,
          faqs: Array.isArray(faq.questions) && faq.questions.length > 0 ? faq.questions : prev.faqs,
          form: {
            title: form.title || prev.form.title,
            description: form.description || prev.form.description,
            consentText: form.consentText || prev.form.consentText,
            submitLabel: form.submitLabel || prev.form.submitLabel,
            fields: {
              type: {
                label: fields.type?.label || prev.form.fields.type.label,
                options:
                  Array.isArray(fields.type?.options) && fields.type.options.length > 0
                    ? fields.type.options
                    : prev.form.fields.type.options,
              },
              fullName: fields.fullName || prev.form.fields.fullName,
              organization: fields.organization || prev.form.fields.organization,
              position: fields.position || prev.form.fields.position,
              phone: fields.phone || prev.form.fields.phone,
              email: fields.email || prev.form.fields.email,
              message: fields.message || prev.form.fields.message,
            },
          } as ContactFormConfig,
        }));
      } catch {
        // Giữ nguyên dữ liệu SSR nếu lỗi mạng
      }
    }
    fetchContactPageApi();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="py-10 sm:py-16 space-y-12">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl space-y-10">
        {/* Hero */}
        <FadeIn direction="up" className="space-y-3 max-w-3xl">
          {data.badge && <Badge className="bg-[#0D4838] text-white">{data.badge}</Badge>}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#292929] tracking-tight">
            {data.title}
          </h1>
          <p className="text-lg sm:text-xl font-semibold text-[#0D4838]">{data.slogan}</p>
          <p className="text-sm sm:text-base text-[#5c554b] leading-relaxed">{data.description}</p>
        </FadeIn>

        {/* 2-Column Grid (Desktop 12 cols: Left 5 cols, Right 7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <FadeIn direction="right" className="lg:col-span-5 order-2 lg:order-1">
            <ContactInfoSection info={data.info} faqTitle={data.faqTitle} faqs={data.faqs} />
          </FadeIn>

          <FadeIn direction="left" className="lg:col-span-7 order-1 lg:order-2">
            <Suspense
              fallback={
                <div className="p-8 text-center bg-white rounded-3xl border">
                  Đang tải biểu mẫu...
                </div>
              }
            >
              <ContactForm formConfig={data.form} />
            </Suspense>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
