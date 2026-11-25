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
    case "HOME_HERO":
    case "HERO":
      return <HeroSectionForm propsData={propsData} onChange={onChange} />;

    case "HOME_INTRO_PILLARS":
    case "PILLARS_5":
      return <PillarsSectionForm propsData={propsData} onChange={onChange} />;

    case "HOME_EVENT_HIGHLIGHT":
    case "EVENT_HIGHLIGHT":
      return <EventSectionForm propsData={propsData} onChange={onChange} />;

    case "HOME_AWARDS_SHOWCASE":
    case "AWARDS_SHOWCASE":
      return <AwardsSectionForm propsData={propsData} onChange={onChange} />;

    case "HOME_FEATURED_PROJECTS":
    case "PROJECT_GRID":
      return <ProjectsSectionForm propsData={propsData} onChange={onChange} />;

    case "HOME_NEWS_FEED":
    case "NEWS_FEED":
      return <NewsSectionForm propsData={propsData} onChange={onChange} />;

    case "HOME_PARTNERS_SLIDER":
    case "PARTNERS_SLIDER":
      return <PartnersSectionForm propsData={propsData} onChange={onChange} />;

    case "HOME_CONVERSION_CTA":
    case "CTA_BANNER":
      return <CtaSectionForm propsData={propsData} onChange={onChange} />;

    case "ABOUT_BANNER":
    case "ABOUT_VISION_MISSION":
    case "ABOUT_COUNCIL":
    case "ABOUT_EXECUTIVE":
    case "ABOUT_PARTNERS":
      return <AboutSectionsForm type={type} propsData={propsData} onChange={onChange} />;

    default:
      return <GenericSectionForm propsData={propsData} onChange={onChange} />;
  }
}
