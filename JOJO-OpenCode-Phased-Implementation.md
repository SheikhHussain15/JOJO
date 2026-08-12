# JOJO International — OpenCode Phased Build Specification

## Purpose

This document is the implementation playbook for rebuilding the JOJO International website from the existing repository into a premium, responsive, cinematic automotive + industrial website.

The project already has a completed **scroll-driven cinematic animation** prepared by the project owner.

OpenCode must treat that animation as a completed foundation and focus on integrating it into the complete website experience rather than recreating the animation from scratch.

---

# 0. IMPORTANT CONTEXT

## Repository

GitHub repository:

`https://github.com/SheikhHussain15/JOJO.git`

The repository must be inspected locally before making changes.

Do not assume a framework or architecture.

First determine:

- framework
- package manager
- React/Next/Vite status
- TypeScript status
- Tailwind status
- existing routes
- existing components
- existing styling
- current assets
- existing cinematic scroll implementation
- current frame/video asset paths
- forms/API
- environment variables
- deployment configuration

Do not delete working code before understanding it.

---

# 1. BUSINESS BASELINE

JOJO International is an automotive and industrial/agricultural machinery company.

The redesign must preserve the company's real identity and approved business information.

Publicly visible JOJO content includes:

- automotive sales/marketing
- agricultural/industrial machinery
- company/about information
- vision
- mission
- leadership/CEO message
- careers
- contact
- machinery/product categories

The current public website describes JOJO as an automotive sales/marketing agency and references automotive industry experience since 2016.

Do not invent:

- revenue
- customer counts
- countries served
- certifications
- partnerships
- product specifications
- employee counts
- testimonials
- awards
- statistics

unless those details are supplied in the repository or by the business.

---

# 2. DESIGN VISION

The final website should feel like:

**A premium international automotive and industrial brand.**

Visual principles:

- classic
- elegant
- cinematic
- premium
- minimal
- industrial
- confident
- timeless

Avoid:

- gaming aesthetics
- excessive neon
- overdone glassmorphism
- excessive 3D
- random animations
- template-like layouts
- exaggerated gradients
- visual clutter

The animation is a storytelling device, not the entire website.

---

# 3. CORE EXPERIENCE

The visitor journey should be:

```text
LAND
  ↓
CINEMATIC HERO
  ↓
UNDERSTAND JOJO
  ↓
AUTOMOTIVE
  ↓
MACHINERY
  ↓
EXPLORE PRODUCTS
  ↓
ABOUT / TRUST
  ↓
CAREERS
  ↓
CONTACT
```

The experience should progressively move from emotion → credibility → discovery → conversion.

---

# 4. COMPLETED SCROLL ANIMATION

The cinematic scroll animation is already prepared.

OpenCode must:

1. Inspect how it currently works.
2. Preserve its visual output.
3. Refactor only when necessary for integration/performance.
4. Avoid regenerating the animation.
5. Avoid replacing it with a different visual.
6. Connect its progress to the site's narrative.
7. Make sure it works on desktop, tablet and mobile.
8. Respect reduced-motion settings.

The animation should be treated as the **hero visual foundation**.

---

# 5. TECHNOLOGY DIRECTION

Preferred technologies if they fit the existing project:

- React
- TypeScript
- Tailwind CSS
- GSAP
- ScrollTrigger
- Lenis
- Three.js / React Three Fiber only where useful
- Lucide or equivalent icon library

Do not add a dependency simply because it is popular.

Every dependency must solve a real project requirement.

---

# 6. GLOBAL ARCHITECTURE

Use a layered architecture:

```text
APP
│
├── Routing
│
├── Global Layout
│   ├── Navbar
│   └── Footer
│
├── Pages
│   ├── Home
│   ├── Automotive
│   ├── Machinery
│   ├── Product Detail
│   ├── About
│   ├── Careers
│   └── Contact
│
├── Cinematic System
│   ├── Existing Scroll Animation
│   ├── Scroll Timeline
│   ├── Hero Content
│   └── Motion Utilities
│
├── Content/Data
│
├── Forms
│
└── Shared UI
```

---

# 7. DESIGN SYSTEM

Create a consistent visual system.

## Colors

Primary:

- near black
- graphite
- gunmetal
- charcoal
- soft white
- silver
- restrained warm amber accent

## Typography

Use a modern professional sans-serif.

