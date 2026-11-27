/**
 * LAYER 3: REPOSITORY / DATA ACCESS CHO DANH MỤC DỮ LIỆU DÙNG CHUNG (MASTER DATA)
 * Truy vấn và thao tác CRUD các thực thể từ MySQL (HeritageProject, Organization, News, Speaker, Award).
 * Hỗ trợ:
 * 1. Truy vấn danh sách theo mảng `ids: string[]` được lưu trong `Page.props` (giữ đúng thứ tự trong mảng `ids`).
 * 2. Truy vấn danh sách đầy đủ có phân trang (`getProjectsPaginated`, `getNewsPaginated`) cho các trang `/projects`, `/news`.
 */

import { prisma } from "@/lib/prisma";
import type {
  MasterDataCategory,
  MasterDataProjectCategory,
  CreateCategoryDTO,
  UpdateCategoryDTO,
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
  MasterDataAwardCategory,
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

function parseCategoryId(rawId: string | number): number {
  if (typeof rawId === "number") return rawId;
  const direct = Number(rawId);
  if (!Number.isNaN(direct) && direct > 0) return direct;
  const match = String(rawId).match(/(\d+)/);
  return match ? Number(match[1]) : 1;
}

function matchesCategoryId(itemId: string, queryId: string): boolean {
  if (itemId === queryId) return true;
  return String(parseCategoryId(itemId)) === String(parseCategoryId(queryId));
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
    description: p.description,
    thumbnailUrl: p.imageUrl,
    annualRevenue: p.economicMetrics.annualRevenue,
    jobsCreated: p.economicMetrics.jobsCreated,
    conservationFundShare: p.economicMetrics.conservationFundShare,
    pageSlug: "projects",
    pageName: "Mô hình & Dự án",
    reusedPages: ["Trang chủ (props.showcase.ids)", "Trang Mô hình & Dự án (/projects - Phân trang)"],
    createdAt: new Date().toISOString(),
  }));

  private inMemoryOrganizations: MasterDataOrganization[] = fallbackHomePageData.partners.map(
    (p) => ({
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
          pageName: "Trang chủ (props.partners.ids)",
          roleLabel: p.categoryLabel,
        },
        {
          pageSlug: "about",
          pageName: "Giới thiệu (props.partners.ids)",
          roleLabel: "Đơn vị Đồng hành",
        },
      ],
      createdAt: new Date().toISOString(),
    })
  );

  private inMemoryNews: MasterDataNews[] = [
    ...fallbackHomePageData.featuredNews,
    ...fallbackHomePageData.latestNews,
  ].map((n, idx) => ({
    id: n.id,
    title: n.title,
    slug: n.slug,
    excerpt: n.summary,
    coverImageUrl: n.thumbnailUrl,
    category: {
      id: (idx % 3) + 1,
      name: n.category,
    },
    categoryName: n.category,
    authorName: n.author,
    authorTitle: "Chuyên gia Di sản",
    status: "PUBLISHED",
    readingTimeMinutes: 5,
    pageSlug: "news",
    pageName: "Tin tức & Báo chí",
    reusedPages: ["Trang chủ (props.news.ids)", "Trang Tin tức & Báo chí (/news - Phân trang)"],
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
      reusedPages: ["Trang Giới thiệu (props.council.ids)", "Trang Diễn đàn (props.speakers.ids)"],
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
      reusedPages: [
        "Trang Giới thiệu (props.council.ids & props.executive.ids)",
        "Trang Diễn đàn (props.speakers.ids)",
      ],
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
      reusedPages: ["Trang Giới thiệu (props.council.ids)", "Trang Diễn đàn (props.speakers.ids)"],
    },
  ];

  private inMemoryProjectCategories: MasterDataProjectCategory[] = [
    { id: "1", name: "Đô thị Di sản" },
    { id: "2", name: "Làng nghề Thủ công" },
    { id: "3", name: "Di sản Kép UNESCO" },
    { id: "4", name: "Không gian Di sản" },
    { id: "5", name: "Kinh tế & Cộng đồng" },
  ];

  private inMemoryCategories: MasterDataCategory[] = [
    { id: "1", name: "Hoạt Động Diễn Đàn" },
    { id: "2", name: "Chính Sách & Nghiên Cứu" },
    { id: "3", name: "Mô Hình & Thực Tiễn" },
  ];

  private inMemoryAwardCategories: MasterDataAwardCategory[] = [
    { id: "1", name: "Bảo Tồn Thích Ứng Xuất Sắc" },
    { id: "2", name: "Mô Hình Sinh Kế Di Sản Bản Địa" },
    { id: "3", name: "Đổi Mới Sáng Tạo & Số Hóa Di Sản" },
    { id: "4", name: "Doanh Nghiệp Tiên Phong Vì Di Sản" },
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
        { id: "1", name: "Bảo Tồn Thích Ứng Xuất Sắc" },
        { id: "2", name: "Mô Hình Sinh Kế Di Sản Bản Địa" },
        { id: "3", name: "Đổi Mới Sáng Tạo & Số Hóa Di Sản" },
        { id: "4", name: "Doanh Nghiệp Tiên Phong Vì Di Sản" },
      ],
      reusedPages: ["Trang chủ (props.showcase.groups.ids)", "Trang Giải thưởng (props.categories.ids)"],
    },
  ];

  // ========================================================
  // 0. CATEGORIES, PROJECT CATEGORIES & AWARD CATEGORIES CRUD (CHỈ GỒM ID TỰ TĂNG VÀ NAME)
  // ========================================================
  async getProjectCategories(): Promise<MasterDataProjectCategory[]> {
    try {
      const items = await prisma.projectCategory.findMany();
      if (items.length > 0) {
        return items.map((c) => ({ id: String(c.id), name: c.name }));
      }
    } catch {
      // Fallback
    }
    return this.inMemoryProjectCategories;
  }

  async getProjectCategoryById(id: string): Promise<MasterDataProjectCategory | null> {
    try {
      const item = await prisma.projectCategory.findUnique({
        where: { id: parseCategoryId(id) },
      });
      if (item) return { id: String(item.id), name: item.name };
    } catch {
      // Fallback
    }
    return this.inMemoryProjectCategories.find((c) => matchesCategoryId(c.id, id)) || null;
  }

  async createProjectCategory(dto: CreateCategoryDTO): Promise<MasterDataProjectCategory> {
    try {
      const created = await prisma.projectCategory.create({
        data: { name: dto.name },
      });
      const entity = { id: String(created.id), name: created.name };
      this.inMemoryProjectCategories.push(entity);
      return entity;
    } catch {
      const nextId = String(this.inMemoryProjectCategories.length + 1);
      const mock = {
        id: nextId,
        name: dto.name,
      };
      this.inMemoryProjectCategories.push(mock);
      return mock;
    }
  }

  async updateProjectCategory(
    id: string,
    dto: UpdateCategoryDTO
  ): Promise<MasterDataProjectCategory | null> {
    try {
      const updated = await prisma.projectCategory.update({
        where: { id: parseCategoryId(id) },
        data: { name: dto.name },
      });
      const entity = { id: String(updated.id), name: updated.name };
      const idx = this.inMemoryProjectCategories.findIndex((c) => matchesCategoryId(c.id, id));
      if (idx !== -1) this.inMemoryProjectCategories[idx] = entity;
      return entity;
    } catch {
      const idx = this.inMemoryProjectCategories.findIndex((c) => matchesCategoryId(c.id, id));
      if (idx === -1) return null;
      this.inMemoryProjectCategories[idx] = {
        ...this.inMemoryProjectCategories[idx],
        ...(dto.name ? { name: dto.name } : {}),
      };
      return this.inMemoryProjectCategories[idx];
    }
  }

  async deleteProjectCategory(id: string): Promise<boolean> {
    try {
      await prisma.projectCategory.delete({ where: { id: parseCategoryId(id) } });
    } catch {
      // Fallback
    }
    const idx = this.inMemoryProjectCategories.findIndex((c) => matchesCategoryId(c.id, id));
    if (idx !== -1) {
      this.inMemoryProjectCategories.splice(idx, 1);
      return true;
    }
    return false;
  }

  async getCategories(): Promise<MasterDataCategory[]> {
    try {
      const items = await prisma.category.findMany();
      if (items.length > 0) {
        return items.map((c) => ({ id: String(c.id), name: c.name }));
      }
    } catch {
      // Fallback
    }
    return this.inMemoryCategories;
  }

  async getCategoryById(id: string): Promise<MasterDataCategory | null> {
    try {
      const item = await prisma.category.findUnique({ where: { id: parseCategoryId(id) } });
      if (item) return { id: String(item.id), name: item.name };
    } catch {
      // Fallback
    }
    return this.inMemoryCategories.find((c) => matchesCategoryId(c.id, id)) || null;
  }

  async createCategory(dto: CreateCategoryDTO): Promise<MasterDataCategory> {
    try {
      const created = await prisma.category.create({
        data: { name: dto.name },
      });
      const entity = { id: String(created.id), name: created.name };
      this.inMemoryCategories.push(entity);
      return entity;
    } catch {
      const nextId = String(this.inMemoryCategories.length + 1);
      const mock = {
        id: nextId,
        name: dto.name,
      };
      this.inMemoryCategories.push(mock);
      return mock;
    }
  }

  async updateCategory(id: string, dto: UpdateCategoryDTO): Promise<MasterDataCategory | null> {
    try {
      const updated = await prisma.category.update({
        where: { id: parseCategoryId(id) },
        data: { name: dto.name },
      });
      const entity = { id: String(updated.id), name: updated.name };
      const idx = this.inMemoryCategories.findIndex((c) => matchesCategoryId(c.id, id));
      if (idx !== -1) this.inMemoryCategories[idx] = entity;
      return entity;
    } catch {
      const idx = this.inMemoryCategories.findIndex((c) => matchesCategoryId(c.id, id));
      if (idx === -1) return null;
      this.inMemoryCategories[idx] = {
        ...this.inMemoryCategories[idx],
        ...(dto.name ? { name: dto.name } : {}),
      };
      return this.inMemoryCategories[idx];
    }
  }

  async deleteCategory(id: string): Promise<boolean> {
    try {
      await prisma.category.delete({ where: { id: parseCategoryId(id) } });
    } catch {
      // Fallback
    }
    const idx = this.inMemoryCategories.findIndex((c) => matchesCategoryId(c.id, id));
    if (idx !== -1) {
      this.inMemoryCategories.splice(idx, 1);
      return true;
    }
    return false;
  }

  async getAwardCategories(): Promise<MasterDataAwardCategory[]> {
    return this.inMemoryAwardCategories;
  }

  async getAwardCategoryById(id: string): Promise<MasterDataAwardCategory | null> {
    return this.inMemoryAwardCategories.find((c) => matchesCategoryId(c.id, id)) || null;
  }

  async createAwardCategory(dto: CreateCategoryDTO): Promise<MasterDataAwardCategory> {
    const nextId = String(this.inMemoryAwardCategories.length + 1);
    const mock = {
      id: nextId,
      name: dto.name,
    };
    this.inMemoryAwardCategories.push(mock);
    if (this.inMemoryAwards[0]) {
      this.inMemoryAwards[0].categories.push(mock);
    }
    return mock;
  }

  async updateAwardCategory(
    id: string,
    dto: UpdateCategoryDTO
  ): Promise<MasterDataAwardCategory | null> {
    const idx = this.inMemoryAwardCategories.findIndex((c) => matchesCategoryId(c.id, id));
    if (idx === -1) return null;
    const updated = {
      ...this.inMemoryAwardCategories[idx],
      ...(dto.name ? { name: dto.name } : {}),
    };
    this.inMemoryAwardCategories[idx] = updated;
    for (const aw of this.inMemoryAwards) {
      aw.categories = aw.categories.map((c) => (matchesCategoryId(c.id, id) ? updated : c));
    }
    return updated;
  }

  async deleteAwardCategory(id: string): Promise<boolean> {
    const idx = this.inMemoryAwardCategories.findIndex((c) => matchesCategoryId(c.id, id));
    if (idx !== -1) {
      this.inMemoryAwardCategories.splice(idx, 1);
      for (const aw of this.inMemoryAwards) {
        aw.categories = aw.categories.filter((c) => !matchesCategoryId(c.id, id));
      }
      return true;
    }
    return false;
  }

  // ========================================================
  // HELPER: SẮP XẾP KẾT QUẢ THEO ĐÚNG THỨ TỰ MẢNG `ids` TRONG PAGE.PROPS
  // ========================================================
  private orderByIds<T extends { id: string; slug?: string }>(
    items: T[],
    ids: Array<string | number>
  ): T[] {
    if (!ids || ids.length === 0) return [];
    const byId = new Map<string, T>();
    for (const item of items) {
      byId.set(item.id, item);
      byId.set(String(parseCategoryId(item.id)), item);
      if (item.slug) {
        byId.set(item.slug, item);
      }
    }
    const ordered: T[] = [];
    for (const rawId of ids) {
      const strId = String(rawId);
      const found = byId.get(strId) || byId.get(String(parseCategoryId(strId)));
      if (found) {
        ordered.push(found);
      }
    }
    return ordered;
  }

  // ========================================================
  // 1. PROJECTS CRUD + RESOLVE BY IDS + PAGINATION
  // ========================================================
  private async resolveProjectCategoryId(
    categoryId?: string,
    categoryName?: string
  ): Promise<{ id: number; name: string }> {
    if (categoryId) {
      const byId = await prisma.projectCategory.findUnique({
        where: { id: parseCategoryId(categoryId) },
      });
      if (byId) return { id: byId.id, name: byId.name };
    }
    const cleanName = (categoryName || "Đô thị Di sản").trim();
    const existing = await prisma.projectCategory.findFirst({
      where: { name: cleanName },
    });
    if (existing) return { id: existing.id, name: existing.name };
    const created = await prisma.projectCategory.create({
      data: { name: cleanName },
    });
    return { id: created.id, name: created.name };
  }

  async getProjects(): Promise<MasterDataProject[]> {
    try {
      const items = await prisma.project.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" },
      });

      if (items.length > 0) {
        return items.map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          location: p.location,
          categoryId: String(p.categoryId),
          category: p.category?.name || "Đô thị Di sản",
          status: p.status,
          description: p.description,
          thumbnailUrl: p.thumbnailUrl,
          annualRevenue: p.annualRevenue,
          jobsCreated: p.jobsCreated,
          conservationFundShare: p.conservationFundShare,
          pageSlug: "projects",
          pageName: "Mô hình & Dự án",
          reusedPages: ["Trang chủ (props.showcase.ids)", "Trang Mô hình & Dự án (/projects)"],
          createdAt: p.createdAt.toISOString(),
        }));
      }
    } catch {
      // Fallback in-memory
    }
    return this.inMemoryProjects;
  }

  async getProjectsByIds(ids: Array<string | number>): Promise<MasterDataProject[]> {
    if (!ids || ids.length === 0) return [];
    const all = await this.getProjects();
    const resolved = this.orderByIds(all, ids);
    return resolved.length > 0 ? resolved : all.slice(0, ids.length);
  }

  async getProjectsPaginated(params?: {
    page?: number;
    limit?: number;
    category?: string;
    location?: string;
    search?: string;
  }): Promise<{ items: MasterDataProject[]; total: number; page: number; limit: number }> {
    const page = Math.max(1, Number(params?.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(params?.limit) || 12));
    const all = await this.getProjects();

    const filtered = all.filter((p) => {
      if (params?.category && params.category !== "Tất cả" && p.category !== params.category) {
        return false;
      }
      if (
        params?.location &&
        !p.location.toLowerCase().includes(params.location.toLowerCase())
      ) {
        return false;
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchLoc = p.location.toLowerCase().includes(q);
        const matchDesc = (p.description || "").toLowerCase().includes(q);
        if (!matchName && !matchLoc && !matchDesc) return false;
      }
      return true;
    });

    const start = (page - 1) * limit;
    return {
      items: filtered.slice(start, start + limit),
      total: filtered.length,
      page,
      limit,
    };
  }

  async getProjectById(id: string): Promise<MasterDataProject | null> {
    try {
      const p = await prisma.project.findUnique({
        where: { id },
        include: { category: true },
      });
      if (p) {
        return {
          id: p.id,
          name: p.name,
          slug: p.slug,
          location: p.location,
          categoryId: String(p.categoryId),
          category: p.category?.name || "Đô thị Di sản",
          status: p.status,
          description: p.description,
          thumbnailUrl: p.thumbnailUrl,
          annualRevenue: p.annualRevenue,
          jobsCreated: p.jobsCreated,
          conservationFundShare: p.conservationFundShare,
          pageSlug: "projects",
          pageName: "Mô hình & Dự án",
          reusedPages: ["Trang chủ (props.showcase.ids)", "Trang Mô hình & Dự án (/projects)"],
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
      const cat = await this.resolveProjectCategoryId(dto.categoryId, dto.category);
      const created = await prisma.project.create({
        data: {
          name: dto.name,
          slug,
          location: dto.location,
          categoryId: cat.id,
          status: dto.status || "Đang vận hành",
          description: dto.description || "",
          annualRevenue: dto.annualRevenue,
          jobsCreated: dto.jobsCreated || 0,
          conservationFundShare: dto.conservationFundShare,
          ownerOrg: dto.ownerOrg,
          websiteUrl: dto.websiteUrl,
          thumbnailUrl: dto.thumbnailUrl,
          isFeatured: dto.isFeatured || false,
        },
        include: { category: true },
      });

      const entity: MasterDataProject = {
        id: created.id,
        name: created.name,
        slug: created.slug,
        location: created.location,
        categoryId: String(created.categoryId),
        category: created.category?.name || cat.name,
        status: created.status,
        description: created.description,
        thumbnailUrl: created.thumbnailUrl,
        annualRevenue: created.annualRevenue,
        jobsCreated: created.jobsCreated,
        conservationFundShare: created.conservationFundShare,
        pageSlug: "projects",
        pageName: "Mô hình & Dự án",
        reusedPages: ["Trang chủ (props.showcase.ids)", "Trang Mô hình & Dự án (/projects)"],
        createdAt: created.createdAt.toISOString(),
      };
      this.inMemoryProjects.unshift(entity);
      return entity;
    } catch {
      const mockEntity: MasterDataProject = {
        id: "her_" + Math.random().toString(36).substring(2, 9),
        name: dto.name,
        slug,
        location: dto.location,
        categoryId: dto.categoryId,
        category: dto.category,
        status: dto.status || "Đang vận hành",
        description: dto.description || "",
        thumbnailUrl: dto.thumbnailUrl,
        annualRevenue: dto.annualRevenue,
        jobsCreated: dto.jobsCreated || 0,
        conservationFundShare: dto.conservationFundShare,
        pageSlug: "projects",
        pageName: "Mô hình & Dự án",
        reusedPages: ["Trang chủ (props.showcase.ids)", "Trang Mô hình & Dự án (/projects)"],
        createdAt: new Date().toISOString(),
      };
      this.inMemoryProjects.unshift(mockEntity);
      return mockEntity;
    }
  }

  async updateProject(id: string, dto: UpdateProjectDTO): Promise<MasterDataProject | null> {
    try {
      const cat =
        dto.categoryId || dto.category
          ? await this.resolveProjectCategoryId(dto.categoryId, dto.category)
          : undefined;

      const updated = await prisma.project.update({
        where: { id },
        data: {
          name: dto.name,
          slug: dto.slug,
          location: dto.location,
          ...(cat ? { categoryId: cat.id } : {}),
          status: dto.status,
          description: dto.description,
          annualRevenue: dto.annualRevenue,
          jobsCreated: dto.jobsCreated,
          conservationFundShare: dto.conservationFundShare,
          ownerOrg: dto.ownerOrg,
          websiteUrl: dto.websiteUrl,
          thumbnailUrl: dto.thumbnailUrl,
          isFeatured: dto.isFeatured,
        },
        include: { category: true },
      });

      const entity: MasterDataProject = {
        id: updated.id,
        name: updated.name,
        slug: updated.slug,
        location: updated.location,
        categoryId: String(updated.categoryId),
        category: updated.category?.name || dto.category || "Đô thị Di sản",
        status: updated.status,
        description: updated.description,
        thumbnailUrl: updated.thumbnailUrl,
        annualRevenue: updated.annualRevenue,
        jobsCreated: updated.jobsCreated,
        conservationFundShare: updated.conservationFundShare,
        pageSlug: "projects",
        pageName: "Mô hình & Dự án",
        reusedPages: ["Trang chủ (props.showcase.ids)", "Trang Mô hình & Dự án (/projects)"],
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
      await prisma.project.delete({ where: { id } });
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
  // 2. ORGANIZATIONS CRUD + RESOLVE BY IDS
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
        orderBy: { createdAt: "asc" },
      });

      if (items.length > 0) {
        return items.map((org) => ({
          id: org.id,
          name: org.name,
          shortName: org.shortName,
          category: org.category,
          categoryLabel: this.getCategoryLabel(org.category),
          logoUrl: org.logoUrl,
          websiteUrl: org.websiteUrl,
          reusedPages: [
            {
              pageSlug: "home",
              pageName: "Trang chủ (props.partners.ids)",
              roleLabel: this.getCategoryLabel(org.category),
            },
            {
              pageSlug: "about",
              pageName: "Giới thiệu (props.partners.ids)",
              roleLabel: this.getCategoryLabel(org.category),
            },
          ],
          createdAt: org.createdAt.toISOString(),
        }));
      }
    } catch {
      // Fallback
    }
    return this.inMemoryOrganizations;
  }

  async getOrganizationsByIds(ids: Array<string | number>): Promise<MasterDataOrganization[]> {
    if (!ids || ids.length === 0) return [];
    const all = await this.getOrganizations();
    const resolved = this.orderByIds(all, ids);
    return resolved.length > 0 ? resolved : all;
  }

  async getOrganizationById(id: string): Promise<MasterDataOrganization | null> {
    try {
      const org = await prisma.organization.findUnique({
        where: { id },
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
          reusedPages: [
            {
              pageSlug: "home",
              pageName: "Trang chủ",
              roleLabel: this.getCategoryLabel(org.category),
            },
          ],
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
        },
      });

      const entity: MasterDataOrganization = {
        id: created.id,
        name: created.name,
        shortName: created.shortName,
        category: created.category,
        categoryLabel: this.getCategoryLabel(created.category),
        logoUrl: created.logoUrl,
        websiteUrl: created.websiteUrl,
        reusedPages: dto.reusedPages || [
          {
            pageSlug: "home",
            pageName: "Trang chủ",
            roleLabel: this.getCategoryLabel(created.category),
          },
        ],
        createdAt: created.createdAt.toISOString(),
      };
      this.inMemoryOrganizations.push(entity);
      return entity;
    } catch {
      const mockEntity: MasterDataOrganization = {
        id: "p_" + Math.random().toString(36).substring(2, 9),
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
      });

      const entity: MasterDataOrganization = {
        id: updated.id,
        name: updated.name,
        shortName: updated.shortName,
        category: updated.category,
        categoryLabel: this.getCategoryLabel(updated.category),
        logoUrl: updated.logoUrl,
        websiteUrl: updated.websiteUrl,
        reusedPages: dto.reusedPages || [
          {
            pageSlug: "home",
            pageName: "Trang chủ",
            roleLabel: this.getCategoryLabel(updated.category),
          },
        ],
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
  // 3. NEWS CRUD + RESOLVE BY IDS + PAGINATION
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
          coverImageUrl: n.coverImageUrl,
          category: {
            id: n.categoryId,
            name: n.category?.name || "Thời sự Di sản",
          },
          categoryName: n.category?.name || "Thời sự Di sản",
          authorName: n.authorName,
          authorTitle: n.authorTitle,
          status: n.status,
          readingTimeMinutes: n.readingTimeMinutes,
          pageSlug: "news",
          pageName: "Tin tức & Báo chí",
          reusedPages: [
            "Trang chủ (props.news.ids)",
            "Trang Tin tức (/news - Phân trang)",
          ],
          publishedAt: n.publishedAt?.toISOString() || null,
        }));
      }
    } catch {
      // Fallback
    }
    return this.inMemoryNews;
  }

  async getNewsByIds(ids: Array<string | number>): Promise<MasterDataNews[]> {
    if (!ids || ids.length === 0) return [];
    const all = await this.getNews();
    const resolved = this.orderByIds(all, ids);
    return resolved.length > 0 ? resolved : all.slice(0, ids.length);
  }

  async getNewsPaginated(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }): Promise<{ items: MasterDataNews[]; total: number; page: number; limit: number }> {
    const page = Math.max(1, Number(params?.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(params?.limit) || 9));
    const all = await this.getNews();

    const filtered = all.filter((n) => {
      if (params?.category && params.category !== "Tất cả" && params.category !== "all") {
        const catMatch =
          String(n.category.id) === String(params.category) ||
          n.categoryName.toLowerCase().includes(params.category.toLowerCase()) ||
          generateSlug(n.categoryName).includes(generateSlug(params.category));
        if (!catMatch) return false;
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        const matchTitle = n.title.toLowerCase().includes(q);
        const matchExcerpt = n.excerpt.toLowerCase().includes(q);
        if (!matchTitle && !matchExcerpt) return false;
      }
      return true;
    });

    const start = (page - 1) * limit;
    return {
      items: filtered.slice(start, start + limit),
      total: filtered.length,
      page,
      limit,
    };
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
          coverImageUrl: n.coverImageUrl,
          category: {
            id: n.categoryId,
            name: n.category?.name || "Thời sự Di sản",
          },
          categoryName: n.category?.name || "Thời sự Di sản",
          authorName: n.authorName,
          authorTitle: n.authorTitle,
          status: n.status,
          readingTimeMinutes: n.readingTimeMinutes,
          pageSlug: "news",
          pageName: "Tin tức & Báo chí",
          reusedPages: ["Trang chủ (props.news.ids)", "Trang Tin tức (/news)"],
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
      let category = dto.categoryId
        ? await prisma.category.findUnique({ where: { id: Number(dto.categoryId) } })
        : await prisma.category.findFirst({
            where: { name: dto.categoryName || "Thời sự Di sản" },
          });
      if (!category) {
        category = await prisma.category.create({
          data: {
            name: dto.categoryName || "Thời sự Di sản",
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
          readingTimeMinutes: dto.readingTimeMinutes ?? 5,
          publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : new Date(),
        },
        include: { category: true },
      });

      const entity: MasterDataNews = {
        id: created.id,
        title: created.title,
        slug: created.slug,
        excerpt: created.excerpt,
        coverImageUrl: created.coverImageUrl,
        category: {
          id: created.categoryId,
          name: created.category.name,
        },
        categoryName: created.category.name,
        authorName: created.authorName,
        authorTitle: created.authorTitle,
        status: created.status,
        readingTimeMinutes: created.readingTimeMinutes,
        pageSlug: "news",
        pageName: "Tin tức & Báo chí",
        reusedPages: ["Trang chủ (props.news.ids)", "Trang Tin tức (/news)"],
        publishedAt: created.publishedAt?.toISOString() || null,
      };
      this.inMemoryNews.unshift(entity);
      return entity;
    } catch {
      const catId = dto.categoryId ? Number(dto.categoryId) : 1;
      const catName = dto.categoryName || "Thời sự Di sản";
      const mockEntity: MasterDataNews = {
        id: "news_" + Math.random().toString(36).substring(2, 9),
        title: dto.title,
        slug,
        excerpt: dto.excerpt,
        coverImageUrl: dto.coverImageUrl,
        category: {
          id: catId,
          name: catName,
        },
        categoryName: catName,
        authorName: dto.authorName,
        authorTitle: dto.authorTitle,
        status: dto.status || "PUBLISHED",
        readingTimeMinutes: dto.readingTimeMinutes ?? 5,
        pageSlug: "news",
        pageName: "Tin tức & Báo chí",
        reusedPages: ["Trang chủ (props.news.ids)", "Trang Tin tức (/news)"],
        publishedAt: dto.publishedAt || new Date().toISOString(),
      };
      this.inMemoryNews.unshift(mockEntity);
      return mockEntity;
    }
  }

  async updateNews(id: string, dto: UpdateNewsDTO): Promise<MasterDataNews | null> {
    try {
      let categoryIdToUpdate: number | undefined;
      if (dto.categoryId) {
        categoryIdToUpdate = Number(dto.categoryId);
      } else if (dto.categoryName) {
        const foundCat = await prisma.category.findFirst({ where: { name: dto.categoryName } });
        if (foundCat) {
          categoryIdToUpdate = foundCat.id;
        }
      }

      const updated = await prisma.news.update({
        where: { id },
        data: {
          title: dto.title,
          slug: dto.slug,
          excerpt: dto.excerpt,
          ...(categoryIdToUpdate ? { categoryId: categoryIdToUpdate } : {}),
          authorName: dto.authorName,
          authorTitle: dto.authorTitle,
          coverImageUrl: dto.coverImageUrl,
          status: dto.status,
          readingTimeMinutes: dto.readingTimeMinutes,
          publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : undefined,
        },
        include: { category: true },
      });

      const entity: MasterDataNews = {
        id: updated.id,
        title: updated.title,
        slug: updated.slug,
        excerpt: updated.excerpt,
        coverImageUrl: updated.coverImageUrl,
        category: {
          id: updated.categoryId,
          name: updated.category.name,
        },
        categoryName: updated.category.name,
        authorName: updated.authorName,
        authorTitle: updated.authorTitle,
        status: updated.status,
        readingTimeMinutes: updated.readingTimeMinutes,
        pageSlug: "news",
        pageName: "Tin tức & Báo chí",
        reusedPages: ["Trang chủ (props.news.ids)", "Trang Tin tức (/news)"],
        publishedAt: updated.publishedAt?.toISOString() || null,
      };

      const idx = this.inMemoryNews.findIndex((n) => n.id === id);
      if (idx !== -1) this.inMemoryNews[idx] = entity;
      return entity;
    } catch {
      const idx = this.inMemoryNews.findIndex((n) => n.id === id);
      if (idx === -1) return null;
      const prev = this.inMemoryNews[idx];
      this.inMemoryNews[idx] = {
        ...prev,
        ...dto,
        category: {
          id: dto.categoryId ? Number(dto.categoryId) : prev.category.id,
          name: dto.categoryName || prev.category.name,
        },
        categoryName: dto.categoryName || prev.categoryName,
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
  // 4. SPEAKERS / GUESTS CRUD + RESOLVE BY IDS
  // ========================================================
  async getSpeakers(): Promise<MasterDataSpeaker[]> {
    try {
      const items = await prisma.guest.findMany({
        orderBy: { id: "asc" },
      });

      if (items.length > 0) {
        return items.map((s) => ({
          id: String(s.id),
          name: s.name,
          slug: generateSlug(s.name),
          degree: null,
          title: s.title || "",
          organization: s.organization || "",
          avatarUrl:
            s.avatar ||
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80",
          bio: s.quote,
          reusedPages: [
            "Trang Giới thiệu (props.council.ids)",
            "Trang Diễn đàn (props.speakers.ids)",
          ],
        }));
      }
    } catch {
      // Fallback
    }
    return this.inMemorySpeakers;
  }

  async getSpeakersByIds(ids: Array<string | number>): Promise<MasterDataSpeaker[]> {
    if (!ids || ids.length === 0) return [];
    const all = await this.getSpeakers();
    const resolved = this.orderByIds(all, ids);
    return resolved.length > 0 ? resolved : all;
  }

  async getSpeakerById(id: string): Promise<MasterDataSpeaker | null> {
    try {
      const s = await prisma.guest.findUnique({
        where: { id: parseCategoryId(id) },
      });
      if (s) {
        return {
          id: String(s.id),
          name: s.name,
          slug: generateSlug(s.name),
          degree: null,
          title: s.title || "",
          organization: s.organization || "",
          avatarUrl:
            s.avatar ||
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80",
          bio: s.quote,
          reusedPages: ["Trang Giới thiệu", "Trang Diễn đàn (/forum)"],
        };
      }
    } catch {
      // Fallback
    }
    return this.inMemorySpeakers.find((s) => matchesCategoryId(s.id, id) || s.slug === id) || null;
  }

  async createSpeaker(dto: CreateSpeakerDTO): Promise<MasterDataSpeaker> {
    const slug = dto.slug || generateSlug(dto.name);
    const defaultAvatar =
      dto.avatarUrl ||
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80";
    try {
      const created = await prisma.guest.create({
        data: {
          name: dto.name,
          title: dto.title,
          organization: dto.organization,
          avatar: defaultAvatar,
          quote: dto.bio,
        },
      });

      const entity: MasterDataSpeaker = {
        id: String(created.id),
        name: created.name,
        slug,
        degree: dto.degree || null,
        title: created.title || "",
        organization: created.organization || "",
        avatarUrl: created.avatar || defaultAvatar,
        bio: created.quote,
        reusedPages: dto.reusedPages || ["Trang Giới thiệu", "Trang Diễn đàn (/forum)"],
      };
      this.inMemorySpeakers.push(entity);
      return entity;
    } catch {
      const mockEntity: MasterDataSpeaker = {
        id: String(this.inMemorySpeakers.length + 1),
        name: dto.name,
        slug,
        degree: dto.degree,
        title: dto.title,
        organization: dto.organization,
        avatarUrl: defaultAvatar,
        bio: dto.bio,
        reusedPages: dto.reusedPages || ["Trang Giới thiệu", "Trang Diễn đàn (/forum)"],
      };
      this.inMemorySpeakers.push(mockEntity);
      return mockEntity;
    }
  }

  async updateSpeaker(id: string, dto: UpdateSpeakerDTO): Promise<MasterDataSpeaker | null> {
    try {
      const updated = await prisma.guest.update({
        where: { id: parseCategoryId(id) },
        data: {
          name: dto.name,
          title: dto.title,
          organization: dto.organization,
          avatar: dto.avatarUrl,
          quote: dto.bio,
        },
      });

      const entity: MasterDataSpeaker = {
        id: String(updated.id),
        name: updated.name,
        slug: generateSlug(updated.name),
        degree: dto.degree || null,
        title: updated.title || "",
        organization: updated.organization || "",
        avatarUrl:
          updated.avatar ||
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80",
        bio: updated.quote,
        reusedPages: dto.reusedPages || ["Trang Giới thiệu", "Trang Diễn đàn (/forum)"],
      };

      const idx = this.inMemorySpeakers.findIndex((s) => matchesCategoryId(s.id, id));
      if (idx !== -1) this.inMemorySpeakers[idx] = entity;
      return entity;
    } catch {
      const idx = this.inMemorySpeakers.findIndex((s) => matchesCategoryId(s.id, id));
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
      await prisma.guest.delete({ where: { id: parseCategoryId(id) } });
    } catch {
      // In-memory fallback
    }
    const idx = this.inMemorySpeakers.findIndex((s) => matchesCategoryId(s.id, id));
    if (idx !== -1) {
      this.inMemorySpeakers.splice(idx, 1);
      return true;
    }
    return false;
  }

  // ========================================================
  // 5. AWARDS CRUD + RESOLVE BY IDS
  // ========================================================
  async getAwards(): Promise<MasterDataAward[]> {
    try {
      const items = await prisma.award.findMany({
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
          categories: this.inMemoryAwardCategories,
          reusedPages: [
            "Trang chủ (props.showcase.groups.ids)",
            "Trang Giải thưởng (/awards)",
          ],
        }));
      }
    } catch {
      // Fallback
    }
    return this.inMemoryAwards;
  }

  async getAwardCategoriesByIds(ids: Array<string | number>): Promise<MasterDataAwardCategory[]> {
    const allCategories = await this.getAwardCategories();
    if (!ids || ids.length === 0) return allCategories;
    const resolved = this.orderByIds(allCategories, ids);
    return resolved.length > 0 ? resolved : allCategories;
  }

  async getAwardById(id: string): Promise<MasterDataAward | null> {
    try {
      const a = await prisma.award.findUnique({ where: { id } });
      if (a) {
        return {
          id: a.id,
          year: a.year,
          name: a.name,
          theme: a.theme,
          nominationDeadline: a.nominationDeadline.toISOString(),
          isOpen: a.isOpen,
          categories: this.inMemoryAwardCategories,
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
        },
      });

      const createdCategories: MasterDataAwardCategory[] = (dto.categories || []).map(
        (c, i) => ({
          id: String(i + 1),
          name: c.name,
        })
      );

      const entity: MasterDataAward = {
        id: created.id,
        year: created.year,
        name: created.name,
        theme: created.theme,
        nominationDeadline: created.nominationDeadline.toISOString(),
        isOpen: created.isOpen,
        categories: createdCategories.length > 0 ? createdCategories : this.inMemoryAwardCategories,
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
          id: String(i + 1),
          name: c.name,
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
          nominationDeadline: dto.nominationDeadline
            ? new Date(dto.nominationDeadline)
            : undefined,
          isOpen: dto.isOpen,
        },
      });

      const entity: MasterDataAward = {
        id: updated.id,
        year: updated.year,
        name: updated.name,
        theme: updated.theme,
        nominationDeadline: updated.nominationDeadline.toISOString(),
        isOpen: updated.isOpen,
        categories: this.inMemoryAwardCategories,
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
    const [
      projects,
      projectCategories,
      organizations,
      news,
      categories,
      speakers,
      awards,
      awardCategories,
    ] = await Promise.all([
      this.getProjects(),
      this.getProjectCategories(),
      this.getOrganizations(),
      this.getNews(),
      this.getCategories(),
      this.getSpeakers(),
      this.getAwards(),
      this.getAwardCategories(),
    ]);

    return {
      projects,
      projectCategories,
      organizations,
      news,
      categories,
      speakers,
      awards,
      awardCategories,
      stats: {
        totalProjects: projects.length,
        totalOrganizations: organizations.length,
        totalNews: news.length,
        totalSpeakers: speakers.length,
        totalAwardCategories: awardCategories.length,
      },
    };
  }
}

export const masterDataRepository = new MasterDataRepository();
