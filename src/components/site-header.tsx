"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useHoverMenu } from "@/components/use-hover-menu";
import {
  isCurrentTemplate,
  navLinks,
  templateHref,
  templates,
} from "@/lib/navigation";

/** Desktop "Templates" item: opens on hover or click, closes on outside click or Escape */
function TemplatesMenu() {
  const { open, close, rootProps, triggerProps } =
    useHoverMenu<HTMLDivElement>();
  const pathname = usePathname();

  return (
    <div {...rootProps} className="relative">
      <button
        type="button"
        {...triggerProps}
        className={cn(
          "hover:text-foreground flex items-center gap-1 text-sm transition-colors",
          open ? "text-foreground" : "text-muted-foreground"
        )}
      >
        Templates
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          // pt-3 bridges the gap so the menu stays open while the mouse moves down to it
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 w-40 -translate-x-1/2 pt-3"
          >
            <div
              className="border-border bg-background rounded-xl border p-1.5 shadow-xl"
              onClick={close}
            >
              {templates.map((template) => {
                const current = isCurrentTemplate(template.base, pathname);
                return (
                  <Link
                    key={template.name}
                    href={templateHref(template.base, pathname)}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "hover:bg-muted hover:text-foreground block rounded-lg px-3 py-2 text-sm",
                      current ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {template.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled ? "border-border bg-background/95" : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/#home"
          className="text-foreground font-serif text-2xl italic"
          onClick={() => setOpen(false)}
        >
          Kimlong.
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(2);
            return (
              <Link
                key={link.href}
                href={link.href}
                data-cursor="stick"
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "group hover:text-foreground relative text-sm transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {link.label}
                <span className="bg-primary absolute -bottom-1 left-0 h-px w-0 transition-all duration-200 group-hover:w-full" />
                {/* Shared layoutId makes the underline slide between links as sections change */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="bg-primary absolute -bottom-1 left-0 h-px w-full"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
          <TemplatesMenu />
        </nav>

        <Link
          href="/#contact"
          data-cursor="stick"
          className="bg-primary text-primary-foreground hidden rounded-lg px-5 py-2 text-sm font-medium transition-opacity hover:opacity-90 md:inline-flex"
        >
          Let&apos;s talk
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          className="border-border text-foreground flex h-10 w-10 items-center justify-center rounded-full border md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <nav
        className={cn(
          "border-border bg-background grid overflow-hidden border-t transition-all duration-300 md:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="flex flex-col gap-1 overflow-hidden px-4 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg px-3 py-2 text-sm"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <span className="text-muted-foreground px-3 pt-2 pb-1 text-xs tracking-wide uppercase">
            Templates
          </span>
          {templates.map((template) => (
            <Link
              key={template.name}
              href={templateHref(template.base, pathname)}
              className={cn(
                "hover:bg-muted hover:text-foreground border-border ml-3 rounded-lg border-l px-3 py-2 text-sm",
                isCurrentTemplate(template.base, pathname)
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
              onClick={() => setOpen(false)}
            >
              {template.name}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="bg-primary text-primary-foreground mt-1 rounded-lg px-3 py-2 text-center text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            Let&apos;s talk
          </Link>
        </div>
      </nav>
    </header>
  );
}