Large display typography should feel editorial rather than futuristic.

## UI

Use:

- thin borders
- restrained radius
- subtle shadows
- subtle transparency
- generous whitespace

Buttons should be simple and premium.

---

# 8. INFORMATION ARCHITECTURE

Required routes:

```text
/
/automotive
/machinery
/machinery/[slug]
/about
/careers
/contact
/privacy
/terms
/404
```

Use the routing system already established in the repository.

Do not create duplicate routing systems.

---

# 9. HOME PAGE STRUCTURE

Required sequence:

```text
01 — CINEMATIC HERO
02 — BRAND INTRO
03 — AUTOMOTIVE
04 — MACHINERY
05 — WHY JOJO
06 — COMPANY STORY
07 — VISION / MISSION
08 — CEO MESSAGE
09 — CTA
10 — CONTACT
11 — FOOTER
```

---

# 10. HERO

The hero must integrate the existing scroll animation.

Foreground content:

```text
JOJO INTERNATIONAL

MOVING INDUSTRY
FORWARD.

Automotive excellence.
Industrial capability.
Global vision.

[ Explore Our World ]
```

Also include:

- premium navigation
- scroll indicator
- subtle overlay
- strong typography
- readable contrast

Do not hide the visual under excessive overlays.

---

# 11. HERO SCROLL STORY

The animation should support a narrative such as:

```text
BEGIN
Dark cinematic environment
↓
Automotive emphasis
↓
Industrial transition
↓
Agricultural/machinery emphasis
↓
JOJO brand statement
↓
Dark transition
↓
Automotive section
```

The exact frame timing must be adapted to the animation already implemented in the repository.

Do not assume the current frame count, file names, dimensions, or implementation until inspected.

---

# 12. HERO CONTENT TIMING

Use scroll progress to control both the visual and text.

Example conceptual timeline:

```text
0.00 – 0.15
Logo/navigation
Hero title reveal

0.15 – 0.40
Primary statement
Automotive emphasis

0.40 – 0.65
Secondary copy
Transition toward machinery

0.65 – 0.85
Machinery/industrial emphasis

0.85 – 1.00
Hero CTA fades
Transition into next section
```

Adapt this to the actual animation.

---

# 13. GLOBAL NAVBAR

Desktop:

```text
JOJO
Automotive
Machinery
About
Careers
Contact
```

Behavior:

- transparent at top
- transitions to dark translucent background on scroll
- active route indicator
- smooth hover states

Mobile:

```text
JOJO                         MENU
```

Mobile menu:

- full-height or large overlay
- simple typography
- clear close button
- keyboard accessible

---

# 14. BRAND INTRO

Purpose:

Explain JOJO immediately after the cinematic hero.

Suggested structure:

```text
WHO WE ARE

Automotive expertise.
Industrial capability.
Long-term relationships.

[ Discover JOJO ]
```

Use real company content.

---

# 15. AUTOMOTIVE SECTION

Purpose:

Make automotive business a major visual pillar.

Design:

- large image
- large headline
- concise text
- subtle reveal
- CTA

Possible presentation:

```text
AUTOMOTIVE

MOVEMENT, SOURCED WITH PRECISION.

JOJO's automotive sales and marketing capability.
```

Do not invent services that the business does not provide.

---

# 16. MACHINERY SECTION

This is a major content area.

Create:

- category navigation
- featured machinery
- product cards
- clear CTA
- product detail routing

Suggested categories, only where supported by actual product data:

```text
All
Agriculture
Industrial
Construction
Power
Transport
Utility
```

---

# 17. PRODUCT CARD

Each product card:

```text
Image
Category
Product Name
Short description
View Details →
```

Interaction:

- subtle image zoom
- subtle card lift
- arrow movement
- no excessive effects

---

# 18. MACHINERY DETAIL

Route:

`/machinery/[slug]`

Structure:

```text
Large product visual

Product Name
Category

Overview

Applications

Specifications

Features

[ Request Information ]
```

Only render specifications that exist in source data.

No fabricated details.

---

# 19. MACHINERY DATA MODEL

Use typed data.

Example:

```typescript
interface MachineryProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  gallery?: string[];
  applications?: string[];
  specifications?: {
    label: string;
    value: string;
  }[];
  featured?: boolean;
}
```

Keep data outside UI components.

---

# 20. ABOUT PAGE

