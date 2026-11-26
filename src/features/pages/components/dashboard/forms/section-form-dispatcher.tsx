"use client";

import React from "react";
import { HeroSectionForm } from "./hero-section-form";
import { PillarsSectionForm } from "./pillars-section-form";
import { EventSectionForm } from "./event-section-form";
import { AwardsSectionForm } from "./awards-section-form";
import { ProjectsSectionForm } from "./projects-section-form";
import { NewsSectionForm } from "./news-section-form";
import { PartnersSectionForm } from "./partners-section-form";
import { CtaSectionForm } from "./cta-section-form";
import { AboutSectionsForm } from "./about-sections-form";
import { GenericSectionForm } from "./generic-section-form";

interface SectionFormDispatcherProps {
  type: string;
  propsData: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

export function SectionFormDispatcher({ type, propsData, onChange }: SectionFormDispatcherProps) {
  switch (type) {
    // Legacy typed forms (nếu dữ liệu cũ vẫn dùng mã IN_HOA)
    case "HOME_HERO":
      return <HeroSectionForm propsData={propsData} onChange={onChange} />;
    case "HOME_INTRO_PILLARS":
      return <PillarsSectionForm propsData={propsData} onChange={onChange} />;
    case "HOME_EVENT_HIGHLIGHT":
      return <EventSectionForm propsData={propsData} onChange={onChange} />;
    case "HOME_AWARDS_SHOWCASE":
      return <AwardsSectionForm propsData={propsData} onChange={onChange} />;
    case "HOME_FEATURED_PROJECTS":
      return <ProjectsSectionForm propsData={propsData} onChange={onChange} />;
    case "HOME_NEWS_FEED":
      return <NewsSectionForm propsData={propsData} onChange={onChange} />;
    case "HOME_PARTNERS_SLIDER":
      return <PartnersSectionForm propsData={propsData} onChange={onChange} />;
    case "HOME_CONVERSION_CTA":
      return <CtaSectionForm propsData={propsData} onChange={onChange} />;
    case "ABOUT_BANNER":
    case "ABOUT_VISION_MISSION":
    case "ABOUT_COUNCIL":
    case "ABOUT_EXECUTIVE":
    case "ABOUT_PARTNERS":
      return <AboutSectionsForm type={type} propsData={propsData} onChange={onChange} />;

    // Universal short section keys (hero, pillars, event, showcase, news, partners, cta, banner, vision, council, executive, ...)
    default:
      return <GenericSectionForm sectionKey={type} propsData={propsData} onChange={onChange} />;
  }
}
