import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/data";
import { siteTitle } from "@/lib/seo";

// Generated once at build time: the site is a static export (Cloudflare assets)
export const dynamic = "force-static";

// Link-preview card for the site (Open Graph, X/Twitter, LinkedIn, Telegram, ...)
export const alt = siteTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const amber = "#F08A3C";
const stack = ["Laravel", "Java Spring", "React", "Angular", "Next.js"];

export default async function Image() {
  const photo = await readFile(
    join(process.cwd(), "public", site.photo),
    "base64"
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#141414",
        backgroundImage: `radial-gradient(circle at 85% 20%, rgba(240,138,60,0.22), transparent 45%)`,
        color: "#F2F2F2",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: amber,
          }}
        >
          Portfolio · Phnom Penh, Cambodia
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -3,
            lineHeight: 1,
          }}
        >
          {site.name}
          <span style={{ color: amber }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 40,
            color: "#BDBDBD",
          }}
        >
          {site.role}
        </div>
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 44 }}
        >
          {stack.map((name) => (
            <div
              key={name}
              style={{
                display: "flex",
                padding: "10px 20px",
                borderRadius: 999,
                border: "2px solid #333333",
                background: "#1E1E1E",
                fontSize: 24,
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
      <img
        src={`data:image/jpeg;base64,${photo}`}
        alt=""
        width={340}
        height={340}
        style={{
          borderRadius: 48,
          border: `6px solid ${amber}`,
          objectFit: "cover",
        }}
      />
    </div>,
    size
  );
}
