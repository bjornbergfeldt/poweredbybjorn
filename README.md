# Personal Blog (React + Vite + Markdown)

A modern, simple personal blog for articles about Power Platform, AI, and Data. Content is Markdown stored in the repository and loaded at build-time.

## Tech
- React + Vite + TypeScript
- Tailwind CSS + Typography
- `import.meta.glob` to collect Markdown posts
- `react-markdown` + `remark-gfm` + `rehype-slug` + `rehype-autolink-headings` + `rehype-prism-plus`

## Develop
```bash
npm install
npm run dev
```

## Writing posts
- Add `.md` files under `src/content/posts/`.
- Include frontmatter:

```md
---
title: My Post Title
description: Optional summary
date: 2025-11-04
tags: [power-platform, ai]
---

# Heading
Your content...
```

## Deploy (GitHub Pages)
1. If deploying to `https://<user>.github.io/<repo>`, set Vite base in env:
   - Create `.env` with `VITE_BASE_PATH=/REPO_NAME/`
2. Build and push the `dist` folder to Pages (e.g., via `actions-pages` or `gh-pages`).

- For a simple manual deploy:
```bash
npm run build
# serve `dist/` via GitHub Pages or any static host
```

## Notes
- Routes: `/` for list, `/post/:slug` for post detail
- Slug defaults to filename (without `.md`).

