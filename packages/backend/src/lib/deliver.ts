import { appendFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { ContactFormData, CareerFormData } from "./validation.ts";

// Provider-agnostic delivery:
//  - If FORM_DELIVERY_URL is set, POST the submission as JSON to that endpoint
//    (e.g. an email API, CRM webhook, or any provider) with an optional bearer
//    token from FORM_DELIVERY_TOKEN.
//  - Otherwise, write to a local dev sink under .data/ (gitignored) so the
//    pipeline is inspectable locally without any external service.

const DATA_DIR = join(process.cwd(), ".data");
const OUTBOX_FILE = join(DATA_DIR, "outbox.jsonl");
const UPLOADS_DIR = join(DATA_DIR, "uploads");

async function appendOutbox(record: object): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await appendFile(
    OUTBOX_FILE,
    JSON.stringify({ at: new Date().toISOString(), ...record }) + "\n",
    "utf8"
  );
}

async function deliverViaUrl(payload: object): Promise<void> {
  const url = process.env.FORM_DELIVERY_URL;
  if (!url) throw new Error("FORM_DELIVERY_URL is not set.");

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const token = process.env.FORM_DELIVERY_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Delivery endpoint responded ${response.status}.`);
  }
}

export interface ContactDeliveryRecord extends ContactFormData {
  type: "contact";
  to: string;
}

export async function deliverContact(form: ContactFormData): Promise<void> {
  const record: ContactDeliveryRecord = {
    type: "contact",
    to: process.env.CONTACT_RECIPIENT_EMAIL ?? "",
    ...form,
  };

  if (process.env.FORM_DELIVERY_URL) {
    await deliverViaUrl(record);
    return;
  }
  await appendOutbox(record);
}

export interface CareerDeliveryRecord extends CareerFormData {
  type: "career";
  to: string;
  resume: {
    originalName: string;
    storedName: string;
    size: number;
    mime: string;
    base64: string;
  };
}

export async function deliverApplication(
  form: CareerFormData,
  resume: { originalName: string; storedName: string; size: number; mime: string; bytes: Uint8Array }
): Promise<void> {
  const record: CareerDeliveryRecord = {
    type: "career",
    to: process.env.CONTACT_RECIPIENT_EMAIL ?? "",
    ...form,
    resume: {
      originalName: resume.originalName,
      storedName: resume.storedName,
      size: resume.size,
      mime: resume.mime,
      base64: Buffer.from(resume.bytes).toString("base64"),
    },
  };

  if (process.env.FORM_DELIVERY_URL) {
    await deliverViaUrl(record);
    return;
  }

  // Dev sink: keep the resume off the public tree, stored under gitignored
  // .data/uploads/ with the safe UUID name. Only metadata goes to the outbox
  // log; the file itself is never served.
  await mkdir(UPLOADS_DIR, { recursive: true });
  await writeFile(join(UPLOADS_DIR, resume.storedName), resume.bytes);
  await appendOutbox({ ...record, resume: { ...record.resume, base64: undefined } });
}
