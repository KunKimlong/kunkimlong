import type { BlogBlock, BlogPost } from "@/lib/data";
import { formatBlogDate } from "@/components/blog-card";
import { FLOATING_BASE } from "@/lib/navigation";
import { TiltCard } from "./floating-motion";
import styles from "./floating-portfolio.module.css";

/** Posts as floating glass cards, each set a little lower than the one before */
export function FloatingPostList({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return <p className={styles.prose}>No articles yet. Check back soon.</p>;
  }
  return (
    <div className={styles.postGrid}>
      {posts.map((post, i) => (
        <TiltCard
          key={post.slug}
          href={`${FLOATING_BASE}/blog/${post.slug}`}
          index={i % 3}
        >
          <p className={styles.when}>
            <time dateTime={post.date}>{formatBlogDate(post.date)}</time> ·{" "}
            {post.readTime} min
          </p>
          <h3>
            {post.title} <span className={styles.arrow}>→</span>
          </h3>
          <p className={styles.excerpt}>{post.excerpt}</p>
          <ul className={styles.tags}>
            {post.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </TiltCard>
      ))}
    </div>
  );
}

/** Floating-styled version of BlogContent: same blocks, light type on the dark ground */
export function FloatingArticle({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className={styles.article}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return <h2 key={i}>{block.text}</h2>;
          case "list":
            return (
              <ul key={i}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "code":
            return (
              <figure key={i}>
                {block.language && <figcaption>{block.language}</figcaption>}
                <pre>
                  <code>{block.code}</code>
                </pre>
              </figure>
            );
          case "quote":
            return <blockquote key={i}>{block.text}</blockquote>;
          default:
            return <p key={i}>{block.text}</p>;
        }
      })}
    </div>
  );
}
