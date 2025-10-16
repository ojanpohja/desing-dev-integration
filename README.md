# Design tokens → React (Mantine v7)

Single-source tokens in `tokens/tokens.json` generate a typed Mantine theme (`src/theme/mantine-theme.ts`).  
Design updates flow from tokens → build → app. Deploys run on Cloudflare Pages (or GitHub Pages).

---

## Features

- **One source of truth**: `tokens/tokens.json`
- **Generator**: Node script converts tokens → Mantine v7 theme
- **Hot reload**: token watcher during `npm run dev`
- **CI ready**: build tokens before app build/deploy
- **Minimal schema**: clear, designer-owned structure

---

## Quick start

```bash
npm ci
npm run build:tokens     # generates src/theme/mantine-theme.ts
npm run dev              # starts Vite + watches tokens
