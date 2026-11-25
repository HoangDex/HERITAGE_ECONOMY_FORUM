/**
 * BARREL EXPORT & TỔNG HỢP CÁC TRANG CỐT LÕI (DEFAULT HEF PAGES)
 * Tuân thủ Clean Architecture: Mỗi trang có file cấu hình sections riêng biệt.
 */

import type { PageEntity } from "../../types/page.types";
import { DEFAULT_HOME_SECTIONS } from "./home.default";
import { DEFAULT_ABOUT_SECTIONS } from "./about.default";
import {
  DEFAULT_FORUM_SECTIONS,
  DEFAULT_AWARDS_SECTIONS,
  DEFAULT_PROJECTS_SECTIONS,
  DEFAULT_NEWS_SECTIONS,
  DEFAULT_CONTACT_SECTIONS,
} from "./other-pages.default";

export * from "./home.default";
export * from "./about.default";
export * from "./other-pages.default";

export const DEFAULT_HEF_PAGES: PageEntity[] = [
  {
    id: "page_home",
    slug: "home",
    name: "Trang chủ",
    title: "Diễn đàn Kinh tế Di sản | Heritage Economy Forum",
    description: "Di sản kiến tạo giá trị – Phát triển hướng tương lai",
    isPublished: true,
    order: 1,
    sections: DEFAULT_HOME_SECTIONS,
    publishedAt: "2026-11-01T00:00:00.000Z",
    createdAt: "2026-11-01T00:00:00.000Z",
    updatedAt: "2026-11-16T09:00:00.000Z",
  },
  {
    id: "page_about",
    slug: "about",
    name: "Giới thiệu",
    title: "Về Diễn Đàn Kinh Tế Di Sản",
    description: "Tôn chỉ, sứ mệnh, Hội đồng Diễn đàn và Ban Điều hành",
    isPublished: true,
    order: 2,
    sections: DEFAULT_ABOUT_SECTIONS,
    publishedAt: "2026-11-01T00:00:00.000Z",
    createdAt: "2026-11-01T00:00:00.000Z",
    updatedAt: "2026-11-16T09:00:00.000Z",
  },
  {
    id: "page_forum",
    slug: "forum",
    name: "Diễn đàn",
    title: "Các Kỳ Diễn Đàn & Phiên Thảo Luận",
    description: "Chương trình nghị sự, diễn giả và các phiên làm việc chuyên sâu",
    isPublished: true,
    order: 3,
    sections: DEFAULT_FORUM_SECTIONS,
    publishedAt: "2026-11-01T00:00:00.000Z",
    createdAt: "2026-11-01T00:00:00.000Z",
    updatedAt: "2026-11-16T09:00:00.000Z",
  },
  {
    id: "page_awards",
    slug: "awards",
    name: "Giải thưởng",
    title: "Giải Thưởng Phát Triển Bền Vững Chủ Động",
    description: "Tôn vinh các sáng kiến tiêu biểu kiến tạo giá trị nhân văn và phát triển hài hòa",
    isPublished: true,
    order: 4,
    sections: DEFAULT_AWARDS_SECTIONS,
    publishedAt: "2026-11-01T00:00:00.000Z",
    createdAt: "2026-11-01T00:00:00.000Z",
    updatedAt: "2026-11-16T09:00:00.000Z",
  },
  {
    id: "page_projects",
    slug: "projects",
    name: "Mô hình & Dự án",
    title: "Mô Hình & Sáng Kiến Điển Hình",
    description: "Các dự án thực địa bảo tồn di sản gắn với sinh kế bền vững",
    isPublished: true,
    order: 5,
    sections: DEFAULT_PROJECTS_SECTIONS,
    publishedAt: "2026-11-01T00:00:00.000Z",
    createdAt: "2026-11-01T00:00:00.000Z",
    updatedAt: "2026-11-16T09:00:00.000Z",
  },
  {
    id: "page_news",
    slug: "news",
    name: "Tin tức",
    title: "Tin Tức & Góc Chuyên Gia",
    description: "Thông tin hoạt động, nghiên cứu và bài viết chuyên sâu về kinh tế di sản",
    isPublished: true,
    order: 6,
    sections: DEFAULT_NEWS_SECTIONS,
    publishedAt: "2026-11-01T00:00:00.000Z",
    createdAt: "2026-11-01T00:00:00.000Z",
    updatedAt: "2026-11-16T09:00:00.000Z",
  },
  {
    id: "page_contact",
    slug: "contact",
    name: "Liên hệ",
    title: "Liên Hệ & Đăng Ký Đồng Hành",
    description: "Kênh tiếp nhận đăng ký tham dự, đề cử giải thưởng và hợp tác chiến lược",
    isPublished: true,
    order: 7,
    sections: DEFAULT_CONTACT_SECTIONS,
    publishedAt: "2026-11-01T00:00:00.000Z",
    createdAt: "2026-11-01T00:00:00.000Z",
    updatedAt: "2026-11-16T09:00:00.000Z",
  },
];
