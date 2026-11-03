/**
 * LAYER 6C: PRESENTATION LAYER (Detail View Component)
 * Giao diện chi tiết mô hình kinh tế di sản
 */

import Link from "next/link";
import {
  MapPin,
  TrendingUp,
  Users,
  ShieldCheck,
  CheckCircle2,
  Building,
  Share2,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { HeritageProject } from "../types/heritage.types";

interface HeritageDetailProps {
  project: HeritageProject;
}

export function HeritageDetail({ project }: HeritageDetailProps) {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Navigation */}
      <Link href="/heritage">
        <Button variant="ghost" size="sm" className="gap-2 pl-0 hover:bg-transparent">
          <ArrowLeft className="w-4 h-4" /> Quay lại danh mục dự án
        </Button>
      </Link>

      {/* Main Header */}
      <div className="space-y-4 bg-card border rounded-3xl p-6 sm:p-10 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{project.category}</Badge>
            <Badge variant={project.status === "Đang vận hành" ? "default" : "secondary"}>
              {project.status}
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="w-4 h-4 text-primary" /> {project.location}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
          {project.name}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {/* Economic Metrics Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
          <div className="p-4 rounded-2xl bg-muted/50 border border-border/50 text-center">
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 mb-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Doanh thu ước tính
            </div>
            <div className="text-xl sm:text-2xl font-bold text-foreground">
              {project.economicMetrics.annualRevenue}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-muted/50 border border-border/50 text-center">
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 mb-1.5">
              <Users className="w-4 h-4 text-blue-600" />
              Việc làm tạo lập
            </div>
            <div className="text-xl sm:text-2xl font-bold text-foreground">
              +{project.economicMetrics.jobsCreated} lao động
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-muted/50 border border-border/50 text-center">
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              Tái thiết di sản
            </div>
            <div className="text-xl sm:text-2xl font-bold text-foreground">
              {project.economicMetrics.conservationFundShare}
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="bg-card border rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Building className="w-5 h-5 text-primary" /> Điểm cốt lõi của Mô hình
        </h2>
        <div className="grid gap-3">
          {project.highlights.map((item, index) => (
            <div key={index} className="flex items-start gap-3 text-sm text-foreground/90">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action CTA */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-primary/5 border border-primary/20">
        <div>
          <h3 className="font-semibold text-foreground">Quan tâm đến mô hình này?</h3>
          <p className="text-xs text-muted-foreground">
            Kết nối hợp tác công tư (PPP) hoặc trao đổi kinh nghiệm bảo tồn.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Share2 className="w-4 h-4" /> Chia sẻ
          </Button>
          <Button size="sm">Liên hệ đối tác</Button>
        </div>
      </div>
    </div>
  );
}
