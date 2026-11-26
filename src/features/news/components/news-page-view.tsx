"use client";

import { useState, useEffect, useRef } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FadeIn, InteractiveCard } from "@/components/animations";
import { NewsTopStory } from "./news-top-story";
import { NewsArticleCard } from "./news-article-card";
import type {
  NewsItem,
  NewsPageData,
  NewsFilterCategoryGroup,
  NewsPaginationData,
} from "../types/news.types";

interface NewsPageViewProps {
  data: NewsPageData;
}

const ITEMS_PER_PAGE = 6;

const DEFAULT_FILTER_GROUPS: NewsFilterCategoryGroup[] = [
  {
    title: "Hoạt động & Chính sách",
    ids: [1, 2],
  },
  {
    title: "Mô hình & Thực tiễn",
    ids: [3],
  },
];

interface NewsFilterFeedSectionProps {
  filterCategories: NewsFilterCategoryGroup[];
  initialPagination?: NewsPaginationData;
  fallbackArticles: NewsItem[];
}

/**
 * Khu vực Bộ lọc & Lưới bài viết phân trang độc lập:
 * Khi người dùng bấm nút lọc (theo mảng `ids` của Category) hoặc chuyển trang,
 * chỉ gọi riêng `GET /api/news` và CHỈ render lại đúng khu vực này,
 * giữ nguyên phần Hero và Featured News ở phía trên.
 */
