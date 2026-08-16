# Convert Vite + React → Next.js (App Router) — Step-by-Step Guide

Target: **Next.js 15+ (App Router)**. Do the steps in order — each one verifies
before moving on. Commit after each step so you can always roll back.

---

<!-- ## Step 0 — Backup

```bash
git add -A && git commit -m "chore: snapshot pre-Next.js migration"
```

--- -->

## Step 1 — Install Next + swap Tailwind for PostCSS

```bash
npm uninstall vite @vitejs/plugin-react @tailwindcss/vite
npm install next@latest react-dom@latest   # react 19 already present
npm install tailwindcss @tailwindcss/postcss
npm install -D postcss
```

Create `postcss.config.mjs` at root (replaces the Vite plugin):

```js
const config = { plugins: { "@tailwindcss/postcss": {} } };
export default config;
```

`package.json` scripts:

```json
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "oxlint"
```

**Delete:** `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`.

`src/index.css` (starts with `@import "tailwindcss"`) already matches Tailwind v4 —
it becomes `src/app/globals.css`.

Create Base structure as JOJO/packages/frontend/src
                             /docs    /backend/src
                             Readme.md
and wrap frontend and backend in packages folder with clean structure

---

## Step 2 — tsconfig collapse

Next uses one `tsconfig.json`. Replace the project-references trio
(`tsconfig.json` + `.app`/`.node`) with a minimal one, then let Next fill the
rest on first `next dev`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowImportingTsExtensions": true,
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]
}
```

Keep `erasableSyntaxOnly` if you want (it's compatible with the API code).

---

## Step 3 — Build the `src/app/` tree

Pages map 1:1. Each page becomes a **default-export component**:

| Vite (old) | Next (new) |
| :--- | :--- |
| `App.tsx` route `/` | `src/app/page.tsx` ← `HomePage` |
| `/automotive` | `src/app/automotive/page.tsx` |
| `/machinery` | `src/app/machinery/page.tsx` |
| `/machinery/:slug` | `src/app/machinery/[slug]/page.tsx` (params via `({ params })`) |
| `/about` `/careers` `/contact` | `src/app/{about,careers,contact}/page.tsx` |
| `/privacy` `/terms` | `src/app/{privacy,terms}/page.tsx` |
| `NotFoundPage` (`path="*"`) | `src/app/not-found.tsx` |

`src/app/layout.tsx` replaces `App.tsx` + `index.html` `<body>` — it owns
`<html>`, the skip link, `Navbar`, `<main>`, `Footer`, and the `Preloader`.

---

## Step 4 — Root layout (server component)

```tsx
import "./globals.css";

