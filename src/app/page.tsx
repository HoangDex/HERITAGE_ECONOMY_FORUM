import Link from "next/link";
import { ArrowRight, MessageSquare, Landmark, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/common/section-heading";
import { EconomicStats } from "@/features/heritage";
import { INITIAL_POSTS, INITIAL_HERITAGE_PROJECTS } from "@/lib/mock-data";
import { PostCard } from "@/features/forum";
import { HeritageCard } from "@/features/heritage";

export default function HomePage() {
  const featuredPosts = INITIAL_POSTS.slice(0, 2);
  const featuredProjects = INITIAL_HERITAGE_PROJECTS.slice(0, 3);

  return (
    <div className="flex flex-col gap-16 py-10 container mx-auto px-4 sm:px-8">
      {/* Hero Section */}
      <section className="relative rounded-3xl bg-linear-to-b from-muted/60 via-muted/20 to-transparent p-8 sm:p-14 border border-border/60 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-background/80 text-xs font-medium text-foreground mb-6 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Kiến tạo Giá trị Kinh tế từ Di sản Văn hóa Việt Nam</span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight">
          Bảo tồn để Phát triển, <br className="hidden sm:inline" />
          <span className="text-primary">Kinh tế hóa Di sản Bền vững</span>
        </h1>
        <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl">
          Nơi hội tụ của các nhà hoạch định chính sách, chuyên gia di sản, nhà đầu tư và doanh nhân
          cùng đối thoại và hiện thực hóa các mô hình kinh tế di sản sáng tạo.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/forum">
            <Button size="lg" className="gap-2 shadow-sm">
              <MessageSquare className="w-4 h-4" />
              Tham gia Thảo luận
            </Button>
          </Link>
          <Link href="/heritage">
            <Button size="lg" variant="outline" className="gap-2">
              <Landmark className="w-4 h-4" />
              Khám phá Mô hình Di sản
            </Button>
          </Link>
        </div>
      </section>

      {/* Economic Metrics Section */}
      <section className="space-y-6">
        <SectionHeading
          badge="Chỉ số tác động"
          title="Bức tranh Kinh tế Di sản"
          description="Dữ liệu tổng quan về hiệu quả kinh tế và việc làm từ các mô hình bảo tồn thích ứng."
        />
        <EconomicStats />
      </section>

      {/* Featured Discussions */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <SectionHeading
            badge="Diễn đàn"
            title="Phiên thảo luận Tiêu biểu"
            description="Các chủ đề chính sách, công nghệ và huy động vốn được quan tâm nhất."
          />
          <Link
            href="/forum"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="sm:hidden text-center pt-2">
          <Link href="/forum">
            <Button variant="outline" className="w-full gap-2">
              Xem tất cả chủ đề thảo luận <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Heritage Projects */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <SectionHeading
            badge="Mô hình thực tế"
            title="Dự án Di sản & Kinh tế Điển hình"
            description="Những sáng kiến dung hòa giữa giữ gìn bản sắc và tạo sinh kế cộng đồng."
          />
          <Link
            href="/heritage"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Xem danh mục <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <HeritageCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
