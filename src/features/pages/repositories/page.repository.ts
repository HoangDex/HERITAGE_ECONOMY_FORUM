/**
 * LAYER 3: REPOSITORY / DATA ACCESS LAYER (Page & Sections)
 * Thao tác với bảng `pages` qua Prisma 7 Client và quản lý cấu trúc JSON
 */

import { prisma } from "@/lib/prisma";
import type {
  PageEntity,
  CreatePageDTO,
  UpdatePageDTO,
  IPageRepository,
  PageSection,
} from "../types/page.types";

/**
 * 7 Trang cốt lõi của Diễn đàn Kinh tế Di sản theo Đề án phiên bản 1.0
 */
const DEFAULT_HEF_PAGES: PageEntity[] = [
  {
    id: "page_home",
    slug: "trang-chu",
    name: "Trang chủ",
    title: "Diễn đàn Kinh tế Di sản | Heritage Economy Forum",
    description: "Di sản kiến tạo giá trị – Phát triển hướng tương lai",
    isPublished: true,
    order: 1,
    sections: [
      {
        id: "sec_hero",
        type: "HERO",
        title: "Di sản kiến tạo giá trị – Phát triển hướng tương lai",
        subtitle:
          "Kết nối tri thức, nguồn lực và cộng đồng để nhận diện, bảo tồn và phát huy giá trị di sản trong nền kinh tế đương đại.",
        order: 1,
        isVisible: true,
        props: {
          ctaPrimaryText: "Khám phá Diễn đàn",
          ctaPrimaryLink: "/dien-dan",
          ctaSecondaryText: "Đăng ký Tham dự",
          ctaSecondaryLink: "/lien-he?loai=tham-du",
        },
      },
      {
        id: "sec_pillars",
        type: "PILLARS_5",
        title: "05 Trụ Cột Hoạt Động",
        subtitle: "Định hướng chiến lược dài hạn của Diễn đàn",
        order: 2,
        isVisible: true,
        props: {
          pillars: ["Nghiên cứu", "Đối thoại", "Kết nối", "Ghi nhận", "Phát triển"],
        },
      },
      {
        id: "sec_event",
        type: "EVENT_HIGHLIGHT",
        title: "Kỳ Diễn Đàn Nổi Bật 2026",
        subtitle: "Không gian hội tụ các nhà khoa học, nhà quản lý và doanh nghiệp",
        order: 3,
        isVisible: true,
        props: {
          eventDate: "18/11/2026",
          location: "Hà Nội / Cố đô Huế",
          theme: "Kinh tế Di sản trong bối cảnh Chuyển đổi số và Phát triển Xanh",
        },
      },
      {
        id: "sec_awards",
        type: "AWARDS_SHOWCASE",
        title: "Giải Thưởng Phát Triển Bền Vững Chủ Động",
        subtitle: "Kiến tạo giá trị – Phụng sự vị nhân sinh",
        order: 4,
        isVisible: true,
        props: {
          ctaText: "Xem Quy chế & Đề cử",
          ctaLink: "/giai-thuong",
        },
      },
      {
        id: "sec_projects",
        type: "PROJECT_GRID",
        title: "Mô Hình & Sáng Kiến Điển Hình",
        subtitle: "Các dự án cân bằng giữa giữ gìn bản sắc và tạo sinh kế cộng đồng",
        order: 5,
        isVisible: true,
        props: { limit: 3, viewAllLink: "/du-an" },
      },
      {
        id: "sec_news",
        type: "NEWS_FEED",
        title: "Tin Tức & Góc Chuyên Gia",
        subtitle: "Thông tin hoạt động, nghiên cứu và quan điểm chính sách",
        order: 6,
        isVisible: true,
        props: { limit: 4, viewAllLink: "/tin-tuc" },
      },
      {
        id: "sec_partners",
        type: "PARTNERS_SLIDER",
        title: "Mạng Lưới Đối Tác Đồng Hành",
        subtitle: "Đơn vị Chỉ đạo, Chủ trì, Tổ chức và Đối tác Chiến lược",
        order: 7,
        isVisible: true,
        props: {},
      },
      {
        id: "sec_cta_end",
        type: "CTA_BANNER",
        title: "Cùng Kiến Tạo Giá Trị Di Sản",
        subtitle:
          "Đồng hành cùng Diễn đàn trong các hoạt động nghiên cứu, đề cử giải thưởng và hợp tác dự án.",
        order: 8,
        isVisible: true,
        props: {
          actions: [
            { text: "Đăng ký tham dự", link: "/lien-he?loai=tham-du" },
            { text: "Hợp tác chiến lược", link: "/lien-he?loai=hop-tac" },
          ],
        },
      },
    ],
  },
  {
    id: "page_about",
    slug: "gioi-thieu",
    name: "Giới thiệu",
    title: "Về Diễn Đàn Kinh Tế Di Sản",
    description: "Tôn chỉ, sứ mệnh, Hội đồng Diễn đàn và Ban Điều hành",
    isPublished: true,
    order: 2,
    sections: [
      {
        id: "sec_about_intro",
        type: "CUSTOM_HTML",
        title: "Tôn chỉ & Sứ mệnh",
        order: 1,
        isVisible: true,
        props: {},
      },
      {
        id: "sec_council",
        type: "ABOUT_COUNCIL",
        title: "Hội Đồng Diễn Đàn",
        subtitle: "Chủ tịch, các Phó Chủ tịch và Hội đồng Cố vấn Khoa học",
        order: 2,
        isVisible: true,
        props: {},
      },
      {
        id: "sec_executive",
        type: "ABOUT_EXECUTIVE",
        title: "Ban Điều Hành",
        subtitle: "Cơ cấu chuyên trách điều phối và triển khai các chương trình",
        order: 3,
        isVisible: true,
        props: {},
      },
    ],
  },
  {
    id: "page_forum",
    slug: "dien-dan",
    name: "Diễn đàn",
    title: "Các Kỳ Diễn Đàn & Phiên Thảo Luận",
    isPublished: true,
    order: 3,
    sections: [
      {
        id: "sec_timeline",
        type: "TIMELINE",
        title: "Chương Trình & Các Phiên Làm Việc",
        order: 1,
        isVisible: true,
        props: {},
      },
      {
        id: "sec_speakers",
        type: "SPEAKERS_GRID",
        title: "Diễn Giả Chuyên Gia",
        order: 2,
        isVisible: true,
        props: {},
      },
    ],
  },
  {
    id: "page_awards",
    slug: "giai-thuong",
    name: "Giải thưởng",
    title: "Giải Thưởng Phát Triển Bền Vững Chủ Động",
    isPublished: true,
    order: 4,
    sections: [
      {
        id: "sec_awards_hero",
        type: "HERO",
        title: "Giải Thưởng Phát Triển Bền Vững Chủ Động",
        subtitle:
          "Tôn vinh các sáng kiến tiêu biểu kiến tạo giá trị nhân văn và phát triển hài hòa.",
        order: 1,
        isVisible: true,
        props: {},
      },
    ],
  },
  {
    id: "page_projects",
    slug: "du-an",
    name: "Dự án",
    title: "Hồ Sơ Sáng Kiến & Mô Hình Kinh Tế Di Sản",
    isPublished: true,
    order: 5,
    sections: [
      {
        id: "sec_proj_grid",
        type: "PROJECT_GRID",
        title: "Danh Mục Dự Án Đã Thẩm Định",
        order: 1,
        isVisible: true,
        props: {},
      },
    ],
  },
  {
    id: "page_news",
    slug: "tin-tuc",
    name: "Tin tức",
    title: "Trung Tâm Báo Chí & Nghiên Cứu",
    isPublished: true,
    order: 6,
    sections: [
      {
        id: "sec_news_feed",
        type: "NEWS_FEED",
        title: "Tin Tức & Hoạt Động",
        order: 1,
        isVisible: true,
        props: {},
      },
    ],
  },
  {
    id: "page_contact",
    slug: "lien-he",
    name: "Liên hệ",
    title: "Kết Nối Cùng Diễn Đàn",
    isPublished: true,
    order: 7,
    sections: [
      {
        id: "sec_contact_form",
        type: "CONTACT_FORM",
        title: "Gửi Yêu Cầu Kết Nối",
        order: 1,
        isVisible: true,
        props: {},
      },
    ],
  },
];

