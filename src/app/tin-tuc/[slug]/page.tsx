import { Metadata } from "next";
import { notFound } from "next/navigation";
import { newsService, NewsDetailView } from "@/features/news";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await newsService.getArticle(slug);
  if (!article) return { title: "Không tìm thấy bài viết" };

  return {
    title: `${article.title} | Heritage Economy Forum`,
    description: article.sapo,
    openGraph: {
      title: article.title,
      description: article.sapo,
      images: [article.coverImage],
    },
  };
}

export default async function TinTucDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await newsService.getArticle(slug);
  if (!article) notFound();

  const related = await newsService.getRelatedArticles(article.slug, article.category);

  return <NewsDetailView article={article} relatedArticles={related} />;
}
