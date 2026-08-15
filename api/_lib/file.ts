import { randomUUID } from "node:crypto";
import { RESUME_ACCEPT_EXTENSIONS } from "./constants.ts";

export type ResumeKind = "pdf" | "doc" | "docx";

// Magic bytes — never trust the client-provided MIME type alone (spec §36).
const PDF_MAGIC = [0x25, 0x50, 0x44, 0x46]; // "%PDF"
const OLE_MAGIC = [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]; // legacy .doc container
const ZIP_MAGIC = [0x50, 0x4b, 0x03, 0x04]; // "PK\x03\x04" (.docx is a zip)

function hasMagic(bytes: Uint8Array, magic: number[]): boolean {
  if (bytes.length < magic.length) return false;
  for (let i = 0; i < magic.length; i++) {
    if (bytes[i] !== magic[i]) return false;
  }
  return true;
}

export function sniffResumeKind(bytes: Uint8Array): ResumeKind | null {
  if (hasMagic(bytes, PDF_MAGIC)) return "pdf";
  if (hasMagic(bytes, OLE_MAGIC)) return "doc";
  if (hasMagic(bytes, ZIP_MAGIC)) return "docx";
  return null;
}

export function safeStoredName(kind: ResumeKind): string {
  return `${randomUUID()}.${kind}`;
}

export interface ResumeValidationResult {
  ok: boolean;
  error?: string;
  kind?: ResumeKind;
  storedName?: string;
}

export async function validateResume(
  file: File | null,
  maxSizeMb: number
): Promise<ResumeValidationResult> {
  if (!file || file.size === 0) {
    return { ok: false, error: "Please attach your resume." };
  }

  const originalExt = (file.name.split(".").pop() ?? "").toLowerCase();
  if (!RESUME_ACCEPT_EXTENSIONS.includes(`.${originalExt}`)) {
    return {
      ok: false,
      error: `Resume must be a ${RESUME_ACCEPT_EXTENSIONS.join(" / ")} file.`,
    };
  }

  if (file.size > maxSizeMb * 1024 * 1024) {
    return {
      ok: false,
      error: `Resume is too large. Maximum size is ${maxSizeMb} MB.`,
    };
  }

  const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  const kind = sniffResumeKind(head);
  if (!kind) {
    return {
      ok: false,
      error: "The file type could not be verified. Please upload a valid PDF, DOC or DOCX file.",
    };
  }

  if (kind !== originalExt) {
    return {
      ok: false,
      error: `The file extension (.${originalExt}) does not match its actual content (.${kind}). Please upload the correct file.`,
    };
  }

  return { ok: true, kind, storedName: safeStoredName(kind) };
}
