# JOJO International — 3D Scroll-Driven Cinematic Background
## OpenCode Master Implementation Prompt

You are a senior frontend engineer, creative developer, WebGL/3D developer, and UI/UX engineer.

Your task is to transform the provided 240-frame cinematic image sequence into a premium, scroll-driven 3D-style website background for the JOJO International website.

The website should feel like a high-end international automotive + agricultural machinery brand.

Do NOT build a generic corporate website.

The experience should feel cinematic, elegant, sophisticated, modern, and premium.

---

# 1. PROJECT OBJECTIVE

Create a scroll-controlled cinematic hero experience where the user's scroll position controls a 240-frame animation.

The frames represent a cinematic automotive/industrial environment.

Instead of using a normal `<video>` element:

- render the frame sequence through an optimized HTML Canvas/WebGL-based renderer
- map scroll progress to animation progress
- smoothly scrub between frames
- create a convincing 3D/parallax effect around the frame sequence
- keep foreground website content above the animation
- maintain excellent performance on desktop and mobile

The final result should feel like a premium interactive automotive website.

Reference concept:

User scrolls ↓

FRAME 001
   ↓
FRAME 020
   ↓
FRAME 050
   ↓
FRAME 090
   ↓
FRAME 130
   ↓
FRAME 170
   ↓
FRAME 210
   ↓
FRAME 240

The animation must be directly controlled by scroll position.

---

# 2. PROVIDED FRAME ASSETS

The frame sequence is:

`jojo_video3_frames_24fps.zip`

The ZIP contains approximately:

- 240 PNG frames
- 24 FPS
- 10 seconds
- 720 × 1280 source resolution
- lossless PNG frames

Extract the frames into an appropriate public/static asset directory.

Expected structure:

```text
public/
└── frames/
    ├── frame_0001.png
    ├── frame_0002.png
    ├── frame_0003.png
    ├── ...
    └── frame_0240.png
```

IMPORTANT:

Do not modify, resize, crop, recolor, compress, or regenerate the original frames unless absolutely necessary.

Preserve maximum visual quality.

Before implementation:

1. Inspect the existing project.
2. Detect the framework/build system.
3. Detect installed dependencies.
4. Determine whether React + TypeScript + Tailwind already exist.
5. Reuse the existing project architecture where appropriate.
6. Do not unnecessarily rewrite unrelated parts of the project.

If the project is empty, use:

- React
- TypeScript
- Vite
- Tailwind CSS

---

# 3. TECHNOLOGY STACK

Preferred stack:

- React
- TypeScript
- Vite
- Tailwind CSS
- GSAP
- Lenis
- Three.js
- React Three Fiber
- @react-three/drei

Use libraries only where they provide real value.

For the frame sequence itself, prioritize performance.

Preferred rendering architecture:

```text
Scroll
  ↓
Normalized scroll progress
  ↓
Animation timeline
  ↓
Frame index calculation
  ↓
Canvas/WebGL renderer
  ↓
Current cinematic frame
```

Do NOT render 240 separate `<img>` elements into the DOM.

Do NOT create 240 React components.

Do NOT use CSS background-image for every frame.

Do NOT use an iframe.

Do NOT simply autoplay the original MP4.

---

# 4. CORE EXPERIENCE

Create a full-screen cinematic hero section.

The background should occupy approximately:

`100vw × 100vh`

The animation should remain visually dominant.

Foreground content should sit above it.

Example:

```text
┌────────────────────────────────────────────┐
│ JOJO                         MENU           │
│                                            │
│                                            │
│          MOVING INDUSTRY                   │
│          FORWARD.                          │
│                                            │
│          Premium automotive &              │
│          industrial solutions              │
│                                            │
│          [ EXPLORE ]                       │
│                                            │
│                         scroll ↓            │
└────────────────────────────────────────────┘

             CINEMATIC FRAME
```

---

# 5. SCROLL-BASED FRAME CONTROL

The frame sequence must be controlled by scroll.

Use a normalized progress value:

`progress = 0 → 1`

Map progress to:

`frameIndex = progress * 239`

Use interpolation to avoid visible jumps.

Do NOT simply update the frame directly on every raw scroll event.

Use:

`requestAnimationFrame`

or GSAP ticker.

Desired behavior:

- Scroll slowly → frames advance slowly
- Scroll quickly → frames advance quickly
- Stop scrolling → animation stops exactly at current position
- Scroll upward → animation reverses smoothly

The experience must be completely reversible.

---

# 6. SCROLL TIMELINE

