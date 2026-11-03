import { prisma } from "@/lib/prisma";

export interface CreatePostData {
  title: string;
  slug: string;
  content: string;
  category: string;
  tags?: string[];
  authorId: string;
}

export interface PostQueryFilters {
  category?: string;
  search?: string;
  limit?: number;
  page?: number;
}

export class PostService {
  async getPosts(filters?: PostQueryFilters) {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (filters?.category && filters.category !== "all") {
      where.category = filters.category;
    }

    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search } },
        { content: { contains: filters.search } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              organization: true,
              avatarUrl: true,
              role: true,
            },
          },
        },
        orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getPostBySlug(slug: string) {
    return prisma.post.findUnique({
      where: { slug },
      include: {
        author: true,
        comments: {
          include: { author: true },
          orderBy: { createdAt: "asc" },
        },
      },
    });
  }

  async create(data: CreatePostData) {
    return prisma.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        category: data.category,
        tags: data.tags || [],
        authorId: data.authorId,
      },
      include: { author: true },
    });
  }

  async upvote(postId: string, userId: string) {
    return prisma.$transaction(async (tx) => {
      const existing = await tx.postUpvote.findUnique({
        where: {
          postId_userId: { postId, userId },
        },
      });

      if (existing) {
        await tx.postUpvote.delete({
          where: { id: existing.id },
        });
        return tx.post.update({
          where: { id: postId },
          data: { upvotesCount: { decrement: 1 } },
        });
      }

      await tx.postUpvote.create({
        data: { postId, userId },
      });
      return tx.post.update({
        where: { id: postId },
        data: { upvotesCount: { increment: 1 } },
      });
    });
  }
}

export const postService = new PostService();
