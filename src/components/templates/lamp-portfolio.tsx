import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogs, education, experiences, site, skillGroups } from "@/lib/data";
import { cn } from "@/lib/utils";
import { LAMP_BASE } from "@/lib/navigation";
import { LampContactForm } from "./lamp-contact-form";
import { LampPostList } from "./lamp-blog";
import styles from "./lamp-portfolio.module.css";

const telHref = `tel:${site.phone.replace(/\(0\)|[^\d+]/g, "")}`;

export function LampPortfolio() {
  return (
    <>
      <section className={styles.hero} id="home">
        <div className={styles.heroText}>
          <span className={styles.eyebrow}>
            <span className={styles.roles}>
              {site.tagline.map((role) => (
                <span key={role}>{role}</span>
              ))}
            </span>
          </span>
          <h1>
            {site.name}
            <span>.</span>
          </h1>
          <p>{site.intro}</p>
          <p className={styles.slogan}>“{site.slogan}”</p>
        </div>
        {/* A print pinned up in the lit room */}
        <figure className={styles.portrait}>
          <Image
            src={site.lampPhoto.src}
            alt={site.lampPhoto.alt}
            width={480}
            height={640}
            priority
          />
          <figcaption>{site.lampPhoto.caption}</figcaption>
        </figure>
      </section>

      <section className={styles.section} id="about">
        <h2>About</h2>
        <div>
          <p className={styles.prose}>{site.about}</p>
          {skillGroups.map((group) => (
            <div key={group.type}>
              <p className={styles.groupLabel}>{group.type}</p>
              <ul className={styles.skills}>
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    tabIndex={0}
                    aria-label={`${skill.name}, ${skill.level}%`}
                    style={{ "--level": `${skill.level}%` } as CSSProperties}
                  >
                    <span aria-hidden="true">{skill.name}</span>
                    <span aria-hidden="true" className={styles.level}>
                      {skill.level}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} id="resume">
        <h2>Resume</h2>
        <div className={styles.timeline}>
          <p className={styles.groupLabel}>Education</p>
          {education.map((item) => (
            <article key={item.title} className={styles.role}>
              <div className={styles.when}>{item.period}</div>
              <div>
                <h3>{item.title}</h3>
                <p className={styles.where}>{item.place}</p>
              </div>
            </article>
          ))}

          <p className={styles.groupLabel}>Experience</p>
          {experiences.map((job) => (
            <article key={job.company} className={styles.role}>
              <div className={styles.when}>
                {job.startY} — {job.endY ?? "Now"}
                {job.endY === null && (
                  <>
                    <br />
                    <span className={styles.now}>Current</span>
                  </>
                )}
              </div>
              <div>
                <h3>{job.position}</h3>
                <p className={styles.where}>
                  {job.company} · {job.location}
                </p>
              </div>
              <ul>
                {job.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="blog">
        <h2>Blog</h2>
        <div>
          <LampPostList posts={blogs.slice(0, 3)} />
          {blogs.length > 0 && (
            <Link href={`${LAMP_BASE}/blog`} className={styles.allLink}>
              All articles ({blogs.length}) →
            </Link>
          )}
        </div>
      </section>

      <section className={cn(styles.section, styles.contact)} id="contact">
        <h2>Contact</h2>
        <div>
          <p className={styles.contactLead}>Let’s build something.</p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
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
          <LampContactForm />
        </div>
      </section>
    </>
  );
}
