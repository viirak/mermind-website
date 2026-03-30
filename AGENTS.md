# AGENTS.md

This guide documents everything agents need to know to work effectively in the Mermind website codebase.

## Project Overview

This is the official website for Mermind, a neutral operational intelligence layer for e-commerce. The site is built with Astro, deployed on Cloudflare Pages, and features a marketing homepage, blog system, contact forms, and informational pages about the product and company.

**Site URL**: https://mermind.ai

## Essential Commands

### Development
```bash
bun run dev           # Start local dev server at localhost:4321
```

### Build & Deployment
```bash
bun run build         # Build production site to ./dist/
bun run preview       # Build and preview locally with wrangler
bun run deploy        # Build and deploy to Cloudflare Pages
```

### Utilities
```bash
bun run astro --help  # View all Astro CLI options
bun run astro check   # Run Astro type checking
```

### Dependency Management
```bash
bun install           # Install dependencies
```

**Note**: This project uses Bun as the package manager, not npm or yarn.

## Project Structure

```
/
├── public/                    # Static assets (served directly)
│   └── mermind-icon.svg
├── src/
│   ├── actions/              # Astro server actions
│   │   └── submitContact.ts  # Contact form handler
│   ├── assets/
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
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── HeaderHero.astro
│   │   ├── ThemeMode.astro   # Dark/light mode toggle
│   │   └── WaitListForm.astro
│   ├── icons/                # SVG icon components
│   ├── pages/                # File-based routing
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── approach.astro
│   │   ├── contact.astro
│   │   └── blog/
│   │       ├── index.astro
│   │       ├── [id].astro    # Dynamic blog post pages
│   │       ├── rss.xml.js    # RSS feed generator
│   │       ├── archive/
│   │       │   └── [...page].astro
│   │       └── categories/
│   │           └── [category]/
│   │               └── [...page].astro
│   ├── Layout.astro          # Root layout with global styles
│   ├── content.config.ts     # Content collection configuration
│   └── env.d.ts              # TypeScript declarations
├── astro.config.mjs          # Astro configuration
├── bun.lockb                 # Bun lockfile
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
├── wrangler.jsonc            # Cloudflare Pages configuration
└── .gitignore
```

## Tech Stack and Dependencies

### Core Framework
- **Astro** (latest) - Modern static site generator with component islands
- **Node.js** >=22.12.0 - Required runtime

### Deployment & Runtime
- **@astrojs/cloudflare** (^13.1.2) - Cloudflare adapter for Astro
- **Wrangler** (^4.74.0) - Cloudflare Workers CLI tool
- Platform proxy enabled for local development

### Development
- **TypeScript** - Strict mode enabled via Astro's base config
- **@types/node** (^25.5.0) - Node.js type definitions

### Key Files
- `astro.config.mjs` - Astro config with Cloudflare adapter
- `wrangler.jsonc` - Cloudflare Pages deployment config
- `tsconfig.json` - Extends `astro/tsconfigs/strict`

## Component Architecture and Patterns

### Component Organization

**Layout Components** (`src/components/`)
- `Layout.astro` - Root layout with HTML structure, SEO meta tags, and global CSS variables
- `Container.astro` - Responsive max-width wrapper (optional `narrow` prop)
- `Header.astro` - Site header with configurable gradient backgrounds
- `HeaderHero.astro` - Hero section with slots for title, lead, CTA, and graphic
- `Footer.astro` - Site footer

**Element Components** (`src/components/elements/`)
- **Button.astro** - Primary, secondary, flat, outlined, and link variants with sizes (sm, md, lg)
- **Card.astro** - Content cards with optional padding, flat/styled variants
- **FormField.astro** - Form inputs (text, email, textarea, select) with validation styling
- **Grid.astro** - Responsive grid layouts
- **Heading.astro** - Typography for headings (h1-h6) with size variants
- **Paragraph.astro** - Text paragraphs with size and dimming options
- **Section.astro** - Layout sections with background patterns (dotted, paper-grid, stripes) and borders
- **Mark.astro** - Text highlight component
- **Breadcrumb.astro** - Navigation breadcrumbs
- **Pagination.astro** - Blog post pagination
- **SVG.astro** - Wrapper for inline SVG icons

**Feature Components** (`src/components/`)
- `PostCard.astro` - Blog post preview cards
- `TOC.astro` - Table of contents for blog posts
- `ThemeMode.astro` - Dark/light mode toggle button with persistence
- `WaitListForm.astro` - Waitlist email signup form
- `Logo.astro` / `LogoText.astro` - Logo components
- `HeaderBar.astro` - Navigation bar

