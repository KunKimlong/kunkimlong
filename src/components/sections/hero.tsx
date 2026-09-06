import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { site, yearsOfExperience } from "@/lib/data";
import { TypedRoles } from "@/components/typed-roles";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

const stats = [
  { value: `${yearsOfExperience}+`, label: "Years experience" },
  { value: "10+", label: "Technologies" },
  { value: "2", label: "Companies" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-center pt-16"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <RevealGroup className="flex flex-col items-start gap-6 text-left" stagger={0.12}>
          <RevealItem>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Web Developer &middot; Phnom Penh, Cambodia
            </span>
          </RevealItem>

          <RevealItem>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Hi, I&apos;m{" "}
              <span className="font-serif italic text-primary">
                {site.name}
              </span>
            </h1>
          </RevealItem>

          <RevealItem>
            <p className="text-xl text-muted-foreground sm:text-2xl">
              <TypedRoles roles={site.tagline} />
            </p>
          </RevealItem>

          <RevealItem>
            <p className="max-w-xl text-balance text-muted-foreground">
              I design and build full-stack web applications — from Laravel
              and Java Spring APIs to React and Angular interfaces — turning
              ideas into fast, reliable products.
            </p>
          </RevealItem>

          <RevealItem className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 active:scale-95"
            >
              Get in touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#resume"
              className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted active:scale-95"
            >
              View resume
            </a>
          </RevealItem>

          <RevealItem className="flex flex-wrap gap-8 border-t border-border pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-semibold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </RevealItem>
        </RevealGroup>

        <Reveal delay={0.25} className="mx-auto w-full max-w-sm lg:mx-0">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <Image
              src="/images/me.jpg"
              alt={site.name}
              width={480}
              height={560}
              priority
              className="aspect-[4/5] w-full object-cover grayscale-[15%]"
            />
          </div>
        </Reveal>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronDown className="h-6 w-6" />
      </a>
    </section>
  );
}
