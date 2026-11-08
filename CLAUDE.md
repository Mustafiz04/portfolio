# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Code Style Guidelines
- Next.js: Use App Router conventions (`app/` directory).
- React Components: Default to Server Components; only add `"use client"` at the very top if active event listeners, state, or client hooks (useState, useEffect) are required.
- TypeScript: Enforce strict typings. Avoid using `any`.
- Styling: Use Tailwind CSS utility classes in markup. Follow the design system spacing and color tokens.
- APIs: Place route handlers under `app/api/.../route.ts` using native request/response typing.
- Formatting: 2 spaces indent, semi-colons required, double quotes for JSX strings.

# Project Architecture & Directories
- Page routes: `app/[route]/page.tsx`
- Layout shells: `app/layout.tsx` or nested `app/[route]/layout.tsx`
- Component directories: `src/components/` for shared components, or nested `_components/` under route subfolders.
- Utility library: `src/lib/` or `src/utils/`
- Ignore patterns: Do not index or modify `.next/`, `node_modules/`, or build outputs.


## Commands

```bash
yarn dev          # start dev server (next dev)
yarn build        # next build, then runs scripts/postbuild.mjs (generates feed.xml via scripts/rss.mjs)
yarn serve        # next start (serve the production build)
yarn lint         # next lint --fix across app, components, lib, layouts, scripts
yarn analyze      # production build with the bundle analyzer enabled
```

There is no test runner configured in this repo (no `test` script, no test files) — don't assume Jest/Vitest is available.

Node >=22 is required (`engines` in package.json, `.nvmrc`). `postinstall` runs `scripts/patch-contentlayer.mjs`, which patches contentlayer's generated output (`node_modules/@contentlayer/core`) to use `with { type: 'json' }` instead of `assert { type: 'json' }` for JSON module imports — contentlayer 0.3.4 predates Node 22's import syntax. If content fails to load/build after a fresh `yarn install`, check that this patch actually ran.

Package manager is Yarn (berry, `packageManager: yarn@3.6.1`), but a `package-lock.json` also exists — prefer `yarn` for installs to stay consistent with `yarn.lock`.

Pre-commit (via husky) runs `lint-staged`: ESLint --fix on `*.{js,jsx,ts,tsx}` and Prettier --write on `*.{js,jsx,ts,tsx,json,css,md,mdx}`.

## Architecture

This is a Next.js 14 App Router site forked from the `tailwind-nextjs-starter-blog` template, serving as a personal portfolio/blog (mustafizkaifee.in).

**Content pipeline (Contentlayer):** MDX content under `data/` (`data/blog/**/*.mdx`, `data/authors/**/*.mdx`, `data/snippet/**/*.mdx`) is compiled by `contentlayer.config.ts` into typed objects imported from `contentlayer/generated`. Each document type (`Blog`, `Authors`, `Snippet`) gets computed fields (`slug`, `path`, `readingTime`, `toc`, `structuredData`) via remark/rehype plugins (KaTeX math, citations, syntax highlighting, autolinked headings). When `onSuccess` fires, it also writes `public/search.json` for the kbar search index (configured in `data/siteMetadata.js` under `search.kbarConfig`).

**Layout dispatch pattern:** Pages like `app/blog/[...slug]/page.tsx` and the snippet equivalent look up `allBlogs`/`allSnippets` from `contentlayer/generated`, then pick a React layout component (`PostSimple`, `PostLayout`, `PostBanner` in `layouts/`) based on the MDX frontmatter's `layout` field, defaulting to `PostLayout`. Actual MDX body rendering goes through `pliny`'s `MDXLayoutRenderer`, using the custom component map in `components/MDXComponents.tsx`.

**Site-wide config lives in `data/siteMetadata.js`**, not `config/`. It drives metadata, analytics provider selection (Umami is active; Google Analytics, Plausible, etc. are stubbed), the comments provider (giscus), the newsletter provider (pliny, buttondown), and search provider (kbar vs algolia). `app/api/newsletter/route.ts` is a thin wrapper around `pliny/newsletter`.

**`config/` vs `data/` is inconsistent — treat `data/` as the source of truth.** `data/projectsData.ts` is the live list rendered on `app/projects/page.tsx` and `app/Main.tsx`. `config/projects.ts` (and most of `config/`) defines a much richer `Project` type but its fields are almost entirely commented out and nothing imports it — don't extend `config/projects.ts` expecting it to take effect.

**Page view counting** (`app/api/increament/route.ts`, edge runtime) uses Upstash Redis: hashes the request IP with SHA-256 to dedupe repeat views per slug for 24h, then increments `pageviews:posts:<slug>`. Requires `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` env vars.

**Auth scaffolding exists but is empty/untracked:** `app/dashboard`, `app/login`, `app/protected`, `app/register`, and `app/api/auth/[...nextauth]` are empty directories not tracked in git (an `AUTH_SECRET` env var and NextAuth route folder exist, but no implementation). Don't assume there's working auth here — it hasn't been built yet.

**Image/media scripts:** `script/getImagePaths.ts` and the root `script.js` are standalone Node scripts (not part of the Next.js build) used to HEIC→JPG convert and list images for gallery pages (e.g. the travel/Japan photo galleries under `data/` and `public/static/images/`) — run manually, not wired into `yarn build`.

**Security headers** are centralized in `next.config.js` (`securityHeaders` array) rather than per-route; the CSP itself is defined but currently commented out there — if adding a new external script/analytics domain, that's where the CSP source lives even though it's not active.
