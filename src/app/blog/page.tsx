import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BlogList } from "@/components/blog-list";
import { Reveal } from "@/components/reveal";
import { blogs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles and notes on web development, Laravel, Java Spring, React, DevOps and teaching.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const totalMinutes = blogs.reduce((sum, post) => sum + post.readTime, 0);

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-border border-b pt-16 pb-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <Link
                href="/#blog"
                className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to home
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="text-primary mt-10 block text-xs font-medium tracking-[0.2em] uppercase">
                Thoughts & notes
              </span>
              <h1 className="mt-3 font-serif text-5xl italic sm:text-6xl">
                Blog
              </h1>
              <p className="text-muted-foreground mt-4 max-w-xl text-balance">
                Things I&apos;ve learned building and shipping web applications,
                and from teaching others to do the same.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-8 flex gap-8">
              <div>
                <p className="text-2xl font-semibold">{blogs.length}</p>
                <p className="text-muted-foreground text-xs">Articles</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">{totalMinutes}</p>
                <p className="text-muted-foreground text-xs">
                  Minutes of reading
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {blogs.length > 0 ? (
              <BlogList posts={blogs} />
            ) : (
              <p className="text-muted-foreground text-center">
                No articles yet. Check back soon.
              </p>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
