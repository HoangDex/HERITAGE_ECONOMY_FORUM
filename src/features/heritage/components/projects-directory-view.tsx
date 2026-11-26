"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StaggerContainer, StaggerItem, InteractiveCard } from "@/components/animations";
import type { HeritageProject } from "../types/heritage.types";

interface ProjectsDirectoryViewProps {
  initialProjects: HeritageProject[];
}

const PROJECT_GROUPS = [
  { id: "all", label: "Tất cả dự án" },
  { id: "di-san-nghe-thuat", label: "Di sản & Nghệ thuật" },
  { id: "kinh-te-cong-dong", label: "Kinh tế & Cộng đồng" },
  { id: "di-san-so", label: "Di sản số" },
  { id: "khong-gian-di-san", label: "Không gian Di sản" },
];

const ITEMS_PER_PAGE = 6;

export function ProjectsDirectoryView({ initialProjects }: ProjectsDirectoryViewProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState<HeritageProject[]>(initialProjects);
  const [totalItems, setTotalItems] = useState<number>(initialProjects.length);
  const [isLoading, setIsLoading] = useState(false);

  // Trang Mô hình & Dự án (/projects) không lưu mảng `ids` trong Page.props mà gọi API `/api/projects` có phân trang
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchPaginatedProjects() {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(currentPage),
          limit: String(ITEMS_PER_PAGE),
        });
        if (searchQuery.trim()) {
          params.set("search", searchQuery.trim());
        }

        const res = await fetch(`/api/projects?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch paginated projects");
        const json = await res.json();

        if (isMounted && Array.isArray(json.data)) {
          const rawList = json.data as HeritageProject[];
          const groupFiltered =
            selectedGroup === "all"
              ? rawList
              : rawList.filter((item) => {
                  if (selectedGroup === "di-san-nghe-thuat") {
                    return (
                      item.category.includes("Nghệ thuật") ||
                      item.category.includes("Thủ công") ||
                      item.category.includes("Gốm") ||
                      item.category.includes("Lụa")
                    );
                  }
                  if (selectedGroup === "kinh-te-cong-dong") {
                    return (
                      item.category.includes("Cộng đồng") ||
                      item.category.includes("Kinh tế") ||
                      item.category.includes("Du lịch")
                    );
                  }
                  if (selectedGroup === "di-san-so") {
                    return (
                      item.category.includes("Số") ||
                      item.category.includes("Công nghệ") ||
                      item.description.includes("số hóa") ||
                      item.description.includes("3D")
                    );
                  }
                  if (selectedGroup === "khong-gian-di-san") {
                    return (
                      item.category.includes("Không gian") ||
                      item.category.includes("Đô thị") ||
                      item.category.includes("UNESCO")
                    );
                  }
                  return true;
                });

          setProjects(groupFiltered);
          setTotalItems(
            selectedGroup === "all"
              ? json.meta?.pagination?.total ?? rawList.length
              : groupFiltered.length
          );
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        if (isMounted) {
          setProjects(initialProjects);
          setTotalItems(initialProjects.length);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchPaginatedProjects();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [currentPage, selectedGroup, searchQuery, initialProjects]);

  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  return (
    <section id="danh-muc-du-an" className="py-12 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl space-y-8">
        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-[#DFD8C8]">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {PROJECT_GROUPS.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => {
                  setSelectedGroup(group.id);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-xs text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                  selectedGroup === group.id
                    ? "bg-[#0D4838] text-white"
                    : "bg-white text-[#5A6B63] border border-[#DFD8C8] hover:border-[#0D4838]"
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#5A6B63]" />
            <Input
              placeholder="Tìm theo tên, địa phương..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 bg-white border-[#DFD8C8] rounded-xs text-xs h-9"
            />
          </div>
        </div>

        {/* 3-Column Grid of Project Cards */}
        {projects.length > 0 ? (
          <div className={isLoading ? "opacity-60 transition-opacity" : ""}>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <StaggerItem key={proj.id}>
                  <Link href={`/projects/${proj.slug}`} className="group block h-full cursor-pointer">
                    <InteractiveCard className="h-full">
                      <div className="border border-[#DFD8C8] bg-white hover:shadow-md transition-all h-full flex flex-col justify-between hover:border-[#0D4838] overflow-hidden rounded-xs">
                        {/* Project Image Banner */}
                        {proj.imageUrl ? (
                          <div className="relative w-full aspect-[16/10] bg-[#DFD8C8]/30 overflow-hidden">
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
                              <Badge className="bg-[#0D4838] text-[#F7F5EE] text-[11px] font-semibold border border-white/20 rounded-xs">
                                {proj.category}
                              </Badge>
                              <Badge
                                className={`text-[10px] font-bold rounded-xs ${
                                  proj.status === "Đang vận hành"
                                    ? "bg-emerald-700 text-white"
                                    : "bg-[#C29B57] text-[#132A24]"
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
                              <Badge className="bg-[#0D4838] text-white text-[11px] font-medium rounded-xs">
                                {proj.category}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="text-[10px] border-[#C29B57] text-[#0D4838] font-semibold rounded-xs"
                              >
                                {proj.status}
                              </Badge>
                            </div>
                          </div>
                        )}

                        <div className="p-5 pb-3 space-y-2">
                          <h3 className="text-lg font-serif font-bold text-[#132A24] group-hover:text-[#0D4838] transition-colors leading-snug line-clamp-2">
                            {proj.name}
                          </h3>

                          <p className="text-xs text-[#5A6B63] line-clamp-2 leading-relaxed">
                            {proj.description}
                          </p>
                        </div>

                        <div className="p-5 pt-0 space-y-3">
                          {/* Economic Factsheet */}
                          <div className="grid grid-cols-3 gap-2 p-3 rounded-xs bg-[#EFECE1] border border-[#DFD8C8] text-center">
                            <div>
                              <span className="block text-[10px] text-[#5A6B63] uppercase tracking-wider font-medium">
                                Doanh thu
                              </span>
                              <span className="text-xs font-bold text-[#0D4838] truncate block mt-0.5">
                                {proj.economicMetrics.annualRevenue}
                              </span>
                            </div>
                            <div>
                              <span className="block text-[10px] text-[#5A6B63] uppercase tracking-wider font-medium">
                                Việc làm
                              </span>
                              <span className="text-xs font-bold text-[#132A24] block mt-0.5">
                                +{proj.economicMetrics.jobsCreated}
                              </span>
                            </div>
                            <div>
                              <span className="block text-[10px] text-[#5A6B63] uppercase tracking-wider font-medium">
                                Quỹ bảo tồn
                              </span>
                              <span className="text-xs font-bold text-[#9A783B] block mt-0.5">
                                {proj.economicMetrics.conservationFundShare}
                              </span>
                            </div>
                          </div>

                          <div className="pt-2 flex items-center justify-between text-xs font-semibold text-[#0D4838]">
                            <span className="flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-[#C29B57]" />
                              Xem hồ sơ & giải pháp
                            </span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </InteractiveCard>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-xs border border-[#DFD8C8] text-[#5A6B63] text-sm">
            Không tìm thấy dự án nào phù hợp với bộ lọc tìm kiếm.
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-[#DFD8C8]">
            <span className="text-xs text-[#5A6B63]">
              Trang <strong className="text-[#132A24]">{currentPage}</strong> / {totalPages} (Tổng{" "}
              {totalItems} dự án)
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold border border-[#DFD8C8] bg-white text-[#132A24] hover:border-[#0D4838] disabled:opacity-40 cursor-pointer rounded-xs"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Trước
              </button>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold border border-[#DFD8C8] bg-white text-[#132A24] hover:border-[#0D4838] disabled:opacity-40 cursor-pointer rounded-xs"
              >
                Sau
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
