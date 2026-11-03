import Link from "next/link";
import { Landmark } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                <Landmark className="h-4 w-4" />
              </div>
              <span className="font-bold">{siteConfig.name}</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">{siteConfig.description}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Liên kết nhanh</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {siteConfig.navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Chủ đề nổi bật</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Chính sách PPP trong bảo tồn</li>
              <li>Số hóa di sản & Kinh tế đêm</li>
              <li>Thương mại hóa thủ công mỹ nghệ</li>
              <li>Tín chỉ carbon & Di sản sinh thái</li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Bảo lưu mọi quyền.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:underline">
              Điều khoản
            </Link>
            <Link href="#" className="hover:underline">
              Bảo mật
            </Link>
            <Link href={siteConfig.links.github} target="_blank" className="hover:underline">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
