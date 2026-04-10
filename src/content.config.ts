import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    slug: z.string().optional(),
    tags: z.array(z.string()).default([]),
    lang: z.string().default('cs'),
    description: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    type: z.enum(['hardware', 'web', 'tool', 'library', 'community', 'speaking', 'hackathon']),
    url: z.string().optional(),
    github: z.string().optional(),
    image: z.string().optional(),
    thingiverse: z.string().optional(),
    printables: z.string().optional(),
    thesis: z.string().optional(),
    tags: z.array(z.string()).default([]),
    stars: z.number().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
