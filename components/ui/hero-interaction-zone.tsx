"use client";

import { RotateCcw } from "lucide-react";
import { useRef } from "react";
import { pushDrag, requestReset, setDragging } from "@/components/visuals/scene-state";
import { cn } from "@/lib/utils";

/**
 * Transparent, explicitly-bounded region that lets the visitor directly
 * manipulate the 3D centerpiece. Confining input to this box (with touch-action
 * none only here) means normal page scrolling and clicks are never intercepted.
 * Fully keyboard-operable with visible, labelled controls.
 */
export function HeroInteractionZone({ className }: { className?: string }) {
  const last = useRef<{ x: number; y: number } | null>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    last.current = { x: e.clientX, y: e.clientY };
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!last.current) return;
    const rect = surfaceRef.current?.getBoundingClientRect();
    const w = rect?.width || window.innerWidth;
    const h = rect?.height || window.innerHeight;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    pushDrag((dx / w) * Math.PI * 0.9, (dy / h) * Math.PI * 0.6);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    last.current = null;
    setDragging(false);
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        pushDrag(-0.12, 0);
        break;
      case "ArrowRight":
        e.preventDefault();
        pushDrag(0.12, 0);
        break;
      case "ArrowUp":
        e.preventDefault();
        pushDrag(0, -0.12);
        break;
      case "ArrowDown":
        e.preventDefault();
        pushDrag(0, 0.12);
        break;
      case "Home":
      case "r":
      case "R":
        e.preventDefault();
        requestReset();
        break;
      default:
        break;
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={surfaceRef}
        role="application"
        aria-label="Interactive 3D constellation. Drag or use arrow keys to rotate; press R to reset."
        tabIndex={0}
        data-cursor="link"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        className="h-full w-full touch-none select-none rounded-[32px] outline-none focus-visible:ring-1 focus-visible:ring-cyan/40"
      />

      {/* Keyboard/pointer-accessible controls */}
      <div className="pointer-events-auto absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2">
        <button
          type="button"
          onClick={() => pushDrag(-0.5, 0)}
          aria-label="Rotate constellation left"
          data-cursor="link"
          className="glass-control flex h-9 w-9 items-center justify-center text-ink-dim hover:text-ink"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          onClick={requestReset}
          data-cursor="link"
          className="glass-control inline-flex items-center gap-2 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-dim hover:text-ink"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset view
        </button>
        <button
          type="button"
          onClick={() => pushDrag(0.5, 0)}
          aria-label="Rotate constellation right"
          data-cursor="link"
          className="glass-control flex h-9 w-9 items-center justify-center text-ink-dim hover:text-ink"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
