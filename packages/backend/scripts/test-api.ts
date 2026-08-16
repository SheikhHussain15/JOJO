// End-to-end API tests. Boots the real Express app on an ephemeral port and
// asserts over HTTP against the dev sink (.data/). No external services needed.
// Usage: npm run test -w packages/backend  (or: node scripts/test-api.ts)

import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { createApp } from "../src/app.ts";

const DATA_DIR = join(process.cwd(), ".data");
const OUTBOX_FILE = join(DATA_DIR, "outbox.jsonl");
const UPLOADS_DIR = join(DATA_DIR, "uploads");

let failures = 0;
let checks = 0;

interface JsonBody {
  ok?: boolean;
  message?: string;
  errors?: Record<string, string>;
}

function parse(res: Response): Promise<JsonBody> {
  return res.json() as Promise<JsonBody>;
}

function assert(cond: boolean, label: string): void {
  checks++;
  if (cond) {
    console.log(`  ok    ${label}`);
  } else {
    failures++;
    console.error(`  FAIL  ${label}`);
  }
}

async function outboxCount(): Promise<number> {
  try {
    const content = await readFile(OUTBOX_FILE, "utf8");
    return content.split("\n").filter((line) => line.trim().length > 0).length;
  } catch {
    return 0;
  }
}

async function uploadCount(): Promise<number> {
  try {
    const entries = await readdir(UPLOADS_DIR);
    return entries.length;
  } catch {
    return 0;
  }
}

function makePdfBytes(extra = ""): Uint8Array<ArrayBuffer> {
  return new TextEncoder().encode(
    `%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\n%%EOF${extra}`
  );
}

function makeDocBytes(): Uint8Array<ArrayBuffer> {
  return Uint8Array.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1, 0x00, 0x01, 0x02, 0x03]);
}

function makeDocxBytes(): Uint8Array<ArrayBuffer> {
  return Uint8Array.from([0x50, 0x4b, 0x03, 0x04, 0x00, 0x00, 0x00, 0x00, 0x01, 0x02, 0x03, 0x04]);
}

function validResumeForm(name = "resume.pdf", bytes?: Uint8Array<ArrayBuffer>): FormData {
  const form = new FormData();
  form.append("fullName", "Test Applicant");
  form.append("email", "tester@example.com");
  form.append("phone", "+1 555 123 4567");
  form.append("position", "Automotive Technician");
  form.append("message", "I would love to join the team.");
  form.append(
    "resume",
    new File([bytes ?? makePdfBytes()], name, { type: "application/pdf" })
  );
  return form;
}

