export const CONTACT_INTERESTS = [
  "Automotive",
  "Machinery",
  "Partnership",
  "General",
] as const;

export const RESUME_ACCEPT_EXTENSIONS: readonly string[] = [".pdf", ".doc", ".docx"];

export const DEFAULT_RESUME_MAX_SIZE_MB = 3;

export function getResumeMaxSizeMb(): number {
  const raw = process.env.RESUME_MAX_SIZE_MB;
  if (!raw) return DEFAULT_RESUME_MAX_SIZE_MB;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0
    ? parsed
    : DEFAULT_RESUME_MAX_SIZE_MB;
}
