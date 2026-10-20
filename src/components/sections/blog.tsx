import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogs } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { BlogCard } from "@/components/blog-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

const previewCount = 3;

export function Blog() {
  if (blogs.length === 0) return null;

  return (
    <section id="blog" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Thoughts & notes" title="Blog" />
        </Reveal>

        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.slice(0, previewCount).map((post) => (
            <RevealItem key={post.slug} className="h-full">
              <BlogCard post={post} />
            </RevealItem>
          ))}
        </RevealGroup>

        {blogs.length > previewCount && (
          <Reveal className="mt-12 flex justify-center">
            <Link
              href="/blog"
              className="group border-border text-foreground hover:bg-muted inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium transition-colors active:scale-95"
            >
              View more
              <span className="text-muted-foreground">({blogs.length})</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
