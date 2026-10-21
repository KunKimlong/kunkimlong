import type { Metadata } from "next";
import { site } from "@/lib/data";
import { LampPortfolio } from "@/components/templates/lamp-portfolio";

export const metadata: Metadata = {
  // Same tab title as the Simple home; the favicon tells the templates apart
  title: { absolute: `${site.name} — ${site.role}` },
  description: "Pull the cord to light up the portfolio.",
  alternates: {
    canonical: "/templates/lamp",
  },
};

export default function LampTemplatePage() {
  return <LampPortfolio />;
}
