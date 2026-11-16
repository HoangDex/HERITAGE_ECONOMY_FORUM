"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Globe, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { BrandLogo } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<"VI" | "EN">("VI");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const isTransparent = isHome && !isScrolled;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isTransparent
          ? "bg-[#F7F5EE]/20 backdrop-blur-xs border-b border-[#E2DDCF]/20 shadow-none"
          : "bg-[#F7F5EE]/95 backdrop-blur-md border-b border-[#E2DDCF] shadow-xs"
      }`}
    >
      <div className="w-full mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 max-w-[1840px] 2xl:max-w-[1920px]">
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
                      ? "text-[#0D4838] border-b-2 border-[#0D4838] font-bold"
                      : "text-[#4A5E57] hover:text-[#0D4838]"
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
            href="/news"
            aria-label="Tìm kiếm bài viết"
            className="p-2 text-[#4A5E57] hover:text-[#0D4838] hover:bg-black/5 rounded-full transition-colors"
          >
            <Search className="w-4 h-4" />
          </Link>

          {/* VI / EN Toggle */}
          <button
            type="button"
            onClick={() => setLang(lang === "VI" ? "EN" : "VI")}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-[#4A5E57] hover:text-[#0D4838] border border-[#E2DDCF] bg-white transition-colors cursor-pointer shadow-2xs"
          >
            <Globe className="w-3.5 h-3.5 text-[#C29B57]" />
            <span>{lang}</span>
          </button>

          {/* CTA Đăng ký tham dự */}
          <Link
            href="/contact?loai=tham-du#contact-form"
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-[#0D4838] hover:bg-[#073327] text-white font-medium shadow-xs text-xs px-4"
            )}
          >
            Đăng ký tham dự
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/news" className="p-2 text-[#4A5E57] hover:text-[#0D4838]">
            <Search className="w-5 h-5" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Mở menu"
            className="p-2 text-[#132A24] hover:text-[#0D4838]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E2DDCF] bg-[#F7F5EE] px-6 py-5 space-y-4 shadow-md animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-sm font-semibold">
            {siteConfig.navItems.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? "bg-[#0D4838] text-white font-bold"
                      : "text-[#132A24] hover:bg-black/5 hover:text-[#0D4838]"
                  }`}
                >
                  <span>{item.title}</span>
                  {isActive && <ArrowRight className="w-4 h-4 text-[#C29B57]" />}
                </Link>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-[#E2DDCF] flex items-center justify-between">
            <button
              type="button"
              onClick={() => setLang(lang === "VI" ? "EN" : "VI")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#132A24] border border-[#E2DDCF] bg-white"
            >
              <Globe className="w-4 h-4 text-[#C29B57]" />
              <span>Ngôn ngữ: {lang === "VI" ? "Tiếng Việt" : "English"}</span>
            </button>
            <Link
              href="/contact?loai=tham-du#contact-form"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(buttonVariants({ size: "sm" }), "bg-[#0D4838] text-white text-xs")}
            >
              Đăng ký ngay
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
