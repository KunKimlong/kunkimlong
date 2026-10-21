import { handleContactRequest, type ContactEnv } from "../src/lib/contact-mail";

type Env = ContactEnv & {
  // The static site built by `next build` into out/ (see wrangler.jsonc)
  ASSETS: { fetch(request: Request): Promise<Response> };
};

/**
 * Cloudflare Worker in front of the static site. It only runs for /api/* (see
 * run_worker_first in wrangler.jsonc); every page and file is served from out/.
 */
const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/contact") {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", {
          status: 405,
          headers: { allow: "POST" },
        });
      }
      return handleContactRequest(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};

export default worker;
