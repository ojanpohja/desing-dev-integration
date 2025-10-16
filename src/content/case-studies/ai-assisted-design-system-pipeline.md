---
title: "Building a Design System Pipeline — A Designer’s AI-Assisted Journey"
date: "2025-10-16"
summary: "How a designer built a working design-to-code pipeline from local dev to GitHub and Cloudflare, with Storybook, tokens, and CI/CD — using AI as a co-pilot."
teaser: "From zero to CI/CD: Storybook + shared tokens + Cloudflare Pages, built by a designer with AI as a sparring partner."
tags: ["design systems", "tokens", "storybook", "cloudflare", "ci/cd", "learning"]
slug: "ai-assisted-design-system-pipeline"
coverImage: "/images/case-studies/ai-pipeline-hero.svg"
---

## Why this case

This case documents how a designer assembled a functioning design-to-code pipeline (local → GitHub Actions → Cloudflare Pages) where Storybook and the site share components and styles. It focuses on the *learning loop* and how AI accelerated configuration, debugging, and documentation. :contentReference[oaicite:0]{index=0} :contentReference[oaicite:1]{index=1}

## What we built (high level)

- **CI/CD:** local → GitHub Actions → Cloudflare Pages  
- **Docs:** Storybook as component documentation + shared styling source  
- **Tokens:** foundational (CSS) with plans to automate via Style Dictionary / Tokens Studio  
- **A11y:** preconfigured Storybook accessibility/testing addons  
- **Hosting:** Cloudflare serving `/` and `/storybook/` subpath

This proved the end-to-end path and highlighted environment parity and dependency pinning as key success factors. :contentReference[oaicite:2]{index=2}

## Challenges & fixes (short)

- **Case sensitivity / paths** on Linux CI → fix capitalization  
- **Private npm scope not published** → use local packages until registry/monorepo  
- **Build not triggering** → reconnect Cloudflare hooks + verify output dir  
- **Node drift** → lock version in CI  
- **Tokens not automated yet** → keep CSS for now; plan Style Dictionary/Token Studio next  
  :contentReference[oaicite:3]{index=3}

## Outcome

A maintainable, low-cost base (GitHub Actions + Cloudflare) and a designer-run pipeline. The major value was understanding how infrastructure, automation, and design systems intersect. :contentReference[oaicite:4]{index=4}
