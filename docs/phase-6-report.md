# Phase 6: Forms / Backend / File Uploads — Implementation Report

## Goal
Make the contact and career forms production-ready with secure server-side handling: validation, spam protection, safe resume upload, and a pluggable delivery destination on **Vercel Functions**.

## Status: Complete
All Phase 6 tasks implemented. `tsc` + Vite production build pass, oxlint clean (no new issues), and the 20-case scripted API test suite passes end-to-end.

---

## 1. API Routes

| Route | Method | Content type | Purpose |
| :--- | :--- | :--- | :--- |
| `/api/contact` | `POST` | `application/json` | Contact inquiry (Name, Email, Phone, Company, Subject, Message, Interest) |
| `/api/careers` | `POST` | `multipart/form-data` | Job application (Full Name, Email, Phone, Position, Message + Resume file) |

Both are Vercel Functions in `api/` exporting the web-standard `fetch` handler shape (`export const config = { runtime: "nodejs" }` + `export async function POST(request)`). Handlers return consistent `{ ok: boolean, message?, errors? }` JSON with `Cache-Control: no-store`, and reject any method other than `POST` with `400`.

---

## 2. Environment Variables

| Variable | Default | Purpose |
| :--- | :--- | :--- |
| `CONTACT_RECIPIENT_EMAIL` | empty | Recipient `to` field attached to delivery records |
| `RESUME_MAX_SIZE_MB` | `3` | Server-enforced resume size cap (must stay under Vercel's 4.5 MB body limit) |
| `FORM_DELIVERY_URL` | unset | Optional webhook/CRM/email-API endpoint; when set, submissions are POSTed there as JSON |
| `FORM_DELIVERY_TOKEN` | unset | Optional `Authorization: Bearer` token for `FORM_DELIVERY_URL` |
| `NODE_ENV` | — | Set by Vercel; leave unset locally |

When `FORM_DELIVERY_URL` is unset, submissions fall back to a local **dev sink** (see §5). Documented in `.env.example`; never commit real values (`.env` gitignored).

---

## 3. File Restrictions (Resumes)

- **Allowed extensions:** `.pdf`, `.doc`, `.docx` (server allow-list, mirror of the client config).
- **Size limit:** `RESUME_MAX_SIZE_MB` (default 3 MB), enforced server-side. Client config in `src/data/contact.ts` synced to 3 MB.
- **Content sniffing:** the first 16 bytes are checked against known magic numbers — PDF (`%PDF`), legacy DOC (OLE `D0 CF 11 E0`), DOCX (ZIP `PK\x03\x04`). The **client-supplied MIME type is never trusted** (spec §36); a text file renamed to `.pdf` or a `.doc` containing PDF content is rejected with a clear error.
- **Safe naming:** the stored file is renamed to `crypto.randomUUID().<kind>`; the original name is kept only as metadata. No user-controlled path ever reaches disk.
- **No public exposure:** resume files are written to the gitignored dev sink `server/.data/uploads/`, never into `public/`, and are never served by the app.

---

## 4. Security Decisions

- **Server-side validation** duplicates and enforces all client rules (required fields, email/phone format, message length cap 5000) so the API is safe to call directly.
- **Honeypot (`website` field):** a hidden, off-screen input is rendered in both forms. Real users never touch it; if a filled value arrives, the submission is **silently accepted** (HTTP 200) but **never delivered** — the spammer learns nothing.
- **Too-many-fields guard:** bodies with more than 20 keys are treated as bot traffic (silent accept, no delivery).
- **No secrets in frontend:** the browser bundle only knows `/api/contact` and `/api/careers`; all configuration lives in server env vars.
- **Malformed input:** malformed JSON and invalid multipart bodies return `400` with a safe message; delivery failures return `500` so the client can retry.
- **Delivery failures are loud:** any error in the delivery sink (or the configured webhook) logs server-side and returns `500`.

---

## 5. Pluggable Delivery & Dev Sink

`api/_lib/deliver.ts` is provider-agnostic:

- **Production mode** (`FORM_DELIVERY_URL` set): POSTs the submission as JSON to the configured endpoint (email API, CRM webhook, etc.) with an optional bearer token. Wire up a real provider by setting env vars only.
- **Dev mode** (no URL set): appends a JSON record to `server/.data/outbox.jsonl` (gitignored) and writes the sanitized resume to `server/.data/uploads/`. The outbox stores metadata only (no resume bytes), keeping the dev footprint inspectable and small.

---

## 6. Local Dev Server & Test Harness

- `npm run dev:api` (`scripts/dev-api.ts`) — tiny Node HTTP server mounting the **same handler functions** on `/api/contact` + `/api/careers`, so the exact production code path (validation → spam → file sniffing → delivery) runs locally. A Vite dev proxy forwards `/api/*` to `:8787`.
- `npm run test:api` (`scripts/test-api.ts`) — posts real multipart/JSON requests against the dev server and asserts status + error shapes. All **20 cases pass**: valid contact/career submissions (outbox + upload written), missing/invalid fields → 400 with errors, malformed JSON → 400, oversized (4 MB) → 400, disallowed extension (`.exe`) → 400, renamed text-as-pdf and pdf-as-doc → 400 (magic sniff), honeypot → 200 but not delivered, too-many-fields → 200 but not delivered, GET/PUT on POST routes → 400.

---

## 7. Deployment Notes

- **SPA fallback:** `vercel.json` rewrites `/((?!api/).*)` → `/index.html`, so client-side routes (`/about`, `/machinery/:slug`, …) work on the production host while `/api/*` is excluded from the rewrite.
- **Body limit:** Vercel Functions cap requests at 4.5 MB; the 3 MB resume cap keeps requests safely under it. Do not raise `RESUME_MAX_SIZE_MB` above ~4.
- **Real delivery:** set `FORM_DELIVERY_URL` (+ `FORM_DELIVERY_TOKEN`) in the Vercel dashboard to switch from the dev sink to a real destination; no code change required.
- **Type scoping:** `api/` and `scripts/` type-check under `tsconfig.node.json` (Node-only, no DOM lib) and are never pulled into the browser bundle.

---

## 8. Files Changed / Created

### New
```
vercel.json
.env.example
api/contact.ts            Vercel POST handler (JSON)
api/careers.ts            Vercel POST handler (multipart)
api/_lib/{constants,validation,spam,file,deliver,response}.ts
scripts/dev-api.ts        Local dev server mounting the same handlers
scripts/test-api.ts       20-case end-to-end test suite
src/lib/forms.ts          Real fetch calls (replaced Phase 5 stubs)
```

### Modified
```
.gitignore                server/.data/ sink, .env*
package.json              dev:api / test:api scripts
vite.config.ts            /api proxy → http://localhost:8787
src/data/contact.ts       RESUME_MAX_SIZE_MB 10 → 3 (Vercel 4.5 MB constraint)
src/pages/ContactPage.tsx Hidden honeypot field, passes value to submitContactInquiry
src/pages/CareersPage.tsx Hidden honeypot field, passes value to submitApplication
```

---

## 9. Tests Performed

| Check | Result |
| :--- | :--- |
| `npm run build` (tsc + vite) | ✅ zero errors, API excluded from browser bundle |
| `npm run lint` (oxlint) | ✅ no new issues (only pre-existing Phase 2 warning) |
| `npm run test:api` | ✅ 20/20 cases pass |
| `npm run dev:api` | ✅ boots on :8787, `/health` responds |

---

## 10. Known Issues & Deferred

- **Rate limiting / reCAPTCHA** beyond the honeypot — serverless rate limiting needs a shared store; noted for Phase 8 hardening.
- **Real delivery credentials** (SMTP/CRM) — pluggable via `FORM_DELIVERY_URL`/`FORM_DELIVERY_TOKEN`; must be supplied by the business before production go-live.
- **Verified contact details / real job openings** — carried from Phase 5 (business data pending).
- Pre-existing `react-hooks/exhaustive-deps` warning in `CinematicFrameCanvas.tsx` (Phase 2, carried).

---

## Phase Completion Checklist

- [x] Server-side validation (contact + career)
- [x] Client-side validation retained (Phase 5)
- [x] Upload size limit (server-enforced, configurable via env)
- [x] Extension validation + MIME validation (sniffed, not trusted)
- [x] Safe filenames (sanitized, UUID-stored)
- [x] No public exposure of uploaded resumes (dev sink, never in `public/`)
- [x] Clear error + success messages; retry support
- [x] No secrets in frontend; env vars only
- [x] `docs/phase-6-report.md` documenting routes, env vars, file restrictions, security decisions
- [x] Production build passes
