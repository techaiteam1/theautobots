---
title: Accessibility Responsive and SEO
type: quality-context
status: current
last_verified: 2026-09-16
---

# Accessibility, responsive behavior, and SEO

## Breakpoint behavior

The layout and input model are separate concerns. Width controls composition; pointer type controls timing.

- Above 900 px: large editorial systems heading and full desktop proportions.
- 768-900 px: alternating left/right panel architecture remains, while the systems heading becomes a restrained small label.
- Below 768 px: desktop center navigation hides; panels become centered at about 85% width in the lower viewport; captions move below media; media shading disappears; capability coordinates switch to mobile presets.
- Short phones below 620 px height use a compact split card layout.
- Coarse pointers use the expanded `1.8` journey pace even when width is tablet-sized.

Required regression viewports:

```text
1920x1080, 1440x900, 1280x800, 1024x768,
768x1024, 430x932, 390x844, 375x812
```

There must be no horizontal overflow, clipped essential text, unreachable controls, or animations that rely on hover.

## Accessibility model

- Semantic `main`, headings, sections, nav, anchors, and buttons remain in the DOM.
- Fixed visual sections not currently active become `inert` and `aria-hidden`; the active section is announced and navigable.
- System panels are inert outside their usable timeline window.
- The menu traps focus, responds to Escape, locks background interaction, and restores the opener.
- Section navigation initiated from controls transfers focus to the destination after scrub settling.
- Focus styles are visible and use theme colors.
- The contact address is selectable, copyable, and also available through a normal `mailto:` link.
- Images have editable useful alt text. Decorative Canvas and motif fallback are hidden from assistive technology.
- Minimum mobile control target is 44 px where appropriate.

## Reduced motion

`prefers-reduced-motion: reduce` is a different presentation mode, not just zero-duration GSAP:

- Intro overlay is removed.
- Long artificial scroll track is removed.
- Sections return to normal document flow with viewport-scale minimum heights.
- All sections and panels are visible and non-inert.
- The motif renders statically and media does not cycle.
- Custom cursor and ambient-motion controls disappear.
- Native section navigation remains usable.

The user can also pause ambient motion from the menu or footer without changing document layout.

## SEO generation

`brand.seo` controls title, description, language, locale, favicon, social image, alt text, and site URL. Vite injects escaped values during build.

Current behavior while the custom domain is unowned:

- Canonical and `og:url` use the live GitHub Pages deployment.
- The social image resolves to an absolute GitHub Pages URL.
- `robots.txt` references the generated GitHub Pages sitemap.
- `sitemap.xml` contains the live GitHub Pages homepage.

After purchasing and deploying a custom domain, replace `siteUrl` with that exact HTTPS origin and rebuild. The GitHub Pages workflow already sets `BASE_PATH=/theautobots/`; a root custom domain should use `/` instead.

## Launch review

Automated browser checks are strong but not a WCAG conformance audit. Before public launch, perform keyboard-only review, screen-reader smoke testing, 200% text zoom, high-contrast review, and physical iOS/Android plus Safari/Firefox checks.
