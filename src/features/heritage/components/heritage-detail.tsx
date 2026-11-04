/**
 * LAYER 6C: PRESENTATION LAYER (Detail View Component)
 * Giao diện chi tiết mô hình kinh tế di sản
 */

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  TrendingUp,
  Users,
  ShieldCheck,
  CheckCircle2,
  Building,
  Share2,
  ArrowLeft,
  Camera,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { HeritageProject } from "../types/heritage.types";

interface HeritageDetailProps {
  project: HeritageProject;
}

export function HeritageDetail({ project }: HeritageDetailProps) {
  const photos =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : project.imageUrl
        ? [project.imageUrl]
        : [];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Navigation */}
      <Link href="/du-an">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 pl-0 hover:bg-transparent text-[#76232D] hover:text-[#52181F] font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh mục dự án kinh tế
        </Button>
      </Link>

      {/* Hero Banner with Photography */}
      {project.imageUrl && (
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden border-2 border-[#C29B57]/50 shadow-xl bg-black">
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1100px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Badges and Location on Top of Hero */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-[#76232D] text-white font-semibold text-xs border border-white/20 shadow-md">
                {project.category}
              </Badge>
              <Badge
                className={`text-xs font-bold shadow-md ${
                  project.status === "Đang vận hành"
                    ? "bg-emerald-700 text-white"
                    : "bg-[#C29B57] text-[#292929]"
                }`}
              >
                {project.status}
              </Badge>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-white bg-black/60 px-3 py-1 rounded-full border border-white/20 backdrop-blur-md flex items-center gap-1.5 shadow-md">
              <MapPin className="w-3.5 h-3.5 text-[#C29B57]" /> {project.location}
            </span>
          </div>

          {/* Bottom Title on Hero */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
            <h1 className="text-2xl sm:text-4xl font-serif font-extrabold tracking-tight leading-tight text-[#F5EFE5] drop-shadow-md">
              {project.name}
            </h1>
          </div>
        </div>
      )}

      {/* Main Content Card */}
      <div className="space-y-6 bg-white border border-[#dfd7c8] rounded-3xl p-6 sm:p-10 shadow-xs">
        {!project.imageUrl && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-[#C29B57] text-[#76232D]">
                  {project.category}
                </Badge>
                <Badge
                  className={
                    project.status === "Đang vận hành"
                      ? "bg-emerald-700 text-white"
                      : "bg-[#C29B57] text-[#292929]"
                  }
                >
                  {project.status}
                </Badge>
              </div>
              <span className="text-xs text-[#5c554b] flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[#76232D]" /> {project.location}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#292929]">
              {project.name}
            </h1>
          </div>
        )}

        <div className="space-y-2">
          <span className="text-xs uppercase font-bold text-[#C29B57] tracking-wider block">
            Mô tả tổng thể mô hình kinh tế di sản
          </span>
          <p className="text-base sm:text-lg text-[#292929] leading-relaxed font-sans">
            {project.description}
          </p>
        </div>

        {/* Economic Metrics Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#dfd7c8]">
          <div className="p-4 rounded-2xl bg-[#F5EFE5] border border-[#dfd7c8] text-center">
            <div className="text-xs text-[#5c554b] flex items-center justify-center gap-1.5 mb-1.5 font-medium">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Doanh thu ước tính
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#76232D]">
              {project.economicMetrics.annualRevenue}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5EFE5] border border-[#dfd7c8] text-center">
            <div className="text-xs text-[#5c554b] flex items-center justify-center gap-1.5 mb-1.5 font-medium">
              <Users className="w-4 h-4 text-blue-600" />
              Việc làm tạo lập
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#292929]">
              +{project.economicMetrics.jobsCreated} lao động
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5EFE5] border border-[#dfd7c8] text-center">
            <div className="text-xs text-[#5c554b] flex items-center justify-center gap-1.5 mb-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#C29B57]" />
              Quỹ tái thiết di sản
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#C29B57]">
              {project.economicMetrics.conservationFundShare}
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="bg-white border border-[#dfd7c8] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl font-serif font-bold text-[#76232D] flex items-center gap-2">
          <Building className="w-5 h-5 text-[#C29B57]" /> Điểm Cốt Lõi Của Mô Hình & Tác Động Cộng
          Đồng
        </h2>
        <div className="grid gap-3 pt-1">
          {project.highlights.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 text-sm text-[#292929] bg-[#FDFBF7] p-3.5 rounded-xl border border-[#dfd7c8]/60"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Gallery / Space Showcase */}
      {photos.length > 0 && (
        <div className="bg-white border border-[#dfd7c8] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl font-serif font-bold text-[#76232D] flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#C29B57]" /> Hình Ảnh Thực Tế & Không Gian Di Sản
            </h2>
            <Badge
              variant="outline"
              className="border-[#C29B57] text-[#76232D] text-xs font-semibold"
            >
              {photos.length} tư liệu ảnh
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            {photos.map((imgUrl, idx) => (
              <div
                key={idx}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#dfd7c8] bg-muted shadow-2xs hover:shadow-md transition-all"
              >
                <Image
                  src={imgUrl}
                  alt={`Tư liệu ảnh dự án ${project.name} #${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-[11px] text-white font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#C29B57]" /> Không gian di sản #{idx + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#76232D] to-[#52181F] text-white border-2 border-[#C29B57] shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif font-bold text-lg sm:text-xl text-[#F5EFE5]">
            Quan tâm và muốn kết nối với mô hình này?
          </h3>
          <p className="text-xs sm:text-sm text-white/85">
            Đăng ký hợp tác công tư (PPP), tư vấn chuyên môn hoặc trao đổi kinh nghiệm bảo tồn di
            sản.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/lien-he?loai=hop-tac">
            <Button className="bg-[#C29B57] hover:bg-[#a98342] text-[#292929] font-bold cursor-pointer h-11 px-6 shadow-md">
              Đăng ký Kết nối
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
