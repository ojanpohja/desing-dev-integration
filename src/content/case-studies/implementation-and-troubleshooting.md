---
title: "Implementation guide & troubleshooting"
date: "2025-10-16"
summary: "Hands-on steps and fixes for the gotchas we met."
tags: ["how-to","troubleshooting"]
slug: "implementation-and-troubleshooting"
series: "Tokens → Theme"
coverImage: "/images/case-studies/applyingbrand.png"
thumbImage: "/images/case-studies/applyingbrand.png"
part: 5
---

## Implementation steps
1. **Add tokens**
   - Create `tokens/tokens.json` with `core` sizes and `brand.colors.primary.{0..9}`.
2. **Generator**
   - `tools/build-mantine-theme.mjs` reads tokens, emits `src/theme/mantine-theme.ts`.
   - Ensure sizes are emitted as **CSS strings** (e.g., `"16px"`).
3. **Wire the app**
   - Import `@mantine/core/styles.css`.
   - Wrap with `<MantineProvider theme={mantineTheme} defaultColorScheme="auto">`.
4. **Dev workflow**
   - `npm run dev` starts Vite and a token watcher (chokidar).
   - Edits to `tokens.json` regenerate the theme.
5. **Deploy**
   - Cloudflare Pages: `npm ci && npm run build:tokens && npm run build`, output `dist`.

## Common issues & fixes

### Build type errors (numbers vs strings)
**Symptom:** TypeScript errors for `spacing`, `radius`, or `fontSizes`.  
**Fix:** Mantine v7 expects strings; generator must convert numbers → `"px"`.

### Primary scale not applied
**Symptom:** UI still blue; theme fallback in generator.  
**Fix:** Ensure tokens live at `brand.colors.primary.{0..9}`. If your design tool nests sets (e.g., `brand/brand`), the generator must **scan all sets** or you should normalize the file.

### “Unexpected token in JSON”
**Symptom:** `build:tokens` fails parsing.  
**Fix:** Check for trailing commas, stray text, or merge markers in `tokens.json`.

### GitHub Pages blank screen
**Symptom:** Deployed HTML loads but assets 404.  
**Fix:** Vite `base` must match the repo subpath or use a relative base. (Cloudflare at root avoids this.)

### Case studies show “Not found”
**Symptom:** Routes render but content empty.  
**Fix:** Keep markdown under `/src/content/...` and use Vite `import.meta.glob` with `as: "raw"`. Avoid Node-only parsers in the browser.

## Extending coverage (next)
- Add `brand.colors.gray.{0..9}` and map to `theme.colors.gray`.
- Add semantic text/background tokens; wire into components or `theme.other`.
- Add heading sizes: map tokens → `theme.headings.sizes`.

---
_End of series. Jump back to the first article: [Why token-driven design](/case-studies/why-token-driven-design)._
