"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  Save,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Plus,
  Trash2,
  Layers,
  Layout,
  Calendar,
  Award,
  FolderKanban,
  Sparkles,
  BookOpen,
  MessageSquare,
  Network,
  TrendingUp,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateSectionAction } from "../actions/page.actions";
import type { PageEntity } from "../types/page.types";

interface DashboardLiveEditorProps {
  initialPage: PageEntity;
}

type ActiveSectionTab = "hero" | "pillars" | "event" | "awards" | "projects" | "cta";

export function DashboardLiveEditor({ initialPage }: DashboardLiveEditorProps) {
  const [activeTab, setActiveTab] = useState<ActiveSectionTab>("hero");
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  // 1. Form State for Hero Section
  const [badgeText, setBadgeText] = useState("★ VIỆN KINH TẾ DI SẢN VĂN HÓA - HEF ★");
  const [mainTitle, setMainTitle] = useState("DIỄN ĐÀN KINH TẾ DI SẢN");
  const [subTitle, setSubTitle] = useState("HERITAGE ECONOMY FORUM 2026");
  const [slogan, setSlogan] = useState("“Di sản kiến tạo giá trị – Phát triển hướng tương lai”");

  const [btn1Text, setBtn1Text] = useState("Khám phá diễn đàn");
  const [btn1Link, setBtn1Link] = useState("/forum");
  const [btn2Text, setBtn2Text] = useState("Đăng ký tham dự");
  const [btn2Link, setBtn2Link] = useState("/contact?loai=tham-du#contact-form");

  const [stat1Val, setStat1Val] = useState("500+");
  const [stat1Label, setStat1Label] = useState("Đại biểu dự kiến");
  const [stat2Val, setStat2Val] = useState("04");
  const [stat2Label, setStat2Label] = useState("Phiên chuyên đề");
  const [stat3Val, setStat3Val] = useState("30+");
  const [stat3Label, setStat3Label] = useState("Mô hình di sản");
  const [stat4Val, setStat4Val] = useState("100+");
  const [stat4Label, setStat4Label] = useState("Cơ quan báo chí");

  // 2. Form State for 05 Trụ Cột Di Sản (Pillars)
  const [pillarsIntro, setPillarsIntro] = useState(
    "Diễn đàn Kinh tế Di sản là không gian đối thoại liên ngành giữa nhà khoa học, nhà quản lý, doanh nghiệp và cộng đồng..."
  );
  const [p1Title, setP1Title] = useState("Nghiên cứu");
  const [p1Desc, setP1Desc] = useState(
    "Khảo sát, lượng hóa giá trị kinh tế của di sản, xây dựng cơ sở lý luận và chỉ số."
  );
  const [p2Title, setP2Title] = useState("Đối thoại");
  const [p2Desc, setP2Desc] = useState(
    "Tạo lập bàn tròn đối thoại cởi mở giữa cơ quan quản lý, viện nghiên cứu và doanh nghiệp."
  );
  const [p3Title, setP3Title] = useState("Kết nối");
  const [p3Desc, setP3Desc] = useState(
    "Mạng lưới hợp tác công tư (PPP), kêu gọi đầu tư vào các dự án bảo tồn thích ứng."
  );
  const [p4Title, setP4Title] = useState("Ghi nhận");
  const [p4Desc, setP4Desc] = useState(
    "Vinh danh các sáng kiến, mô hình và điển hình phát triển bền vững chủ động."
  );
  const [p5Title, setP5Title] = useState("Phát triển");
  const [p5Desc, setP5Desc] = useState(
    "Nhân rộng các mô hình kinh tế di sản tự thân, sinh kế bền vững cho cộng đồng."
  );

  // 3. Form State for Event Highlight
  const [eventTitle, setEventTitle] = useState("Diễn đàn Kinh tế Di sản 2026");
  const [eventTheme, setEventTheme] = useState(
    "Di sản kiến tạo giá trị – Phát triển hướng tương lai"
  );
  const [eventDates, setEventDates] = useState("18 – 20 tháng 11 năm 2026");
  const [eventVenue, setEventVenue] = useState("Hoàng thành Thăng Long, Hà Nội");
  const [eventIsConfirmed, setEventIsConfirmed] = useState(false);

  // 4. Form State for Awards Section
  const [awardTitle, setAwardTitle] = useState("Giải thưởng Phát triển Bền vững Chủ động");
  const [awardEnglish, setAwardEnglish] = useState("Proactive Sustainable Development Awards");
  const [awardSlogan, setAwardSlogan] = useState("Kiến tạo giá trị – Phụng sự vị nhân sinh");

  // 5. Form State for Projects
  const [projectsTitle, setProjectsTitle] = useState("Danh Mục Dự Án Kinh Tế Di Sản");
  const [projectsDesc, setProjectsDesc] = useState(
    "Khám phá các mô hình phát triển sinh kế cộng đồng, số hóa di sản và kinh tế đêm bảo tồn thích ứng."
  );

  // 6. Form State for CTA
  const [ctaTitle, setCtaTitle] = useState("Cùng Kiến Tạo Giá Trị Di Sản");
  const [ctaDesc, setCtaDesc] = useState(
    "Đồng hành cùng Diễn đàn trong các hoạt động nghiên cứu, đề cử giải thưởng, phát triển dự án và đăng ký đại biểu."
  );

  const showNotification = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleSaveActiveSection = () => {
    startTransition(async () => {
      // Tìm section tương ứng trong initialPage
      const targetType =
        activeTab === "hero"
          ? "HERO"
          : activeTab === "pillars"
            ? "PILLARS"
            : activeTab === "event"
              ? "EVENT"
              : activeTab === "awards"
                ? "AWARDS"
                : activeTab === "projects"
                  ? "PROJECTS"
                  : "CTA";

      const section = initialPage.sections.find((s) => s.type === targetType);
      const sectionId = section?.id || `sec_${activeTab}`;

      const res = await updateSectionAction(initialPage.id, sectionId, {
        title:
          activeTab === "hero"
            ? mainTitle
            : activeTab === "pillars"
              ? "05 Trụ Cột Di Sản"
              : activeTab === "event"
                ? eventTitle
                : activeTab === "awards"
                  ? awardTitle
                  : activeTab === "projects"
                    ? projectsTitle
                    : ctaTitle,
        subtitle: activeTab === "hero" ? slogan : activeTab === "event" ? eventTheme : undefined,
        props: {
          badge: badgeText,
          subTitle,
          ctaPrimaryText: btn1Text,
          ctaPrimaryLink: btn1Link,
          ctaSecondaryText: btn2Text,
          ctaSecondaryLink: btn2Link,
          stats: [
            { value: stat1Val, label: stat1Label },
            { value: stat2Val, label: stat2Label },
            { value: stat3Val, label: stat3Label },
            { value: stat4Val, label: stat4Label },
          ],
        },
      });

      if (res.success) {
        showNotification("success", `Đã lưu cấu hình khối ${activeTab.toUpperCase()} thành công!`);
      } else {
        showNotification("error", res.error || `Lỗi khi lưu khối ${activeTab.toUpperCase()}`);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between text-sm shadow-md transition-all ${
            feedback.type === "success"
              ? "bg-emerald-50 border border-emerald-300 text-emerald-800"
              : "bg-red-50 border border-red-300 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span className="font-semibold">{feedback.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-xs font-bold px-2 py-1 rounded hover:bg-black/5 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      )}

      {/* 1. Header Khu Vực Quản Trị Nội Dung */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E2D5]">
        <div>
          <span className="text-[10px] font-bold text-[#D4A017] uppercase tracking-wider font-mono">
            — KHU VỰC QUẢN TRỊ NỘI DUNG (CMS HEF)
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0D4838] mt-1">
            Quản lý Trang chủ
          </h1>
          <p className="text-xs sm:text-sm text-[#5c554b] mt-1">
            Cấu hình thời gian thực Hero, 05 Trụ cột, Sự kiện nổi bật, Giải thưởng, Dự án và Banner
            chuyển đổi theo đúng PRD.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>API Kết nối trực tiếp</span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#D4A017]/40 text-[#0D4838] bg-white hover:bg-[#F5EFE5] transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#D4A017]" />
            <span>Xem trang chủ</span>
          </Link>
        </div>
      </div>

      {/* 2. Horizontal Section Selector Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab("hero")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
            activeTab === "hero"
              ? "bg-[#D4A017] text-[#292929] shadow-sm font-bold"
              : "bg-white text-[#5c554b] hover:text-[#292929] hover:bg-[#F5EFE5] border border-[#E8E2D5]"
          }`}
        >
          <Layout className="w-3.5 h-3.5" />
          <span>Hero Section</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("pillars")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
            activeTab === "pillars"
              ? "bg-[#D4A017] text-[#292929] shadow-sm font-bold"
              : "bg-white text-[#5c554b] hover:text-[#292929] hover:bg-[#F5EFE5] border border-[#E8E2D5]"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>05 Trụ Cột Di Sản</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("event")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
            activeTab === "event"
              ? "bg-[#D4A017] text-[#292929] shadow-sm font-bold"
              : "bg-white text-[#5c554b] hover:text-[#292929] hover:bg-[#F5EFE5] border border-[#E8E2D5]"
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Tiêu Điểm Kỳ Diễn Đàn</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("awards")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
            activeTab === "awards"
              ? "bg-[#D4A017] text-[#292929] shadow-sm font-bold"
              : "bg-white text-[#5c554b] hover:text-[#292929] hover:bg-[#F5EFE5] border border-[#E8E2D5]"
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Vinh Danh Giải Thưởng</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
            activeTab === "projects"
              ? "bg-[#D4A017] text-[#292929] shadow-sm font-bold"
              : "bg-white text-[#5c554b] hover:text-[#292929] hover:bg-[#F5EFE5] border border-[#E8E2D5]"
          }`}
        >
          <FolderKanban className="w-3.5 h-3.5" />
          <span>Mô Hình Dự Án</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("cta")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
            activeTab === "cta"
              ? "bg-[#D4A017] text-[#292929] shadow-sm font-bold"
              : "bg-white text-[#5c554b] hover:text-[#292929] hover:bg-[#F5EFE5] border border-[#E8E2D5]"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Banner Chuyển Đổi (CTA)</span>
        </button>
      </div>

      {/* 3. Bố Cục Tách Đôi 2 Cột: Cột Trái Cấu Hình Form - Cột Phải Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ======================================================== */}
        {/* CỘT TRÁI (7 COLS): FORM CẤU HÌNH SECTION THEO TAB ĐANG CHỌN */}
        {/* ======================================================== */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E8E2D5] shadow-xs overflow-hidden">
          {/* Header Card Form */}
          <div className="p-5 border-b border-[#E8E2D5] flex items-center justify-between bg-[#FDFBF7]">
            <div>
              <h2 className="text-base font-serif font-bold text-[#0D4838]">
                {activeTab === "hero" && "Cấu hình Hero Section"}
                {activeTab === "pillars" && "Cấu hình 05 Trụ Cột Di Sản (Section 05)"}
                {activeTab === "event" && "Cấu hình Kỳ Diễn Đàn Nổi Bật (Section 07)"}
                {activeTab === "awards" && "Cấu hình Giải Thưởng Bền Vững (Section 08)"}
                {activeTab === "projects" && "Cấu hình 04 Nhóm Dự Án (Section 10)"}
                {activeTab === "cta" && "Cấu hình 3 Tuyến Chuyển Đổi & CTA Cuối"}
              </h2>
              <p className="text-xs text-[#5c554b]">
                {activeTab === "hero" && "Quản lý tiêu đề, khẩu hiệu, nút bấm và số liệu thống kê"}
                {activeTab === "pillars" &&
                  "Nghiên cứu, Đối thoại, Kết nối, Ghi nhận và Phát triển"}
                {activeTab === "event" &&
                  "Tên, chủ đề, mốc thời gian, địa điểm và trạng thái phê duyệt"}
                {activeTab === "awards" &&
                  "Thông điệp, hạng mục tham khảo và triết lý vị nhân sinh"}
                {activeTab === "projects" &&
                  "Di sản nghệ thuật, kinh tế cộng đồng, số hóa và không gian"}
                {activeTab === "cta" && "Lời kêu gọi tham dự, đề cử và hợp tác chiến lược"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-[#D4A017]/20 text-[#8B6B2F] border-none font-mono text-[10px] font-bold">
                khối {activeTab}
              </Badge>
              <Button
                onClick={handleSaveActiveSection}
                disabled={isPending}
                className="bg-[#0D4838] hover:bg-[#073327] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isPending ? "Đang lưu..." : "Lưu Thay Đổi"}</span>
              </Button>
            </div>
          </div>

          {/* Form Body theo Tab */}
          <div className="p-5 space-y-4 text-xs">
            {/* TAB 1: HERO SECTION */}
            {activeTab === "hero" && (
              <>
                <div className="space-y-1.5">
                  <label className="font-bold text-[#292929] uppercase tracking-wider text-[11px]">
                    BADGE HUY HIỆU *
                  </label>
                  <Input
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    className="bg-[#FDFBF7] border-[#DCD3C3] text-xs h-9"
                    placeholder="VD: ★ VIỆN KINH TẾ DI SẢN VĂN HÓA - HEF ★"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#292929] uppercase tracking-wider text-[11px]">
                    TIÊU ĐỀ CHÍNH *
                  </label>
                  <Input
                    value={mainTitle}
                    onChange={(e) => setMainTitle(e.target.value)}
                    className="bg-[#FDFBF7] border-[#DCD3C3] text-xs font-serif font-bold h-9"
                    placeholder="VD: DIỄN ĐÀN KINH TẾ DI SẢN"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#292929] uppercase tracking-wider text-[11px]">
                    TIÊU ĐỀ PHỤ / ĐỊNH VỊ *
                  </label>
                  <Input
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                    className="bg-[#FDFBF7] border-[#DCD3C3] text-xs h-9 font-medium"
                    placeholder="VD: HERITAGE ECONOMY FORUM 2026"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#292929] uppercase tracking-wider text-[11px]">
                    CHÂM NGÔN / TRÍCH DẪN *
                  </label>
                  <textarea
                    value={slogan}
                    onChange={(e) => setSlogan(e.target.value)}
                    rows={2}
                    className="w-full rounded-xl border border-[#DCD3C3] bg-[#FDFBF7] p-2.5 text-xs focus:outline-none focus:border-[#0D4838]"
                    placeholder="VD: “Di sản kiến tạo giá trị – Phát triển hướng tương lai”"
                  />
                </div>

                {/* Danh Sách Nút Bấm */}
                <div className="pt-3 border-t border-[#E8E2D5] space-y-3">
                  <h3 className="font-bold text-[#292929] text-xs">Nút bấm hành động (CTA)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="p-2.5 bg-[#FDFBF7] rounded-xl border border-[#E8E2D5] space-y-1">
                      <label className="text-[10px] font-bold text-[#0D4838]">Nút 1 (Chính)</label>
                      <Input
                        value={btn1Text}
                        onChange={(e) => setBtn1Text(e.target.value)}
                        className="bg-white text-xs h-8"
                      />
                      <Input
                        value={btn1Link}
                        onChange={(e) => setBtn1Link(e.target.value)}
                        className="bg-white text-xs h-8 font-mono text-[11px]"
                      />
                    </div>
                    <div className="p-2.5 bg-[#FDFBF7] rounded-xl border border-[#E8E2D5] space-y-1">
                      <label className="text-[10px] font-bold text-[#0D4838]">Nút 2 (Phụ)</label>
                      <Input
                        value={btn2Text}
                        onChange={(e) => setBtn2Text(e.target.value)}
                        className="bg-white text-xs h-8"
                      />
                      <Input
                        value={btn2Link}
                        onChange={(e) => setBtn2Link(e.target.value)}
                        className="bg-white text-xs h-8 font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                {/* 4 Chỉ Số KPIs */}
                <div className="pt-3 border-t border-[#E8E2D5] space-y-2.5">
                  <h3 className="font-bold text-[#292929] text-xs">
                    Số liệu thống kê chân Hero (4 Chỉ số)
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#FDFBF7] p-2 rounded-lg border border-[#E8E2D5] space-y-1">
                      <Input
                        value={stat1Val}
                        onChange={(e) => setStat1Val(e.target.value)}
                        className="bg-white text-xs h-7 font-bold text-[#0D4838]"
                      />
                      <Input
                        value={stat1Label}
                        onChange={(e) => setStat1Label(e.target.value)}
                        className="bg-white text-[11px] h-7"
                      />
                    </div>
                    <div className="bg-[#FDFBF7] p-2 rounded-lg border border-[#E8E2D5] space-y-1">
                      <Input
                        value={stat2Val}
                        onChange={(e) => setStat2Val(e.target.value)}
                        className="bg-white text-xs h-7 font-bold text-[#0D4838]"
                      />
                      <Input
                        value={stat2Label}
                        onChange={(e) => setStat2Label(e.target.value)}
                        className="bg-white text-[11px] h-7"
                      />
                    </div>
                    <div className="bg-[#FDFBF7] p-2 rounded-lg border border-[#E8E2D5] space-y-1">
                      <Input
                        value={stat3Val}
                        onChange={(e) => setStat3Val(e.target.value)}
                        className="bg-white text-xs h-7 font-bold text-[#0D4838]"
                      />
                      <Input
                        value={stat3Label}
                        onChange={(e) => setStat3Label(e.target.value)}
                        className="bg-white text-[11px] h-7"
                      />
                    </div>
                    <div className="bg-[#FDFBF7] p-2 rounded-lg border border-[#E8E2D5] space-y-1">
                      <Input
                        value={stat4Val}
                        onChange={(e) => setStat4Val(e.target.value)}
                        className="bg-white text-xs h-7 font-bold text-[#0D4838]"
                      />
                      <Input
                        value={stat4Label}
                        onChange={(e) => setStat4Label(e.target.value)}
                        className="bg-white text-[11px] h-7"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* TAB 2: 05 TRỤ CỘT DI SẢN */}
            {activeTab === "pillars" && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-[#292929] uppercase tracking-wider text-[11px]">
                    ĐOẠN DẪN GIỚI THIỆU NHANH (40% KHỐI) *
                  </label>
                  <textarea
                    value={pillarsIntro}
                    onChange={(e) => setPillarsIntro(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-[#DCD3C3] bg-[#FDFBF7] p-2.5 text-xs focus:outline-none focus:border-[#0D4838]"
                  />
                </div>

                <div className="space-y-3 pt-2 border-t border-[#E8E2D5]">
                  <h3 className="font-bold text-[#292929] text-xs">
                    Danh mục 05 Trụ cột (60% Khối)
                  </h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#E8E2D5] space-y-1">
                      <span className="font-bold text-[#0D4838] text-xs">
                        Trụ cột 01: {p1Title}
                      </span>
                      <Input
                        value={p1Desc}
                        onChange={(e) => setP1Desc(e.target.value)}
                        className="bg-white text-xs h-8"
                      />
                    </div>
                    <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#E8E2D5] space-y-1">
                      <span className="font-bold text-[#0D4838] text-xs">
                        Trụ cột 02: {p2Title}
                      </span>
                      <Input
                        value={p2Desc}
                        onChange={(e) => setP2Desc(e.target.value)}
                        className="bg-white text-xs h-8"
                      />
                    </div>
                    <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#E8E2D5] space-y-1">
                      <span className="font-bold text-[#0D4838] text-xs">
                        Trụ cột 03: {p3Title}
                      </span>
                      <Input
                        value={p3Desc}
                        onChange={(e) => setP3Desc(e.target.value)}
                        className="bg-white text-xs h-8"
                      />
                    </div>
                    <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#E8E2D5] space-y-1">
                      <span className="font-bold text-[#0D4838] text-xs">
                        Trụ cột 04: {p4Title}
                      </span>
                      <Input
                        value={p4Desc}
                        onChange={(e) => setP4Desc(e.target.value)}
                        className="bg-white text-xs h-8"
                      />
                    </div>
                    <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#E8E2D5] space-y-1">
                      <span className="font-bold text-[#0D4838] text-xs">
                        Trụ cột 05: {p5Title}
                      </span>
                      <Input
                        value={p5Desc}
                        onChange={(e) => setP5Desc(e.target.value)}
                        className="bg-white text-xs h-8"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: TIÊU ĐIỂM KỲ DIỄN ĐÀN */}
            {activeTab === "event" && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-[#292929] uppercase tracking-wider text-[11px]">
                    TÊN KỲ DIỄN ĐÀN *
                  </label>
                  <Input
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    className="bg-[#FDFBF7] border-[#DCD3C3] text-xs h-9 font-serif font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#292929] uppercase tracking-wider text-[11px]">
                    CHỦ ĐỀ CHÍNH *
                  </label>
                  <Input
                    value={eventTheme}
                    onChange={(e) => setEventTheme(e.target.value)}
                    className="bg-[#FDFBF7] border-[#DCD3C3] text-xs h-9 italic"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#292929] uppercase tracking-wider text-[11px]">
                      THỜI GIAN *
                    </label>
                    <Input
                      value={eventDates}
                      onChange={(e) => setEventDates(e.target.value)}
                      className="bg-[#FDFBF7] border-[#DCD3C3] text-xs h-9"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#292929] uppercase tracking-wider text-[11px]">
                      ĐỊA ĐIỂM TỔ CHỨC *
                    </label>
                    <Input
                      value={eventVenue}
                      onChange={(e) => setEventVenue(e.target.value)}
                      className="bg-[#FDFBF7] border-[#DCD3C3] text-xs h-9"
                    />
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="confirmStatus"
                      checked={eventIsConfirmed}
                      onChange={(e) => setEventIsConfirmed(e.target.checked)}
                      className="rounded text-[#0D4838] cursor-pointer"
                    />
                    <label
                      htmlFor="confirmStatus"
                      className="font-bold text-amber-900 text-xs cursor-pointer"
                    >
                      Đã xác nhận lịch chính thức (Mặc định: Chờ phê duyệt)
                    </label>
                  </div>
                  <p className="text-[11px] text-amber-800">
                    Theo PRD Section 07: Mốc 18/11/2026 là kế hoạch gần đây, cần hiển thị nhãn dự
                    kiến trước khi xác nhận chính thức.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 4: GIẢI THƯỞNG BỀN VỮNG */}
            {activeTab === "awards" && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-[#292929] uppercase tracking-wider text-[11px]">
                    TÊN GIẢI THƯỞNG *
                  </label>
                  <Input
                    value={awardTitle}
                    onChange={(e) => setAwardTitle(e.target.value)}
                    className="bg-[#FDFBF7] border-[#DCD3C3] text-xs h-9 font-serif font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#292929] uppercase tracking-wider text-[11px]">
                    TÊN TIẾNG ANH ĐỀ XUẤT *
                  </label>
                  <Input
                    value={awardEnglish}
                    onChange={(e) => setAwardEnglish(e.target.value)}
                    className="bg-[#FDFBF7] border-[#DCD3C3] text-xs h-9"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#292929] uppercase tracking-wider text-[11px]">
                    THÔNG ĐIỆP CỐT LÕI (PRD Section 08) *
                  </label>
                  <Input
                    value={awardSlogan}
                    onChange={(e) => setAwardSlogan(e.target.value)}
                    className="bg-[#FDFBF7] border-[#DCD3C3] text-xs h-9 font-serif italic"
                  />
                </div>
              </div>
            )}

            {/* TAB 5: MÔ HÌNH DỰ ÁN */}
            {activeTab === "projects" && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-[#292929] uppercase tracking-wider text-[11px]">
                    TIÊU ĐỀ KHỐI DỰ ÁN *
                  </label>
                  <Input
                    value={projectsTitle}
                    onChange={(e) => setProjectsTitle(e.target.value)}
                    className="bg-[#FDFBF7] border-[#DCD3C3] text-xs h-9 font-serif font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#292929] uppercase tracking-wider text-[11px]">
                    LỜI DẪN CHUYÊN MỤC *
                  </label>
                  <textarea
                    value={projectsDesc}
                    onChange={(e) => setProjectsDesc(e.target.value)}
                    rows={2}
                    className="w-full rounded-xl border border-[#DCD3C3] bg-[#FDFBF7] p-2.5 text-xs focus:outline-none focus:border-[#0D4838]"
                  />
                </div>

                <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#E8E2D5] space-y-1">
                  <span className="font-bold text-[#0D4838] text-xs">
                    04 Nhóm Dự án Chuẩn (PRD Section 10):
                  </span>
                  <ul className="list-disc list-inside text-[11px] text-[#5c554b] space-y-0.5 pt-1">
                    <li>Di sản & Nghệ thuật (thực hành sáng tạo, làng nghề lụa, gốm)</li>
                    <li>Kinh tế & Cộng đồng (sinh kế bản địa, du lịch Tràng An, Mai Châu)</li>
                    <li>Di sản số (số hóa 3D, bảo tàng số, dữ liệu di sản)</li>
                    <li>Không gian Di sản (Hoàng thành Thăng Long, Phố cổ Hội An)</li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 6: BANNER CHUYỂN ĐỔI (CTA) */}
            {activeTab === "cta" && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-[#292929] uppercase tracking-wider text-[11px]">
                    TIÊU ĐỀ KÊU GỌI HÀNH ĐỘNG *
                  </label>
                  <Input
                    value={ctaTitle}
                    onChange={(e) => setCtaTitle(e.target.value)}
                    className="bg-[#FDFBF7] border-[#DCD3C3] text-xs h-9 font-serif font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#292929] uppercase tracking-wider text-[11px]">
                    NỘI DUNG TUYÊN BỐ ĐỒNG HÀNH *
                  </label>
                  <textarea
                    value={ctaDesc}
                    onChange={(e) => setCtaDesc(e.target.value)}
                    rows={2}
                    className="w-full rounded-xl border border-[#DCD3C3] bg-[#FDFBF7] p-2.5 text-xs focus:outline-none focus:border-[#0D4838]"
                  />
                </div>
              </div>
            )}

            {/* Bottom Save Bar */}
            <div className="pt-4 border-t border-[#E8E2D5] flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">
                Nhấn lưu để đồng bộ trực tiếp nội dung khối này ra toàn hệ thống website.
              </span>
              <Button
                onClick={handleSaveActiveSection}
                disabled={isPending}
                className="bg-[#0D4838] hover:bg-[#073327] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isPending ? "Đang lưu..." : `Lưu Khối ${activeTab.toUpperCase()}`}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CỘT PHẢI (5 COLS): XEM TRƯỚC TRỰC TIẾP (LIVE PREVIEW)   */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 space-y-2 sticky top-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold text-[#D4A017] uppercase tracking-wider font-mono">
              XEM TRƯỚC TRỰC TIẾP (LIVE PREVIEW)
            </span>
            <span className="text-[10px] text-muted-foreground">
              {activeTab === "hero" && "Trang chủ • Hero"}
              {activeTab === "pillars" && "Trang chủ • 05 Trụ cột"}
              {activeTab === "event" && "Trang chủ • Tiêu điểm"}
              {activeTab === "awards" && "Trang chủ • Giải thưởng"}
              {activeTab === "projects" && "Trang chủ • Dự án"}
              {activeTab === "cta" && "Trang chủ • Tuyến CTA"}
            </span>
          </div>

          {/* PREVIEW TAB 1: HERO */}
          {activeTab === "hero" && (
            <div
              className="text-white rounded-2xl p-6 shadow-xl border-2 border-[#C29B57]/50 space-y-5 text-center relative overflow-hidden bg-[#073327] bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(7, 51, 39, 0.88), rgba(4, 29, 22, 0.94)), url('/images/hef-official-backdrop.jpg')",
              }}
            >
              <div className="inline-block">
                <span className="text-[9px] font-bold tracking-widest text-[#D4A017] uppercase px-3 py-1 rounded-full bg-black/30 border border-[#D4A017]/40 shadow-xs">
                  {badgeText}
                </span>
              </div>
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-serif font-black tracking-tight leading-tight">
                  {mainTitle}
                </h2>
                {subTitle && (
                  <div className="text-[10px] font-bold tracking-widest text-[#D4A017] uppercase">
                    {subTitle}
                  </div>
                )}
              </div>
              <div className="text-xs italic text-white/90 bg-black/25 px-4 py-2 rounded-xl border border-white/10 max-w-sm mx-auto leading-relaxed">
                {slogan}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                <div className="bg-[#D4A017] text-[#292929] text-[11px] font-bold px-4 py-2 rounded-lg shadow-sm">
                  {btn1Text}
                </div>
                <div className="border border-white/40 text-white text-[11px] font-semibold px-4 py-2 rounded-lg bg-white/5">
                  {btn2Text}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
                <div className="bg-black/25 p-2 rounded-xl border border-white/10">
                  <div className="text-sm font-bold font-serif text-[#D4A017]">{stat1Val}</div>
                  <div className="text-[9px] text-white/70">{stat1Label}</div>
                </div>
                <div className="bg-black/25 p-2 rounded-xl border border-white/10">
                  <div className="text-sm font-bold font-serif text-[#D4A017]">{stat2Val}</div>
                  <div className="text-[9px] text-white/70">{stat2Label}</div>
                </div>
                <div className="bg-black/25 p-2 rounded-xl border border-white/10">
                  <div className="text-sm font-bold font-serif text-[#D4A017]">{stat3Val}</div>
                  <div className="text-[9px] text-white/70">{stat3Label}</div>
                </div>
                <div className="bg-black/25 p-2 rounded-xl border border-white/10">
                  <div className="text-sm font-bold font-serif text-[#D4A017]">{stat4Val}</div>
                  <div className="text-[9px] text-white/70">{stat4Label}</div>
                </div>
              </div>
            </div>
          )}

          {/* PREVIEW TAB 2: PILLARS */}
          {activeTab === "pillars" && (
            <div className="bg-white rounded-2xl p-5 border border-[#dfd7c8] shadow-md space-y-4">
              <div className="p-3 bg-[#F7F5EE] rounded-xl text-xs text-[#5c554b] leading-relaxed italic border-l-2 border-[#0D4838]">
                {pillarsIntro}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-[#FDFBF7] border border-[#dfd7c8]">
                  <BookOpen className="w-4 h-4 text-[#0D4838] shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs text-[#0D4838]">01. {p1Title}</h4>
                    <p className="text-[10px] text-[#5c554b] line-clamp-1">{p1Desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-[#FDFBF7] border border-[#dfd7c8]">
                  <MessageSquare className="w-4 h-4 text-[#0D4838] shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs text-[#0D4838]">02. {p2Title}</h4>
                    <p className="text-[10px] text-[#5c554b] line-clamp-1">{p2Desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-[#FDFBF7] border border-[#dfd7c8]">
                  <Network className="w-4 h-4 text-[#0D4838] shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs text-[#0D4838]">03. {p3Title}</h4>
                    <p className="text-[10px] text-[#5c554b] line-clamp-1">{p3Desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-[#FDFBF7] border border-[#dfd7c8]">
                  <Award className="w-4 h-4 text-[#0D4838] shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs text-[#0D4838]">04. {p4Title}</h4>
                    <p className="text-[10px] text-[#5c554b] line-clamp-1">{p4Desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-[#FDFBF7] border border-[#dfd7c8]">
                  <TrendingUp className="w-4 h-4 text-[#0D4838] shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs text-[#0D4838]">05. {p5Title}</h4>
                    <p className="text-[10px] text-[#5c554b] line-clamp-1">{p5Desc}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PREVIEW TAB 3: EVENT */}
          {activeTab === "event" && (
            <div className="bg-[#073327] text-white rounded-2xl p-5 border border-[#C29B57]/50 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase font-bold tracking-wider bg-[#C29B57]/20 text-[#C29B57] px-2.5 py-0.5 rounded-full">
                  Kỳ Diễn Đàn Nổi Bật
                </span>
                <span
                  className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                    eventIsConfirmed
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-amber-500/20 text-amber-300"
                  }`}
                >
                  {eventIsConfirmed ? "Đã Phê Duyệt" : "Lịch Dự Kiến"}
                </span>
              </div>
              <h3 className="text-lg font-serif font-bold text-white">{eventTitle}</h3>
              <p className="text-xs text-[#C29B57] italic">“{eventTheme}”</p>
              <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs text-white/80">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C29B57]" />
                  <span>{eventDates}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C29B57]" />
                  <span>{eventVenue}</span>
                </div>
              </div>
              <div className="pt-2 flex gap-2">
                <div className="flex-1 bg-[#0D4838] text-center py-1.5 rounded-lg text-xs font-semibold">
                  Đăng ký tham dự
                </div>
                <div className="flex-1 border border-white/30 text-center py-1.5 rounded-lg text-xs">
                  Xem timeline
                </div>
              </div>
            </div>
          )}

          {/* PREVIEW TAB 4: AWARDS */}
          {activeTab === "awards" && (
            <div className="bg-white rounded-2xl p-5 border border-[#dfd7c8] shadow-md space-y-3">
              <span className="text-[9px] uppercase font-bold tracking-wider bg-[#0D4838]/10 text-[#0D4838] px-2.5 py-0.5 rounded-full">
                Hệ Thống Giải Thưởng
              </span>
              <h3 className="text-base font-serif font-bold text-[#0D4838]">{awardTitle}</h3>
              <p className="text-[11px] text-[#5c554b]">{awardEnglish}</p>
              <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#C29B57]/40 text-center">
                <p className="text-xs font-serif font-bold text-[#0D4838] italic">
                  “{awardSlogan}”
                </p>
              </div>
              <div className="text-[10px] text-[#5c554b]">
                Bao gồm 08 hạng mục xét chọn tham khảo và quy trình đánh giá 07 bước minh bạch.
              </div>
            </div>
          )}

          {/* PREVIEW TAB 5: PROJECTS */}
          {activeTab === "projects" && (
            <div className="bg-white rounded-2xl p-5 border border-[#dfd7c8] shadow-md space-y-3">
              <h3 className="text-base font-serif font-bold text-[#0D4838]">{projectsTitle}</h3>
              <p className="text-xs text-[#5c554b]">{projectsDesc}</p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-2 bg-[#FDFBF7] rounded-lg border border-[#dfd7c8] text-center">
                  <span className="font-bold text-[11px] text-[#0D4838] block">Nghệ thuật</span>
                  <span className="text-[9px] text-[#5c554b]">Gốm, lụa thủ công</span>
                </div>
                <div className="p-2 bg-[#FDFBF7] rounded-lg border border-[#dfd7c8] text-center">
                  <span className="font-bold text-[11px] text-[#0D4838] block">Cộng đồng</span>
                  <span className="text-[9px] text-[#5c554b]">Sinh kế Tràng An</span>
                </div>
                <div className="p-2 bg-[#FDFBF7] rounded-lg border border-[#dfd7c8] text-center">
                  <span className="font-bold text-[11px] text-[#0D4838] block">Di sản số</span>
                  <span className="text-[9px] text-[#5c554b]">Bảo tàng VR/3D</span>
                </div>
                <div className="p-2 bg-[#FDFBF7] rounded-lg border border-[#dfd7c8] text-center">
                  <span className="font-bold text-[11px] text-[#0D4838] block">Không gian</span>
                  <span className="text-[9px] text-[#5c554b]">Hoàng thành Thăng Long</span>
                </div>
              </div>
            </div>
          )}

          {/* PREVIEW TAB 6: CTA */}
          {activeTab === "cta" && (
            <div className="bg-[#073327] text-white rounded-2xl p-5 border border-[#C29B57]/50 shadow-md space-y-3 text-center">
              <h3 className="text-base font-serif font-bold text-white">{ctaTitle}</h3>
              <p className="text-xs text-white/80 leading-relaxed">{ctaDesc}</p>
              <div className="flex flex-col gap-2 pt-2">
                <div className="bg-[#0D4838] text-white py-1.5 rounded-lg text-xs font-semibold">
                  1. Đăng ký tham dự Đại biểu
                </div>
                <div className="border border-white/30 text-white py-1.5 rounded-lg text-xs">
                  2. Nộp hồ sơ Đề cử Giải thưởng
                </div>
                <div className="border border-[#C29B57]/50 text-[#C29B57] py-1.5 rounded-lg text-xs">
                  3. Hợp tác & Tài trợ Diễn đàn
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
