/**
 * COMPONENT: KHỐI CHUYỂN ĐỔI CUỐI TRANG (CONVERSION CTA SECTION)
 * "CÙNG KIẾN TẠO GIÁ TRỊ DI SẢN" & BA TUYẾN CHUYỂN ĐỔI: THAM DỰ, ĐỀ CỬ, HỢP TÁC
 * Kèm Form đăng ký nhận kỷ yếu & bản tin
 */

"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  Award,
  Handshake,
  ArrowRight,
  Mail,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FadeIn, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/animations";
import { useHome } from "../hooks/use-home";

export function ConversionCtaSection() {
  const { isPending, subscribeStatus, statusMessage, handleSubscribe } = useHome();

  return (
    <section className="py-16 sm:py-24 bg-radial-[at_top] from-[#76232D] via-[#52181F] to-[#1F1416] text-white relative overflow-hidden">
      {/* Pattern nền trống đồng */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C29B57_1.5px,transparent_1.5px)] [background-size:28px_28px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl px-4 sm:px-8 relative z-10">
        <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C29B57]/20 border border-[#C29B57]/50 text-[#C29B57] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tham Gia Cùng Diễn Đàn</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F5EFE5] leading-tight">
            Cùng Kiến Tạo Giá Trị Di Sản
          </h2>

          <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">
            Mỗi sáng kiến, tham luận và nguồn lực của quý vị đều góp phần hồi sinh và phát huy bền
            vững kho tàng văn hóa di sản của dân tộc.
          </p>
        </FadeIn>

        {/* 3 TUYẾN CHUYỂN ĐỔI CHÍNH */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* TUYẾN 1: THAM DỰ */}
          <StaggerItem>
            <InteractiveCard className="bg-white/5 border-2 border-white/15 hover:border-[#C29B57] rounded-2xl p-6 sm:p-8 transition-all hover:bg-white/10 flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#C29B57] text-[#292929] flex items-center justify-center font-bold shadow-md">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#C29B57] uppercase tracking-wider block">
                  Tuyến 01 • Đại Biểu
                </span>
                <h3 className="text-xl font-serif font-bold text-[#F5EFE5]">
                  Đăng Ký Tham Dự Diễn Đàn
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Đăng ký vé mời chính thức tham dự các phiên toàn thể, phiên chuyên đề và phiên đối
                  thoại chính sách cấp cao.
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-white/15">
                <Link href="/lien-he?loai=tham-du">
                  <Button className="w-full bg-[#C29B57] hover:bg-[#a98342] text-[#292929] font-bold cursor-pointer">
                    <span>Đăng ký tham dự</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </InteractiveCard>
          </StaggerItem>

          {/* TUYẾN 2: ĐỀ CỬ */}
          <StaggerItem>
            <InteractiveCard className="bg-white/5 border-2 border-[#C29B57] rounded-2xl p-6 sm:p-8 transition-all hover:bg-white/10 flex flex-col justify-between relative shadow-lg h-full">
              <div className="absolute top-0 right-0 bg-[#C29B57] text-[#292929] text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                Mùa Giải 2026
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#76232D] text-[#C29B57] border border-[#C29B57]/60 flex items-center justify-center font-bold shadow-md">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#C29B57] uppercase tracking-wider block">
                  Tuyến 02 • Vinh Danh
                </span>
                <h3 className="text-xl font-serif font-bold text-[#F5EFE5]">
                  Nộp Hồ Sơ Đề Cử Giải Thưởng
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Gửi đề cử công trình kiến trúc, mô hình du lịch hoặc sáng kiến bảo tồn di sản xuất
                  sắc vì cộng đồng.
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-white/15">
                <Link href="/giai-thuong#de-cu">
                  <Button className="w-full bg-[#76232D] hover:bg-[#5e1c24] text-white border border-[#C29B57] font-bold cursor-pointer">
                    <span>Nộp hồ sơ đề cử</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </InteractiveCard>
          </StaggerItem>

          {/* TUYẾN 3: HỢP TÁC */}
          <StaggerItem>
            <InteractiveCard className="bg-white/5 border-2 border-white/15 hover:border-[#C29B57] rounded-2xl p-6 sm:p-8 transition-all hover:bg-white/10 flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#C29B57] text-[#292929] flex items-center justify-center font-bold shadow-md">
                  <Handshake className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#C29B57] uppercase tracking-wider block">
                  Tuyến 03 • Chiến Lược
                </span>
                <h3 className="text-xl font-serif font-bold text-[#F5EFE5]">
                  Hợp Tác Chiến Lược & Tài Trợ
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Cùng xây dựng các dự án bảo tồn thực địa, tài trợ chuỗi nghiên cứu khoa học hoặc
                  đăng cai tổ chức tại địa phương.
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-white/15">
                <Link href="/lien-he?loai=hop-tac">
                  <Button className="w-full bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold cursor-pointer">
                    <span>Liên hệ hợp tác</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </InteractiveCard>
          </StaggerItem>
        </StaggerContainer>

        {/* FORM ĐĂNG KÝ NHẬN KỶ YẾU & BẢN TIN */}
        <FadeIn
          direction="up"
          delay={0.2}
          className="max-w-2xl mx-auto rounded-2xl bg-black/40 border border-white/20 p-6 sm:p-8 backdrop-blur-md text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2 text-[#C29B57]">
            <Mail className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Đăng Ký Nhận Kỷ Yếu & Bản Tin Khoa Học
            </span>
          </div>

          <h4 className="text-lg sm:text-xl font-serif font-bold text-[#F5EFE5] mb-2">
            Nhận Toàn Văn Kỷ Yếu Diễn Đàn Miễn Phí
          </h4>
          <p className="text-xs text-white/70 mb-6">
            Bản tin phân tích chính sách và kỷ yếu nghiên cứu mới nhất sẽ được gửi định kỳ tới hòm
            thư của bạn.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <Input
                name="fullName"
                placeholder="Họ và tên của bạn"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#C29B57] h-11"
              />
              <Input
                name="email"
                type="email"
                required
                placeholder="Địa chỉ email công vụ (*)"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#C29B57] h-11"
              />
              <Button
                type="submit"
                disabled={isPending}
                className="bg-[#C29B57] hover:bg-[#a98342] text-[#292929] font-bold h-11 px-6 shrink-0 cursor-pointer"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Đang gửi...
                  </span>
                ) : (
                  <span>Đăng ký nhận</span>
                )}
              </Button>
            </div>

            {subscribeStatus === "success" && (
              <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{statusMessage}</span>
              </div>
            )}

            {subscribeStatus === "error" && (
              <div className="p-3 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{statusMessage}</span>
              </div>
            )}
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
