import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Resume } from "@/components/sections/resume";
import { Contact } from "@/components/sections/contact";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kimlongkun.dev";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: site.email,
  telephone: site.phone,
  url: siteUrl,
  image: `${siteUrl}/images/profile-img.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Phnom Penh",
    addressCountry: "KH",
  },
  sameAs: [site.facebook.url, site.telegram.url],
};

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <About />
        <Resume />
        <Contact />
      </main>
      <SiteFooter />
      <Toaster />
    </div>
  );
}
