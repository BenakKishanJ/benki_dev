import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // `glob` loader: every .md/.mdx file under src/content/blog becomes an entry.
  // The filename (minus extension) becomes the entry's `id`, used for routing.
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Category drives the badge color — must match one of these four.
    category: z.enum(['system-design', 'dsa', 'error-fix', 'frameworks']),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    readingTime: z.string().optional(), // e.g. "6 min read" — auto-filled if omitted
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
