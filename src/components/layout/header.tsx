"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/icons";
import { siteConfig } from "@/config/site";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<"VI" | "EN">("VI");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#dfd7c8] bg-[#F5EFE5]/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8 max-w-7xl">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <BrandLogo size="md" />
          </Link>

          {/* Desktop 7 Menus */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold uppercase tracking-wider">
            {siteConfig.navItems.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors py-1 ${
                    isActive
                      ? "text-[#76232D] border-b-2 border-[#76232D]"
                      : "text-[#5c554b] hover:text-[#76232D]"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right tools (Search, VI/EN, Đăng ký tham dự) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Search Trigger */}
          <Link
            href="/tin-tuc"
            aria-label="Tìm kiếm bài viết"
            className="p-2 text-[#5c554b] hover:text-[#76232D] hover:bg-black/5 rounded-full transition-colors"
          >
            <Search className="w-4 h-4" />
          </Link>

          {/* VI / EN Toggle */}
          <button
            onClick={() => setLang(lang === "VI" ? "EN" : "VI")}
            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold text-[#5c554b] hover:text-[#76232D] border border-[#dfd7c8] bg-white transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#C29B57]" />
            <span>{lang}</span>
          </button>

          {/* CTA Đăng ký tham dự */}
          <Link href="/lien-he?loai=tham-du">
            <Button
              size="sm"
              className="bg-[#76232D] hover:bg-[#76232D]/90 text-white font-medium shadow-xs text-xs"
            >
              Đăng ký tham dự
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/tin-tuc" className="p-2 text-[#5c554b] hover:text-[#76232D]">
            <Search className="w-5 h-5" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Mở menu"
            className="p-2 text-[#292929] hover:text-[#76232D]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#dfd7c8] bg-[#F5EFE5] px-6 py-5 space-y-4 shadow-md animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-sm font-semibold">
            {siteConfig.navItems.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-1.5 transition-colors ${
                    isActive ? "text-[#76232D] font-bold" : "text-[#5c554b]"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[#dfd7c8] flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#5c554b]">Ngôn ngữ:</span>
              <button
                onClick={() => setLang(lang === "VI" ? "EN" : "VI")}
                className="inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-bold bg-white border border-[#dfd7c8] text-[#76232D]"
              >
                <Globe className="w-3.5 h-3.5 text-[#C29B57]" />
                {lang === "VI" ? "Tiếng Việt (VI)" : "English (EN)"}
              </button>
            </div>

            <Link href="/lien-he?loai=tham-du" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-[#76232D] hover:bg-[#76232D]/90 text-white font-medium justify-center gap-2">
                Đăng ký tham dự Diễn đàn
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
