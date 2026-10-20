"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { GraduationCap, Briefcase } from "lucide-react";
import { education, experiences } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0 },
};

/** Timeline whose rail fills with amber as the list scrolls through the viewport */
function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div ref={ref} className="relative pl-8">
      <span aria-hidden className="bg-border absolute inset-y-0 left-0 w-px" />
      <motion.span
        aria-hidden
        className="bg-primary absolute inset-y-0 left-0 w-px origin-top"
        style={{ scaleY }}
      />
      <motion.ol
        className="space-y-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {children}
      </motion.ol>
    </div>
  );
}

export function Resume() {
  return (
    <section id="resume" className="bg-muted/20 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="My journey" title="Resume" />
        </Reveal>

        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h3 className="mb-8 flex items-center gap-2 text-lg font-medium">
              <GraduationCap className="text-accent h-5 w-5" />
              Education
            </h3>
            <Timeline>
              {education.map((item) => (
                <motion.li
                  key={item.title}
                  className="relative"
                  variants={itemVariants}
                  transition={{ duration: 0.5 }}
                >
                  <span className="bg-primary ring-background absolute top-1 -left-[2.35rem] h-3 w-3 rounded-full ring-4" />
                  <p className="text-accent text-xs font-medium">
                    {item.period}
                  </p>
                  <h4 className="text-foreground mt-1 font-medium">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground mt-1 text-sm italic">
                    {item.place}
                  </p>
                </motion.li>
              ))}
            </Timeline>
          </div>

          <div>
            <h3 className="mb-8 flex items-center gap-2 text-lg font-medium">
              <Briefcase className="text-accent h-5 w-5" />
              Professional Experience
            </h3>
            <Timeline>
              {experiences.map((exp) => {
                const current = exp.endY === null;
                return (
                  <motion.li
                    key={`${exp.company}-${exp.startY}`}
                    className="relative"
                    variants={itemVariants}
                    transition={{ duration: 0.5 }}
                  >
                    <span
                      className={cn(
                        "bg-primary ring-background absolute top-1 -left-[2.35rem] h-3 w-3 rounded-full ring-4",
                        current && "animate-pulse-ring"
                      )}
                    />
                    <p className="text-accent flex items-center gap-2 text-xs font-medium">
                      {exp.startY} — {exp.endY ?? "Present"}
                      {current && (
                        <span className="bg-accent/15 text-accent inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px]">
                          <span className="bg-accent h-1.5 w-1.5 animate-pulse rounded-full" />
                          Live
                        </span>
                      )}
                    </p>
                    <h4 className="text-foreground mt-1 font-medium">
                      {exp.position}
                    </h4>
                    <p className="text-muted-foreground mt-1 text-sm italic">
                      {exp.company} &middot; {exp.location}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {exp.details.map((detail, i) => (
                        <li
                          key={i}
                          className="spotlight border-border bg-card text-foreground/85 rounded-2xl border px-4 py-3 text-sm leading-relaxed"
                        >
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.li>
                );
              })}
            </Timeline>
          </div>
        </div>
      </div>
    </section>
  );
}
