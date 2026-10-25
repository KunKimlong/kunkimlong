"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp, ChevronDown, Mail, Menu, Phone, Send, X } from "lucide-react";
import { site } from "@/lib/data";
import {
  FLOATING_BASE,
  isCurrentTemplate,
  navLinks,
  templateHref,
  templates,
} from "@/lib/navigation";
import { FacebookIcon } from "@/components/icons/facebook-icon";
import { LinkedinIcon } from "@/components/icons/linkedin-icon";
import { Toaster } from "@/components/ui/sonner";
import { useHoverMenu } from "@/components/use-hover-menu";
import { cn } from "@/lib/utils";
import { plexMono, spaceGrotesk } from "@/app/fonts";
import { Dock } from "./floating-motion";
import styles from "./floating-portfolio.module.css";

const telHref = `tel:${site.phone.replace(/\(0\)|[^\d+]/g, "")}`;

const dockItems = [
  {
    href: site.telegram.url,
    label: "Telegram",
    icon: <Send aria-hidden="true" />,
    external: true,
  },
  {
    href: site.facebook.url,
    label: "Facebook",
    icon: <FacebookIcon />,
    external: true,
  },
  {
    href: site.linkedin.url,
    label: "LinkedIn",
    icon: <LinkedinIcon />,
    external: true,
  },
  { href: telHref, label: "Phone", icon: <Phone aria-hidden="true" /> },
  {
    href: `mailto:${site.email}`,
    label: "Email",
    icon: <Mail aria-hidden="true" />,
  },
];

/** Glass panel that unfolds from its trigger, its links arriving one after another */
function MenuPanel({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.menuPanel}
          initial={{ opacity: 0, y: -10, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        >
          <motion.div
            className={styles.menuList}
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.04 } } }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const itemVariants = {
  hidden: { opacity: 0, x: 12 },
  show: { opacity: 1, x: 0 },
};

/** Links shared by the desktop templates menu and the phone menu */
function TemplateLinks({ onPick }: { onPick: () => void }) {
  const pathname = usePathname();
  return templates.map((template) => (
    <motion.div key={template.name} variants={itemVariants}>
      <Link
        href={templateHref(template.base, pathname)}
        aria-current={
          isCurrentTemplate(template.base, pathname) ? "page" : undefined
        }
        onClick={onPick}
      >
        {template.name}
      </Link>
    </motion.div>
  ));
}

/** Same template switcher as the Simple header, as a floating glass panel */
function TemplatesMenu() {
  const { open, close, rootProps, triggerProps } =
    useHoverMenu<HTMLDivElement>();

  return (
    <div {...rootProps} className={styles.menu}>
      <button type="button" {...triggerProps} className={styles.navLink}>
        Templates
        <ChevronDown
          aria-hidden="true"
          className={cn(styles.chevron, open && styles.chevronOpen)}
        />
      </button>
      <MenuPanel open={open}>
        <TemplateLinks onPick={close} />
      </MenuPanel>
    </div>
  );
}

/** Phones: sections and templates folded into one menu so the pill fits on one line */
function MobileMenu({
  sectionHref,
}: {
  sectionHref: (href: string) => string;
}) {
  const { open, close, rootProps, triggerProps } =
    useHoverMenu<HTMLDivElement>();

  return (
    <div {...rootProps} className={cn(styles.menu, styles.mobileNav)}>
      <button
        type="button"
        {...triggerProps}
        aria-label="Toggle menu"
        className={styles.menuToggle}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <MenuPanel open={open}>
        {navLinks.map((link) => (
          <motion.div key={link.href} variants={itemVariants}>
            <Link href={sectionHref(link.href)} onClick={close}>
              {link.label}
            </Link>
          </motion.div>
        ))}
        <motion.span className={styles.menuLabel} variants={itemVariants}>
          Templates
        </motion.span>
        <TemplateLinks onPick={close} />
      </MenuPanel>
    </div>
  );
}

/**
 * Frame for every Floating page: a pill nav that drops in and hovers at the top, a
 * contact dock that magnifies at the bottom, and a dotted ground lit by the pointer.
 */
export function FloatingShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const onHome = pathname === FLOATING_BASE;
  const [scrolled, setScrolled] = useState(false);
  // Shows the back-to-top button once the hero is out of view
  const [farDown, setFarDown] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setFarDown(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section crosses the middle band of the viewport (only on the home page)
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(2)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      setActive(null);
    };
  }, [pathname]);

  // On the floating home, section links stay on the page; elsewhere they lead back to it
  const sectionHref = (href: string) =>
    onHome ? href.slice(1) : `${FLOATING_BASE}${href.slice(1)}`;

  // The glass bubble sits on the hovered link, else on the section in view
  const highlighted = hovered ?? active;

  return (
    <div
      className={cn(spaceGrotesk.variable, plexMono.variable, styles.root)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        e.currentTarget.style.setProperty("--mx", `${e.clientX}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY}px`);
      }}
    >
      <header className={styles.topbar}>
        <motion.nav
          aria-label="Primary"
          className={cn(styles.pill, scrolled && styles.pillScrolled)}
          initial={{ y: -120, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 110, damping: 15 }}
        >
          <span className={styles.glassShine} aria-hidden="true" />
          <Link href={sectionHref("/#home")} className={styles.brand}>
            Kimlong<span className={styles.brandDot}>.</span>
          </Link>

          <div
            className={styles.desktopNav}
            onPointerLeave={() => setHovered(null)}
          >
            {navLinks.map((link) => {
              const id = link.href.slice(2);
              return (
                <Link
                  key={link.href}
                  href={sectionHref(link.href)}
                  aria-current={active === id ? "location" : undefined}
                  className={styles.navLink}
                  onPointerEnter={() => setHovered(id)}
                >
                  {highlighted === id && (
                    // Shared layoutId slides the bubble between links
                    <motion.span
                      layoutId="floating-nav-bubble"
                      className={styles.bubble}
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className={styles.navText}>{link.label}</span>
                </Link>
              );
            })}
            <TemplatesMenu />
          </div>

          <div className={styles.navEnd}>
            <MobileMenu sectionHref={sectionHref} />
            <Link href={sectionHref("/#contact")} className={styles.hire}>
              <span className={styles.hireDot} aria-hidden="true" />
              Let&apos;s talk
            </Link>
          </div>

          <motion.span
            className={styles.progress}
            style={{ scaleX: progress }}
            aria-hidden="true"
          />
        </motion.nav>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} {site.name}. Built to float.
      </footer>

      <Dock items={dockItems} />
      <button
        type="button"
        className={cn(styles.toTop, farDown && styles.toTopShown)}
        aria-label="Back to top"
        tabIndex={farDown ? 0 : -1}
        onClick={() => {
          const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches;
          window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
        }}
      >
        <ArrowUp aria-hidden="true" />
      </button>
      <Toaster />
    </div>
  );
}
