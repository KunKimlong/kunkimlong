"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Open/close state for a small nav menu that opens on hover (mouse) and on click
 * (touch, keyboard), and closes on outside click or Escape. Hover opening is what
 * the click right after it would otherwise undo, so a click within moments of a
 * hover-open keeps the menu open instead of toggling it shut.
 */
export function useHoverMenu<T extends HTMLElement>() {
  const [open, setOpen] = useState(false);
  const ref = useRef<T>(null);
  const hoverOpenedAt = useRef(0);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return {
    open,
    close: () => setOpen(false),
    rootProps: {
      ref,
      onPointerEnter: (e: React.PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        hoverOpenedAt.current = performance.now();
        setOpen(true);
      },
      onPointerLeave: (e: React.PointerEvent) => {
        if (e.pointerType === "mouse") setOpen(false);
      },
    },
    triggerProps: {
      "aria-expanded": open,
      "aria-haspopup": true as const,
      onClick: () => {
        if (performance.now() - hoverOpenedAt.current < 600) return;
        setOpen((v) => !v);
      },
    },
  };
}
