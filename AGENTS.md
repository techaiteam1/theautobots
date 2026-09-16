# The Auto Bots website: agent entrypoint

Before changing this repository, read [docs/llm-context/00-START-HERE.md](docs/llm-context/00-START-HERE.md).

The canonical project knowledge base is `docs/llm-context/`. Use its reading routes instead of loading every file. Treat source code as truth when documentation and code disagree, then update the documentation in the same change.

Non-negotiable constraints:

- Preserve the motion-led, minimal composition documented in `docs/reference-analysis.md`; do not turn it into a conventional SaaS layout.
- Never copy reference-site code, text, fonts, images, logos, icons, or artwork.
- Keep business copy in `src/content/site-content.ts`, identity/SEO/contact in `src/config/brand.ts`, and visual tokens in `src/styles/tokens.css`.
- Maintain keyboard access, visible focus, reduced motion, touch behavior, and GSAP cleanup.
- Before handoff, run `npm run lint` and `npm run build`; use the QA instructions in `docs/llm-context/06-BUILD-QA-OPERATIONS.md` for visual changes.
