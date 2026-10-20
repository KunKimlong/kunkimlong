"use client";

import { useEffect, useState } from "react";

/**
 * Feeds pointer coordinates to CSS: `--x`/`--y` on the hovered `.spotlight` card drive
 * its inner highlight (see globals.css). Mouse only and skipped for reduced motion,
 * like the cursor.
 */
export function PointerSpotlight() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    let last: PointerEvent | null = null;

    function apply() {
      frame = 0;
      if (!last) return;
      const card =
        last.target instanceof Element
          ? last.target.closest<HTMLElement>(".spotlight")
          : null;
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--x", `${last.clientX - rect.left}px`);
        card.style.setProperty("--y", `${last.clientY - rect.top}px`);
      }
    }

    function onMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return null;
}
