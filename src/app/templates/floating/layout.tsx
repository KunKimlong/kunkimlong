import type { Metadata } from "next";
import { FloatingShell } from "@/components/templates/floating-shell";

// Floating glass K, replacing the Simple template's icon on every Floating page
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/icons/k-float-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/k-float.svg", type: "image/svg+xml" },
    ],
    apple: "/icons/k-float-apple.png",
  },
};

// One shell for every Floating page, so the nav and dock stay put across navigation
export default function FloatingLayout({
  children,
}: LayoutProps<"/templates/floating">) {
  return <FloatingShell>{children}</FloatingShell>;
}
