"use client";

import React from "react";
import { Globe, Sparkles, Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SettingsTabProps {
  pageTitle: string;
  setPageTitle: (val: string) => void;
  isPublished: boolean;
  setIsPublished: (val: boolean) => void;
  pageDescription: string;
  setPageDescription: (val: string) => void;
  metaTitle: string;
  setMetaTitle: (val: string) => void;
  metaDescription: string;
  setMetaDescription: (val: string) => void;
  ogImage: string;
  setOgImage: (val: string) => void;
  isPending: boolean;
  onSave: () => void;
}

export function SettingsTab({
  pageTitle,
  setPageTitle,
  isPublished,
  setIsPublished,
  pageDescription,
  setPageDescription,
  metaTitle,
  setMetaTitle,
  metaDescription,
  setMetaDescription,
  ogImage,
  setOgImage,
  isPending,
  onSave,
}: SettingsTabProps) {
  return (
    <Card className="border-[#dfd7c8] bg-white shadow-xs rounded-2xl">
      <CardHeader className="p-6 pb-4 border-b border-[#dfd7c8]">
        <CardTitle className="text-xl font-serif font-bold text-[#0D4838] flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#C29B57]" /> Cấu Hình Trang & Thẻ SEO Quốc Tế
        </CardTitle>
        <CardDescription className="text-xs text-[#5c554b]">
          Quản lý định tuyến URL, mô tả tóm tắt và các thẻ Meta OpenGraph chia sẻ mạng xã hội
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#292929] uppercase tracking-wider">
              Tiêu đề Trang Web (Page Title)
            </label>
            <Input
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="bg-[#FDFBF7] border-[#dfd7c8] text-sm"
              placeholder="Nhập tiêu đề trang..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#292929] uppercase tracking-wider">
              Trạng Thái Xuất Bản
            </label>
            <div className="flex items-center gap-3 pt-1">
              <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 text-[#0D4838] rounded border-[#dfd7c8]"
                />
                <span>
                  {isPublished
                    ? "Đã Xuất Bản (Công khai trên Web)"
                    : "Lưu Bản Nháp (Chỉ Admin thấy)"}
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#292929] uppercase tracking-wider">
            Mô Tả Trang (Description)
          </label>
          <textarea
            value={pageDescription}
            onChange={(e) => setPageDescription(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-[#dfd7c8] bg-[#FDFBF7] p-3 text-sm focus:outline-none focus:border-[#0D4838]"
            placeholder="Mô tả tóm tắt nội dung chính của trang..."
          />
        </div>

        {/* SEO Section */}
        <div className="pt-4 border-t border-[#dfd7c8] space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C29B57]" />
            <h4 className="font-serif font-bold text-[#0D4838] text-sm">
              Thẻ SEO & OpenGraph (Chia Sẻ Facebook / Zalo / LinkedIn)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#5c554b]">SEO Meta Title:</label>
              <Input
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="bg-[#FDFBF7] border-[#dfd7c8] text-xs"
                placeholder="Tiêu đề hiển thị trên Google..."
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#5c554b]">
                Ảnh Bìa Chia Sẻ (OG Image URL):
              </label>
              <Input
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                className="bg-[#FDFBF7] border-[#dfd7c8] text-xs font-mono"
                placeholder="https://... ảnh thumbnail khi chia sẻ link"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#5c554b]">SEO Meta Description:</label>
            <Input
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="bg-[#FDFBF7] border-[#dfd7c8] text-xs"
              placeholder="Đoạn trích dẫn 150-160 ký tự trên Google Search..."
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#dfd7c8] flex justify-end">
          <Button
            onClick={onSave}
            disabled={isPending}
            className="bg-[#0D4838] hover:bg-[#073327] text-white font-bold px-6 py-2 rounded-xl shadow-md cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{isPending ? "Đang lưu..." : "Lưu Cài Đặt Trang"}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
