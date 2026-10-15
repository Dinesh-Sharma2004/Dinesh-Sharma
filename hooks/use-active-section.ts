"use client";

import { useEffect, useState } from "react";
import { sectionOrder, type SectionId } from "@/data/site";
import { sceneState } from "@/components/visuals/scene-state";

/**
 * Tracks the section currently in view via IntersectionObserver and mirrors its
 * index into the shared scene state (so the background can respond without any
 * per-frame React renders). Returns the active section id for nav highlighting.
 */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const elements = sectionOrder
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible intersecting section.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const id = visible.target.id as SectionId;
        setActive(id);
        const index = sectionOrder.indexOf(id);
        if (index >= 0) sceneState.section = index;
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-20% 0px -30% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}
