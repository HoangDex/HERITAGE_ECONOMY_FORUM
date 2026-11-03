"use server";

import { revalidatePath } from "next/cache";
import { createPostSchema, CreatePostInput } from "../schemas/post-schema";
import type { ApiResponse } from "@/types";
import type { Post, Comment } from "../types/post";
import { INITIAL_POSTS } from "@/lib/mock-data";
import { postService } from "@/services";

export async function createPostAction(input: CreatePostInput): Promise<ApiResponse<Post>> {
  const validated = createPostSchema.safeParse(input);
  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues[0]?.message || "Dữ liệu không hợp lệ",
    };
  }

  const slug = input.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  try {
    // Lưu vào MySQL thông qua Prisma PostService nếu có database
    const dbPost = await postService.create({
      title: input.title,
      slug: slug || "thao-luan-moi",
      content: input.content,
      category: input.category,
      tags: input.tags,
      authorId: "usr_curr",
    });

    revalidatePath("/forum");
    revalidatePath("/");

    return {
      success: true,
      data: {
        id: dbPost.id,
        title: dbPost.title,
        slug: dbPost.slug,
        content: dbPost.content,
        category: dbPost.category,
        tags: (dbPost.tags as string[]) || [],
        author: {
          id: dbPost.author.id,
          name: dbPost.author.name,
          organization: dbPost.author.organization || undefined,
          role: dbPost.author.role,
        },
        upvotes: dbPost.upvotesCount,
        commentsCount: dbPost.commentsCount,
        views: dbPost.viewsCount,
        isPinned: dbPost.isPinned,
        createdAt: dbPost.createdAt.toISOString(),
        updatedAt: dbPost.updatedAt.toISOString(),
      },
      message: "Tạo bài thảo luận thành công",
    };
  } catch {
    // Fallback in-memory
    const newPost: Post = {
      id: "post_" + Math.random().toString(36).substring(2, 9),
      title: input.title,
      slug: slug || "thao-luan-moi",
      content: input.content,
      category: input.category,
      tags: input.tags,
      author: {
        id: "usr_curr",
        name: "Thành viên Diễn đàn",
        organization: "Cộng đồng Kinh tế Di sản",
        role: "user",
      },
      upvotes: 1,
      commentsCount: 0,
      views: 1,
      isPinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    INITIAL_POSTS.unshift(newPost);
    revalidatePath("/forum");
    revalidatePath("/");

    return {
      success: true,
      data: newPost,
      message: "Tạo bài thảo luận thành công",
    };
  }
}

export async function upvotePostAction(postId: string): Promise<ApiResponse<number>> {
  const post = INITIAL_POSTS.find((p) => p.id === postId);
  if (!post) {
    return { success: false, error: "Không tìm thấy bài viết" };
  }

  post.upvotes += 1;
  revalidatePath("/forum");
  return { success: true, data: post.upvotes };
}

export async function addCommentAction(
  postId: string,
  content: string
): Promise<ApiResponse<Comment>> {
  if (!content || content.trim().length < 5) {
    return { success: false, error: "Ý kiến bình luận phải có ít nhất 5 ký tự" };
  }

  const newComment: Comment = {
    id: "cmt_" + Math.random().toString(36).substring(2, 9),
    postId,
    content: content.trim(),
    author: {
      id: "usr_guest",
      name: "Thành viên Cộng đồng",
      organization: "Diễn đàn Kinh tế Di sản",
      role: "user",
    },
    createdAt: new Date().toISOString(),
  };

  const post = INITIAL_POSTS.find((p) => p.id === postId);
  if (post) {
    post.commentsCount += 1;
  }

  revalidatePath(`/forum/${postId}`);
  revalidatePath("/forum");

  return {
    success: true,
    data: newComment,
    message: "Bình luận đã được ghi nhận",
  };
}
