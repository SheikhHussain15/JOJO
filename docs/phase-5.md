# Phase 5: About / Careers / Contact — Step-by-Step Implementation Tasks

## Goal
Complete the company and conversion pages: `/about`, `/careers`, `/contact`, visually connected to the homepage and reusing the established design system.

## Status: Task Plan (not yet implemented)

---

## 0. Critical Upfront Findings (from repository audit — read before coding)

1. **Contact details are placeholders.** `contact@jojo-international.com` and `+1 (555) 123-4567` in `src/data/company.ts` are flagged as placeholder per spec §25 ("Verify all production contact details before launch"). These are the single source of truth (Footer + ContactTeaser already read from `company.contact`). **Do not invent real addresses, emails, or phone numbers.** Contact page must render from `company.ts`, and the plan records a business follow-up to supply verified details.
2. **No office address or map coordinates exist.** Spec requires a "Map / location area" — but no verified address exists. Must NOT fabricate a street address or embed a fake map pin. Solution: build the map/location section as a styled placeholder area (office name + "location details shared on request" copy) that accepts a real address/embed later.
3. **No real job openings exist.** Spec requires an "Open positions" section. Must NOT fabricate job listings. Solution (mirrors Phase 4's empty-catalog decision): render an honest **"No current openings — speculative applications welcome"** empty state, with the full application form still available (Position select offers "General Application" as the default option; specific roles are added when the business posts them).
4. **CEO/leadership content is minimal.** `company.ceo` has only `name` + `title` (Shahzaib Saleem, CEO / Founder). No approved photo or message exists. Spec §23: display approved content elegantly, "Do not invent biography details." So Leadership renders the name/title card **without** a fabricated photo or bio, plus a note that photo/message assets are pending.
5. **Existing links already target `/contact`.** `ProductDetail` inquiry CTA → `/contact?product=<slug>` (preserves product), `AutomotivePage` and `MachineryDetailPage` → `href="/contact"` (plain anchor — will full-reload once the route exists; switch to `to`). The `/contact` page MUST read the `?product=` query and prefill Interest/Subject.
6. **Nav/Footer IA update.** Navbar: `About → /#about`, `Contact → /#contact`, "Inquiries" → `/#contact`. Footer: same `About`/`Contact` anchors + no Careers link. Once dedicated pages exist, Navbar/Footer should point to `/about`, `/careers`, `/contact` per spec §27 footer structure. Homepage keeps its in-page `#about` (BrandIntro) / `#contact` (ContactTeaser) anchors for homepage scroll.
7. **Forms are frontend-only in Phase 5; backend is Phase 6.** Spec §26 forbids leaving form handling entirely client-side — but the API/server layer is explicitly Phase 6. Phase 5 builds the full form UI with client-side validation and polished loading/error/success states behind a **clean submit seam** (a `submitContactInquiry` / `submitApplication` async contract) that Phase 6 wires to a real API. Document this seam in the plan.

---

## STEP-BY-STEP TASKS

### STEP 1 — Extend Approved Content Data (Business-safe)
- [ ] `src/data/company.ts`: keep everything; extend the `contact` block shape if needed (e.g. `locationNote` string, no fake address)
- [ ] Create `src/data/careers.ts` per spec §37 content architecture:
  - `careerPerks` (reuse approved Why JOJO points — satisfaction, quality, affordability)
  - `openPositions: CareerPosition[] = []` — **intentionally empty** (no fabricated roles)
  - `positionOptions` — select options: `"General Application"` (default) + note for future roles
- [ ] Create `src/data/contact.ts` (or extend company.ts) with:
  - `interestOptions = ["Automotive", "Machinery", "Partnership", "General"]` (spec §24)
  - `subjectOptions` for contact subject (only if non-fabricated; otherwise free text)
  - resume file rules: `accept = ".pdf,.doc,.docx"`, `maxSizeMb` — **configurable** per spec §24

**Deliverable:** All Phase 5 copy flows from data files; no fabricated addresses, roles, or contact info.

---

### STEP 2 — Typed Careers & Contact Models
- [ ] `src/types/careers.ts`: `CareerPosition`, `CareerFormData`, `ApplicationResponse`
- [ ] `src/types/contact.ts`: `ContactInterest`, `ContactFormData`, `ContactResponse`
- [ ] Keep types spec-exact (careers fields: Full Name, Email, Phone, Position, Message, Resume; contact fields: Name, Email, Phone, Company, Subject, Message, Interest)

**Deliverable:** Typed models in `src/types/`, data in `src/data/`.

---

### STEP 3 — Reusable Form UI Components (shared by both pages)
Create under `src/components/forms/`:
- [ ] `FormField.tsx` — label, input/select/textarea variants, error message, `aria-invalid`, `aria-describedby`; styled to the design system (zinc text, white/10 borders, focus ring gold)
- [ ] `FileInput.tsx` — drag/drop + click, accept `.pdf,.doc,.docx`, client-side size/type validation, selected-file chip with remove; file restrictions configurable via props
- [ ] `FormStatus.tsx` — polished **loading** (spinner), **success** (check + heading + next-step copy), **error** (retry + support note) states
- [ ] `useFormStatus.ts` (or inline hook) — `idle | submitting | success | error` machine driving `FormStatus`

**Deliverable:** Reusable, accessible form primitives; both pages share them.

---

### STEP 4 — Contact Page (`/contact`)
- [ ] `src/pages/ContactPage.tsx` composed of:
  - **Hero** — eyebrow + heading + supporting copy (approved `company.contact`)
  - **Office / Email / Phone** cards — identical styling to `ContactTeaser` cards, rendered from `company.contact`
  - **Contact form** — fields: Name, Email, Phone, Company, Subject, Message, Interest (select, spec §24 options)
  - **Map/location area** — styled placeholder: office name + "Exact location shared on request" (NO fabricated address/pin); slot for real embed later
- [ ] Read `?product=` via `useSearchParams`: prefill **Interest = Machinery** and/or **Subject/Message** with the product slug ("Inquiry about: <slug>"), and surface a notice chip "You're inquiring about <slug>" the user can clear
- [ ] Client-side validation: required (name, email, message), email format, phone optional-or-valid
- [ ] Submit calls the **Phase 6 seam** (`submitContactInquiry`), which Phase 5 implements as an async stub with `await` delay + success — documented as the wiring point
- [ ] Success state offers "Send another message"; error state offers retry

**Deliverable:** Fully working contact page with polished states and product-aware prefill.

---

### STEP 5 — Careers Page (`/careers`)
- [ ] `src/pages/CareersPage.tsx` composed of:
  - **Hero** — eyebrow + heading + approved copy
  - **Why JOJO** — reuse `company.whyJojo` points (satisfaction, quality, affordability)
  - **Open positions** — empty-state card: "No current openings. We welcome speculative applications — tell us where you fit." (NO fabricated roles; `openPositions` array drives this when populated)
  - **Application form** — fields: Full Name, Email, Phone, Position (select: "General Application" default + future roles), Message, Resume (FileInput)
  - Resume client-side validation: required, `.pdf/.doc/.docx`, ≤ max size; configurable via `src/data/contact.ts`
- [ ] Submit calls the **Phase 6 seam** (`submitApplication`) — async stub + success/error states as in Step 4
- [ ] Privacy note near resume upload: "Resume handled securely; see Privacy" (ties to Phase 6 secure-upload requirement)

**Deliverable:** Careers page with honest empty state + full application form and polished states.

---

### STEP 6 — About Page (`/about`)
- [ ] `src/pages/AboutPage.tsx` composed of spec §About sections, all from approved `company.*`:
  - **Hero** — eyebrow + heading + tagline
  - **Who We Are** — `company.brandIntro` description
  - **Story** — reuse `CompanyStory` section component (or its layout) with `company.story`
  - **What We Do** — Automotive + Machinery capability recap (approved copy, links to `/automotive`, `/machinery`)
  - **Vision** — reuse `VisionSection` with `company.vision`
  - **Mission** — reuse `MissionSection` with `company.mission`
  - **Leadership** — "Message from the CEO" block: name + title only (`company.ceo`), NO fabricated photo/bio; asset slot noted pending
  - **CTA** — reuse `CtaSection`
- [ ] Reuse existing section components where possible (CompanyStory, VisionSection, MissionSection, CtaSection) to stay visually connected to the homepage

**Deliverable:** About page composed entirely of approved content; no invented details.

---

### STEP 7 — Routes & Navigation Update
- [ ] `src/App.tsx`: add `<Route path="/about" element={<AboutPage/>}/>`, `<Route path="/careers" element={<CareersPage/>}/>`, `<Route path="/contact" element={<ContactPage/>}/>`
- [ ] `Navbar.tsx`: desktop links → About `/about`, Careers `/careers`, Contact `/contact`; "Inquiries" CTA → `/contact`; mobile menu same
- [ ] `Footer.tsx`: nav links per spec §27 → Automotive, Machinery, About, Careers, Contact; keep Privacy/Terms (Phase 7 pages)
- [ ] `AutomotivePage.tsx` / `MachineryDetailPage.tsx`: `Button href="/contact"` → `Button to="/contact"` (SPA, no reload)
- [ ] `CtaSection`/`AutomotiveSection`/`ContactTeaser` homepage CTAs: keep `#contact` homepage anchor OR route to `/contact` — decide in Step 9
- [ ] Homepage `#about`/`#contact` anchors stay (BrandIntro `id="about"`, ContactTeaser `id="contact"`) for in-page nav from homepage only

**Deliverable:** All three routes live; no dead anchors; Navbar/Footer IA consistent with spec §27.

---

### STEP 8 — Build, Lint & Manual Verify
- [ ] `npm run build` — fix TypeScript errors (watch verbatim type imports, unused vars)
- [ ] `npm run lint` (oxlint) — fix new warnings
- [ ] Manually verify:
  - `/about`, `/careers`, `/contact` render, styled consistently, refresh works
  - `/contact?product=<slug>` prefills interest/subject + notice chip
  - Contact form: invalid submit → errors; valid submit → loading → success; error path reachable
  - Careers form: resume must be PDF/DOC/DOCX + size limit; oversized/wrong-type rejected with message
  - Careers open-positions empty state is honest (no invented roles)
  - About leadership shows only approved name/title (no fabricated bio/photo)
  - Navbar/Footer links work on all pages; mobile menu closes on navigate
  - Homepage unchanged (`#about`, `#contact` anchors still scroll in-page)

**Deliverable:** Production build green; manual route/form matrix passes.

---

### STEP 9 — Nav IA Decision (Documented)
- [ ] Record decision: homepage CTAs (CtaSection "Request Information", AutomotiveSection, ContactTeaser) point to `/contact` page (recommended — drives users to the full form) vs keep `#contact` homepage scroll. Update components accordingly so no homepage CTA is dead or ambiguous.

**Deliverable:** Decision noted in this report; homepage CTAs consistent.

---

### STEP 10 — Document Phase 5
- [ ] Write the Phase 5 report (append below / separate `docs/phase-5-report.md`): files changed/created, form submit seam for Phase 6, empty-state decisions (no fabricated roles/address/contact), leadership asset note, contact-verification follow-up, tests performed, known issues.

**Deliverable:** Phase 5 report.

---

## Deliberately OUT OF SCOPE (later phases)
- Backend/API for contact + career forms, validation, spam protection, file upload security, email/CRM delivery → **Phase 6**
- `/privacy`, `/terms`, polished `/404`, SEO metadata → **Phase 7**
- Verified production contact details/address/map embed, real job openings, CEO photo/message → **pending business data** (blockers recorded)

---

## PHASE COMPLETION CHECKLIST (from spec)
- [ ] `/about` exists — Hero, Who We Are, Story, What We Do, Vision, Mission, Leadership, CTA; approved content only
- [ ] `/careers` exists — Hero, Why JOJO, Open positions, Application form, Resume upload; no fabricated openings
- [ ] `/contact` exists — Hero, Office, Email, Phone, Contact form, Map/location; `?product=` prefill works
- [ ] Contact form fields: Name, Email, Phone, Company, Subject, Message, Interest (Automotive/Machinery/Partnership/General)
- [ ] Careers form fields: Full Name, Email, Phone, Position, Message, Resume; resume rules configurable (PDF/DOC/DOCX)
- [ ] Polished loading/error/success states on both forms
- [ ] Pages visually connected to homepage (shared design system)
- [ ] No fabricated content (no invented address, openings, contact info, or bio)
- [ ] Production build passes
