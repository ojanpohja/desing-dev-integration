---
title: "Operating the system (people, rules, rituals)"
date: "2025-10-16"
summary: "RACI, governance, and checks to run tokens as a product."
tags: ["ops","governance","process"]
slug: "operating-model"
series: "Tokens → Theme"
part: 4
---

## Roles & decision rights
- **Design Lead**: owns visual language & token intent.
- **Token Steward (DesignOps)**: schema hygiene, reviews.
- **FE Lead**: token→UI mapping; co-approves changes.
- **Pipeline Engineer**: converters, CI gates, deploys.
- **BE Lead**: server surfaces (emails/PDFs) using tokens.
- **Accessibility Lead**: contrast & motion sign-off.
- **Product Owner**: prioritization & value capture.

## Governance
- **CODEOWNERS** on `/tokens/**` (Design + FE must approve).
- **Semantic versioning** for tokens (MAJOR/MINOR/PATCH).
- **Deprecation**: mark with `$deprecated` and keep for one minor release.
- **RFCs** for non-trivial schema changes (1-pager).

## Rituals
- Weekly design→dev review (30 min): open token MRs, visual diffs.
- Office hours (biweekly): adoption Q&A, migrations.
- Incident drill (quarterly): simulate bad token + rollback.

## Quality gates (CI)
- **Schema lint**: ensure 10 primary shades, core sizes present.
- **Contrast checks**: primary on white/surface meets WCAG (automate).
- **Visual smoke**: render critical components; diff screenshots.
- **Bundle limits**: block unexpected CSS growth.

## KPIs
- Lead time: design change → production.
- % UI on tokens (lint for raw hex/px).
- Contrast violations count.
- Rollbacks caused by tokens (aim low).

**Next:** [Implementation guide & troubleshooting](/case-studies/implementation-and-troubleshooting)
