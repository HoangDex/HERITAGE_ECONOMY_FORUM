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
  Clock,
  HelpCircle,
  Phone,
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
 * Trả về thông tin hiển thị (tên ngắn, icon, màu sắc) cho từng section key trong `Page.props`
 */
export function getSectionMeta(type: string, title?: string): SectionMetaInfo {
  switch (type) {
    case "hero":
    case "HOME_HERO":
    case "HERO":
      return {
        label: title || "Khối Mở Đầu (hero)",
        shortName: "Hero",
        icon: Layout,
        accent: "border-amber-500 text-amber-800 bg-amber-50",
        badge: "hero",
      };
    case "pillars":
    case "HOME_INTRO_PILLARS":
    case "PILLARS_5":
      return {
        label: title || "Định Vị & Trụ Cột (pillars)",
        shortName: "Pillars",
        icon: Layers,
        accent: "border-emerald-500 text-emerald-800 bg-emerald-50",
        badge: "pillars",
      };
    case "event":
    case "HOME_EVENT_HIGHLIGHT":
    case "EVENT_HIGHLIGHT":
      return {
        label: title || "Kỳ Diễn Đàn Nổi Bật (event)",
        shortName: "Event",
        icon: Calendar,
        accent: "border-blue-500 text-blue-800 bg-blue-50",
        badge: "event",
      };
    case "showcase":
    case "HOME_AWARDS_SHOWCASE":
    case "AWARDS_SHOWCASE":
      return {
        label: title || "Giải Thưởng & Dự Án Tiêu Biểu (showcase)",
        shortName: "Showcase",
        icon: Award,
        accent: "border-amber-600 text-amber-900 bg-amber-50",
        badge: "showcase",
      };
    case "directory":
    case "HOME_FEATURED_PROJECTS":
    case "PROJECT_GRID":
      return {
        label: title || "Danh Mục Dự Án (directory)",
        shortName: "Directory",
        icon: FolderKanban,
        accent: "border-purple-500 text-purple-800 bg-purple-50",
        badge: "directory",
      };
    case "news":
    case "feed":
    case "HOME_NEWS_FEED":
    case "NEWS_FEED":
      return {
        label: title || "Tin Tức & Bài Viết (news)",
        shortName: type === "feed" ? "Feed" : "News",
        icon: BookOpen,
        accent: "border-indigo-500 text-indigo-800 bg-indigo-50",
        badge: type,
      };
    case "partners":
    case "HOME_PARTNERS_SLIDER":
    case "PARTNERS_SLIDER":
    case "ABOUT_PARTNERS":
      return {
        label: title || "Mạng Lưới Đối Tác (partners)",
        shortName: "Partners",
        icon: Network,
        accent: "border-cyan-500 text-cyan-800 bg-cyan-50",
        badge: "partners",
      };
    case "cta":
    case "HOME_CONVERSION_CTA":
    case "CTA_BANNER":
      return {
        label: title || "Kêu Gọi Hành Động (cta)",
        shortName: "CTA",
        icon: Sparkles,
        accent: "border-rose-500 text-rose-800 bg-rose-50",
        badge: "cta",
      };
    case "banner":
    case "ABOUT_BANNER":
      return {
        label: title || "Banner Đầu Trang (banner)",
        shortName: "Banner",
        icon: Layout,
        accent: "border-amber-500 text-amber-800 bg-amber-50",
        badge: "banner",
      };
    case "vision":
    case "ABOUT_VISION_MISSION":
      return {
        label: title || "Tôn Chỉ & Giá Trị Cốt Lõi (vision)",
        shortName: "Vision",
        icon: Compass,
        accent: "border-emerald-600 text-emerald-900 bg-emerald-50",
        badge: "vision",
      };
    case "council":
    case "ABOUT_COUNCIL":
      return {
        label: title || "Hội Đồng Diễn Đàn (council)",
        shortName: "Council",
        icon: Users,
        accent: "border-indigo-600 text-indigo-900 bg-indigo-50",
        badge: "council",
      };
    case "executive":
    case "ABOUT_EXECUTIVE":
      return {
        label: title || "Ban Điều Hành (executive)",
        shortName: "Executive",
        icon: Users,
        accent: "border-blue-600 text-blue-900 bg-blue-50",
        badge: "executive",
      };
    case "sessions":
      return {
        label: title || "Các Phiên Nghị Sự (sessions)",
        shortName: "Sessions",
        icon: Calendar,
        accent: "border-emerald-600 text-emerald-900 bg-emerald-50",
        badge: "sessions",
      };
    case "timeline":
    case "TIMELINE":
      return {
        label: title || "Lịch Trình Chi Tiết (timeline)",
        shortName: "Timeline",
        icon: Clock,
        accent: "border-amber-600 text-amber-900 bg-amber-50",
        badge: "timeline",
      };
    case "speakers":
    case "SPEAKERS_GRID":
      return {
        label: title || "Diễn Giả Tham Luận (speakers)",
        shortName: "Speakers",
        icon: Users,
        accent: "border-indigo-600 text-indigo-900 bg-indigo-50",
        badge: "speakers",
      };
    case "resources":
      return {
        label: title || "Tài Liệu & Kỷ Yếu (resources)",
        shortName: "Resources",
        icon: FileText,
        accent: "border-teal-600 text-teal-900 bg-teal-50",
        badge: "resources",
      };
    case "faq":
      return {
        label: title || "Câu Hỏi Thường Gặp (faq)",
        shortName: "FAQ",
        icon: HelpCircle,
        accent: "border-stone-500 text-stone-800 bg-stone-50",
        badge: "faq",
      };
    case "categories":
      return {
        label: title || "Hạng Mục Giải Thưởng (categories)",
        shortName: "Categories",
        icon: Award,
        accent: "border-amber-600 text-amber-900 bg-amber-50",
        badge: "categories",
      };
    case "criteria":
      return {
        label: title || "Tiêu Chí Đánh Giá (criteria)",
        shortName: "Criteria",
        icon: Layers,
        accent: "border-emerald-600 text-emerald-900 bg-emerald-50",
        badge: "criteria",
      };
    case "process":
      return {
        label: title || "Quy Trình Xét Chọn (process)",
        shortName: "Process",
        icon: Clock,
        accent: "border-blue-600 text-blue-900 bg-blue-50",
        badge: "process",
      };
    case "info":
      return {
        label: title || "Thông Tin Liên Hệ (info)",
        shortName: "Info",
        icon: Phone,
        accent: "border-emerald-600 text-emerald-900 bg-emerald-50",
        badge: "info",
      };
    case "form":
    case "CONTACT_FORM":
      return {
        label: title || "Biểu Mẫu Tiếp Nhận (form)",
        shortName: "Form",
        icon: FileText,
        accent: "border-amber-600 text-amber-900 bg-amber-50",
        badge: "form",
      };
    default:
      return {
        label: title || type,
        shortName: type,
        icon: FileText,
        accent: "border-stone-400 text-stone-800 bg-stone-50",
        badge: type,
      };
  }
}