Required sections:

```text
About JOJO
Who We Are
Our Story
What We Do
Vision
Mission
Leadership
CTA
```

The visual language should continue from the homepage.

Do not make it look like an unrelated template.

---

# 21. VISION

Present the approved vision content with strong typography and whitespace.

Core public themes include:

- customer satisfaction
- quality
- affordability
- leadership in sales/customer service

Do not add unsupported claims.

---

# 22. MISSION

Present approved mission content using:

- reliability
- standards
- continual improvement
- quality-focused messaging

Use the actual company-approved wording where available.

---

# 23. CEO / LEADERSHIP

If the repository contains the approved CEO content, display it elegantly.

Structure:

```text
MESSAGE FROM THE CEO

[approved photo]

[approved message]

Shahzaib Saleem
CEO / Founder
```

Do not invent biography details.

---

# 24. CAREERS

Required:

```text
Career hero
Why work with JOJO
Open positions
Application form
Resume upload
```

Fields:

```text
Full Name
Email
Phone
Position
Message
Resume
```

File restrictions should be configurable.

Recommended:

- PDF
- DOC
- DOCX

Add:

- client validation
- server validation
- upload progress
- success state
- error state
- spam protection

---

# 25. CONTACT

Required:

```text
Contact hero
Office information
Email
Phone
Contact form
Map / location area
```

Verify all production contact details before launch.

Contact form:

```text
Name
Email
Phone
Company
Subject
Message
Interest
```

Interest options:

```text
Automotive
Machinery
Partnership
General
```

---

# 26. FORM ARCHITECTURE

Do not leave form handling entirely client-side.

Preferred:

```text
Frontend
↓
API/Server
↓
Validation
↓
Spam protection
↓
Email / CRM / storage
```

Keep the implementation provider-agnostic.

---

# 27. FOOTER

Footer:

```text
JOJO INTERNATIONAL

Automotive
Machinery
About
Careers
Contact

Office
Email
Phone

Social Links

Privacy
Terms

© JOJO International
```

Only use verified links/details.

---

# 28. RESPONSIVE DESIGN

Design intentionally for:

- mobile
- tablet
- laptop
- desktop
- large desktop

The mobile site should not simply be a reduced desktop.

Hero should preserve visual focal points.

The animation should remain usable on mobile with performance optimizations.

---

# 29. MOBILE CINEMATIC STRATEGY

On mobile:

- reduce canvas resolution if required
- cap DPR
- reduce parallax
- disable mouse effects
- reduce particles
- reduce expensive blur
- preserve core frame animation
- maintain readable content

For low-end devices:

Use a static representative frame if necessary, but only when performance requires it.

---

# 30. ACCESSIBILITY

Implement:

- semantic HTML
- keyboard navigation
- focus states
- labels
- alt text
- sufficient contrast
- reduced motion
- accessible mobile menu

Canvas cannot contain the only copy for essential information.

---

# 31. REDUCED MOTION

When:

`prefers-reduced-motion: reduce`

Then:

- disable frame scrubbing
- show static hero frame
- reduce transitions
- disable mouse parallax
- minimize decorative animations

All content remains usable.

---

# 32. PERFORMANCE

Major concern:

The cinematic system can be heavy.

Before adding new effects:

1. inspect existing frame implementation
2. measure its memory usage
3. identify decoding behavior
4. identify re-renders
5. identify scroll handler behavior
6. improve only where necessary

Targets:

```text
Desktop: 60 FPS
Modern mobile: 45–60 FPS
Low-end mobile: 30+ FPS where feasible
```

Avoid:

- 240 DOM images
- setState on every animation tick
- forced layout
- synchronous decoding
- huge memory allocations
- unnecessary Three.js scenes

---

# 33. ANIMATION PRINCIPLES

Animation must be:

- smooth
- slow
- controlled
- purposeful
- reversible
- responsive

Never use animation merely to make an element move.

Every animation must communicate:

- hierarchy
- direction
- continuity
- emphasis

---

# 34. 3D ENHANCEMENT

Only if the existing animation benefits from it, add:

- atmospheric dust
- subtle depth layers
- haze
- parallax
- controlled perspective

Do not build a heavy fake 3D scene over the completed scroll animation.

The scroll animation remains primary.

---

# 35. SEO

Each route must have:

