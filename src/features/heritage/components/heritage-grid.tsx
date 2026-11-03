import type { HeritageProject } from "../types/heritage";
import { HeritageCard } from "./heritage-card";

interface HeritageGridProps {
  projects: HeritageProject[];
}

export function HeritageGrid({ projects }: HeritageGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <HeritageCard key={project.id} project={project} />
      ))}
    </div>
  );
}
