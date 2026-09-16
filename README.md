# The Auto Bots

A React + TypeScript + Vite website with independently authored GSAP motion, a lightweight particle scene, and editable brand/content configuration.

Live website: <https://techaiteam1.github.io/theautobots/>

The design follows the measured composition and interaction approach of [Milan Compain's reference](https://milancompain.com/): oversized typography, one continuous dark scene, peripheral words, alternating single-panel displays, and a quiet contact screen. The implementation, linked-rail motif, illustrations, and copy are original. See [the reference specification](docs/reference-analysis.md).

## Run locally

Requires Node.js 22.12+ or another Node version supported by Vite 7.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. The default development port is 5173.

## Build and preview

```bash
npm run lint
npm run build
npm run preview -- --port 4173
```

Production preview: <http://127.0.0.1:4173/>. Deploy only `dist/` to a static host. The inspection and QA screenshots in `docs/` are not part of the build.

Pushes to `main` automatically build and deploy through `.github/workflows/deploy-pages.yml`.

There is no backend, CMS, tracking, third-party API, or runtime font CDN dependency. Copying the email address uses the browser clipboard; the separate email link works without clipboard access. Clipboard access requires HTTPS or localhost.

## Architecture

```text
src/
  app/          Application assembly and experience preferences
  animation/    GSAP setup, intro, scroll timelines, scene geometry
  components/   Navigation, replaceable motif, media, cursor, magnetic wrapper
  config/       Brand, contact, metadata, Vite-safe asset URLs
  content/      Structured copy, capability words, system stories
  hooks/        Media preferences and responsive name fitting
  sections/     Hero, approach, systems, contact
  styles/       Theme tokens, licensed font declaration, layout and interactions
public/
  brand/        Replaceable original logo, motif, favicon, social preview
  media/        Original geometric concept illustrations
  font-licenses.txt
docs/
  reference-analysis.md
  inspection/   Reference-only measurements/screenshots; never production assets
  qa/           Production verification, screenshots and comparison notes
```

Start with [BRANDING.md](BRANDING.md) for business edits. Components do not contain business copy.

## LLM and Obsidian context

Open `docs/llm-context/` as an Obsidian vault and begin with [00-START-HERE.md](docs/llm-context/00-START-HERE.md). The vault uses progressive disclosure: load the start page, the task-specific note it links to, and only the affected source files. Root `AGENTS.md`, `CLAUDE.md`, and `GEMINI.md` point compatible coding assistants to the same model-neutral source of truth.

### Motion architecture

The intro is an elapsed-time GSAP timeline. A second timeline maps scroll distance to visibility, word choreography, and panel entrance/hold/departure. A small shared clock keeps an original Canvas 2D particle scene synchronized with the visible scroll state. Cursor/magnetic motion has separate transform wrappers. Contact uses its own elapsed-time reveal.

Scene distances are in viewport heights and adjust automatically to the number of stories. Touch input expands selected distances by 1.8×; width separately controls composition at 900 px and 768 px. Reduced motion becomes a readable native-flow document with a static motif. Ambient motion can also be paused from the menu or footer.

GSAP contexts and media contexts revert on cleanup; browser listeners, observers, and the scene ticker are removed when their owner unmounts. The renderer caps pixel density at 1.5 and skips unchanged frames in paused/reduced mode. No 3D framework is required.

### Assets and fonts

The original geometric SVGs are concept illustrations, not client projects or claims of delivered results. Replace them when real company media is available. Fontsource supplies self-hosted **Manrope** and **Instrument Serif** under the SIL Open Font License; notices ship in `public/font-licenses.txt`. Fonts were obtained independently, never from the reference website.

### Metadata and deployment

`src/config/brand.ts` controls title, description, Open Graph data, favicon, contact details, and the canonical URL. Vite writes metadata into the built HTML and generates `robots.txt` and a sitemap when `brand.seo.siteUrl` is set.

The current canonical is the public GitHub Pages URL, `https://techaiteam1.github.io/theautobots/`. The intended custom domain `theautobots.ai` is not purchased yet. Replace `siteUrl` after the custom domain is owned and connected. The supplied Gmail address is already active in the site.

For deployment beneath a subdirectory, set `BASE_PATH` to the leading/trailing slash path. The GitHub workflow uses `/theautobots/`. The `assetUrl` helper applies Vite's base to configurable public media. Use the final full public URL, including the subdirectory, for `brand.seo.siteUrl`.

## Verification

See [docs/qa/verification.md](docs/qa/verification.md) for the tested viewport matrix, comparison findings, and limitations. QA scripts require an existing Playwright Core installation and Chromium, selected through `PLAYWRIGHT_CORE_PATH` and `CHROMIUM_PATH`; they add no runtime dependencies. The production website never references local machine paths.
