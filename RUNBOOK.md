# POC Runbook — baby steps, fastest path

Rule of the POC: **you are the orchestrator.** One fresh `claude` session per stage,
paste the stage prompt, verify the gate, advance PIPELINE.md, commit. Automate later.

MCP-first rule: before any agent builds tooling, check `claude mcp list` — if an MCP
covers it, use it. MCP names/commands below are from early 2026; verify each against
its official docs before relying on it (the ecosystem moves monthly).

---

## Step 0 — Prerequisites (~1 hour, mostly signups)

Accounts (all free tier): GitHub, Supabase, Expo (expo.dev), Vercel, Langfuse Cloud (optional but recommended).
Local: Node 20+, git, `gh` CLI (`gh auth login`), jq, Android Studio emulator OR a physical Android phone with the Expo Go app.

## Step 1 — Repo (10 min)

```bash
mkdir habitly && cd habitly
# extract poc-starter-kit.zip contents here (including hidden .claude and .github)
git init && git add -A && git commit -m "chore: pipeline scaffold"
gh repo create habitly --private --source=. --push
```

Sanity: `ls .claude/agents` shows 7 agents; `cat PIPELINE.md` shows stage 1 pending.

## Step 2 — Wire MCPs into Claude Code (~20 min)

Run inside the repo so config scopes to this project. Verify each command against the
provider's docs — treat these as templates, not gospel:

```bash
# Supabase MCP — lets dev-agent create tables/migrations/queries against your project
claude mcp add supabase -- npx -y @supabase/mcp-server-supabase@latest \
  --project-ref <YOUR_PROJECT_REF>          # token via env per Supabase MCP docs

# Playwright MCP — sqa-agent drives real browsers for web/admin E2E
claude mcp add playwright -- npx -y @playwright/mcp@latest

# Figma Dev Mode MCP (optional) — needs Figma desktop app with the MCP server enabled
claude mcp add --transport sse figma http://127.0.0.1:3845/sse
```

GitHub deliberately has NO MCP here: `gh` CLI is faster and already authenticated.
If a listed MCP doesn't exist/work anymore → fall back to that tool's CLI. Log the
substitution in PIPELINE.md's intervention table (that's POC data).

Check: `claude mcp list` shows them connected.

Optional tracing: set the Claude Code OpenTelemetry env vars pointed at Langfuse
(see Claude Code docs → monitoring, and Langfuse docs → OTel). Skip if short on time —
the ledger hook already captures every tool call locally.

## Step 3 — Test the plumbing (5 min)

```bash
claude   # inside the repo
> Read PIPELINE.md and tell me the current stage.
```

Then exit and: `cat artifacts/ledger.jsonl` — you should see JSONL lines. If empty,
check `claude/doctor`-style diagnostics and the hooks section of the Claude Code docs
(payload fields evolve; adjust scripts/ledger.sh accordingly).

---

## Steps 4–10 — Run the stages

Ritual for EVERY stage:
1. `claude` (fresh session, repo root)
2. Paste the stage prompt below
3. Agent works → prints its gate self-check
4. YOU verify the gate file line by line
5. Update PIPELINE.md (status + intervention log), `git add -A && git commit`, close the stage issue: `gh issue close <n> -c "gate passed"`
6. Exit the session. Next stage, new session.

### Step 4 — Stage 1: BA (~1–2 h)
Prompt:
> Use ba-agent. Read PIPELINE.md and artifacts/brief.md. Interview me as the client
> (one batch of questions), then produce your outputs and self-check gate-1.

You answer the interview, review proposal.md, approve (checkpoint 1).

### Step 5 — Stage 2: PM (~30–60 min)
> Use pm-agent. The proposal is approved. Produce artifacts/sow.md and create the
> GitHub issues per your contract. Self-check gate-2.

You reply "signed" (checkpoint 2) after reading sow.md — actually read the exclusions.

