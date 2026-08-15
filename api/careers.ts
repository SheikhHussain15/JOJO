import { validateCareerFields } from "./_lib/validation.ts";
import { isHoneypotTriggered, hasTooManyFields } from "./_lib/spam.ts";
import { validateResume } from "./_lib/file.ts";
import { deliverApplication } from "./_lib/deliver.ts";
import { getResumeMaxSizeMb } from "./_lib/constants.ts";
import { badRequest, serverError, ok } from "./_lib/response.ts";

export const config = {
  runtime: "nodejs",
};

export async function POST(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return badRequest("Method not allowed.");
  }

  const maxSizeMb = getResumeMaxSizeMb();

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return badRequest("The request body is not valid multipart form data.");
  }

  const fields: Record<string, unknown> = {};
  let resume: File | null = null;
  for (const [key, value] of form.entries()) {
    if (value instanceof File) {
      if (key === "resume") resume = value;
    } else {
      fields[key] = value;
    }
  }

  // Honeypot hit → silently accept without delivering (never acknowledge spam).
  if (isHoneypotTriggered(fields) || hasTooManyFields(fields)) {
    return ok("Application received.");
  }

  const { ok: valid, data, errors } = validateCareerFields(fields);
  if (!valid) {
    return badRequest("Please fix the highlighted fields.", errors);
  }

  const resumeResult = await validateResume(resume, maxSizeMb);
  if (!resumeResult.ok) {
    return badRequest(resumeResult.error ?? "Invalid resume.", {
      resume: resumeResult.error ?? "Invalid resume.",
    });
  }

  const bytes = new Uint8Array(await resume!.arrayBuffer());

  try {
    await deliverApplication(
      data,
      {
        originalName: resume!.name,
        storedName: resumeResult.storedName!,
        size: resume!.size,
        mime: resume!.type,
        bytes,
      }
    );
  } catch (error) {
    console.error("Application delivery failed:", error);
    return serverError();
  }

  return ok("Application received. Thank you for applying.");
}
