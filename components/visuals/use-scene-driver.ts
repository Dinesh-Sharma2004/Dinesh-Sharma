"use client";

import { useEffect } from "react";
import { sceneState } from "@/components/visuals/scene-state";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Mounted once. Feeds scroll + pointer + capability data into the shared scene
 * state through a single scroll listener and a single rAF-throttled pointer
 * handler — no React re-renders. Returns nothing; the Canvas reads sceneState.
 */
export function useSceneDriver() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    sceneState.reducedMotion = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    // Low-power heuristic: coarse pointer (touch) or small memory footprint.
    const coarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    sceneState.lowPower = coarse || (typeof mem === "number" && mem > 0 && mem <= 4);

    let ticking = false;

    const readScroll = () => {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const raw = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      sceneState.rawProgress = raw;

      const vh = window.innerHeight || 1;
      sceneState.heroVisible = Math.min(1, Math.max(0, 1 - window.scrollY / (vh * 0.9)));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(readScroll);
      }
    };

    let pointerQueued = false;
    const onPointerMove = (event: PointerEvent) => {
      if (pointerQueued) return;
      pointerQueued = true;
      requestAnimationFrame(() => {
        pointerQueued = false;
        sceneState.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
        sceneState.pointerY = (event.clientY / window.innerHeight) * 2 - 1;
      });
    };

    readScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", readScroll);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", readScroll);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);
}