### Step 6 — Stage 3: Design, contract-first (~2–4 h)
> Use design-agent. SOW is signed. Contract first: produce and lint
> artifacts/openapi.yaml, then tokens and screens per your contract. Use the Figma MCP
> if available, otherwise the HTML-mockup fallback. Self-check gate-3.

Review screens + skim the contract, approve (checkpoint 3). Say explicitly:
"Approved. openapi.yaml is frozen."

### Step 7 — Stage 4: Build (~1–3 days, the long one)
Work feature by feature, TWO alternating sessions:

Dev session:
> Use dev-agent. Implement US-00X on branch feat/US-00X against the frozen contract.
> Include unit tests. Open a PR referencing the feature issue.

Review session (fresh session — independence is the point):
> Use review-agent. Review PR #N per your checklist and post the verdict with
> `gh pr review`.

Merge when CI is green + APPROVE. Repeat per Must feature. Suggested order:
backend/migrations first (via Supabase MCP), then mobile, then web, then admin
(Refine/react-admin scaffold — don't let it hand-build CRUD).
Reality check: expect to intervene here. Log every intervention.

### Step 8 — Stage 5: SQA (~half–1 day)
> Use sqa-agent. All Must features are merged. Produce the test plan, Maestro flows,
> and Playwright suites (Playwright MCP if available), run everything against the dev
> builds, and file bug reports per your JSON schema. Self-check gate-5.

Maestro install, if needed: `curl -Ls https://get.maestro.mobile.dev | bash`

### Step 9 — Stage 6: Fix loop (bounded)
Alternate:
> Use dev-agent. Fix all open bugs in artifacts/bug-reports/, one PR per bug or
> tight group, mark them "fixed" with PR links.

(review-agent on each PR, merge, then:)
> Use sqa-agent. Retest: run the FULL suite, flip verified bugs to "verified",
> update test-summary.md.

Hard cap: 3 iterations. Not clean by then → you triage manually and log it.

### Step 10 — Stage 7: Deploy (~2–4 h)
> Use devops-agent. QA passed. Ship per your contract: EAS Android build, Vercel
> deploys for web and admin, store assets, monitoring, release notes. Ask me for any
> credentials you need. Self-check gate-6.

One-time CLI logins it will need you for: `npx eas login`, `vercel login`,
`npx supabase login`. Install the APK on your phone, click the live URLs,
sign the release (checkpoint 4). **The pipeline has now run end to end.**

---

## Step 11 — Measure (the actual POC deliverable, ~1 h)

```bash
wc -l artifacts/ledger.jsonl                                  # total tool events
jq -r .tool artifacts/ledger.jsonl | sort | uniq -c | sort -rn # tool mix
jq -r .session artifacts/ledger.jsonl | sort -u | wc -l        # session count
ls artifacts/bug-reports | wc -l                               # defects found
```

Plus from PIPELINE.md: interventions per stage + reason codes; from git history:
wall-clock per stage; from your Claude console: cost. Write REPORT.md:
% stages autonomous, intervention hotspots, fix-loop iterations, elapsed vs the
~17-week human benchmark, cost.

## Step 12 — The generalization test (before telling anyone it works)

New repo from this same scaffold, replace ONLY artifacts/brief.md with a different
app idea, rerun steps 4–10 without editing any agent file. Run 2 is the proof;
run 1 is the rehearsal.

## Only now: script the orchestrator

For stages that ran clean, chain them headlessly (Claude Code print mode, e.g.
`claude -p "<stage prompt>"` — verify current flags in the docs) in a bash loop that
checks gate results between stages. Keep humans on the stages the data says need them.

## Troubleshooting quick hits
- Hook writes nothing → payload schema changed; print stdin to a temp file from
  ledger.sh and adjust the jq filter.
- EAS build fails → 90% of the time it's app.json config; let dev-agent read the
  build log URL and fix.
- Agent edits a frozen file → tighten the agent .md AND add a CI check; log it.
- Context getting long mid-stage → end session, note state in PIPELINE.md, resume fresh.
