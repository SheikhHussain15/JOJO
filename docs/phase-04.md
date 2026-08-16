# Phase 4: Automotive + Machinery Platform — Step-by-Step Implementation Tasks

## Goal
Turn JOJO's product capability into a reusable product discovery experience: `/automotive`, `/machinery`, `/machinery/[slug]`.

## Status: Task Plan (not yet implemented)

---

## 0. Critical Upfront Findings (from repository audit — read before coding)

1. **No routing system exists.** The repo is a single-page app (App.tsx renders all sections inline). `react-router` is NOT installed. Phase 4's required routes (`/automotive`, `/machinery`, `/machinery/[slug]`) therefore **require introducing a router** as a prerequisite. Spec §8 says "use the routing system already established" — but the audit proves none exists, so this is a sanctioned architectural addition.
2. **No real product data or product images exist.** Only `src/assets/hero.png` is available. The spec strictly forbids fabricated product data ("Do not fabricate product information" / "No fabricated product data"). Product specs, applications, and features must NOT be invented.
3. **Existing homepage anchors** (`#automotive`, `#machinery`) currently deep-link to homepage sections — moving Automotive/Machinery to real routes means updating these anchors/Navbar links.
4. **Spec §8 route list also includes** `/about`, `/careers`, `/contact`, `/privacy`, `/terms`, `/404` — Phase 4 only builds the three product routes; other routes land in Phases 5–7. Introduce routing infra now so later phases just add pages.

---

## STEP-BY-STEP TASKS

### STEP 1 — Decide Routing Approach (Decision Gate)
- [ ] Confirm introduction of `react-router-dom` (recommended, v7) as the **first new dependency** of the project
- [ ] OR confirm alternative (hand-rolled history API) if dependency policy rejects it — document the trade-off in phase-4.md
- [ ] Choice must support dynamic params (`/machinery/:slug`)

**Deliverable:** 1 decision recorded + router installed (or alternative ratified).

---

### STEP 2 — Verify Approved Product Data Source (Business Gate ⚠️)
- [ ] Search repo again for any real machinery/automotive inventory (images, PDFs, exports, docs)
- [ ] If real data exists: document source and convert to `src/data/machinery.ts`
- [ ] If NO real data exists (expected): do **NOT fabricate.** Record the decision to ship the catalog with:
  - empty state ("Catalog coming soon" style, using approved categories)
  - full search/filter/grid machinery that renders whatever data is supplied later
- [ ] Confirm whether the business can supply product data/images (blocking for populated catalog)

**Deliverable:** Decision note in phase-4.md: catalog populated OR catalog framework + empty-state (no invented products).

---

### STEP 3 — Install Routing & Refactor App Shell
- [ ] `npm install react-router-dom`
- [ ] Create `src/pages/` directory structure:
  - `src/pages/HomePage.tsx`
  - `src/pages/AutomotivePage.tsx`
  - `src/pages/MachineryPage.tsx`
  - `src/pages/MachineryDetailPage.tsx`
  - `src/pages/NotFoundPage.tsx` (scaffold now, polish in Phase 7)
- [ ] Move current home content from `App.tsx` into `HomePage.tsx`
- [ ] Convert `App.tsx` to a router layout: `<BrowserRouter>` + `<Routes>` + shared `<Navbar/>`/`<Footer/>` shell
- [ ] Set up `Layout` wrapper so Navbar/Footer persist across routes; HomePage keeps both the hero and full section stack
- [ ] Wire `main.tsx` if needed

**Deliverable:** Router working; `/` renders identical homepage; `/automotive`, `/machinery`, `/machinery/:slug` render placeholder pages.

---

### STEP 4 — Create Typed Machinery Data Model
- [ ] Create `src/types/machinery.ts` (or add to `src/data/`) with the spec interface:

```ts
export interface MachineryProduct {
  id: string;
  slug: string;
  name: string;
  category: "Agriculture" | "Industrial" | "Construction" | "Power" | "Transport" | "Utility";
  description: string;
  image: string;
  gallery?: string[];
  applications?: string[];
  specifications?: { label: string; value: string }[];
  features?: string[];
  featured?: boolean;
}

export const MACHINERY_CATEGORIES = [
  "All", "Agriculture", "Industrial", "Construction", "Power", "Transport", "Utility",
] as const;
```
- [ ] Create `src/data/machinery.ts`: `export const machineryProducts: MachineryProduct[] = [...]`
  - If no real data: **empty array** (allows clean empty-state) — never fill with invented products

**Deliverable:** Typed model + data file (empty array if no approved inventory).

---

