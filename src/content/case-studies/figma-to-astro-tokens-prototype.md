---
title: "Figma → Tokens → Astro: Direct Design-to-Code Prototype"
date: "2025-06-20"
summary: "A one-way, minimal pipeline that syncs Figma Tokens Studio to a static Astro site via CSS variables."
teaser: "Proved that Figma tokens can drive a live site automatically — before adopting a component framework."
tags: ["design systems", "tokens", "astro", "figma", "decap cms"]
slug: "figma-to-astro-tokens-prototype"
coverImage: "/images/case-studies/figma-astro-hero.svg"
---

This prototype connected **Figma Tokens Studio → GitHub (tokens.json) → Node script → CSS variables → Astro**. It validated that foundational tokens (color, spacing, type, radius) can drive a live website automatically, and highlighted the limits of running without a component framework. :contentReference[oaicite:5]{index=5} :contentReference[oaicite:6]{index=6}

## Architecture (one-way)

Figma (Tokens Studio) → GitHub (tokens.json) → Node converter → `tokens.css` → Astro imports → GitHub Pages deploy. :contentReference[oaicite:7]{index=7}

## Implementation (condensed)

- **Converter:** parses `tokens.json`, resolves refs/math, outputs `tokens.css` with `--token-name` custom properties. :contentReference[oaicite:8]{index=8}  
- **Site styles:** authored with `var(--token-name)` across components/layouts. :contentReference[oaicite:9]{index=9}  
- **Content:** Markdown + Decap CMS; Astro dynamic routes. :contentReference[oaicite:10]{index=10}  
- **CI/CD:** tokens build + Pages deploy via GitHub Actions. :contentReference[oaicite:11]{index=11}

## Outcome & limits

End-to-end worked and proved design-code parity for foundations. Limits: manual styling overhead, foundations-only token set, unidirectional flow. These led to adopting a UI framework in the next iteration. :contentReference[oaicite:12]{index=12}
