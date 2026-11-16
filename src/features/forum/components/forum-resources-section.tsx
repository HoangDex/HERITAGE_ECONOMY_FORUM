/**
 * COMPONENT: FORUM RESOURCES SECTION (THƯ VIỆN & TÀI LIỆU THEO ĐÚNG WIREFRAME PRD)
 * Hỗ trợ danh sách file tải có dung lượng & loại file, kèm thư viện ảnh/video sự kiện
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FileText,
  Download,
  Sparkles,
  Image as ImageIcon,
  Video,
  FileCheck2,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/animations";
import type { ForumResource, ForumGalleryItem } from "../types/forum-edition.types";

interface ForumResourcesSectionProps {
  resources: ForumResource[];
  gallery?: ForumGalleryItem[];
}

type TabType = "all" | "ky-yeu" | "tham-luan" | "media";

export function ForumResourcesSection({ resources, gallery = [] }: ForumResourcesSectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const filteredResources = resources.filter((res) => {
    if (activeTab === "all") return true;
    if (activeTab === "ky-yeu") return res.category === "ky-yeu" || res.category === "bao-cao";
    if (activeTab === "tham-luan")
      return res.category === "tham-luan" || res.category === "chuong-trinh";
    return true;
  });

  const showMedia = activeTab === "all" || activeTab === "media";
  const showFiles = activeTab !== "media";

  return (
    <section
      id="tai-lieu"
      className="py-12 sm:py-16 bg-[#FDFBF7] border-t border-[#dfd7c8] scroll-mt-28"
    >
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl space-y-8">
        {/* Header mục tài liệu */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <FadeIn direction="up" className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#C29B57]/15 text-[#0D4838]">
              <Sparkles className="w-3.5 h-3.5 text-[#C29B57]" />
              <span>Thư Viện & Tài Liệu</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#132A24] tracking-tight">
              Kỷ Yếu, Tham Luận & Tư Liệu
            </h2>
            <p className="text-sm text-[#5c554b] max-w-xl">
              Tài liệu chính thức được phép công bố, kỷ yếu nghiên cứu chỉ số ISBN và ảnh/video diễn
              đàn.
            </p>
          </FadeIn>

          {/* Bộ lọc tab tinh gọn */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar shrink-0 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                activeTab === "all"
                  ? "bg-[#0D4838] text-white shadow-2xs"
                  : "bg-white text-[#5c554b] border border-[#dfd7c8] hover:border-[#0D4838]"
              }`}
            >
              Tất cả
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ky-yeu")}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                activeTab === "ky-yeu"
                  ? "bg-[#0D4838] text-white shadow-2xs"
                  : "bg-white text-[#5c554b] border border-[#dfd7c8] hover:border-[#0D4838]"
              }`}
            >
              Kỷ yếu & Báo cáo
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("tham-luan")}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                activeTab === "tham-luan"
                  ? "bg-[#0D4838] text-white shadow-2xs"
                  : "bg-white text-[#5c554b] border border-[#dfd7c8] hover:border-[#0D4838]"
              }`}
            >
              Tham luận
            </button>
            {gallery.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab("media")}
                className={`px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
                  activeTab === "media"
                    ? "bg-[#0D4838] text-white shadow-2xs"
                    : "bg-white text-[#5c554b] border border-[#dfd7c8] hover:border-[#0D4838]"
                }`}
              >
                Ảnh & Video ({gallery.length})
              </button>
            )}
          </div>
        </div>

        {/* Danh sách File Tải (Wireframe Mobile & Desktop) */}
        {showFiles && (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredResources.map((res) => (
              <StaggerItem key={res.id}>
                <InteractiveCard className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#dfd7c8] shadow-2xs hover:border-[#0D4838] transition-colors gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 bg-[#0D4838]/10 rounded-lg text-[#0D4838] shrink-0">
                      {res.category === "ky-yeu" ? (
                        <BookOpen className="w-5 h-5 text-[#C29B57]" />
                      ) : (
                        <FileText className="w-5 h-5 text-[#C29B57]" />
                      )}
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-[9px] font-bold uppercase border-[#C29B57] text-[#0D4838] px-1.5 py-0"
                        >
                          {res.type.toUpperCase()}
                        </Badge>
                        <span className="text-[11px] text-[#5c554b]">{res.fileSize}</span>
                        {res.category === "ky-yeu" && (
                          <span className="text-[10px] font-mono text-[#C29B57] font-semibold">
                            ISBN
                          </span>
                        )}
                      </div>
                      <h3 className="text-xs sm:text-sm font-serif font-bold text-[#132A24] truncate">
                        {res.title}
                      </h3>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <a
                      href={res.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#0D4838] text-[#0D4838] hover:bg-[#0D4838] hover:text-white transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Tải về</span>
                    </a>
                  </div>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {/* Khối Gallery Ảnh & Video (Wireframe Desktop: THƯ VIỆN) */}
        {showMedia && gallery.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-[#dfd7c8]/60">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono uppercase font-bold tracking-wider text-[#0D4838] flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#C29B57]" />
                <span>Không gian & Tư liệu Diễn đàn</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-xl overflow-hidden border border-[#dfd7c8] bg-white aspect-[16/10] shadow-2xs hover:shadow-md transition-all"
                >
                  <Image
                    src={item.thumbnailUrl || item.url}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3.5 text-white">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#C29B57] font-bold mb-0.5">
                      {item.type === "video" ? (
                        <>
                          <Video className="w-3 h-3" />
                          <span>Video</span>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-3 h-3" />
                          <span>Hình ảnh</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs font-serif font-bold text-white line-clamp-1">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