function NewsFilterFeedSection({
  filterCategories,
  initialPagination,
  fallbackArticles,
}: NewsFilterFeedSectionProps) {
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(initialPagination?.page ?? 1);
  const [articles, setArticles] = useState<NewsItem[]>(
    initialPagination?.news ?? fallbackArticles.slice(0, ITEMS_PER_PAGE)
  );
  const [totalItems, setTotalItems] = useState<number>(
    initialPagination?.total ?? fallbackArticles.length
  );
  const [isLoading, setIsLoading] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Lần đầu tiên render đã có sẵn dữ liệu newsPagination từ GET page news, không cần gọi lại API
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    async function fetchFilteredNews() {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(currentPage),
          limit: String(ITEMS_PER_PAGE),
        });

        if (selectedGroupIndex !== null && filterCategories[selectedGroupIndex]) {
          const activeIds = filterCategories[selectedGroupIndex].ids;
          if (activeIds.length > 0) {
            params.set("categoryIds", activeIds.join(","));
          }
        }

        if (searchQuery.trim()) {
          params.set("search", searchQuery.trim());
        }

        const res = await fetch(`/api/news?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch filtered news");
        const json = await res.json();

        if (isMounted && Array.isArray(json.data)) {
          setArticles(json.data);
          setTotalItems(json.meta?.pagination?.total ?? json.data.length);
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        const activeIds =
          selectedGroupIndex !== null && filterCategories[selectedGroupIndex]
            ? filterCategories[selectedGroupIndex].ids
            : [];
        const filtered = fallbackArticles.filter((article) => {
          const matchesCategory =
            activeIds.length === 0 || activeIds.includes(Number(article.categoryId));
          const matchesSearch =
            searchQuery === "" ||
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.sapo.toLowerCase().includes(searchQuery.toLowerCase());
          return matchesCategory && matchesSearch;
        });
        if (isMounted) {
          const start = (currentPage - 1) * ITEMS_PER_PAGE;
          setArticles(filtered.slice(start, start + ITEMS_PER_PAGE));
          setTotalItems(filtered.length);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchFilteredNews();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [currentPage, selectedGroupIndex, searchQuery, filterCategories, fallbackArticles]);

  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  return (
    <div className="pt-6 border-t border-[#DFD8C8] space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Filter Buttons (từ props.filter.categories, mỗi nút chứa 1 hoặc nhiều Category ID) */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
          <button
            type="button"
            onClick={() => {
              setSelectedGroupIndex(null);
              setCurrentPage(1);
            }}
            className={`px-3.5 py-1.5 rounded-xs text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
              selectedGroupIndex === null
                ? "bg-[#0D4838] text-white"
                : "bg-white text-[#5A6B63] border border-[#DFD8C8] hover:border-[#0D4838]"
            }`}
          >
            Tất cả chuyên mục
          </button>
          {filterCategories.map((group, idx) => (
            <button
              key={`${group.title}-${group.ids.join("-")}`}
              type="button"
              onClick={() => {
                setSelectedGroupIndex(idx);
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-xs text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                selectedGroupIndex === idx
                  ? "bg-[#0D4838] text-white"
                  : "bg-white text-[#5A6B63] border border-[#DFD8C8] hover:border-[#0D4838]"
              }`}
            >
              {group.title}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72 shrink-0">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#5A6B63]" />
          <Input
            placeholder="Tìm kiếm bài viết..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9 bg-white border-[#DFD8C8] rounded-xs text-xs h-9"
          />
        </div>
      </div>

      {/* 3-Column Articles Grid */}
      {articles.length > 0 ? (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2 ${
            isLoading ? "opacity-60 transition-opacity" : "opacity-100 transition-opacity"
          }`}
        >
          {articles.map((article) => (
            <div key={article.id} className="h-full">
              <InteractiveCard className="h-full">
                <NewsArticleCard article={article} />
              </InteractiveCard>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-xs border border-[#DFD8C8] text-[#5A6B63] text-sm">
          Không tìm thấy bài viết nào phù hợp với từ khóa hoặc chuyên mục đã chọn.
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 border-t border-[#DFD8C8]">
          <span className="text-xs text-[#5A6B63]">
            Trang <strong className="text-[#132A24]">{currentPage}</strong> / {totalPages} (Tổng{" "}
            {totalItems} bài viết)
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold border border-[#DFD8C8] bg-white text-[#132A24] hover:border-[#0D4838] disabled:opacity-40 cursor-pointer rounded-xs"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Trước
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold border border-[#DFD8C8] bg-white text-[#132A24] hover:border-[#0D4838] disabled:opacity-40 cursor-pointer rounded-xs"
            >
              Sau
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function NewsPageView({ data: initialData }: NewsPageViewProps) {
  const [hero, setHero] = useState(
    initialData.hero ?? {
      badge: "Trung Tâm Tri Thức & Truyền Thông",
      title: "Tin Tức, Nghiên Cứu & Góc Nhìn Chuyên Gia",
      description:
        "Cập nhật hoạt động, nghiên cứu, quan điểm chuyên gia và những mô hình thực tiễn góp phần làm rõ vai trò của di sản trong phát triển kinh tế, văn hóa và xã hội.",
    }
  );
  const [filterCategories, setFilterCategories] = useState<NewsFilterCategoryGroup[]>(
    initialData.filterCategories && initialData.filterCategories.length > 0
      ? initialData.filterCategories
      : DEFAULT_FILTER_GROUPS
  );
  const [featuredArticle, setFeaturedArticle] = useState<NewsItem>(initialData.featuredArticle);
  const [newsPagination, setNewsPagination] = useState<NewsPaginationData | undefined>(
    initialData.newsPagination
  );

  // Đồng bộ trực tiếp dữ liệu từ API GET /api/pages/news
  useEffect(() => {
    let isMounted = true;
    async function fetchNewsPageApi() {
      try {
        const res = await fetch("/api/pages/news");
        if (!res.ok) return;
        const json = await res.json();
        const pageData = json?.data;
        if (!isMounted || !pageData) return;

        const props = pageData.props || {};
        if (props.hero) {
          setHero((prev) => ({
            badge: props.hero.badge ?? prev.badge,
            title: props.hero.title || prev.title,
            description: props.hero.description || prev.description,
          }));
        }
        if (Array.isArray(props.filter?.categories) && props.filter.categories.length > 0) {
          setFilterCategories(props.filter.categories);
        }
        if (pageData.newsPagination) {
          setNewsPagination(pageData.newsPagination);
          const featuredId =
            typeof props.featured_news === "string"
              ? props.featured_news
              : props.featured_news?.id;
          if (featuredId && Array.isArray(pageData.newsPagination.news)) {
            const matched = pageData.newsPagination.news.find(
              (n: NewsItem) =>
                n.id === featuredId ||
                n.slug === featuredId ||
                (featuredId === "news_1" && n.id === "news_feat_1")
            );
            if (matched) setFeaturedArticle(matched);
          }
        }
      } catch {
        // Giữ nguyên dữ liệu SSR nếu lỗi mạng
      }
    }
    fetchNewsPageApi();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="py-10 sm:py-14 space-y-12">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl space-y-8">
        {/* Header Section (từ props.hero) */}
        <FadeIn direction="up" className="space-y-3 border-b-2 border-[#0D4838] pb-6">
          {hero.badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs text-xs font-bold uppercase tracking-widest bg-[#0D4838] text-white">
              {hero.badge}
            </div>
          )}
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#132A24] tracking-tight">
            {hero.title}
          </h1>
          <p className="text-[#5A6B63] max-w-3xl text-base sm:text-lg">{hero.description}</p>
        </FadeIn>

        {/* Top Story Section (1 bài từ props.featured_news + 4 bài mới nhất) */}
        <NewsTopStory featured={featuredArticle} topSide={initialData.topSideArticles} />

        {/* Khu vực Filter & Danh sách bài viết phân trang độc lập (chỉ re-render vùng này khi lọc) */}
        <NewsFilterFeedSection
          filterCategories={filterCategories}
          initialPagination={newsPagination}
          fallbackArticles={initialData.latestArticles}
        />
      </div>
    </div>
  );
}