### Component Patterns

**Props with Defaults**
```typescript
interface Props {
  variant?: "primary" | "secondary" | "flat" | "outlined" | "link";
  size?: "sm" | "md" | "lg";
}
const { variant = "flat", size = "md" } = Astro.props;
```

**Slot Usage**
Components use named slots for flexible composition:
- `<slot />` - Default slot
- `<slot name="header" />` - Named slot
- `<slot name="contentLeft" />` and `<slot name="contentRight" />` - Icon slots in buttons

**Conditional Rendering**
```astro
{condition && (
  <Component />
)}
```

**List Classes**
```astro
<div class:list={["base-class", condition && "conditional-class"]}>
```

**Props Spreading**
```astro
const { ...rest } = Astro.props;
<button {...rest}>Button</button>
```

## Styling System and Theme

### CSS Custom Properties (Design Tokens)

**Global CSS Variables** (defined in `Layout.astro`)

**Light Theme Variables** (`--light-color-*`)
- `--light-color-background`: #f1eeee
- `--light-color-background-lighter`: #ffffff
- `--light-color-background-darker`: #e0e8de
- `--light-color-background-limed`: #d3e6cc
- `--light-color-background-dimmed`: #e0d6d6dd
- `--light-color-background-highlight`: #f4cf58dd
- `--light-color-background-glass`: rgba(255, 255, 255, 0.7)
- `--light-color-text`: #1a1a1a
- `--light-color-text-dimmed`: #808080
- `--light-color-primary`: #555555
- `--light-color-primary-darker`: #444444
- `--light-color-secondary`: #555555
- `--light-color-danger`: #e53e3e
- `--light-color-border`: #ddddddca
- `--light-color-border-darker`: #ccccccca
- `--light-color-border-glass`: rgba(255, 255, 255, 0.3)
- `--light-color-surface`: #e8dede
- `--light-color-surface-lighter`: #eee2e2
- `--light-color-surface-darker`: #e0d3d3
- `--light-color-link`: var(--light-color-primary-darker)
- `--light-color-link-hover`: var(--light-color-primary)
- `--light-color-shadow`: rgba(0, 0, 0, 0.1)

**Dark Theme Variables** (`--dark-color-*`)
- `--dark-color-background`: #1a1a1a
- `--dark-color-background-lighter`: #2f2f2f
- `--dark-color-background-darker`: #000000
- `--dark-color-background-limed`: #25341a
- `--dark-color-background-dimmed`: #39393980
- `--dark-color-background-highlight`: #f4cf58dd
- `--dark-color-background-glass`: rgba(60, 60, 60, 0.6)
- `--dark-color-text`: #f5f5f5
- `--dark-color-text-dimmed`: #808080
- `--dark-color-primary`: #ffffff
- `--dark-color-primary-darker`: #f1f1f1
- `--dark-color-secondary`: #ffffff
- `--dark-color-danger`: #e53e3e
- `--dark-color-border`: #444444ca
- `--dark-color-border-darker`: #333333ca
- `--dark-color-border-glass`: rgba(255, 255, 255, 0.1)
- `--dark-color-surface`: #424242
- `--dark-color-surface-lighter`: #333333
- `--dark-color-surface-darker`: #505050
- `--dark-color-link`: var(--dark-color-primary-darker)
- `--dark-color-link-hover`: var(--dark-color-primary)
- `--dark-color-shadow`: rgba(0, 0, 0, 0.4)

### Theme Implementation

**Theme State Management**
- Uses `data-theme` attribute on `<html>` element
- Theme preference stored in `localStorage` with key `"theme"`
- `"themeSourceType"` tracks if theme was `"user"` choice or `"system"` preference
- Inline script in `<head>` prevents flash of incorrect theme (FOUC)

**Theme Modes**
- `[data-theme="dark"]` - Dark theme active
- `[data-theme="light"]` - Light theme active
- Default (no attribute) - Falls back to light theme variables

**Dynamic Theme Variables**
Components use the active theme variables without prefix:
```css
background: var(--color-background);
color: var(--color-text);
border: 1px solid var(--color-border);
```

### Global Styles

**Transitions**
All color changes have smooth 300ms transitions:
```css
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, fill 0.3s ease;
}
```

**Typography**
- Font family: Poppins (Google Fonts)
- Base font weight: 400
- Line height: 1.6rem

### Scoped Component Styles

