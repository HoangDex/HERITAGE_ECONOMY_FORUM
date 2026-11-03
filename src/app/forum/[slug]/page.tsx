import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building, Calendar, Pin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { INITIAL_POSTS } from "@/lib/mock-data";
import { postService } from "@/services";
import { CommentSection } from "@/features/forum";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  // 1. Thử lấy từ Prisma MySQL Service
  try {
    const post = await postService.getPostBySlug(slug);
    if (post) {
      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        content: post.content,
        category: post.category,
        tags: (post.tags as string[]) || [],
        author: {
          id: post.author.id,
          name: post.author.name,
          organization: post.author.organization || undefined,
          role: post.author.role,
        },
        upvotes: post.upvotesCount,
        commentsCount: post.commentsCount,
        views: post.viewsCount,
        isPinned: post.isPinned,
        createdAt: post.createdAt.toISOString(),
        comments: post.comments.map((c) => ({
          id: c.id,
          postId: c.postId,
          content: c.content,
          author: {
            id: c.author.id,
            name: c.author.name,
            organization: c.author.organization || undefined,
            role: c.author.role,
          },
          createdAt: c.createdAt.toISOString(),
        })),
      };
    }
  } catch {
    // Fallback sang mock
  }

  // 2. Fallback sang mock data
  const mockPost = INITIAL_POSTS.find((p) => p.slug === slug || p.id === slug);
  if (!mockPost) return null;

  return {
    ...mockPost,
    comments: [
      {
        id: "mock_c1",
        postId: mockPost.id,
        author: {
          id: "usr_exp",
          name: "Nguyễn Thu Trang",
          organization: "Viện Nghiên cứu Quản lý Kinh tế",
        },
        content:
          "Chúng tôi rất hoan nghênh đề xuất này và sẽ lồng ghép vào nội dung hội thảo sắp tới.",
        createdAt: "2026-11-01T12:00:00.000Z",
      },
    ],
  };
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Không tìm thấy bài viết" };
  }

  return {
    title: `${post.title} | Diễn đàn`,
    description: post.content.slice(0, 160),
  };
}

export default async function ForumPostDetailPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-10 max-w-4xl space-y-6">
      {/* Navigation Back */}
      <Link href="/forum">
        <Button variant="ghost" size="sm" className="gap-2 pl-0 hover:bg-transparent">
          <ArrowLeft className="w-4 h-4" /> Quay lại Diễn đàn
        </Button>
      </Link>

      {/* Main Post Header */}
      <article className="space-y-6 bg-card border rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            {post.isPinned && (
              <Badge variant="secondary" className="gap-1 bg-amber-100 text-amber-800">
                <Pin className="w-3 h-3" /> Ghim thảo luận
              </Badge>
            )}
            <Badge variant="outline">{post.category}</Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.createdAt).toLocaleDateString("vi-VN")}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
            {post.title}
          </h1>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-3 py-3 border-y border-border/60">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <div className="text-sm font-semibold">{post.author.name}</div>
            {post.author.organization && (
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Building className="w-3 h-3" /> {post.author.organization}
              </div>
            )}
          </div>
        </div>

        {/* Post Content */}
        <div className="prose prose-neutral max-w-none text-foreground/90 leading-relaxed space-y-4">
          <p className="whitespace-pre-line text-base">{post.content}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-4 border-t">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      </article>

      {/* Interactive Comment Section */}
      <CommentSection postId={post.id} initialComments={post.comments} />
    </div>
  );
}
