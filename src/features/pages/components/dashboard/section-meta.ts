import {
  Layout,
  Layers,
  Calendar,
  Award,
  FolderKanban,
  BookOpen,
  Network,
  Sparkles,
  Users,
  Compass,
  FileText,
  type LucideIcon,
} from "lucide-react";

export interface SectionMetaInfo {
  label: string;
  shortName: string;
  icon: LucideIcon;
  accent: string;
  badge: string;
}

/**
 * Trả về thông tin hiển thị (tên ngắn, icon, màu sắc) cho từng loại section
 */
export function getSectionMeta(type: string, title?: string): SectionMetaInfo {
  switch (type) {
    case "HOME_HERO":
    case "HERO":
      return {
        label: title || "Hero Banner Chính",
        shortName: "Hero Banner",
        icon: Layout,
        accent: "border-amber-500 text-amber-800 bg-amber-50",
        badge: "HERO",
      };
    case "HOME_INTRO_PILLARS":
    case "PILLARS_5":
      return {
        label: title || "05 Trụ Cột Hoạt Động & Giới Thiệu Nhanh",
        shortName: "05 Trụ Cột",
        icon: Layers,
        accent: "border-emerald-500 text-emerald-800 bg-emerald-50",
        badge: "PILLARS",
      };
    case "HOME_EVENT_HIGHLIGHT":
    case "EVENT_HIGHLIGHT":
      return {
        label: title || "Kỳ Diễn Đàn Nổi Bật 2026",
        shortName: "Sự Kiện 2026",
        icon: Calendar,
        accent: "border-blue-500 text-blue-800 bg-blue-50",
        badge: "EVENT",
      };
    case "HOME_AWARDS_SHOWCASE":
    case "AWARDS_SHOWCASE":
      return {
        label: title || "Giải Thưởng Phát Triển Bền Vững Chủ Động",
        shortName: "Giải Thưởng",
        icon: Award,
        accent: "border-amber-600 text-amber-900 bg-amber-50",
        badge: "AWARDS",
      };
    case "HOME_FEATURED_PROJECTS":
    case "PROJECT_GRID":
      return {
        label: title || "Mô Hình & Sáng Kiến Điển Hình",
        shortName: "Dự Án Tiêu Biểu",
        icon: FolderKanban,
        accent: "border-purple-500 text-purple-800 bg-purple-50",
        badge: "PROJECTS",
      };
    case "HOME_NEWS_FEED":
    case "NEWS_FEED":
      return {
        label: title || "Tin Tức & Góc Chuyên Gia",
        shortName: "Tin Tức Báo Chí",
        icon: BookOpen,
        accent: "border-indigo-500 text-indigo-800 bg-indigo-50",
        badge: "NEWS",
      };
    case "HOME_PARTNERS_SLIDER":
    case "PARTNERS_SLIDER":
      return {
        label: title || "Mạng Lưới Đối Tác Đồng Hành",
        shortName: "Đối Tác",
        icon: Network,
        accent: "border-cyan-500 text-cyan-800 bg-cyan-50",
        badge: "PARTNERS",
      };
    case "HOME_CONVERSION_CTA":
    case "CTA_BANNER":
      return {
        label: title || "Cùng Kiến Tạo Giá Trị Di Sản (CTA)",
        shortName: "Kêu Gọi CTA",
        icon: Sparkles,
        accent: "border-rose-500 text-rose-800 bg-rose-50",
        badge: "CTA",
      };
    case "ABOUT_BANNER":
      return {
        label: title || "Banner Về Diễn Đàn Kinh Tế Di Sản",
        shortName: "Banner Giới Thiệu",
        icon: Layout,
        accent: "border-amber-500 text-amber-800 bg-amber-50",
        badge: "ABOUT_BANNER",
      };
    case "ABOUT_VISION_MISSION":
      return {
        label: title || "Tôn Chỉ, Tầm Nhìn & Sứ Mệnh",
        shortName: "Tôn Chỉ Sứ Mệnh",
        icon: Compass,
        accent: "border-emerald-600 text-emerald-900 bg-emerald-50",
        badge: "VISION_MISSION",
      };
    case "ABOUT_COUNCIL":
      return {
        label: title || "Hội Đồng Diễn Đàn",
        shortName: "Hội Đồng HEF",
        icon: Users,
        accent: "border-indigo-600 text-indigo-900 bg-indigo-50",
        badge: "COUNCIL",
      };
    case "ABOUT_EXECUTIVE":
      return {
        label: title || "Ban Điều Hành Chuyên Trách",
        shortName: "Ban Điều Hành",
        icon: Users,
        accent: "border-blue-600 text-blue-900 bg-blue-50",
        badge: "EXECUTIVE",
      };
    case "ABOUT_PARTNERS":
      return {
        label: title || "Mạng Lưới Đối Tác Đồng Hành Đề Án",
        shortName: "Đối Tác Đề Án",
        icon: Network,
        accent: "border-teal-600 text-teal-900 bg-teal-50",
        badge: "PARTNERS",
      };
    default:
      return {
        label: title || type,
        shortName: title || type,
        icon: FileText,
        accent: "border-stone-400 text-stone-800 bg-stone-50",
        badge: type,
      };
  }
}
