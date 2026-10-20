export const MESSAGE_MAX = 1000;

/** Sends the contact form through /api/contact (Brevo); shared by every template's form */
export async function sendContactMessage(formData: FormData) {
  const res = await fetch("/api/contact", { method: "POST", body: formData });
  if (!res.ok) throw new Error(`Contact form failed with ${res.status}`);
}
