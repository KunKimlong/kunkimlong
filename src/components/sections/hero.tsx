import { HeroPortrait } from "@/components/hero-portrait";
import { SplitReveal } from "@/components/split-reveal";
import { CountUp } from "@/components/count-up";
import { ArrowRight, ChevronDown } from "lucide-react";
import { site, yearsOfExperience } from "@/lib/data";
import { TypedRoles } from "@/components/typed-roles";
import { RevealGroup, RevealItem } from "@/components/reveal";

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
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <RevealGroup
          className="flex flex-col items-start gap-6 text-left"
          stagger={0.12}
        >
          <RevealItem>
            {/* Each part wraps whole; the dot leading a new line is clipped off */}
            <span className="text-muted-foreground block overflow-hidden text-xs font-medium tracking-[0.2em] uppercase">
              <span className="-ml-[2em] flex flex-wrap">
                {[site.role, "Phnom Penh, Cambodia"].map((part) => (
                  <span
                    key={part}
                    className="whitespace-nowrap before:inline-block before:w-[2em] before:text-center before:content-['·']"
                  >
                    {part}
                  </span>
                ))}
              </span>
            </span>
          </RevealItem>

          <RevealItem>
            <h1 className="text-4xl leading-tight font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Hi, I&apos;m{" "}
              <SplitReveal
                text={site.name}
                by="char"
                delay={0.35}
                className="text-primary font-serif italic"
              />
            </h1>
          </RevealItem>

          <RevealItem>
            <p className="text-muted-foreground text-xl sm:text-2xl">
              <TypedRoles roles={site.tagline} />
            </p>
          </RevealItem>

          <RevealItem>
            <p className="text-muted-foreground max-w-xl text-balance">
              {site.intro}
            </p>
          </RevealItem>

          <RevealItem>
            <p className="border-primary text-foreground border-l-2 pl-4 font-serif text-lg italic sm:text-xl">
              &ldquo;{site.slogan}&rdquo;
            </p>
          </RevealItem>

          <RevealItem className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#contact"
              className="group bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90 active:scale-95"
            >
              Get in touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#resume"
              className="border-border text-foreground hover:bg-muted rounded-lg border px-6 py-3 text-sm font-medium transition-colors active:scale-95"
            >
              View resume
            </a>
          </RevealItem>

          <RevealItem className="border-border flex flex-wrap gap-8 border-t pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <CountUp
                  value={stat.value}
                  className="block text-2xl font-semibold"
                />
                <p className="text-muted-foreground text-xs">{stat.label}</p>
              </div>
            ))}
          </RevealItem>
        </RevealGroup>

        <div className="mx-auto w-full max-w-xs md:mr-0">
          <HeroPortrait
            src={site.photo}
            alt={site.name}
            name={site.name}
            place="Phnom Penh · KH"
          />
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="text-muted-foreground hover:text-foreground absolute bottom-6 left-1/2 z-10 -translate-x-1/2 transition-colors"
      >
        <ChevronDown className="animate-nudge h-6 w-6" />
      </a>
    </section>
  );
}
