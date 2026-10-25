"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/** Round button in the bottom-right corner that appears once the hero is out of view */
export function ScrollToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Template pages (/templates/<name>) bring their own, styled to match
  const pathname = usePathname();
  if (pathname.startsWith("/templates/")) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      tabIndex={shown ? 0 : -1}
      onClick={() => {
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
      }}
      className={cn(
        "border-border bg-background/80 text-foreground hover:border-primary hover:text-primary focus-visible:ring-primary fixed right-[max(20px,env(safe-area-inset-right))] bottom-[max(20px,env(safe-area-inset-bottom))] z-50 flex h-11 w-11 items-center justify-center rounded-full border shadow-lg backdrop-blur transition-[opacity,transform,visibility,color,border-color] duration-300 focus-visible:ring-2 focus-visible:outline-none motion-reduce:transition-none",
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none invisible translate-y-3 opacity-0"
      )}
    >
      <ArrowUp aria-hidden="true" className="h-5 w-5" />
    </button>
  );
}
