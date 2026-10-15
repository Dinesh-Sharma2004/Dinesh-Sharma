"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useWebGLSupport } from "@/hooks/use-webgl-support";
import { useSceneDriver } from "@/components/visuals/use-scene-driver";
import { WebglFallback } from "@/components/visuals/webgl-fallback";

const BackgroundScene = dynamic(
  () => import("@/components/visuals/background-scene").then((m) => m.BackgroundScene),
  { ssr: false }
);

/**
 * Persistent background layer, mounted once. Decides between the live WebGL
 * scene and a CSS fallback, and runs the single scroll/pointer driver.
 * Sits behind all content and never intercepts pointer events.
 */
export function BackgroundRoot() {
  useSceneDriver();
  const webgl = useWebGLSupport();
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    setLowPower(coarse || (typeof mem === "number" && mem > 0 && mem <= 4));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: -1 }}
    >
      {webgl === true ? <BackgroundScene lowPower={lowPower} /> : null}
      {webgl === false ? <WebglFallback /> : null}
    </div>
  );
}
