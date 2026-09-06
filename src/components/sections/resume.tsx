"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";
import { education, experiences } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0 },
};

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
              <GraduationCap className="h-5 w-5 text-accent" />
              Education
            </h3>
            <motion.ol
              className="relative space-y-10 border-l border-border pl-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
            >
              {education.map((item) => (
                <motion.li
                  key={item.title}
                  className="relative"
                  variants={itemVariants}
                  transition={{ duration: 0.5 }}
                >
                  <span className="absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                  <p className="text-xs font-medium text-accent">{item.period}</p>
                  <h4 className="mt-1 font-medium text-foreground">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-sm italic text-muted-foreground">
                    {item.place}
                  </p>
                </motion.li>
              ))}
            </motion.ol>
          </div>

          <div>
            <h3 className="mb-8 flex items-center gap-2 text-lg font-medium">
              <Briefcase className="h-5 w-5 text-accent" />
              Professional Experience
            </h3>
            <motion.ol
              className="relative space-y-10 border-l border-border pl-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
            >
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
                        "absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background",
                        current && "animate-pulse-ring"
                      )}
                    />
                    <p className="flex items-center gap-2 text-xs font-medium text-accent">
                      {exp.startY} — {exp.endY ?? "Present"}
                      {current && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] text-accent">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                          Live
                        </span>
                      )}
                    </p>
                    <h4 className="mt-1 font-medium text-foreground">
                      {exp.position}
                    </h4>
                    <p className="mt-1 text-sm italic text-muted-foreground">
                      {exp.company} &middot; {exp.location}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {exp.details.map((detail, i) => (
                        <li
                          key={i}
                          className="rounded-2xl border border-border bg-card px-4 py-3 text-sm leading-relaxed text-foreground/85"
                        >
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.li>
                );
              })}
            </motion.ol>
          </div>
        </div>
      </div>
    </section>
  );
}
