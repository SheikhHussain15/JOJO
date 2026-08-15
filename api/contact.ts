import { validateContactFields } from "./_lib/validation.ts";
import { isHoneypotTriggered, hasTooManyFields } from "./_lib/spam.ts";
import { deliverContact } from "./_lib/deliver.ts";
import { badRequest, serverError, ok } from "./_lib/response.ts";

export const config = {
  runtime: "nodejs",
};

export async function POST(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return badRequest("Method not allowed.");
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return badRequest("The request body is not valid JSON.");
  }

  // Honeypot hit → silently accept without delivering (never acknowledge spam).
  if (isHoneypotTriggered(body) || hasTooManyFields(body)) {
    return ok("Message received.");
  }

  const { ok: valid, data, errors } = validateContactFields(body);
  if (!valid) {
    return badRequest("Please fix the highlighted fields.", errors);
  }

  try {
    await deliverContact(data);
  } catch (error) {
    console.error("Contact delivery failed:", error);
    return serverError();
  }

  return ok("Message received. Our team will be in touch shortly.");
}
