# Production verification

Verified 16 September 2026 against the Vite production preview in Chromium. Reference measurements and screenshots were collected separately on 15 September; see [reference-analysis.md](../reference-analysis.md).

## Results

- `npm install`: succeeded; zero vulnerabilities reported at installation.
- `npm run lint`: passed ESLint and strict TypeScript checks.
- `npm run build`: passed; production assets emitted to `dist/`.
- Eight viewport runs: no browser console errors, failed requests, or horizontal overflow in the recorded states.
- Email copying returned `theautobots.ai@gmail.com` at every size. Escape closed the menu, menu links reached the systems scene, and the identity link returned to scroll position zero.
- All 17 built files returned HTTP 200 with response hashes identical to their files on disk. This checks fonts, images, SVGs, favicon, sharing PNG, HTML, JavaScript, CSS, license notices and robots.txt; it also detects HTML fallback responses masquerading as successful assets.
- Twelve consecutive Tab presses remained inside the open menu. Hidden scene content is inert, and section navigation transfers focus after its transition.
- Pausing ambient motion produced identical canvas screenshots 600 ms apart. Reduced motion produced a static canvas and a native-flow document with all four sections visible, non-inert and readable; all four story images loaded.
- A rendered long-name probe at 1280 px fitted to 1196.7 px, with a 41.7 px left inset and no clipping.

| Viewport | Input model | Hero, traversal, words, three panels, contact, menu |
| --- | --- | --- |
| 1920 × 1080 | Mouse | Passed |
| 1440 × 900 | Mouse | Passed |
| 1280 × 800 | Mouse | Passed |
| 1024 × 768 | Mouse | Passed |
| 768 × 1024 | Touch | Passed |
| 430 × 932 | Touch | Passed |
| 390 × 844 | Touch | Passed |
| 375 × 812 | Touch | Passed |

Full records: [production-results.json](production-results.json), [details-results.json](details-results.json). State screenshots are in [screenshots/](screenshots/). The `implementation-desktop/mobile` and `reference-desktop/mobile` PNG pairs are convenient opening-state comparisons; the numbered scene captures are more useful than a full-page screenshot for this fixed-layer experience.

## Visual comparison and corrections

Reference and implementation screenshots were viewed at equivalent settled scene positions, not compared from memory. The name, copy and original art intentionally differ, so a raw whole-image pixel-difference score would misleadingly penalize the required asset replacements. Comparison used scene geometry, visual weight, typography proportions and line wrapping instead.

| Composition | Reference measurement | Implemented relationship |
| --- | --- | --- |
| Hero title | About 93.5% of viewport width | Actual font metrics fit the new name to 93.5% width |
| Desktop header | 48 px horizontal inset; centered links | Same independent left/center/right anchors |
| Desktop first panel | Left 7%, width 40%, vertically centered | At 1440 px: x 100.8, width 576 px |
| Alternation | One left, one right, one left | Same single-panel cadence and opposite-side motif |
| Mobile first panel | 85% width, lower half, caption below | At 390 px: x 29.25, width 331.5 px; image near y 481 px versus reference near 487 px |
| Tablet | Alternating layout retained at 768 px | Retained; not prematurely stacked |
| Contact | Centered invitation, strong email, quiet footer | Same hierarchy with actual supplied contact |

The first comparison led to increasing motif scale and particle weight, shortening the first mobile description to two lines, restoring lighter caption weight, and removing the third story's unnecessary eyebrow row. The menu surface was made fully opaque, and its close control moved inside the focus-managed dialog. The latter is an accessibility refinement, not a reference feature.

## Motion verification

Representative 0%, 25%, 50%, 75% and 100% states were captured for hero departure and the first panel entrance. The reference analysis separately records its measured opacity/translation progression. These are sampled settled scroll states, not claims that the original source used identical easing code.

| Progress | Hero opacity over 0–0.3H | First panel opacity | First panel Y translation |
| --- | ---: | ---: | ---: |
| 0% | 1 | 0 | 60 px |
| 25% | 0.842 | 0.767 | 14.0 px |
| 50% | 0.500 | 0.961 | 2.3 px |
| 75% | 0.154 | 0.997 | 0.2 px |
| 100% | 0 | 1 | 0 px |

The panel does most of its travel early and settles slowly. The hero dissolves while maintaining its viewport position; the particle scene carries the transition forward. Word timelines combine translation, blur and stagger rather than repeating isolated fades. Media crossfades and ambient rotation stop when paused or reduced motion is requested.

A 120-frame desktop diagnostic initially measured a mean interval of 16.67 ms and p95 of 16.8 ms. The final rerun measured 33.33 ms and p95 of 33.5 ms; both recorded zero intervals over 50 ms. This variability is a local headless-browser observation, not a real-device frame-rate guarantee or a Lighthouse/Core Web Vitals audit. Smoothness should also be reviewed on physical devices before launch.

The final post-adjustment desktop/mobile rerun, lint check, asset hash checks, focus trap, pause/reduced-motion checks and screenshot alias exports all passed. The production social PNG also matches the public source PNG byte-for-byte.

## Deliberate differences and launch prerequisites

- The original linked-rail particle silhouette replaces the reference's identifiable star. It has a different outline, dimensional structure and point distribution; composition and interaction role remain comparable.
- Original geometric studies replace portfolio imagery. No client work, outcomes, logos or statistics are invented.
- No award badge, reference copy, proprietary artwork or source implementation is included in production.
- Fonts are independently acquired, self-hosted OFL Manrope and Instrument Serif, with license notices.
- A keyboard-accessible mobile menu, ambient-motion pause and native-flow reduced-motion experience are deliberate accessibility additions.
- Replace temporary logo, motif, concept media and social artwork when final brand assets exist. Review editable business copy. Social destinations remain omitted until supplied.
- At the time of the original local QA, no site was publicly deployed. The later GitHub Pages deployment uses its confirmed public origin for canonical, Open Graph URL, robots.txt and sitemap. The planned `theautobots.ai` custom domain remains unpurchased.

Limitations: QA used Chromium emulation, not physical iOS/Android devices or Safari/Firefox. It is not a complete assistive-technology or WCAG conformance audit. The independently generated particle field is intentionally not pixel-identical to the reference.

## Re-run

Start `npm run preview -- --port 4173` after a production build. Set `PLAYWRIGHT_CORE_PATH` to an installed Playwright Core module and `CHROMIUM_PATH` to its Chromium executable, then run:

```bash
node docs/qa/verify-site.cjs
node docs/qa/verify-details.cjs
```

Use `--quick` on the first script for the 1440/390 pair. The scripts write evidence under this directory. The first also renders the original social-preview SVG into its PNG; rebuild after changing that artwork. No QA dependency or inspection screenshot is bundled into the website.

## Public deployment verification

GitHub Pages deployment run `35084959426` completed successfully on 16 September 2026. The public origin is `https://techaiteam1.github.io/theautobots/`.

- Homepage, JavaScript, CSS, favicon, social image, representative media, robots.txt, and sitemap returned HTTP 200 over HTTPS.
- The deployed title and canonical URL matched configuration.
- Desktop 1440x900 and mobile 390x844 Chromium smoke tests reported no browser, console, or failed-request errors.
- Both deployed viewports completed the intro, rendered the Canvas scene, opened the menu, and had no horizontal overflow.
- The Pages workflow runs on every push to `main` and can also be started manually.
