# Phase 5: About / Careers / Contact — Implementation Report

## Goal
Complete the company and conversion pages: `/about`, `/careers`, `/contact`, visually connected to the homepage and reusing the established design system.

## Status: Complete
All Phase 5 tasks implemented, production build passes with zero errors.

---

## 1. No-Fabrication Gates (spec §23, §24, §25)

Every spec-required section was built against approved content only:

| Item | Spec requirement | Decision |
| :--- | :--- | :--- |
| Contact details | Verify before launch (§25) | Rendered from `company.contact` (still placeholder — flagged to business) |
| Office address / map | "Map / location area" | Honest placeholder panel: office name + `locationNote` ("shared directly on request") — no fake address/pin |
| Job openings | "Open positions" | `openPositions` intentionally empty; honest "No current openings — speculative applications welcome" state + full application form |
| CEO / leadership | Display approved content; no invented bio (§23) | Name + title card only (`company.ceo`), initial-based avatar placeholder for future approved photo |
| Why JOJO (careers) | "Why work with JOJO" | Approved service/quality/affordability pillars, reworded to career context in `src/data/careers.ts` |

**Result:** No invented addresses, job roles, contact info, or biography anywhere.

---

## 2. Content & Data Architecture (spec §37)

```
src/types/contact.ts    ContactInterest, ContactFormData, ContactResponse
src/types/careers.ts    CareerPosition, CareerFormData, ApplicationResponse
src/data/contact.ts     CONTACT_INTERESTS (Automotive/Machinery/Partnership/General), resume rules (configurable)
src/data/careers.ts     careerPerks, openPositions (empty), positionOptions ("General Application")
src/data/company.ts     contact block extended with locationNote (no fake address)
```

Resume restrictions are configurable per spec §24: `RESUME_ACCEPT = ".pdf,.doc,.docx"`, `RESUME_MAX_SIZE_MB = 10`.

---

## 3. Reusable Form Primitives (`src/components/forms/`)

| Component | Purpose |
| :--- | :--- |
| `FormField` | Input / textarea / select with label, required marker, error message, `aria-invalid`, `aria-describedby`; design-system styling (gold focus ring) |
| `FileInput` | Drag-drop + browse, configurable accept + max size, client-side validation, selected-file chip with remove, drag-highlight state |
| `FormStatus` | Polished idle/submitting/success/error states — spinner, check, alert, reset/retry actions |
| `useFormStatus` | `idle → submitting → success/error` state machine shared by both forms |

---

## 4. Pages

### `/about` — AboutPage
Hero (tagline) → Who We Are (`brandIntro`) → Story (reused `CompanyStory`) → What We Do (Automotive + Machinery cards linking to their pages) → Vision (reused `VisionSection`) → Mission (reused `MissionSection`) → Leadership (CEO name/title card) → CTA (reused `CtaSection`).

### `/careers` — CareersPage
Hero → Why JOJO (approved pillars) → Open Positions (empty-state card, data-driven from `openPositions`) → Application form (Full Name, Email, Phone, Position select, Message, Resume upload). Resume required + validated client-side (PDF/DOC/DOCX ≤ 10 MB). Privacy note ties to Phase 6 secure upload.

### `/contact` — ContactPage
Hero → Office/Email/Phone cards (from `company.contact`, with `mailto:`/`tel:` links) → Contact form (Name, Email, Phone, Company, Interest select, Subject, Message) → Map/location placeholder panel.

**`?product=` prefill:** reads `useSearchParams().get("product")`; prefills `interest = "Machinery"`, `subject = "Inquiry about: <slug>"`, and shows a dismissible notice chip ("You're inquiring about <slug>") that clears the prefill and rewrites the URL via `navigate("/contact", { replace: true })`. This completes the existing `ProductDetail` inquiry CTA flow.

---

## 5. Phase 6 Submit Seam (`src/lib/forms.ts`)

```ts
export async function submitContactInquiry(data: ContactFormData): Promise<ContactResponse>
export async function submitApplication(data: CareerFormData): Promise<ApplicationResponse>
```

