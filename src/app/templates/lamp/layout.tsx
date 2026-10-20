import type { Metadata } from "next";
import { LampShell } from "@/components/templates/lamp-shell";

// Folded K, replacing the Simple template's icon on every Lamp page
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/icons/k-fold-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/k-fold.svg", type: "image/svg+xml" },
    ],
    apple: "/icons/k-fold-apple.png",
  },
};

// One shell for every Lamp page, so the lamp and its light persist across navigation
export default function LampLayout({
  children,
}: LayoutProps<"/templates/lamp">) {
  return <LampShell>{children}</LampShell>;
}
