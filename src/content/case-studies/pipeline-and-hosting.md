---
title: "Build pipeline & hosting"
date: "2025-10-16"
summary: "CI steps, deploy targets, and the checks that keep it green."
tags: ["ci-cd","cloudflare","github-pages"]
slug: "pipeline-and-hosting"
series: "Tokens → Theme"
part: 3
---

## Build steps
1. **Generate theme**
   ~~~bash
   npm run build:tokens
   # emits src/theme/mantine-theme.ts
   ~~~
2. **Build app**
   ~~~bash
   npm run build
   # Vite → dist/
   ~~~

## Cloudflare Pages (recommended)
- **Build command:** `npm ci && npm run build:tokens && npm run build`
- **Output directory:** `dist`
- **Node:** `20`
- **SPA fallback:** `public/_redirects`
  ~~~
  /*  /index.html  200
  ~~~

## GitHub Pages gotcha (if you use it)
If deploying under a subpath, set Vite `base` or use a relative base; wrong base ⇒ blank page. Cloudflare (root) avoids this.

## Token validation gate (CI)
Fail fast when tokens are malformed:
~~~js
// tools/validate-tokens.mjs
import fs from "node:fs";
const t = JSON.parse(fs.readFileSync("tokens/tokens.json","utf8"));
const p = t?.brand?.colors?.primary || {};
const ok = Array.from({length:10},(_,i)=>p[String(i)]?.$value).every(Boolean);
if (!ok) { console.error("Primary scale must have 10 shades (brand.colors.primary.0..9)"); process.exit(1); }
console.log("✔ tokens valid");
~~~

## Local DX
- `npm run dev` runs the token watcher; edits to `tokens.json` hot-update the UI.
- Hard reload the tab if the browser caches CSS.

**Next:** [Operating the system (people, rules, rituals)](/case-studies/operating-model)