- unique title
- description
- canonical URL
- Open Graph metadata
- social preview
- proper H1
- semantic sections

Product detail pages must generate metadata from product data.

---

# 36. SECURITY

Do not commit:

- API secrets
- SMTP passwords
- private tokens
- `.env` values

Use environment variables.

Validate uploaded files server-side.

Do not trust client MIME type alone.

---

# 37. CONTENT ARCHITECTURE

Prefer:

```text
src/data/
  company.ts
  machinery.ts
  navigation.ts
  careers.ts
```

Do not put long business copy directly into giant page components.

---

# 38. RECOMMENDED PROJECT STRUCTURE

Adapt to the existing framework:

```text
src/
├── app/ or pages/
├── components/
│   ├── cinematic/
│   ├── navigation/
│   ├── machinery/
│   ├── sections/
│   ├── forms/
│   └── ui/
├── data/
├── hooks/
├── lib/
├── types/
└── styles/

public/
├── frames/
├── images/
├── icons/
└── fonts/
```

---

# 39. PHASE ROADMAP

The project is intentionally split into phases.

```text
PHASE 0 — Repository Audit
PHASE 1 — Foundation & Design System
PHASE 2 — Cinematic Hero Integration
PHASE 3 — Homepage Sections
PHASE 4 — Automotive & Machinery Platform
PHASE 5 — About / Careers / Contact
PHASE 6 — Forms & Backend Integration
PHASE 7 — SEO / Accessibility / Responsive Polish
PHASE 8 — Performance / QA / Production
```

Each phase below contains a standalone prompt for OpenCode.

---

# PHASE 0 — REPOSITORY AUDIT

## Goal

Understand the actual current project before changing it.

## OpenCode Prompt

```text
You are beginning the JOJO International website rebuild.

Do NOT modify the project yet.

First perform a complete repository audit.

Repository:
https://github.com/SheikhHussain15/JOJO.git

Inspect the local repository that is currently open.

Determine:

1. Framework
2. Build tool
3. Package manager
4. React version
5. TypeScript configuration
6. Tailwind configuration
7. Routing system
8. Existing pages
9. Existing components
10. Existing assets
11. Existing cinematic/scroll animation
12. Existing frame/video assets
13. Existing animation libraries
14. Existing API/form logic
15. Existing environment variables
16. Deployment configuration
17. SEO setup
18. Accessibility implementation
19. Current errors/warnings
20. Current technical debt

Pay special attention to the already-completed scroll animation.

Do not replace or recreate it.

Produce:

- repository structure summary
- technology inventory
- reusable components
- obsolete components
- current routes
- existing cinematic system architecture
- asset inventory
- risks
- recommendations
- proposed target architecture

Do not modify files during this audit.

At the end, create:

docs/repository-audit.md

Do not fabricate any findings.
Only report what you actually inspect.
```

## Phase completion

Do not move on until:

- audit exists
- project structure is understood
- existing scroll animation is identified
- major technical risks are documented

---

# PHASE 1 — FOUNDATION & DESIGN SYSTEM

## Goal

Establish the new visual system and application architecture without breaking the existing animation.

## OpenCode Prompt

```text
Now implement Phase 1 of the JOJO International rebuild.

Use the repository audit from docs/repository-audit.md.

IMPORTANT:

Do not recreate the scroll animation.

Do not delete working functionality unless the audit proves it is obsolete.

First establish the design foundation.

Tasks:

1. Confirm the current framework.
2. Keep the existing framework if appropriate.
3. Upgrade to TypeScript if needed.
4. Configure Tailwind if needed.
5. Create a consistent design token system.
6. Create typography hierarchy.
7. Create color tokens.
8. Create spacing/container system.
9. Create global motion tokens.
10. Create reusable Button component.
11. Create Container component.
12. Create SectionHeading component.
13. Create Eyebrow component.
14. Create Navbar shell.
15. Create Footer shell.
16. Create responsive layout primitives.
17. Configure global page background.
18. Configure accessibility defaults.

Visual language:

- black
- graphite
- gunmetal
- soft white
- silver
- restrained amber accent

The site must feel classic, elegant and premium.

Avoid:
- neon
- gaming visuals
- excessive glass
- unnecessary gradients

Preserve all existing working routes until they are intentionally migrated.

Test the build after implementation.

Create:
docs/phase-1.md

Document:
- files changed
- architecture decisions
- dependencies added
- tests performed
- known issues
```

