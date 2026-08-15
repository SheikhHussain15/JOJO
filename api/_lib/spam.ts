// Honeypot: a hidden field that real users never see. If it arrives filled,
// treat the submission as spam and silently "succeed" without delivering.

export const HONEYPOT_FIELD = "website";

export function isHoneypotTriggered(body: Record<string, unknown>): boolean {
  const value = body[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim().length > 0;
}

// A bot may also fill extra fields we never render. Cap the number of keys to
// keep the payload sane and reject absurd bodies.
export function hasTooManyFields(body: Record<string, unknown>): boolean {
  return Object.keys(body).length > 20;
}
