---
title: LLM Handoff
type: agent-context
status: current
last_verified: 2026-09-16
---

# LLM handoff

## Paste this into a new session

```text
Work in the repository C:\Me\autobots-website.

First read AGENTS.md and docs/llm-context/00-START-HERE.md. Follow the task-specific reading route there; do not load all screenshots or generated files. Treat source code as the highest source of truth, and update the relevant context note plus docs/llm-context/09-CHANGELOG.md when behavior changes.

This is the completed The Auto Bots React/TypeScript/Vite/GSAP website. Preserve its continuous fixed-scene composition, measured motion character, responsive rules, accessibility, centralized content/brand/theme configuration, and IP-safe original assets. Do not redesign it as a generic SaaS website and do not reuse protected material from the visual reference.

Before handoff, run npm run lint and npm run build. For visual, animation, navigation, asset, or responsive changes, follow docs/llm-context/06-BUILD-QA-OPERATIONS.md.

Current user task: [REPLACE THIS LINE WITH THE NEW TASK]
```

## Efficient context packet

For most work, give an LLM only:

1. `AGENTS.md`.
2. `00-START-HERE.md`.
3. The one or two task-specific notes linked from its reading table.
4. The directly affected source files.
5. The latest user request.

Do not upload `node_modules`, `dist`, all QA screenshots, all inspection evidence, or whole minified outputs. Add specific evidence only for a visual comparison task.

## Current implementation status

The website is feature-complete and deployed through GitHub Pages from the `main` branch. The final production build, lint, two-size post-adjustment rerun, full eight-size viewport suite, built-asset checks, keyboard menu, paused animation, and reduced-motion checks passed. No code blocker is open.

Outstanding work is business/launch input, not core engineering:

- Purchase and configure a custom domain if desired; the GitHub Pages URL is public now.
- Approve or replace temporary brand/motif/media/social assets.
- Supply social profile URLs.
- Review final copy.
- Perform physical-device and non-Chromium launch testing.

## Session-end update template

At the end of a material future session, update this status only if needed and append to [[09-CHANGELOG]]:

```markdown
## YYYY-MM-DD — Short change title

- Intent:
- Files/areas changed:
- Behavior now:
- Decisions made:
- Verification run:
- Remaining risk or next input:
```

Keep handoffs factual. Separate completed work, verified results, assumptions, and unverified recommendations. Never claim a test passed unless its current-session output was observed.
