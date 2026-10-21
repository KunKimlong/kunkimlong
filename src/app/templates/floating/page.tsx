import type { Metadata } from "next";
import { site } from "@/lib/data";
import { FloatingPortfolio } from "@/components/templates/floating-portfolio";

export const metadata: Metadata = {
  // Same tab title as the Simple home; the favicon tells the templates apart
  title: { absolute: `${site.name} — ${site.role}` },
  description:
    "The portfolio as glass cards floating over a dark, dotted ground.",
  alternates: {
    canonical: "/templates/floating",
  },
};

export default function FloatingTemplatePage() {
  return <FloatingPortfolio />;
}
