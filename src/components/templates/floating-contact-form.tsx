"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { MESSAGE_MAX, sendContactMessage } from "@/lib/contact";
import { cn } from "@/lib/utils";
import styles from "./floating-portfolio.module.css";

/** Same fields and sending as the Simple contact form, on a floating glass card */
export function FloatingContactForm() {
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
      className={cn(styles.card, styles.form)}
      aria-labelledby="floating-form-title"
    >
      <div className={styles.formHead}>
        <h3 id="floating-form-title">Send me a message</h3>
        <p>I try to reply within a day.</p>
      </div>
      <div className={styles.formRow}>
        <label className={styles.field}>
          <span>
            Your name <em aria-hidden="true">*</em>
          </span>
          <input
            name="name"
            required
            autoComplete="name"
            maxLength={80}
            placeholder="John Doe"
          />
        </label>
        <label className={styles.field}>
          <span>Your email (optional)</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={120}
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label className={styles.field}>
        <span>
          Subject <em aria-hidden="true">*</em>
        </span>
        <input
          name="subject"
          required
          maxLength={120}
          placeholder="Project inquiry, collaboration, job offer..."
        />
      </label>
      <div className={styles.field}>
        <label htmlFor="floating-message">
          Message <em aria-hidden="true">*</em>
        </label>
        <textarea
          id="floating-message"
          name="message"
          rows={6}
          required
          maxLength={MESSAGE_MAX}
          aria-describedby="floating-message-count"
          placeholder="Tell me about your project, timeline and budget, or just say hi..."
          onChange={(e) => setMessageLength(e.target.value.length)}
        />
        <small id="floating-message-count" className={styles.counter}>
          {messageLength}/{MESSAGE_MAX}
        </small>
      </div>
      <button type="submit" disabled={sending} className={styles.btnPrimary}>
        {sending ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}
