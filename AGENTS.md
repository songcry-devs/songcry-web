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
- **Forms on the live site create real signups.** Do not submit "Join the beta" or any other form on songcry.app. Test submissions against `npm run dev` or a Vercel preview.
- **Copy rules:** the name is "Songcry" (never "SongCry"). No em or en dashes in visitor-facing copy. Make no product claims that the songcry-voice skill does not list as safe to say.
- Add no new dependency without saying why in the PR.
- `npm run build` must pass before you open a PR.

## When you QA

- Test at phone width (390x844 with touch emulation, because the site enlarges tap targets only for coarse pointers, see `app/globals.css`) and at desktop width (1440x900).
- Report each finding with the URL, viewport, what you did, what you expected, what happened, and evidence (a screenshot or a measurement). Keep confirmed bugs apart from opinions.
- TikTok, Facebook and LinkedIn block automated browsers. An error on their pages is not our bug.
- The floating header over body text while scrolling is intended.
- Fix one topic per branch and PR, make the smallest correct change, and say how you verified it.
