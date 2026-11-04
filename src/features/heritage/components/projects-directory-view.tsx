"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StaggerContainer, StaggerItem, InteractiveCard } from "@/components/animations";
import type { HeritageProject } from "../types/heritage.types";

interface ProjectsDirectoryViewProps {
  initialProjects: HeritageProject[];
}

const PROJECT_GROUPS = [
  { id: "all", label: "Tất cả dự án" },
  { id: "do-thi-di-san", label: "Đô thị Di sản" },
  { id: "lang-nghe", label: "Làng nghề & Thủ công" },
  { id: "di-san-unesco", label: "Di sản Kép UNESCO" },
  { id: "khong-gian-di-san", label: "Không gian Di sản" },
  { id: "kinh-te-cong-dong", label: "Kinh tế & Cộng đồng" },
];

export function ProjectsDirectoryView({ initialProjects }: ProjectsDirectoryViewProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = initialProjects.filter((item) => {
    const matchesGroup =
      selectedGroup === "all" ||
      item.category.toLowerCase().includes(selectedGroup.replace(/-/g, " "));
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  return (
    <section id="danh-muc-du-an" className="py-12 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl space-y-8">
        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-[#dfd7c8]">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {PROJECT_GROUPS.map((group) => (
              <button
                key={group.id}
                onClick={() => setSelectedGroup(group.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedGroup === group.id
                    ? "bg-[#76232D] text-white shadow-xs"
                    : "bg-white text-[#5c554b] border border-[#dfd7c8] hover:border-[#76232D]"
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#5c554b]" />
            <Input
              placeholder="Tìm theo tên, địa phương..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white border-[#dfd7c8] text-xs h-9"
            />
          </div>
        </div>

        {/* 3-Column Grid of Project Cards with Rich Photography */}
        {filteredProjects.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <StaggerItem key={proj.id}>
                <Link href={`/du-an/${proj.slug}`} className="group block h-full cursor-pointer">
                  <InteractiveCard className="h-full">
                    <Card className="border border-[#dfd7c8] bg-white shadow-xs hover:shadow-lg transition-all h-full flex flex-col justify-between hover:border-[#76232D] overflow-hidden rounded-2xl">
                      {/* Project Image Banner */}
                      {proj.imageUrl ? (
                        <div className="relative w-full aspect-[16/10] bg-[#dfd7c8]/30 overflow-hidden">
                          <Image
                            src={proj.imageUrl}
                            alt={proj.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                          {/* Badges on Image */}
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                            <Badge className="bg-[#76232D]/90 backdrop-blur-md text-[#F5EFE5] text-[11px] font-semibold border border-white/20 shadow-sm">
                              {proj.category}
                            </Badge>
                            <Badge
                              className={`text-[10px] font-bold shadow-sm ${
                                proj.status === "Đang vận hành"
                                  ? "bg-emerald-700 text-white"
                                  : "bg-[#C29B57] text-[#292929]"
                              }`}
                            >
                              {proj.status}
                            </Badge>
                          </div>

                          {/* Location pin on image */}
                          <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-xs text-white/95 font-medium drop-shadow-sm">
                            <MapPin className="w-3.5 h-3.5 text-[#C29B57] shrink-0" />
                            <span>{proj.location}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-5 pb-0">
                          <div className="flex items-center justify-between gap-2">
                            <Badge className="bg-[#76232D] text-white text-[11px] font-medium">
                              {proj.category}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-[10px] border-[#C29B57] text-[#76232D] font-semibold"
                            >
                              {proj.status}
                            </Badge>
                          </div>
                        </div>
                      )}

                      <CardHeader className="p-5 pb-3 space-y-2">
                        <CardTitle className="text-lg font-serif font-bold text-[#292929] group-hover:text-[#76232D] transition-colors leading-snug line-clamp-2">
                          {proj.name}
                        </CardTitle>

                        <p className="text-xs text-[#5c554b] line-clamp-2 leading-relaxed">
                          {proj.description}
                        </p>
                      </CardHeader>

                      <CardContent className="p-5 pt-0 space-y-3">
                        {/* Economic Factsheet */}
                        <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#F5EFE5] border border-[#dfd7c8]/80 text-center">
                          <div>
                            <span className="block text-[10px] text-[#5c554b] uppercase tracking-wider font-medium">
                              Doanh thu
                            </span>
                            <span className="text-xs font-bold text-[#76232D] truncate block mt-0.5">
                              {proj.economicMetrics.annualRevenue}
                            </span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-[#5c554b] uppercase tracking-wider font-medium">
                              Việc làm
                            </span>
                            <span className="text-xs font-bold text-[#292929] block mt-0.5">
                              +{proj.economicMetrics.jobsCreated}
                            </span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-[#5c554b] uppercase tracking-wider font-medium">
                              Quỹ bảo tồn
                            </span>
                            <span className="text-xs font-bold text-[#C29B57] block mt-0.5">
                              {proj.economicMetrics.conservationFundShare}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between text-xs font-semibold text-[#76232D]">
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#C29B57]" />
                            Xem hồ sơ & giải pháp
                          </span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </InteractiveCard>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-[#dfd7c8] text-[#5c554b] text-sm">
            Không tìm thấy dự án nào phù hợp với bộ lọc tìm kiếm.
          </div>
        )}
      </div>
    </section>
  );
}
