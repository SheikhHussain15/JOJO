# JOJO International — 3D Scroll-Driven Cinematic Background: Implementation Tasks

## Phase 1: Inspection & Setup
- [ ] **Task 1.1**: Inspect existing repository structure (`package.json`, `src/`, `public/`, `vite.config.*`, `tailwind.config.*`, `tsconfig.*`).
- [ ] **Task 1.2**: Detect framework/build system, dependencies, and configure TypeScript, Vite, React, and Tailwind CSS.
- [ ] **Task 1.3**: Extract `jojo_video3_frames_24fps.zip` into `public/frames/` and verify all 240 PNG frames are present and correctly ordered.

## Phase 2: Core Infrastructure & Frame Management
- [ ] **Task 2.1**: Implement central configuration (`src/lib/constants.ts` or similar) with `FRAME_COUNT = 240`, `FRAME_PATH = "/frames/frame_"`, and `getFramePath(index)` helper with zero-padding.
- [ ] **Task 2.2**: Implement `FrameCache` class / module (`Map<number, HTMLImageElement | ImageBitmap>`) to manage memory, avoid duplicate downloads, and prioritize nearby frames.
- [ ] **Task 2.3**: Implement `FrameLoader` module supporting progressive preloading (initial frames 1-5, nearby window `current ± 15`, idle loading for remaining sequence) using modern `HTMLImageElement.decode()` or `createImageBitmap()`.
- [ ] **Task 2.4**: Implement robust error handling and fallback mechanism (use previous valid frame on error, fallback to `frame_0001.png` if entire sequence fails).

## Phase 3: Canvas Renderer
- [ ] **Task 3.1**: Create `CinematicFrameCanvas.tsx` component with high-DPI support (`window.devicePixelRatio` capped at 2 for desktop/tablet, 1 for low-end mobile).
- [ ] **Task 3.2**: Implement custom `object-fit: cover` aspect-ratio fitting algorithm in Canvas to prevent distortion across 16:9, 16:10, 4:3, and 9:16 viewports.
- [ ] **Task 3.3**: Optimize rendering loop to avoid unnecessary redraws when frame index has not changed.

## Phase 4: Scroll Control & Animation
- [ ] **Task 4.1**: Implement `useScrollProgress` / `ScrollFrameController` using GSAP ScrollTrigger or sticky container with `400vh` hero height.
- [ ] **Task 4.2**: Implement smooth scroll inertia (`lerp` smoothing: `current += (target - current) * smoothing`) combined with `requestAnimationFrame` for fluid frame scrubbing.
- [ ] **Task 4.3**: Ensure full reversibility (scrolling up reverses animation smoothly, fast/slow scrolling handles correctly, stopping stops at corresponding frame).

## Phase 5: UI & Cinematic Overlays
- [ ] **Task 5.1**: Build `Navbar.tsx` with transparent-to-translucent scroll transition and responsive mobile menu.
- [ ] **Task 5.2**: Build `CinematicHero.tsx` typography and content layout ("MOVING INDUSTRY FORWARD.", automotive & industrial solutions, EXPLORE CTA).
- [ ] **Task 5.3**: Implement scroll-driven text animations (fade in / translateY on entry, gradual fade out on progress).
- [ ] **Task 5.4**: Add cinematic overlays (dark gradient, vignette, atmospheric haze) via CSS for high typography readability.
- [ ] **Task 5.5**: Add minimal animated scroll indicator that fades out upon scrolling.

## Phase 6: Accessibility & Performance Optimization
- [ ] **Task 6.1**: Implement `prefers-reduced-motion` accessibility fallback (display static representative frame, disable cinematic frame scrubbing).
- [ ] **Task 6.2**: Implement mobile optimization tiers (reduced canvas resolution, capped DPR, disabled expensive mouse parallax on touch devices).
- [ ] **Task 6.3**: Verify performance targets (Desktop: 60 FPS, Modern mobile: 45-60 FPS, Low-end mobile: 30+ FPS) and memory management.

## Phase 7: Polish & Verification
- [ ] **Task 7.1**: Implement preloader component ("JOJO", loading progress bar/percentage, enter/auto-start).
- [ ] **Task 7.2**: Verify smooth transition from hero sequence (Frame 240) into the next section.
- [ ] **Task 7.3**: Run development server (`npm run dev`) and thoroughly test scrolling, reverse scrolling, and keyboard/touch navigation.
- [ ] **Task 7.4**: Run production build (`npm run build`) and fix any TypeScript compilation or bundling errors.
