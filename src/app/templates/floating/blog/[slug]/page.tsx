import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FloatingArticle,
  FloatingPostList,
} from "@/components/templates/floating-blog";
import { formatBlogDate } from "@/components/blog-card";
import styles from "@/components/templates/floating-portfolio.module.css";
import { SplitReveal } from "@/components/split-reveal";
import { FloatIn } from "@/components/templates/floating-motion";
import { blogs, getBlog, site } from "@/lib/data";
import { cn } from "@/lib/utils";
import { FLOATING_BASE } from "@/lib/navigation";

// Only the slugs in blogs.json exist; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/templates/floating/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlog(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    // Same article as /blog/<slug>, so point search engines there
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function FloatingBlogPostPage({
  params,
}: PageProps<"/templates/floating/blog/[slug]">) {
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

  return (
    <>
      <header className={styles.pageHead}>
        <Link href={`${FLOATING_BASE}/blog`} className={styles.crumb}>
          ← All articles
        </Link>
        <h1>
          <SplitReveal text={post.title} />
        </h1>
        <p className={styles.lead}>{post.excerpt}</p>
      </header>

      <div className={styles.articleGrid}>
        <aside className={cn(styles.card, styles.articleAside)}>
          <dl>
            <div>
              <dt>Written by</dt>
              <dd>{site.name}</dd>
            </div>
            <div>
              <dt>Published</dt>
              <dd>
                <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
              </dd>
            </div>
            <div>
              <dt>Reading time</dt>
              <dd>{post.readTime} min</dd>
            </div>
          </dl>
          <ul className={styles.tags}>
            {post.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </aside>

        <FloatIn className={styles.card}>
          <article>
            <FloatingArticle blocks={post.content} />
            {post.url && (
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.allLink}
              >
                Also published here ↗
              </a>
            )}
          </article>
        </FloatIn>
      </div>

      {related.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.title}>More articles</h2>
          <FloatingPostList posts={related} />
        </section>
      )}
    </>
  );
}
