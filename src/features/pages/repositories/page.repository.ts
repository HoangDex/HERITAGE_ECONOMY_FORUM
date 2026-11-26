/**
 * LAYER 3: REPOSITORY / DATA ACCESS LAYER (Page & Sections)
 * Thao tác với bảng `pages` qua Prisma 7 Client và quản lý cấu trúc `props` JSON chia theo từng section.
 */

import { prisma } from "@/lib/prisma";
import {
  pagePropsToSections,
  sectionsToPageProps,
  type PageEntity,
  type CreatePageDTO,
  type UpdatePageDTO,
  type IPageRepository,
  type PageSection,
  type PagePropsMap,
  type UniversalSectionProps,
} from "../types/page.types";
import { DEFAULT_HEF_PAGES } from "../data/default-pages.data";

export { DEFAULT_HEF_PAGES };

export class PageRepository implements IPageRepository {
  private inMemoryPages: PageEntity[] = DEFAULT_HEF_PAGES.map((p) => ({
    ...p,
    props: { ...p.props },
    sections: pagePropsToSections(p.props),
  }));

  private normalizeProps(rawProps: unknown, slug: string): PagePropsMap {
    const defaultPage = DEFAULT_HEF_PAGES.find((p) => p.slug === slug);
    const defaultProps = defaultPage?.props || {};

    // Nếu rawProps là object hợp lệ (theo cấu trúc mới: { hero: {...}, pillars: {...}, ... })
    if (rawProps && typeof rawProps === "object" && !Array.isArray(rawProps)) {
      const entries = Object.entries(rawProps as Record<string, unknown>);
      if (entries.length > 0) {
        return rawProps as PagePropsMap;
      }
    }

    // Nếu rawProps trong DB cũ là mảng sections: chuyển đổi sang PagePropsMap
    if (Array.isArray(rawProps) && rawProps.length > 0) {
      return sectionsToPageProps(rawProps as PageSection[]);
    }

    return { ...defaultProps };
  }

  private mapToEntity(item: {
    id: string;
    slug: string;
    name: string;
    props: unknown;
    isPublished: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }): PageEntity {
    const defaultPage = DEFAULT_HEF_PAGES.find((p) => p.slug === item.slug);
    const resolvedProps = this.normalizeProps(item.props, item.slug);
    const resolvedSections = pagePropsToSections(resolvedProps);
    const firstSection = Object.values(resolvedProps)[0];

    return {
      id: item.id,
      slug: item.slug,
      name: item.name,
      props: resolvedProps,
      isPublished: item.isPublished,
      title:
        defaultPage?.title ||
        firstSection?.title ||
        item.name,
      description:
        defaultPage?.description ||
        firstSection?.description ||
        firstSection?.quote,
      seoProps: defaultPage?.seoProps,
      sections: resolvedSections,
      order: defaultPage?.order ?? 1,
      publishedAt: item.createdAt?.toISOString() || defaultPage?.publishedAt,
      createdAt: item.createdAt?.toISOString(),
      updatedAt: item.updatedAt?.toISOString(),
    };
  }

