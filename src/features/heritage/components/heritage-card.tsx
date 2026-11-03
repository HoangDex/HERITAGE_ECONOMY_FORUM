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
  const detailHref = `/heritage/${project.slug || project.id}`;

  return (
    <Card className="flex flex-col h-full hover:border-primary/50 transition-all shadow-sm group">
      <CardHeader>
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
        <CardTitle className="text-xl">
          <Link href={detailHref} className="hover:text-primary transition-colors">
            {project.name}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" />
          {project.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-4 text-sm">
        <p className="text-muted-foreground line-clamp-2">{project.description}</p>
        <div className="grid grid-cols-3 gap-2 p-3 bg-muted/50 rounded-lg text-center">
          <div>
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              Doanh thu
            </div>
            <div className="font-semibold text-xs sm:text-sm text-foreground">
              {project.economicMetrics.annualRevenue}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1 mb-1">
              <Users className="w-3 h-3 text-blue-600" />
              Việc làm
            </div>
            <div className="font-semibold text-xs sm:text-sm text-foreground">
              +{project.economicMetrics.jobsCreated}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1 mb-1">
              <ShieldCheck className="w-3 h-3 text-amber-600" />
              Quỹ bảo tồn
            </div>
            <div className="font-semibold text-xs sm:text-sm text-foreground">
              {project.economicMetrics.conservationFundShare}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 border-t mt-auto text-xs text-muted-foreground flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground line-clamp-1">
          {project.highlights[0] || "Mô hình bảo tồn bền vững"}
        </span>
        <Link
          href={detailHref}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary pt-3 hover:underline"
        >
          Chi tiết <ArrowRight className="w-3 h-3" />
        </Link>
      </CardFooter>
    </Card>
  );
}
