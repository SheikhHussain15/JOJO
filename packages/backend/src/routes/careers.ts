import { Router } from "express";
import multer from "multer";
import { validateCareerFields } from "../lib/validation.ts";
import { isHoneypotTriggered, hasTooManyFields } from "../lib/spam.ts";
import { validateResumeFile } from "../lib/file.ts";
import { deliverApplication } from "../lib/deliver.ts";
import { getResumeMaxSizeMb, RESUME_HARD_LIMIT_MB } from "../lib/constants.ts";
import { send, badRequest, serverError, ok } from "../lib/response.ts";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: RESUME_HARD_LIMIT_MB * 1024 * 1024 },
});

export const careersRouter = Router();

careersRouter.post("/api/careers", upload.single("resume"), async (req, res, next) => {
  try {
    const maxSizeMb = getResumeMaxSizeMb();
    const fields = (req.body ?? {}) as Record<string, unknown>;

    // Honeypot hit → silently accept without delivering (never acknowledge spam).
    if (isHoneypotTriggered(fields) || hasTooManyFields(fields)) {
      return send(res, ok("Application received."));
    }

    const { ok: valid, data, errors } = validateCareerFields(fields);
    if (!valid) {
      return send(res, badRequest("Please fix the highlighted fields.", errors));
    }

    const resumeResult = validateResumeFile(
      req.file
        ? { name: req.file.originalname, size: req.file.size, buffer: new Uint8Array(req.file.buffer) }
        : null,
      maxSizeMb
    );
    if (!resumeResult.ok) {
      return send(res, badRequest(resumeResult.error ?? "Invalid resume.", {
        resume: resumeResult.error ?? "Invalid resume.",
      }));
    }

    try {
      await deliverApplication(
        data,
        {
          originalName: req.file!.originalname,
          storedName: resumeResult.storedName!,
          size: req.file!.size,
          mime: req.file!.mimetype,
          bytes: new Uint8Array(req.file!.buffer),
        }
      );
    } catch (error) {
      console.error("Application delivery failed:", error);
      return send(res, serverError());
    }

    return send(res, ok("Application received. Thank you for applying."));
  } catch (error) {
    return next(error);
  }
});

// Any other method on the same path → explicit 400.
careersRouter.all("/api/careers", (_req, res) => {
  send(res, badRequest("Method not allowed."));
});
