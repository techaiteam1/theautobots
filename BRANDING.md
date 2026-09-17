# Branding and content

Normal edits have three entry points:

| What changes | File |
| --- | --- |
| Identity, logo, contact, social links, SEO | `src/config/brand.ts` |
| Business copy and content lists | `src/content/site-content.ts` |
| Colors, fonts and visual tokens | `src/styles/tokens.css` |

## Change the company name

Edit `brand.companyName` in `src/config/brand.ts`. The header, hero, loading identity, menu and footer use this value. The hero fits the actual rendered name to the available width; it is not dependent on a hardcoded letter count.

Also update `brand.seo.title`, `brand.seo.description` and `brand.seo.socialImageAlt` in that same file. Review company-specific sentences in `site-content.ts` and replace logo/social artwork when rebranding.

## Change the tagline

Edit `brand.tagline` in `src/config/brand.ts`. It appears under the hero and in the menu. The three loading words are independently editable at `siteContent.loader.words`.

## Replace the logo

Replace `public/brand/logo.svg`, or change `brand.logo` to another public asset path. Set `brand.logoMode` to `'image'` to display it in the header. The default `'text'` identity preserves the reference's understated header.

The image slot is 142 × 25 px with `object-fit: contain`. Use a wide transparent SVG or a high-resolution transparent raster image. The supplied SVG is an original temporary wordmark. Replace `public/brand/favicon.svg` separately for the browser icon.

## Change colors

Edit the CSS custom properties in `src/styles/tokens.css`:

- `--color-background`: continuous page surface.
- `--color-text`: primary text and bright particles.
- `--color-display`: muted oversized hero name.
- `--color-primary`: softer highlight color.
- `--color-secondary`: supporting text/particles.
- `--color-accent`: active navigation, particle motif, frame corners and focus feedback.
- `--color-particle-secondary`: the violet half of the dotted logo and depth field.
- `--color-muted`: small labels and hints.
- `--color-line`: subtle separators.
- `--color-overlay`: caption shading over desktop media.

The particle renderer reads these same tokens. No component needs color edits. The illustrations, logo, favicon and social preview are standalone artwork; replace or recolor those assets if their palette should change too. Preserve readable contrast when changing the theme.

## Change typography

Edit `--font-heading`, `--font-body`, and `--font-editorial` in `src/styles/tokens.css`. Use an open, heavy sans-serif for the display/body roles and a narrow italic serif for the editorial role to preserve the measured proportions.

When adding a new font, load its licensed files in `src/styles/fonts.css` (or import the appropriate Fontsource stylesheet in `src/main.tsx`) and keep its license notice. Put your own WOFF2 files under `public/brand/fonts/`, and reference their served URL, never a local machine path. The existing self-hosted fonts have graceful Arial/Georgia fallbacks.

## Edit homepage content

Edit `src/content/site-content.ts`. Sections are named by their purpose:

- `hero`: short descriptor words and scroll-link label.
- `about`: the readable company positioning statement, also used in reduced motion.
- `capabilities`: floating concept/detail pairs.
- `work`: stage title and the three system stories.
- `philosophy`: the long-term direction line in the outro.
- `contact`: invitation, copy feedback, email-link text and footer.
- `navigation` and `loader`: labels and opening words.

Keep floating phrases short and descriptions roughly one or two sentences. Their role is to support the scene's hierarchy. Substantially longer editorial content needs an intentional content layout rather than squeezing paragraphs into a timed stage.

## Add or remove a capability

Add or remove an object in `siteContent.capabilities`. Each object contains `title` and `detail`. Timing redistributes across the about region; the six position presets repeat when necessary. No component or GSAP selector needs editing.

## Add, remove or change a system story

Edit `siteContent.work.items`. Each story contains:

```ts
{
  id: 'unique-story-id',
  eyebrow: 'Short optional context',
  title: 'Story title',
  description: 'A short, factual description.',
  visual: 'transformation',
  // Or replace `visual` with: media: '/media/your-image.webp',
  alt: 'Useful description of what the image communicates.',
  // alternateMedia: '/media/alternate-view.webp',
  // href: 'https://your-real-project.example'
}
```

An empty eyebrow is supported. Omit `href` for a display-only story. Internal destinations such as `#contact` use the scene navigation; external links use normal browser navigation. Built-in visual choices are `transformation`, `agentic-systems`, and `managed-operations`. An optional `alternateMedia` crossfades slowly over custom media. Story count changes recalculate the journey length automatically.

## Change email and social links

Edit `brand.contact` in `src/config/brand.ts`. The current supplied email is `theautobots.ai@gmail.com`. The displayed address, copy action and email link share that one value.

Add full LinkedIn/Instagram URLs. Empty social values are omitted from the page; no placeholder links or invented profiles are shown. Labels are in `siteContent.contact.socialLabels`.

## Replace images or media

The default Systems artwork consists of original inline SVG diagrams in `src/components/SystemVisual.tsx`. Choose a diagram with each item's `visual` field. Their color comes from `tokens.css`, and their GSAP motion automatically follows the global pause and reduced-motion settings.

To use custom media instead, remove `visual`, place the file in `public/media/`, and add a `/media/file.webp` path plus useful `alt` text. Use a landscape ratio around 1.875:1. SVG, WebP, AVIF, PNG and JPEG are supported. Video requires a separately designed accessible media control.

## Replace the animated motif

Replace `public/brand/logo.jpeg`, or update `brand.motif`. The current supplied JPEG contains the final Auto Bots mark and wordmark on a dark background. The renderer derives the background color from its corners, removes similar pixels, and converts the remaining artwork into magenta, violet, and light particles.

Transparent square SVG/PNG artwork is also supported through alpha sampling. Keep the artwork centered with clear negative space. Replacing the graphic does not require changing scroll timelines, scene positions, or pointer interaction.

## Change metadata and social artwork

Edit `brand.seo` in `src/config/brand.ts`. Metadata is emitted into HTML during the build, so rebuild after changing it.

The current `siteUrl` is the live GitHub Pages origin. When the custom domain is purchased, connected, and serving HTTPS, replace it with `https://theautobots.ai` and rebuild. This updates the canonical URL, Open Graph URL, robots.txt, and sitemap.

Replace `public/brand/social-preview.png` with your final 1200 × 630 sharing image, or change `seo.socialImage`. The editable original placeholder artwork is `public/brand/social-preview.svg`; changing that SVG requires rendering a new PNG as well. The QA browser script can render it, or export it through your graphics tool. Update `socialImageAlt` to describe the replacement.
