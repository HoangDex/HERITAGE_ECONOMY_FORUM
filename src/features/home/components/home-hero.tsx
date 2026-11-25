/**
 * COMPONENT: HOME HERO VỚI VIDEO BACKGROUND DI SẢN & TONE MÀU CHÍNH THỨC
 * - Header trong suốt khi ở trên cùng
 * - Video chạy tự động mượt mà với tệp nội bộ /videos/heritage-bg.mp4
 * - Lớp phủ nhẹ chỉ ở 4 góc để giữ video sáng rõ, sống động tối đa
 * - Layout Fullwidth khoáng đạt màn ảnh rộng (lên đến 1920px)
 */

"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Sparkles,
  MapPin,
  Users,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HefIcon } from "@/components/icons";
import { FadeIn, AnimatedCounter } from "@/components/animations";
import type { HomeHero as HomeHeroType } from "../types/home.types";

interface HomeHeroProps {
  hero: HomeHeroType;
}

export function HomeHero({ hero }: HomeHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Đảm bảo video tự động chạy (Autoplay) mượt mà trên mọi trình duyệt
  useEffect(() => {
    let isMounted = true;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const startPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (isMounted) setIsPlaying(true);
          })
          .catch(() => {
            if (isMounted) setIsPlaying(false);
          });
      }
    };

    startPlay();

    return () => {
      isMounted = false;
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Video nền di sản chính thức: Thước phim Vịnh Hạ Long Full HD chuẩn di sản thiên nhiên thế giới
  const HERITAGE_DEFAULT_VIDEO =
    "https://upload.wikimedia.org/wikipedia/commons/transcoded/b/be/Ha_Long_Bay%2C_Vietnam_-_Dec_2024.webm/Ha_Long_Bay%2C_Vietnam_-_Dec_2024.webm.1080p.vp9.webm";

  const primaryVideo =
    hero.videoUrl &&
    hero.videoUrl !== "/videos/heritage-bg.mp4" &&
    hero.videoUrl !== "/videos/test.mp4"
      ? hero.videoUrl
      : HERITAGE_DEFAULT_VIDEO;

  return (
    <section className="relative overflow-hidden bg-[#F7F5EE] text-[#132A24] w-full min-h-screen lg:h-screen lg:min-h-[720px] 2xl:min-h-[1080px] 2xl:h-[1080px] -mt-16 sm:-mt-20 pt-20 sm:pt-24 lg:pt-20 pb-8 sm:pb-10 lg:pb-8 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 flex flex-col justify-center">
      {/* ======================================================== */}
      {/* 1. LỚP VIDEO BACKGROUND DI SẢN CHUYỂN ĐỘNG SỐNG ĐỘNG    */}
      {/* ======================================================== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-105"
        >
          <source src={primaryVideo} type="video/webm" />
          <source
            src="https://upload.wikimedia.org/wikipedia/commons/transcoded/b/be/Ha_Long_Bay%2C_Vietnam_-_Dec_2024.webm/Ha_Long_Bay%2C_Vietnam_-_Dec_2024.webm.1080p.vp9.webm"
            type="video/webm"
          />
          <source
            src="https://upload.wikimedia.org/wikipedia/commons/b/be/Ha_Long_Bay%2C_Vietnam_-_Dec_2024.webm"
            type="video/webm"
          />
        </video>
      </div>

      {/* ======================================================== */}
      {/* 2. LỚP PHỦ HÌNH TRÒN 4 GÓC (RADIAL CIRCULAR VIGNETTE)     */}
      {/* Tỏa tròn mềm mại từ 4 góc vào tâm, không có cạnh chéo    */}
      {/* ======================================================== */}
      {/* Góc Trên - Trái: Tỏa tròn hình vòng cung mềm mại */}
      <div className="absolute top-0 left-0 w-72 sm:w-96 lg:w-[450px] h-72 sm:h-96 lg:h-[450px] pointer-events-none z-0 bg-[radial-gradient(circle_at_0%_0%,rgba(247,245,238,0.45)_0%,rgba(247,245,238,0.15)_40%,transparent_75%)]" />

      {/* Góc Trên - Phải: Tỏa tròn hình vòng cung mềm mại */}
      <div className="absolute top-0 right-0 w-72 sm:w-96 lg:w-[450px] h-72 sm:h-96 lg:h-[450px] pointer-events-none z-0 bg-[radial-gradient(circle_at_100%_0%,rgba(247,245,238,0.4)_0%,rgba(247,245,238,0.12)_40%,transparent_75%)]" />

      {/* Góc Dưới - Trái: Tỏa tròn hình vòng cung mềm mại */}
      <div className="absolute bottom-0 left-0 w-72 sm:w-96 lg:w-[450px] h-72 sm:h-96 lg:h-[450px] pointer-events-none z-0 bg-[radial-gradient(circle_at_0%_100%,rgba(247,245,238,0.45)_0%,rgba(247,245,238,0.15)_40%,transparent_75%)]" />

      {/* Góc Dưới - Phải: Tỏa tròn hình vòng cung mềm mại */}
      <div className="absolute bottom-0 right-0 w-72 sm:w-96 lg:w-[450px] h-72 sm:h-96 lg:h-[450px] pointer-events-none z-0 bg-[radial-gradient(circle_at_100%_100%,rgba(247,245,238,0.4)_0%,rgba(247,245,238,0.12)_40%,transparent_75%)]" />

      {/* ======================================================== */}
      {/* 3. NỘI DUNG CHÍNH HERO (THIẾT KẾ FULLWIDTH KHOÁNG ĐẠT)    */}
      {/* ======================================================== */}
      <div className="w-full max-w-[1840px] 2xl:max-w-[1920px] mx-auto relative z-10 my-auto py-2 sm:py-4 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 2xl:gap-24 items-center">
          {/* CỘT TRÁI (DESKTOP) / XẾP DƯỚI (MOBILE): KHỐI NỘI DUNG CHUẨN MỰC TẠP CHÍ DI SẢN */}
          <FadeIn
            direction="right"
            duration={0.6}
            className="lg:col-span-7 xl:col-span-7 2xl:col-span-7 order-2 lg:order-1"
          >
            <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.14)] space-y-5 sm:space-y-6">
              {/* Hàng Tiêu Đề Phụ & Huy Hiệu Quốc Gia */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-[#0D4838]/20 text-[#0D4838] text-xs font-bold tracking-wider uppercase backdrop-blur-xs shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#C29B57]" />
                  <span>{hero.badgeText || "NỀN TẢNG ĐỐI THOẠI & KẾT NỐI QUỐC GIA"}</span>
                </div>
                <span className="text-xs font-bold tracking-[0.2em] text-[#C29B57] uppercase font-sans">
                  {hero.title || "HERITAGE ECONOMY FORUM"}
                </span>
              </div>

              {/* Tiêu đề chính: Font Serif Hoàng Gia Đậm Nét Chuẩn Quốc Gia, Tỷ Lệ Cân Đối */}
              <div>
                <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[66px] font-serif font-bold text-[#0D4838] leading-[1.18] tracking-[0.02em] text-balance">
                  {hero.vietnameseTitle || "DIỄN ĐÀN KINH TẾ DI SẢN"}
                </h1>
              </div>

              {/* Khối Slogan & Tuyên Ngôn: Phong cách Trích Dẫn Học Thuật Cao Cấp */}
              <div className="border-l-4 border-[#C29B57] pl-4 sm:pl-5 py-3.5 bg-white/40 rounded-r-2xl border-y border-r border-white/40 backdrop-blur-xs">
                <p className="text-base sm:text-lg lg:text-xl font-serif font-bold text-[#0D4838] leading-snug">
                  &ldquo;{hero.slogan}&rdquo;
                </p>
              </div>

              {/* Đoạn mô tả mượt mà, phân cấp thị giác rõ ràng */}
              <p className="text-sm sm:text-base lg:text-lg text-[#1A332C] font-sans leading-relaxed">
                {hero.description}
              </p>

              {/* 2 TUYẾN CTA: Thiết kế Tương tác Hiện đại */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <Link href={hero.primaryCta?.href || "/dien-dan"} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-[#0D4838] hover:bg-[#073327] text-white font-bold border border-[#C29B57]/40 shadow-md cursor-pointer px-7 sm:px-8 h-12 text-sm sm:text-base transition-all hover:shadow-lg"
                  >
                    <HefIcon name="Compass" size="sm" className="text-[#C29B57]" />
                    <span className="ml-2">{hero.primaryCta?.label || "Khám phá diễn đàn"}</span>
                  </Button>
                </Link>

                <Link href={hero.secondaryCta?.href || "/lien-he?loai=tham-du#contact-form"} className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto bg-white/90 hover:bg-white text-[#0D4838] hover:text-[#073327] border-2 border-[#0D4838]/25 font-bold cursor-pointer px-7 sm:px-8 shadow-xs h-12 text-sm sm:text-base transition-all"
                  >
                    <Calendar className="w-4 h-4 mr-2 text-[#C29B57]" />
                    <span>{hero.secondaryCta?.label || "Đăng ký tham dự"}</span>
                    <ArrowRight className="w-4 h-4 ml-2 text-[#0D4838]" />
                  </Button>
                </Link>
              </div>

              {/* Micro Metrics nhanh: Thanh thống kê 3 cột tinh gọn */}
              <div className="pt-5 border-t border-[#0D4838]/15 grid grid-cols-3 gap-4 sm:gap-8 text-left">
                {(hero.metrics && hero.metrics.length > 0
                  ? hero.metrics
                  : [
                      { value: 500, suffix: "+", label: "Đại biểu dự kiến" },
                      { value: 4, prefix: "0", label: "Phiên chuyên đề" },
                      { value: 30, suffix: "+", label: "Mô hình di sản" },
                    ]
                ).map((m, idx) => (
                  <div
                    key={idx}
                    className={idx < 2 ? "border-r border-[#0D4838]/10 pr-2 sm:pr-4" : ""}
                  >
                    <span className="block text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#0D4838]">
                      <AnimatedCounter to={m.value} prefix={m.prefix} suffix={m.suffix} />
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold text-[#4A5E57] mt-0.5 block">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* CỘT PHẢI (DESKTOP) / PHÍA TRÊN 16:9 (MOBILE): ẢNH DI SẢN TỐI ƯU LCP */}
          <FadeIn
            direction="left"
            duration={0.6}
            className="lg:col-span-5 xl:col-span-5 2xl:col-span-5 order-1 lg:order-2"
          >
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] xl:aspect-[16/10] 2xl:aspect-[16/9] min-h-[340px] sm:min-h-[400px] lg:min-h-[440px] xl:min-h-[480px] 2xl:min-h-[520px] rounded-3xl overflow-hidden border-2 border-[#C29B57]/70 shadow-2xl bg-white group">
              <Image
                src={hero.imageUrl}
                alt={hero.imageAlt || "Diễn đàn Kinh tế Di sản Việt Nam"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 900px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D4838]/85 via-black/20 to-transparent" />

              {/* Tag nổi bật dưới ảnh */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#C29B57]/50 text-[#132A24] flex items-center justify-between shadow-lg">
                <div>
                  <span className="text-[11px] sm:text-xs uppercase font-bold text-[#0D4838] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C29B57]" /> Địa điểm chính thức
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#0D4838] truncate block mt-0.5">
                    {hero.locationBadge || "Hoàng thành Thăng Long, Hà Nội"}
                  </span>
                </div>
                <Badge className="bg-[#0D4838] text-white text-xs sm:text-sm py-1.5 px-3 border border-[#C29B57]/60 shrink-0 shadow-xs">
                  <Users className="w-3.5 h-3.5 mr-1.5 text-[#C29B57]" />{" "}
                  {hero.editionBadge || "Kỳ 2026"}
                </Badge>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. NÚT ĐIỀU KHIỂN VIDEO NỀN TRANG NHÃ GÓC DƯỚI PHẢI      */}
      {/* ======================================================== */}
      <div className="absolute bottom-4 right-4 sm:right-8 lg:right-12 z-20 flex items-center gap-2.5">
        <button
          type="button"
          onClick={togglePlay}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#0D4838] border border-[#C29B57]/50 text-xs font-semibold backdrop-blur-md shadow-sm transition-all cursor-pointer"
          title={isPlaying ? "Tạm dừng video nền" : "Tiếp tục phát video"}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 text-[#C29B57]" />
          ) : (
            <Play className="w-3.5 h-3.5 text-[#C29B57]" />
          )}
          <span className="hidden sm:inline">
            {isPlaying
              ? hero.videoTitle || "Video nền: Non nước Di sản"
              : "Đã tạm dừng"}
          </span>
          <Video className="w-3.5 h-3.5 text-[#0D4838] sm:hidden" />
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#0D4838] border border-[#C29B57]/50 flex items-center justify-center backdrop-blur-md shadow-sm transition-all cursor-pointer"
          title={isMuted ? "Bật âm thanh video" : "Tắt tiếng"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-[#4A5E57]" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#0D4838]" />
          )}
        </button>
      </div>
    </section>
  );
}
