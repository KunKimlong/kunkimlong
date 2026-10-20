import type { Metadata } from "next";
import Link from "next/link";
import { LampPostList } from "@/components/templates/lamp-blog";
import styles from "@/components/templates/lamp-portfolio.module.css";
import { blogs } from "@/lib/data";
import { LAMP_BASE } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Blog — Lamp template",
  description:
    "Articles and notes on web development, Laravel, Java Spring, React, DevOps and teaching.",
  // Same articles as /blog, so point search engines there
  alternates: {
    canonical: "/blog",
  },
};

export default function LampBlogPage() {
  const totalMinutes = blogs.reduce((sum, post) => sum + post.readTime, 0);

  return (
    <>
      <header className={styles.pageHead}>
        <Link href={`${LAMP_BASE}#blog`} className={styles.crumb}>
          ← Back to home
        </Link>
        <span className={styles.eyebrow}>Thoughts &amp; notes</span>
        <h1>Blog</h1>
        <p>
          Things I&apos;ve learned building and shipping web applications, and
          from teaching others to do the same.
        </p>
        <div className={styles.meta}>
          <span>{blogs.length} articles</span>
          <span>{totalMinutes} minutes of reading</span>
        </div>
      </header>
      <section className={styles.section}>
        <h2>All articles</h2>
        <LampPostList posts={blogs} />
      </section>
    </>
  );
}
