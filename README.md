# C-Real

Marketing site for C-Real ApS, a Danish real estate investment firm. Built with React 19, TypeScript, Vite, Tailwind CSS v4 and Framer Motion.

## Development

```bash
npm install
npm run dev      # local dev server at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Deployment

Hosted on Cloudflare Pages, connected to this GitHub repository. Every push to `main` deploys to production.

Cloudflare Pages build settings (set in the project's dashboard under **Settings → Build**, not in a `wrangler.toml`):

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** (empty)

Node version is pinned via `.nvmrc`.

## Project structure

- `src/components/` — page sections, one component per section
- `src/components/ui/` — shared UI primitives (buttons, counters, etc.)
- `src/data/content.ts` — all site copy and structured content in one place
- `public/` — static assets (photos, team portraits, brand marks)
- `scripts/` — Playwright-based verification scripts used during development (screenshots, console-error checks); not part of the build
