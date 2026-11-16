/**
 * COMPONENT: KHỐI CHUYỂN ĐỔI CUỐI TRANG (CONVERSION CTA SECTION)
 * "CÙNG KIẾN TẠO GIÁ TRỊ DI SẢN" & BA TUYẾN CHUYỂN ĐỔI: THAM DỰ, ĐỀ CỬ, HỢP TÁC
 */

"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Award, Handshake, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/animations";

export function ConversionCtaSection() {
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
            Cùng Kiến Tạo Giá Trị Di Sản
          </h2>

          <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">
            Mỗi sáng kiến, tham luận và nguồn lực của quý vị đều góp phần hồi sinh và phát huy bền
            vững kho tàng văn hóa di sản của dân tộc.
          </p>
        </FadeIn>

        {/* 3 TUYẾN CHUYỂN ĐỔI CHÍNH */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <h3 className="text-xl font-serif font-bold text-[#F7F5EE]">
                  Đăng Ký Tham Dự Phiên Toàn Thể
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Trở thành đại biểu chính thức, kết nối cùng các chuyên gia hàng đầu và tiếp cận
                  các báo cáo độc quyền.
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-white/15">
                <Link href="/contact?loai=tham-du#contact-form">
                  <Button className="w-full bg-[#C29B57] hover:bg-[#a98342] text-[#292929] font-bold cursor-pointer">
                    <span>Đăng ký tham dự</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </InteractiveCard>
          </StaggerItem>

          {/* TUYẾN 2: ĐỀ CỬ GIẢI THƯỞNG */}
          <StaggerItem>
            <InteractiveCard className="bg-white/5 border-2 border-[#C29B57] rounded-2xl p-6 sm:p-8 transition-all hover:bg-white/10 flex flex-col justify-between relative shadow-lg h-full">
              <div className="absolute top-0 right-0 bg-[#C29B57] text-[#292929] text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                Mùa Giải 2026
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#0D4838] text-[#C29B57] border border-[#C29B57]/60 flex items-center justify-center font-bold shadow-md">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#C29B57] uppercase tracking-wider block">
                  Tuyến 02 • Vinh Danh
                </span>
                <h3 className="text-xl font-serif font-bold text-[#F7F5EE]">
                  Nộp Hồ Sơ Đề Cử Giải Thưởng
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Gửi đề cử công trình kiến trúc, mô hình du lịch hoặc sáng kiến bảo tồn di sản xuất
                  sắc vì cộng đồng.
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-white/15">
                <Link href="/contact?loai=giai-thuong#contact-form">
                  <Button className="w-full bg-[#0D4838] hover:bg-[#073327] text-white border border-[#C29B57] font-bold cursor-pointer">
                    <span>Nộp hồ sơ đề cử</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </InteractiveCard>
          </StaggerItem>

          {/* TUYẾN 3: HỢP TÁC DOANH NGHIỆP */}
          <StaggerItem>
            <InteractiveCard className="bg-white/5 border-2 border-white/15 hover:border-[#C29B57] rounded-2xl p-6 sm:p-8 transition-all hover:bg-white/10 flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white/15 text-[#C29B57] border border-white/20 flex items-center justify-center font-bold shadow-md">
                  <Handshake className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#C29B57] uppercase tracking-wider block">
                  Tuyến 03 • Đồng Hành
                </span>
                <h3 className="text-xl font-serif font-bold text-[#F7F5EE]">
                  Đối Tác Chiến Lược & Tài Trợ
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Cùng xây dựng các dự án bảo tồn thực địa, tài trợ chuỗi nghiên cứu khoa học hoặc
                  đăng cai tổ chức tại địa phương.
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-white/15">
                <Link href="/contact?loai=hop-tac#contact-form">
                  <Button className="w-full bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold cursor-pointer">
                    <span>Liên hệ hợp tác</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </InteractiveCard>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
