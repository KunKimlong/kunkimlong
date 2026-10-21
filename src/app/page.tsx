import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Resume } from "@/components/sections/resume";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { Toaster } from "@/components/ui/sonner";
import { jsonLd, personSchema, websiteSchema } from "@/lib/seo";

const schema = {
  "@context": "https://schema.org",
  "@graph": [personSchema, websiteSchema],
};

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(schema)}
      />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <About />
        <Resume />
        <Blog />
        <Contact />
      </main>
      <SiteFooter />
      <Toaster />
    </div>
  );
}