Design the hero as a long scroll section.

Recommended:

`Hero height: 300vh – 500vh`

Start with approximately:

`400vh`

Then pin the cinematic viewport during the scroll.

Concept:

```text
┌──────────────────────────────┐
│                              │
│      STICKY CANVAS           │
│                              │
│      FRAME SEQUENCE          │
│                              │
└──────────────────────────────┘

        ↓ user scrolls

FRAME 1 → FRAME 240

        ↓

Next section
```

Use GSAP ScrollTrigger or an equivalent robust scroll system.

Prefer `position: sticky` or ScrollTrigger pinning.

Avoid fragile scroll hacks.

---

# 7. FRAME PRELOADING SYSTEM

This is one of the most important requirements.

There are 240 PNG files.

DO NOT immediately decode all 240 full-resolution images on page load if that causes memory problems.

Implement progressive loading.

### Stage 1 — Initial frames

Immediately preload:

- frame_0001
- frame_0002
- frame_0003
- frame_0004
- frame_0005

Display a polished loading state.

### Stage 2 — Nearby frames

After initial render, preload a window around the current frame.

For example:

`current frame ± 15`

### Stage 3 — Background loading

Use idle time / `requestIdleCallback` where supported to load the remaining sequence.

Priority:

```text
Current frame
↓
Nearby frames
↓
Future frames
↓
Previous frames
↓
Remaining sequence
```

---

# 8. IMAGE DECODING

Use modern browser APIs where appropriate.

Prefer:

`HTMLImageElement.decode()`

or:

`createImageBitmap()`

where supported.

Avoid blocking the main thread.

The frame renderer should never freeze the page while decoding images.

Implement graceful fallback for browsers where createImageBitmap is unavailable.

---

# 9. CANVAS RENDERER

Create a dedicated component:

`CinematicFrameCanvas.tsx`

Responsibilities:

- create canvas
- handle device pixel ratio
- render current frame
- resize responsively
- maintain aspect ratio
- handle loading
- handle fallback
- avoid unnecessary redraws

Recommended architecture:

```text
CinematicFrameCanvas
│
├── FrameLoader
├── FrameCache
├── FrameRenderer
├── ResizeObserver
└── AnimationController
```

Do not redraw the canvas when the frame has not changed.

---

# 10. HIGH-DPI SUPPORT

Support:

`window.devicePixelRatio`

but cap it to avoid excessive GPU/memory usage.

Conceptual approach:

`DPR = min(devicePixelRatio, 2)`

For very low-end mobile devices, consider:

`DPR = 1`

The visual result must remain sharp without unnecessarily consuming huge amounts of memory.

---

# 11. IMAGE FITTING

The source frames must fill the viewport.

Use a cover-style rendering algorithm similar to:

`object-fit: cover`

but implement it directly in Canvas.

Maintain correct aspect ratio.

Do NOT stretch the image.

Do NOT distort the vehicle or machinery.

Handle:

- 16:9 desktop
- 16:10 laptop
- 4:3 tablet
- 9:16 mobile

appropriately.

---

# 12. MOBILE BEHAVIOR

The desktop experience can be more cinematic.

On mobile:

- maintain the animation
- reduce unnecessary effects
- reduce canvas resolution if needed
- reduce DPR
- reduce parallax intensity
- reduce blur
- disable expensive mouse effects
- preserve readable text

Do NOT remove the cinematic experience entirely.

Use responsive performance tiers:

```text
Desktop:
Full quality

Tablet:
Medium quality

Mobile:
Optimized quality
```

---

# 13. 3D EFFECT

The frame sequence itself is 2D imagery, but the website should create the perception of depth.

Add a subtle 3D presentation layer.

Recommended architecture:

```text
                FOREGROUND
                    ↓
        ┌───────────────────────┐
        │   UI / Typography     │
        └───────────────────────┘

        ┌───────────────────────┐
        │ atmospheric particles │
        └───────────────────────┘

        ┌───────────────────────┐
        │ cinematic frame       │
        └───────────────────────┘

        ┌───────────────────────┐
        │ subtle depth layer    │
        └───────────────────────┘

                  BACKGROUND
```

Use very subtle:

- parallax
- perspective
- scale
- translateZ-like depth illusion
- atmospheric overlay

Do NOT make the effect look like a gaming website.

The aesthetic must remain:

- Classic
- Elegant
- Premium
- Industrial
- Cinematic

---

# 14. MOUSE PARALLAX

On desktop, optionally add extremely subtle mouse-based movement.

Example:

