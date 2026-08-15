import type { ContactFormData, ContactResponse } from "../types/contact";
import type { CareerFormData, ApplicationResponse } from "../types/careers";

// Frontend → API layer. These call the Vercel Functions (POST /api/contact,
// POST /api/careers), which run validation, spam protection and file sniffing
// server-side, then deliver to the configured sink.

const networkError = {
  ok: false,
  message: "Network error. Please check your connection and try again.",
};

export async function submitContactInquiry(
  data: ContactFormData,
  honeypot = ""
): Promise<ContactResponse> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, website: honeypot }),
    });
    const result = (await response.json()) as ContactResponse;
    return result.ok ? result : { ok: false, message: result.message };
  } catch {
    return networkError;
  }
}

export async function submitApplication(
  data: CareerFormData,
  honeypot = ""
): Promise<ApplicationResponse> {
  try {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("position", data.position);
    formData.append("message", data.message);
    formData.append("website", honeypot);
    if (data.resume) formData.append("resume", data.resume);

    const response = await fetch("/api/careers", { method: "POST", body: formData });
    const result = (await response.json()) as ApplicationResponse;
    return result.ok ? result : { ok: false, message: result.message };
  } catch {
    return networkError;
  }
}
