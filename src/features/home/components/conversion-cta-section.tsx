/**
 * COMPONENT: KHỐI CHUYỂN ĐỔI CUỐI TRANG (CONVERSION CTA SECTION)
 * "CÙNG KIẾN TẠO GIÁ TRỊ DI SẢN" & BA TUYẾN CHUYỂN ĐỔI: THAM DỰ, ĐỀ CỬ, HỢP TÁC
 */

"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Award, Handshake, ArrowRight, Sparkles, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/animations";
import type { HomeConversionCta } from "../types/home.types";

interface ConversionCtaSectionProps {
  cta?: HomeConversionCta;
}

export function ConversionCtaSection({ cta }: ConversionCtaSectionProps) {
  const title = cta?.title || "Cùng Kiến Tạo Giá Trị Di Sản";
  const subtitle =
    cta?.subtitle ||
    "Mỗi sáng kiến, tham luận và nguồn lực của quý vị đều góp phần hồi sinh và phát huy bền vững kho tàng văn hóa di sản của dân tộc.";

  const defaultCards = [
    {
      title: "Đăng Ký Tham Dự Phiên Toàn Thể",
      description:
        "Trở thành đại biểu chính thức, kết nối cùng các chuyên gia hàng đầu và tiếp cận các báo cáo độc quyền.",
      ctaText: "Đăng ký tham dự",
      ctaLink: "/lien-he?loai=tham-du#contact-form",
      icon: Calendar,
      tag: "Tuyến 01 • Đại Biểu",
      btnClass: "bg-[#C29B57] hover:bg-[#a98342] text-[#292929]",
    },
    {
      title: "Nộp Hồ Sơ Đề Cử Giải Thưởng",
      description:
        "Gửi đề cử công trình kiến trúc, mô hình du lịch hoặc sáng kiến bảo tồn di sản xuất sắc vì cộng đồng.",
      ctaText: "Nộp hồ sơ đề cử",
      ctaLink: "/lien-he?loai=giai-thuong#contact-form",
      icon: Award,
      tag: "Tuyến 02 • Vinh Danh",
      btnClass: "bg-[#0D4838] hover:bg-[#073327] text-white border border-[#C29B57]",
    },
    {
      title: "Đối Tác Chiến Lược & Tài Trợ",
      description:
        "Cùng xây dựng các dự án bảo tồn thực địa, tài trợ chuỗi nghiên cứu khoa học hoặc đăng cai tổ chức tại địa phương.",
      ctaText: "Liên hệ hợp tác",
      ctaLink: "/lien-he?loai=hop-tac#contact-form",
      icon: Handshake,
      tag: "Tuyến 03 • Đồng Hành",
      btnClass: "bg-white/15 hover:bg-white/25 text-white border border-white/30",
    },
  ];

  const cardsToRender =
    cta?.cards && cta.cards.length > 0
      ? cta.cards.map((c, i) => ({
          title: c.title,
          description: c.description,
          ctaText: c.ctaText,
          ctaLink: c.ctaLink,
          icon: i === 0 ? Calendar : i === 1 ? Award : Handshake,
          tag: `Tuyến 0${i + 1}`,
          btnClass:
            i === 0
              ? "bg-[#C29B57] hover:bg-[#a98342] text-[#292929]"
              : i === 1
              ? "bg-[#0D4838] hover:bg-[#073327] text-white border border-[#C29B57]"
              : "bg-white/15 hover:bg-white/25 text-white border border-white/30",
        }))
      : defaultCards;

  return (
    <section className="py-16 sm:py-24 bg-radial-[at_top] from-[#0D4838] via-[#073327] to-[#041D16] text-white relative overflow-hidden">
      {/* Pattern nền trống đồng */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C29B57_1.5px,transparent_1.5px)] [background-size:28px_28px] pointer-events-none" />

      <div className="w-full max-w-[1840px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 relative z-10">
        <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C29B57]/20 border border-[#C29B57]/50 text-[#C29B57] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tham Gia Cùng Diễn Đàn</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F7F5EE] leading-tight">
            {title}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">{subtitle}</p>
        </FadeIn>

        {/* 3 TUYẾN CHUYỂN ĐỔI CHÍNH */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardsToRender.map((card, idx) => {
            const Icon = card.icon;
            return (
              <StaggerItem key={idx}>
                <InteractiveCard className="bg-white/5 border-2 border-white/15 hover:border-[#C29B57] rounded-2xl p-6 sm:p-8 transition-all hover:bg-white/10 flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#C29B57] text-[#292929] flex items-center justify-center font-bold shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#C29B57] uppercase tracking-wider block">
                      {card.tag}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#F7F5EE]">{card.title}</h3>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-white/15">
                    <Link href={card.ctaLink}>
                      <Button className={`w-full font-bold cursor-pointer ${card.btnClass}`}>
                        <span>{card.ctaText}</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </InteractiveCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* KHỐI NHẬN BẢN TIN ĐỊNH KỲ (NEWSLETTER SUBSCRIPTION) */}
        <FadeIn direction="up" delay={0.2} className="mt-12 sm:mt-16 max-w-4xl mx-auto">
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-[#C29B57]/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C29B57] flex items-center justify-center md:justify-start gap-1.5">
                <Mail className="w-3.5 h-3.5" /> Bản Tin Diễn Đàn &amp; Kỷ Yếu Khoa Học
              </span>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#F7F5EE]">
                Đăng Ký Nhận Báo Cáo Nghiên Cứu Định Kỳ
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-lg">
                Cập nhật sớm nhất tài liệu diễn đàn, kết quả thẩm định giải thưởng và cơ hội hợp tác kinh tế di sản.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Cảm ơn quý vị đã đăng ký nhận bản tin Diễn đàn Kinh tế Di sản!");
              }}
              className="flex w-full md:w-auto items-center gap-2 max-w-md shrink-0"
            >
              <input
                type="email"
                required
                placeholder="Nhập địa chỉ email của bạn..."
                className="h-11 px-4 rounded-xl bg-white/15 border border-white/30 text-white placeholder:text-white/60 text-xs sm:text-sm focus:outline-none focus:border-[#C29B57] flex-1 min-w-[200px]"
              />
              <Button
                type="submit"
                className="h-11 px-5 rounded-xl bg-[#C29B57] hover:bg-[#a98342] text-[#292929] font-bold text-xs sm:text-sm shrink-0 cursor-pointer shadow-md"
              >
                <span>Nhận tin</span>
                <Send className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
