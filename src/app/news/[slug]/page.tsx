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

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await newsService.getArticle(slug);
  if (!article) notFound();

  const allArticles = await newsService.getAllArticles();
  const currentIndex = allArticles.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  const related = await newsService.getRelatedArticles(article.slug, article.category);

  return (
    <NewsDetailView
      article={article}
      relatedArticles={related}
      allArticles={allArticles}
      prevArticle={prevArticle}
      nextArticle={nextArticle}
    />
  );
}
