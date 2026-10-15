"use client";

import { useEffect, useRef, useState } from "react";

type CursorVariant = "default" | "link" | "view";

/**
 * Restrained cursor-following highlight for fine pointers only. Position is
 * driven imperatively (no per-move React renders); only the variant/label,
 * which change rarely, use state. Native behavior is preserved on touch and
 * easing lag is removed under reduced motion.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fine =
      window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches ?? false;
    if (!fine) return;

    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cur = { ...pos };
    let raf = 0;

    const render = () => {
      const ease = reduced ? 1 : 0.2;
      cur.x += (pos.x - cur.x) * ease;
      cur.y += (pos.y - cur.y) * ease;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(render);
    };

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const target = (e.target as HTMLElement | null)?.closest?.("[data-cursor]") as
        | HTMLElement
        | null;
      if (target) {
        setVariant((target.dataset.cursor as CursorVariant) ?? "link");
        setLabel(target.dataset.cursorLabel ?? "");
      } else {
        setVariant("default");
        setLabel("");
      }
    };

    const onLeave = () => {
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  const size = variant === "view" ? 92 : variant === "link" ? 56 : 26;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-300 ease-premium"
      style={{
        width: size,
        height: size,
        borderColor:
          variant === "default" ? "rgba(241,240,235,0.55)" : "rgba(100,232,242,0.8)",
        backgroundColor:
          variant === "view" ? "rgba(100,232,242,0.14)" : "rgba(100,232,242,0.04)",
        mixBlendMode: variant === "default" ? "difference" : "normal"
      }}
    >
      {variant === "view" && label ? (
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan">
          {label}
        </span>
      ) : null}
    </div>
  );
}