**Style Tags with `define:vars`**
Components can accept CSS variables as props:
```astro
<style define:vars={{ color1, color2, background }}>
  header {
    background: var(--background);
  }
</style>
```

**Global Styles with `is:global`**
For styles that need to affect children or global selectors:
```astro
<style is:global>
  .section--header {
    display: flex;
  }
</style>
```

### Responsive Breakpoints

Used throughout the codebase:
- `min-width: 576px` - Small screens
- `min-width: 604px` - Small+ screens
- `min-width: 641px` - Medium screens
- `min-width: 818px` - Large screens (tablet/desktop)
- `min-width: 1041px` - Extra large screens
- `min-width: 1250px` - Full width (no padding on container)

## Content Management

### Blog Posts

**Location**: `src/blog-posts/`

**Frontmatter Schema** (defined in `src/content.config.ts`)
```yaml
---
title: "Post Title"                     # Required: string
altTitle: "Alternative Title"           # Optional: string
description: "Post description"         # Required: string
pubDate: "2025-01-15"                   # Required: Date (ISO format)
updatedDate: "2025-02-01"               # Optional: Date
coverImage: "/images/covers/file.jpg"   # Optional: string (path to image)
category: "logistics"                   # Optional: string
draft: false                            # Optional: boolean (default: false)
isFeatured: false                       # Optional: boolean (default: false)
---
```

**Content Collection**
- Defined in `src/content.config.ts` using Astro's content collections
- Loader: `glob({ pattern: "**/*.md", base: "./src/blog-posts" })`
- Schema validation with Zod

**Blog Features**
- Markdown rendering with Astro's `render()` function
- Cover images via Astro's `Image` component (optimized WebP format)
- RSS feed at `/blog/rss.xml`
- Category-based filtering
- Pagination for archives
- Featured post highlighting
- Table of contents generation from headings

## Routing and Pages

### File-Based Routing

Astro uses file-based routing in `src/pages/`:

**Static Routes**
- `index.astro` → `/`
- `about.astro` → `/about`
- `approach.astro` → `/approach`
- `contact.astro` → `/contact`
- `blog/index.astro` → `/blog`

**Dynamic Routes**
- `blog/[id].astro` → `/blog/:id` (individual blog posts)
- `blog/categories/[category]/[...page].astro` → `/blog/categories/:category/page/:page`
- `blog/archive/[...page].astro` → `/blog/archive/page/:page`

### Page Components

**Common Pattern**:
```astro
---
import Layout from "../Layout.astro";
import Header from "../components/Header.astro";
// Other imports...

const headerColor1 = "rgba(100, 100, 100, 0.1)";
const background = "linear-gradient(135deg, #aaddfc22, #eaedec22);";
---

<Layout title="Page Title" description="Description">
  <Header color1={headerColor1} background={background}>
    <HeaderHero title="Title" lead="Lead text" />
  </Header>
  <main>
    <Section>Content</Section>
  </main>
</Layout>
```

**Header Configuration**
Most pages configure header colors and backgrounds:
- `color1`, `color2`, `color3` - Gradient blob colors
- `linearColor1`, `linearColor2` - Linear gradient colors
- `background` - CSS background value

### Blog Post Pages (`blog/[id].astro`)

**Static Path Generation**:
```typescript
export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { id: post.id },
    props: { post },
  }));
}
```

**Content Rendering**:
```typescript
const { Content, headings } = await render(post);
```

**Layout**:
- Breadcrumb navigation
- Cover image display
- Table of contents in sidebar (desktop)
- Prose-styled markdown content

## Form Handling

### Astro Actions

**Location**: `src/actions/submitContact.ts`

**Action Definition**:
```typescript
const submitContact = defineAction({
  accept: "form",
  input: z.object({
    name: z.string().min(2).max(30).regex(/^[A-Za-z\s]+$/),
    email: z.email(),
    company: z.string().min(3).max(50).regex(/^[A-Za-z\s]+$/).optional(),
    subject: z.string().min(1),
    message: z.string().min(10).max(1000),
    website: z.string().optional(), // Honeypot field
  }),
  handler: async (input, context) => {
    // Form processing logic
  },
});
```

**Honeypot Protection**:
- Hidden `website` field in forms
- If filled, submission is silently rejected (bots only)

**Form Component Usage**:
```astro
---
import { actions } from 'astro:actions';
---

<form method="POST" action={actions.submitContact}>
  <FormField name="name" type="text" label="Name" required />
  <FormField name="website" type="text" class="hidden" />
  <Button type="submit">Submit</Button>
</form>
```

