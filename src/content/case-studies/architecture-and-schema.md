---
title: "Architecture & token schema"
date: "2025-10-16"
summary: "From Tokens Studio JSON to a typed Mantine theme."
tags: ["architecture","schema","mantine"]
slug: "architecture-and-schema"
series: "Tokens → Theme"
part: 2
---

## System at a glance
~~~
Design (Tokens Studio/Sketch)
           │  (push/pull)
           ▼
tokens/tokens.json (Git)
           │  node tools/build-mantine-theme.mjs
           ▼
src/theme/mantine-theme.ts (typed)
           │  <MantineProvider theme={...}>
           ▼
Live UI (React, Mantine v7)
~~~

## Canonical token schema (minimal)
~~~json
{
  "core": {
    "spacing": { "xs": {"$value": 4}, "sm": {"$value": 8}, "md": {"$value": 16}, "lg": {"$value": 24}, "xl": {"$value": 32} },
    "radius":  { "sm": {"$value": 6}, "md": {"$value": 10}, "lg": {"$value": 16} },
    "fontSizes": { "sm": {"$value": 14}, "md": {"$value": 16}, "lg": {"$value": 20}, "xl": {"$value": 28} },
    "fontFamily": { "base": {"$value": "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif"} }
  },
  "brand": {
    "colors": {
      "primary": {
        "0": {"$value": "#f2f1f9"},
        "1": {"$value": "#f2f1f9"},
        "2": {"$value": "#f2f1f9"},
        "3": {"$value": "#f2f1f9"},
        "4": {"$value": "#f2f1f9"},
        "5": {"$value": "#e6e3f3"},
        "6": {"$value": "#cbc3e6"},
        "7": {"$value": "#9e83f5"},
        "8": {"$value": "#5236ab"},
        "9": {"$value": "#200a58"}
      }
    }
  }
}
~~~

## Mapping (tokens → Mantine v7)
| Token key                             | Theme target                     | Notes                      |
|--------------------------------------|----------------------------------|----------------------------|
| `core.spacing.{xs..xl}`              | `theme.spacing.{xs..xl}`         | emitted as `"px"` strings |
| `core.radius.{sm..lg}`               | `theme.radius.{sm..lg}`          | emitted as `"px"` strings |
| `core.fontSizes.{sm..xl}`            | `theme.fontSizes.{sm..xl}`       | emitted as `"px"` strings |
| `core.fontFamily.base`               | `theme.fontFamily`               |                            |
| `brand.colors.primary.{0..9}`        | `theme.colors.primary[0..9]`     | 10-step brand scale        |
| —                                    | `theme.primaryColor = "primary"` |                            |
| —                                    | `theme.defaultRadius = "md"`     |                            |

## Generator design principles
- **Forgiving in**: accepts nested sets or single base color; can synthesize a scale.
- **Strict out**: always emits Mantine-correct types (strings for sizes).
- **Small & transparent**: easy to audit and extend.

**Next:** [Build pipeline & hosting](/case-studies/pipeline-and-hosting)
