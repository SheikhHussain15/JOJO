# Repository Audit

## 1. Framework & Build Environment
- **Framework:** React 19.2.8
- **Build Tool:** Vite 8.2.0 (`vite`)
- **Package Manager:** npm (`package-lock.json`)
- **TypeScript:** TypeScript ~6.0.2 with strict configuration (`tsconfig.app.json`, `tsconfig.node.json`)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)

## 2. Dependencies
- `gsap`: ^3.15.0
- `lenis`: ^1.3.26
- `lucide-react`: ^1.31.0
- `react`: ^19.2.8
- `react-dom`: ^19.2.8
- `@tailwindcss/vite`: ^4.3.3
- `tailwindcss`: ^4.3.3

## 3. Existing Architecture & Cinematic System
- **Frame Assets:** 240 frames located in `/jojo_video3_frames/` (`frame_0001.png` to `frame_0240.png`).
- **Cinematic Components:**
  - `src/components/cinematic/CinematicHero.tsx`
  - `src/components/cinematic/CinematicFrameCanvas.tsx`
  - `src/components/cinematic/CinematicOverlay.tsx`
- **Hooks & Utilities:**
  - `src/hooks/useScrollProgress.ts`
  - `src/hooks/useReducedMotion.ts`
  - `src/lib/FrameLoader.ts`
  - `src/lib/FrameCache.ts`
  - `src/lib/constants.ts`

## 4. Current Routes & Components
- Single-page application structure currently rendered via `App.tsx`.
- Existing components: `Navbar`, `CinematicHero`, `NextSection`, `Preloader`.

## 5. Risks & Recommendations
- **Risk:** Lack of multi-page routing and structured data models for machinery and company info.
- **Recommendation:** Implement routing, typed data structures in `src/data/`, and modular page components in subsequent phases while strictly preserving the completed cinematic scroll hero.
