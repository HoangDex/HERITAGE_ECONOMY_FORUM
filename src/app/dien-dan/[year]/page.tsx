import { Metadata } from "next";
import { notFound } from "next/navigation";
import { forumService, ForumPageView } from "@/features/forum";

interface PageProps {
  params: Promise<{ year: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year } = await params;
  return {
    title: `Kỳ Diễn đàn Kinh tế Di sản ${year} | Heritage Economy Forum`,
    description: `Toàn cảnh chương trình, phiên nghị sự, tham luận và kết quả kỳ Diễn đàn Kinh tế Di sản năm ${year}.`,
  };
}

export default async function DienDanYearPage({ params }: PageProps) {
  const { year } = await params;
  const numYear = parseInt(year, 10);
  if (isNaN(numYear)) notFound();

  const edition = await forumService.getEdition(numYear);
  if (!edition) notFound();

  return <ForumPageView edition={edition} />;
}