export class PageRepository implements IPageRepository {
  private inMemoryPages: PageEntity[] = [...DEFAULT_HEF_PAGES];

  private mapToEntity(item: {
    id: string;
    slug: string;
    name: string;
    title: string;
    description: string | null;
    seoProps: unknown;
    sections: unknown;
    isPublished: boolean;
    order: number;
    publishedAt: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
  }): PageEntity {
    return {
      id: item.id,
      slug: item.slug,
      name: item.name,
      title: item.title,
      description: item.description || undefined,
      seoProps: (item.seoProps as PageEntity["seoProps"]) || undefined,
      sections: Array.isArray(item.sections) ? (item.sections as PageSection[]) : [],
      isPublished: item.isPublished,
      order: item.order,
      publishedAt: item.publishedAt?.toISOString(),
      createdAt: item.createdAt?.toISOString(),
      updatedAt: item.updatedAt?.toISOString(),
    };
  }

  async findAll(publishedOnly = false): Promise<PageEntity[]> {
    try {
      const pages = await prisma.page.findMany({
        where: publishedOnly ? { isPublished: true } : undefined,
        orderBy: { order: "asc" },
      });
      if (pages.length > 0) {
        return pages.map((p) => this.mapToEntity(p));
      }
    } catch {
      // Fallback in-memory
    }

    if (publishedOnly) {
      return this.inMemoryPages.filter((p) => p.isPublished);
    }
    return this.inMemoryPages;
  }

