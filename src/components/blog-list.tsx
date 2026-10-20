"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { BlogPost } from "@/lib/data";
import { BlogCard } from "@/components/blog-card";
import { cn } from "@/lib/utils";

const all = "All";

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [activeTag, setActiveTag] = useState(all);

  const tags = [all, ...new Set(posts.flatMap((post) => post.tags))];
  const filtered =
    activeTag === all
      ? posts
      : posts.filter((post) => post.tags.includes(activeTag));
  // The newest post is highlighted only on the unfiltered view
  const [featured, ...rest] = activeTag === all ? posts : [];
  const grid = activeTag === all ? rest : filtered;

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            aria-pressed={activeTag === tag}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
              activeTag === tag
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {featured && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BlogCard post={featured} featured />
        </motion.div>
      )}

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {grid.map((post) => (
            <motion.div
              key={post.slug}
              layout
              className="h-full"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
