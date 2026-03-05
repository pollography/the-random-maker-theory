# The Random Maker Theory

KI-News, Tools und Tutorials — explained by humans (and their AI friends).

A full-featured SvelteKit blog + podcast website with:
- Blog system (Markdown with mdsvex)
- Podcast episode management
- Dark Grain Moody + Claymorphism design system
- Tag-based content organization
- RSS feed & sitemap generation
- Theme toggle (light/dark)
- SEO-optimized with metadata

## Tech Stack

- **Frontend:** SvelteKit 5, Svelte 5 runes, Tailwind CSS 3
- **Content:** mdsvex (Markdown in Svelte)
- **Design System:** Custom CSS tokens + Tailwind extensions
- **Hosting:** Vercel (adapter-vercel)
- **Feed:** RSS with `feed` library

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## Build

```bash
npm run build
```

Preview with `npm run preview`.

## Project Structure

```
src/
├── lib/
│   ├── components/      # Reusable Svelte components
│   ├── design-system/   # CSS tokens & design
│   ├── stores/         # Svelte stores (theme)
│   ├── utils/          # Posts & episodes loaders
│   └── config.ts       # Site configuration
├── routes/             # SvelteKit routes & pages
├── content/
│   ├── blog/          # Blog posts (Markdown)
│   └── podcast/       # Podcast episodes (Markdown)
└── app.css            # Global styles
```

## Adding Content

### Blog Post

Create `/src/content/blog/my-post.md`:

```markdown
---
title: "Post Title"
slug: "my-post"
date: "2026-03-05"
description: "Short description for SEO"
tags: ["tag1", "tag2"]
category: "news"
draft: false
---

# Your content here
```

### Podcast Episode

Create `/src/content/podcast/001-episode.md`:

```markdown
---
title: "Episode Title"
slug: "001-episode"
episodeNumber: 1
date: "2026-03-05"
description: "Episode description"
audioUrl: "https://..."
duration: "25 min"
draft: false
---

# Show notes here
```

## Features

- ✅ Svelte 5 with runes ($props, $derived, $state)
- ✅ Markdown content with frontmatter
- ✅ Responsive design
- ✅ Dark mode by default
- ✅ RSS feed generation
- ✅ Sitemap & robots.txt
- ✅ Tag-based content organization
- ✅ Reading time estimation
- ✅ SEO meta tags

## Deployment

Deploy to Vercel with zero configuration:

```bash
vercel
```

Or use GitHub Actions / any CI/CD.

## License

MIT
