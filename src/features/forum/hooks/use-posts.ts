"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import type { Post } from "../types/post";

interface UsePostsOptions {
  category?: string;
  search?: string;
  initialPosts?: Post[];
}

export function usePosts(options?: UsePostsOptions) {
  const [posts, setPosts] = useState<Post[]>(options?.initialPosts || []);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const category = options?.category;
  const search = options?.search;

  const fetchPosts = useCallback(() => {
    startTransition(async () => {
      setError(null);
      try {
        const params = new URLSearchParams();
        if (category && category !== "all") {
          params.append("category", category);
        }
        if (search) {
          params.append("search", search);
        }

        const res = await fetch(`/api/forum/posts?${params.toString()}`);
        if (!res.ok) {
          throw new Error("Không thể tải danh sách bài thảo luận");
        }

        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setPosts(json.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra");
      }
    });
  }, [category, search]);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const params = new URLSearchParams();
        if (category && category !== "all") {
          params.append("category", category);
        }
        if (search) {
          params.append("search", search);
        }

        const res = await fetch(`/api/forum/posts?${params.toString()}`);
        if (!res.ok) throw new Error("Không thể tải danh sách bài thảo luận");
        const json = await res.json();
        if (!ignore && json.success && Array.isArray(json.data)) {
          setPosts(json.data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra");
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [category, search]);

  return {
    posts,
    isLoading: isPending,
    error,
    refetch: fetchPosts,
  };
}
