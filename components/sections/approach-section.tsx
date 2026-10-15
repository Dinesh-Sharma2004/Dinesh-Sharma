"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { approach } from "@/data/skills";

export function ApproachSection() {
  return (
    <section className="section-shell py-24 sm:py-28">
      <SectionHeading
        eyebrow="Engineering Approach"
        title="A consistent way of working — not a claim every project is identical."
        description="A general process I return to across AI, backend and data work. How much of each stage a project needs varies."
      />

      <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {approach.map((stage, i) => (
          <motion.li
            key={stage.step}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
            className="glass-frost relative overflow-hidden rounded-[20px] p-6"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan">
              Step {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{stage.step}</h3>
            <p className="mt-2 text-sm leading-7 text-ink-dim">{stage.note}</p>
            <span className="pointer-events-none absolute -right-4 -top-5 font-display text-7xl font-bold text-white/[0.04]">
              {i + 1}
            </span>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
