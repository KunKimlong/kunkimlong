import { handleContactRequest } from "@/lib/contact-mail";

/**
 * Contact form for `npm run dev`. The live site is a static export, where
 * worker/index.ts answers /api/contact with the same handler instead.
 */
export async function POST(request: Request) {
  const { BREVO_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env;
  return handleContactRequest(request, {
    BREVO_API_KEY,
    CONTACT_FROM_EMAIL,
    CONTACT_TO_EMAIL,
  });
}
