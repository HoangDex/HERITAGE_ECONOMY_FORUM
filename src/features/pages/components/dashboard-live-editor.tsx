"use client";

import React from "react";
import type { PageEntity } from "../types/page.types";
import { PageContentEditor } from "./page-content-editor";

interface DashboardLiveEditorProps {
  initialPage: PageEntity;
}

/**
 * DashboardLiveEditor
 * Bộ soạn thảo trang chủ & dashboard trực quan cho quản trị viên HEF CMS.
 * Tái sử dụng PageContentEditor thống nhất với Section Dashboard Nav Bar.
 */
export function DashboardLiveEditor({ initialPage }: DashboardLiveEditorProps) {
  return <PageContentEditor initialPage={initialPage} />;
}
