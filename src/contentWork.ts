type FrontMatter = {
  title?: string;
  date?: string;
  summary?: string;
  tags?: string[];
  slug?: string;
  role?: string;
  org?: string;
  cover?: string;
  featured?: string | boolean;
};

const files = import.meta.glob("/src/content/work/**/*.md", {
  eager: true,
  as: "raw",
}) as Record<string, string>;

// minimal front-matter parser (same style as case studies)
function parseFM(raw: string): { a: FrontMatter; body: string } {
  if (!raw.startsWith("---")) return { a: {}, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { a: {}, body: raw };
  const fm = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).trim();
  const a: FrontMatter = {};
  fm.split("\n").forEach(line => {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) return;
    const k = m[1].trim(); let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1,-1);
    if (k === "tags") {
      const inner = v.replace(/^\[/,"").replace(/\]$/,"");
      (a as any).tags = inner.split(",").map(s=>s.trim().replace(/^["']|["']$/g,"")).filter(Boolean);
    } else {
      (a as any)[k] = v;
    }
  });
  return { a, body };
}

export type WorkItem = {
  slug: string;
  title: string;
  date?: string;
  summary?: string;
  tags?: string[];
  role?: string;
  org?: string;
  cover?: string;
  featured?: boolean;
  body: string;
};

function slugFromPath(p: string) {
  const file = p.split("/").pop() || "";
  return file.replace(/\.md$/i, "");
}

function byDateDesc(a?: string, b?: string) {
  return (b || "").localeCompare(a || "");
}

export function getAllWork(): WorkItem[] {
  const items = Object.entries(files).map(([path, raw]) => {
    const { a, body } = parseFM(String(raw));
    return {
      slug: String(a.slug ?? slugFromPath(path)),
      title: String(a.title ?? slugFromPath(path)),
      date: a.date || undefined,
      summary: a.summary || undefined,
      tags: a.tags || undefined,
      role: a.role || undefined,
      org: a.org || undefined,
      cover: a.cover || undefined,
      featured: String(a.featured ?? "").toLowerCase() === "true",
      body,
    };
  });
  items.sort((x,y)=>byDateDesc(x.date,y.date));
  return items;
}

export function getWork(slug: string) {
  return getAllWork().find(w => w.slug === slug);
}

export function getFeaturedWork(max = 3) {
  const all = getAllWork();
  const featured = all.filter(w => w.featured);
  return (featured.length ? featured : all).slice(0, max);
}
