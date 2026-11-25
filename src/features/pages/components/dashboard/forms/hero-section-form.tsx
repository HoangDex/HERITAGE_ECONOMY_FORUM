"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  MessageSquare,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  BarChart3,
  MapPin,
  Tag,
} from "lucide-react";

interface HeroSectionFormProps {
  propsData: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

interface MetricItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export function HeroSectionForm({ propsData, onChange }: HeroSectionFormProps) {
  const primaryCta = (propsData.primaryCta as { label?: string; href?: string }) || {};
  const secondaryCta = (propsData.secondaryCta as { label?: string; href?: string }) || {};

  const metrics: MetricItem[] = Array.isArray(propsData.metrics) && propsData.metrics.length > 0
    ? (propsData.metrics as MetricItem[])
    : [
        { value: 500, suffix: "+", label: "Đại biểu dự kiến" },
        { value: 4, prefix: "0", label: "Phiên chuyên đề" },
        { value: 30, suffix: "+", label: "Mô hình di sản" },
      ];

  const handleMetricChange = (index: number, field: keyof MetricItem, val: string | number) => {
    const updated = [...metrics];
    updated[index] = { ...updated[index], [field]: val };
    onChange("metrics", updated);
  };

  return (
    <div className="space-y-4">
      {/* NHÓM 1: TIÊU ĐỀ & HUY HIỆU ĐẦU TRANG */}
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#76232D] uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#C29B57]" />
          <span>Nhóm 1: Nhận Diện & Tiêu Đề Hero Banner</span>
        </div>

        <div>
          <label className="text-xs font-bold text-[#292929] block mb-1">
            Huy Hiệu Đầu Trang (Badge Text)
          </label>
          <Input
            value={String(propsData.badgeText || "")}
            onChange={(e) => onChange("badgeText", e.target.value)}
            placeholder="NỀN TẢNG ĐỐI THOẠI & KẾT NỐI QUỐC GIA"
            className="h-9 text-xs bg-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">
              Tiêu Đề Tiếng Anh (English Title)
            </label>
            <Input
              value={String(propsData.title || "")}
              onChange={(e) => onChange("title", e.target.value)}
              placeholder="HERITAGE ECONOMY FORUM"
              className="h-9 text-xs bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">
              Tiêu Đề Tiếng Việt (Vietnamese Title)
            </label>
            <Input
              value={String(propsData.vietnameseTitle || "")}
              onChange={(e) => onChange("vietnameseTitle", e.target.value)}
              placeholder="DIỄN ĐÀN KINH TẾ DI SẢN"
              className="h-9 text-xs bg-white"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#292929] block mb-1">
            Khẩu Hiệu / Slogan Chiến Lược
          </label>
          <Input
            value={String(propsData.slogan || "")}
            onChange={(e) => onChange("slogan", e.target.value)}
            placeholder="Di sản kiến tạo giá trị – Phát triển hướng tương lai"
            className="h-9 text-xs bg-white"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-[#292929] block mb-1">
            Đoạn Văn Mô Tả Hero
          </label>
          <textarea
            rows={3}
            value={String(propsData.description || "")}
            onChange={(e) => onChange("description", e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-[#dfd7c8] bg-white focus:outline-hidden focus:ring-2 focus:ring-[#C29B57]"
            placeholder="Diễn đàn kết nối tri thức, nguồn lực và sáng kiến..."
          />
        </div>
      </div>

      {/* NHÓM 2: VIDEO NỀN DI SẢN CHUYỂN ĐỘNG */}
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#0D4838] uppercase tracking-wider">
          <Video className="w-4 h-4 text-[#C29B57]" />
          <span>Nhóm 2: Video Nền Di Sản Chạy Tự Động (Video Background)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">
              Đường Dẫn Video Nền (MP4 URL / Local File)
            </label>
            <Input
              value={String(propsData.videoUrl || "")}
              onChange={(e) => onChange("videoUrl", e.target.value)}
              placeholder="/videos/heritage-bg.mp4"
              className="h-9 text-xs bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">
              Tên Hiển Thị Trên Nút Điều Khiển Video
            </label>
            <Input
              value={String(propsData.videoTitle || "")}
              onChange={(e) => onChange("videoTitle", e.target.value)}
              placeholder="Video nền: Non nước Di sản"
              className="h-9 text-xs bg-white"
            />
          </div>
        </div>
      </div>

      {/* NHÓM 3: HÌNH ẢNH POSTER & THẺ ĐỊA ĐIỂM NỔI BẬT */}
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#76232D] uppercase tracking-wider">
          <ImageIcon className="w-4 h-4 text-[#C29B57]" />
          <span>Nhóm 3: Ảnh Lớn & Thẻ Thông Tin Nổi Bật Dưới Ảnh</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">
              Đường Dẫn Ảnh Poster / Banner URL
            </label>
            <Input
              value={String(propsData.imageUrl || "")}
              onChange={(e) => onChange("imageUrl", e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="h-9 text-xs bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1">
              Mô Tả Ảnh (Image Alt cho SEO)
            </label>
            <Input
              value={String(propsData.imageAlt || "")}
              onChange={(e) => onChange("imageAlt", e.target.value)}
              placeholder="Quần thể di sản văn hóa Việt Nam..."
              className="h-9 text-xs bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#0D4838]" />
              <span>Địa Điểm Chính Thức (Thẻ Dưới Ảnh)</span>
            </label>
            <Input
              value={String(propsData.locationBadge || "")}
              onChange={(e) => onChange("locationBadge", e.target.value)}
              placeholder="Hoàng thành Thăng Long, Hà Nội"
              className="h-9 text-xs bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#292929] block mb-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#C29B57]" />
              <span>Huy Hiệu Kỳ Tổ Chức (Thẻ Dưới Ảnh)</span>
            </label>
            <Input
              value={String(propsData.editionBadge || "")}
              onChange={(e) => onChange("editionBadge", e.target.value)}
              placeholder="Kỳ 2026"
              className="h-9 text-xs bg-white"
            />
          </div>
        </div>
      </div>

      {/* NHÓM 4: 03 CHỈ SỐ THỐNG KÊ NHANH (MICRO METRICS COUNTERS) */}
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#0D4838] uppercase tracking-wider">
          <BarChart3 className="w-4 h-4 text-[#C29B57]" />
          <span>Nhóm 4: 03 Chỉ Số Thống Kê Nhanh (Counters)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Chỉ số 1 */}
          <div className="p-3 bg-white rounded-lg border border-[#dfd7c8]/60 space-y-2">
            <span className="text-xs font-bold text-[#0D4838] block">Chỉ Số 1</span>
            <div className="grid grid-cols-2 gap-1.5">
              <div>
                <label className="text-[10px] text-muted-foreground block mb-0.5">Số lượng</label>
                <Input
                  type="number"
                  value={metrics[0]?.value || 500}
                  onChange={(e) => handleMetricChange(0, "value", Number(e.target.value))}
                  className="h-8 text-xs bg-[#FDFBF7]"
                />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground block mb-0.5">Hậu tố (Suffix)</label>
                <Input
                  value={metrics[0]?.suffix || "+"}
                  onChange={(e) => handleMetricChange(0, "suffix", e.target.value)}
                  className="h-8 text-xs bg-[#FDFBF7]"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground block mb-0.5">Nhãn hiển thị</label>
              <Input
                value={metrics[0]?.label || "Đại biểu dự kiến"}
                onChange={(e) => handleMetricChange(0, "label", e.target.value)}
                className="h-8 text-xs bg-[#FDFBF7]"
              />
            </div>
          </div>

          {/* Chỉ số 2 */}
          <div className="p-3 bg-white rounded-lg border border-[#dfd7c8]/60 space-y-2">
            <span className="text-xs font-bold text-[#0D4838] block">Chỉ Số 2</span>
            <div className="grid grid-cols-2 gap-1.5">
              <div>
                <label className="text-[10px] text-muted-foreground block mb-0.5">Số lượng</label>
                <Input
                  type="number"
                  value={metrics[1]?.value || 4}
                  onChange={(e) => handleMetricChange(1, "value", Number(e.target.value))}
                  className="h-8 text-xs bg-[#FDFBF7]"
                />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground block mb-0.5">Tiền tố (Prefix)</label>
                <Input
                  value={metrics[1]?.prefix || "0"}
                  onChange={(e) => handleMetricChange(1, "prefix", e.target.value)}
                  className="h-8 text-xs bg-[#FDFBF7]"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground block mb-0.5">Nhãn hiển thị</label>
              <Input
                value={metrics[1]?.label || "Phiên chuyên đề"}
                onChange={(e) => handleMetricChange(1, "label", e.target.value)}
                className="h-8 text-xs bg-[#FDFBF7]"
              />
            </div>
          </div>

          {/* Chỉ số 3 */}
          <div className="p-3 bg-white rounded-lg border border-[#dfd7c8]/60 space-y-2">
            <span className="text-xs font-bold text-[#0D4838] block">Chỉ Số 3</span>
            <div className="grid grid-cols-2 gap-1.5">
              <div>
                <label className="text-[10px] text-muted-foreground block mb-0.5">Số lượng</label>
                <Input
                  type="number"
                  value={metrics[2]?.value || 30}
                  onChange={(e) => handleMetricChange(2, "value", Number(e.target.value))}
                  className="h-8 text-xs bg-[#FDFBF7]"
                />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground block mb-0.5">Hậu tố (Suffix)</label>
                <Input
                  value={metrics[2]?.suffix || "+"}
                  onChange={(e) => handleMetricChange(2, "suffix", e.target.value)}
                  className="h-8 text-xs bg-[#FDFBF7]"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground block mb-0.5">Nhãn hiển thị</label>
              <Input
                value={metrics[2]?.label || "Mô hình di sản"}
                onChange={(e) => handleMetricChange(2, "label", e.target.value)}
                className="h-8 text-xs bg-[#FDFBF7]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* NHÓM 5: NÚT KÊU GỌI HÀNH ĐỘNG (CTA) */}
      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#dfd7c8] space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#dfd7c8]/60 text-xs font-bold text-[#76232D] uppercase tracking-wider">
          <LinkIcon className="w-4 h-4 text-[#C29B57]" />
          <span>Nhóm 5: Các Nút Kêu Gọi Hành Động (CTA Buttons)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-white rounded-lg border border-[#dfd7c8]/60 space-y-2">
            <span className="text-xs font-bold text-[#76232D] block">
              Nút Hành Động Chính (Primary CTA)
            </span>
            <Input
              value={String(primaryCta.label || "")}
              onChange={(e) => onChange("primaryCta", { ...primaryCta, label: e.target.value })}
              placeholder="Nhãn: Khám phá diễn đàn"
              className="h-8 text-xs bg-[#FDFBF7]"
            />
            <Input
              value={String(primaryCta.href || "")}
              onChange={(e) => onChange("primaryCta", { ...primaryCta, href: e.target.value })}
              placeholder="Đường dẫn: /forum"
              className="h-8 text-xs bg-[#FDFBF7]"
            />
          </div>

          <div className="p-3 bg-white rounded-lg border border-[#dfd7c8]/60 space-y-2">
            <span className="text-xs font-bold text-[#0D4838] block">
              Nút Hành Động Phụ (Secondary CTA)
            </span>
            <Input
              value={String(secondaryCta.label || "")}
              onChange={(e) => onChange("secondaryCta", { ...secondaryCta, label: e.target.value })}
              placeholder="Nhãn: Đăng ký tham dự"
              className="h-8 text-xs bg-[#FDFBF7]"
            />
            <Input
              value={String(secondaryCta.href || "")}
              onChange={(e) => onChange("secondaryCta", { ...secondaryCta, href: e.target.value })}
              placeholder="Đường dẫn: /contact"
              className="h-8 text-xs bg-[#FDFBF7]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
