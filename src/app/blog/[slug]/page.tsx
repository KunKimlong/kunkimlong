import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BlogCard, formatBlogDate } from "@/components/blog-card";
import { BlogContent } from "@/components/blog-content";
import { Reveal } from "@/components/reveal";
import { blogs, getBlog, site } from "@/lib/data";
import { jsonLd, siteUrl } from "@/lib/seo";

// Only the slugs in blogs.json exist; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlog(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [site.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getBlog(slug);
  if (!post) notFound();

  // Prefer posts sharing a tag, then fill with the newest others
  const others = blogs.filter((other) => other.slug !== post.slug);
  const related = [
    ...others.filter((other) =>
      other.tags.some((tag) => post.tags.includes(tag))
    ),
    ...others.filter(
      (other) => !other.tags.some((tag) => post.tags.includes(tag))
    ),
  ].slice(0, 3);

  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        keywords: post.tags.join(", "),
        timeRequired: `PT${post.readTime}M`,
        inLanguage: "en",
        url: postUrl,
        mainEntityOfPage: postUrl,
        image: `${postUrl}/opengraph-image`,
        author: {
          "@type": "Person",
          "@id": `${siteUrl}/#person`,
          name: site.name,
          url: siteUrl,
        },
        publisher: { "@id": `${siteUrl}/#person` },
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${siteUrl}/blog`,
          },
          { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
        ],
      },
    ],
  };

  return (
    <div className="flex min-h-full flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(schema)}
      />
      <SiteHeader />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 pt-16 pb-20 sm:px-6">
          <Reveal>
            <Link
              href="/blog"
              className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              All articles
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <ul className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="bg-accent/15 text-accent rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <h1 className="mt-5 font-serif text-4xl leading-tight italic sm:text-5xl">
              {post.title}
            </h1>
            <p className="text-muted-foreground mt-5 text-lg text-balance">
              {post.excerpt}
            </p>
            <div className="border-border text-muted-foreground mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-y py-4 text-sm">
              <span className="text-foreground font-medium">{site.name}</span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime} min read
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-10">
            <BlogContent blocks={post.content} />
          </Reveal>

          {post.url && (
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-accent mt-12 inline-flex items-center gap-1.5 text-sm font-medium"
            >
              Also published here
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </article>

        {related.length > 0 && (
          <section className="border-border bg-muted/20 border-t py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className="mb-10 font-serif text-3xl italic">
                More articles
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {related.map((other) => (
                  <BlogCard key={other.slug} post={other} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
