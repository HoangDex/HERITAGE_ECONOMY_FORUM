/**
 * LAYER 6A: CLIENT REACT HOOK LAYER
 * Cung cấp state management và data-fetching client-side chuẩn React 19
 */

"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import type { HeritageProject, HeritageFilterDTO } from "../types/heritage.types";
import { createHeritageProjectAction } from "../actions/heritage.actions";
import type { CreateHeritageInput } from "../schemas/heritage.schema";

export function useHeritageProjects(initialFilters?: HeritageFilterDTO) {
  const [projects, setProjects] = useState<HeritageProject[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const location = initialFilters?.location;
  const category = initialFilters?.category;
  const search = initialFilters?.search;

  const fetchProjects = useCallback(() => {
    startTransition(async () => {
      setError(null);
      try {
        const params = new URLSearchParams();
        if (location) params.append("location", location);
        if (category) params.append("category", category);
        if (search) params.append("search", search);

        const res = await fetch(`/api/heritage?${params.toString()}`);
        if (!res.ok) throw new Error("Không thể tải danh sách dự án");

        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setProjects(json.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra");
      }
    });
  }, [location, category, search]);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const params = new URLSearchParams();
        if (location) params.append("location", location);
        if (category) params.append("category", category);
        if (search) params.append("search", search);

        const res = await fetch(`/api/heritage?${params.toString()}`);
        if (!res.ok) return;
        const json = await res.json();
        if (!ignore && json.success && Array.isArray(json.data)) {
          setProjects(json.data);
        }
      } catch {
        // Ignored
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [location, category, search]);

  const createProject = async (input: CreateHeritageInput) => {
    const res = await createHeritageProjectAction(input);
    if (res.success && res.data) {
      setProjects((prev) => [res.data!, ...prev]);
    }
    return res;
  };

  return {
    projects,
    isLoading: isPending,
    error,
    refetch: fetchProjects,
    createProject,
  };
}
