"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

/** Thin amber bar along the top edge showing how far down the page the reader is */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  // Template pages (/templates/<name>) are standalone designs with their own progress cues
  const pathname = usePathname();
  if (pathname.startsWith("/templates/")) return null;

  return (
    <motion.div
      aria-hidden
      className="bg-primary fixed inset-x-0 top-0 z-[70] h-0.5 origin-left"
      style={{ scaleX }}
    />
  );
}
