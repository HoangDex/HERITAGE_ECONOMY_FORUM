"use client";

import React, { useState } from "react";
import { Search, Sliders } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SectionItemCard } from "./section-item-card";
import type { PageSection } from "../types/page.types";

interface SectionsTabProps {
  sections: PageSection[];
  isPending: boolean;
  onMove: (index: number, direction: "up" | "down") => void;
  onToggleVisibility: (section: PageSection) => void;
  onEdit: (section: PageSection) => void;
  onDelete: (section: PageSection) => void;
  onSelectDashboard?: (sectionId: string) => void;
}

export function SectionsTab({
  sections,
  isPending,
  onMove,
  onToggleVisibility,
  onEdit,
  onDelete,
  onSelectDashboard,
}: SectionsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = sections.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.title?.toLowerCase().includes(q) ||
      s.type.toLowerCase().includes(q) ||
      s.subtitle?.toLowerCase().includes(q)
    );
  });

  const visibleCount = sections.filter((s) => s.isVisible).length;

  return (
    <div className="space-y-4">
      {/* Search & Statistics Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-[#dfd7c8]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#5c554b] absolute left-3 top-2.5" />
          <Input
            placeholder="Tìm khối section theo tên hoặc loại..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs bg-[#FDFBF7] border-[#dfd7c8]"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-[#5c554b]">
            <span className="font-semibold text-[#0D4838]">{visibleCount}</span> khối hiển thị /{" "}
            <span>{sections.length} tổng khối</span>
          </div>
          {onSelectDashboard && sections.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSelectDashboard(sections[0].id)}
              className="h-8 text-xs font-semibold bg-[#F5EFE5] border-[#dfd7c8] text-[#76232D] hover:bg-[#76232D] hover:text-white transition-all cursor-pointer shadow-2xs"
            >
              <Sliders className="w-3.5 h-3.5 mr-1 text-[#C29B57]" />
              Soạn Thảo Chi Tiết
            </Button>
          )}
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-3">
        {filteredSections.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-[#dfd7c8] text-muted-foreground text-xs">
            Không tìm thấy khối section nào phù hợp với từ khóa &ldquo;{searchQuery}&rdquo;.
          </div>
        ) : (
          filteredSections.map((section, index) => (
            <SectionItemCard
              key={section.id}
              section={section}
              index={index}
              totalSections={filteredSections.length}
              isPending={isPending}
              onMoveUp={() => onMove(index, "up")}
              onMoveDown={() => onMove(index, "down")}
              onToggleVisibility={() => onToggleVisibility(section)}
              onEdit={() => onEdit(section)}
              onDelete={() => onDelete(section)}
              onOpenDashboard={onSelectDashboard ? () => onSelectDashboard(section.id) : undefined}
            />
          ))
        )}
      </div>
    </div>
  );
}
