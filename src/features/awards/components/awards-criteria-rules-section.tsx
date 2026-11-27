import { CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AwardCriteria, AwardActionLink } from "../types/awards.types";

interface AwardsCriteriaRulesSectionProps {
  title?: string;
  description?: string;
  action?: AwardActionLink;
  criteriaList: AwardCriteria[];
  rulesVersion: string;
}

export function AwardsCriteriaRulesSection({
  title,
  description,
  action,
  criteriaList,
}: AwardsCriteriaRulesSectionProps) {
  return (
    <section id="quy-che" className="py-14 bg-white/70 border-y border-[#dfd7c8] scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#292929] tracking-tight">
              {title || ""}
            </h2>
            <p className="text-[#5c554b] max-w-2xl text-base">{description || ""}</p>
          </div>

          {action && (
            <div className="shrink-0">
              <a href={action.href}>
                <Button className="bg-[#0D4838] hover:bg-[#0D4838]/90 text-white gap-2 font-medium cursor-pointer">
                  <Download className="w-4 h-4" />
                  {action.label}
                </Button>
              </a>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {criteriaList.map((crit) => (
            <div
              key={crit.id}
              className="p-5 sm:p-6 bg-white rounded-2xl border border-[#dfd7c8] shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-[#292929] leading-snug">{crit.title}</h3>
                <Badge className="bg-[#0D4838] text-white font-bold text-sm px-3 py-1">
                  {crit.weightPercent ?? 25}%
                </Badge>
              </div>

              <p className="text-sm text-[#5c554b] leading-relaxed">{crit.description}</p>

              <div className="pt-3 border-t border-[#dfd7c8]/60 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0D4838] block">
                  Yêu cầu hồ sơ minh chứng:
                </span>
                <ul className="space-y-1.5">
                  {(crit.evidenceRequirements || []).map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#292929]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C29B57] shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
