import type { Metadata } from "next";
import { site } from "@/lib/data";
import { siteDescription, siteTitle, siteUrl } from "@/lib/seo";
import { geistSans, geistMono, instrumentSerif } from "./fonts";
import "./globals.css";
import { InspectGuard } from "@/components/inspect-guard";
import { CustomCursor } from "@/components/custom-cursor";
import { PointerSpotlight } from "@/components/pointer-spotlight";
import { MotionProvider } from "@/components/motion-provider";
import { ScrollProgress } from "@/components/scroll-progress";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${site.name}`,
  },
  description: siteDescription,
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
  // Share images come from the opengraph-image.tsx files (site card, one per article)
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: `${site.name} Portfolio`,
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  // Google Search Console ownership check; set the token in the hosting env, not here
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
  // Code-lines K; the Lamp and Floating templates swap in their own in their layouts
  icons: {
    icon: [
      { url: "/icons/k-code-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/k-code.svg", type: "image/svg+xml" },
    ],
    apple: "/icons/k-code-apple.png",
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
      <body className="flex min-h-full flex-col">
        <MotionProvider>
          <ScrollProgress />
          {children}
        </MotionProvider>
        <InspectGuard />
        <CustomCursor />
        <PointerSpotlight />
      </body>
    </html>
  );
}
