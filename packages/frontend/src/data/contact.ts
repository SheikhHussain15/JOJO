import type { ContactInterest } from "../types/contact";

export const CONTACT_INTERESTS: ContactInterest[] = [
  "Automotive",
  "Machinery",
  "Partnership",
  "General",
];

export const RESUME_ACCEPT = ".pdf,.doc,.docx";
export const RESUME_ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"] as const;
export const RESUME_MAX_SIZE_MB = 3;
