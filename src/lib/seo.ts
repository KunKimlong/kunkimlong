import { education, experiences, site, skillGroups } from "./data";

// Base URL for canonical links, Open Graph, the sitemap and robots.txt
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kimlongkun.dev";

// ~155 characters, so search results show it whole
export const siteDescription =
  "Kimlong KUN is a full-stack web developer in Phnom Penh, Cambodia, building fast, reliable web apps with Laravel, Java Spring, React, Angular and Next.js.";

export const siteTitle = `${site.name} — ${site.role}`;

/**
 * JSON-LD for a <script type="application/ld+json">. Escapes "<" so a value can never
 * close the script tag early (per the Next.js JSON-LD guide).
 */
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

const currentJob = experiences.find((job) => job.endY === null);

// The person behind the site; other schemas point at it by @id
export const personSchema = {
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: site.name,
  jobTitle: site.role,
  description: siteDescription,
  email: `mailto:${site.email}`,
  telephone: site.phone,
  url: siteUrl,
  image: `${siteUrl}${site.photo}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Phnom Penh",
    addressCountry: "KH",
  },
  ...(currentJob && {
    worksFor: { "@type": "Organization", name: currentJob.company },
  }),
  alumniOf: education.map((item) => ({
    "@type": "EducationalOrganization",
    name: item.place,
  })),
  knowsAbout: skillGroups
    .filter((group) => group.type !== "Spoken Language")
    .flatMap((group) => group.skills.map((skill) => skill.name)),
  knowsLanguage: ["Khmer", "English"],
  sameAs: [site.linkedin.url, site.facebook.url, site.telegram.url],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: `${site.name} Portfolio`,
  description: siteDescription,
  inLanguage: "en",
  publisher: { "@id": `${siteUrl}/#person` },
};