## Phase completion

- Design system works.
- Navbar shell works.
- Footer shell works.
- Existing project still builds.

---

# PHASE 2 — CINEMATIC HERO INTEGRATION

## Goal

Integrate the completed scroll animation into the new JOJO design.

## OpenCode Prompt

```text
Now implement Phase 2.

The repository already contains a completed JOJO cinematic scroll animation.

Treat it as an existing product asset.

DO NOT regenerate the animation.

DO NOT replace it with a normal video.

DO NOT create a new unrelated 3D scene.

First inspect the existing implementation and determine:

- how frames are loaded
- whether rendering uses Canvas/WebGL/video
- scroll implementation
- frame progress calculation
- preload strategy
- mobile behavior
- memory usage
- resize handling

Then integrate it into a production-quality cinematic hero.

Create or refactor:

- CinematicHero
- CinematicFrameRenderer
- ScrollTimeline
- HeroContent
- CinematicOverlay

Use the existing implementation where possible.

Hero structure:

JOJO INTERNATIONAL

MOVING INDUSTRY
FORWARD.

Automotive excellence.
Industrial capability.
Global vision.

[ Explore Our World ]

Add a subtle scroll indicator.

Navbar should sit above the hero.

Hero must be full-screen.

The scroll animation should drive the visual timeline.

Hero content should also animate based on scroll progress.

Do not over-animate.

Make the experience:

- classic
- elegant
- cinematic
- premium

Desktop:
full-quality experience.

Tablet:
balanced experience.

Mobile:
optimized experience.

Reduced motion:
static fallback.

Add error handling for frame failures.

Verify:

- forward scroll
- reverse scroll
- fast scroll
- slow scroll
- resize
- mobile
- reduced motion

Create:
docs/phase-2.md

Document the exact integration architecture.
```

## Phase completion

- Existing animation is integrated.
- Hero feels like part of the new brand.
- No broken scroll behavior.
- Mobile has a fallback/optimized mode.

---

# PHASE 3 — HOMEPAGE

## Goal

Build the rest of the homepage around the cinematic hero.

## OpenCode Prompt

```text
Implement Phase 3 — complete JOJO homepage.

Do not change the existing cinematic animation unless required for integration.

Create these sections in order:

1. Cinematic Hero
2. Brand Introduction
3. Automotive
4. Machinery
5. Why JOJO
6. Company Story
7. Vision
8. Mission
9. CEO Message
10. CTA
11. Contact teaser
12. Footer

Maintain visual continuity.

The homepage should feel like one editorial story.

Use large typography, strong imagery, whitespace and subtle scroll reveals.

Brand Introduction:
Explain who JOJO is using approved existing company content.

Automotive:
Highlight automotive sales/marketing capability.

Machinery:
Preview the actual machinery catalog.

Why JOJO:
Use only approved facts.

Company Story:
Use verified company history.

Vision:
Use actual approved vision content.

Mission:
Use actual approved mission content.

CEO:
Use actual approved message and image if available.

CTA:
Provide a strong final business action.

Every section should have a clear purpose.

Animation:
- fade
- reveal
- subtle parallax
- directional motion

Avoid excessive effects.

On mobile:
stack naturally
reduce motion
preserve hierarchy

Create:
docs/phase-3.md

Run production build and fix all issues.
```

---

# PHASE 4 — AUTOMOTIVE + MACHINERY PLATFORM

## Goal

Turn JOJO's product capability into a reusable product discovery experience.

## OpenCode Prompt

```text
Implement Phase 4 — Automotive and Machinery platform.

FIRST inspect the repository for real product data and images.

Do not fabricate product information.

Create:

/automotive

/machinery

/machinery/[slug]

Machinery page:

- premium hero
- category filter
- optional search
- featured products
- product grid
- responsive layout

Suggested filters if supported by data:

All
Agriculture
Industrial
Construction
Power
Transport
Utility

Product card:

- image
- category
- name
- short description
- view details

Product detail:

- image/gallery
- title
- category
- overview
- applications
- specifications where available
- features where available
- inquiry CTA

Create typed product data.

Suggested interface:

interface MachineryProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  gallery?: string[];
  applications?: string[];
  specifications?: {
    label: string;
    value: string;
  }[];
  featured?: boolean;
}

Inquiry CTA should preserve the selected product.

Use reusable components.

Do not put product data inside JSX.

Add loading, empty and error states.

Create:
docs/phase-4.md
```

