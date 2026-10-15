"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { capabilities } from "@/data/skills";
import { projects } from "@/data/projects";

function evidenceTitles(ids: string[]) {
  return ids
    .map((id) => projects.find((p) => p.id === id)?.title)
    .filter(Boolean) as string[];
}

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="section-shell scroll-mt-24 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Capabilities"
        title="What I actually build — grounded in shipped work."
        description="A map of the engineering I do across AI, backend and data. Every capability below is demonstrated by one of the six projects, not asserted with a progress bar."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {capabilities.map((cap, i) => (
          <motion.div
            key={cap.id}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
            className="glass-frost glass-sheen group relative flex flex-col rounded-[22px] p-6 transition-colors duration-500 hover:border-cyan/25"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-ink">{cap.label}</h3>
            <p className="mt-3 text-sm leading-7 text-ink-dim">{cap.summary}</p>

            <ul className="mt-5 space-y-2.5">
              {cap.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink/90">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-lime" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-white/8 pt-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-dim">
                Shown in
              </p>
              <p className="mt-1.5 text-xs leading-6 text-ink-dim">
                {evidenceTitles(cap.evidence).join(" · ")}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
