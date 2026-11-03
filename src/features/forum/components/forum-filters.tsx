"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FORUM_CATEGORIES } from "@/lib/constants";

interface ForumFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ForumFilters({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: ForumFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm chủ đề, câu hỏi, chuyên gia thảo luận..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-card"
        />
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-sm no-scrollbar">
        {FORUM_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <Badge
              key={cat.id}
              variant={isActive ? "default" : "outline"}
              onClick={() => onSelectCategory(cat.id)}
              className="cursor-pointer whitespace-nowrap px-3 py-1 text-xs"
            >
              {cat.name}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
