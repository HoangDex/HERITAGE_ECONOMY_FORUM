import { INITIAL_POSTS } from "@/lib/mock-data";
import type { Post } from "@/features/forum/types/post";

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

/**
 * Service in-memory cho các mock posts thảo luận cũ
 * Hệ thống đã chuyển đổi sang mô hình 1 Admin duy nhất và không có client user.
 */
export class PostService {
  private posts: Post[] = [...INITIAL_POSTS];

  async getPosts(filters?: PostQueryFilters) {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const skip = (page - 1) * limit;

    let filtered = [...this.posts];

    if (filters?.category && filters.category !== "all") {
      filtered = filtered.filter((p) => p.category.toLowerCase() === filters.category?.toLowerCase());
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q)
      );
    }

    const items = filtered.slice(skip, skip + limit);

    return {
      items,
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    };
  }

  async getPostBySlug(slug: string) {
    return this.posts.find((p) => p.slug === slug) || null;
  }

  async create(data: CreatePostData): Promise<Post> {
    const now = new Date().toISOString();
    const newPost: Post = {
      id: `post_${Date.now()}`,
      title: data.title,
      slug: data.slug,
      content: data.content,
      category: data.category,
      tags: data.tags || [],
      author: {
        id: data.authorId,
        name: "Admin Quản Trị",
        role: "ADMIN",
        organization: "Ban Quản trị HEF",
      },
      upvotes: 0,
      commentsCount: 0,
      views: 1,
      createdAt: now,
      updatedAt: now,
    };
    this.posts.unshift(newPost);
    return newPost;
  }

  async upvote(postId: string, _userId: string) {
    const post = this.posts.find((p) => p.id === postId);
    if (post) {
      post.upvotes += 1;
    }
    return post;
  }
}

export const postService = new PostService();
