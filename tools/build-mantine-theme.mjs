import fs from 'node:fs';
import path from 'node:path';

const TOKENS_PATH = path.resolve('tokens/tokens.json');
const OUT_DIR = path.resolve('src/theme');
const OUT_FILE = path.join(OUT_DIR, 'mantine-theme.ts');

function readTokens() {
  try {
    const raw = fs.readFileSync(TOKENS_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Warning: failed to parse tokens.json; using last known theme.', e.message);
    return {};
  }
}
function pick(obj, pathArray, fallback) {
  return pathArray.reduce((acc, key) => (acc && acc[key] ? acc[key] : undefined), obj) ?? fallback;
}
function value(node, fb) {
  if (!node) return fb;
  return node.$value ?? node.value ?? fb;
}
function asNumber(x, fb) {
  const n = Number(x);
  return Number.isFinite(n) ? n : fb;
}
function buildTheme(tokens) {
  const core = tokens.core ?? {};
  const brand = tokens.brand ?? {};

  const fontFamily = value(pick(core, ['fontFamily','base']), 'Inter, system-ui, sans-serif');

  const fontSizes = {};
  for (const k of ['xs','sm','md','lg','xl']) {
    const v = pick(core, ['fontSizes', k]);
    if (v) fontSizes[k] = asNumber(value(v, undefined), undefined);
  }

  const spacing = {};
  for (const k of ['xs','sm','md','lg','xl']) {
    const v = pick(core, ['spacing', k]);
    if (v) spacing[k] = asNumber(value(v, undefined), undefined);
  }

  const radius = {};
  for (const k of ['xs','sm','md','lg','xl']) {
    const v = pick(core, ['radius', k]);
    if (v) radius[k] = asNumber(value(v, undefined), undefined);
  }

  const primaryScale = value(pick(brand, ['palette','primary-scale']), null);
  const colors = {
    primary: Array.isArray(primaryScale) && primaryScale.length > 0
      ? primaryScale
      : ['#e7eeff','#cbdcff','#a9c5ff','#87adff','#6998ff','#4f86ff','#3a79ff','#2b6df5','#245fe0','#1b4bb8']
  };

  const theme = {
    fontFamily,
    fontSizes: Object.fromEntries(Object.entries(fontSizes).filter(([,v]) => v != null)),
    spacing: Object.fromEntries(Object.entries(spacing).filter(([,v]) => v != null)),
    radius: Object.fromEntries(Object.entries(radius).filter(([,v]) => v != null)),
    colors,
    primaryColor: 'primary',
    defaultRadius: radius.md ?? 10
  };
  return theme;
}
function writeThemeTs(theme) {
  const header = `// Auto-generated from tokens/tokens.json — do not edit by hand\n`;
  const body = `export const mantineTheme = ${JSON.stringify(theme, null, 2)} as const;\n`;
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, header + body, 'utf-8');
}
const tokens = readTokens();
const theme = buildTheme(tokens);
writeThemeTs(theme);
console.log('✔ Generated', OUT_FILE);
