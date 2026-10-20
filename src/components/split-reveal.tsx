"use client";

import { motion } from "framer-motion";

/**
 * Text that rises into view piece by piece from behind a mask. Splits by word for
 * headings or by character for short display text such as a name. Screen readers get
 * the plain text through aria-label.
 */
export function SplitReveal({
  text,
  by = "word",
  delay = 0,
  stagger,
  className,
}: {
  text: string;
  by?: "word" | "char";
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  const words = text.split(" ");
  const step = stagger ?? (by === "char" ? 0.035 : 0.08);
  let index = 0;

  return (
    <motion.span
      aria-label={text}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {words.map((word, w) => (
        <span key={w} aria-hidden>
          {/* Padding keeps italic overhang and descenders from being clipped by the mask */}
          <span className="-mb-[0.15em] inline-block overflow-hidden pr-[0.06em] pb-[0.15em] align-bottom">
            {(by === "char" ? Array.from(word) : [word]).map((piece, p) => {
              const i = index++;
              return (
                <motion.span
                  key={p}
                  className="inline-block"
                  variants={{
                    hidden: { y: "110%" },
                    show: { y: "0%" },
                  }}
                  transition={{
                    duration: 0.7,
                    delay: delay + i * step,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {piece}
                </motion.span>
              );
            })}
          </span>
          {w < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}
