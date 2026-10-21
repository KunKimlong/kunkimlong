import type { MetadataRoute } from "next";
import { site } from "@/lib/data";
import { siteDescription } from "@/lib/seo";

// Generated once at build time: the site is a static export (Cloudflare assets)
export const dynamic = "force-static";

// Name, colors and icon used when the site is installed or pinned on a phone
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} Portfolio`,
    short_name: site.name,
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#141414",
    theme_color: "#141414",
    icons: [
      { src: "/icons/k-code.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icons/k-code-apple.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
