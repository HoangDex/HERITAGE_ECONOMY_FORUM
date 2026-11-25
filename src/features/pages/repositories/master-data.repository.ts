/**
 * LAYER 3: REPOSITORY / DATA ACCESS CHO DANH MỤC DỮ LIỆU DÙNG CHUNG (MASTER DATA)
 * Truy vấn và thao tác CRUD các thực thể quan hệ từ MySQL (Projects, Organizations, News, Speakers, Awards).
 * Hỗ trợ Graceful In-Memory Fallback khi CSDL offline hoặc trong quá trình dev.
 */

import { prisma } from "@/lib/prisma";
import type {
  MasterDataProject,
  CreateProjectDTO,
  UpdateProjectDTO,
  MasterDataOrganization,
  CreateOrganizationDTO,
  UpdateOrganizationDTO,
  MasterDataNews,
  CreateNewsDTO,
  UpdateNewsDTO,
  MasterDataSpeaker,
  CreateSpeakerDTO,
  UpdateSpeakerDTO,
  MasterDataAward,
  CreateAwardDTO,
  UpdateAwardDTO,
  MasterDataOverview,
  IMasterDataRepository,
} from "../types/master-data.types";
import { INITIAL_HERITAGE_PROJECTS } from "@/lib/mock-data";
import { fallbackHomePageData } from "@/features/home/data/home-fallback.data";

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export class MasterDataRepository implements IMasterDataRepository {
  // In-memory fallbacks
  private inMemoryProjects: MasterDataProject[] = INITIAL_HERITAGE_PROJECTS.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    location: p.location,
    category: p.category,
    status: p.status,
    annualRevenue: p.economicMetrics.annualRevenue,
    jobsCreated: p.economicMetrics.jobsCreated,
    conservationFundShare: p.economicMetrics.conservationFundShare,
    pageSlug: "projects",
    pageName: "Mô hình & Dự án",
    reusedPages: ["Trang chủ (Khối Dự án)", "Trang Mô hình & Dự án (/projects)"],
    createdAt: new Date().toISOString(),
  }));

  private inMemoryOrganizations: MasterDataOrganization[] = fallbackHomePageData.partners.map((p) => ({
    id: p.id,
    name: p.name,
    shortName: p.shortName,
    category: p.category,
    categoryLabel: p.categoryLabel,
    logoUrl: p.logoUrl,
    websiteUrl: p.websiteUrl,
    reusedPages: [
      {
        pageSlug: "home",
        pageName: "Trang chủ",
        roleLabel: p.categoryLabel,
      },
      {
        pageSlug: "about",
        pageName: "Giới thiệu",
        roleLabel: "Đơn vị Đồng hành",
      },
    ],
    createdAt: new Date().toISOString(),
  }));

  private inMemoryNews: MasterDataNews[] = [
    ...fallbackHomePageData.featuredNews,
    ...fallbackHomePageData.latestNews,
  ].map((n) => ({
    id: n.id,
    title: n.title,
    slug: n.slug,
    excerpt: n.summary,
    categoryName: n.category,
    authorName: n.author,
    authorTitle: "Chuyên gia Di sản",
    status: "PUBLISHED",
    isFeatured: Boolean(n.isFeatured),
    viewsCount: 1250,
    pageSlug: "home",
    pageName: "Trang chủ",
    reusedPages: ["Trang chủ (Khối Tin tức)", "Trang Tin tức & Báo chí (/news)"],
    publishedAt: n.publishedAt,
  }));

  private inMemorySpeakers: MasterDataSpeaker[] = [
    {
      id: "spk_1",
      name: "GS.TS. Trần Quốc Vượng",
      slug: "gs-ts-tran-quoc-vuong",
      degree: "Giáo sư, Tiến sĩ",
      title: "Chủ tịch Hội đồng Khoa học",
      organization: "Hội Di sản Văn hóa Việt Nam",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80",
      bio: "Chuyên gia đầu ngành về khảo cổ học và kinh tế di sản.",
      reusedPages: ["Trang chủ", "Trang Diễn đàn (/forum)", "Trang Giới thiệu (/about)"],
    },
    {
      id: "spk_2",
      name: "TS. Nguyễn Thị Bích Liên",
      slug: "ts-nguyen-thi-bich-lien",
      degree: "Tiến sĩ",
      title: "Viện trưởng",
      organization: "Viện Nghiên cứu Kinh tế Di sản (HEI)",
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300&q=80",
      bio: "Chuyên gia tư vấn chính sách di sản cho UNESCO.",
      reusedPages: ["Trang chủ", "Trang Diễn đàn (/forum)", "Trang Giới thiệu (/about)"],
    },
    {
      id: "spk_3",
      name: "KTS. Lê Hoàng Phương",
      slug: "kts-le-hoang-phuong",
      degree: "Kiến trúc sư",
      title: "Giám đốc Quy hoạch Di sản",
      organization: "Viện Quy hoạch Đô thị & Nông thôn Quốc gia",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80",
      bio: "Chủ trì nhiều đồ án bảo tồn di tích đô thị và làng cổ tại Việt Nam.",
      reusedPages: ["Trang chủ", "Trang Diễn đàn (/forum)"],
    },
  ];

  private inMemoryAwards: MasterDataAward[] = [
    {
      id: "award_2026",
      year: 2026,
      name: "Giải Thưởng Phát Triển Bền Vững Chủ Động 2026",
      theme: "Kiến tạo giá trị – Phụng sự vị nhân sinh",
      nominationDeadline: "2026-10-15T23:59:59.000Z",
      isOpen: true,
      categories: [
        {
          id: "cat_1",
          name: "Bảo Tồn Thích Ứng Xuất Sắc",
          slug: "bao-ton-thich-ung-xuat-sac",
          description: "Dự án trùng tu, thích ứng di sản kiến trúc kết hợp công năng mới hiệu quả.",
        },
        {
          id: "cat_2",
          name: "Mô Hình Sinh Kế Di Sản Bản Địa",
          slug: "mo-hinh-sinh-ke-di-san-ban-dia",
          description: "Cộng đồng, hợp tác xã tạo sinh kế bền vững dựa trên tài nguyên văn hóa.",
        },
        {
          id: "cat_3",
          name: "Đổi Mới Sáng Tạo & Số Hóa Di Sản",
          slug: "doi-moi-sang-tao-so-hoa-di-san",
          description: "Ứng dụng công nghệ thực tế ảo, AI và số hóa dữ liệu.",
        },
        {
          id: "cat_4",
          name: "Doanh Nghiệp Tiên Phong Vì Di Sản",
          slug: "doanh-nghiep-tien-phong-vi-di-san",
          description: "Doanh nghiệp tài trợ, đầu tư có trách nhiệm vào di sản văn hóa.",
        },
      ],
      reusedPages: ["Trang chủ", "Trang Giải thưởng (/awards)"],
    },
  ];

  // ========================================================
  // 1. PROJECTS CRUD
  // ========================================================
  async getProjects(): Promise<MasterDataProject[]> {
    try {
      const items = await prisma.heritageProject.findMany({
        orderBy: { createdAt: "desc" },
      });

      if (items.length > 0) {
        return items.map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          location: p.location,
          category: p.category,
          status: p.status,
          annualRevenue: p.annualRevenue,
          jobsCreated: p.jobsCreated,
          conservationFundShare: p.conservationFundShare,
          pageSlug: p.pageSlug || "projects",
          pageName: p.pageName || "Mô hình & Dự án",
          reusedPages: ["Trang chủ (Khối Dự án)", "Trang Mô hình & Dự án (/projects)"],
          createdAt: p.createdAt.toISOString(),
        }));
      }
    } catch {
      // Fallback in-memory
    }
    return this.inMemoryProjects;
  }

  async getProjectById(id: string): Promise<MasterDataProject | null> {
    try {
      const p = await prisma.heritageProject.findUnique({
        where: { id },
      });
      if (p) {
        return {
          id: p.id,
          name: p.name,
          slug: p.slug,
          location: p.location,
          category: p.category,
          status: p.status,
          annualRevenue: p.annualRevenue,
          jobsCreated: p.jobsCreated,
          conservationFundShare: p.conservationFundShare,
          pageSlug: p.pageSlug || "projects",
          pageName: p.pageName || "Mô hình & Dự án",
          reusedPages: ["Trang chủ (Khối Dự án)", "Trang Mô hình & Dự án (/projects)"],
          createdAt: p.createdAt.toISOString(),
        };
      }
    } catch {
      // Fallback
    }
    return this.inMemoryProjects.find((p) => p.id === id || p.slug === id) || null;
  }

  async createProject(dto: CreateProjectDTO): Promise<MasterDataProject> {
    const slug = dto.slug || generateSlug(dto.name);
    try {
      const created = await prisma.heritageProject.create({
        data: {
          name: dto.name,
          slug,
          location: dto.location,
          category: dto.category,
          status: dto.status || "Đang vận hành",
          description: dto.description || "",
          annualRevenue: dto.annualRevenue,
          jobsCreated: dto.jobsCreated || 0,
          conservationFundShare: dto.conservationFundShare,
          ownerOrg: dto.ownerOrg,
          websiteUrl: dto.websiteUrl,
          thumbnailUrl: dto.thumbnailUrl,
          pageSlug: dto.pageSlug || "projects",
          pageName: dto.pageName || "Mô hình & Dự án",
          isFeatured: dto.isFeatured || false,
        },
      });

      const entity: MasterDataProject = {
        id: created.id,
        name: created.name,
        slug: created.slug,
        location: created.location,
        category: created.category,
        status: created.status,
        annualRevenue: created.annualRevenue,
        jobsCreated: created.jobsCreated,
        conservationFundShare: created.conservationFundShare,
        pageSlug: created.pageSlug,
        pageName: created.pageName,
        reusedPages: ["Trang chủ (Khối Dự án)", "Trang Mô hình & Dự án (/projects)"],
        createdAt: created.createdAt.toISOString(),
      };
      this.inMemoryProjects.unshift(entity);
      return entity;
    } catch {
      const mockEntity: MasterDataProject = {
        id: "proj_" + Math.random().toString(36).substring(2, 9),
        name: dto.name,
        slug,
        location: dto.location,
        category: dto.category,
        status: dto.status || "Đang vận hành",
        annualRevenue: dto.annualRevenue,
        jobsCreated: dto.jobsCreated || 0,
        conservationFundShare: dto.conservationFundShare,
        pageSlug: dto.pageSlug || "projects",
        pageName: dto.pageName || "Mô hình & Dự án",
        reusedPages: ["Trang chủ (Khối Dự án)", "Trang Mô hình & Dự án (/projects)"],
        createdAt: new Date().toISOString(),
      };
      this.inMemoryProjects.unshift(mockEntity);
      return mockEntity;
    }
  }

  async updateProject(id: string, dto: UpdateProjectDTO): Promise<MasterDataProject | null> {
    try {
      const updated = await prisma.heritageProject.update({
        where: { id },
        data: {
          name: dto.name,
          slug: dto.slug,
          location: dto.location,
          category: dto.category,
          status: dto.status,
          description: dto.description,
          annualRevenue: dto.annualRevenue,
          jobsCreated: dto.jobsCreated,
          conservationFundShare: dto.conservationFundShare,
          ownerOrg: dto.ownerOrg,
          websiteUrl: dto.websiteUrl,
          thumbnailUrl: dto.thumbnailUrl,
          pageSlug: dto.pageSlug,
          pageName: dto.pageName,
          isFeatured: dto.isFeatured,
        },
      });

      const entity: MasterDataProject = {
        id: updated.id,
        name: updated.name,
        slug: updated.slug,
        location: updated.location,
        category: updated.category,
        status: updated.status,
        annualRevenue: updated.annualRevenue,
        jobsCreated: updated.jobsCreated,
        conservationFundShare: updated.conservationFundShare,
        pageSlug: updated.pageSlug,
        pageName: updated.pageName,
        reusedPages: ["Trang chủ (Khối Dự án)", "Trang Mô hình & Dự án (/projects)"],
        createdAt: updated.createdAt.toISOString(),
      };

      const idx = this.inMemoryProjects.findIndex((p) => p.id === id);
      if (idx !== -1) this.inMemoryProjects[idx] = entity;
      return entity;
    } catch {
      const idx = this.inMemoryProjects.findIndex((p) => p.id === id);
      if (idx === -1) return null;
      this.inMemoryProjects[idx] = {
        ...this.inMemoryProjects[idx],
        ...dto,
      };
      return this.inMemoryProjects[idx];
    }
  }

  async deleteProject(id: string): Promise<boolean> {
    try {
      await prisma.heritageProject.delete({ where: { id } });
    } catch {
      // In-memory fallback
    }
    const idx = this.inMemoryProjects.findIndex((p) => p.id === id);
    if (idx !== -1) {
      this.inMemoryProjects.splice(idx, 1);
      return true;
    }
    return false;
  }

  // ========================================================
  // 2. ORGANIZATIONS CRUD
  // ========================================================
  private getCategoryLabel(cat: string): string {
    const labels: Record<string, string> = {
      STEERING: "Cơ quan Chỉ đạo",
      HOSTING: "Cơ quan Chủ trì & Đăng cai",
      ORGANIZING: "Đơn vị Tổ chức & Điều hành",
      COMPANION: "Đối tác Đồng hành & Học thuật",
      STRATEGIC: "Nhà Tài trợ Chiến lược",
      MEDIA: "Bảo trợ Truyền thông & Báo chí",
    };
    return labels[cat] || cat;
  }

  async getOrganizations(): Promise<MasterDataOrganization[]> {
    try {
      const items = await prisma.organization.findMany({
        include: { pages: true },
        orderBy: { createdAt: "asc" },
      });

      if (items.length > 0) {
        return items.map((org) => {
          const reusedPages = org.pages.map((p) => ({
            pageSlug: p.pageSlug,
            pageName: p.pageName || p.pageSlug,
            roleLabel: p.roleLabel,
          }));

          return {
            id: org.id,
            name: org.name,
            shortName: org.shortName,
            category: org.category,
            categoryLabel: this.getCategoryLabel(org.category),
            logoUrl: org.logoUrl,
            websiteUrl: org.websiteUrl,
            reusedPages:
              reusedPages.length > 0
                ? reusedPages
                : [
                    {
                      pageSlug: "home",
                      pageName: "Trang chủ",
                      roleLabel: this.getCategoryLabel(org.category),
                    },
                  ],
            createdAt: org.createdAt.toISOString(),
          };
        });
      }
    } catch {
      // Fallback
    }
    return this.inMemoryOrganizations;
  }

  async getOrganizationById(id: string): Promise<MasterDataOrganization | null> {
    try {
      const org = await prisma.organization.findUnique({
        where: { id },
        include: { pages: true },
      });
      if (org) {
        return {
          id: org.id,
          name: org.name,
          shortName: org.shortName,
          category: org.category,
          categoryLabel: this.getCategoryLabel(org.category),
          logoUrl: org.logoUrl,
          websiteUrl: org.websiteUrl,
          reusedPages: org.pages.map((p) => ({
            pageSlug: p.pageSlug,
            pageName: p.pageName || p.pageSlug,
            roleLabel: p.roleLabel,
          })),
          createdAt: org.createdAt.toISOString(),
        };
      }
    } catch {
      // Fallback
    }
    return this.inMemoryOrganizations.find((o) => o.id === id) || null;
  }

  async createOrganization(dto: CreateOrganizationDTO): Promise<MasterDataOrganization> {
    try {
      const created = await prisma.organization.create({
        data: {
          name: dto.name,
          shortName: dto.shortName,
          category: dto.category,
          logoUrl: dto.logoUrl,
          websiteUrl: dto.websiteUrl,
          pages: dto.reusedPages
            ? {
                create: dto.reusedPages.map((rp, idx) => ({
                  pageSlug: rp.pageSlug,
                  pageName: rp.pageName || rp.pageSlug,
                  roleLabel: rp.roleLabel,
                  displayOrder: idx + 1,
                })),
              }
            : undefined,
        },
        include: { pages: true },
      });

      const entity: MasterDataOrganization = {
        id: created.id,
        name: created.name,
        shortName: created.shortName,
        category: created.category,
        categoryLabel: this.getCategoryLabel(created.category),
        logoUrl: created.logoUrl,
        websiteUrl: created.websiteUrl,
        reusedPages: created.pages.map((p) => ({
          pageSlug: p.pageSlug,
          pageName: p.pageName || p.pageSlug,
          roleLabel: p.roleLabel,
        })),
        createdAt: created.createdAt.toISOString(),
      };
      this.inMemoryOrganizations.push(entity);
      return entity;
    } catch {
      const mockEntity: MasterDataOrganization = {
        id: "org_" + Math.random().toString(36).substring(2, 9),
        name: dto.name,
        shortName: dto.shortName,
        category: dto.category,
        categoryLabel: this.getCategoryLabel(dto.category),
        logoUrl: dto.logoUrl,
        websiteUrl: dto.websiteUrl,
        reusedPages: dto.reusedPages || [
          {
            pageSlug: "home",
            pageName: "Trang chủ",
            roleLabel: this.getCategoryLabel(dto.category),
          },
        ],
        createdAt: new Date().toISOString(),
      };
      this.inMemoryOrganizations.push(mockEntity);
      return mockEntity;
    }
  }

  async updateOrganization(
    id: string,
    dto: UpdateOrganizationDTO
  ): Promise<MasterDataOrganization | null> {
    try {
      const updated = await prisma.organization.update({
        where: { id },
        data: {
          name: dto.name,
          shortName: dto.shortName,
          category: dto.category,
          logoUrl: dto.logoUrl,
          websiteUrl: dto.websiteUrl,
        },
        include: { pages: true },
      });

      const entity: MasterDataOrganization = {
        id: updated.id,
        name: updated.name,
        shortName: updated.shortName,
        category: updated.category,
        categoryLabel: this.getCategoryLabel(updated.category),
        logoUrl: updated.logoUrl,
        websiteUrl: updated.websiteUrl,
        reusedPages: updated.pages.map((p) => ({
          pageSlug: p.pageSlug,
          pageName: p.pageName || p.pageSlug,
          roleLabel: p.roleLabel,
        })),
        createdAt: updated.createdAt.toISOString(),
      };

      const idx = this.inMemoryOrganizations.findIndex((o) => o.id === id);
      if (idx !== -1) this.inMemoryOrganizations[idx] = entity;
      return entity;
    } catch {
      const idx = this.inMemoryOrganizations.findIndex((o) => o.id === id);
      if (idx === -1) return null;
      this.inMemoryOrganizations[idx] = {
        ...this.inMemoryOrganizations[idx],
        ...dto,
        categoryLabel: dto.category
          ? this.getCategoryLabel(dto.category)
          : this.inMemoryOrganizations[idx].categoryLabel,
      };
      return this.inMemoryOrganizations[idx];
    }
  }

  async deleteOrganization(id: string): Promise<boolean> {
    try {
      await prisma.organization.delete({ where: { id } });
    } catch {
      // In-memory fallback
    }
    const idx = this.inMemoryOrganizations.findIndex((o) => o.id === id);
    if (idx !== -1) {
      this.inMemoryOrganizations.splice(idx, 1);
      return true;
    }
    return false;
  }

  // ========================================================
  // 3. NEWS CRUD
  // ========================================================
  async getNews(): Promise<MasterDataNews[]> {
    try {
      const items = await prisma.news.findMany({
        include: { category: true },
        orderBy: { publishedAt: "desc" },
      });

      if (items.length > 0) {
        return items.map((n) => ({
          id: n.id,
          title: n.title,
          slug: n.slug,
          excerpt: n.excerpt,
          categoryName: n.category?.name || "Thời sự Di sản",
          authorName: n.authorName,
          authorTitle: n.authorTitle,
          status: n.status,
          isFeatured: n.isFeatured,
          viewsCount: n.viewsCount,
          pageSlug: n.pageSlug || "news",
          pageName: n.pageName || "Tin tức & Báo chí",
          reusedPages: [
            n.pageSlug === "home" ? "Trang chủ (Khối Tin tức)" : "Trang Tin tức (/news)",
            "Cổng Thông tin Chuyên đề",
          ],
          publishedAt: n.publishedAt?.toISOString() || null,
        }));
      }
    } catch {
      // Fallback
    }
    return this.inMemoryNews;
  }

  async getNewsById(id: string): Promise<MasterDataNews | null> {
    try {
      const n = await prisma.news.findUnique({
        where: { id },
        include: { category: true },
      });
      if (n) {
        return {
          id: n.id,
          title: n.title,
          slug: n.slug,
          excerpt: n.excerpt,
          categoryName: n.category?.name || "Thời sự Di sản",
          authorName: n.authorName,
          authorTitle: n.authorTitle,
          status: n.status,
          isFeatured: n.isFeatured,
          viewsCount: n.viewsCount,
          pageSlug: n.pageSlug || "news",
          pageName: n.pageName || "Tin tức & Báo chí",
          reusedPages: [
            n.pageSlug === "home" ? "Trang chủ (Khối Tin tức)" : "Trang Tin tức (/news)",
            "Cổng Thông tin Chuyên đề",
          ],
          publishedAt: n.publishedAt?.toISOString() || null,
        };
      }
    } catch {
      // Fallback
    }
    return this.inMemoryNews.find((n) => n.id === id || n.slug === id) || null;
  }

  async createNews(dto: CreateNewsDTO): Promise<MasterDataNews> {
    const slug = dto.slug || generateSlug(dto.title);
    try {
      // Đảm bảo category tồn tại
      let category = await prisma.category.findFirst({
        where: { name: dto.categoryName || "Thời sự Di sản" },
      });
      if (!category) {
        category = await prisma.category.create({
          data: {
            name: dto.categoryName || "Thời sự Di sản",
            slug: generateSlug(dto.categoryName || "Thời sự Di sản"),
          },
        });
      }

      const created = await prisma.news.create({
        data: {
          title: dto.title,
          slug,
          excerpt: dto.excerpt,
          categoryId: category.id,
          authorName: dto.authorName,
          authorTitle: dto.authorTitle,
          coverImageUrl: dto.coverImageUrl,
          status: dto.status || "PUBLISHED",
          isFeatured: dto.isFeatured || false,
          pageSlug: dto.pageSlug || "news",
          pageName: dto.pageName || "Tin tức & Báo chí",
          publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : new Date(),
        },
        include: { category: true },
      });

      const entity: MasterDataNews = {
        id: created.id,
        title: created.title,
        slug: created.slug,
        excerpt: created.excerpt,
        categoryName: created.category.name,
        authorName: created.authorName,
        authorTitle: created.authorTitle,
        status: created.status,
        isFeatured: created.isFeatured,
        viewsCount: created.viewsCount,
        pageSlug: created.pageSlug,
        pageName: created.pageName,
        reusedPages: ["Trang chủ (Khối Tin tức)", "Trang Tin tức (/news)"],
        publishedAt: created.publishedAt?.toISOString() || null,
      };
      this.inMemoryNews.unshift(entity);
      return entity;
    } catch {
      const mockEntity: MasterDataNews = {
        id: "news_" + Math.random().toString(36).substring(2, 9),
        title: dto.title,
        slug,
        excerpt: dto.excerpt,
        categoryName: dto.categoryName || "Thời sự Di sản",
        authorName: dto.authorName,
        authorTitle: dto.authorTitle,
        status: dto.status || "PUBLISHED",
        isFeatured: dto.isFeatured || false,
        viewsCount: 0,
        pageSlug: dto.pageSlug || "news",
        pageName: dto.pageName || "Tin tức & Báo chí",
        reusedPages: ["Trang chủ (Khối Tin tức)", "Trang Tin tức (/news)"],
        publishedAt: dto.publishedAt || new Date().toISOString(),
      };
      this.inMemoryNews.unshift(mockEntity);
      return mockEntity;
    }
  }

  async updateNews(id: string, dto: UpdateNewsDTO): Promise<MasterDataNews | null> {
    try {
      const updated = await prisma.news.update({
        where: { id },
        data: {
          title: dto.title,
          slug: dto.slug,
          excerpt: dto.excerpt,
          authorName: dto.authorName,
          authorTitle: dto.authorTitle,
          coverImageUrl: dto.coverImageUrl,
          status: dto.status,
          isFeatured: dto.isFeatured,
          pageSlug: dto.pageSlug,
          pageName: dto.pageName,
          publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : undefined,
        },
        include: { category: true },
      });

      const entity: MasterDataNews = {
        id: updated.id,
        title: updated.title,
        slug: updated.slug,
        excerpt: updated.excerpt,
        categoryName: updated.category.name,
        authorName: updated.authorName,
        authorTitle: updated.authorTitle,
        status: updated.status,
        isFeatured: updated.isFeatured,
        viewsCount: updated.viewsCount,
        pageSlug: updated.pageSlug,
        pageName: updated.pageName,
        reusedPages: ["Trang chủ (Khối Tin tức)", "Trang Tin tức (/news)"],
        publishedAt: updated.publishedAt?.toISOString() || null,
      };

      const idx = this.inMemoryNews.findIndex((n) => n.id === id);
      if (idx !== -1) this.inMemoryNews[idx] = entity;
      return entity;
    } catch {
      const idx = this.inMemoryNews.findIndex((n) => n.id === id);
      if (idx === -1) return null;
      this.inMemoryNews[idx] = {
        ...this.inMemoryNews[idx],
        ...dto,
      };
      return this.inMemoryNews[idx];
    }
  }

  async deleteNews(id: string): Promise<boolean> {
    try {
      await prisma.news.delete({ where: { id } });
    } catch {
      // In-memory fallback
    }
    const idx = this.inMemoryNews.findIndex((n) => n.id === id);
    if (idx !== -1) {
      this.inMemoryNews.splice(idx, 1);
      return true;
    }
    return false;
  }

  // ========================================================
  // 4. SPEAKERS CRUD
  // ========================================================
  async getSpeakers(): Promise<MasterDataSpeaker[]> {
    try {
      const items = await prisma.speaker.findMany({
        orderBy: { name: "asc" },
      });

      if (items.length > 0) {
        return items.map((s) => ({
          id: s.id,
          name: s.name,
          slug: s.slug,
          degree: s.degree,
          title: s.title,
          organization: s.organization,
          avatarUrl: s.avatarUrl,
          bio: s.bio,
          reusedPages: [
            "Trang chủ (Diễn giả Sự kiện 2026)",
            "Trang Diễn đàn (/forum)",
            "Trang Giới thiệu (/about - Hội đồng khoa học)",
          ],
        }));
      }
    } catch {
      // Fallback
    }
    return this.inMemorySpeakers;
  }

  async getSpeakerById(id: string): Promise<MasterDataSpeaker | null> {
    try {
      const s = await prisma.speaker.findUnique({
        where: { id },
      });
      if (s) {
        return {
          id: s.id,
          name: s.name,
          slug: s.slug,
          degree: s.degree,
          title: s.title,
          organization: s.organization,
          avatarUrl: s.avatarUrl,
          bio: s.bio,
          reusedPages: [
            "Trang chủ (Diễn giả Sự kiện 2026)",
            "Trang Diễn đàn (/forum)",
            "Trang Giới thiệu (/about)",
          ],
        };
      }
    } catch {
      // Fallback
    }
    return this.inMemorySpeakers.find((s) => s.id === id || s.slug === id) || null;
  }

  async createSpeaker(dto: CreateSpeakerDTO): Promise<MasterDataSpeaker> {
    const slug = dto.slug || generateSlug(dto.name);
    try {
      const created = await prisma.speaker.create({
        data: {
          name: dto.name,
          slug,
          degree: dto.degree,
          title: dto.title,
          organization: dto.organization,
          avatarUrl:
            dto.avatarUrl ||
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80",
          bio: dto.bio,
        },
      });

      const entity: MasterDataSpeaker = {
        id: created.id,
        name: created.name,
        slug: created.slug,
        degree: created.degree,
        title: created.title,
        organization: created.organization,
        avatarUrl: created.avatarUrl,
        bio: created.bio,
        reusedPages: dto.reusedPages || ["Trang chủ", "Trang Diễn đàn (/forum)", "Trang Giới thiệu (/about)"],
      };
      this.inMemorySpeakers.push(entity);
      return entity;
    } catch {
      const mockEntity: MasterDataSpeaker = {
        id: "spk_" + Math.random().toString(36).substring(2, 9),
        name: dto.name,
        slug,
        degree: dto.degree,
        title: dto.title,
        organization: dto.organization,
        avatarUrl:
          dto.avatarUrl ||
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80",
        bio: dto.bio,
        reusedPages: dto.reusedPages || ["Trang chủ", "Trang Diễn đàn (/forum)", "Trang Giới thiệu (/about)"],
      };
      this.inMemorySpeakers.push(mockEntity);
      return mockEntity;
    }
  }

  async updateSpeaker(id: string, dto: UpdateSpeakerDTO): Promise<MasterDataSpeaker | null> {
    try {
      const updated = await prisma.speaker.update({
        where: { id },
        data: {
          name: dto.name,
          slug: dto.slug,
          degree: dto.degree,
          title: dto.title,
          organization: dto.organization,
          avatarUrl: dto.avatarUrl,
          bio: dto.bio,
        },
      });

      const entity: MasterDataSpeaker = {
        id: updated.id,
        name: updated.name,
        slug: updated.slug,
        degree: updated.degree,
        title: updated.title,
        organization: updated.organization,
        avatarUrl: updated.avatarUrl,
        bio: updated.bio,
        reusedPages: dto.reusedPages || ["Trang chủ", "Trang Diễn đàn (/forum)", "Trang Giới thiệu (/about)"],
      };

      const idx = this.inMemorySpeakers.findIndex((s) => s.id === id);
      if (idx !== -1) this.inMemorySpeakers[idx] = entity;
      return entity;
    } catch {
      const idx = this.inMemorySpeakers.findIndex((s) => s.id === id);
      if (idx === -1) return null;
      this.inMemorySpeakers[idx] = {
        ...this.inMemorySpeakers[idx],
        ...dto,
      };
      return this.inMemorySpeakers[idx];
    }
  }

  async deleteSpeaker(id: string): Promise<boolean> {
    try {
      await prisma.speaker.delete({ where: { id } });
    } catch {
      // In-memory fallback
    }
    const idx = this.inMemorySpeakers.findIndex((s) => s.id === id);
    if (idx !== -1) {
      this.inMemorySpeakers.splice(idx, 1);
      return true;
    }
    return false;
  }

  // ========================================================
  // 5. AWARDS CRUD
  // ========================================================
  async getAwards(): Promise<MasterDataAward[]> {
    try {
      const items = await prisma.award.findMany({
        include: { categories: true },
        orderBy: { year: "desc" },
      });

      if (items.length > 0) {
        return items.map((a) => ({
          id: a.id,
          year: a.year,
          name: a.name,
          theme: a.theme,
          nominationDeadline: a.nominationDeadline.toISOString(),
          isOpen: a.isOpen,
          categories: a.categories.map((c) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            description: c.description,
          })),
          reusedPages: [
            "Trang chủ (Khối Giải thưởng 2026)",
            "Trang Giải thưởng (/awards)",
            "Trang Đề cử Trực tuyến",
          ],
        }));
      }
    } catch {
      // Fallback
    }
    return this.inMemoryAwards;
  }

  async getAwardById(id: string): Promise<MasterDataAward | null> {
    try {
      const a = await prisma.award.findUnique({
        where: { id },
        include: { categories: true },
      });
      if (a) {
        return {
          id: a.id,
          year: a.year,
          name: a.name,
          theme: a.theme,
          nominationDeadline: a.nominationDeadline.toISOString(),
          isOpen: a.isOpen,
          categories: a.categories.map((c) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            description: c.description,
          })),
          reusedPages: ["Trang chủ", "Trang Giải thưởng (/awards)"],
        };
      }
    } catch {
      // Fallback
    }
    return this.inMemoryAwards.find((a) => a.id === id) || null;
  }

  async createAward(dto: CreateAwardDTO): Promise<MasterDataAward> {
    try {
      const created = await prisma.award.create({
        data: {
          year: dto.year,
          name: dto.name,
          theme: dto.theme,
          nominationDeadline: new Date(dto.nominationDeadline),
          isOpen: dto.isOpen ?? true,
          categories: dto.categories
            ? {
                create: dto.categories.map((c) => ({
                  name: c.name,
                  slug: c.slug || generateSlug(c.name),
                  description: c.description || "",
                })),
              }
            : undefined,
        },
        include: { categories: true },
      });

      const entity: MasterDataAward = {
        id: created.id,
        year: created.year,
        name: created.name,
        theme: created.theme,
        nominationDeadline: created.nominationDeadline.toISOString(),
        isOpen: created.isOpen,
        categories: created.categories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
        })),
        reusedPages: dto.reusedPages || ["Trang chủ", "Trang Giải thưởng (/awards)"],
      };
      this.inMemoryAwards.push(entity);
      return entity;
    } catch {
      const mockEntity: MasterDataAward = {
        id: "award_" + Math.random().toString(36).substring(2, 9),
        year: dto.year,
        name: dto.name,
        theme: dto.theme,
        nominationDeadline: dto.nominationDeadline,
        isOpen: dto.isOpen ?? true,
        categories: (dto.categories || []).map((c, i) => ({
          id: "cat_" + i + "_" + Math.random().toString(36).substring(2, 6),
          name: c.name,
          slug: c.slug || generateSlug(c.name),
          description: c.description || "",
        })),
        reusedPages: dto.reusedPages || ["Trang chủ", "Trang Giải thưởng (/awards)"],
      };
      this.inMemoryAwards.push(mockEntity);
      return mockEntity;
    }
  }

  async updateAward(id: string, dto: UpdateAwardDTO): Promise<MasterDataAward | null> {
    try {
      const updated = await prisma.award.update({
        where: { id },
        data: {
          year: dto.year,
          name: dto.name,
          theme: dto.theme,
          nominationDeadline: dto.nominationDeadline ? new Date(dto.nominationDeadline) : undefined,
          isOpen: dto.isOpen,
        },
        include: { categories: true },
      });

      const entity: MasterDataAward = {
        id: updated.id,
        year: updated.year,
        name: updated.name,
        theme: updated.theme,
        nominationDeadline: updated.nominationDeadline.toISOString(),
        isOpen: updated.isOpen,
        categories: updated.categories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
        })),
        reusedPages: ["Trang chủ", "Trang Giải thưởng (/awards)"],
      };

      const idx = this.inMemoryAwards.findIndex((a) => a.id === id);
      if (idx !== -1) this.inMemoryAwards[idx] = entity;
      return entity;
    } catch {
      const idx = this.inMemoryAwards.findIndex((a) => a.id === id);
      if (idx === -1) return null;
      const current = this.inMemoryAwards[idx];
      const updatedCategories = dto.categories
        ? dto.categories.map((c, i) => ({
            id: "cat_" + i + "_" + Math.random().toString(36).substring(2, 6),
            name: c.name,
            slug: c.slug || generateSlug(c.name),
            description: c.description || "",
          }))
        : current.categories;

      this.inMemoryAwards[idx] = {
        ...current,
        ...dto,
        categories: updatedCategories,
      };
      return this.inMemoryAwards[idx];
    }
  }

  async deleteAward(id: string): Promise<boolean> {
    try {
      await prisma.award.delete({ where: { id } });
    } catch {
      // In-memory fallback
    }
    const idx = this.inMemoryAwards.findIndex((a) => a.id === id);
    if (idx !== -1) {
      this.inMemoryAwards.splice(idx, 1);
      return true;
    }
    return false;
  }

  // ========================================================
  // OVERVIEW
  // ========================================================
  async getOverview(): Promise<MasterDataOverview> {
    const [projects, organizations, news, speakers, awards] = await Promise.all([
      this.getProjects(),
      this.getOrganizations(),
      this.getNews(),
      this.getSpeakers(),
      this.getAwards(),
    ]);

    const totalAwardCategories = awards.reduce((sum, a) => sum + a.categories.length, 0);

    return {
      projects,
      organizations,
      news,
      speakers,
      awards,
      stats: {
        totalProjects: projects.length,
        totalOrganizations: organizations.length,
        totalNews: news.length,
        totalSpeakers: speakers.length,
        totalAwardCategories,
      },
    };
  }
}

export const masterDataRepository = new MasterDataRepository();
