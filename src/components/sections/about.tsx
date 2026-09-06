import { Mail, Phone, Briefcase, User } from "lucide-react";
import { site, skillGroups } from "@/lib/data";
import { SkillBar } from "@/components/skill-bar";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

const quickFacts = [
  { icon: User, label: "Name", value: site.name },
  { icon: Briefcase, label: "Profile", value: site.role },
  { icon: Mail, label: "Email", value: site.email },
  { icon: Phone, label: "Phone", value: site.phone },
];

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Get to know me" title="About Me" />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="hover-lift rounded-3xl border border-border bg-card p-8 lg:col-span-3">
            <p className="text-balance leading-relaxed text-foreground/90">
              {site.about}
            </p>

            <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2" stagger={0.08}>
              {quickFacts.map(({ icon: Icon, label, value }) => (
                <RevealItem key={label} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-accent">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="truncate text-sm font-medium">{value}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>

          <Reveal
            delay={0.15}
            className="hover-lift flex flex-col justify-center gap-6 rounded-3xl border border-border border-l-4 border-l-primary bg-card p-8 lg:col-span-2"
          >
            <p className="font-serif text-3xl italic leading-snug">
              Building things for the web.
            </p>
            <p className="text-sm text-muted-foreground">
              From backend APIs to polished interfaces, I enjoy owning a
              feature end-to-end and shipping something people actually
              enjoy using.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid gap-6 md:grid-cols-3" stagger={0.1}>
          {skillGroups.map((group) => (
            <RevealItem
              key={group.type}
              className="hover-lift rounded-3xl border border-border bg-card p-6"
            >
              <h3 className="mb-5 text-sm font-medium uppercase tracking-wide text-accent">
                {group.type}
              </h3>
              <div className="space-y-4">
                {group.skills.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
