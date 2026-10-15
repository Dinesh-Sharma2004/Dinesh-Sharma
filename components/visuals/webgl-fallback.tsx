"use client";

/**
 * Polished static fallback shown when WebGL is unavailable or fails.
 * Pure CSS + inline SVG — no page content ever depends on this rendering.
 */
export function WebglFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute left-[12%] top-[16%] h-[42vmax] w-[42vmax] rounded-full bg-violet/20 blur-[120px] animate-float-slow" />
      <div className="absolute right-[8%] top-[10%] h-[34vmax] w-[34vmax] rounded-full bg-cyan/20 blur-[120px] animate-float-slow [animation-delay:-3s]" />
      <div className="absolute bottom-[-10%] left-1/2 h-[40vmax] w-[40vmax] -translate-x-1/2 rounded-full bg-violet/14 blur-[140px]" />
      <svg
        className="absolute right-[6%] top-1/2 hidden -translate-y-1/2 opacity-60 md:block"
        width="420"
        height="420"
        viewBox="0 0 420 420"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="rgba(100,232,242,0.35)" strokeWidth="1">
          <line x1="210" y1="210" x2="320" y2="120" />
          <line x1="210" y1="210" x2="110" y2="150" />
          <line x1="210" y1="210" x2="150" y2="320" />
          <line x1="210" y1="210" x2="300" y2="300" />
          <line x1="320" y1="120" x2="300" y2="300" />
        </g>
        <g fill="#64E8F2">
          <circle cx="210" cy="210" r="6" />
          <circle cx="320" cy="120" r="4" fill="#9675FF" />
          <circle cx="110" cy="150" r="4" />
          <circle cx="150" cy="320" r="4" fill="#9675FF" />
          <circle cx="300" cy="300" r="4" />
        </g>
      </svg>
    </div>
  );
}