async function run(base: string): Promise<void> {
  const postContact = (init: RequestInit): Promise<Response> =>
    fetch(`${base}/api/contact`, init);
  const postCareers = (init: RequestInit): Promise<Response> =>
    fetch(`${base}/api/careers`, init);

  console.log("\n/api/contact");
  {
    const before = await outboxCount();
    const res = await postContact({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Ada Lovelace",
        email: "ada@example.com",
        phone: "",
        company: "Analytical Engines",
        subject: "Partnership",
        message: "Hello, we are interested in partnering.",
        interest: "Partnership",
      }),
    });
    const body = await parse(res);
    assert(res.status === 200 && body.ok === true, "valid submission → 200 ok");
    assert((await outboxCount()) === before + 1, "valid submission → outbox +1");
  }

  {
    const res = await postContact({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "", email: "not-an-email", message: "" }),
    });
    const body = await parse(res);
    assert(
      res.status === 400 &&
        Boolean(body.errors?.name) &&
        Boolean(body.errors?.email) &&
        Boolean(body.errors?.message),
      "missing/invalid fields → 400 with errors"
    );
  }

  {
    const res = await postContact({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{ not json",
    });
    assert(res.status === 400, "malformed JSON → 400");
  }

  {
    const before = await outboxCount();
    const res = await postContact({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Spam Bot",
        email: "spam@example.com",
        message: "Buy now",
        website: "http://spam.example.com",
      }),
    });
    const body = await parse(res);
    assert(res.status === 200 && body.ok === true, "honeypot hit → accepted (200)");
    assert((await outboxCount()) === before, "honeypot hit → NOT delivered");
  }

  {
    const extraFields: Record<string, unknown> = {};
    for (let i = 0; i < 25; i++) extraFields[`field_${i}`] = "x";
    const before = await outboxCount();
    const res = await postContact({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Bot", email: "bot@example.com", message: "hi", ...extraFields }),
    });
    assert(res.status === 200 && (await outboxCount()) === before, "too many fields → accepted but not delivered");
  }

  {
    const res = await fetch(`${base}/api/contact`, { method: "GET" });
    assert(res.status === 400, "GET on /api/contact → 400");
  }

  console.log("\n/api/careers");
  {
    const beforeOutbox = await outboxCount();
    const beforeUploads = await uploadCount();
    const res = await postCareers({
      method: "POST",
      body: validResumeForm(),
    });
    const body = await parse(res);
    assert(res.status === 200 && body.ok === true, "valid application with .pdf → 200 ok");
    assert((await outboxCount()) === beforeOutbox + 1, "valid application → outbox +1");
    assert((await uploadCount()) === beforeUploads + 1, "valid application → upload stored");
  }

  {
    const res = await postCareers({
      method: "POST",
      body: validResumeForm("resume.doc", makeDocBytes()),
    });
    assert(res.status === 200, "valid .doc → 200 ok");
  }

  {
    const res = await postCareers({
      method: "POST",
      body: validResumeForm("resume.docx", makeDocxBytes()),
    });
    assert(res.status === 200, "valid .docx → 200 ok");
  }

  {
    const form = new FormData();
    form.append("fullName", "Test Applicant");
    form.append("email", "tester@example.com");
    form.append("position", "Automotive Technician");
    form.append("message", "Applying.");
    const res = await postCareers({ method: "POST", body: form });
    assert(res.status === 400, "missing resume → 400");
  }

  {
    const big = new Uint8Array(4 * 1024 * 1024); // 4 MB > 3 MB limit
    big.set(makePdfBytes());
    const res = await postCareers({
      method: "POST",
      body: validResumeForm("resume.pdf", big),
    });
    assert(res.status === 400, "oversized resume (4MB > 3MB) → 400");
  }

  {
    const res = await postCareers({
      method: "POST",
      body: validResumeForm("resume.exe", makePdfBytes()),
    });
    assert(res.status === 400, "disallowed extension (.exe) → 400");
  }

  {
    // Text disguised as .pdf → magic bytes don't match → rejected.
    const spoof = new TextEncoder().encode("This is definitely not a pdf file at all.");
    const res = await postCareers({
      method: "POST",
      body: validResumeForm("resume.pdf", spoof),
    });
    assert(res.status === 400, "renamed text file as .pdf → 400 (magic mismatch)");
  }

  {
    // Valid PDF content renamed to .doc → extension/content mismatch → rejected.
    const res = await postCareers({
      method: "POST",
      body: validResumeForm("resume.doc", makePdfBytes()),
    });
    assert(res.status === 400, "PDF content renamed to .doc → 400 (mismatch)");
  }

  {
    const before = await outboxCount();
    const form = validResumeForm();
    form.append("website", "http://spam.example.com");
    const res = await postCareers({ method: "POST", body: form });
    assert(res.status === 200 && (await outboxCount()) === before, "honeypot hit → accepted but not delivered");
  }

  {
    const res = await fetch(`${base}/api/careers`, { method: "PUT" });
    assert(res.status === 400, "PUT on /api/careers → 400");
  }
}

console.log("[test:api] booting Express app on an ephemeral port");
delete process.env.FORM_DELIVERY_URL;

const server = createServer(createApp());
await new Promise<void>((resolve, reject) => {
  server.once("error", reject);
  server.listen(0, "127.0.0.1", resolve);
});
const { port } = server.address() as AddressInfo;

try {
  await run(`http://127.0.0.1:${port}`);
} finally {
  server.close();
}

console.log(`\n${checks - failures}/${checks} checks passed`);
if (failures > 0) process.exit(1);
