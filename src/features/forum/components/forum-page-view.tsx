import { ForumHero } from "./forum-hero";
import { ForumStickyNav } from "./forum-sticky-nav";
import { ForumSessionsSection } from "./forum-sessions-section";
import { ForumTimelineSection } from "./forum-timeline-section";
import { ForumSpeakersSection } from "./forum-speakers-section";
import { ForumResourcesSection } from "./forum-resources-section";
import { ForumPartnersSection } from "./forum-partners-section";
import type { ForumEdition } from "../types/forum-edition.types";

interface ForumPageViewProps {
  edition: ForumEdition;
}

export function ForumPageView({ edition }: ForumPageViewProps) {
  return (
    <div className="space-y-0 pb-16">
      <ForumHero edition={edition} />
      <ForumStickyNav />
      <div id="tong-quan">
        <ForumSessionsSection sessions={edition.sessions} />
        <ForumTimelineSection timeline={edition.timeline} />
        <ForumSpeakersSection speakers={edition.speakers} />
        <ForumResourcesSection resources={edition.resources} />
        <ForumPartnersSection />
      </div>
    </div>
  );
}