Both currently simulate the round-trip (1.2s latency, `{ ok: true }`) so all loading/success/error UI is exercised. Phase 6 replaces the bodies with real API calls while keeping the same contracts — no page changes required.

---

## 6. Routing & Navigation IA (spec §27 footer)

- `src/App.tsx`: added `/about`, `/careers`, `/contact` routes.
- `Navbar`: links now `Automotive / Machinery / About / Careers / Contact`; "Inquiries" CTA → `/contact`; mobile menu same.
- `Footer`: nav per spec §27 (Automotive, Machinery, About, Careers, Contact).
- `AutomotivePage` + `MachineryDetailPage` "Request Information" buttons switched `href` → `to` (SPA, no reload).
- Homepage CTA decision: `CtaSection` (Request Information) now routes to `/contact`; `AutomotiveSection` "Explore Automotive" routes to `/automotive` (was a mispointed `#contact`). Homepage keeps in-page `#about`/`#contact` anchors for scroll (BrandIntro, ContactTeaser).

---

## 7. Files Changed / Created

### New
```
src/types/contact.ts
src/types/careers.ts
src/data/contact.ts
src/data/careers.ts
src/lib/forms.ts
src/components/forms/{FormField,FileInput,FormStatus,useFormStatus}.{tsx,ts}
src/pages/{AboutPage,CareersPage,ContactPage}.tsx
```

### Modified
```
src/data/company.ts        → contact.locationNote
src/App.tsx                → 3 new routes
src/components/navigation/Navbar.tsx → routes + CTA targets
src/components/layout/Footer.tsx     → careers link, route targets
src/components/sections/CtaSection.tsx      → CTA routes to /contact
src/components/sections/AutomotiveSection.tsx → CTA routes to /automotive
src/pages/AutomotivePage.tsx, src/pages/MachineryDetailPage.tsx → Button href→to
```

---

## 8. Tests Performed
| Check | Result |
| :--- | :--- |
| `npm run build` (tsc + vite) | ✅ zero errors (2 TS issues fixed: FormStatus type/component name collision, unused import) |
| `npm run lint` (oxlint) | ✅ no new issues (only pre-existing Phase 2 warning) |
| Preview server routes | ✅ `/`, `/about`, `/careers`, `/contact`, `/contact?product=test` all serve 200 |
| No-fabrication gate | ✅ empty positions, placeholder map, placeholder contact, CEO name/title only |

---

## 9. Known Issues & Deferred
- **Verified contact details / office address / map embed** — pending business data (blocker for production contact page).
- **Real job openings** — `openPositions` empty until business provides roles; data-driven so they drop in.
- **CEO photo + message** — avatar placeholder shown; approved asset slots noted.
- **Backend for both forms** (API, server-side validation, spam protection, secure file upload, email/CRM) → **Phase 6**. Seams ready.
- **Privacy/Terms pages, 404 polish, SEO metadata** → **Phase 7**.
- Pre-existing `react-hooks/exhaustive-deps` warning in `CinematicFrameCanvas.tsx` (Phase 2, carried).

---

## Phase Completion Checklist
- [x] `/about` — Hero, Who We Are, Story, What We Do, Vision, Mission, Leadership, CTA; approved content only
- [x] `/careers` — Hero, Why JOJO, Open positions, Application form, Resume upload; no fabricated openings
- [x] `/contact` — Hero, Office, Email, Phone, Contact form, Map/location; `?product=` prefill works
- [x] Contact fields: Name, Email, Phone, Company, Subject, Message, Interest (Automotive/Machinery/Partnership/General)
- [x] Careers fields: Full Name, Email, Phone, Position, Message, Resume; resume rules configurable (PDF/DOC/DOCX)
- [x] Polished loading/error/success states on both forms
- [x] Pages visually connected to homepage (shared design system)
- [x] No fabricated content (no invented address, openings, contact info, or bio)
- [x] Production build passes
