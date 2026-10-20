import nodemailer from "nodemailer";
import { site } from "@/lib/data";
import { MESSAGE_MAX } from "@/lib/contact";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!
  );

const field = (form: FormData, name: string) =>
  String(form.get(name) ?? "").trim();

/** Contact form → Brevo SMTP. The credentials stay on the server. */
export async function POST(request: Request) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_FROM_EMAIL } =
    process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_FROM_EMAIL) {
    console.error("Contact form: SMTP_* or CONTACT_FROM_EMAIL is not set");
    return Response.json({ error: "Email is not configured" }, { status: 500 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }
  // Name and subject end up in mail headers: keep them to one line
  const name = field(form, "name").replace(/\s+/g, " ").slice(0, 100);
  const email = field(form, "email").slice(0, 200);
  const subject = field(form, "subject").replace(/\s+/g, " ").slice(0, 200);
  const message = field(form, "message");

  if (!name || !subject || !message || message.length > MESSAGE_MAX) {
    return Response.json(
      { error: "Missing or invalid fields" },
      { status: 400 }
    );
  }
  if (email && !EMAIL_RE.test(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  const port = Number(SMTP_PORT) || 587;
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // 587 upgrades with STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  const time = new Date().toLocaleString("en-GB", {
    timeZone: "Asia/Phnom_Penh",
  });

  try {
    await transport.sendMail({
      from: { name: "Portfolio contact form", address: CONTACT_FROM_EMAIL },
      to: {
        name: site.name,
        address: process.env.CONTACT_TO_EMAIL || site.email,
      },
      // Hitting Reply answers the visitor directly when they left an email
      ...(email && { replyTo: { name, address: email } }),
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name}${email ? ` <${email}>` : ""}\nSent: ${time}\n\n${message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)}${
        email ? ` &lt;${escapeHtml(email)}&gt;` : ""
      }<br><strong>Sent:</strong> ${time}</p><p style="white-space:pre-wrap">${escapeHtml(
        message
      )}</p>`,
    });
  } catch (error) {
    console.error("Contact form: SMTP send failed", error);
    return Response.json(
      { error: "Could not send the message" },
      { status: 502 }
    );
  }
  return Response.json({ ok: true });
}
