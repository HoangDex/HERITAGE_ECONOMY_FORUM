import Link from "next/link";
import { Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-xs supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              <Landmark className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-sm sm:text-base leading-none">
                {siteConfig.name}
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight hidden sm:inline">
                {siteConfig.vietnameseName}
              </span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Đăng nhập
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Tham gia Diễn đàn</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