## Phase completion

- Automotive page exists.
- Machinery catalog works.
- Product details work.
- No fabricated product data.

---

# PHASE 5 — ABOUT / CAREERS / CONTACT

## Goal

Complete the company and conversion pages.

## OpenCode Prompt

```text
Implement Phase 5.

Create:

/about
/careers
/contact

ABOUT:

Sections:
- Hero
- Who We Are
- Story
- What We Do
- Vision
- Mission
- Leadership
- CTA

Use approved company content.

CAREERS:

Sections:
- Hero
- Why JOJO
- Open positions
- Application form
- Resume upload

Fields:
Full Name
Email
Phone
Position
Message
Resume

CONTACT:

Sections:
- Hero
- Office
- Email
- Phone
- Contact form
- Map/location

Contact fields:
Name
Email
Phone
Company
Subject
Message
Interest

Interest:
Automotive
Machinery
Partnership
General

Create polished success/error/loading states.

Keep all pages visually connected to the homepage.

Create:
docs/phase-5.md
```

---

# PHASE 6 — FORMS / BACKEND / FILE UPLOADS

## Goal

Make contact and career forms production-ready.

## OpenCode Prompt

```text
Implement Phase 6.

Inspect the existing repository for any API/server implementation.

Reuse it where appropriate.

Create secure server-side form handling.

Contact flow:

Frontend
↓
API
↓
Validation
↓
Spam protection
↓
Email/CRM destination

Career flow:

Frontend
↓
API
↓
Validate fields
↓
Validate file
↓
Upload securely
↓
Store/process application
↓
Notify business

Requirements:

- server-side validation
- client-side validation
- upload size limit
- extension validation
- MIME validation
- safe filenames
- no public exposure of uploaded resumes
- clear error messages
- clear success messages
- retry support

Never place secret credentials in frontend code.

Use environment variables.

Do not hardcode private API keys.

Create:
docs/phase-6.md

Document:
- API routes
- environment variables
- file restrictions
- security decisions
```

---

# PHASE 7 — SEO / ACCESSIBILITY / RESPONSIVE POLISH

## Goal

Bring the site to production-quality UX.

## OpenCode Prompt

```text
Implement Phase 7.

Audit every page for:

SEO
Accessibility
Responsive behavior
Typography
Spacing
Navigation
Forms
Motion

SEO:

- title
- meta description
- canonical
- Open Graph
- social metadata
- sitemap
- robots

Accessibility:

- semantic HTML
- keyboard support
- focus states
- labels
- alt text
- reduced motion
- contrast

Responsive:

Test:
- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1440px
- 1920px

Fix:
- overflow
- broken grids
- text wrapping
- hero crop
- mobile menu
- buttons
- form layout

Keep the cinematic experience intact.

Create:
docs/phase-7.md
```

---

# PHASE 8 — PERFORMANCE / QA / PRODUCTION

## Goal

Prepare the final website for real production.

## OpenCode Prompt

```text
Implement Phase 8 — final production optimization.

Perform a full technical audit.

Check:

1. TypeScript errors
2. Build errors
3. Console errors
4. Missing assets
5. broken links
6. image loading
7. frame loading
8. animation performance
9. memory usage
10. mobile performance
11. accessibility
12. SEO
13. form behavior
14. 404 handling

Cinematic system:

Measure and optimize:

- frame decoding
- canvas rendering
- scroll updates
- React renders
- memory
- DPR
- preload strategy

Do not sacrifice visual quality unnecessarily.

Remove unused dependencies and dead code.

Check bundle size.

Run:
- development build
- production build
- available test suite

Fix all errors.

Perform a final responsive pass.

Create:

docs/phase-8.md

Then update:

README.md

Include:

- project overview
- stack
- local setup
- environment variables
- asset structure
- cinematic architecture
- development commands
- production build
- deployment notes
- troubleshooting
```

---

# 40. MASTER FINAL AUDIT PROMPT

After all phases are complete, give OpenCode this prompt:

