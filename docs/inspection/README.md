# Reference inspection evidence

These files support [the technical specification](../reference-analysis.md). They are analysis tools and observations, not the source of The Auto Bots website.

## Evidence families

- `*-initial.json`: four viewport measurements with actual loading-capture timestamps.
- `*-load-*.png`: initial/loading states; use the JSON timestamps rather than assuming filenames are exact capture times.
- `*-scroll.json` and `*-scroll-*.png`: broad half-viewport scroll samples. These may include short settling transitions.
- `*-extended.json`: later tablet/phone sections, through the final contact screen, with longer settling periods.
- `desktop-interactions.json`: settled navigation/hover/contact states and clipboard-match verification.
- `*-trace.json`: frame-by-frame selected computed-state measurements during interactions. These do not contain source bundles.
- `breakpoints.json`: width/input probes separating CSS layout changes from touch pacing.
- `motion-detail.json`: finer settled hero-exit and project-entry/exit samples.
- `cosmetics.json`: targeted computed-property observations, with resource references redacted.
- `slideshow.json`: timed second-project image opacity observations; the nominal sample labels exclude screenshot overhead.
- `reduced-fresh.json`, `reduced-hero*.png`, `keyboard.json`: limited accessibility/input observations.

The preliminary `reduced-motion.json` / `desktop-reduced-motion.png` capture retained the previous scroll position on reload. Use the fresh reduced-motion evidence when evaluating the opening scene.

Screenshots intentionally show the rendered reference for private analysis. They contain the reference's protected material and must not be imported into a production website, presented as original work, or treated as licensed replacement media. There are no copied font files, project image files, source stylesheets, or JavaScript bundles here.

## Re-running the inspection

The scripts use an already installed Playwright Core package and Chromium. Set `PLAYWRIGHT_CORE_PATH` to that package directory and `CHROMIUM_PATH` to the executable on your own machine. No dependency was installed into this workspace.

From `C:\Me` (or the equivalent project root on another machine):

```text
node docs/inspection/inspect-reference.cjs
node docs/inspection/inspect-scroll.cjs
node docs/inspection/inspect-interactions.cjs
node docs/inspection/inspect-details.cjs
node docs/inspection/inspect-final-checks.cjs
node docs/inspection/sanitize-evidence.cjs
```

Run browser scripts sequentially to reduce timing distortion from CPU/GPU contention. Some original captures overlapped independent browser passes, so wall-clock animation observations are approximate. Stable geometry, declared computed transition durations, and settled progress samples provide the more reproducible evidence.

The inspection never reads response bodies, extracts stylesheet rules, fetches bundles for analysis, or reads SVG path data. The sanitizer removes resource URLs/data if they appear in computed-property values. The local contact-copy test uses an isolated browser context's clipboard; it does not submit a form or send a message.

`summarize.cjs` provides compact views of the recorded data. Supported arguments: `layout`, `motion`, `timing`, `breakpoints`, `detail`, `interactions`, and `trace`.
