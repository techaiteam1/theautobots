---
title: Build QA and Operations
type: operations-context
status: current
last_verified: 2026-09-16
---

# Build, QA, and operations

## Local commands

Requires a Node version supported by Vite 7; Node 22.12+ is the documented target.

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview -- --port 4173
```

Development defaults to `127.0.0.1:5173`; the documented preview is `127.0.0.1:4173`. Deploy only `dist/` to a static host.

## Required change verification

Every code/config/content change:

1. Run `npm run lint` (ESLint and strict TypeScript).
2. Run `npm run build`.
3. Open the production preview and check the affected state.

For layout, motion, navigation, asset, or responsive changes, also run the browser QA scripts described in [the verification report](../qa/verification.md). The scripts use an existing Playwright Core and Chromium selected through `PLAYWRIGHT_CORE_PATH` and `CHROMIUM_PATH`; they are not runtime dependencies.

```bash
node docs/qa/verify-site.cjs
node docs/qa/verify-details.cjs
```

Use `--quick` with `verify-site.cjs` for only 1440x900 and 390x844 during iteration. Run the full eight-size matrix before release.

## Last verified result

- Dependency installation succeeded with zero vulnerabilities reported at that time.
- ESLint and strict TypeScript passed.
- Vite production build passed.
- Eight requested viewports passed with no recorded browser errors or horizontal overflow.
- All 17 generated production files returned HTTP 200 with hashes matching disk.
- Menu Escape, focus trap, destination navigation, identity return-home, email copy, pause, reduced motion, and story image loading passed.
- Named reference/implementation desktop/mobile screenshots exist under `docs/qa/screenshots/`.
- A local headless motion diagnostic varied between about 16.7 ms and 33.3 ms frame intervals, with no interval over 50 ms. This is not a physical-device guarantee.
- The GitHub Pages homepage and critical assets returned HTTP 200, and deployed desktop/mobile Chromium smoke tests passed without browser errors or overflow.

## Asset reliability

- All configured public paths must resolve under Vite base paths.
- Do not reference developer-machine paths.
- Verify image, font, SVG, favicon, and social-preview requests in production preview.
- If editing `social-preview.svg`, render/export a matching `social-preview.png`, then rebuild.
- `font-licenses.txt` must continue to ship when the bundled OFL fonts are present.

## Deployment checklist

Before launch:

- Confirm final domain ownership and set `brand.seo.siteUrl`.
- Confirm public contact and social links.
- Replace/approve all temporary brand and concept assets.
- Run lint, build, complete viewport QA, and physical-device smoke tests.
- Verify canonical, Open Graph image, robots.txt, sitemap, favicon, and every network request at the deployed HTTPS URL.
- Confirm static hosting serves `index.html` and honors the chosen base path.

## Evidence policy

`docs/inspection/evidence/` is reference-only research and must not ship as production media. `docs/qa/` is implementation verification. JSON results are ignored by Git and may be regenerated; the written verification report records the durable conclusions.
