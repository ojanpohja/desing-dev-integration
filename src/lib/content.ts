import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { marked } from "marked";

// Resolve the absolute path to the repo's /content directory
const moduleDir = dirname(fileURLToPath(import.meta.url));
// src/lib/content.ts  ->  ../../content
const ROOT = path.resolve(moduleDir, "../../content");
const PAGES_DIR = path.join(ROOT, "pages");
const PROJECTS_DIR = path.join(ROOT, "projects");

export type Frontmatter = {
  title: string;
  date?: string;
  summary?: string;
  cover?: string;
  tags?: string[];
};

function read(mdPath: string) {
  const raw = fs.readFileSync(mdPath, "utf8");
  const { data, content } = matter(raw);
  const html = marked.parse(content);
  return { data: data as Frontmatter, body: html };
}

export function getPage(slug: string) {
  return read(path.join(PAGES_DIR, `${slug}.md`));
}

export function getAllProjects() {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".md"));
  const items = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const { data } = matter(fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8"));
    return { slug, data: data as Frontmatter };
  });
  return items.sort((a, b) => (b.data.date ?? "").localeCompare(a.data.date ?? ""));
}

export function getProjectBySlug(slug: string) {
  return read(path.join(PROJECTS_DIR, `${slug}.md`));
}
