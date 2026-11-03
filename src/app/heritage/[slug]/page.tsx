import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { heritageService, HeritageDetail } from "@/features/heritage";

interface HeritageDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: HeritageDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await heritageService.getProjectBySlug(slug);

  if (!project) {
    return { title: "Dự án không tồn tại" };
  }

  return {
    title: `${project.name} | Mô hình Kinh tế Di sản`,
    description: project.description.slice(0, 160),
  };
}

export default async function HeritageDetailPage({ params }: HeritageDetailPageProps) {
  const { slug } = await params;
  const project = await heritageService.getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-10">
      <HeritageDetail project={project} />
    </div>
  );
}