```text
Mouse moves left
→ background shifts slightly right

Mouse moves right
→ background shifts slightly left
```

Keep movement extremely small:

`5px – 15px`

Never allow the effect to distract from the product.

Disable this on touch devices.

---

# 15. CINEMATIC OVERLAYS

Add subtle layers above the frame.

Possible layers:

- Dark gradient
- Vignette
- Atmospheric haze
- Very subtle grain

Use CSS gradients rather than heavy image-processing.

Example:

```text
top → transparent
middle → transparent
bottom → slightly darker
edges → subtle vignette
```

The purpose is to make white typography readable.

Do NOT heavily darken the original image.

---

# 16. WEBSITE TYPOGRAPHY

Add premium foreground typography.

Suggested hero content:

```text
JOJO INTERNATIONAL

MOVING INDUSTRY
FORWARD.

Automotive excellence.
Industrial capability.
Global vision.

EXPLORE OUR WORLD
```

Typography should be:

- modern
- clean
- premium
- bold but not oversized
- highly readable

Use a professional sans-serif font.

Do not use overly futuristic fonts.

---

# 17. HERO ANIMATION

Text should also react to scroll.

At beginning:

```text
opacity: 0
transform: translateY(30px)
```

Then:

```text
opacity → 1
translateY → 0
```

As the user progresses through the hero:

`Text gradually fades`

while the cinematic background continues.

Do not make text animations too aggressive.

---

# 18. SCROLL INDICATOR

Add a minimal scroll indicator:

```text
SCROLL
   ↓
```

or:

```text
01
────
SCROLL
```

Animate it subtly.

When scrolling begins, fade it out.

---

# 19. SECTION TRANSITION

At the end of the 240-frame sequence:

Do NOT abruptly cut to the next section.

Create a smooth transition.

Recommended:

```text
Frame 240
   ↓
slight darkening
   ↓
hero content fades
   ↓
next section emerges
```

The final frame should remain visible briefly before transitioning.

---

# 20. NEXT SECTION

Create a premium transition into the next section.

Suggested:

```text
AUTOMOTIVE
ENGINEERED FOR MOVEMENT.
```

Use the same visual language.

The cinematic experience should feel like one continuous website rather than disconnected sections.

---

# 21. LENIS SMOOTH SCROLL

If Lenis is used:

Configure it carefully.

The scroll must feel:

- smooth
- heavy
- cinematic
- controlled

Avoid excessive smoothing that creates input lag.

Integrate Lenis with GSAP ticker if GSAP ScrollTrigger is used.

Make sure Lenis + GSAP + ScrollTrigger do not fight each other.

---

# 22. ACCESSIBILITY

Implement:

`prefers-reduced-motion`

If the user prefers reduced motion:

- disable cinematic frame scrubbing
- show a static representative frame
- keep content fully accessible
- preserve readable contrast

All buttons must be keyboard accessible.

Canvas must not contain essential text.

---

# 23. PERFORMANCE TARGETS

Target:

```text
Desktop:
60 FPS

Modern mobile:
45–60 FPS

Low-end mobile:
30+ FPS
```

Avoid:

- unnecessary React re-renders
- state updates on every scroll event
- 240 DOM images
- excessive WebGL effects
- huge memory allocations
- synchronous image decoding
- unnecessary layout calculations

Use refs for rapidly changing animation values.

Do not put the current frame index into React state if doing so causes re-renders on every frame.

Prefer:

```text
useRef()
requestAnimationFrame()
CanvasRenderingContext2D
```

---

# 24. FRAME CACHE

Create an intelligent cache.

Concept:

`Map<number, HTMLImageElement | ImageBitmap>`

The cache should:

- avoid duplicate downloads
- reuse decoded images
- prioritize nearby frames
- avoid uncontrolled memory growth

If memory pressure becomes a concern, implement an eviction strategy.

---

# 25. PRELOADER

Create a beautiful minimal preloader.

Example:

```text
JOJO

LOADING EXPERIENCE

████████████████░░░░
       78%

Preparing the experience...
```

Do not use a generic spinner.

The preloader should feel like part of the brand.

Once the first usable frames are ready:

`ENTER`

or automatically begin.

Do not make users wait unnecessarily for all 240 frames.

---

# 26. ERROR HANDLING

If a frame fails to load:

- do not crash the application
- use the previous successfully loaded frame
- retry failed frames
- log useful information in development
- continue the animation

If the entire sequence fails:

fallback to `frame_0001.png` with a subtle static background.

---

# 27. COMPONENT ARCHITECTURE

