// Shared by every template so they all offer the same sections and switcher

export const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#resume", label: "Resume" },
  { href: "/#blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export const LAMP_BASE = "/templates/lamp";
export const FLOATING_BASE = "/templates/floating";

/** `base` is the path prefix of each template; Simple is the main site, so it has none */
export const templates = [
  { base: "", name: "Simple" },
  { base: LAMP_BASE, name: "Lamp" },
  { base: FLOATING_BASE, name: "Floating" },
];

function templateOf(pathname: string) {
  return (
    templates.find((t) => t.base && pathname.startsWith(t.base)) ?? templates[0]
  );
}

export function isCurrentTemplate(base: string, pathname: string) {
  return templateOf(pathname).base === base;
}

/** Same page in another template: /blog/x on Simple ↔ /templates/lamp/blog/x on Lamp */
export function templateHref(base: string, pathname: string) {
  const rest = pathname.slice(templateOf(pathname).base.length) || "/";
  const shared = rest === "/" || rest.startsWith("/blog");
  if (!shared) return base || "/";
  return rest === "/" ? base || "/" : base + rest;
}