### STEP 5 — Reusable Catalog Components
Create under `src/components/machinery/`:
- [ ] `ProductCard.tsx` — image, category, name, short description, "View Details →"; subtle image zoom + card lift on hover (spec §17)
- [ ] `ProductGrid.tsx` — responsive grid (1/2/3 cols at sm/lg/xl), maps products to cards
- [ ] `CategoryFilter.tsx` — "All" + six categories; sets active filter; accessible buttons with `aria-pressed`
- [ ] `ProductSearch.tsx` — optional `useState`/`useDeferredValue` name search; debounce for large lists
- [ ] `MachineryHero.tsx` — premium page hero (eyebrow + heading + supporting copy)
- [ ] `ProductEmptyState.tsx` — shown when filter/search yields nothing OR catalog is empty ("Catalog coming soon" / no results)
- [ ] `ProductDetail.tsx` — image/gallery, title, category, overview, applications, specifications, features + `Request Information` inquiry CTA (CTA carries the selected product)

**Deliverable:** All components reusable; zero product data inside JSX (data flows from `machinery.ts`).

---

### STEP 6 — Machinery Page (`/machinery`)
- [ ] `MachineryPage.tsx`: MachineryHero + CategoryFilter (+ Search if data size warrants) + Featured products (filter `featured===true`) + ProductGrid + ProductEmptyState
- [ ] Client-side filtering by category + search term combined
- [ ] Loading state (if async data introduced later), empty state (no results), error state (data fetch failure hookup — future)
- [ ] Update Navbar "Machinery" link → `/machinery`

**Deliverable:** Fully working catalog page with filtering, featured rail, and states.

---

### STEP 7 — Machinery Detail Page (`/machinery/:slug`)
- [ ] `MachineryDetailPage.tsx`: read `useParams().slug`, look up product from `machineryProducts`
- [ ] If found: render `ProductDetail` (spec §18 order: visual, name, category, Overview, Applications, Specifications, Features, Request Information)
- [ ] If not found: **404 flow** — render "product not found" state with link back to `/machinery` (never an invented product)
- [ ] Inquiry CTA preserves selected product (e.g. prefills subject/interest with product name + category)
- [ ] Product card "View Details" links to `/machinery/${slug}`; search engines get real URLs (SEO later)

**Deliverable:** Detail page with dynamic param lookup + graceful not-found.

---

### STEP 8 — Automotive Page (`/automotive`)
- [ ] `AutomotivePage.tsx`: premium hero consistent with design system
  - Approved copy from `src/data/company.ts` (automotive sales/marketing capability, since 2016)
  - Strong imagery (reuse `hero.png` or asset of the day)
  - CTA to contact
- [ ] Update Navbar "Automotive" link → `/automotive`
- [ ] No fabricated automotive product listings (approve first if business has inventory)

**Deliverable:** Automotive page presenting approved capability.

---

### STEP 9 — Navigation & Anchor Cleanup
- [ ] Update `Navbar.tsx`: section anchors (`#automotive`, `#machinery`) become route links (`/automotive`, `/machinery`); keep `#about`/`#contact` homepage behavior or route them per IA (decide: About/Contact are Phase 5 pages — interim keep as homepage anchors)
- [ ] Update `Footer.tsx` nav links to match routes
- [ ] Update homepage `BrandIntro`/`AutomotiveSection`/`MachineryPreview`/`ContactTeaser` CTA anchors to sensible targets (`/automotive`, `/machinery`, `#contact`)
- [ ] Navbar active-route detection now needs both route paths AND in-page anchors — refactor `activeLink` logic

**Deliverable:** Consistent internal links; no dead anchors.

---

### STEP 10 — Build, Lint & Manual Verify
- [ ] `npm run build` — fix all TypeScript/router errors
- [ ] `npm run lint` (oxlint) — fix warnings (watch `react-hooks/exhaustive-deps`)
- [ ] Manually verify:
  - `/` renders (homepage + hero unchanged)
  - `/automotive`, `/machinery`, `/machinery/:slug` routes resolve
  - Deep-link refresh works on all routes (no 404 from dev server/static host config; note SPA fallback requirement)
  - Category filter + search combine correctly
  - Detail-page not-found path shows empty/404 (never an invented product)
  - `/404` scaffold reachable for unknown paths
  - Reduced motion: filters/search no extra animation; hero preserved

**Deliverable:** Production build green; manual route matrix passes.

---

### STEP 11 — Document Phase 4
- [ ] Write `docs/phase-4.md` reporting: files changed/created, routing decision + SPA fallback note, data-model schema, empty-state decision (no fabricated products), tests performed, known issues, business follow-ups (product data/images pending).

**Deliverable:** `docs/phase-4.md`.

---

## Deliberately OUT OF SCOPE (later phases)
- `/about`, `/careers`, `/contact` pages → Phase 5
- `/privacy`, `/terms`, polished `/404` + SEO metadata → Phase 7
- Backend for the inquiry form → Phase 6
- Real product imagery/specs → pending business data

---

## PHASE COMPLETION CHECKLIST (from spec)
- [ ] Automotive page exists (`/automotive`)
- [ ] Machinery catalog works (`/machinery`) with filter/search/grid
- [ ] Product details work (`/machinery/:slug`)
- [ ] No fabricated product data
- [ ] Routing introduced cleanly (single system, no duplicates)
- [ ] Loading / empty / error states present
- [ ] Reusable components; data kept out of JSX
- [ ] Production build passes