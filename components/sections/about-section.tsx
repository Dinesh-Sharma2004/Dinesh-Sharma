"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/data/site";

const principles = [
  {
    title: "Grounded over generative",
    body: "I prefer systems whose decisions are traceable — retrieval with citations, or logic that lives in code with the model on top."
  },
  {
    title: "Typed, observable backends",
    body: "FastAPI services with streaming, async workers and Pydantic contracts, instrumented so behaviour is visible in production."
  },
  {
    title: "Honest evaluation",
    body: "Strict metrics and real traces over flattering demos — including documenting what is not finished yet."
  }
];

export function AboutSection() {
  return (
    <section id="about" className="section-shell scroll-mt-24 py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="About"
            title="AI Engineer & Data Scientist."
            align="left"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mt-6 space-y-5 text-base leading-8 text-ink-dim"
          >
            <p>
              I design and build applied-AI systems end to end — retrieval-augmented assistants,
              agentic LLM workflows, deep-learning models and the backends that serve them. The six
              projects here are representative of that range, from a FAISS-grounded medical RAG
              platform to a deterministic LangGraph safety advisor and a regime-aware forecasting
              engine.
            </p>
            <p>
              My public work lives on GitHub, where I keep building in the open across RAG, agents,
              NLP, time-series and MLOps. I care about systems that are genuinely useful, measured
              honestly, and shipped.
            </p>
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href={site.github} variant="secondary" ariaLabel="GitHub profile">
              GitHub
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Get in touch
            </MagneticButton>
          </div>
        </div>

        <div className="grid gap-4">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass-frost glass-sheen rounded-[22px] p-6"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] text-cyan">0{i + 1}</span>
                <h3 className="font-display text-lg font-semibold text-ink">{p.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-ink-dim">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
