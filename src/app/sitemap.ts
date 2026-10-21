import type { MetadataRoute } from "next";
import { blogs } from "@/lib/data";
import { siteUrl } from "@/lib/seo";

// Generated once at build time: the site is a static export (Cloudflare assets)
export const dynamic = "force-static";

// Only the main pages; the /templates designs are noindex, so they are left out
export default function sitemap(): MetadataRoute.Sitemap {
  // blogs is sorted newest first, so the blog index changed when its latest post did
  const latestPost = blogs[0] ? new Date(blogs[0].date) : new Date();

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: latestPost,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogs.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
