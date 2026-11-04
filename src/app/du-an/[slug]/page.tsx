import { Metadata } from "next";
import { notFound } from "next/navigation";
import { heritageService, HeritageDetail } from "@/features/heritage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await heritageService.getProjectBySlug(slug);
  if (!project) return { title: "Không tìm thấy dự án" };

  return {
    title: `${project.name} | Dự án Kinh tế Di sản`,
    description: project.description,
  };
}

export default async function DuAnDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await heritageService.getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="container mx-auto px-4 sm:px-8 py-10">
      <HeritageDetail project={project} />
    </div>
  );
}
