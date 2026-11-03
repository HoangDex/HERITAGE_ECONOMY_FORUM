/**
 * LAYER 3: REPOSITORY / DATA ACCESS LAYER
 * Giao tiếp trực tiếp với cơ sở dữ liệu MySQL qua Prisma 7 Client.
 * Tách biệt hoàn toàn tầng lưu trữ khỏi Business Logic.
 */

import { prisma } from "@/lib/prisma";
import { INITIAL_HERITAGE_PROJECTS } from "@/lib/mock-data";
import type {
  HeritageProject,
  CreateHeritageDTO,
  UpdateHeritageDTO,
  HeritageFilterDTO,
  IHeritageRepository,
  ProjectStatus,
} from "../types/heritage.types";

export class HeritageRepository implements IHeritageRepository {
  /**
   * Helper chuyển đổi DB Model sang Domain Entity
   */
  private mapToEntity(item: {
    id: string;
    name: string;
    slug: string;
    location: string;
    category: string;
    status: string;
    description: string;
    highlights: unknown;
    annualRevenue: string | null;
    jobsCreated: number;
    conservationFundShare: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }): HeritageProject {
    return {
      id: item.id,
      name: item.name,
      slug: item.slug,
      location: item.location,
      category: item.category,
      status: (item.status as ProjectStatus) || "Đang vận hành",
      description: item.description,
      highlights: Array.isArray(item.highlights) ? (item.highlights as string[]) : [],
      economicMetrics: {
        annualRevenue: item.annualRevenue || "Đang cập nhật",
        jobsCreated: item.jobsCreated || 0,
        conservationFundShare: item.conservationFundShare || "0%",
      },
      createdAt: item.createdAt?.toISOString(),
      updatedAt: item.updatedAt?.toISOString(),
    };
  }

  async findAll(filters?: HeritageFilterDTO): Promise<HeritageProject[]> {
    try {
      const where: Record<string, unknown> = {};

      if (filters?.location) {
        where.location = { contains: filters.location };
      }
      if (filters?.category) {
        where.category = filters.category;
      }
      if (filters?.status) {
        where.status = filters.status;
      }
      if (filters?.search) {
        where.OR = [
          { name: { contains: filters.search } },
          { description: { contains: filters.search } },
        ];
      }

      const projects = await prisma.heritageProject.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });

      if (projects.length > 0) {
        return projects.map((p) => this.mapToEntity(p));
      }
    } catch {
      // Fallback sang in-memory mock data nếu chưa kết nối MySQL
    }

    // Fallback: Lọc từ mock data
    let result = INITIAL_HERITAGE_PROJECTS.map((item) => ({
      ...item,
      slug: item.slug || item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    }));

    if (filters?.location) {
      result = result.filter((p) =>
        p.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    if (filters?.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters?.search) {
      const s = filters.search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s)
      );
    }

    return result;
  }

  async findById(id: string): Promise<HeritageProject | null> {
    try {
      const project = await prisma.heritageProject.findUnique({
        where: { id },
      });
      if (project) return this.mapToEntity(project);
    } catch {
      // Fallback
    }

    const mock = INITIAL_HERITAGE_PROJECTS.find((p) => p.id === id);
    if (!mock) return null;
    return {
      ...mock,
      slug: mock.slug || mock.id,
    };
  }

  async findBySlug(slug: string): Promise<HeritageProject | null> {
    try {
      const project = await prisma.heritageProject.findUnique({
        where: { slug },
      });
      if (project) return this.mapToEntity(project);
    } catch {
      // Fallback
    }

    const mock = INITIAL_HERITAGE_PROJECTS.find((p) => p.slug === slug || p.id === slug);
    if (!mock) return null;
    return {
      ...mock,
      slug: mock.slug || mock.id,
    };
  }

  async create(data: CreateHeritageDTO & { slug: string }): Promise<HeritageProject> {
    try {
      const project = await prisma.heritageProject.create({
        data: {
          name: data.name,
          slug: data.slug,
          location: data.location,
          category: data.category,
          status: data.status || "Đang vận hành",
          description: data.description,
          highlights: data.highlights,
          annualRevenue: data.annualRevenue,
          jobsCreated: data.jobsCreated,
          conservationFundShare: data.conservationFundShare,
        },
      });
      return this.mapToEntity(project);
    } catch {
      // Fallback: ghi vào bộ nhớ tạm
      const newMock: HeritageProject = {
        id: "her_" + Math.random().toString(36).substring(2, 9),
        name: data.name,
        slug: data.slug,
        location: data.location,
        category: data.category,
        status: data.status || "Đang vận hành",
        description: data.description,
        highlights: data.highlights,
        economicMetrics: {
          annualRevenue: data.annualRevenue,
          jobsCreated: data.jobsCreated,
          conservationFundShare: data.conservationFundShare,
        },
        createdAt: new Date().toISOString(),
      };
      INITIAL_HERITAGE_PROJECTS.unshift(newMock);
      return newMock;
    }
  }

  async update(id: string, data: UpdateHeritageDTO): Promise<HeritageProject | null> {
    try {
      const updated = await prisma.heritageProject.update({
        where: { id },
        data: {
          name: data.name,
          location: data.location,
          category: data.category,
          status: data.status,
          description: data.description,
          highlights: data.highlights,
          annualRevenue: data.annualRevenue,
          jobsCreated: data.jobsCreated,
          conservationFundShare: data.conservationFundShare,
        },
      });
      return this.mapToEntity(updated);
    } catch {
      const idx = INITIAL_HERITAGE_PROJECTS.findIndex((p) => p.id === id);
      if (idx === -1) return null;
      INITIAL_HERITAGE_PROJECTS[idx] = {
        ...INITIAL_HERITAGE_PROJECTS[idx],
        ...data,
        economicMetrics: {
          annualRevenue:
            data.annualRevenue || INITIAL_HERITAGE_PROJECTS[idx].economicMetrics.annualRevenue,
          jobsCreated:
            data.jobsCreated ?? INITIAL_HERITAGE_PROJECTS[idx].economicMetrics.jobsCreated,
          conservationFundShare:
            data.conservationFundShare ||
            INITIAL_HERITAGE_PROJECTS[idx].economicMetrics.conservationFundShare,
        },
      };
      return INITIAL_HERITAGE_PROJECTS[idx];
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.heritageProject.delete({ where: { id } });
      return true;
    } catch {
      const idx = INITIAL_HERITAGE_PROJECTS.findIndex((p) => p.id === id);
      if (idx !== -1) {
        INITIAL_HERITAGE_PROJECTS.splice(idx, 1);
        return true;
      }
      return false;
    }
  }

  async getMetricsAggregate(): Promise<{ totalProjects: number; totalJobs: number }> {
    try {
      const [count, agg] = await Promise.all([
        prisma.heritageProject.count(),
        prisma.heritageProject.aggregate({
          _sum: { jobsCreated: true },
        }),
      ]);
      return {
        totalProjects: count,
        totalJobs: agg._sum.jobsCreated || 0,
      };
    } catch {
      return {
        totalProjects: INITIAL_HERITAGE_PROJECTS.length,
        totalJobs: INITIAL_HERITAGE_PROJECTS.reduce(
          (acc, p) => acc + p.economicMetrics.jobsCreated,
          0
        ),
      };
    }
  }
}

export const heritageRepository = new HeritageRepository();
