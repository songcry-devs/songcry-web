# Vendored third-party skills — provenance record

Installed 2026-07-28 for the songcry.app marketing-site rebuild (Framer → custom Next.js).
Each was cloned from its official source repo, inspected for executables/hooks/injection
patterns (none found — markdown-only instruction files), and copied in manually
(no `npx skills` CLI). All MIT-licensed.

| Skill folder(s) | Source repo | SHA at install | Publisher |
|---|---|---|---|
| `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-react`, `gsap-plugins`, `gsap-utils`, `gsap-performance`, `gsap-frameworks` | [greensock/gsap-skills](https://github.com/greensock/gsap-skills) | `aed9cfd` | GreenSock (official) |
| `react-best-practices` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | `7c180d9` | Vercel (official) |
| `web-design-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | `7c180d9` | Vercel (official) |
| `motion-design` | [LottieFiles/motion-design-skill](https://github.com/LottieFiles/motion-design-skill) | `f9a8a04` | LottieFiles (official) |

**Why these:** chosen 2026-07-28 after vetting the skills promoted in a viral
bestapps.ai Instagram post — the community ones (genjutsu, design-dna) were skipped as
redundant with Anthropic's `frontend-design` skill (installed at user level) or
lower-trust. These four sources are all official vendor orgs.

**To update:** re-clone the source repo, re-run the same inspection
(no executables/hooks, grep for injection patterns), then re-copy and bump the SHA here.

The `*.md` files at this level (`animation-patterns.md`, `component-conventions.md`,
`songcry-design-tokens.md`) are Songcry-authored, not vendored.
