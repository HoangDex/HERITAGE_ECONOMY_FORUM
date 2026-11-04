"use client";

import Link from "next/link";
import { PlusCircle, Compass, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations";

export function ProjectsHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#76232D]/12 via-[#F5EFE5] to-[#F5EFE5] border-b border-[#dfd7c8] py-14 sm:py-18">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        <FadeIn direction="up" className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-[#76232D] text-white hover:bg-[#76232D]/90 font-medium px-3 py-1">
              Cơ Sở Dữ Liệu Thực Tiễn
            </Badge>
            <Badge
              variant="outline"
              className="border-[#C29B57] text-[#76232D] font-medium bg-white/80"
            >
              Mô Hình Điển Hình
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#292929] tracking-tight leading-tight">
            Danh Mục Dự Án & Sáng Kiến Kinh Tế Di Sản
          </h1>

          <p className="text-base sm:text-xl text-[#5c554b] leading-relaxed">
            Khám phá những dự án và mô hình góp phần bảo tồn, làm mới và phát huy nguồn lực di sản
            thông qua sáng tạo, công nghệ, kinh tế cộng đồng và hợp tác liên ngành.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/du-an/de-xuat">
              <Button
                size="lg"
                className="bg-[#76232D] hover:bg-[#76232D]/90 text-white gap-2 shadow-md font-medium cursor-pointer"
              >
                <PlusCircle className="w-5 h-5" />
                Gửi Đề Xuất Dự Án Mới
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="#danh-muc-du-an">
              <Button
                size="lg"
                variant="outline"
                className="border-[#76232D] text-[#76232D] hover:bg-[#76232D]/10 gap-2 font-medium cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                Khám Phá Các Nhóm Dự Án
              </Button>
            </a>
          </div>

          <p className="text-xs text-[#5c554b] flex items-center gap-1.5 pt-1">
            <ShieldCheck className="w-4 h-4 text-[#C29B57]" />
            100% dự án trong danh mục đều được Ban Thư ký thẩm định thực địa và kiểm chứng số liệu
            kinh tế.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
