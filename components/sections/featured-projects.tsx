"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { ProjectArtwork } from "@/components/visuals/project-artwork";
import { setActiveProject } from "@/components/visuals/scene-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/data/projects";

const ordered = [...projects].sort((a, b) => a.order - b.order);
const ease = [0.22, 1, 0.36, 1] as const;

export function FeaturedProjects() {
  const [[active, dir], setState] = useState<[number, number]>([0, 0]);
  const activeRef = useRef(0);
  const inView = useRef(false);
  const swipeStart = useRef<number | null>(null);

  const go = useCallback((next: number, direction: number) => {
    const wrapped = (next + ordered.length) % ordered.length;
    activeRef.current = wrapped;
    if (inView.current) setActiveProject(wrapped);
    setState([wrapped, direction]);
  }, []);

  const project = ordered[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1, 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1, -1);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    swipeStart.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (dx < -55) go(active + 1, 1);
    else if (dx > 55) go(active - 1, -1);
  };

  return (
    <motion.section
      id="work"
      className="section-shell scroll-mt-24 py-24 sm:py-32"
      onViewportEnter={() => {
        inView.current = true;
        setActiveProject(activeRef.current);
      }}
      onViewportLeave={() => {
        inView.current = false;
        setActiveProject(-1);
      }}
      viewport={{ amount: 0.3 }}
    >
      <SectionHeading
        eyebrow="Selected Work"
        title="Six projects, built end to end."
        description="Each one is a real system with verified source. Swipe, use the arrows, or browse the full grid below."
      />

      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Featured projects"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        className="mt-12 grid touch-pan-y items-center gap-8 outline-none focus-visible:ring-1 focus-visible:ring-cyan/30 lg:grid-cols-[1fr_1fr]"
      >
        {/* Text column */}
        <div className="relative order-2 min-h-[360px] lg:order-1">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={project.id}
              custom={dir}
              initial={{ opacity: 0, x: dir >= 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir >= 0 ? -40 : 40 }}
              transition={{ duration: 0.55, ease }}
            >
              <div className="flex items-center gap-3 font-mono text-sm text-ink-dim">
                <span className="text-cyan">{String(project.order).padStart(2, "0")}</span>
                <span className="h-px w-8 bg-white/15" />
                <span>{String(ordered.length).padStart(2, "0")}</span>
                <span className="glass-control ml-2 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em]">
                  {project.category}
                </span>
              </div>

              <h3 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
                {project.title}
              </h3>
              <p className="mt-3 text-base text-ink-dim">{project.tagline}</p>

              <div className="glass-smoked mt-6 rounded-[20px] p-5">
                <p className="text-sm leading-7 text-ink/90">{project.implementation}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-dim"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="link"
                  className="glass-control inline-flex items-center gap-2 px-5 py-3 text-sm text-ink hover:text-cyan"
                >
                  <Github className="h-4 w-4" /> View Source
                </a>
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-cursor="link"
                    className="inline-flex items-center gap-2 px-2 py-3 text-sm text-ink-dim hover:text-cyan"
                  >
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Artwork column */}
        <div className="relative order-1 aspect-[16/11] w-full lg:order-2">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.94, rotateY: dir >= 0 ? 8 : -8 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.96, rotateY: dir >= 0 ? -8 : 8 }}
              transition={{ duration: 0.6, ease }}
              className="glass-crystal glass-sheen absolute inset-0 overflow-hidden rounded-[26px] p-3"
            >
              <ProjectArtwork
                kind={project.artwork}
                accent={project.accent}
                className="h-full w-full rounded-[18px]"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls + progress */}
      <div className="mt-10 flex items-center justify-between gap-6">
        <div className="flex flex-1 items-center gap-2" aria-hidden="true">
          {ordered.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => go(i, i > active ? 1 : -1)}
              className="group h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"
              tabIndex={-1}
            >
              <span
                className={`block h-full rounded-full bg-gradient-to-r from-cyan to-violet transition-all duration-500 ${
                  i === active ? "w-full" : "w-0 group-hover:w-1/3"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(active - 1, -1)}
            aria-label="Previous project"
            data-cursor="link"
            className="glass-control flex h-11 w-11 items-center justify-center text-ink-dim hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(active + 1, 1)}
            aria-label="Next project"
            data-cursor="link"
            className="glass-control flex h-11 w-11 items-center justify-center text-ink-dim hover:text-ink"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing project {active + 1} of {ordered.length}: {project.title}
      </p>
    </motion.section>
  );
}
