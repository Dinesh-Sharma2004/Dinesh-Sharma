"use client";

import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/data/projects";

const ordered = [...projects].sort((a, b) => a.order - b.order);

export function ProjectGrid() {
  return (
    <section className="section-shell pb-24 sm:pb-32">
      <div className="mb-10 flex items-end justify-between gap-6">
        <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          All six projects
        </h3>
        <p className="hidden max-w-xs text-sm leading-7 text-ink-dim sm:block">
          Every card links to verified source. Hover to preview; the background responds to the
          project in focus.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {ordered.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