  async findAll(publishedOnly = false): Promise<PageEntity[]> {
    try {
      const pages = await prisma.page.findMany({
        where: publishedOnly ? { isPublished: true } : undefined,
        orderBy: { createdAt: "asc" },
      });
      if (pages.length > 0) {
        return pages
          .map((p) => this.mapToEntity(p))
          .sort((a, b) => a.order - b.order);
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
      const pageBySlug = await prisma.page.findUnique({ where: { slug: id } });
      if (pageBySlug) return this.mapToEntity(pageBySlug);
    } catch {
      // Fallback
    }

    const mock = this.inMemoryPages.find((p) => p.id === id || p.slug === id);
    return mock || null;
  }

  async findBySlug(slug: string): Promise<PageEntity | null> {
    try {
      const page = await prisma.page.findUnique({ where: { slug } });
      if (page) return this.mapToEntity(page);
    } catch {
      // Fallback
    }

    const mock = this.inMemoryPages.find((p) => p.slug === slug || p.id === slug);
    return mock || null;
  }

  async create(data: CreatePageDTO): Promise<PageEntity> {
    const initialProps: PagePropsMap =
      data.props ||
      (data.sections && data.sections.length > 0 ? sectionsToPageProps(data.sections) : {});

    try {
      const page = await prisma.page.create({
        data: {
          slug: data.slug,
          name: data.name,
          props: initialProps as object,
          isPublished: data.isPublished ?? true,
        },
      });
      return this.mapToEntity(page);
    } catch {
      const newMock: PageEntity = {
        id: "page_" + Math.random().toString(36).substring(2, 9),
        slug: data.slug,
        name: data.name,
        props: initialProps,
        title: data.title || data.name,
        description: data.description,
        seoProps: data.seoProps,
        sections: pagePropsToSections(initialProps),
        isPublished: data.isPublished ?? true,
        order: data.order || this.inMemoryPages.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.inMemoryPages.push(newMock);
      return newMock;
    }
  }

  async update(id: string, data: UpdatePageDTO): Promise<PageEntity | null> {
    const existing = await this.findById(id);
    if (!existing) return null;

    const nextProps =
      data.props ??
      (data.sections ? sectionsToPageProps(data.sections) : existing.props);

    try {
      const updated = await prisma.page.update({
        where: { id: existing.id },
        data: {
          name: data.name ?? existing.name,
          props: nextProps as object,
          isPublished: data.isPublished ?? existing.isPublished,
        },
      });
      return this.mapToEntity(updated);
    } catch {
      const idx = this.inMemoryPages.findIndex((p) => p.id === id || p.slug === id);
      if (idx === -1) return null;
      this.inMemoryPages[idx] = {
        ...this.inMemoryPages[idx],
        ...data,
        props: nextProps,
        sections: pagePropsToSections(nextProps),
        updatedAt: new Date().toISOString(),
      };
      return this.inMemoryPages[idx];
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.page.delete({ where: { id } });
      return true;
    } catch {
      const idx = this.inMemoryPages.findIndex((p) => p.id === id || p.slug === id);
      if (idx !== -1) {
        this.inMemoryPages.splice(idx, 1);
        return true;
      }
      return false;
    }
  }

  async getSectionByKey(slug: string, sectionKey: string): Promise<UniversalSectionProps | null> {
    const page = await this.findBySlug(slug);
    if (!page) return null;
    const section = page.props[sectionKey];
    return section || null;
  }

  async updateSectionByKey(
    slug: string,
    sectionKey: string,
    sectionProps: UniversalSectionProps
  ): Promise<PageEntity | null> {
    const page = await this.findBySlug(slug);
    if (!page) return null;

    const currentSection = page.props[sectionKey] || {};
    const mergedProps: PagePropsMap = {
      ...page.props,
      [sectionKey]: {
        ...currentSection,
        ...sectionProps,
      },
    };

    return this.updatePropsBySlug(page.slug, mergedProps);
  }

  async updatePropsBySlug(slug: string, props: PagePropsMap): Promise<PageEntity | null> {
    // Luôn đồng bộ vào in-memory cache để dev/fallback nhận ngay thay đổi
    const memIdx = this.inMemoryPages.findIndex((p) => p.slug === slug || p.id === slug);
    if (memIdx !== -1) {
      this.inMemoryPages[memIdx] = {
        ...this.inMemoryPages[memIdx],
        props,
        sections: pagePropsToSections(props),
        updatedAt: new Date().toISOString(),
      };
    }

    try {
      const updated = await prisma.page.update({
        where: { slug },
        data: {
          props: props as object,
        },
      });
      return this.mapToEntity(updated);
    } catch {
      try {
        const updatedById = await prisma.page.update({
          where: { id: slug },
          data: {
            props: props as object,
          },
        });
        return this.mapToEntity(updatedById);
      } catch {
        return memIdx !== -1 ? this.inMemoryPages[memIdx] : null;
      }
    }
  }

  async updateSections(pageId: string, sections: PageSection[]): Promise<PageEntity | null> {
    const page = await this.findById(pageId);
    if (!page) return null;
    const nextProps = sectionsToPageProps(sections);
    return this.updatePropsBySlug(page.slug, nextProps);
  }

  async updateSectionsBySlug(slug: string, sections: PageSection[]): Promise<PageEntity | null> {
    const nextProps = sectionsToPageProps(sections);
    return this.updatePropsBySlug(slug, nextProps);
  }
}

export const pageRepository = new PageRepository();
