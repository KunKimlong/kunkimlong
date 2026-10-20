"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const EASE_WIPE = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Viewfinder-style corner marks just outside the photo */
const corners = [
  "-top-2 -left-2 border-t border-l",
  "-top-2 -right-2 border-t border-r",
  "-bottom-2 -left-2 border-b border-l",
  "-right-2 -bottom-2 border-r border-b",
];

/**
 * Portrait with an offset frame, corner marks and a caption. It
 * wipes in from the bottom on load and drifts slightly as the hero scrolls away.
 */
export function HeroPortrait({
  src,
  alt,
  name,
  place,
}: {
  src: string;
  alt: string;
  name: string;
  place: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <motion.figure ref={ref} style={{ y }}>
      <div className="relative">
        {/* Offset frame slides out from behind the photo once it has wiped in */}
        <motion.div
          aria-hidden
          className="border-primary/50 absolute inset-0 rounded-2xl border"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: 14, y: 14, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: EASE_OUT }}
        />

        <motion.div
          className="bg-card relative overflow-hidden rounded-2xl"
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE_WIPE }}
        >
          <motion.div
            initial={{ scale: 1.25 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: EASE_OUT }}
          >
            <motion.div style={{ scale: imageScale }}>
              <Image
                src={src}
                alt={alt}
                width={480}
                height={560}
                priority
                className="aspect-[4/5] w-full object-cover"
              />
            </motion.div>
          </motion.div>
          {/* Hairline inset border keeps the photo edge crisp */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 ring-inset" />
        </motion.div>

        {corners.map((position, i) => (
          <motion.span
            key={position}
            aria-hidden
            className={`border-primary absolute h-4 w-4 ${position}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 1.3 + i * 0.06,
              ease: EASE_OUT,
            }}
          />
        ))}
      </div>

      <motion.figcaption
        className="border-border mt-8 flex items-baseline justify-between gap-4 border-t pt-3"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5, ease: EASE_OUT }}
      >
        <span className="text-foreground font-serif text-lg italic">
          {name}
        </span>
        <span className="text-muted-foreground font-mono text-[11px] tracking-[0.15em] uppercase">
          {place}
        </span>
      </motion.figcaption>
    </motion.figure>
  );
}
