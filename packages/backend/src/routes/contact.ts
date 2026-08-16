import { Router } from "express";
import { validateContactFields } from "../lib/validation.ts";
import { isHoneypotTriggered, hasTooManyFields } from "../lib/spam.ts";
import { deliverContact } from "../lib/deliver.ts";
import { send, badRequest, serverError, ok } from "../lib/response.ts";

export const contactRouter = Router();

contactRouter.post("/api/contact", async (req, res, next) => {
  try {
    const body = (req.body ?? {}) as Record<string, unknown>;

    // Honeypot hit → silently accept without delivering (never acknowledge spam).
    if (isHoneypotTriggered(body) || hasTooManyFields(body)) {
      return send(res, ok("Message received."));
    }

    const { ok: valid, data, errors } = validateContactFields(body);
    if (!valid) {
      return send(res, badRequest("Please fix the highlighted fields.", errors));
    }

    try {
      await deliverContact(data);
    } catch (error) {
      console.error("Contact delivery failed:", error);
      return send(res, serverError());
    }

    return send(res, ok("Message received. Our team will be in touch shortly."));
  } catch (error) {
    return next(error);
  }
});

// Any other method on the same path → explicit 400.
contactRouter.all("/api/contact", (_req, res) => {
  send(res, badRequest("Method not allowed."));
});
