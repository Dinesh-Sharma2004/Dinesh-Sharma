"use client";

export function ScrollIndicator() {
  return (
    <a
      href="#capabilities"
      aria-label="Scroll to explore"
      data-cursor="link"
      className="group inline-flex flex-col items-center gap-2 text-ink-dim transition hover:text-ink"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
        <span className="h-2 w-[3px] rounded-full bg-cyan animate-scroll-hint" />
      </span>
    </a>
  );
}
