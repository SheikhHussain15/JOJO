# Phase 0: Repository Audit & Implementation Plan

## Executive Summary
This document constitutes the **Phase 0 Repository Audit and Implementation Plan** for the JOJO International website rebuild, based on a rigorous inspection of the local codebase (`C:\Users\hr773\Desktop\JOJO`).

---

## 1. Technical Inventory

| Category | Finding | Details |
| :--- | :--- | :--- |
| **Framework** | React 19.2.8 | Modern React with concurrent capabilities. |
| **Build Tool** | Vite 8.2.0 (`vite`) | Fast bundling and HMR. |
| **Package Manager** | npm | Managed via `package-lock.json`. |
| **TypeScript** | TypeScript ~6.0.2 | Strict mode configured via `tsconfig.app.json` and `tsconfig.node.json`. |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) | Utilizes `@tailwindcss/vite` plugin and `src/index.css`. |
| **Animation Libraries** | GSAP (`^3.15.0`), Lenis (`^1.3.26`) | Scroll and tweening animation tools. |
| **Icons** | Lucide React (`^1.31.0`) | Modern icon set. |
| **Routing System** | Single-page layout (App.tsx) | Needs expansion into multi-route architecture (`/`, `/automotive`, `/machinery`, `/machinery/[slug]`, `/about`, `/careers`, `/contact`, etc.). |

---

## 2. Asset & Cinematic System Audit

### Frame Assets
- **Location:** `/jojo_video3_frames/`
- **Count:** 240 frames (`frame_0001.png` to `frame_0240.png`).
- **Implementation:**
  - `src/lib/constants.ts`: Imports frames via Vite's `import.meta.glob` (`/jojo_video3_frames/*.png`).
  - `src/lib/FrameCache.ts`: High-performance LRU/FIFO image cache (`FrameCache`) storing up to 240 `HTMLImageElement` instances.
  - `src/lib/FrameLoader.ts`: Staged asynchronous loader (`FrameLoaderManager`) that urgently loads the first 5 frames, caches them, and background-loads remaining frames using `requestIdleCallback`.
  - `src/hooks/useScrollProgress.ts`: Tracks scroll position across a `400vh` container and calculates normalized frame indices (`0` to `239`).
  - `src/hooks/useReducedMotion.ts`: Respects `prefers-reduced-motion: reduce`.
  - `src/components/cinematic/CinematicFrameCanvas.tsx`: High-performance HTML5 Canvas renderer with DPR capping, `object-fit: cover` aspect ratio calculations, and mouse parallax support.
  - `src/components/cinematic/CinematicHero.tsx`: Main hero container integrating scroll progress, sticky viewport, and foreground content fading/translation.
  - `src/components/ui/Preloader.tsx`: Initial asset loader and loading bar.

---

## 3. Existing Components & Structure

- `src/App.tsx`: Root component rendering Preloader, Navbar, CinematicHero, and NextSection.
- `src/components/navigation/Navbar.tsx`: Navigation bar.
- `src/components/sections/NextSection.tsx`: Placeholder section following the hero.
- `src/components/ui/Preloader.tsx`: Loading screen.

---

## 4. Identified Technical Risks & Gaps

1. **Routing:** Currently a single-page view; requires routing setup (e.g., React Router) to support `/automotive`, `/machinery`, `/machinery/[slug]`, `/about`, `/careers`, `/contact`, `/privacy`, `/terms`.
2. **Data Layer:** No structured data models or files for machinery products, company history, leadership, or career positions.
3. **Form Handling:** No backend or client-side form submission logic for Contact and Careers.
4. **SEO & Metadata:** Missing dynamic titles, meta descriptions, canonical URLs, and Open Graph tags.
5. **Accessibility:** Need to ensure canvas fallbacks and keyboard navigation fully comply with WCAG guidelines.

---

## 5. Target Architecture & Proposed Phases

| Phase | Focus | Key Deliverables |
| :--- | :--- | :--- |
| **0** | Repository Audit | `docs/repository-audit.md`, `phase-00.md`, technical inventory, risks documented |
| **1** | Foundation & Design System | Design tokens, typography, shared UI components, Navbar/Footer shell |
| **2** | Cinematic Hero Integration | Refined hero with animation preserved |
| **3** | Homepage Sections | Brand Intro, Automotive, Machinery preview, Why JOJO, Vision, Mission, CEO |
| **4** | Product Platform | `/automotive`, `/machinery`, `/machinery/[slug]` with typed data |
| **5** | About / Careers / Contact | Full company pages, career applications, contact forms |
| **6** | Forms & Backend | Secure form handling, validation, file uploads |
| **7** | Polish | SEO, accessibility, responsive breakpoints |
| **8** | Production Ready | Performance, QA, final documentation |

---

## 6. Phase 0 Compliance Checklist

- [x] Repository audited
- [x] Current stack documented
- [x] Existing animation documented
- [x] Existing routes documented
- [x] Risks documented

---

## 7. Deliverables Created

| File | Purpose |
| :--- | :--- |
| `phase-00.md` | This implementation plan |
| `docs/repository-audit.md` | Detailed audit report |

---

## Notes

Phase 1 will establish the design system foundation while preserving the existing cinematic scroll animation. The audit confirms the project already has production-ready frame preloading and caching infrastructure that must be retained.