import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { forumService, ForumPageView } from "@/features/forum";

interface ForumPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ForumPageProps): Promise<Metadata> {
  const { slug } = await params;

  // 1. Hỗ trợ theo năm (ví dụ /forum/2026)
  const numYear = parseInt(slug, 10);
  if (!isNaN(numYear) && numYear >= 2000 && numYear <= 2100) {
    const edition = await forumService.getEdition(numYear);
    if (edition) {
      return {
        title: `Kỳ Diễn đàn Kinh tế Di sản ${numYear} | Heritage Economy Forum`,
        description: `Toàn cảnh chương trình, 04 phiên nghị sự, tham luận và kết quả kỳ Diễn đàn Kinh tế Di sản năm ${numYear}.`,
      };
    }
  }

  // 2. Tìm theo danh sách tất cả các kỳ
  const allEditions = await forumService.getAllEditions();
  const matched = allEditions.find(
    (e) => e.year.toString() === slug || e.title.toLowerCase().includes(slug.toLowerCase())
  );
  if (matched) {
    return {
      title: `${matched.title} | Heritage Economy Forum`,
      description: matched.theme,
    };
  }

  return { title: "Không tìm thấy kỳ diễn đàn | HEF" };
}

export default async function ForumEditionPage({ params }: ForumPageProps) {
  const { slug } = await params;

  // 1. Hỗ trợ tìm theo năm (ví dụ /forum/2026)
  const numYear = parseInt(slug, 10);
  if (!isNaN(numYear) && numYear >= 2000 && numYear <= 2100) {
    const edition = await forumService.getEdition(numYear);
    if (edition) {
      return <ForumPageView edition={edition} />;
    }
  }

  // 2. Hỗ trợ tìm trong danh sách kỳ diễn đàn
  const allEditions = await forumService.getAllEditions();
  const matched = allEditions.find(
    (e) => e.year.toString() === slug || e.title.toLowerCase().includes(slug.toLowerCase())
  );
  if (matched) {
    return <ForumPageView edition={matched} />;
  }

  notFound();
}
