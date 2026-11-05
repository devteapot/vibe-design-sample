# Morrow

A fictional creative studio task app and its React design system. All people and projects are invented. There is no backend, authentication, API key, remote image, or environment variable.

## Run locally

Use Node 22 and pnpm 10.11.0.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3440. The product runs `next dev --turbopack -p 3440`. No UI build is required.

```sh
pnpm -r typecheck
pnpm --filter web build
```

## Two parts

- `packages/ui` is Morrow UI, package `@morrow/ui`. Its twelve public components use source exports, local Inter fonts from @fontsource, and Lucide icons. Root and per-component imports resolve the same component objects. `DESIGN.md` has version `"1.0"`; `tokens.json` matches the CSS variables.
- `apps/web` is Morrow, a Next.js 15 App Router product with React 19. Routes are `/`, `/items`, `/items/welcome-kit`, `/settings`, and the design-system catalog `/components`. Dynamic task routes export fixture IDs through `generateStaticParams`. Task creation, completion, search, filtering, and preferences work in memory. Client navigation retains task state; refreshing restores defaults.

The UI package is internal to this workspace. Next consumes its TypeScript through `transpilePackages: ["@morrow/ui"]`.

```tsx
import { Button } from '@morrow/ui';
// Or import the same object through its source subpath:
import { Button } from '@morrow/ui/button';
import '@morrow/ui/styles.css';
```

A UI `build` script remains available, but installation and development do not depend on dist files. Filtered library installation works independently:

```sh
pnpm install --frozen-lockfile --filter @morrow/ui...
```

## Import into vibe-design

1. Create a project in vibe-design.
2. **Design system:** repository `https://github.com/devteapot/vibe-design-sample`, branch `main`, package path `packages/ui`. Choose **Import components**, then **Capture in cloud**. A cloud agent installs the package, renders every component variant and imports `DESIGN.md` and `tokens.json`. It takes about 10 minutes.
3. **Product:** add a product with the same repository, branch `main`, package path `apps/web`. Choose **Import screens**, enter the routes `/, /items, /items/welcome-kit, /settings` and **Capture in cloud**. The agent runs the Next.js app with its built-in fixture data; no services, secrets or sign-in are needed.
4. Captured screens appear on the product's canvas page with Morrow UI components identified, so you can select a Button inside a screen, change its variant, or edit a component on the Design system page and propose the change.

## Browser checks

With Next development running, point the script at any installed Playwright package:

```sh
node scripts/verify-browser.cjs /path/to/node_modules/playwright /tmp/morrow-shots
```

The script checks all five routes, search, empty results, completed filtering, task creation and completion, preference controls, Escape dismissal, mobile overflow, and console errors. It saves screenshots and a JSON report outside the repository.

## License

MIT. React, Next.js, TypeScript, tsup, and Lucide use permissive licenses. Inter is OFL-1.1. No proprietary assets or service integrations are included.
