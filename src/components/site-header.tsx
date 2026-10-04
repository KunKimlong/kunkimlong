"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
          href="#home"
          className="text-foreground font-serif text-2xl italic"
          onClick={() => setOpen(false)}
        >
          Kimlong.
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group text-muted-foreground hover:text-foreground relative text-sm transition-colors"
            >
              {link.label}
              <span className="bg-primary absolute -bottom-1 left-0 h-px w-0 transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="bg-primary text-primary-foreground hidden rounded-lg px-5 py-2 text-sm font-medium transition-opacity hover:opacity-90 md:inline-flex"
        >
          Let&apos;s talk
        </a>

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
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg px-3 py-2 text-sm"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-primary text-primary-foreground mt-1 rounded-lg px-3 py-2 text-center text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            Let&apos;s talk
          </a>
        </div>
      </nav>
    </header>
  );
}
