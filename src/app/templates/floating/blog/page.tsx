import type { Metadata } from "next";
import Link from "next/link";
import { FloatingPostList } from "@/components/templates/floating-blog";
import { Kicker } from "@/components/templates/floating-motion";
import styles from "@/components/templates/floating-portfolio.module.css";
import { SplitReveal } from "@/components/split-reveal";
import { blogs } from "@/lib/data";
import { FLOATING_BASE } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles and notes on web development, Laravel, Java Spring, React, DevOps and teaching.",
  // Same articles as /blog, so point search engines there
  alternates: {
    canonical: "/blog",
  },
};

export default function FloatingBlogPage() {
  const totalMinutes = blogs.reduce((sum, post) => sum + post.readTime, 0);

  return (
    <>
      <header className={styles.pageHead}>
        <Link href={`${FLOATING_BASE}#blog`} className={styles.crumb}>
          ← Back to home
        </Link>
        <Kicker>Thoughts &amp; notes</Kicker>
        <h1>
          <SplitReveal text="Blog" by="char" />
        </h1>
        <p className={styles.lead}>
          Things I&apos;ve learned building and shipping web applications, and
          from teaching others to do the same.
        </p>
        <div className={styles.meta}>
          <span>{blogs.length} articles</span>
          <span>{totalMinutes} minutes of reading</span>
        </div>
      </header>
      <section className={styles.section}>
        <h2 className={styles.title}>All articles</h2>
        <FloatingPostList posts={blogs} />
      </section>
    </>
  );
}
