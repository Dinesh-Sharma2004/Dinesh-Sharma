"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, type LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/ui/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { site, socials } from "@/data/site";

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail
};

export function ContactSection() {
  return (
    <section id="contact" className="section-shell scroll-mt-24 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Contact"
        title="Have an AI, backend, or data problem worth building for?"
        description="I'm open to internships, collaborations and engineering work where applied AI, solid backends and honest evaluation all matter."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="glass-frost rounded-[26px] p-7 sm:p-9"
        >
          <h3 className="font-display text-xl font-semibold text-ink">Reach me directly</h3>
          <p className="mt-3 text-sm leading-7 text-ink-dim">
            All links below are verified and go to my own profiles.
          </p>
          <div className="mt-7 space-y-3">
            {socials.map((s) => {
              const Icon = iconMap[s.icon];
              const external = s.href.startsWith("http");
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer noopener" : undefined}
                  data-cursor="link"
                  className="group flex items-center justify-between gap-4 rounded-[16px] border border-white/8 bg-white/[0.02] px-4 py-3.5 transition hover:border-cyan/30 hover:bg-white/[0.05]"
                >
                  <span className="flex items-center gap-3">
                    <span className="glass-control flex h-10 w-10 items-center justify-center text-cyan">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                        {s.label}
                      </span>
                      <span className="block text-sm text-ink">{s.value}</span>
                    </span>
                  </span>
                  <span className="text-ink-dim transition group-hover:text-cyan">↗</span>
                </a>
              );
            })}
          </div>
        </motion.div>

        <ContactForm />
      </div>

      <footer className="mt-20 border-t border-white/8 pt-8">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-ink-dim sm:flex-row">
          <p className="font-display text-ink">{site.name}</p>
          <p>© {new Date().getFullYear()} · {site.role}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em]">
            Built with Next.js · Three.js
          </p>
        </div>
      </footer>
    </section>
  );
}
