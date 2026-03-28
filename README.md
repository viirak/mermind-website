# Mermind Website

This is the website for Mermind, a neutral operational intelligence layer for e-commerce. It is built with Astro and deployed on Cloudflare Pages.

## 🚀 Project Structure

```text
/
├── public/
│   └── mermind-icon.svg      # Favicon
├── src/
│   ├── actions/              # Astro server actions
│   │   ├── submitContact.ts  # Contact form handler
│   │   └── submitWaitList.ts # Waitlist form handler
│   ├── assets/               # Static assets
│   │   └── images/
│   │       └── covers/        # Blog post cover images
│   ├── blog-posts/           # Markdown blog content
│   ├── components/           # Reusable Astro components
│   │   ├── elements/         # Small, atomic UI components
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── FormField.astro
│   │   │   ├── Grid.astro
│   │   │   ├── Heading.astro
│   │   │   ├── Paragraph.astro
│   │   │   ├── Section.astro
│   │   │   └── ...
│   │   ├── Container.astro   # Max-width wrapper
│   │   ├── Header.astro      # Site header
│   │   ├── HeaderHero.astro  # Hero section
│   │   ├── Footer.astro      # Site footer
│   │   └── ...
│   ├── content.config.ts     # Content collection configuration
│   └── env.d.ts              # TypeScript declarations
├── astro.config.mjs          # Astro configuration
├── bun.lockb                 # Bun lockfile
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
├── wrangler.jsonc            # Cloudflare Pages configuration
└── .gitignore
```

## Development

```bash
bun run dev
```

## Deployment

```bash
bun run deploy
```

## Integrations

### Sequenzy

We use Sequenzy for email notifications and waitlist management. The API key and waitlist ID are stored in Cloudflare Workers as secrets and accessed via `env.SEQUENZY_API_KEY` and `env.SEQUENZY_WAITLIST_ID` respectively.

More at: [https://docs.sequenzy.com/introduction](https://docs.sequenzy.com/introduction)

## Blog

To add a new blog post, create a new markdown file in `src/blog-posts/` and add the frontmatter to the top of the file. The frontmatter should include the following keys:

```markdown
---
title: "Post Title"
altTitle: "Alternative Title"
description: "Post description"
pubDate: "2025-01-15"
coverImage: "/images/covers/file.jpg"
category: "logistics"
draft: false
isFeatured: false
---
```

The `coverImage` should be a path to an image in `src/assets/images/covers/`. The `category` should be one of the following: `logistics`, `observability`, or `product`.

The `draft` key should be set to `true` if the post is a draft and should not be published. The `isFeatured` key should be set to `true` if the post should be featured on the blog index page.

