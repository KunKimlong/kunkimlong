"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { site } from "@/lib/data";
import {
  isCurrentTemplate,
  LAMP_BASE,
  navLinks,
  templateHref,
  templates,
} from "@/lib/navigation";
import { Toaster } from "@/components/ui/sonner";
import { useHoverMenu } from "@/components/use-hover-menu";
import { cn } from "@/lib/utils";
import { bricolage } from "@/app/fonts";
import styles from "./lamp-portfolio.module.css";

const BASE = 120;
const MAX_PULL = 80;
const THRESHOLD = 35;
const SWITCH_MS = 1200; // a little longer than the 1.1s reveal in the CSS

/** Same template switcher as the Simple header, styled for the lamp page */
function TemplatesMenu() {
  const { open, close, rootProps, triggerProps } =
    useHoverMenu<HTMLDivElement>();
  const pathname = usePathname();

  return (
    <div {...rootProps} className={styles.menu}>
      <button type="button" {...triggerProps}>
        Templates <span aria-hidden="true">▾</span>
      </button>
      {open && (
        <div className={styles.menuPanel}>
          {templates.map((template) => (
            <Link
              key={template.name}
              href={templateHref(template.base, pathname)}
              aria-current={
                isCurrentTemplate(template.base, pathname) ? "page" : undefined
              }
              onClick={close}
            >
              {template.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/** Phones: sections and templates folded into one menu so the bar fits on one line */
function MobileMenu({
  sectionHref,
}: {
  sectionHref: (href: string) => string;
}) {
  const { open, close, rootProps, triggerProps } =
    useHoverMenu<HTMLDivElement>();
  const pathname = usePathname();

  return (
    <div {...rootProps} className={cn(styles.menu, styles.mobileNav)}>
      <button type="button" {...triggerProps}>
        Menu <span aria-hidden="true">▾</span>
      </button>
      {open && (
        <div className={styles.menuPanel}>
          {navLinks.map((link) => (
            <Link key={link.href} href={sectionHref(link.href)} onClick={close}>
              {link.label}
            </Link>
          ))}
          <span className={styles.menuLabel}>Templates</span>
          {templates.map((template) => (
            <Link
              key={template.name}
              href={templateHref(template.base, pathname)}
              aria-current={
                isCurrentTemplate(template.base, pathname) ? "page" : undefined
              }
              onClick={close}
            >
              {template.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * The lamp room every Lamp page sits in: lamp, pull cord, nav and footer. Rendered by
 * the /templates/lamp layout, so it stays mounted (and the light stays on) while moving
 * between Lamp pages. The home page waits for the cord; inner pages (blog) light up on their own.
 */
export function LampShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const onHome = pathname === LAMP_BASE;
  const autoLight = !onHome;

  const [on, setOn] = useState(false);
  const onRef = useRef(false);
  // True only while the light is switching, so the reveal animates then but a page change
  // (which resizes the light circle to fit the new page) never shows a dark sweep
  const [switching, setSwitching] = useState(false);
  const switchTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  // Gives the sticky header its backing once content scrolls beneath it
  const [scrolled, setScrolled] = useState(false);
  // Shows the back-to-top button once the hero is out of view
  const [farDown, setFarDown] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const cordRef = useRef<HTMLDivElement>(null);
  const stringRef = useRef<HTMLDivElement>(null);
  const siteRef = useRef<HTMLElement>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const drag = useRef({ startY: null as number | null, pull: 0, moved: false });

  // Light radius = distance from the bulb to the farthest corner of the page, kept current as it resizes
  useEffect(() => {
    const el = siteRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      const radius = Math.hypot(el.offsetWidth / 2, el.offsetHeight) + 40;
      el.style.setProperty("--reveal-r", `${Math.ceil(radius)}px`);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // On every Lamp page change. With the light already on, just move to the new page's top
  // (or its #section): the room is our scroll container, so Next's own scroll reset misses it.
  // Otherwise inner pages, and arrivals on a section link (/templates/lamp#contact), switch
  // the light on by themselves shortly after load so the reveal still plays.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (onRef.current) {
      if (target) target.scrollIntoView();
      else rootRef.current?.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    if (!autoLight && !target) return;
    const timer = setTimeout(
      () => {
        onRef.current = true;
        setOn(true);
        setSwitching(true);
        clearTimeout(switchTimer.current);
        switchTimer.current = setTimeout(() => setSwitching(false), SWITCH_MS);
        target?.scrollIntoView();
      },
      target ? 0 : 450
    );
    return () => clearTimeout(timer);
  }, [pathname, autoLight]);

  const setLen = (px: number) =>
    stringRef.current?.style.setProperty("--len", `${px}px`);
  const setStringTransition = (value: string) => {
    if (stringRef.current) stringRef.current.style.transition = value;
  };

  function click(pitch: number) {
    try {
      audioRef.current ??= new AudioContext();
      const ctx = audioRef.current;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.value = pitch;
      g.gain.setValueAtTime(0.12, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.07);
    } catch {}
  }

  function toggle() {
    // Read from a ref so the sound and scroll run once (setState updaters run twice in dev)
    const next = !onRef.current;
    onRef.current = next;
    setSwitching(true);
    clearTimeout(switchTimer.current);
    switchTimer.current = setTimeout(() => setSwitching(false), SWITCH_MS);
    if (next) {
      setOn(true);
    } else {
      // A lit page has no clip-path, and "none" can't animate. Let `switching` put the
      // full circle back for a frame first, then remove `on` so it shrinks to the bulb.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setOn(false);
          rootRef.current?.scrollTo({ top: 0, behavior: "instant" });
        })
      );
    }
    click(next ? 1600 : 1100);
  }

  function release() {
    setStringTransition("height .3s cubic-bezier(.3,1.7,.5,1)");
    setLen(BASE);
    const cord = cordRef.current;
    if (!cord) return;
    // Restart the sway animation even if it is mid-run
    cord.classList.remove(styles.sway);
    void cord.offsetWidth;
    cord.classList.add(styles.sway);
  }

  function quickPull() {
    setStringTransition("height .12s ease-in");
    setLen(BASE + 50);
    setTimeout(() => {
      toggle();
      release();
    }, 120);
  }

  // On the lamp home, section links stay on the page; elsewhere they lead back to it
  const sectionHref = (href: string) =>
    onHome ? href.slice(1) : `${LAMP_BASE}${href.slice(1)}`;

  return (
    <div
      ref={rootRef}
      className={cn(
        bricolage.variable,
        styles.root,
        on && styles.on,
        switching && styles.switching,
        scrolled && styles.scrolled
      )}
      onScroll={(e) => {
        const top = e.currentTarget.scrollTop;
        setScrolled(top > 8);
        setFarDown(top > 600);
      }}
    >
      {/* The lit page has its own in the nav, so this one only lives in the dark */}
      <div className={styles.darkTemplates} inert={on}>
        <TemplatesMenu />
      </div>

      {/* Beam and cord live inside the lamp so they hang from the shade and swing with it */}
      <div className={styles.lamp}>
        <div className={styles.wire} aria-hidden="true" />
        <div className={styles.canopy} aria-hidden="true" />
        <div className={styles.shade} aria-hidden="true">
          <div className={styles.bulb} />
        </div>
        <div className={styles.beam} aria-hidden="true" />

        <div
          ref={cordRef}
          className={styles.cord}
          role="switch"
          aria-checked={on}
          aria-label={
            on ? "Pull to turn off the light" : "Pull to turn on the light"
          }
          tabIndex={0}
          onPointerDown={(e) => {
            drag.current = { startY: e.clientY, pull: 0, moved: false };
            setStringTransition("none");
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (d.startY === null) return;
            d.pull = Math.max(0, Math.min(MAX_PULL, e.clientY - d.startY));
            if (d.pull > 4) d.moved = true;
            setLen(BASE + d.pull);
          }}
          onPointerUp={() => {
            const d = drag.current;
            if (d.startY === null) return;
            if (!d.moved) quickPull();
            else if (d.pull >= THRESHOLD) {
              toggle();
              release();
            } else release();
            d.startY = null;
          }}
          onPointerCancel={() => {
            drag.current.startY = null;
            release();
          }}
          onKeyDown={(e) => {
            if (["Enter", " ", "ArrowDown"].includes(e.key)) {
              e.preventDefault();
              quickPull();
            }
          }}
        >
          <div ref={stringRef} className={styles.string} />
          <div className={styles.handle} />
        </div>
      </div>
      <div className={styles.hintLabel}>Pull to turn on</div>

      {/* Outside <main>: the reveal's clip-path would trap its menus under the lamp */}
      <header className={styles.topbar} inert={!on}>
        <div className={styles.topbarBar}>
          <div className={cn(styles.wrap, styles.topbarInner)}>
            <Link href={sectionHref("/#home")} className={styles.brand}>
              Kimlong.
            </Link>
            <nav className={styles.desktopNav}>
              {/* Same sections as the Simple header */}
              {navLinks.map((link) => (
                <Link key={link.href} href={sectionHref(link.href)}>
                  {link.label}
                </Link>
              ))}
              <TemplatesMenu />
            </nav>
            <MobileMenu sectionHref={sectionHref} />
          </div>
        </div>
      </header>

      <main ref={siteRef} className={styles.site} inert={!on}>
        <div className={cn(styles.wrap, styles.stagger)}>
          {children}

          <footer className={styles.footer}>
            © {new Date().getFullYear()} {site.name}. Pull the cord again to
            switch off.
          </footer>
        </div>
      </main>

      {/* Outside <main> too, so the clip-path never hides it */}
      <button
        type="button"
        className={cn(styles.toTop, on && farDown && styles.toTopShown)}
        aria-label="Back to top"
        tabIndex={on && farDown ? 0 : -1}
        onClick={() => {
          const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches;
          rootRef.current?.scrollTo({
            top: 0,
            behavior: reduce ? "instant" : "smooth",
          });
        }}
      >
        ↑
      </button>
      <Toaster />
    </div>
  );
}
