# CLAUDE.md — Songcry Web

_Project context for Claude Code sessions. Read this first._

---

## Skills Directory
This repo has Claude Code skills in `.claude/skills/`. These auto-activate based on task context. The three current skills are:
- `animation-patterns` — animation library selection
- `songcry-design-tokens` — brand colors/fonts/spacing
- `component-conventions` — how to build components consistently

Read any relevant skill before writing code in its domain.

## What This Is

**songcry-web** — The Songcry marketing/landing site prototype built on Vercel + Next.js.

- **Live Framer site** (separate): https://songcry.app — built in Framer, edited via Framer API (no repo)
- **This project:** Next.js/Vercel version. Early prototype pass to mirror the Framer design as code. Intended as the eventual custom-code landing page when we outgrow Framer.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Hosting:** Vercel (auto-deploys on push to main)
- **Repo:** `songcry-devs/songcry-web` (GitHub)
- **Vercel project:** `prj_d5MbiXQnkuBX5NUU3GoBDl01E7Zd`
- **Node:** >= 18

## Project Structure

```
app/
├── api/          # API routes
├── artist/       # Artist-facing pages
├── legal/        # Legal pages
├── globals.css   # Tailwind + global styles
├── layout.tsx    # Root layout
└── page.tsx      # Landing page
components/       # Reusable React components
public/           # Static assets
types/            # TypeScript type definitions
```

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — run production build locally

## Critical Rules

### DO NOT
- Break the existing Framer live site — this repo is separate. Framer edits go through the Framer API tool, not code changes here.
- Deploy directly to production without testing locally first (`npm run build`)
- Add new dependencies without a clear need — keep the project lean (currently 9 deps)
- Change the Vercel project settings or build config without Alfred approval

### ALWAYS
- Add `'use client'` directive for any component using event handlers, hooks, or browser APIs
- Test with `npm run build` before pushing — Vercel will fail on TS errors
- Match design spec from Figma/Framer when implementing pages
- Use Tailwind utility classes; don't add new CSS files unless absolutely necessary

## Design System

- **Primary color:** Pink `rgb(248, 25, 192)`
- **Primary font:** Albert Sans
- **Brand name:** Songcry (capital S, lowercase rest)

## Current State

Basic landing page scaffold exists. Footer uses client component. Full design parity with Framer site is pending.

## Who Works on This

- **Website Builder agent** (marketing gateway) — primary owner
- **Alfred** — coordination, PR review
- **Claude Code** (this session) — code writer

_Last updated: 2026-04-20 — Initial CLAUDE.md created when repo was cloned locally._