Create clean reusable components.

Recommended:

```text
src/
├── components/
│   ├── cinematic/
│   │   ├── CinematicHero.tsx
│   │   ├── CinematicFrameCanvas.tsx
│   │   ├── FrameLoader.ts
│   │   ├── FrameCache.ts
│   │   ├── ScrollFrameController.ts
│   │   └── CinematicOverlay.tsx
│   │
│   ├── navigation/
│   │   └── Navbar.tsx
│   │
│   └── ui/
│
├── hooks/
│   ├── useFrameSequence.ts
│   ├── useScrollProgress.ts
│   └── useReducedMotion.ts
│
├── lib/
│   ├── animation.ts
│   └── performance.ts
│
├── pages/
│   └── Home.tsx
│
└── App.tsx
```

Keep responsibilities separated.

---

# 28. TYPESCRIPT

Use strict TypeScript.

Avoid `any` unless absolutely unavoidable.

Define proper types:

```typescript
type FrameStatus =
  | "idle"
  | "loading"
  | "loaded"
  | "error";

interface FrameAsset {
  index: number;
  src: string;
  status: FrameStatus;
}
```

Keep animation logic strongly typed.

---

# 29. TAILWIND

Use Tailwind for layout and UI styling.

Do not put every style into giant JSX class strings.

For complex animation logic, use dedicated CSS or utility classes where appropriate.

Maintain a clean design system.

---

# 30. VISUAL DESIGN

Primary aesthetic:

```text
Background:
Black / graphite / dark metallic

Text:
White / soft grey

Accent:
Subtle warm metallic amber

Borders:
Very subtle translucent white

UI:
Minimal glass/metal aesthetic
```

Avoid:

- bright neon
- gaming UI
- excessive gradients
- glassmorphism everywhere
- oversized glowing buttons

The website must communicate:

- Trust
- Engineering
- Luxury
- Global presence
- Industrial strength
- Precision

---

# 31. NAVIGATION

Create a transparent navigation over the cinematic hero.

Example:

```text
JOJO
────────────────────────────────────────
Automotive   Machinery   About   Careers   Contact
```

On scroll:

`transparent → subtle dark translucent background`

Navigation must remain readable.

Mobile:

```text
JOJO                         ☰
```

with an elegant fullscreen/mobile menu.

---

# 32. SEO

Implement proper:

- `<title>`
- `<meta name="description">`
- Open Graph metadata
- semantic HTML

Suggested title:

`JOJO International — Automotive & Industrial Solutions`

Do not sacrifice performance for animations.

---

# 33. IMAGE PATH CONFIGURATION

Do not hardcode frame paths throughout the application.

Create a central configuration:

```typescript
const FRAME_COUNT = 240;
const FRAME_PATH = "/frames/frame_";
```

Create a helper:

`getFramePath(index)`

Handle zero padding consistently:

```text
frame_0001.png
frame_0002.png
...
frame_0240.png
```

---

# 34. FRAME INDEXING

The sequence has 240 frames.

Use:

`0 → 239`

internally.

Map:

```typescript
Math.round(progress * (FRAME_COUNT - 1))
```

Clamp the value:

```typescript
Math.max(
  0,
  Math.min(FRAME_COUNT - 1, frameIndex)
)
```

---

# 35. SCROLL SMOOTHING

Do not directly bind:

`scrollY → frame`

with abrupt updates.

Use a smoothed target:

```text
targetProgress
      ↓
lerpedProgress
      ↓
frameIndex
```

Concept:

```typescript
current += (target - current) * smoothing
```

This creates cinematic inertia.

However, ensure the animation still feels responsive.

---

# 36. OPTIONAL 3D ENHANCEMENT

If Three.js / React Three Fiber is used, use it carefully.

Do not recreate the entire cinematic image sequence as a complex 3D scene.

Instead, use Three.js for subtle atmospheric effects such as:

- depth particles
- light haze
- subtle floating dust
- depth planes
- parallax layers

The 240-frame sequence remains the primary visual.

The goal is:

`2D cinematic sequence + 3D depth illusion = premium interactive experience`

---

# 37. MOBILE OPTIMIZATION

For mobile devices:

- Use lower canvas rendering resolution
- Cap DPR
- Reduce particles
- Disable mouse parallax
- Reduce blur
- Reduce expensive 3D effects
- Keep frame sequence functionality

Use responsive media queries/hooks.

Do not ship desktop-level expensive rendering to low-end phones unnecessarily.

---

# 38. CLEAN CODE REQUIREMENT

