# Phase 6: Forms / Backend / File Uploads — Step-by-Step Implementation Tasks

## Goal
Make the contact and career forms production-ready with secure server-side handling: validation, spam protection, safe resume upload, and a pluggable delivery destination. Platform: **Vercel Functions** (user decision).

## Status: Complete — see `docs/phase-6-report.md`

---

## 0. Critical Upfront Findings (from repository audit — read before coding)

1. **No API/server exists.** The repo is a pure static Vite+React SPA. There is nothing to reuse, so Phase 6 introduces the backend from scratch. Provider-agnostic core, thin Vercel adapter layer.
2. **Platform constraint (hard):** Vercel Functions have a **4.5 MB request/response body limit**. Resumes must therefore be capped well under this — `RESUME_MAX_SIZE_MB` default should drop to **3 MB** (safely under the limit, still fine for PDF/DOC/DOCX resumes). This must stay in sync between client config (`src/data/contact.ts`) and server config.
3. **Node 24** is installed locally (native `Request`/`Response`, `FormData`, `File`, `crypto.randomUUID`, top-level fetch). The API layer can avoid runtime dependencies entirely (no Express, no multer/busboy).
4. **Vercel handler contract:** files in `/api/*.ts` at project root export a web-standard handler. Use the **`fetch` web-standard export** (`export const config` + `export function POST(request)` or a default `fetch(request)` handler) returning `Response`. Verified against Vercel docs (Node.js runtime, web-standard Request/Response).
5. **No credentials exist** (no SMTP, no CRM, no storage provider). Delivery destination must be **pluggable via env vars** with a local "dev sink" fallback so the pipeline is testable now and wired later. Never hardcode secrets; never put secrets in frontend code.
6. **Existing form seam:** Phase 5 built `src/lib/forms.ts` with `submitContactInquiry` / `submitApplication` async stubs (1.2s fake latency, `{ ok: true }`). Phase 6 replaces their bodies with real `fetch` calls to `/api/contact` and `/api/careers` while keeping the same contracts and UI untouched.
7. **SPA fallback:** client-side routes (`/about`, `/machinery/:slug`, etc.) need a `vercel.json` rewrite to `index.html` on the production host (Phase 4 flagged this). Must exclude `/api/*` from the rewrite.
8. **tsconfig scope:** `tsconfig.app.json` includes only `src/`. The new `api/` directory + scripts must NOT be pulled into the browser bundle's TS config (node-only). They type-check independently (or via a dedicated config if needed). oxlint must not break on them.

---

## STEP-BY-STEP TASKS

### STEP 1 — Configuration Files (Vercel + env)
- [x] `vercel.json` at repo root:
  - rewrite `/((?!api/).*)` → `/index.html` (SPA fallback, excludes API)
- [x] `.env.example` documenting env vars (values NEVER committed):
  - `CONTACT_RECIPIENT_EMAIL`
  - `RESUME_MAX_SIZE_MB` (default 3)
  - `FORM_DELIVERY_URL` (optional webhook/CRM/email API endpoint)
  - `FORM_DELIVERY_TOKEN` (optional auth token for that endpoint)
  - `NODE_ENV` note (dev uses local sink)
- [x] `.gitignore`: add `.env`, `.env.*` (keep `.env.example`), and local sink directory (`server/.data/`)

**Deliverable:** Vercel deploy config + env contract documented.

---

### STEP 2 — Shared Server Core (`server/` or `api/_lib/`, node-only)
Create provider-agnostic modules (zero runtime deps):

- [x] `api/_lib/validation.ts`
  - `validateEmail`, `validatePhone` (loose, optional), `required` string checks
  - `validateContactFields(body)` → `{ ok, errors }` (name, email, message required; subject optional)
  - `validateCareerFields(body)` → `{ ok, errors }` (fullName, email required; position required; message optional)
  - Trim inputs; length caps (e.g. 5000 for message) to bound memory
- [x] `api/_lib/constants.ts`
  - `CONTACT_INTERESTS` (sync with `src/data/contact.ts`), `RESUME_MAX_SIZE_MB` (default 3, overridable via env), `RESUME_ACCEPT` extensions
- [x] `api/_lib/spam.ts`
  - Honeypot: reject (silently return 200 "ok" without delivering) if a hidden field (`website` field present+filled) is submitted
  - Basic checks: all-whitespace message, message length sanity, too-many-fields guard
- [x] `api/_lib/file.ts`
  - `validateResume(file)` → extension allow-list (pdf/doc/docx) **AND** MIME sniffing from the first bytes (PDF `%PDF`, DOC `D0 CF 11 E0` OLE magic, DOCX ZIP `PK\x03\x04`); **never trust client MIME alone** (spec §36)
  - Size check against `RESUME_MAX_SIZE_MB`
  - `sanitizeFileName(originalName)` → strip path separators / dangerous chars; generate safe stored name via `crypto.randomUUID()` + allowed extension
- [x] `api/_lib/deliver.ts`
  - `deliverContact(form)` / `deliverApplication(form)` async
  - If `FORM_DELIVERY_URL` set → `fetch` POST with `FORM_DELIVERY_TOKEN` header (JSON payload)
  - Else → **local sink**: append JSON record (no resume content; just metadata) to `server/.data/outbox.jsonl` for dev inspection
