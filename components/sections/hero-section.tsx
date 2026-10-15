"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { HeroInteractionZone } from "@/components/ui/hero-interaction-zone";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { site } from "@/data/site";

const line = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }
  })
};

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.9 + i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
};

export function HeroSection() {
  return (
    <section
      id="home"
      className="section-shell relative flex min-h-[100svh] flex-col justify-center pt-28 pb-16 lg:pt-24"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div className="relative z-10 max-w-2xl">
          <motion.div variants={fade} custom={-2} initial="hidden" animate="show" className="eyebrow">
            {site.role}
          </motion.div>

          <h1 className="mt-6 font-display text-[clamp(2.6rem,7vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-ink">
            <span className="block overflow-hidden">
              <motion.span className="block" variants={line} custom={0} initial="hidden" animate="show">
                Engineering
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span className="accent-text block" variants={line} custom={1} initial="hidden" animate="show">
                intelligence
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span className="block" variants={line} custom={2} initial="hidden" animate="show">
                from data &amp; systems.
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fade}
            custom={0}
            initial="hidden"
            animate="show"
            className="mt-7 max-w-xl text-pretty text-base leading-8 text-ink-dim sm:text-lg"
          >
            I&apos;m <span className="text-ink">Dinesh Sharma</span> — I build retrieval-augmented
            systems, agentic LLM workflows, and the backends and models behind them: from
            FAISS-grounded assistants to deterministic LangGraph agents and regime-aware forecasters.
          </motion.p>

          <motion.div
            variants={fade}
            custom={1}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#work" variant="primary">
              Explore My Work
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href={site.github} variant="secondary" ariaLabel="GitHub profile">
              <Github className="h-4 w-4" />
              GitHub
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={fade}
            custom={2}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-wrap gap-2"
          >
            {["RAG", "Agents", "Backend", "ML / DL", "MLOps"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Interaction region for the 3D centerpiece (rendered in the shared
            background scene; this overlay captures drag without blocking scroll). */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.3 }}
          className="relative h-[46vh] min-h-[320px] lg:h-[72vh]"
        >
          <HeroInteractionZone className="h-full w-full" />
          <span className="pointer-events-none absolute right-4 top-4 hidden font-mono text-[10px] uppercase tracking-[0.25em] text-ink-dim lg:block">
            Drag to rotate · AI Constellation
          </span>
        </motion.div>
      </div>

      <motion.div
        variants={fade}
        custom={4}
        initial="hidden"
        animate="show"
        className="mt-10 flex justify-center lg:mt-6 lg:justify-start"
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
