/**
 * COMPONENT: DỰ ÁN & MÔ HÌNH ĐIỂN HÌNH (3-6 DỰ ÁN ĐÃ DUYỆT CÔNG BỐ)
 * Chỉ số: Doanh thu hàng năm, việc làm tạo ra, tỷ lệ trích nộp quỹ bảo tồn
 */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, TrendingUp, Users, ShieldCheck, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { FeaturedProject } from "../types/home.types";

interface FeaturedProjectsSectionProps {
  projects: FeaturedProject[];
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C29B57] flex items-center gap-1.5">
            <Landmark className="w-3.5 h-3.5" /> Mô Hình Thực Tiễn
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#76232D] dark:text-[#F5EFE5] mt-1">
            Dự Án Kinh Tế Di Sản Tiêu Biểu
          </h3>
        </div>

        <Link href="/heritage">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-[#76232D] dark:text-[#C29B57] hover:underline gap-1"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group bg-card rounded-xl border border-border hover:border-[#C29B57] p-4 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            {/* Ảnh thumbnail dự án */}
            <div className="relative w-full sm:w-40 aspect-[16/10] sm:aspect-square rounded-lg overflow-hidden bg-muted shrink-0 border border-border">
              <Image
                src={project.thumbnailUrl}
                alt={project.name}
                fill
                sizes="(max-width: 640px) 100vw, 160px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2">
                <Badge className="bg-[#76232D] text-white text-[10px] px-2 py-0.5 border border-[#C29B57]/40">
                  <MapPin className="w-2.5 h-2.5 mr-1" />
                  {project.location}
                </Badge>
              </div>
            </div>

            {/* Thông tin & Chỉ số tác động */}
            <div className="flex-1 space-y-2 overflow-hidden">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-[#C29B57] uppercase block">
                  {project.category}
                </span>
                <h4 className="text-base font-serif font-bold text-foreground group-hover:text-[#76232D] dark:group-hover:text-[#C29B57] transition-colors line-clamp-1">
                  {project.name}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Bảng chỉ số kinh tế di sản */}
              <div className="flex flex-wrap items-center gap-3 text-xs pt-1 border-t border-border/60">
                <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {project.annualRevenue}
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-3.5 h-3.5 text-primary" />
                  {project.jobsCreated} việc làm
                </span>
                <span className="text-muted-foreground hidden lg:inline">•</span>
                <span className="hidden lg:flex items-center gap-1 text-[11px] text-[#C29B57]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {project.conservationShare}
                </span>
              </div>
            </div>

            <Link href={`/heritage/${project.slug}`} className="self-end sm:self-center shrink-0">
              <Button size="sm" variant="outline" className="border-border hover:border-[#C29B57]">
                Chi tiết
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
