"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  ariaLabel?: string;
};

/**
 * Link CTA with a restrained magnetic pull on fine pointers. Keeps a stable hit
 * area (the pull is capped and reset on leave) and a readable focus state.
 * Same-page anchors use smooth scrolling via CSS; external links open safely.
 */
export function MagneticButton({
  href,
  children,
  className,
  variant = "primary",
  ariaLabel
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const external = /^https?:/i.test(href);

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      data-cursor="link"
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-[transform,border-color,background,box-shadow] duration-300 ease-premium will-change-transform",
        variant === "primary" &&
          "edge-spec text-obsidian bg-gradient-to-r from-cyan to-violet shadow-glow hover:shadow-violet",
        variant === "secondary" && "glass-control text-ink",
        variant === "ghost" &&
          "text-ink-dim hover:text-ink underline-offset-4 hover:underline",
        className
      )}
    >
      {children}
    </a>
  );
}
