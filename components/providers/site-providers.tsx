"use client";

import { MotionConfig } from "framer-motion";

/** App-wide motion config. Reduced-motion is honored at the framer level, and
 *  reinforced by CSS and the scene's own reduced-motion branches. */
export function SiteProviders({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
