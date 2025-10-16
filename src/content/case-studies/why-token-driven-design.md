---
title: "Why token-driven design (and what it unlocked)"
date: "2025-10-16"
summary: "Outcomes and proof from moving design decisions into tokens."
tags: ["case-study","design-tokens","outcomes"]
slug: "why-token-driven-design"
series: "Tokens → Theme"
coverImage: "/images/case-studies/brandcolors.png"
thumbImage: "/images/case-studies/brandcolors.png"
part: 1
---

## Executive summary
We migrated from hand-styled components to a **token-driven** system where design intent lives in a single JSON (`tokens/tokens.json`). A tiny generator builds a typed theme for the app, so **designers edit tokens** and **developers consume a theme**—no hex copy-paste, no scattered overrides.

## What changed (before → after)
- **Source of truth**
  - **Before:** brand colors & spacing scattered across Sketch, code, and docs.
  - **After:** one JSON file; designers own values, devs own mapping.
- **How styles land in code**
  - **Before:** manual CSS edits, PR ping-pong.
  - **After:** `npm run build:tokens` emits a typed `mantine-theme.ts`.
- **Speed & consistency**
  - **Before:** slow, error-prone, drift across pages.
  - **After:** consistent by construction; changes cascade across the app automatically.

## Concrete proof (the purple scale)
We defined `brand.colors.primary.{0..9}` as a 10-step scale (ending with `#200A58`), mapped it to the UI’s primary color, and watched Buttons, Cards, and Titles update without touching component code.

## Why this matters
- **Design–code parity:** tokens are the contract.
- **Lower maintenance:** fewer overrides, less CSS.
- **Safer changes:** CI validates token shape; deployments rebuild from the same source.
- **Scalable:** add more tokens (gray, typography, shadows) as needed.

## What’s in scope now
- Color scales, spacing, radius, font sizes, font family.
- A generator that accepts “real world” token shapes and produces a strict theme.

**Next:** [Architecture & token schema](/case-studies/architecture-and-schema)