- [x] `api/_lib/response.ts`
  - `json(data, status)` helper → `new Response(JSON.stringify(...), { headers, status })`

**Deliverable:** Node-only core, dependency-free, provider-agnostic, testable in isolation.

---

### STEP 3 — Vercel Handlers (`api/contact.ts`, `api/careers.ts`)
- [x] `api/contact.ts` — export a web-standard POST handler (`fetch`-style):
  - parse JSON body (guard malformed JSON → 400)
  - run spam checks → if honeypot hit, return 200 success (never acknowledge detection)
  - `validateContactFields` → 400 with field errors if invalid
  - `deliverContact` → 200 success / 500 on delivery failure (retryable by client)
- [x] `api/careers.ts` — export a web-standard POST handler:
  - parse **multipart/form-data** via `await request.formData()` (Node 24 native)
  - extract fields + `resume` File
  - spam checks (honeypot), field validation → 400 with errors
  - `validateResume` (extension + MIME sniff + size) → 400 with clear error if rejected
  - `sanitizeFileName` → safe stored name
  - `deliverApplication` → 200 / 500
- [x] Ensure handlers set `Cache-Control: no-store`, accept only POST, and return consistent `{ ok, message?, errors? }` JSON so the Phase 5 UI states (loading/success/error) bind cleanly

**Deliverable:** Two Vercel Functions matching the documented API contract.

---

### STEP 4 — Local Dev Sink + Test Harness (verifiable without deploying)
- [x] `server/` local sink directory auto-created on first write (gitignored)
- [x] `scripts/dev-api.ts` (or `.mjs`): tiny node server that mounts the same core logic on `/api/contact` + `/api/careers` using Node's `http` + `FormData` parsing, so `npm run dev:api` exercises the exact production path locally
- [x] `scripts/test-api.ts`: node test script that posts valid + invalid + oversized + honeypot + wrong-type resume cases against the dev server and asserts status/error shapes

**Deliverable:** Local verification of the full pipeline (validation, spam, file sniffing, size, delivery) without a Vercel account.

---

### STEP 5 — Frontend Wiring (`src/lib/forms.ts`)
- [x] Replace stub bodies with real calls:
  - `submitContactInquiry(data)` → `POST /api/contact` with JSON body
  - `submitApplication(data)` → `POST /api/careers` with `FormData` (fields + resume File)
- [x] Map HTTP/parse failures → `{ ok: false, message }` so `FormStatus` shows the error state and offers retry (retry support requirement)
- [x] Keep function signatures identical — ContactPage/CareersPage unchanged
- [x] Sync `src/data/contact.ts` `RESUME_MAX_SIZE_MB` → 3 (platform constraint)

**Deliverable:** Real end-to-end form submission with the existing UI.

---

### STEP 6 — Build, Lint, Manual & Scripted Verify
- [x] `npm run build` (tsc for `src/` + vite) still green; confirm `api/` excluded from browser bundle
- [x] `npm run lint` (oxlint) clean (add ignores if needed for node-only files)
- [x] Run `scripts/test-api` — all cases pass:
  - valid contact → 200 ok
  - missing name/email/message → 400 errors
  - malformed JSON → 400
  - valid career application with real PDF → 200, file sanitized
  - oversized file → 400 clear message
  - `.exe` / renamed-txt-as-pdf → 400 (MIME sniff catches)
  - honeypot filled → 200 ok, NOT delivered
- [ ] Manually submit both forms in dev against dev-api server; confirm loading → success and error → retry flows

**Deliverable:** All tests green; production build passes.

---

### STEP 7 — Document Phase 6
- [x] Write `docs/phase-6-report.md` covering (spec-mandated):
  - API routes (`/api/contact`, `/api/careers`)
  - environment variables table
  - file restrictions (extensions, MIME sniffing, size limit, safe naming)
  - security decisions (no client-MIME trust, honeypot, no secrets in frontend, no public resume exposure)
  - deployment notes (vercel.json SPA rewrite, Vercel 4.5MB limit, outbox sink → swap to real delivery via env)

**Deliverable:** `docs/phase-6-report.md`.

---

## Deliberately OUT OF SCOPE (later phases)
- SEO metadata, a11y polish, responsive audit, polished 404 → **Phase 7**
- Perf/QA/production go-live + real SMTP/CRM credentials → **Phase 8**
- Rate limiting / reCAPTCHA beyond honeypot → Phase 8 hardening note (serverless rate limiting needs a store; documented)

---

## PHASE COMPLETION CHECKLIST (from spec)
- [x] Server-side validation (contact + career)
- [x] Client-side validation retained (Phase 5)
- [x] Upload size limit (server-enforced, configurable via env)
- [x] Extension validation + MIME validation (sniffed, not trusted)
- [x] Safe filenames (sanitized, UUID-stored)
- [x] No public exposure of uploaded resumes (outbox sink, never in `public/`)
- [x] Clear error + success messages; retry support
- [x] No secrets in frontend; env vars only
- [x] `docs/phase-6.md` documenting routes, env vars, file restrictions, security decisions
- [x] Production build passes
