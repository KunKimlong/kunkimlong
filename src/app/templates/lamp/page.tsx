import type { Metadata } from "next";
import { LampPortfolio } from "@/components/templates/lamp-portfolio";

export const metadata: Metadata = {
  title: "Lamp template",
  description: "Pull the cord to light up the portfolio.",
  alternates: {
    canonical: "/templates/lamp",
  },
};

export default function LampTemplatePage() {
  return <LampPortfolio />;
}
