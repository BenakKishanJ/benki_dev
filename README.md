# BenKi.dev

An Astro blog for build logs, leetcode/DSA notes, and interview prep, written by a recent grad shipping solo projects.

## How this project is put together

```
benki-dev/
├── astro.config.mjs        # integrations: @astrojs/mdx, @astrojs/sitemap
├── src/
│   ├── content.config.ts   # defines the `blog` content collection + schema
│   ├── content/blog/       # every .mdx post lives here — add new files to publish
│   ├── layouts/
│   │   ├── Layout.astro    # base HTML shell (nav, footer, fonts) used everywhere
│   │   └── BlogPost.astro  # wraps the rendered MDX body with the post header
│   ├── components/         # Nav, Footer, RevealScript (shared scroll animation)
│   ├── pages/
│   │   ├── index.astro     # homepage, pulls 4 most recent posts
│   │   ├── about.astro
│   │   └── blog/
│   │       ├── index.astro     # full post listing with client-side category filter
│   │       └── [...slug].astro # dynamic route: one page per MDX file
│   └── styles/global.css   # shared design tokens (colors, fonts) pulled from your HTML mocks
└── public/favicon.svg
```

## 1. Install and run

```bash
npm install
npm run dev
```

This opens the site at `http://localhost:4321`. Saved changes hot-reload.

## 2. How content collections work here

`src/content.config.ts` defines a `blog` collection using Astro's `glob()` loader, which
turns every `.mdx` (or `.md`) file in `src/content/blog/` into a typed entry. The schema
(via Zod) enforces frontmatter shape at build time — if you typo a category or forget a
required field, `astro check` / `astro dev` will tell you immediately instead of failing
silently or breaking at runtime.

```ts
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['system-design', 'dsa', 'error-fix', 'frameworks']),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    readingTime: z.string().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});
```

## 3. Adding a new blog post

Create a new `.mdx` file in `src/content/blog/`. The filename becomes the URL slug.

```bash
src/content/blog/my-new-post.mdx   →   /blog/my-new-post
```

Frontmatter template:

```mdx
---
title: "Your post title"
description: "One sentence for the card preview and SEO description."
category: "dsa" # system-design | dsa | error-fix | frameworks
pubDate: 2026-07-01
readingTime: "5 min read"
tags: ["leetcode", "arrays"]
draft: false
---

Write your post body here using normal Markdown — headings, code fences,
lists, blockquotes all work. You can also drop in Astro/React components
since this is MDX, e.g.:

import SomeChart from '../../components/SomeChart.astro';

<SomeChart />
```

That's it — no routing code to touch. The dynamic route at
`src/pages/blog/[...slug].astro` auto-generates a static page for every
entry in the collection, and it'll automatically show up on `/blog` and
(if recent enough) the homepage.

To pull a post down temporarily without deleting it, set `draft: true` in
its frontmatter — both the homepage and `/blog` filter drafts out.

## 4. Build & deploy

```bash
npm run build    # outputs static site to dist/
npm run preview  # preview the production build locally
```

`astro.config.mjs` has `site: 'https://benki.dev'` set so the sitemap
integration generates correct absolute URLs — update that to your real
domain before deploying. The output is a fully static `dist/` folder,
deployable to Vercel, Netlify, Cloudflare Pages, or any static host.
