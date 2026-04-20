---
name: component-conventions
description: How to build new components for the Songcry website consistently with the existing codebase. Read before creating any new component.
---

# Component Conventions

## Location

- **Reusable components:** `components/[category]/ComponentName.tsx`
- **Page-specific small sections:** inline in `app/[page]/page.tsx`
- **Reused page sections:** extract to `components/sections/`

## `'use client'` directive

Add `'use client'` at the very top of the file if the component uses any of:
- React hooks (`useState`, `useEffect`, etc.)
- Event handlers (`onClick`, `onChange`, etc.)
- Browser APIs (`window`, `document`, `localStorage`)
- `next/image` with dynamic props

If none of the above apply, leave it as a server component.

## Images

- Always use Next.js `<Image>` over `<img>`
- Always set `width` + `height`, OR use `fill` with a positioned parent

```tsx
import Image from 'next/image'

<Image src="/hero.jpg" alt="..." width={1200} height={800} />
```

## Links

- Use `<Link>` from `next/link` for internal routes — never `<a href="/...">`
- Plain `<a>` is fine for external links (`https://...`)

## Conditional classes

Use the `cn` helper at `lib/cn.ts`. It composes `clsx` + `tailwind-merge` so conflicting Tailwind utilities resolve correctly.

```tsx
import { cn } from '@/lib/cn'

<button className={cn('px-4 py-2', isActive && 'bg-pink-500', className)} />
```

## TypeScript

- Functional components only
- Type props inline or as `type Props = { ... }`

```tsx
type Props = { title: string; onClick?: () => void }
export function Card({ title, onClick }: Props) { ... }
```

## Styling

- Tailwind utilities only — do not create new CSS files
- Global styles live in `app/globals.css` and nowhere else
