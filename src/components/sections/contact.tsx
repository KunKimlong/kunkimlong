import { site } from "@/lib/data";
import { ContactForm } from "@/components/contact-form";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { FacebookIcon } from "@/components/icons/facebook-icon";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

const infoRows = [
  { icon: MapPin, label: "Address", value: site.address },
  { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/[^\d+]/g, "")}` },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
];

const socials = [
  { icon: FacebookIcon, label: "Facebook", href: site.facebook.url },
  { icon: Send, label: "Telegram", href: site.telegram.url },
];

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Get in touch" title="Let's build something" />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <p className="text-balance text-muted-foreground">
              Have a project in mind or just want to say hi? My inbox is
              always open — I try to reply within a day.
            </p>

            <RevealGroup className="mt-8 space-y-5" stagger={0.08}>
              {infoRows.map(({ icon: Icon, label, value, href }) => {
                const row = (
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted text-accent transition-colors">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="truncate text-sm font-medium">{value}</p>
                    </div>
                  </div>
                );
                return (
                  <RevealItem key={label}>
                    {href ? (
                      <a href={href} className="block transition-transform hover:translate-x-1">
                        {row}
                      </a>
                    ) : (
                      row
                    )}
                  </RevealItem>
                );
              })}
            </RevealGroup>

            <div className="mt-8 flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-all hover:-translate-y-1 hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
