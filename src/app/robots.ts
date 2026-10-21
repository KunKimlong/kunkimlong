import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

// Generated once at build time: the site is a static export (Cloudflare assets)
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The contact form endpoint has nothing to index
      disallow: "/api/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
