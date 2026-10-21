import type { Metadata } from "next";
import type { ReactNode } from "react";

// The templates are alternate designs of the same portfolio and blog. Keep them out of
// search results so they never compete with the main pages; links on them still count.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function TemplatesLayout({ children }: { children: ReactNode }) {
  return children;
}
