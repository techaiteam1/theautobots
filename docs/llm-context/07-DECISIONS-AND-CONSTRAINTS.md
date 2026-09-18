---
title: Decisions and Constraints
type: decision-log
status: current
last_verified: 2026-09-16
---

# Decisions and constraints

## Accepted decisions

### D01: Continuous scene over stacked landing page

Use fixed viewport layers and a long scroll-mapped narrative because visual pacing is the core product requirement. Do not replace it with independent rectangular sections without explicit approval.

### D02: GSAP owns complex motion

One coordinated timeline and named journey landmarks are easier to reason about and clean up than unrelated timers or per-element scroll listeners. CSS handles static layout and simple state transitions.

### D03: Canvas 2D particle system

Canvas supplies the needed depth and motif sampling at lower dependency and complexity cost than a general 3D engine. The motif is data-driven through its alpha channel.

### D04: Configuration before components

Brand identity, copy, and theme are isolated from presentation so future rebranding or CMS migration does not require redesigning the component tree or timelines.

### D05: Brand-owned asset replacements

The reference is authority for composition and motion, not a source of production assets. The supplied Auto Bots logo now drives the particle motif and palette; original concept diagrams replace identifiable reference expression.

### D06: Native-flow reduced-motion mode

Accessibility requires readable content even when the scroll choreography is inappropriate. Reduced motion changes document presentation while preserving the same information and hierarchy.

### D07: Accessible menu added deliberately

The implementation adds a restrained modal menu because touch and keyboard access are requirements even where the reference offers less explicit navigation behavior.

### D08: Use the confirmed live URL for canonical metadata

The planned custom domain is not owned, so it must not appear in canonical metadata. The confirmed GitHub Pages deployment is the current canonical. Replace it only after an owned custom domain is connected and serving HTTPS.

### D09: Revenue-operations content expansion without SaaS layout

The homepage now uses the agency/service-firm revenue-operations positioning and four sequential system panels plus one sparse offer scene. This expands the content capacity while preserving the continuous fixed-stage composition, one-focus-at-a-time rhythm, and no pricing/table/testimonial conventions.

### D10: Larger narrative as staged motion beats

The expanded homepage narrative adds workflow mapping, operating controls, and ideal-fit scenes as timed motion beats rather than conventional content sections. These scenes may carry more message density, but each remains a single focal composition with no cards, grids, pricing, testimonials, or dashboard-style drift.

## Hard constraints

- No copied reference HTML, CSS, JavaScript, components, bundles, copy, imagery, logo, icon, illustration, proprietary font, or downloadable asset.
- No invented client work, results, numbers, awards, testimonials, or social profiles.
- No generic SaaS visual drift.
- No hardcoded brand values scattered through components.
- No animation system that breaks reduced motion, keyboard access, cleanup, or touch.
- No machine-specific runtime resource path.
- No heavy UI framework or landing-page library.

## Known tradeoffs

- The fixed scene is visually distinctive but makes full-page screenshots less informative; compare named settled states.
- Canvas content is decorative and cannot replace semantic text.
- Adding long-form content requires a designed content mode, not simply extending timed captions.
- Headless Chromium QA cannot substitute for physical devices, Safari/Firefox, or assistive-technology testing.

## Change protocol

If a future request conflicts with a decision, record the new decision and reason here before implementation. Update the affected subsystem note and [[09-CHANGELOG]]. Do not silently erase earlier rationale; mark a decision superseded and link to its replacement.
