"use client";

import { useRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type GlassVariant = "frost" | "crystal" | "smoked" | "control";

const variantClass: Record<GlassVariant, string> = {
  frost: "glass-frost",
  crystal: "glass-crystal",
  smoked: "glass-smoked",
  control: "glass-control"
};

type GlassPanelProps = HTMLAttributes<HTMLDivElement> & {
  variant?: GlassVariant;
  sheen?: boolean;
};

/**
 * Reusable glass surface. `sheen` adds a pointer-following highlight driven by
 * CSS custom properties (a smooth tracking glow, not a sharp hotspot).
 */
export function GlassPanel({
  variant = "frost",
  sheen = false,
  className,
  children,
  onPointerMove,
  ...rest
}: GlassPanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (sheen && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }
    onPointerMove?.(e);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={cn(variantClass[variant], sheen && "glass-sheen", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
