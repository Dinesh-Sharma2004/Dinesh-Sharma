"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Github, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useActiveSection } from "@/hooks/use-active-section";
import { navLinks, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      closeRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[70] flex justify-center px-4 pt-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={cn(
            "glass-frost flex w-full max-w-shell items-center justify-between gap-4 rounded-full px-3 py-2.5 transition-all duration-500 sm:px-4",
            scrolled ? "shadow-ambient" : "bg-transparent"
          )}
        >
          <a
            href="#home"
            data-cursor="link"
            className="group inline-flex items-center gap-2.5 pl-1"
            aria-label="Dinesh Sharma — home"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-violet font-display text-sm font-bold text-obsidian">
              D
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight text-ink sm:block">
              Dinesh Sharma
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  data-cursor="link"
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors",
                    isActive ? "text-ink" : "text-ink-dim hover:text-ink"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-white/8"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              data-cursor="link"
              className="glass-control hidden h-10 w-10 items-center justify-center text-ink-dim hover:text-ink sm:flex"
            >
              <Github className="h-4 w-4" />
            </a>
            <MagneticButton href="#contact" variant="primary" className="hidden px-5 py-2.5 md:inline-flex">
              Let&apos;s talk
            </MagneticButton>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="glass-control flex h-10 w-10 items-center justify-center text-ink md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-smoked fixed inset-0 z-[75] flex flex-col p-6 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-base font-semibold text-ink">Menu</span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="glass-control flex h-10 w-10 items-center justify-center text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-10 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.4 }}
                  className="border-b border-white/8 py-4 font-display text-3xl font-semibold text-ink"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto flex items-center gap-3">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer noopener"
                className="glass-control inline-flex items-center gap-2 px-4 py-3 text-sm text-ink"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="edge-spec inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-cyan to-violet px-5 py-3 text-sm font-medium text-obsidian"
              >
                Let&apos;s talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
