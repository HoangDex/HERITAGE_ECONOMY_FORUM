"use client";

import { Clock, MapPin, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn, StaggerContainer, StaggerItem, InteractiveCard } from "@/components/animations";
import type { ForumSession } from "../types/forum-edition.types";

interface ForumSessionsSectionProps {
  sessions: ForumSession[];
}

export function ForumSessionsSection({ sessions }: ForumSessionsSectionProps) {
  return (
    <section id="cac-phien" className="py-12 scroll-mt-28">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl space-y-8">
        <FadeIn direction="up" className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#76232D]/10 text-[#76232D]">
            Chương Trình Trọng Tâm
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#292929] tracking-tight">
            04 Phiên Nghị Sự Chuyên Đề
          </h2>
          <p className="text-[#5c554b] max-w-3xl text-base">
            Cấu trúc đối thoại liên ngành bao quát từ hoàn thiện thể chế chính sách, nhận diện mô
            hình thực hành, đối thoại công – tư cho tới công bố tuyên bố chung.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sessions.map((session) => (
            <StaggerItem key={session.id}>
              <InteractiveCard className="h-full">
                <Card className="border border-[#dfd7c8] bg-white shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                  <CardHeader className="space-y-3 pb-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge className="bg-[#C29B57] text-[#292929] font-semibold">
                        Phiên {session.order}
                      </Badge>
                      <div className="flex items-center gap-2 text-xs font-medium text-[#5c554b]">
                        <Clock className="w-3.5 h-3.5 text-[#76232D]" />
                        <span>
                          {session.date} | {session.timeRange}
                        </span>
                      </div>
                    </div>

                    <CardTitle className="text-lg sm:text-xl font-bold text-[#292929] leading-snug">
                      {session.title}
                    </CardTitle>
                    <p className="text-sm font-medium text-[#76232D]">{session.subTitle}</p>
                  </CardHeader>

                  <CardContent className="space-y-4 pt-0">
                    <p className="text-sm text-[#5c554b] leading-relaxed">{session.description}</p>

                    <div className="pt-3 border-t border-[#dfd7c8]/60 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-[#5c554b]">
                        <MapPin className="w-3.5 h-3.5 text-[#C29B57] shrink-0" />
                        <span>{session.room}</span>
                      </div>

                      {session.speakers.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <span className="text-xs font-semibold text-[#76232D] uppercase tracking-wider block">
                            Chủ trì & Diễn giả phiên:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {session.speakers.map((sp) => (
                              <span
                                key={sp.id}
                                className="inline-flex items-center gap-1.5 text-xs bg-[#F5EFE5] px-2.5 py-1 rounded-md text-[#292929] font-medium border border-[#dfd7c8]"
                              >
                                <UserCheck className="w-3 h-3 text-[#C29B57]" />
                                {sp.name} ({sp.organization})
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