```text
Perform a final senior-level audit of the entire JOJO International project.

Do not add random features.

Review the project against:

1. Product requirements
2. Design system
3. Existing cinematic scroll animation
4. Responsive requirements
5. Accessibility
6. SEO
7. Performance
8. Security
9. Code quality
10. Maintainability
11. Conversion UX

Inspect every route.

Verify:

/
 /automotive
 /machinery
 /machinery/[slug]
 /about
 /careers
 /contact
 /privacy
 /terms
 /404

Verify the hero animation:

- works on desktop
- works on tablet
- works on mobile
- scrolls forward
- scrolls backward
- handles fast scrolling
- handles resizing
- respects reduced motion
- has fallback behavior

Verify:

- no console errors
- no TypeScript errors
- production build succeeds
- no broken links
- no missing images
- no fabricated business information
- no exposed secrets
- forms work
- resume upload is secure

Then produce:

docs/final-audit.md

Include:

- issues found
- severity
- fixes applied
- remaining risks
- performance observations
- recommended future improvements

Only report what was actually tested.
```

---

# 41. OPENCode WORK RULES

These rules apply to every phase.

## Rule 1 — Inspect first

Never modify blindly.

## Rule 2 — Preserve the animation

The existing scroll animation is already prepared.

Integrate it.

## Rule 3 — Do not fabricate

Real business content only.

## Rule 4 — Build incrementally

Finish one phase before starting the next.

## Rule 5 — Validate every phase

Run the project after significant changes.

## Rule 6 — Keep components reusable

Avoid duplicated page-specific UI.

## Rule 7 — Mobile matters

Every desktop feature requires mobile behavior.

## Rule 8 — Performance over decoration

A beautiful 60 FPS site is better than a heavy 3D showcase.

## Rule 9 — Do not over-engineer

Use the simplest architecture that satisfies the requirement.

## Rule 10 — Do not silently break existing features

Check existing functionality before changing it.

---

# 42. PHASE CHECKLIST

## Phase 0

- [ ] Repository audited
- [ ] Current stack documented
- [ ] Existing animation documented
- [ ] Existing routes documented
- [ ] Risks documented

## Phase 1

- [ ] Design tokens
- [ ] Typography
- [ ] Colors
- [ ] Navbar
- [ ] Footer
- [ ] Shared UI

## Phase 2

- [ ] Existing scroll animation integrated
- [ ] Hero content
- [ ] Scroll timeline
- [ ] Responsive
- [ ] Reduced motion
- [ ] Fallback

## Phase 3

- [ ] Homepage
- [ ] Brand intro
- [ ] Automotive
- [ ] Machinery preview
- [ ] Why JOJO
- [ ] Story
- [ ] Vision
- [ ] Mission
- [ ] CEO
- [ ] CTA

## Phase 4

- [ ] Automotive page
- [ ] Machinery page
- [ ] Filtering
- [ ] Search if needed
- [ ] Product details
- [ ] Inquiry CTA

## Phase 5

- [ ] About
- [ ] Careers
- [ ] Resume upload UI
- [ ] Contact
- [ ] Contact UI

## Phase 6

- [ ] APIs
- [ ] Validation
- [ ] Spam protection
- [ ] File validation
- [ ] Secure upload
- [ ] Email/CRM integration

## Phase 7

- [ ] SEO
- [ ] Accessibility
- [ ] Responsive
- [ ] Mobile polish
- [ ] Reduced motion

## Phase 8

- [ ] Performance
- [ ] Testing
- [ ] Build
- [ ] Browser QA
- [ ] Documentation
- [ ] Final audit

---

# 43. FINAL DEFINITION OF DONE

The project is finished when a visitor can:

```text
Open JOJO
    ↓
Experience the cinematic scroll hero
    ↓
Understand JOJO
    ↓
Explore Automotive
    ↓
Explore Machinery
    ↓
Open a product
    ↓
Request information
    ↓
Read About / Vision / Mission
    ↓
Read leadership message
    ↓
View Careers
    ↓
Apply
    ↓
Contact JOJO
```

while experiencing:

```text
Premium
Elegant
Cinematic
Fast
Responsive
Accessible
Trustworthy
Professional
```

The final website should feel like a modern premium international company — not a redesigned PHP template.

---

# 44. FINAL PRODUCT STATEMENT

**JOJO INTERNATIONAL**

**MOVING INDUSTRY FORWARD.**

Automotive.
Agriculture.
Industry.
Global ambition.

Premium.
Elegant.
Confident.
Engineered.
Reliable.
Timeless.
