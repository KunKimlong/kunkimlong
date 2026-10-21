import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { blogs, getBlog, site } from "@/lib/data";
import { siteUrl } from "@/lib/seo";

// Generated once at build time: the site is a static export (Cloudflare assets)
export const dynamic = "force-static";

// Link-preview card for each article: its title, tags and reading time
export const alt = "Article by Kimlong KUN";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const amber = "#F08A3C";

export function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlog(slug);
  const photo = await readFile(
    join(process.cwd(), "public", site.photo),
    "base64"
  );
  const title = post?.title ?? "Blog";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#141414",
        backgroundImage: `radial-gradient(circle at 90% 10%, rgba(240,138,60,0.2), transparent 40%)`,
        color: "#F2F2F2",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: amber,
          }}
        >
          {post ? `Blog · ${post.readTime} min read` : "Blog"}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: title.length > 60 ? 60 : 72,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        {post && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 32,
            }}
          >
            {post.tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "8px 18px",
                  borderRadius: 999,
                  background: "rgba(240,138,60,0.15)",
                  color: amber,
                  fontSize: 24,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
        <img
          src={`data:image/jpeg;base64,${photo}`}
          alt=""
          width={72}
          height={72}
          style={{
            borderRadius: 999,
            objectFit: "cover",
            border: `3px solid ${amber}`,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#9E9E9E" }}>
            {siteUrl.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    </div>,
    size
  );
}
