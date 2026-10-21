import { site } from "./data";
import { MESSAGE_MAX } from "./contact";

/** Settings the contact form needs; process.env in dev, Worker env/secrets in production */
export type ContactEnv = {
  BREVO_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
};

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

/**
 * Contact form → Brevo transactional email API. Shared by the Cloudflare Worker (the
 * live static site) and the Next.js route (npm run dev), so both validate and send the
 * same way. The API key stays on the server.
 */
export async function handleContactRequest(
  request: Request,
  env: ContactEnv
): Promise<Response> {
  const { BREVO_API_KEY, CONTACT_FROM_EMAIL } = env;
  if (!BREVO_API_KEY || !CONTACT_FROM_EMAIL) {
    console.error(
      "Contact form: BREVO_API_KEY or CONTACT_FROM_EMAIL is not set"
    );
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

  const time = new Date().toLocaleString("en-GB", {
    timeZone: "Asia/Phnom_Penh",
  });

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Portfolio contact form", email: CONTACT_FROM_EMAIL },
        to: [{ name: site.name, email: env.CONTACT_TO_EMAIL || site.email }],
        // Hitting Reply answers the visitor directly when they left an email
        ...(email && { replyTo: { name, email } }),
        subject: `[Portfolio] ${subject}`,
        textContent: `From: ${name}${email ? ` <${email}>` : ""}\nSent: ${time}\n\n${message}`,
        htmlContent: `<p><strong>From:</strong> ${escapeHtml(name)}${
          email ? ` &lt;${escapeHtml(email)}&gt;` : ""
        }<br><strong>Sent:</strong> ${time}</p><p style="white-space:pre-wrap">${escapeHtml(
          message
        )}</p>`,
      }),
    });
    if (!res.ok) {
      console.error(
        "Contact form: Brevo send failed",
        res.status,
        await res.text()
      );
      return Response.json(
        { error: "Could not send the message" },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Contact form: Brevo request failed", error);
    return Response.json(
      { error: "Could not send the message" },
      { status: 502 }
    );
  }
  return Response.json({ ok: true });
}
