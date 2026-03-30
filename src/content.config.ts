import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/blog-posts" }),
	schema: z.object({
		title: z.string(),
		altTitle: z.string().optional(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		coverImage: z.string().optional(),
		category: z.string().optional(),
		draft: z.boolean().optional().default(false),
		isFeatured: z.boolean().optional().default(false),
	}),
});

const legal = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/legal" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		draft: z.boolean().optional().default(false),
	}),
});

export const collections = { blog, legal };
