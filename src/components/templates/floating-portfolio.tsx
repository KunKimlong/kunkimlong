import Image from "next/image";
import Link from "next/link";
import {
  blogs,
  education,
  experiences,
  site,
  skillGroups,
  yearsOfExperience,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import { FLOATING_BASE } from "@/lib/navigation";
import { Reveal } from "@/components/reveal";
import { SplitReveal } from "@/components/split-reveal";
import { FloatingContactForm } from "./floating-contact-form";
import { FloatingPostList } from "./floating-blog";
import {
  FloatIn,
  HeroChips,
  Kicker,
  Magnetic,
  SkillPills,
  TiltCard,
} from "./floating-motion";
import styles from "./floating-portfolio.module.css";

const telHref = `tel:${site.phone.replace(/\(0\)|[^\d+]/g, "")}`;

// Glass chips drifting around the hero; each takes a slot (position + bob timing) from the CSS
const heroChips = [
  { label: "Backend", value: "Java Spring · Laravel" },
  { label: "Frontend", value: "React · Angular" },
  { label: "Experience", value: `${yearsOfExperience}+ years shipping` },
  { value: "Available for work", live: true },
];

export function FloatingPortfolio() {
  return (
    <>
      <section className={styles.hero} id="home">
        <div className={styles.orbs} aria-hidden="true">
          <span />
          <span />
        </div>
        <HeroChips chips={heroChips} />

        <div className={styles.heroText}>
          <Reveal>
            <p className={styles.eyebrow}>
              <span className={styles.roles}>
                {site.tagline.map((role) => (
                  <span key={role}>{role}</span>
                ))}
              </span>
              <span aria-hidden="true">·</span> Phnom Penh
            </p>
          </Reveal>
          <h1>
            <SplitReveal text={site.name} by="char" delay={0.15} />
            <span className={styles.accentDot}>.</span>
          </h1>
          <Reveal delay={0.5}>
            <p className={styles.lead}>{site.intro}</p>
          </Reveal>
          <Reveal delay={0.65}>
            <p className={styles.slogan}>“{site.slogan}”</p>
          </Reveal>
          <Reveal delay={0.8} className={styles.actions}>
            <Magnetic>
              <a href="#resume" className={styles.btnPrimary}>
                See my work
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className={styles.btnGhost}>
                Get in touch
              </a>
            </Magnetic>
          </Reveal>
        </div>

        {/*<a*/}
        {/*  href="#about"*/}
        {/*  className={styles.scrollCue}*/}
        {/*  aria-label="Scroll to About"*/}
        {/*>*/}
        {/*  <span />*/}
        {/*</a>*/}
      </section>

      <section className={styles.section} id="about">
        <Kicker>01 — About</Kicker>
        <TiltCard className={styles.aboutCard} max={4}>
          <Image
            src={site.floatPhoto.src}
            alt={site.floatPhoto.alt}
            width={440}
            height={560}
            className={styles.photo}
          />
          <div>
            <h2>
              <SplitReveal text={`Hi, I’m ${site.name.split(" ")[0]}.`} />
            </h2>
            <p className={styles.prose}>{site.about}</p>
          </div>
        </TiltCard>

        <h2 className={styles.subhead}>
          <SplitReveal text="Tools I reach for" />
        </h2>
        {skillGroups.map((group) => (
          <div key={group.type} className={styles.skillGroup}>
            <p className={styles.groupLabel}>{group.type}</p>
            <SkillPills skills={group.skills} />
          </div>
        ))}
      </section>

      <section className={styles.section} id="resume">
        <Kicker>02 — Resume</Kicker>
        <h2 className={styles.title}>
          <SplitReveal text="Where I’ve worked" />
        </h2>
        <div className={styles.stagger}>
          {experiences.map((job, i) => (
            <TiltCard key={job.company} index={i} max={4}>
              <p className={styles.when}>
                {job.startY} — {job.endY ?? "Now"}
                {job.endY === null && (
                  <span className={styles.now}>Current</span>
                )}
              </p>
              <h3>{job.position}</h3>
              <p className={styles.where}>
                {job.company} · {job.location}
              </p>
              <ul className={styles.details}>
                {job.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </TiltCard>
          ))}
        </div>

        <h2 className={styles.subhead}>
          <SplitReveal text="Education" />
        </h2>
        <div className={styles.stagger}>
          {education.map((item, i) => (
            <TiltCard key={item.title} index={i}>
              <p className={styles.when}>{item.period}</p>
              <h3>{item.title}</h3>
              <p className={styles.where}>{item.place}</p>
            </TiltCard>
          ))}
        </div>
      </section>

      <section className={styles.section} id="blog">
        <div className={styles.sectionHead}>
          <div>
            <Kicker>03 — Blog</Kicker>
            <h2 className={styles.title}>
              <SplitReveal text="Notes & articles" />
            </h2>
          </div>
          {blogs.length > 0 && (
            <Link href={`${FLOATING_BASE}/blog`} className={styles.allLink}>
              All articles ({blogs.length}) <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
        <FloatingPostList posts={blogs.slice(0, 3)} />
      </section>

      <section className={cn(styles.section, styles.contact)} id="contact">
        <Kicker>04 — Contact</Kicker>
        <h2 className={styles.big}>
          <SplitReveal text="Let’s build something together." />
        </h2>
        <Reveal delay={0.3}>
          <Magnetic strength={0.25}>
            <a href={`mailto:${site.email}`} className={styles.btnBig}>
              {site.email}
            </a>
          </Magnetic>
        </Reveal>
        <div className={styles.contactGrid}>
          <TiltCard max={4}>
            <ul className={styles.links}>
              <li>
                <span>Phone</span>
                <a href={telHref}>{site.phone}</a>
              </li>
              <li>
                <span>Address</span>
                {site.address}
              </li>
              <li>
                <span>Telegram</span>
                <a href={site.telegram.url} target="_blank" rel="noopener">
                  {site.telegram.handle}
                </a>
              </li>
              <li>
                <span>Facebook</span>
                <a href={site.facebook.url} target="_blank" rel="noopener">
                  {site.facebook.handle}
                </a>
              </li>
              <li>
                <span>LinkedIn</span>
                <a href={site.linkedin.url} target="_blank" rel="noopener">
                  {site.linkedin.handle}
                </a>
              </li>
            </ul>
          </TiltCard>
          <FloatIn delay={0.15}>
            <FloatingContactForm />
          </FloatIn>
        </div>
      </section>
    </>
  );
}
