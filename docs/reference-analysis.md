# Reference analysis for The Auto Bots

Reference: [milancompain.com](https://milancompain.com/). Inspected on 15 September 2026.

This is the rendered-design and interaction specification completed before implementation. No application had been scaffolded during this analysis phase. The reference's source files, bundles, stylesheet rules, font files, SVG paths, and media files were not extracted or reused. Browser loading of its resources was solely for rendering and interaction inspection.

## Inspection method and confidence

The live site was inspected in headless Chromium through Playwright at all four requested sizes. Measurements use CSS pixels and a device pixel ratio of 1. The tablet and phone contexts emulate touch; the two larger contexts use a mouse. Additional resize probes distinguish width-dependent layout from input-dependent timing.

| Viewport | Input | Measured document height | Document height / viewport height |
| --- | --- | ---: | ---: |
| 1440 × 900 | Mouse | 14,220 px | 15.80 |
| 1280 × 800 | Mouse | 12,640 px | 15.80 |
| 768 × 1024 | Touch | approximately 25,928 px | 25.32 |
| 390 × 844 | Touch | 21,370 px | 25.32 |

Inspection included fresh loading states, the complete scroll journey at every size, navigation clicks, return to top, a real wheel event, hover entry/exit, project media, language switching, local email-copy feedback, mobile taps, keyboard focus, and a reduced-motion probe. External project/social destinations were not audited. Saved computed-property records were mechanically sanitized to omit resource URLs and embedded asset payloads.

Evidence lives in [inspection/evidence](inspection/evidence/). The `.cjs` files in [inspection](inspection/) are independently authored analysis utilities; they do not implement the new site. JSON records contain selected rendered geometry and computed properties, not page source or copied marketing text. Screenshots contain reference artwork for comparison only and must not become production assets.

Notation:

- **Measured:** obtained from rendered element geometry, computed styles, or recorded browser events.
- **Observed:** visible in captured states or interaction tests.
- **Inferred:** a compact model consistent with measurements, not a claim about the author's source code.
- **Future recipe:** a proposed independent implementation technique, not something verified in the reference's internals.

Use `H` for viewport height and `W` for viewport width. Coordinates are viewport-relative unless explicitly called document coordinates. A scroll position of `7H` means 6,300 px at 1440 × 900.

Full-page screenshots alone are misleading here: much of the experience is fixed to the viewport. Compare the individual scroll-state screenshots. Broad scroll captures allowed about 450 ms to settle; files ending in `settled` used approximately 1.8–3 seconds. Particle orientation also changes with time. Loading screenshot filenames indicate requested capture offsets; actual elapsed times are recorded in the corresponding `initial.json` files.

## 1. Global Visual System

### The governing composition

The reference is a continuous dark scene with a persistent animated focal object. The opening name, floating words, project panels, and contact information take turns occupying that scene. Its architecture is closer to a sequence of staged compositions than a stack of editorial sections.

The progression is:

1. A typographic loading overlay.
2. An enormous name crossing a narrow vertical particle formation.
3. A sustained forward traversal through that formation.
4. A central rotating particle motif with short words and tool marks appearing around it.
5. Three project displays, alternating left, right, left; the motif balances them on the opposite side.
6. A return toward the center, followed by dispersal into a particle field.
7. A centered contact composition and small footer.

### Palette and surface behavior

Measured reference colors, recorded as descriptive targets rather than a stylesheet to transplant:

| Role | Rendered value / treatment |
| --- | --- |
| Main dark surface / loader | near black, RGB 10 / 10 / 10 |
| Primary light text | RGB 245 / 245 / 245 |
| Secondary text | RGB 197 / 197 / 197 |
| Muted controls | approximately RGB 138 / 138 / 138 |
| Active navigation dot | mint, RGB 46 / 230 / 160 |
| Hero name base | white at approximately 55% alpha, with a separate brighter/glowing treatment |
| Media | native project colors inside bounded rectangular frames |

The background does not alternate between unrelated section colors. Accent color has specific jobs: the motif, active navigation, frame corners, and selected interaction feedback. White project imagery creates the strongest local contrast during the work sequence. A subtle full-screen grain layer and differently sized, softly blurred particles add depth without card-like surfaces.

### Typography

Computed font-family names are **Manrope** for the sans-serif and **Instrument Serif** for the contrasting serif. These names identify what the browser rendered; no font binaries were copied and no distribution-license audit was performed. A later build must obtain appropriately licensed fonts independently.

The sans-serif has broad, open forms and a high apparent x-height. Its heavy uppercase name has substantial width and visual density. The italic serif is narrower, higher contrast, and lighter in texture. The design depends on that difference in width, stroke contrast, and posture, not merely on choosing two font families.

| Role | 1440 × 900 | 1280 × 800 | 768 × 1024 | 390 × 844 |
| --- | ---: | ---: | ---: | ---: |
| Hero name | 158.4 px | 140.8 px | 84.48 px | 42.9 px |
| Hero descriptor | 13.12 px | 13.12 px | 10.75 px | 9.92 px |
| Hero italic line | 22.4 px | 22.4 px | 18.43 px | 17.92 px |
| Project-section heading | 54.72 px serif | 54.72 px serif | 13.6 px sans | 13.6 px sans |
| Project title | 34.56 px | 30.72 px | 28 px | 30.4 px |
| Project description | 14.4 px | 14.4 px | 14.4 px | 16 px |
| Contact invitation | 43.68 px | 43.68 px | 27.65 px | 22.4 px |
| Contact address | 68.32 px | 68.32 px | 41.47 px | 22.4 px |

Measured proportions:

- Hero name: weight 800; font size matches `11% of W` at all four sizes; line-height `0.95`; tracking `0.04em`. It stays on one line. Its reference wording occupies approximately 93.5% of W.
- Small header identity: 11.52 px, weight 500, uppercase, tracking `0.32em`.
- Central navigation: 14.4 px, weight 400; ordinary mixed-case treatment and normal tracking.
- Hero descriptor: uppercase; tracking approximately `0.42em` on larger screens and `0.32em` on the phone.
- Project titles: serif, weight 400, line-height `1.1`; descriptions use sans weight 300 and line-height `1.5` on desktop, `1.6` on phone.
- Desktop floating words: large serif about 68.32 px with line-height `1.1`; smaller sans about 34.56 px, weight 500, line-height `1.3`.
- Phone floating words: serif 28 px / 30.8 px; sans 20 px / 26 px.
- Contact address: weight 700, tracking `-0.01em`.
- Social/footer microtype: 10.56 px, tracking about `0.28em`.

### Spacing and page rhythm

There is no universal centered content container. Different jobs have different anchors:

- Header inset: 48 px horizontally and 28 px vertically on desktop/tablet; 32 px and 24 px on phone.
- Hero: centered on the viewport; its name reaches much closer to the side edges than the header identity.
- Desktop project panel: width `0.40W`, outer inset `0.07W`; the right panel starts at `0.53W`.
- Phone project panel: width approximately `0.85W`, centered, with a measured 560 px cap in intermediate-width probes.
- Small text spacing uses restrained increments: 8, 16, 20, 24, and 32 px recur in caption and contact geometry.
- Long stretches of scrolling supply time for the scene to transform. Treat these as motion durations expressed in distance, not accidental blank margins.

### Why the experience feels premium

1. **Attention is rationed.** One large name, one principal motif, or one project dominates each state; there is little competition between equal-weight elements.
2. **Scale contrast is extreme but controlled.** At 1440 px the name is roughly eleven times the navigation font size, while its muted tone allows the brighter motif to remain visible.
3. **Continuity makes transitions legible.** The same motif survives between stages, changes scale and position, and provides a point of reference while other content changes.
4. **Negative space is directional.** Project panels leave the opposite side for the motif. About-stage words occupy the perimeter and preserve a central volume.
5. **The typography alternates textures.** Broad heavy sans, light italic serif, and widely tracked microtype have distinct roles; they are not interchangeable heading sizes.
6. **Motion has different jobs.** Camera-like traversal, rotational drift, text focus changes, short panel entrances, and small cursor attraction each communicate something different.
7. **Departure is choreographed.** Panels move out and become unavailable before the next panel takes over; the object remains present during the gaps.
8. **Detail is concentrated at interaction points.** A tiny active dot, short frame corners, and a responsive cursor add precision without decorating every surface.

## 2. Layout Architecture

### Layering and positioning

Measured rendered structure has a fixed viewport wrapper containing a vertically translated content plane. Separate fixed layers host the scene, hero type, floating words, and project stage. Normal-flow spacer regions supply the document's scroll distance.

| Layer / role | Position behavior | Measured stacking level |
| --- | --- | ---: |
| Particle canvas host and grain | fixed, viewport-sized | 2 |
| Translated content viewport | fixed wrapper, overflow hidden | 3 |
| Hero text and floating-word layer | fixed to viewport | 3 |
| Project presentation stage | fixed, viewport-sized | 5 |
| Header and active dot | fixed | 60 |
| Loading overlay | fixed, viewport-sized | 9999 |
| Custom cursor | fixed, ignores pointer events | 10000 |

These are observed relationships, not required future z-index constants. Preserve the ordering. In particular, a transform on the scrolling content must not accidentally make the fixed navigation or stage move with it.

### Navigation

**Desktop and laptop:** transparent header, 81 px tall. Identity sits at x=48, y=33. Three central section links form a 225 px group centered on the viewport, with 32 px gaps. Two compact language buttons sit at the right edge, separated visually by a slash. There is no filled header bar or large CTA.

**Behavior:** section links move the scroll destination; rendered content catches up smoothly. The active link turns mint, accompanied by a 4 px dot below it. Observed desktop destinations were approximately `2.98H` for the about scene, `7.70H` for the first project plateau, and `14.80H` for contact. These are scene positions, not simply every element's document top. The identity returns to the beginning.

**Mobile:** header height 73 px. Only identity and language controls remain. No hamburger, drawer, or alternate section menu appeared at 390 px. Touching identity returns to the top; language switching updates the visible content in place. See the deliberate accessibility considerations in section 4 before reproducing the absence of mobile section links.

### Hero

Measured settled name box:

| Viewport | x | y | width | height |
| --- | ---: | ---: | ---: | ---: |
| 1440 × 900 | 47 | 331 | 1347 | 150.5 |
| 1280 × 800 | 42 | 290 | 1197 | 133.8 |
| 768 × 1024 | 25 | 433 | 719 | 80.3 |
| 390 × 844 | 13 | 356 | 365 | 40.8 |

**Desktop composition:** name, small descriptor, italic line. Descriptor begins at approximately x=555, y=506, width=331; italic line at x=664, y=540. Their measured layout spacing is 24 px below the name box and 16 px below the descriptor. The combined group is centered vertically. A small chevron is centered approximately 45 px above the bottom edge.

**Phone:** the descriptor wraps into two compact centered lines, box about 129 × 28 px at x=131, y=420. The italic line begins around y=464. This wrapping contributes to the group's vertical centering; simply shrinking every desktop coordinate would not match it.

**Media relationship:** a narrow, tall particle formation runs behind and through the title area. Its approximate visible bounds at desktop are x=600–840 and y=155–740; at phone x=85–305 and y=150–695. These are screenshot estimates of moving particles, not stable DOM rectangles. The central branded object is small during the hero, then grows dramatically in the traversal.

The title uses layered base/glow rendering. The ordinary-flow counterparts are invisible positioning references while the visible text remains fixed. The exact duplication technique is not required in a new implementation; the essential result is fixed, aligned typography with controlled luminance over the scene.

### Scroll distance architecture

Measured normal-flow regions, normalized by viewport height:

| Region | Mouse duration | Touch duration |
| --- | ---: | ---: |
| Hero | 1.00H | 1.00H |
| Traversal | 2.00H | 3.60H |
| Reveal bridge | 0.10H | 0.10H |
| Floating-word/about region | 3.30H | 5.94H |
| Breathing space after about | 0.50H | 0.90H |
| Project heading region | 0.40H | 0.40H |
| Each of three project regions | 1.80H | 3.24H |
| Project tail | 0.70H | 1.26H |
| Outro | 1.40H | 1.40H |
| Contact | 1.00H | 1.00H |

The visible animation can begin before its corresponding spacer reaches the top. At desktop, the first project spacer starts at `7.30H`, but its panel begins appearing around `6.8H`. Do not equate spacer boundaries with animation start times.

### Floating-word/about sequence

- A central particle object rotates while successive short words and tool marks appear around it.
- There are 18 measured floating elements, combining six large serif words, smaller sans words, and tool marks. They do not all appear simultaneously.
- Desktop positioning uses different peripheral anchors: large serif words often appear around the lower left/right, while smaller words and marks occupy upper or side positions.
- At 1440 px, examples of anchor centers are roughly 17% or 81% of W for large lower words; small words range around 13–86% of W. Vertical placement varies by item rather than following a uniform row.
- Mobile explicitly relocates these anchors toward upper and lower peripheral bands. It preserves room for the central object rather than stacking all words into a list.
- This section has no conventional explanatory paragraph, feature grid, or visible section box.

### Project presentation

**Desktop plateau:** panel one at x≈101, y≈297, size≈576 × 306; panel two at x≈763, y≈316, size≈576 × 267. Different media aspect ratios are preserved. Panels are centered vertically; their widths and lateral anchors remain consistent.

The object moves to the opposite side: approximately three-quarter width with a left panel and one-quarter width with a right panel. Its orientation and silhouette continue changing while the panel holds.

**Media frame:** square corners, short mint corner brackets, restrained boundary treatment. A dark lower overlay makes text readable over the imagery. Caption inset is approximately 20 px. Caption hierarchy is a small contextual label when applicable, a serif title, then one or two lines of light sans description. The first two observed panels are non-link displays; the third is an external link. Do not assume every panel has an identical click action.

**Tablet:** 768 px retains alternating sides and panels about 307 px wide, with overlaid captions. The separate section heading changes to small, widely tracked sans near the bottom center of the viewport.

**Phone:** all project panels use the same centered horizontal anchor. The motif occupies the upper part of the viewport and the project occupies the lower part. In settled captures, media begins around y=482–488. Width is 331.5 px with 29.25 px side margins. Captions are in normal flow below the image; project titles are 30.4 px and descriptions 16 px / 25.6 px. The independent scroll sequence remains; it does not become a permanently visible card list.

### Outro and contact

After the last panel leaves, the motif moves back toward the center and gives way to a dispersed particle field. Contact text is then the focal point.

Desktop contact is one viewport tall. Its settled content group is approximately 778 × 242 px, centered at x≈331, y≈329 within that viewport. The serif invitation is followed by a 32 px gap before the large bold address. A small copy hint follows, then a 24 px gap to widely tracked social links. The footer sits approximately 24 px above the bottom edge.

Phone contact preserves the centered composition but uses a much smaller address. The footer remains a single very wide microtype line in the observed 390 px reference, with little edge clearance.

Clicking the address copied its displayed value into the browser context's clipboard and produced temporary feedback. The copy was verified without sending a message or opening an email client.

## 3. Motion System

### Three independent clocks

1. **Elapsed time:** loading, hero entrance, cursor settling, contact entrance, and media changes.
2. **Scroll position:** scene traversal, hero departure, floating-word progression, panel appearance/hold/departure, and outro.
3. **Continuous idle motion:** particle drift and object rotation continue at a stationary scroll position.

This distinction is essential. A single collection of timed entrance fades would not reproduce the experience. Conversely, making every motion strictly scrubbed would remove its continuous life.

### Loading and first entrance

**Measured loader structure:** opaque full-screen dark surface; small identity at 48/48 px; centered italic word around 68.32 px; large italic three-digit counter near bottom right, 136 px font/line-height; bottom progress track 3 px tall. Progress fill scales horizontally from the left. Word transitions declare approximately 400 ms for opacity and movement, with an initial 20 px downward offset. The completion overlay fades over 600 ms.

**Recorded sequence:** in one fresh desktop DOM trace, the loader started fading at about 2.86 seconds after trace start. Hero name entrance began about 50 ms later, descriptor about 100 ms after the name, italic line another 100 ms later. Each text entrance lasted approximately 900 ms, moving from about 16 px below its final position while opacity rose to 1. The overlay departure and hero entrance overlap.

Those timestamps are runtime observations, not guaranteed load times or evidence that the counter represents actual resource progress. Network conditions, fonts, and browser load affect when the sequence becomes visible.

**Stagger philosophy:** ordered groups separated by about 100 ms, with heavily overlapping durations. The recorded title is not split into a conspicuous letter-by-letter entrance. Preserve the compositional reveal, not an invented alphabet animation.

### Easing vocabulary

Computed transitions repeatedly reported the same strong deceleration curve: approximately cubic-bezier `(0.22, 1, 0.36, 1)`. This describes a quick initial change and a long soft landing. No bouncing or elastic overshoot was observed in the major type and panel transitions.

| Motion | Observed / measured characteristic |
| --- | --- |
| Loader word | about 0.4 s; short upward settle with opacity |
| Loader overlay | 0.6 s fade |
| Hero entrance | about 0.9 s per text group; about 0.1 s group stagger |
| Navigation indicator | computed 0.35 s and 0.25 s transitions |
| Cursor appearance/style | roughly 0.2–0.3 s declared transitions, plus following lag |
| Contact entrance | 1 s for opacity, translation, and blur |
| Scroll catch-up after a discrete input | approximately 0.9–1.2 s to settle within 1 px in recorded probes |

These are different controls; do not assign one duration to the whole site. For future GSAP work, use independently authored timelines and a comparable decelerating ease. Actual use of GSAP or any particular plugin by the reference was not established from source inspection.

### Scroll smoothing

The browser's scroll position changes before the translated content plane reaches it. In a 600 px wheel probe, the content had moved approximately 161 px at 108 ms, 362 px at 207 ms, 473 px at 308 ms, 553 px at 456 ms, and 599 px at 907 ms. It settled without a visible snap or overshoot.

Navigation uses the same sense of catching up. Large navigation moves settled in roughly a second. This is continuous easing toward a destination, not section snapping. The fixed scene and staged overlays must stay synchronized with the displayed scroll progress.

### Hero exit and traversal

After entrance, the hero name stays fixed in place while its opacity falls over the first `0.30H` of scrolling. Fine-grained settled measurements:

| Scroll / H | 0 | 0.05 | 0.10 | 0.15 | 0.20 | 0.25 | 0.30 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Name opacity | 1 | .926 | .741 | .500 | .259 | .074 | 0 |

Its transform remained unchanged during this departure. The measured curve is consistent with a smoothstep-like fade, distinct from the stronger ease-out panel entrance. The eye reads the scene as moving forward because the particles and motif enlarge, not because the title flies away.

Across approximately the next two desktop viewport heights, the narrow particle formation grows beyond the viewport and the motif becomes dominant. This apparent camera/scene scale is observed visually; no camera matrix, particle count, shader, or exact 3D transform was extracted.

### Floating words: blur, focus, and overlap

- Off-stage state: opacity 0, commonly blur near 8 px, with a small vertical displacement.
- Readable state: opacity 1, no blur, near its assigned peripheral anchor.
- Exit: opacity falls, blur rises again, and the word continues moving upward.
- Large word samples show roughly a 50–60 px overall vertical span between obscured entrance and obscured departure, including small continuous drift. Smaller labels/marks move less.
- During desktop mid-sequence captures, typically two or three items are clear while another begins or finishes dissolving. This creates a rolling overlap rather than simultaneous grid reveals.
- The exact per-item start offsets were not recovered. The half-viewport samples establish ordering, overlap, placement, and blur/opacity behavior, not a millisecond stagger for scroll-driven words.

### Project timeline

Each panel has separate placement, scroll-animation, and hover-offset layers. The measured scroll wrapper changes translation and opacity; the magnetic hover wrapper adds its own small translation.

**Entrance:** y=+60 px, opacity=0, hidden/non-interactive → y=0, opacity=1, visible. No panel scale change was measured. The first entrance spans approximately `6.8H–7.3H`.

Five representative measured samples across the leading 0.4H of that entrance:

| Sample | 0% | 25% | 50% | 75% | 100% |
| --- | ---: | ---: | ---: | ---: | ---: |
| Scroll / H | 6.8 | 6.9 | 7.0 | 7.1 | 7.2 |
| Opacity | 0 | .598 | .868 | .969 | .996 |
| Translation y | +60 px | +24.1 px | +7.9 px | +1.9 px | +0.2 px |

Here 100% means the end of the sampled interval; the small remaining settle completes by roughly 7.3H. The early travel and soft final approach matter more than copying an arbitrary wall-clock duration for a scroll-controlled effect.

**Hold:** first panel is fully readable through roughly `7.3H–8.0H`. Subsequent panels repeat the logic with approximately `1.8H` between their corresponding stages.

**Departure:** y=0 → −30 px, opacity=1 → 0. First-panel samples: at `8.1H`, opacity .403/y −17.9 px; `8.2H`, .132/−26 px; `8.3H`, .031/−29.1 px; fully absent by about `8.5H`. Hidden panels lose interaction eligibility.

**Heading:** the project-stage heading has a distinct blur/opacity reveal and leaves while the first panel arrives. It is not a permanent title above all panels.

**Whitespace between panels:** retain the short scene-only interval. The motif changes sides while no panel demands attention.

**Media crossfade:** the second project contains two superimposed images. An idle observation recorded one fading out as the other faded in without hover; their computed opacity transition is 1.5 seconds. At one sampled moment their opacities were approximately .091/.909, then .703/.297 at the next. The complete repeat interval was not established; do not mistake this for a hover-only effect or a user-operated carousel.

### Clipping, masks, and transform origins

Measured project frames use overflow clipping to contain media. The scrolling viewport also clips its translated content. Main panel reveals use opacity and translation, with `clip-path: none` in the sampled states; no wipe mask is needed to reproduce those entrances. Hero text also reported no CSS mask in the final targeted probe. Its brighter area should be evaluated as layered luminance over the animated scene, not assumed to be a particular CSS-mask implementation.

Text and panel transform origins are their box centers in the recorded states. Translation does not make that origin visually significant, but cursor scaling does: its origin is the ring center. The progress-fill growth reads from the left edge. The particle object's apparent 3D origin and camera transform remain visual estimates.

### Hover and cursor

- Desktop cursor: 28 px outline ring plus a 5 px dot; fixed positioning, no pointer interception, and difference blending. There are also small trail elements.
- On ordinary interactive targets the ring grows to about 44 px, approximately scale 1.57, and takes on the accent treatment.
- Ring movement visibly lags the pointer and eases into position. Hovering the motif can produce a smaller rotating cursor state.
- Project hover adds a subtle magnetic translation. At a sample pointer position 11.2 px right and 20 px below the panel's center, the panel moved approximately 3.6 px right and 6.4 px down. This is consistent with about 0.32 of the pointer displacement in that sample; it is not a measured maximum or a required formula.
- The linked third panel substitutes a branded cursor graphic and a short action label, hiding the ordinary ring/dot. Non-linked project panels do not advertise the same visit action.
- The magnetic offset returns on pointer departure. It must not overwrite the scroll entrance transform.
- Touch layouts do not show this custom desktop cursor, and readable content is available without hover.

### Contact entrance

Measured initial state: opacity 0, y=+32 px, blur=8 px. Final state: opacity 1, y=0, blur=0. All three declare a one-second transition with the same decelerating curve. The reveal remained completed after navigating away in the recorded session, consistent with a one-time entrance rather than reversible scrubbing.

## 4. Responsive Rules

### Width and input are separate axes

The extended probes resized identical mouse and touch contexts through 22 widths. Results:

| Condition | Observed change |
| --- | --- |
| Width above 900 px | Project-section heading is a substantial serif title near the upper left |
| Width at or below 900 px | That heading becomes 13.6 px, tracked sans, near bottom center |
| Width 768 px and above | Center navigation remains; project panels alternate sides with caption overlays |
| Width 767 px and below | Center navigation disappears; panels center horizontally; captions sit below media and grow to 16 px |
| Touch-emulated input, at any tested width | Selected scroll distances become approximately 1.8× their mouse equivalents |
| Mouse input, even at 390 px after resize | Narrow layout, but original shorter scroll distances |

The touch behavior correlated with coarse-pointer emulation. Its exact internal detection method was not inspected. Reproduce the independently observed width/input distinction rather than treating every tablet width as equivalent to desktop or every narrow desktop window as touch.

### What remains fixed

- Navigation is attached to the viewport.
- The main scene fills the viewport.
- Hero typography and the project stage remain staged overlays.
- Single-panel project pacing and the continuity of the motif remain intact.
- The hero name remains a single line; the descriptor is allowed to wrap.

### What changes position or scale

- Desktop hero font scales with W; its supporting type has lower/upper bounds rather than scaling indefinitely.
- Floating words shrink and move to different peripheral anchors on phones.
- Project motif moves above the media on phones; alternating left/right is retained on tablet.
- Phone panels use approximately 85% of W, capped around 560 px at intermediate widths.
- Captions leave the image on phone, gaining line-height and usable reading space.
- Contact type reduces substantially but preserves its centered hierarchy.

### Reference quirks to handle deliberately later

- A third-party award ribbon occupies approximately 53 × 176 px on the right edge and overlaps the hero/project/contact content at narrow sizes. It is neither The Auto Bots branding nor a target to reproduce.
- Phone navigation has no visible section-jump replacement. A later accessible navigation decision should be explicit, small, and consistent with the sparse header.
- The reference footer at 390 px is approximately 386 px wide, almost flush with both edges. Replacement copy needs wrapping or safe insets.
- The reference's long touch journey is about 25.32 viewport heights. Preserve its pacing philosophy, but do not silently assume it is the same as desktop.
- A keyboard probe found a visible 2 px mint outline on the identity link. This was a limited focus check, not a complete accessibility audit.
- In a fresh reduced-motion context, the hero remained legible and two captures 1.2 seconds apart showed the same particle arrangement. Following a wheel input, native scroll reached 600 px while the content plane reported no smoothing transform. This supports a reduced-motion branch that suppresses idle scene motion and scroll smoothing; every downstream effect was not separately audited.
- Chromium touch emulation does not verify physical Safari browser chrome, dynamic viewport units, orientation changes, or real inertial swipes.

## 5. Reusable Interaction Patterns

These are proposed boundaries for the later independently authored application, not components copied from the reference.

| Pattern | Responsibility | Keep separate from |
| --- | --- | --- |
| `SceneController` | Maps normalized scroll stages to scene state and content visibility | Company copy and motif artwork |
| `BrandMotif` | Replaceable original graphic/scene object; accepts position, scale, rotation, and state | Fixed star geometry or reference shaders |
| `Navigation` | Sparse identity/section/language layout, active state, correct scene destinations | Arbitrary element-top scrolling |
| `IntroSequence` | Loading presentation and overlapping hero-group entrance | Actual asset readiness and reduced-motion policy |
| `HeroTypography` | Responsive type ratios, descriptor wrapping, synchronized base/glow treatment | Company-specific word lengths |
| `FloatingWordSequence` | Data-driven peripheral anchors, reveal/hold/exit envelopes | Specific portfolio words or tool logos |
| `ProjectStage` | Single-panel sequence, alternate-side placement, touch timing | Project data and destination availability |
| `MediaFrame` | Aspect ratio, subtle corners, responsive caption position | Reference media and award assets |
| `MagneticTarget` | Small pointer-relative offset and reset, gated by suitable input | Scroll translation on the same element |
| `ContextCursor` | Pointer ring/dot and optional link-action state | Essential interaction instructions |
| `ContactReveal` | Centered invitation/address, blur entrance, copy feedback | Hardcoded address or social profiles |

Do not create a generic animation component with the same reveal for every element. There are several distinct behaviors here, and their sequence belongs in the dedicated motion layer.

Future motion architecture should separate an elapsed-time intro timeline, scroll-driven stage timelines, pointer motion, and idle scene motion. Stage lengths and viewport-specific anchors should be editable data. Typography measurements must refresh after fonts, language, viewport, or brand text change. Cleanup must cancel listeners/animation frames and revert timelines when their owning component unmounts.

## 6. Key Fidelity Requirements

1. Maintain one continuous dark environment across the journey.
2. Reproduce the sequence of attention: name → traversal → floating words → projects → contact.
3. Match the hero's nearly full-width, single-line scale and muted luminance.
4. Preserve the contrast between heavy open sans, delicate italic serif, and widely tracked microtype.
5. Keep fixed stage content independent from the scrolling distance providers.
6. Preserve the early fixed-position hero fade; do not substitute a large title translation.
7. Make the persistent original motif perform the same compositional role across stages.
8. Preserve the long, smooth traversal and the scene-only breathing intervals.
9. Anchor floating words around a protected central area with overlapping focus changes.
10. Display one project at a time with a clear reading plateau.
11. Keep desktop panel/motif counterbalance and the left/right/left rhythm.
12. Use short panel translations, strong deceleration, and deliberately shorter exit travel.
13. Preserve square media frames, restrained corners, and controlled caption contrast.
14. Recompose phone projects with the motif above and captions below; keep tablet distinct.
15. Distinguish touch scroll pacing from viewport-width breakpoints.
16. Keep navigation understated, stable, and aware of the active scene.
17. Preserve contextual pointer feedback without making touch users depend on it.
18. Finish with a quiet centered contact screen, local feedback, and small footer.

### Representative evidence for later comparison

| State | Desktop evidence | Phone evidence |
| --- | --- | --- |
| Settled hero | [1440 hero](inspection/evidence/1440x900-load-7000.png) | [390 hero](inspection/evidence/390x844-load-7000.png) |
| Traversal | [1.5H](inspection/evidence/1440x900-scroll-1.5.png) | [3H](inspection/evidence/390x844-scroll-3.png) |
| Floating words | [5H](inspection/evidence/1440x900-scroll-5.png) | [about midpoint](inspection/evidence/390x844-about-middle-settled.png) |
| First project | [settled](inspection/evidence/desktop-project-first-settled.png) | [settled](inspection/evidence/390x844-proj-seg-1-start-settled.png) |
| Second project | [settled](inspection/evidence/desktop-project-second-settled.png) | [settled](inspection/evidence/390x844-proj-seg-2-start-settled.png) |
| Link hover | [third project](inspection/evidence/desktop-project-third-hover.png) | No hover equivalent required |
| Contact | [settled](inspection/evidence/desktop-contact-settled.png) | [bottom](inspection/evidence/390x844-contact-bottom.png) |

For later visual verification, compare typography bounds, anchors, reading plateaus, and visible-state order before comparing pixels. Particle positions and replacement artwork will legitimately differ. Use recorded viewport, scroll position, and elapsed state; do not compare arbitrary moments from two running scenes.

## 7. IP-Safe Replacement Areas

| Reference-specific material | Preserve | Replace independently |
| --- | --- | --- |
| Personal identity and portfolio copy | Text roles, hierarchy, approximate visual density | The Auto Bots name and original company copy |
| Identifiable star-shaped motif | Focal role, footprint, anchor changes, persistence, motion envelope | Original, replaceable brand abstraction; no traced silhouette, shader, or particle arrangement |
| Custom cursor star | Contextual link cue, scale, timing | Own graphic and own action wording |
| Project screenshots and artwork | Frame geometry, aspect ratios, alternating staging | Supplied/licensed Auto Bots media or neutral original placeholders |
| Tool logos in floating sequence | Small visual markers and their placement/weight | Own approved marks or simple original neutral symbols |
| Reference font resources | Structural characteristics and type-role contrast | Fonts acquired independently under verified web-use licenses |
| Award ribbon | No essential scene function | Omit; do not imply an award or nomination |
| Contact/social details and footer wording | Sparse centered treatment and interaction role | Configurable Auto Bots information |
| Loading words/counter presentation | Sequential pacing and progress role | Original labels and an independently designed loading presentation |

The future `BrandMotif` must expose a stable layout/motion interface so artwork can be changed without rewriting the scene. Its replacement should carry comparable visual weight and continuity while remaining visibly original. Do not turn that substitution into an unrelated AI orb, dashboard hero, bento grid, or agency template.

### Boundaries of this specification

This analysis establishes rendered layout logic and measurable behavior. It does not establish the reference's source architecture, exact canvas algorithms, original animation-library implementation, resource-based loading logic, legal ownership of individual assets, physical-device performance, or a full accessibility conformance result. Those are not inferred from appearance.

No new website code, production assets, package dependencies, or brand implementation were created in this phase.
