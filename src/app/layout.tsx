import type { Metadata } from "next";
import { site } from "@/lib/data";
import { geistSans, geistMono, instrumentSerif } from "./fonts";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kimlongkun.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.about,
  keywords: [
    "Kimlong KUN",
    "Web Developer",
    "Full-Stack Developer",
    "Laravel Developer",
    "Java Spring Developer",
    "React Developer",
    "Angular Developer",
    "Cambodia Developer",
    "Phnom Penh Developer",
    "Portfolio",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  applicationName: `${site.name} Portfolio`,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: `${site.name} Portfolio`,
    title: `${site.name} — ${site.role}`,
    description: site.about,
    locale: "en_US",
    images: [
      {
        url: "/images/profile-img.jpg",
        width: 800,
        height: 800,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.about,
    images: ["/images/profile-img.jpg"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  category: "technology",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
