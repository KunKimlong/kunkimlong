import Link from "next/link";
import type { BlogBlock, BlogPost } from "@/lib/data";
import { formatBlogDate } from "@/components/blog-card";
import { LAMP_BASE } from "@/lib/navigation";
import styles from "./lamp-portfolio.module.css";

export function LampPostList({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return <p className={styles.prose}>No articles yet. Check back soon.</p>;
  }
  return (
    <div>
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`${LAMP_BASE}/blog/${post.slug}`}
          className={styles.post}
        >
          <h3>{post.title}</h3>
          <span className={styles.when}>
            <time dateTime={post.date}>{formatBlogDate(post.date)}</time> ·{" "}
            {post.readTime} min
          </span>
          <p>{post.excerpt}</p>
        </Link>
      ))}
    </div>
  );
}

/** Lamp-styled version of BlogContent: same blocks, paper-and-ink type */
export function LampArticle({ blocks }: { blocks: BlogBlock[] }) {
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
