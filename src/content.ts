// src/content.ts
type FrontMatter = {
  title?: string;
  date?: string;
  summary?: string;
  tags?: string[];
  slug?: string;
  series?: string;
  part?: string | number;
  coverImage?: string;   // NEW: hero on the detail page
  coverAlt?: string;     // NEW: alt text for hero
  thumbImage?: string;   // NEW: card thumbnail
};

// Bundle all MD files under /src/content/case-studies as RAW text
const files = import.meta.glob("/src/content/case-studies/**/*.md", {
  eager: true,
  as: "raw",
}) as Record<string, string>;

// --- Tiny front-matter parser (no Node Buffer/polyfills) ---
function parseFrontMatter(raw: string): { attributes: FrontMatter; body: string } {
  if (!raw.startsWith("---")) return { attributes: {}, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { attributes: {}, body: raw };
  const fmBlock = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).trim();

  const attributes: FrontMatter = {};
  fmBlock.split("\n").forEach((line) => {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) return;
    const key = m[1].trim();
    let val = m[2].trim();
    // strip quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (key === "tags") {
      const inner = val.replace(/^\[/, "").replace(/\]$/, "");
      const parts = inner.split(",").map((s) => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
      (attributes as any)[key] = parts;
    } else {
      (attributes as any)[key] = val;
    }
  });

  // coerce part to number if present
  if (attributes.part != null) {
    const n = Number(attributes.part);
    if (!Number.isNaN(n)) attributes.part = n;
  }

  return { attributes, body };
}

// --- Types + helpers ---
export type CaseStudy = {
  slug: string;
  title: string;
  date?: string;
  summary?: string;
  tags?: string[];
  body: string;
  series?: string;
  part?: number;
  coverImage?: string;   // NEW
  coverAlt?: string;     // NEW
  thumbImage?: string;   // NEW
};

function slugFromPath(p: string) {
  const file = p.split("/").pop() || "";
  return file.replace(/\.md$/i, "");
}

function sortByDateDesc(a?: string, b?: string) {
  return (b || "").localeCompare(a || "");
}

export function getAllCaseStudies(): CaseStudy[] {
  const items = Object.entries(files).map(([path, raw]) => {
    const { attributes, body } = parseFrontMatter(String(raw));
    return {
      slug: String(attributes.slug ?? slugFromPath(path)),
      title: String(attributes.title ?? slugFromPath(path)),
      date: attributes.date || undefined,
      summary: attributes.summary || undefined,
      tags: attributes.tags || undefined,
      body,
      series: attributes.series || undefined,
      part: typeof attributes.part === "number" ? attributes.part : undefined,
      coverImage: attributes.coverImage || undefined,  // NEW
      coverAlt: attributes.coverAlt || undefined,      // NEW
      thumbImage: attributes.thumbImage || undefined,  // NEW
    };
  });

  // Default ordering on index: newest first
  items.sort((a, b) => sortByDateDesc(a.date, b.date));
  return items;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getAllCaseStudies().find((cs) => cs.slug === slug);
}

/** Find previous/next inside the same series (by `part`), or by date if no series. */
export function getSeriesNeighbors(slug: string): {
  prev?: CaseStudy;
  next?: CaseStudy;
  siblings: CaseStudy[];
  index: number;
} {
  const all = getAllCaseStudies();
  const current = all.find((cs) => cs.slug === slug);
  if (!current) return { siblings: [], index: -1 };

  let siblings: CaseStudy[];

  if (current.series) {
    // Only items from the same series, ordered by part (then date)
    siblings = all
      .filter((cs) => cs.series === current.series)
      .sort((a, b) => {
        const pa = a.part ?? 0;
        const pb = b.part ?? 0;
        if (pa !== pb) return pa - pb;
        return sortByDateDesc(a.date, b.date);
      });
  } else {
    // No series: use all, ordered by date
    siblings = [...all].sort((a, b) => sortByDateDesc(a.date, b.date));
  }

  const index = siblings.findIndex((s) => s.slug === slug);
  return {
    prev: index > 0 ? siblings[index - 1] : undefined,
    next: index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : undefined,
    siblings,
    index,
  };
}
