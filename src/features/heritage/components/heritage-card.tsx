import Image from "next/image";
import Link from "next/link";
import { MapPin, TrendingUp, Users, ShieldCheck, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { HeritageProject } from "../types/heritage.types";

interface HeritageCardProps {
  project: HeritageProject;
}

export function HeritageCard({ project }: HeritageCardProps) {
  const detailHref = `/du-an/${project.slug || project.id}`;

  return (
    <Card className="flex flex-col h-full hover:border-[#76232D] transition-all shadow-xs hover:shadow-md group overflow-hidden rounded-2xl bg-white border border-[#dfd7c8]">
      {project.imageUrl && (
        <div className="relative w-full aspect-[16/10] bg-[#dfd7c8]/30 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 350px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <Badge className="bg-[#76232D]/90 backdrop-blur-md text-[#F5EFE5] text-[11px] font-semibold border border-white/20 shadow-sm">
              {project.category}
            </Badge>
            <Badge
              className={`text-[10px] font-bold shadow-sm ${
                project.status === "Đang vận hành"
                  ? "bg-emerald-700 text-white"
                  : "bg-[#C29B57] text-[#292929]"
              }`}
            >
              {project.status}
            </Badge>
          </div>
          <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-xs text-white/95 font-medium drop-shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#C29B57] shrink-0" />
            <span>{project.location}</span>
          </div>
        </div>
      )}

      <CardHeader className="p-5 pb-2 space-y-1.5">
        {!project.imageUrl && (
          <div className="flex items-center justify-between gap-2 mb-1">
            <Badge variant="outline" className="text-xs">
              {project.category}
            </Badge>
            <Badge
              variant={project.status === "Đang vận hành" ? "default" : "secondary"}
              className="text-xs"
            >
              {project.status}
            </Badge>
          </div>
        )}
        <CardTitle className="text-lg font-serif font-bold text-[#292929] group-hover:text-[#76232D] transition-colors leading-snug">
          <Link href={detailHref} className="hover:text-primary transition-colors">
            {project.name}
          </Link>
        </CardTitle>
        {!project.imageUrl && (
          <CardDescription className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            {project.location}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-1 space-y-3 p-5 pt-0 text-sm">
        <p className="text-xs text-[#5c554b] line-clamp-2 leading-relaxed">{project.description}</p>
        <div className="grid grid-cols-3 gap-2 p-3 bg-[#F5EFE5] border border-[#dfd7c8]/80 rounded-xl text-center">
          <div>
            <div className="text-[10px] text-[#5c554b] flex items-center justify-center gap-1 mb-0.5">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              Doanh thu
            </div>
            <div className="font-bold text-xs text-[#76232D]">
              {project.economicMetrics.annualRevenue}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-[#5c554b] flex items-center justify-center gap-1 mb-0.5">
              <Users className="w-3 h-3 text-blue-600" />
              Việc làm
            </div>
            <div className="font-bold text-xs text-[#292929]">
              +{project.economicMetrics.jobsCreated}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-[#5c554b] flex items-center justify-center gap-1 mb-0.5">
              <ShieldCheck className="w-3 h-3 text-amber-600" />
              Quỹ bảo tồn
            </div>
            <div className="font-bold text-xs text-[#C29B57]">
              {project.economicMetrics.conservationFundShare}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-2 border-t border-[#dfd7c8]/60 mt-auto text-xs text-[#5c554b] flex items-center justify-between">
        <span className="text-[11px] truncate max-w-[190px]">
          {project.highlights[0] || "Mô hình bảo tồn bền vững"}
        </span>
        <Link
          href={detailHref}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#76232D] hover:text-[#C29B57] transition-colors"
        >
          Chi tiết <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
