"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { useRef } from "react";
import { ProjectArtwork } from "@/components/visuals/project-artwork";
import { setActiveProject } from "@/components/visuals/scene-state";
import type { Project } from "@/types/project";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const inner = useRef<HTMLDivElement>(null);
  const art = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);

  const onEnter = () => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setActiveProject(index);
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced.current || e.pointerType !== "mouse" || !inner.current) return;
    const rect = inner.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    inner.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    inner.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
    inner.current.style.transform = `perspective(1100px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`;
    if (art.current) art.current.style.transform = `translate3d(${px * -16}px, ${py * -16}px, 40px)`;
  };

  const onLeave = () => {
    setActiveProject(-1);
    if (inner.current) inner.current.style.transform = "perspective(1100px) rotateX(0) rotateY(0)";
    if (art.current) art.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.08 }}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-cursor="view"
      data-cursor-label="View project"
    >
      <div
        ref={inner}
        className="glass-frost glass-sheen group relative flex h-full flex-col overflow-hidden rounded-[24px] p-3 transition-[border-color,box-shadow] duration-500 ease-premium will-change-transform hover:border-cyan/30"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative overflow-hidden rounded-[18px] border border-white/8 bg-obsidian/60">
          <div ref={art} className="will-change-transform">
            <ProjectArtwork
              kind={project.artwork}
              accent={project.accent}
              className="aspect-[16/10] w-full"
            />
          </div>
          <span className="absolute left-3 top-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
            {String(project.order).padStart(2, "0")}
          </span>
          <span className="glass-control absolute right-3 top-3 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
            {project.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col px-3 pb-2 pt-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
              {project.title}
            </h3>
            <ArrowUpRight className="h-5 w-5 flex-none text-ink-dim transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
          </div>

          <p className="mt-3 text-sm leading-7 text-ink-dim">{project.description}</p>

          {/* Revealed on hover (and always present for keyboard / touch) */}
          <p className="mt-3 max-h-0 overflow-hidden text-sm leading-7 text-ink-dim/80 opacity-0 transition-all duration-500 ease-premium group-hover:max-h-40 group-hover:opacity-100 group-focus-within:max-h-40 group-focus-within:opacity-100">
            {project.tagline}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 5).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-dim"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-4 pt-6">
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="link"
              className="inline-flex items-center gap-2 text-sm text-ink transition hover:text-cyan"
            >
              <Github className="h-4 w-4" /> View source
            </a>
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="link"
                className="inline-flex items-center gap-2 text-sm text-ink-dim transition hover:text-cyan"
              >
                <ExternalLink className="h-4 w-4" /> Live demo
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
