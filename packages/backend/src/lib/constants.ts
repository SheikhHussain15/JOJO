export const CONTACT_INTERESTS = [
  "Automotive",
  "Machinery",
  "Partnership",
  "General",
] as const;

export const RESUME_ACCEPT_EXTENSIONS: readonly string[] = [".pdf", ".doc", ".docx"];

export const DEFAULT_RESUME_MAX_SIZE_MB = 3;

// Hard ceiling for the multipart upload parser. The per-request limit comes
// from RESUME_MAX_SIZE_MB (checked during validation); this only keeps absurd
// bodies from exhausting memory before they reach it.
export const RESUME_HARD_LIMIT_MB = 10;

export function getResumeMaxSizeMb(): number {
  const raw = process.env.RESUME_MAX_SIZE_MB;
  if (!raw) return DEFAULT_RESUME_MAX_SIZE_MB;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0
    ? parsed
    : DEFAULT_RESUME_MAX_SIZE_MB;
}

export function getAllowedCorsOrigins(): string[] | undefined {
  const raw = process.env.CORS_ORIGINS;
  if (!raw) return undefined;
  return raw
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}
