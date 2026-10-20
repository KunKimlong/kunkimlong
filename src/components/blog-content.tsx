import type { BlogBlock } from "@/lib/data";

export function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={i}
                className="text-foreground pt-4 text-2xl font-semibold tracking-tight"
              >
                {block.text}
              </h2>
            );
          case "list":
            return (
              <ul key={i} className="space-y-2">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="text-foreground/85 flex gap-3 leading-relaxed"
                  >
                    <span className="bg-primary mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "code":
            return (
              <figure
                key={i}
                className="border-border bg-card overflow-hidden rounded-2xl border"
              >
                {block.language && (
                  <figcaption className="border-border text-muted-foreground border-b px-4 py-2 font-mono text-xs">
                    {block.language}
                  </figcaption>
                )}
                <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">
                  <code>{block.code}</code>
                </pre>
              </figure>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-primary text-foreground border-l-4 py-1 pl-5 font-serif text-2xl leading-snug italic"
              >
                {block.text}
              </blockquote>
            );
          default:
            return (
              <p key={i} className="text-foreground/85 leading-relaxed">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
