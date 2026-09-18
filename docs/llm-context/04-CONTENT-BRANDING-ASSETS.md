---
title: Content Branding and Assets
type: operations-context
status: current
last_verified: 2026-09-16
---

# Content, branding, and assets

## Single sources of truth

- `src/config/brand.ts`: company name, tagline, logo mode/path, motif path, email, booking URL, social URLs, and SEO.
- `src/content/site-content.ts`: all visible business copy, navigation labels, capabilities, system stories, workflow bridge, operating-controls copy, fit copy, and contact copy.
- `src/styles/tokens.css`: colors, typography roles, spacing, z-index, and easing variables.

Normal rebranding must not require component or animation edits. The complete operator instructions are in root [BRANDING.md](../../BRANDING.md).

## Current brand state

```text
Company: The Auto Bots
Tagline: Transform - Operate - Evolve
Email: theautobots.ai@gmail.com
Booking URL: unset and omitted
LinkedIn: unset and omitted
Instagram: unset and omitted
Planned domain: theautobots.ai, unpurchased
Header identity: text mode
```

`logoMode: 'text'` intentionally displays the quiet text identity. Replace `public/brand/logo.svg` and change the mode to `'image'` when final logo artwork is ready.

## Story schema

Each system story has:

```ts
interface SystemStory {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  visual?: 'transformation' | 'agentic-systems' | 'managed-operations';
  media?: string;
  alternateMedia?: string;
  alt: string;
  href?: string;
}
```

`id` must be unique. Empty eyebrow is supported. Omit `href` for a display-only story. Hash destinations use scene navigation; real external destinations use normal browser behavior. Alternate media should match the base media dimensions because it crossfades in place.

## Asset inventory and status

| Asset | Current status | Replacement guidance |
| --- | --- | --- |
| `public/brand/logo.svg` | Original temporary wordmark | Wide transparent SVG; header slot is about 142 x 25 px |
| `public/brand/logo.jpeg` | Supplied Auto Bots logo; current particle source | Replace with an approved square logo image |
| `public/brand/favicon.svg` | Original placeholder | Replace separately from logo |
| `public/brand/social-preview.*` | Original placeholder, PNG is live metadata asset | Final PNG should remain 1200 x 630 |
| `src/components/SystemVisual.tsx` | Original animated service diagrams | Token-colored, GSAP-controlled, and replaceable per content item |
| Self-hosted font files | OFL Manrope and Instrument Serif | Keep licenses for any replacement fonts |

No reference-site image, logo, icon, illustration, font file, source code, or copy is licensed for production use. The magenta/violet theme and derived brand artwork come from the supplied Auto Bots logo.

## Media rules

- Choose a built-in animated diagram through an item's `visual` field, or place custom public media under `public/media/` and configure a `/media/name.ext` path instead.
- Use `assetUrl()` when a component consumes a configurable public path.
- Prefer correctly sized SVG, WebP, or AVIF. Current landscape targets are roughly 1.875:1 for first/third panels and 2.16:1 for the second.
- Do not use random stock imagery just to fill a panel.
- Alt text describes what the image communicates, not its filename or visual decoration.
- Video requires a designed control and accessibility treatment; do not substitute a video extension into the image renderer.

## Content discipline

- Keep floating phrases short.
- Keep system descriptions near one or two sentences to preserve timing and mobile layout.
- Substantial editorial content needs an intentional new layout, not smaller type.
- Keep the long-term positioning sequence intact unless company strategy changes.
- Blank social URLs must remain omitted rather than becoming `#` links.