export const metadata: Metadata = {
  title: "JOJO International — Automotive & Industrial Machinery",
  description: "...",
  metadataBase: new URL(process.env.SITE_URL ?? "https://www.jojo-international.com"),
  openGraph: { /* from index.html */ },
  robots: "index, follow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen bg-[#08090d] text-white">
        <a href="#main-content" className="sr-only ...">Skip to main content</a>
        <Preloader />
        <Navbar />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

The `Preloader` needs a `"use client"` banner (uses hooks + `frameLoader`).

---

## Step 5 — Router API replacement table

Update these imports across `src/components/**` and page files:

| react-router-dom | Next.js |
| :--- | :--- |
| `Link` | `next/link` → `import Link from "next/link"` |
| `NavLink` (active class) | `next/link` + `usePathname()` in a `"use client"` component |
| `useNavigate()` | `useRouter()` from `next/navigation` |
| `useSearchParams()` | `useSearchParams()` from `next/navigation` (ContactPage `?product=` — wrap the reading component in `<Suspense>` for prerender) |
| `useLocation()` | `usePathname()` |
| `useParams()` | page props `params` (await it in Next 15: `const { slug } = await params`) |
| `<BrowserRouter>`/`<Routes>` | file-system routing |

Files touching react-router today: `Navbar.tsx`, `Footer.tsx`, `Button.tsx`,
`CinematicHero.tsx`, `ProductCard.tsx`, `ProductDetail.tsx`, `CtaSection.tsx`,
`AutomotiveSection.tsx`, and every page under `src/pages/`.

---

## Step 6 — `"use client"` banner

Add `"use client"` as the first line to any component using hooks or browser APIs:

- `CinematicHero`, `CinematicFrameCanvas`, `Preloader`
- `Navbar` (needs `usePathname` for active state)
- `Reveal`/`useScrollReveal`, `useScrollProgress`, `useReducedMotion` consumers
- Both form pages, `FormField`/`FileInput`/`FormStatus`/`useFormStatus`
- `MachineryPage` (filter/search state), `CategoryFilter`, `ProductSearch`

`Footer`, `Container`, `Eyebrow`, `SectionHeading`, and pages with no hooks can
stay server components.

---

## Step 7 — SEO: replace `usePageMeta`

Delete the `usePageMeta` hook calls. `src/lib/seo.ts` keeps `SITE_URL`/constants
and adds a helper that returns a Next `Metadata` object. Each page exports
metadata:

```tsx
// src/app/automotive/page.tsx
export const metadata: Metadata = {
  title: "Automotive — JOJO International",
  description: "...",
};
```

`/machinery/[slug]` uses `generateMetadata({ params })` for dynamic titles. Then
replace static files with dynamic ones (or keep them in `public/` — both work):

- `public/robots.txt` → `src/app/robots.ts` (generated)
- `public/sitemap.xml` → `src/app/sitemap.ts` (generated from routes)

---

## Step 8 — API: Vercel Functions → Route Handlers

`request.json()` / `request.formData()` are identical in Next. Move and rename:

| Old | New |
| :--- | :--- |
| `api/contact.ts` (export `POST`) | `src/app/api/contact/route.ts` → `export const POST` |
| `api/careers.ts` | `src/app/api/careers/route.ts` |
| `api/_lib/*` | `src/lib/api/*` (or keep `_lib`) |

Three mechanical changes:

1. **Drop `.ts` extensions in imports** — `./_lib/validation.ts` →
   `./_lib/validation`. Next's bundler doesn't allow `.ts` specifiers (the
   `allowImportingTsExtensions` option was a Vite-only crutch).
2. **`export const config = { runtime: "nodejs" }`** →
   **`export const runtime = "nodejs"`** (or omit — it's the default).
3. `vercel.json` → **delete** (SPA fallback is automatic; you deploy manually).

`src/lib/forms.ts` **doesn't change** — it already fetches `/api/contact` and
`/api/careers`.

---

## Step 9 — Tests & env

- `scripts/dev-api.ts` is now unnecessary (Next serves `/api/*` in dev). Delete it.
- Rewrite `scripts/test-api.ts` to import `POST` from
  `src/app/api/{contact,careers}/route.ts` and call them with a `Request` object
  directly — same assertions, no server.
- `.env` → `.env.local` (Next convention). `.env.example` stays as documentation.
  Your vars are server-only, so no `NEXT_PUBLIC_` prefix needed.

---

## Step 10 — Verify

```bash
npm run dev      # visit every route + submit both forms
npm run lint
npm run build    # next build — should pass clean
```

Then `npm run start` and repeat the Phase 6 API test suite.

---

## Watch-outs specific to this project

- `useSearchParams` on `/contact` must sit inside a `<Suspense>` boundary or the
  static prerender fails — wrap `<ContactPage />` (or its form section).
- `Preloader` + `CinematicHero` need `"use client"`; their GSAP/Lenis/canvas
  logic doesn't change.
- Vercel's 4.5 MB body limit still applies to Route Handlers — keep
  `RESUME_MAX_SIZE_MB=3`.
- Deploying later: `vercel` CLI auto-detects Next; no `vercel.json` needed.
