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
import { DEFAULT_HEF_PAGES } from "../data/default-pages.data";

export { DEFAULT_HEF_PAGES };

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
    // Nếu sections trong DB rỗng, fallback về default sections của page đó
    let resolvedSections: PageSection[] = [];
    if (Array.isArray(item.sections) && item.sections.length > 0) {
      resolvedSections = item.sections as PageSection[];
    } else {
      const defaultPage = DEFAULT_HEF_PAGES.find((p) => p.slug === item.slug);
      if (defaultPage?.sections) {
        resolvedSections = defaultPage.sections;
      }
    }

    return {
      id: item.id,
      slug: item.slug,
      name: item.name,
      title: item.title,
      description: item.description || undefined,
      seoProps: (item.seoProps as PageEntity["seoProps"]) || undefined,
      sections: resolvedSections,
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
      const page = this.inMemoryPages.find((p) => p.id === pageId || p.slug === pageId);
      if (!page) return null;
      page.sections = sections;
      return page;
    }
  }

  async updateSectionsBySlug(slug: string, sections: PageSection[]): Promise<PageEntity | null> {
    try {
      const updated = await prisma.page.update({
        where: { slug },
        data: {
          sections: sections as object,
        },
      });
      return this.mapToEntity(updated);
    } catch {
      const page = this.inMemoryPages.find((p) => p.slug === slug);
      if (!page) return null;
      page.sections = sections;
      return page;
    }
  }
}

export const pageRepository = new PageRepository();
