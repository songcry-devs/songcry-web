# AGENTS.md — songcry-web (songcry.app)

For AI coding agents other than Claude Code (Codex, GPT models). Claude Code reads `CLAUDE.md`. This file points you at the same rules and adds the ones that matter when you work unsupervised.

## Read before you start

1. `CLAUDE.md` in this repo: stack, scripts, conventions. Its Framer lines are history. Framer was cancelled on 2026-09-09 and this Vercel project is the live site.
2. `WHERE-TO-FIND-IT.md` in this repo: where things live.
3. `.claude/skills/`: `songcry-design-tokens.md`, `component-conventions.md`, `animation-patterns.md`, `web-design-guidelines/`.
4. The design bar, before you judge or change anything visual: `~/.claude/skills/songcry-page-craft/SKILL.md` and its `reference/` folder.
5. The voice and product truth, before you write any words a visitor will read: `~/.claude/skills/songcry-voice/SKILL.md`.
6. The workspace map: `~/songcry-repos/CLAUDE.md`.

## Hard rules

- **`main` is production.** A push or merge to `main` deploys songcry.app through Vercel. Never push to `main`. Work on a branch, open a PR, and a person merges it.
- **This repo is public on GitHub.** Never commit secrets, tokens, `.env` values, personal emails or phone numbers, or artist data.
- **Legal pages are lawyer reviewed.** Do not edit `content/legal/*.md` or the `app/legal/` pages. Report problems instead.
- **Forms on songcry.app (production) create real signups and fire ad conversions. Never submit them.** The same goes for `songcry-web.vercel.app`, `songcry-web-tjsongcrys-projects.vercel.app` and any `songcry-web-git-main-…` URL, or any deployment Vercel marks Production, including its hashed `songcry-<hash>-tjsongcrys-projects.vercel.app` URL: those ARE the production deployment. On `npm run dev` and on `-git-<feature-branch>-` preview URLs the forms validate and show "Preview: nothing was saved": nothing is written and no conversion fires, because writes are gated on `VERCEL_ENV === 'production'` (or the request host being exactly songcry.app, a fallback for when Vercel's system env vars fail to reach the runtime; see `lib/environment.ts`), the ad tags load only on the production build, and the form addresses exist only as Production-scoped Vercel env vars. That is where you test.
- **Never promote a preview deployment to production.** It ships code that skipped review on `main`. (Promoting does rebuild with production env vars, so that is not the danger.) To undo a bad release use **Instant Rollback**, then **Undo Rollback** once fixed: after a rollback Vercel stops auto-assigning production, so the next merge to `main` will not go live until someone clicks Undo Rollback.
- **Copy rules:** the name is "Songcry" (never "SongCry"). No em or en dashes in visitor-facing copy. Make no product claims that the songcry-voice skill does not list as safe to say.
- Add no new dependency without saying why in the PR.
- `npm test` and `npm run build` must pass before you open a PR (both need Node 22.18 or later). A build with `VERCEL_ENV=production` refuses to finish unless `OUTREACH_SUPABASE_URL`, `OUTREACH_SUPABASE_ANON_KEY` and `FAN_WAITLIST_URL` are set and clean (`scripts/check-production-env.ts`); that is deliberate.

## When you QA

- Test at phone width (390x844 with touch emulation, because the site enlarges tap targets only for coarse pointers, see `app/globals.css`) and at desktop width (1440x900).
- Report each finding with the URL, viewport, what you did, what you expected, what happened, and evidence (a screenshot or a measurement). Keep confirmed bugs apart from opinions.
- TikTok, Facebook and LinkedIn block automated browsers. An error on their pages is not our bug.
- The floating header over body text while scrolling is intended.
- Fix one topic per branch and PR, make the smallest correct change, and say how you verified it.
