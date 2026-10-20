"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  AtSign,
  Loader2,
  MessageSquareText,
  Send,
  Tag,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { MESSAGE_MAX, sendContactMessage } from "@/lib/contact";

const fieldClass =
  "bg-background/40 border-border placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-primary/20 h-11 rounded-xl pl-10 md:text-sm";

function Field({
  id,
  label,
  required = false,
  icon,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  icon: ReactNode;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <Label htmlFor={id} className="text-muted-foreground text-xs">
          {label}
          {required ? (
            <span className="text-primary" aria-hidden>
              *
            </span>
          ) : (
            <span className="text-muted-foreground/60 font-normal">
              (optional)
            </span>
          )}
        </Label>
        {hint}
      </div>
      {/* Icon picks up the accent color while its field has focus */}
      <div className="group relative">
        <span className="text-muted-foreground/70 group-focus-within:text-primary pointer-events-none absolute top-3.5 left-3.5 transition-colors [&_svg]:h-4 [&_svg]:w-4">
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
}

export function ContactForm() {
  const [sending, setSending] = useState(false);
  const [messageLength, setMessageLength] = useState(0);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    setSending(true);
    try {
      await sendContactMessage(new FormData(form));
      toast.success("Message sent!", {
        description: "Thanks for reaching out, I'll reply soon.",
      });
      form.reset();
      setMessageLength(0);
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again or email me directly.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="spotlight border-border bg-card space-y-5 rounded-3xl border p-6 sm:p-8"
    >
      <div>
        <h3 className="text-foreground font-serif text-2xl italic">
          Send me a message
        </h3>
        <p className="text-muted-foreground mt-1 text-sm">
          Have a project or question? I usually reply within a day or two.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your Name" required icon={<User />}>
          <Input
            id="name"
            name="name"
            required
            autoComplete="name"
            maxLength={80}
            placeholder="John Doe"
            className={fieldClass}
          />
        </Field>
        <Field id="email" label="Your Email" icon={<AtSign />}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={120}
            placeholder="you@example.com"
            className={fieldClass}
          />
        </Field>
      </div>

      <Field id="subject" label="Subject" required icon={<Tag />}>
        <Input
          id="subject"
          name="subject"
          required
          maxLength={120}
          placeholder="Project inquiry, collaboration, job offer..."
          className={fieldClass}
        />
      </Field>

      <Field
        id="message"
        label="Message"
        required
        icon={<MessageSquareText />}
        hint={
          <span
            className={cn(
              "text-muted-foreground/60 text-[11px] tabular-nums",
              messageLength > MESSAGE_MAX * 0.9 && "text-primary"
            )}
            aria-live="polite"
          >
            {messageLength}/{MESSAGE_MAX}
          </span>
        }
      >
        <Textarea
          id="message"
          name="message"
          rows={6}
          required
          maxLength={MESSAGE_MAX}
          placeholder="Tell me about your project, timeline and budget, or just say hi..."
          onChange={(e) => setMessageLength(e.target.value.length)}
          className={cn(
            fieldClass,
            "dark:bg-background/40 h-auto min-h-36 resize-y py-3"
          )}
        />
      </Field>

      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-muted-foreground/60 text-xs">
          Fields marked <span className="text-primary">*</span> are required.
        </p>
        <motion.button
          type="submit"
          disabled={sending}
          whileHover={{ scale: sending ? 1 : 1.02 }}
          whileTap={{ scale: sending ? 1 : 0.97 }}
          className="bg-primary text-primary-foreground inline-flex w-full items-center justify-center gap-2 rounded-xl px-8 py-3 text-sm font-medium disabled:opacity-60 sm:w-auto"
        >
          <AnimatePresence mode="wait" initial={false}>
            {sending ? (
              <motion.span
                key="sending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-2"
              >
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-2"
              >
                Send Message
                <Send className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </form>
  );
}
