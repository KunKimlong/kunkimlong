import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LampArticle, LampPostList } from "@/components/templates/lamp-blog";
import { formatBlogDate } from "@/components/blog-card";
import styles from "@/components/templates/lamp-portfolio.module.css";
import { blogs, getBlog, site } from "@/lib/data";
import { LAMP_BASE } from "@/lib/navigation";

// Only the slugs in blogs.json exist; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/templates/lamp/blog/[slug]">): Promise<Metadata> {
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

export default async function LampBlogPostPage({
  params,
}: PageProps<"/templates/lamp/blog/[slug]">) {
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
        <Link href={`${LAMP_BASE}/blog`} className={styles.crumb}>
          ← All articles
        </Link>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
      </header>

      <div className={styles.articleGrid}>
        <aside className={styles.articleAside}>
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

        <article>
          <LampArticle blocks={post.content} />
          {post.url && (
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.external}
            >
              Also published here ↗
            </a>
          )}
        </article>
      </div>

      {related.length > 0 && (
        <section className={styles.section}>
          <h2>More articles</h2>
          <LampPostList posts={related} />
        </section>
      )}
    </>
  );
}
