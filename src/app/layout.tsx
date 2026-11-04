import type { Metadata } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollProgressBar } from "@/components/animations";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  weight: ["600", "700", "800", "900"],
  subsets: ["latin", "vietnamese"],
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
      className={`h-full antialiased scroll-smooth ${beVietnamPro.variable} ${playfairDisplay.variable}`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans">
        <ScrollProgressBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