## Important Gotchas and Patterns

### Theme FOUC Prevention
- Inline script in `<head>` sets theme before CSS loads
- Never remove or modify the inline theme script

### Image Handling
- Cover images referenced from `src/assets/` in blog post frontmatter
- Use Astro's `<Image />` component for optimization
- Format set to WebP for all images

### Styling Specificity
- Component styles are scoped by default
- Use `:global()` for styles that need to escape scoping
- Theme variables are defined globally in `Layout.astro`

### Server Actions
- All forms use Astro Actions (not traditional POST endpoints)
- Actions defined in `src/actions/`
- Type-safe input validation with Zod schemas

### Content Collections
- Blog posts are NOT in `src/pages/blog/posts/` but in `src/blog-posts/`
- Content schema in `src/content.config.ts`
- Always check frontmatter matches schema

### TypeScript
- Strict mode enabled
- Type definitions for Cloudflare runtime in `src/env.d.ts`
- Interface props for all components

### Deployment
- Built for Cloudflare Pages
- Output directory: `./dist/`
- Requires Wrangler CLI for deployment
- Observability enabled in `wrangler.jsonc`

### SEO & Meta Tags
- All pages accept `title`, `description`, `canonicalUrl`, `ogImage` props
- Open Graph and Twitter Card meta tags included in Layout
- Google Analytics via Partytown (non-blocking)

### Component Reusability
- Element components in `src/components/elements/` are highly reusable
- Use props for configuration (variant, size, dimmed, etc.)
- Named slots for flexible composition

### Responsive Design
- Mobile-first approach
- Consistent breakpoints across components
- Container handles max-width at 1200px

### Copy and Content
- Website copy documented in `mermind-website.md` at project root
- Reference this file for content structure and messaging

## Development Workflow

### Creating a New Blog Post
1. Create markdown file in `src/blog-posts/`
2. Add frontmatter matching schema
3. Optional: Add cover image to `src/assets/images/covers/`
4. Post will automatically appear in blog index

### Adding a New Page
1. Create `.astro` file in `src/pages/`
2. Import Layout and components
3. Configure header colors/gradients
4. Add SEO meta tags via Layout props

### Modifying Components
1. Read existing component to understand props and patterns
2. Maintain consistent styling with CSS variables
3. Test in both light and dark themes
4. Ensure responsive behavior at breakpoints

### Styling Changes
1. Always use CSS custom properties (`var(--color-*)`)
2. Update variables in both light and dark themes
3. Test theme transitions
4. Consider contrast ratios in both themes

### Common Issues

**Theme Not Persisting**
- Check `localStorage` for `"theme"` and `"themeSourceType"`
- Verify inline script in `<head>` is present

**Form Not Submitting**
- Ensure Astro Actions are properly imported
- Check form `action` attribute references correct action
- Verify Zod schema matches form fields

**Images Not Loading**
- Check path in frontmatter matches actual file location
- Ensure image is in `src/assets/` for Astro Image component
- Verify file extension is correct

**Build Errors**
- Run `bun run astro check` for type errors
- Check content collections schema validation
- Verify all imports exist

## Testing

No test framework is currently configured. Manual testing is required:
- Run `bun run dev` for local development
- Test pages at `localhost:4321`
- Test theme toggle and persistence
- Test form submissions
- Test responsive behavior (browser dev tools)
- Build with `bun run build` before deployment

## File Naming Conventions

- **Components**: PascalCase (`Button.astro`, `HeaderHero.astro`)
- **Pages**: lowercase with hyphens for multi-word (`contact.astro`, `blog-posts/`)
- **Icons**: PascalCase with descriptive names (`ArrowRight.astro`, `SendIcon.astro`)
- **Blog Posts**: lowercase-with-hyphens.md (`when-shipping-become-easy.md`)
- **Images**: descriptive filenames, WebP format preferred

## Performance Considerations

- Astro builds static HTML by default (minimal JavaScript)
- Third-party scripts (Google Analytics) loaded via Partytown for non-blocking execution
- Images optimized through Astro's Image component (WebP format, lazy loading)
- CSS scoped to components to minimize unused styles
- Font preconnection for faster Google Fonts loading
- No client-side hydration for static content

## Deployment Requirements

- Cloudflare Pages account
- Wrangler CLI installed and authenticated
- Node.js >=22.12.0
- Bun package manager

**Deployment Command**: `bun run deploy`
