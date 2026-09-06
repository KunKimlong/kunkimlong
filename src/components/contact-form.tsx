"use client";

import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const EMAILJS_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "yu_iFcYIRDNnLs5Fy";
const EMAILJS_SERVICE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_lmqt8nr";
const EMAILJS_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_qnw0t5p";

export function ContactForm() {
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const subject = String(formData.get("subject") ?? "");
    const message = String(formData.get("message") ?? "");

    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name,
          title: subject,
          message,
          time: new Date().toLocaleString(),
          fromEmail: email,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      toast.success("Message sent!", {
        description: "Thanks for reaching out, I'll reply soon.",
      });
      form.reset();
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
      className="space-y-5 rounded-3xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-xs text-muted-foreground">
            Your Name*
          </Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs text-muted-foreground">
            Your Email
          </Label>
          <Input id="email" name="email" type="email" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-xs text-muted-foreground">
          Subject*
        </Label>
        <Input id="subject" name="subject" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-xs text-muted-foreground">
          Message*
        </Label>
        <Textarea id="message" name="message" rows={6} required />
      </div>

      <motion.button
        type="submit"
        disabled={sending}
        whileHover={{ scale: sending ? 1 : 1.02 }}
        whileTap={{ scale: sending ? 1 : 0.97 }}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60 sm:w-auto"
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
            >
              Send Message
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </form>
  );
}
