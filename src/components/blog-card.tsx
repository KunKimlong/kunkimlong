import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/data";
import { cn } from "@/lib/utils";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export function formatBlogDate(date: string) {
  return dateFormat.format(new Date(date));
}

export function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  const content = (
    <>
      <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-xs">
        {featured && (
          <span className="bg-primary text-primary-foreground rounded-full px-2.5 py-0.5 font-medium">
            Latest
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" />
          <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {post.readTime} min read
        </span>
      </div>
      <h3
        className={cn(
          "text-foreground mt-4 flex items-start justify-between gap-3 leading-snug font-medium",
          featured ? "font-serif text-3xl italic sm:text-4xl" : "text-lg"
        )}
      >
        {post.title}
        <ArrowUpRight className="text-accent h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </h3>
      <p
        className={cn(
          "text-muted-foreground mt-3 flex-1 leading-relaxed",
          featured ? "max-w-3xl text-base" : "text-sm"
        )}
      >
        {post.excerpt}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <li
            key={tag}
            className="bg-accent/15 text-accent rounded-full px-2.5 py-0.5 text-[11px] font-medium"
          >
            {tag}
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <Link
      href={`/blog/${post.slug}`}
      data-cursor-label="Read"
      className={cn(
        "group hover-lift spotlight border-border bg-card flex h-full flex-col rounded-3xl border",
        featured ? "border-l-primary border-l-4 p-8 sm:p-10" : "p-6"
      )}
    >
      {content}
    </Link>
  );
}
