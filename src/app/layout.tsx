import type { Metadata } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PublicLayoutShell } from "@/components/layout/public-layout-shell";
import { QueryProvider } from "@/components/providers/query-provider";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["vietnamese", "latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Heritage Economy Forum | Diễn đàn Kinh tế Di sản",
    template: "%s | Heritage Economy Forum",
  },
  description:
    "Di sản kiến tạo giá trị – Phát triển hướng tương lai. Nền tảng kết nối tri thức, nguồn lực và sáng kiến phát huy giá trị di sản trong nền kinh tế đương đại.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      data-scroll-behavior="smooth"
      className={`h-full antialiased scroll-smooth ${beVietnamPro.variable} ${playfairDisplay.variable}`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans">
        <QueryProvider>
          <PublicLayoutShell>{children}</PublicLayoutShell>
        </QueryProvider>
      </body>
    </html>
  );
}
