---
title: Start Here
type: project-context
status: current
last_verified: 2026-09-16
source_of_truth: repository
---

# The Auto Bots website: start here

This folder is the durable handoff context for humans and LLMs. It describes what exists, why it exists, how the parts relate, what must not drift, and how to verify a change. It is deliberately layered so a new model can load only what its task needs.

## Two-minute brief

- Product: official website for **The Auto Bots**.
- Positioning: AI transformation -> custom agentic systems -> managed AI operations -> AI operating infrastructure.
- Tagline: **Transform · Operate · Evolve**.
- Public email: `theautobots.ai@gmail.com`.
- Public deployment: `https://techaiteam1.github.io/theautobots/` on GitHub Pages. The planned custom domain `theautobots.ai` is not purchased as of the last verification.
- Stack: React 19, TypeScript, Vite 7, GSAP 3, semantic HTML, authored CSS, Canvas 2D.
- Design authority: the measured patterns in [reference analysis](../reference-analysis.md), inspired by `milancompain.com` without reusing its protected code or assets.
- Current state: complete local production implementation. Lint, strict TypeScript, build, eight viewport runs, production asset checks, keyboard menu, pause, and reduced-motion checks passed.
- Deployment: GitHub Pages builds from `main`; `dist/` remains generated and untracked.

## Experience in one paragraph

The site is one continuous near-black viewport scene rather than a stack of SaaS sections. A loading sequence reveals an oversized fitted company name over a particle threshold. Scroll moves through a field of short capability phrases, a systems heading, three alternating media panels balanced by a rotating particle motif, an outro statement, and a quiet contact composition. Desktop retains peripheral typography and alternating panels; phones center panels in the lower viewport with captions below media. Reduced-motion mode becomes a readable native-flow document.

## Read by task

| Task | Read these notes |
| --- | --- |
| Any code change | This file, then [[02-ARCHITECTURE]] and [[07-DECISIONS-AND-CONSTRAINTS]] |
| Copy, contact, social, logo, colors, fonts | [[04-CONTENT-BRANDING-ASSETS]] and root `BRANDING.md` |
| Animation, scroll, canvas, panels | [[03-MOTION-AND-INTERACTION]] plus [[02-ARCHITECTURE]] |
| Responsive, accessibility, metadata | [[05-ACCESSIBILITY-RESPONSIVE-SEO]] |
| Testing, release, deployment | [[06-BUILD-QA-OPERATIONS]] |
| Visual redesign or fidelity work | [[01-PRODUCT-AND-DESIGN]] plus `docs/reference-analysis.md` |
| Starting a new LLM session | [[08-LLM-HANDOFF]] |

## Trust order

When facts conflict, use this order:

1. Current source and configuration.
2. Automated build/test output generated in the current session.
3. This knowledge base.
4. Root `README.md` and `BRANDING.md`.
5. Historical QA records and reference evidence.

Correct stale documentation in the same change. Never treat `dist/`, screenshots, or generated JSON as editable source.

## Canonical edit points

| Concern | Canonical file |
| --- | --- |
| Company identity, contact, social links, SEO | `src/config/brand.ts` |
| All normal website copy and story data | `src/content/site-content.ts` |
| Colors, fonts, spacing and layer tokens | `src/styles/tokens.css` |
| Scroll distances and timeline landmarks | `src/animation/journey.ts` |
| Scroll choreography and accessibility state | `src/animation/useJourney.ts` |
| Particle behavior | `src/animation/particle-scene.ts` |
| Public media and brand files | `public/brand/`, `public/media/` |

## Current unresolved launch inputs

- Purchase and confirm the domain, then set `brand.seo.siteUrl` to the final HTTPS origin.
- Supply final logo, motif, social preview, and real company media if the temporary originals are not final.
- Supply real LinkedIn and Instagram URLs; blank values are intentionally omitted.
- Review editable copy before launch. There are no invented clients, metrics, results, or testimonials.
- Test on physical iOS/Android devices and at least Safari/Firefox before a public launch.

## Keeping this context trustworthy

Every material change should update the relevant note and append a short item to [[09-CHANGELOG]]. Keep the start page concise. Put stable rationale in the decision note, implementation behavior in subsystem notes, and temporary status only in the handoff note. Avoid pasting full source files into documentation.
