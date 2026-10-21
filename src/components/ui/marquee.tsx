"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Keeps v inside [min, max), so the track loops seamlessly */
function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

type MarqueeProps = {
  children: ReactNode;
  /** Percent of one copy of the content per second; negative runs right to left */
  speed?: number;
  className?: string;
  /** Classes for each copy of the content (gap, padding) */
  rowClassName?: string;
};

/**
 * Endless row that drifts on its own, speeds up while the page scrolls and follows the
 * scroll direction, then eases back. Hovering slows it right down so items can be read.
 * The content is rendered twice; the second copy is hidden from screen readers.
 */
export function Marquee({
  children,
  speed = -2,
  className,
  rowClassName,
}: MarqueeProps) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const boost = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  // 1 while idle, near 0 under the pointer; springs between the two
  const pace = useSpring(1, { stiffness: 120, damping: 20 });
  const direction = useRef(1);

  // Two copies side by side, so shifting by one copy (-50%) lands on an identical frame
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    if (boost.get() < 0) direction.current = -1;
    else if (boost.get() > 0) direction.current = 1;
    let moveBy = direction.current * speed * (delta / 1000);
    moveBy += direction.current * moveBy * boost.get();
    baseX.set(baseX.get() + (moveBy / 2) * pace.get());
  });

  return (
    <div
      className={cn("overflow-hidden", className)}
      onPointerEnter={(e) => e.pointerType === "mouse" && pace.set(0.12)}
      onPointerLeave={() => pace.set(1)}
    >
      <motion.div className="flex w-max" style={{ x }}>
        <div className={cn("flex shrink-0", rowClassName)}>{children}</div>
        <div className={cn("flex shrink-0", rowClassName)} aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
