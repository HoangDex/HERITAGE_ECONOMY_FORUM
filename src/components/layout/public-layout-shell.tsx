"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";
import { ScrollProgressBar } from "@/components/animations";

interface PublicLayoutShellProps {
  children: React.ReactNode;
}

/**
 * Shell bọc Layout phân định ranh giới giữa Website công khai và Admin CMS/Auth.
 * Đảm bảo Header và Footer của Website công khai không bao bọc / lồng ghép vào giao diện Admin.
 */
export function PublicLayoutShell({ children }: PublicLayoutShellProps) {
  const pathname = usePathname();

  const isAdminOrAuth =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register");

  if (isAdminOrAuth) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollProgressBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
