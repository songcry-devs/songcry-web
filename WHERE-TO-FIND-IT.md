# WHERE TO FIND IT — songcry-web

**The one index.** Where each kind of file lives; update it in the same pass whenever you
add, move, rename or retire a doc. Never create a rival index/status/tracker doc.

_Created 2026-08-17 (workspace-wide filing pass)._

| Type | Home | Notes |
|---|---|---|
| Instructions | `CLAUDE.md` | Loaded every session. Nothing time-bound. |
| Skills | `.claude/skills/` | Repo-specific; auto-activate. Listed in CLAUDE.md. |
| Pages / routes | `app/` | Next.js 14 App Router |
| Components | `components/` | — |
| Content | `content/` | — |
| Specs | `docs/specs/` | `YYYY-MM-DD-<capability>.md` |
| Plans | `docs/plans/` | `YYYY-MM-DD-<capability>.md` |
| Runbooks / migrations | `docs/` | descriptive (`cutover-runbook.md`) |
| Session notes | `docs/sessions/` | `session-notes-YYYY-MM-DD.md`, one per date, append |
| Superseded docs | `docs/_archive/` | move + rewrite every reference |

**Reality note:** **songcry.app IS this repo** since the 2026-08-17 Framer→Vercel cutover
(see `docs/cutover-runbook.md` for the record; the old Framer site stays published, unedited,
as rollback insurance until ~2026-09-01). A merge to `main` deploys the LIVE marketing site.
The `staging` branch is the sandbox: every push to it deploys a full preview at
`songcry-web-git-staging-tjsongcrys-projects.vercel.app` without touching production.
