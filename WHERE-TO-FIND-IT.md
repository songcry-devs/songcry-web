# WHERE TO FIND IT — songcry-web

**The one index.** Where each kind of file lives; update it in the same pass whenever you
add, move, rename or retire a doc. Never create a rival index/status/tracker doc.

_Created 2026-08-17 (workspace-wide filing pass)._

| Type | Home | Notes |
|---|---|---|
| Instructions | `CLAUDE.md` | Loaded every session. Nothing time-bound. |
| Instructions for non-Claude agents | `AGENTS.md` | Codex/GPT agents. Points at CLAUDE.md and the skills, plus the unsupervised-work rules (main is production, public repo, no live form submits). |
| Skills | `.claude/skills/` | Repo-specific; auto-activate. Listed in CLAUDE.md. |
| Pages / routes | `app/` | Next.js 14 App Router |
| Components | `components/` | — |
| Content | `content/` | — |
| Specs | `docs/specs/` | `YYYY-MM-DD-<capability>.md` |
| Plans | `docs/plans/` | `YYYY-MM-DD-<capability>.md` |
| Runbooks / migrations | `docs/` | descriptive (`cutover-runbook.md`) |
| Session notes | `docs/sessions/` | `session-notes-YYYY-MM-DD.md`, one per date, append |
| Superseded docs | `docs/_archive/` | create it on first use; move + rewrite every reference |
| Pure logic (tested) | `lib/` | attribution, store links, environment gate, seo, reveal, link-click |
| Tests | `tests/` | `npm test`, one file per `lib/` module |
| Scripts | `scripts/` | style-literal guard, craft checker, measure |

**Reality note:** **songcry.app IS this repo** (Framer to Vercel cutover 2026-08-17, record in
`docs/cutover-runbook.md`; Framer cancelled 2026-09-09). A merge to `main` deploys the live site.
The `staging` branch is an old sandbox, far out of date with main and carrying concept pages:
never merge it.
