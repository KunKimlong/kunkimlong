import Image from "next/image";
import { Mail, Phone, Briefcase, User } from "lucide-react";
import { site, skillGroups } from "@/lib/data";
import { SkillBar } from "@/components/skill-bar";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Marquee } from "@/components/ui/marquee";

const quickFacts = [
  { icon: User, label: "Name", value: site.name },
  { icon: Briefcase, label: "Profile", value: site.role },
  { icon: Mail, label: "Email", value: site.email },
  { icon: Phone, label: "Phone", value: site.phone },
];

// Tools shown in the marquee band under the skills
const stack = [
  { name: "HTML", src: "/images/html.png" },
  { name: "CSS", src: "/images/css.png" },
  { name: "Bootstrap", src: "/images/bootstrap.png" },
  { name: "Tailwind", src: "/images/tailwind.png" },
  { name: "JavaScript", src: "/images/js.png" },
  { name: "jQuery", src: "/images/jquery.png" },
  { name: "React", src: "/images/react.png" },
  { name: "Vue", src: "/images/vue.png" },
  { name: "Angular", src: "/images/angular.png" },
  { name: "Next.js", src: "/images/nextjs.png" },
  { name: "PHP", src: "/images/php.png" },
  { name: "Laravel", src: "/images/laravel.png" },
  { name: "Java Spring", src: "/images/spring.png" },
];

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Get to know me" title="About Me" />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="hover-lift spotlight border-border bg-card min-w-0 rounded-3xl border p-6 sm:p-8 lg:col-span-3">
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
                    <p className="text-sm font-medium break-words">{value}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>

          <Reveal
            delay={0.15}
            className="hover-lift spotlight border-border border-l-primary bg-card flex min-w-0 flex-col justify-center gap-6 rounded-3xl border border-l-4 p-6 sm:p-8 lg:col-span-2"
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
              className="hover-lift spotlight border-border bg-card rounded-3xl border p-6"
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
      </div>

      {/* Full-bleed band: logo tiles, crossed by a tilted ribbon of names running the other way */}
      <Reveal className="relative mt-20 overflow-hidden py-10">
        <p className="text-muted-foreground mb-6 text-center text-xs tracking-[0.2em] uppercase">
          Tools I build with
        </p>
        <Marquee
          speed={-2.5}
          className="marquee-fade"
          rowClassName="gap-4 py-2 pr-4"
        >
          {stack.map((tool) => (
            <div
              key={tool.name}
              className="group border-border bg-card hover:border-primary/60 flex items-center gap-3 rounded-2xl border py-3 pr-6 pl-3 transition-[border-color,transform] duration-300 hover:-translate-y-1"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-2 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <Image
                  src={tool.src}
                  alt=""
                  width={64}
                  height={64}
                  draggable={false}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="text-sm font-medium whitespace-nowrap">
                {tool.name}
              </span>
            </div>
          ))}
        </Marquee>

        <Marquee
          speed={2}
          className="bg-primary text-primary-foreground relative -mx-[5%] mt-10 w-[110%] -rotate-2 py-4 shadow-[0_20px_60px_-20px] shadow-black/60"
          rowClassName="items-center"
        >
          {stack.map((tool) => (
            <span
              key={tool.name}
              className="flex items-center font-serif text-3xl whitespace-nowrap italic sm:text-5xl"
            >
              {tool.name}
              <span
                aria-hidden
                className="mx-6 text-xl not-italic opacity-60 sm:mx-8 sm:text-2xl"
              >
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
