"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin top progress bar tracking overall scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[80] h-[2px] w-full origin-left bg-gradient-to-r from-cyan via-violet to-lime"
    />
  );
}
