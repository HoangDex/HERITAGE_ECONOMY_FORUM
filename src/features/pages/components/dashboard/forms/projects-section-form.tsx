"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { FolderKanban, MapPin, ChevronDown, ChevronUp, TrendingUp, Users, ShieldCheck } from "lucide-react";

interface ProjectItem {
  id?: string;
  name?: string;
  slug?: string;
  location?: string;
  category?: string;
  description?: string;
  thumbnailUrl?: string;
  annualRevenue?: string;
  jobsCreated?: number;
  conservationShare?: string;
}

interface ProjectsSectionFormProps {
  propsData: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

export function ProjectsSectionForm({ propsData, onChange }: ProjectsSectionFormProps) {
  const projects = (Array.isArray(propsData.projects) ? propsData.projects : []) as ProjectItem[];
  const [expandedProj, setExpandedProj] = useState<number | null>(0);

  const updateProject = (index: number, field: keyof ProjectItem, value: string | number) => {
    const updated = [...projects];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange("projects", updated);
  };

  return (
    <div className="space-y-4">
      {/* NHÓM 1: TIÊU ĐỀ & THÔNG ĐIỆP */}
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#0D4838] uppercase tracking-wider">
          <FolderKanban className="w-4 h-4 text-[#C29B57]" />
          <span>Nhóm 1: Tiêu Đề Khối Mô Hình / Dự Án</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">
              Tiêu Đề Khối Mô Hình / Dự Án
            </label>
            <Input
              value={String(propsData.title || "")}
              onChange={(e) => onChange("title", e.target.value)}
              placeholder="Mô Hình & Sáng Kiến Điển Hình"
              className="h-9 text-xs bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">Đường Dẫn Xem Tất Cả</label>
            <Input
              value={String(propsData.viewAllLink || "/projects")}
              onChange={(e) => onChange("viewAllLink", e.target.value)}
              placeholder="/projects"
              className="h-9 text-xs bg-white"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#292929] block mb-1">Tiêu Đề Phụ (Subtitle)</label>
          <Input
            value={String(propsData.subtitle || "")}
            onChange={(e) => onChange("subtitle", e.target.value)}
            placeholder="Các dự án cân bằng giữa giữ gìn bản sắc và tạo sinh kế cộng đồng"
            className="h-9 text-xs bg-white"
          />
        </div>
      </div>

      {/* NHÓM 2: DANH SÁCH DỰ ÁN TIÊU BIỂU */}
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#76232D] uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C29B57]" />
            <span>Nhóm 2: Dự Án Điển Hình Đang Trưng Bày ({projects.length} dự án)</span>
          </div>
        </div>

        <div className="space-y-2">
          {projects.map((proj, idx) => {
            const isExpanded = expandedProj === idx;
            return (
              <div
                key={String(proj.id || idx)}
                className="rounded-xl border border-[#dfd7c8] bg-white overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setExpandedProj(isExpanded ? null : idx)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-[#FDFBF7] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[#0D4838] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <h5 className="font-bold text-xs text-[#292929] line-clamp-1">
                        {proj.name || `Dự án ${idx + 1}`}
                      </h5>
                      <p className="text-[10px] text-[#5c554b]">
                        {proj.location || ""} • {proj.category || ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {Boolean(proj.annualRevenue) && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {proj.annualRevenue}
                      </span>
                    )}
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-stone-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-500" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-3 pt-0 border-t border-[#dfd7c8]/60 space-y-2.5 bg-[#FAF7F2]/40">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Tên Dự Án
                        </label>
                        <Input
                          value={String(proj.name || "")}
                          onChange={(e) => updateProject(idx, "name", e.target.value)}
                          placeholder="Tên dự án..."
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Địa Phương / Tỉnh Thành
                        </label>
                        <Input
                          value={String(proj.location || "")}
                          onChange={(e) => updateProject(idx, "location", e.target.value)}
                          placeholder="Hội An, Quảng Nam"
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Phân Loại Mô Hình
                        </label>
                        <Input
                          value={String(proj.category || "")}
                          onChange={(e) => updateProject(idx, "category", e.target.value)}
                          placeholder="Di sản Kiến trúc Đô thị"
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Doanh Thu Hàng Năm
                        </label>
                        <Input
                          value={String(proj.annualRevenue || "")}
                          onChange={(e) => updateProject(idx, "annualRevenue", e.target.value)}
                          placeholder="48,5 tỷ VNĐ"
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Việc Làm Tạo Ra
                        </label>
                        <Input
                          type="number"
                          value={Number(proj.jobsCreated || 0)}
                          onChange={(e) => updateProject(idx, "jobsCreated", Number(e.target.value))}
                          placeholder="320"
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Tỷ Lệ Quỹ Bảo Tồn
                        </label>
                        <Input
                          value={String(proj.conservationShare || "")}
                          onChange={(e) => updateProject(idx, "conservationShare", e.target.value)}
                          placeholder="15% doanh thu vé"
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Đường Dẫn Ảnh (Thumbnail URL)
                        </label>
                        <Input
                          value={String(proj.thumbnailUrl || "")}
                          onChange={(e) => updateProject(idx, "thumbnailUrl", e.target.value)}
                          placeholder="https://..."
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#292929] block mb-1">
                          Slug Trang Chi Tiết
                        </label>
                        <Input
                          value={String(proj.slug || "")}
                          onChange={(e) => updateProject(idx, "slug", e.target.value)}
                          placeholder="bao-ton-kien-truc-go..."
                          className="h-8 text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#292929] block mb-1">
                        Tóm Tắt Mô Hình Hoạt Động
                      </label>
                      <textarea
                        rows={2}
                        value={String(proj.description || "")}
                        onChange={(e) => updateProject(idx, "description", e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border border-[#dfd7c8] bg-white leading-relaxed"
                        placeholder="Mô hình đối tác công tư kết hợp cộng đồng..."
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