Do not create one giant `App.tsx` file.

Separate:

- UI
- animation
- frame loading
- scroll logic
- performance
- configuration

into logical modules.

Add comments only where the logic is non-obvious.

Do not over-comment obvious code.

---

# 39. DEVELOPMENT PROCESS

Follow this sequence.

## Step 1 — Inspect

Inspect the existing repository:

```text
package.json
src/
public/
vite.config.*
tailwind.config.*
tsconfig.*
```

Understand the existing project before changing anything.

## Step 2 — Install dependencies

Install only required packages.

## Step 3 — Add frame assets

Extract:

`jojo_video3_frames_24fps.zip`

into:

`public/frames/`

Verify that all 240 frames exist.

## Step 4 — Build frame loader

Implement:

- FrameLoader
- FrameCache
- progressive preload
- decode handling
- error handling

## Step 5 — Build Canvas renderer

Implement:

`CinematicFrameCanvas`

## Step 6 — Implement scroll control

Implement:

`ScrollFrameController`

## Step 7 — Add cinematic hero

Implement:

`CinematicHero`

## Step 8 — Add UI

Implement:

- Navbar
- Hero typography
- CTA
- Scroll indicator

## Step 9 — Add responsive behavior

Test:

- mobile
- tablet
- desktop
- large desktop

## Step 10 — Optimize

Measure:

- FPS
- memory usage
- image decoding
- scroll smoothness
- bundle size

Fix performance problems before finishing.

---

# 40. ACCEPTANCE CRITERIA

The implementation is complete only when ALL of these are true.

### Frame sequence

- [ ] All 240 frames are available.
- [ ] Frames preserve original quality.
- [ ] Correct frame ordering.
- [ ] No frame distortion.
- [ ] No visible flashing.
- [ ] No broken frame paths.

### Scroll

- [ ] Scroll controls the animation.
- [ ] Animation works forward.
- [ ] Animation works backward.
- [ ] Fast scrolling does not break the sequence.
- [ ] Slow scrolling feels smooth.
- [ ] Stopping scroll stops at the corresponding frame.

### Visual

- [ ] Full-screen cinematic background.
- [ ] Premium dark aesthetic.
- [ ] Correct aspect ratio.
- [ ] Subtle depth/parallax.
- [ ] Elegant typography.
- [ ] Readable navigation.
- [ ] No distracting effects.

### Performance

- [ ] No 240 `<img>` elements rendered simultaneously.
- [ ] No excessive React re-renders.
- [ ] Progressive loading implemented.
- [ ] Frame caching implemented.
- [ ] Responsive canvas resolution.
- [ ] Mobile optimization implemented.
- [ ] Reduced-motion fallback implemented.

### UX

- [ ] Smooth scroll.
- [ ] Preloader.
- [ ] Scroll indicator.
- [ ] Responsive navigation.
- [ ] Hero transitions smoothly into the next section.
- [ ] Keyboard accessibility.
- [ ] Mobile touch scrolling works naturally.

---

# 41. IMPORTANT DESIGN PRINCIPLE

This is NOT supposed to look like:

`"AI-generated futuristic website"`

It should look like:

`A premium international automotive and industrial company's official website.`

Think:

`Luxury automotive presentation + Industrial engineering + Editorial minimalism + Cinematic storytelling`

The animation should impress the visitor without distracting from JOJO's business.

---

# 42. FINAL DELIVERABLE

After implementation:

1. Run the development server.
2. Verify the homepage.
3. Test scrolling.
4. Test reverse scrolling.
5. Test mobile.
6. Test desktop.
7. Check browser console.
8. Fix all errors.
9. Check that all 240 frames load correctly.
10. Verify that there are no unnecessary dependencies.
11. Verify TypeScript compilation.
12. Verify production build.

Run the appropriate commands such as:

```bash
npm run dev
npm run build
```

and fix any resulting errors.

Do not stop after creating the basic canvas.

The final implementation must feel like a polished, production-ready cinematic website experience.

---

# FINAL CREATIVE DIRECTION

The visitor should experience this:

```text
LANDING
   ↓
Dark cinematic atmosphere
   ↓
Premium automobile emerges
   ↓
Camera glides through the environment
   ↓
Industrial machinery becomes visible
   ↓
JOJO positioning appears
   ↓
Scroll continues
   ↓
Hero transforms into the next section
```

The overall impression should be:

**JOJO INTERNATIONAL**

**MOVING INDUSTRY FORWARD.**

Premium.
Elegant.
Confident.
Engineered.
Global.
Timeless.
