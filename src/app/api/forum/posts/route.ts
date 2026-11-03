import { NextResponse } from "next/server";
import { INITIAL_POSTS } from "@/lib/mock-data";
import { createPostSchema } from "@/features/forum/schemas/post-schema";
import { postService } from "@/services";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;

  try {
    // Thử truy vấn từ Prisma Service (MySQL)
    const result = await postService.getPosts({ category, search });
    if (result.items.length > 0) {
      return NextResponse.json({
        success: true,
        data: result.items,
        total: result.total,
      });
    }
  } catch {
    // Fallback sang mock data nếu database chưa kết nối
  }

  let filtered = [...INITIAL_POSTS];

  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.content.toLowerCase().includes(s) ||
        p.tags.some((t) => t.toLowerCase().includes(s))
    );
  }

  return NextResponse.json({
    success: true,
    data: filtered,
    total: filtered.length,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = createPostSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          error: validated.error.issues[0]?.message || "Dữ liệu không hợp lệ",
        },
        { status: 400 }
      );
    }

    const { title, content, category, tags } = validated.data;
    const slug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const newPost = {
      id: "post_" + Math.random().toString(36).substring(2, 9),
      title,
      slug: slug || "thao-luan-moi",
      content,
      category,
      tags,
      author: {
        id: "usr_api",
        name: "Người dùng Khách",
        organization: "Cộng đồng Kinh tế Di sản",
        role: "user",
      },
      upvotes: 0,
      commentsCount: 0,
      views: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    INITIAL_POSTS.unshift(newPost);

    return NextResponse.json(
      {
        success: true,
        data: newPost,
        message: "Tạo bài viết thành công",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Lỗi máy chủ",
      },
      { status: 500 }
    );
  }
}
