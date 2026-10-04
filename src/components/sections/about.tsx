import { Mail, Phone, Briefcase, User } from "lucide-react";
import { site, skillGroups } from "@/lib/data";
import { SkillBar } from "@/components/skill-bar";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import Marquee from "@/components/ui/marquee";

const quickFacts = [
  { icon: User, label: "Name", value: site.name },
  { icon: Briefcase, label: "Profile", value: site.role },
  { icon: Mail, label: "Email", value: site.email },
  { icon: Phone, label: "Phone", value: site.phone },
];

const prefix = "/images/";
const images: string[] = [
  prefix + "html.png",
  prefix + "css.png",
  prefix + "bootstrap.png",
  prefix + "tailwind.png",
  prefix + "js.png",
  prefix + "jquery.png",
  prefix + "react.png",
  prefix + "vue.png",
  prefix + "angular.png",
  prefix + "nextjs.png",
  prefix + "php.png",
  prefix + "laravel.png",
  prefix + "spring.png",


];

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Get to know me" title="About Me" />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="hover-lift border-border bg-card rounded-3xl border p-8 lg:col-span-3">
            <p className="text-foreground/90 leading-relaxed text-balance">
              {site.about}
            </p>

            <RevealGroup
              className="mt-8 grid gap-4 sm:grid-cols-2"
              stagger={0.08}
            >
              {quickFacts.map(({ icon: Icon, label, value }) => (
                <RevealItem key={label} className="flex items-center gap-3">
                  <span className="bg-muted text-accent flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-muted-foreground text-xs">{label}</p>
                    <p className="truncate text-sm font-medium">{value}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>

          <Reveal
            delay={0.15}
            className="hover-lift border-border border-l-primary bg-card flex flex-col justify-center gap-6 rounded-3xl border border-l-4 p-8 lg:col-span-2"
          >
            <p className="font-serif text-3xl leading-snug italic">
              Building things for the web.
            </p>
            <p className="text-muted-foreground text-sm">
              From backend APIs to polished interfaces, I enjoy owning a feature
              end-to-end and shipping something people actually enjoy using.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid gap-6 md:grid-cols-3" stagger={0.1}>
          {skillGroups.map((group) => (
            <RevealItem
              key={group.type}
              className="hover-lift border-border bg-card rounded-3xl border p-6"
            >
              <h3 className="text-accent mb-5 text-sm font-medium tracking-wide uppercase">
                {group.type}
              </h3>
              <div className="space-y-4">
                {group.skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    icon={skill.icon}
                  />
                ))}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-16">
          <Marquee icons={images} duration={25} />
        </div>
      </div>
    </section>
  );
}
