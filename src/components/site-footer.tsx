import { site } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="border-border border-t py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-center sm:px-6">
        <span className="text-foreground font-serif text-lg italic">
          {site.name}
        </span>
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
