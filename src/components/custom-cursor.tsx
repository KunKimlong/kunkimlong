"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Mode = "default" | "hover" | "text" | "label" | "stick";

type CursorState = {
  mode: Mode;
  label?: string;
  width?: number;
  height?: number;
  radius?: number;
};

const INTERACTIVE =
  'a, button, [role="button"], label, summary, select, [data-cursor], [data-cursor-label]';
const TEXT_FIELD =
  'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]):not([type="range"]), textarea, [contenteditable="true"]';

/** Small targets (icon buttons, social links) get the ring wrapped around them automatically */
const AUTO_STICK_SIZE = 56;
const STICK_PADDING = 10;
/** How far a stuck ring follows the pointer away from the element's center */
const MAGNET_PULL = 0.18;

const RING_SIZE: Record<
  Exclude<Mode, "stick">,
  { width: number; height: number }
> = {
  default: { width: 34, height: 34 },
  hover: { width: 60, height: 60 },
  label: { width: 84, height: 84 },
  text: { width: 3, height: 26 },
};

function resolveState(target: EventTarget | null): {
  state: CursorState;
  el: HTMLElement | null;
} {
  if (!(target instanceof Element))
    return { state: { mode: "default" }, el: null };

  const field = target.closest<HTMLElement>(TEXT_FIELD);
  if (field) return { state: { mode: "text" }, el: field };

  const el = target.closest<HTMLElement>(INTERACTIVE);
  if (!el || el.closest('[aria-disabled="true"], :disabled')) {
    return { state: { mode: "default" }, el: null };
  }

  const label = el.dataset.cursorLabel;
  if (label) return { state: { mode: "label", label }, el };

  const rect = el.getBoundingClientRect();
  const small = rect.width <= AUTO_STICK_SIZE && rect.height <= AUTO_STICK_SIZE;
  if (el.dataset.cursor === "stick" || small) {
    const radius = parseFloat(getComputedStyle(el).borderRadius) || 0;
    return {
      state: {
        mode: "stick",
        width: rect.width + STICK_PADDING * 2,
        height: rect.height + STICK_PADDING * 2,
        radius: radius === 0 ? 12 : radius + STICK_PADDING / 2,
      },
      el,
    };
  }

  return { state: { mode: "hover" }, el };
}

/**
 * Dot + trailing ring cursor. The ring grows over links, wraps around small or
 * `data-cursor="stick"` targets with a slight magnetic pull, shows a caption for
 * `data-cursor-label="..."` and turns into a bar over text fields. Only mounts for
 * fine pointers without reduced-motion, so touch devices keep the native behavior.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [state, setState] = useState<CursorState>({ mode: "default" });
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  const hoveredRef = useRef<HTMLElement | null>(null);
  const modeRef = useRef<Mode>("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringTargetX = useMotionValue(-100);
  const ringTargetY = useMotionValue(-100);
  const ringX = useSpring(ringTargetX, {
    stiffness: 380,
    damping: 32,
    mass: 0.6,
  });
  const ringY = useSpring(ringTargetY, {
    stiffness: 380,
    damping: 32,
    mass: 0.6,
  });

  useEffect(() => {
    const query = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Template pages (/templates/<name>) are standalone designs, so they keep the native cursor
  const pathname = usePathname();
  const active = enabled && !pathname.startsWith("/templates/");

  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    function placeRing(x: number, y: number) {
      const el = hoveredRef.current;
      if (modeRef.current === "stick" && el) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        ringTargetX.set(cx + (x - cx) * MAGNET_PULL);
        ringTargetY.set(cy + (y - cy) * MAGNET_PULL);
      } else {
        ringTargetX.set(x);
        ringTargetY.set(y);
      }
    }

    function onMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);

      const { state: next, el } = resolveState(e.target);
      if (el !== hoveredRef.current || next.mode !== modeRef.current) {
        hoveredRef.current = el;
        modeRef.current = next.mode;
        setState(next);
      }
      placeRing(e.clientX, e.clientY);
    }

    // Elements move under a still pointer while scrolling, so re-resolve what is hovered
    function onScroll() {
      const x = mouseX.get();
      const y = mouseY.get();
      const { state: next, el } = resolveState(document.elementFromPoint(x, y));
      if (el !== hoveredRef.current || next.mode !== modeRef.current) {
        hoveredRef.current = el;
        modeRef.current = next.mode;
        setState(next);
      }
      placeRing(x, y);
    }

    function onDown(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      setPressed(true);
      setRipples((r) => [
        ...r,
        { id: e.timeStamp, x: e.clientX, y: e.clientY },
      ]);
    }

    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    root.addEventListener("mouseleave", onLeave);
    root.addEventListener("mouseenter", onEnter);
    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("scroll", onScroll);
      root.removeEventListener("mouseleave", onLeave);
      root.removeEventListener("mouseenter", onEnter);
    };
  }, [active, mouseX, mouseY, ringTargetX, ringTargetY]);

  if (!active) return null;

  const { mode } = state;
  const size =
    mode === "stick"
      ? { width: state.width!, height: state.height! }
      : RING_SIZE[mode];
  const showDot = mode === "default" || mode === "hover";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="border-primary absolute top-0 left-0 rounded-full border"
            style={{
              x: r.x,
              y: r.y,
              width: 24,
              height: 24,
              marginLeft: -12,
              marginTop: -12,
            }}
            initial={{ scale: 0.4, opacity: 0.8 }}
            animate={{ scale: 3.2, opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            onAnimationComplete={() =>
              setRipples((all) => all.filter((p) => p.id !== r.id))
            }
          />
        ))}
      </AnimatePresence>

      {/* Ring */}
      <motion.div
        className="absolute top-0 left-0"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="relative flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden"
          initial={false}
          animate={{
            ...size,
            opacity: visible ? 1 : 0,
            scale: pressed ? 0.85 : 1,
            borderRadius:
              mode === "stick" ? state.radius! : mode === "text" ? 2 : 999,
            borderWidth: mode === "text" || mode === "label" ? 0 : 1.5,
          }}
          transition={{
            type: "spring",
            stiffness: 420,
            damping: 30,
            mass: 0.7,
          }}
          style={{ borderStyle: "solid", borderColor: "var(--primary)" }}
        >
          {/* Fill fades via opacity: framer-motion can't interpolate color-mix() */}
          <motion.span
            className="bg-primary absolute inset-0"
            initial={false}
            animate={{
              opacity:
                mode === "label" || mode === "text"
                  ? 1
                  : mode === "default"
                    ? 0
                    : 0.14,
            }}
            transition={{ duration: 0.2 }}
          />
          <AnimatePresence>
            {mode === "label" && (
              <motion.span
                key={state.label}
                className="text-primary-foreground relative text-xs font-semibold tracking-wide whitespace-nowrap uppercase"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.18 }}
              >
                {state.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Dot: follows the pointer exactly so aiming stays precise */}
      <motion.div
        className="absolute top-0 left-0"
        style={{ x: mouseX, y: mouseY }}
      >
        <motion.div
          className="bg-primary h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          initial={false}
          animate={{ scale: visible && showDot ? (pressed ? 0.6 : 1) : 0 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </div>
  );
}
