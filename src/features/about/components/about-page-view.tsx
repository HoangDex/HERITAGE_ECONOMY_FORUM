/**
 * COMPONENT TỔNG HỢP GIAO DIỆN TRANG GIỚI THIỆU (ABOUT PAGE VIEW)
 * Tích hợp Banner, Tabs Anchor, Tầm nhìn Sứ mệnh, Hội đồng, Ban Điều hành, Đối tác & Modal chi tiết
 */

"use client";

import React from "react";
import { AboutBanner } from "./about-banner";
import { VisionMissionSection } from "./vision-mission-section";
import { CouncilSection } from "./council-section";
import { ExecutiveSection } from "./executive-section";
import { PartnersSection } from "./partners-section";
import { PersonDetailDialog } from "./person-detail-dialog";
import { useAbout } from "../hooks/use-about";
import type { AboutPageData } from "../types/about.types";

interface AboutPageViewProps {
  initialData: AboutPageData;
}

export function AboutPageView({ initialData }: AboutPageViewProps) {
  const {
    activeTab,
    scrollToSection,
    selectedPerson,
    isModalOpen,
    openPersonModal,
    closePersonModal,
  } = useAbout();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* 1. BANNER & STICKY ANCHOR TABS */}
      <AboutBanner
        activeTab={activeTab}
        onSelectTab={scrollToSection}
        lastUpdated={initialData.lastUpdated}
      />

      <main className="flex-1">
        {/* 2. MỤC 6.1: TẦM NHÌN – SỨ MỆNH – GIÁ TRỊ CỐT LÕI */}
        <VisionMissionSection data={initialData.visionMission} />

        {/* 3. MỤC 6.2: HỘI ĐỒNG DIỄN ĐÀN */}
        <CouncilSection
          president={initialData.president}
          vicePresidents={initialData.vicePresidents}
          councilMembers={initialData.councilMembers}
          scientificAdvisors={initialData.scientificAdvisors}
          onOpenPersonModal={openPersonModal}
          showFullViewLink={true}
        />

        {/* 4. MỤC 6.3: BAN ĐIỀU HÀNH & CƠ CẤU CHUYÊN TRÁCH */}
        <ExecutiveSection
          head={initialData.executiveHead}
          deputies={initialData.executiveDeputies}
          departments={initialData.executiveDepartments}
          onOpenPersonModal={openPersonModal}
          showFullViewLink={true}
        />

        {/* 5. MỤC 6.4: MẠNG LƯỚI ĐỐI TÁC ĐỒNG HÀNH & CTA */}
        <PartnersSection partners={initialData.partners} />
      </main>

      {/* MODAL CHI TIẾT HỒ SƠ NHÂN SỰ CHUẨN 4:5 */}
      <PersonDetailDialog person={selectedPerson} isOpen={isModalOpen} onClose={closePersonModal} />
    </div>
  );
}
