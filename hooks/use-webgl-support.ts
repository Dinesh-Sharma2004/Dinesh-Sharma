"use client";

import { useEffect, useState } from "react";

/**
 * Detects WebGL availability once on mount.
 * Returns `null` while unknown (first render), then `true`/`false`.
 * Also returns false when the device reports very limited memory, so the
 * heavy scene never loads on the weakest hardware.
 */
export function useWebGLSupport(): boolean | null {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");

      if (!gl) {
        setSupported(false);
        return;
      }

      // Bail on extremely memory-constrained devices.
      const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
      if (typeof mem === "number" && mem > 0 && mem < 1) {
        setSupported(false);
        return;
      }

      setSupported(true);
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