  async findById(id: string): Promise<PageEntity | null> {
    try {
      const page = await prisma.page.findUnique({ where: { id } });
      if (page) return this.mapToEntity(page);
    } catch {
      // Fallback
    }

    const mock = this.inMemoryPages.find((p) => p.id === id);
    return mock || null;
  }

  async findBySlug(slug: string): Promise<PageEntity | null> {
    try {
      const page = await prisma.page.findUnique({ where: { slug } });
      if (page) return this.mapToEntity(page);
    } catch {
      // Fallback
    }

    const mock = this.inMemoryPages.find((p) => p.slug === slug);
    return mock || null;
  }

  async create(data: CreatePageDTO): Promise<PageEntity> {
    try {
      const page = await prisma.page.create({
        data: {
          slug: data.slug,
          name: data.name,
          title: data.title,
          description: data.description,
          seoProps: (data.seoProps || {}) as object,
          sections: (data.sections || []) as object,
          isPublished: data.isPublished || false,
          order: data.order || 0,
        },
      });
      return this.mapToEntity(page);
    } catch {
      const newMock: PageEntity = {
        id: "page_" + Math.random().toString(36).substring(2, 9),
        slug: data.slug,
        name: data.name,
        title: data.title,
        description: data.description,
        seoProps: data.seoProps,
        sections: data.sections || [],
        isPublished: data.isPublished || false,
        order: data.order || 0,
        createdAt: new Date().toISOString(),
      };
      this.inMemoryPages.push(newMock);
      return newMock;
    }
  }

  async update(id: string, data: UpdatePageDTO): Promise<PageEntity | null> {
    try {
      const updated = await prisma.page.update({
        where: { id },
        data: {
          name: data.name,
          title: data.title,
          description: data.description,
          seoProps: data.seoProps ? (data.seoProps as object) : undefined,
          isPublished: data.isPublished,
          order: data.order,
        },
      });
      return this.mapToEntity(updated);
    } catch {
      const idx = this.inMemoryPages.findIndex((p) => p.id === id);
      if (idx === -1) return null;
      this.inMemoryPages[idx] = {
        ...this.inMemoryPages[idx],
        ...data,
      };
      return this.inMemoryPages[idx];
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.page.delete({ where: { id } });
      return true;
    } catch {
      const idx = this.inMemoryPages.findIndex((p) => p.id === id);
      if (idx !== -1) {
        this.inMemoryPages.splice(idx, 1);
        return true;
      }
      return false;
    }
  }

  async updateSections(pageId: string, sections: PageSection[]): Promise<PageEntity | null> {
    try {
      const updated = await prisma.page.update({
        where: { id: pageId },
        data: {
          sections: sections as object,
        },
      });
      return this.mapToEntity(updated);
    } catch {
      const page = this.inMemoryPages.find((p) => p.id === pageId);
      if (!page) return null;
      page.sections = sections;
      return page;
    }
  }
}

export const pageRepository = new PageRepository();
