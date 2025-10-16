import fs from 'node:fs';
import path from 'node:path';

const TOKENS_PATH = path.resolve('tokens/tokens.json');
const OUT_DIR = path.resolve('src/theme');
const OUT_FILE = path.join(OUT_DIR, 'mantine-theme.ts');

function readTokens() {
  const raw = fs.readFileSync(TOKENS_PATH, 'utf-8');
  return JSON.parse(raw);
}

function pick(obj, pathArray, fallback) {
  return pathArray.reduce((acc, key) => (acc && acc[key] ? acc[key] : undefined), obj) ?? fallback;
}

function value(node, fb) {
  return node ? (node.$value ?? node.value ?? fb) : fb;
}

function asNumber(x, fb) {
  const n = Number(x);
  return Number.isFinite(n) ? n : fb;
}

function buildTheme(tokens) {
  const core = tokens.core ?? {};
  const brand = tokens.brand ?? {};

  const fontFamily = value(
    pick(core, ['fontFamily', 'base']),
    'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif'
  );

  // fontSizes must be strings like "14px" in v7
  const fontSizes = {};
  for (const k of ['xs', 'sm', 'md', 'lg', 'xl']) {
    const v = pick(core, ['fontSizes', k]);
    if (v != null) {
      const n = asNumber(value(v, undefined), undefined);
      if (n != null) fontSizes[k] = `${n}px`;
    }
  }

  // spacing must be strings like "16px"
  const spacing = {};
  for (const k of ['xs', 'sm', 'md', 'lg', 'xl']) {
    const v = pick(core, ['spacing', k]);
    if (v != null) {
      const n = asNumber(value(v, undefined), undefined);
      if (n != null) spacing[k] = `${n}px`;
    }
  }

  // radius must be strings like "10px"
  const radius = {};
  for (const k of ['xs', 'sm', 'md', 'lg', 'xl']) {
    const v = pick(core, ['radius', k]);
    if (v != null) {
      const n = asNumber(value(v, undefined), undefined);
      if (n != null) radius[k] = `${n}px`;
    }
  }

  const primaryScale = value(pick(brand, ['palette', 'primary-scale']), null);
  const colors = {
    primary:
      Array.isArray(primaryScale) && primaryScale.length
        ? primaryScale
        : [
            '#e7eeff', '#cbdcff', '#a9c5ff', '#87adff', '#6998ff',
            '#4f86ff', '#3a79ff', '#2b6df5', '#245fe0', '#1b4bb8'
          ],
  };

  return {
    fontFamily,
    fontSizes: Object.fromEntries(Object.entries(fontSizes).filter(([, v]) => v != null)),
    spacing: Object.fromEntries(Object.entries(spacing).filter(([, v]) => v != null)),
    radius: Object.fromEntries(Object.entries(radius).filter(([, v]) => v != null)),
    colors,
    primaryColor: 'primary',
    defaultRadius: 'md',
  };
}

function writeThemeTs(theme) {
  const header = `// Auto-generated from tokens/tokens.json — do not edit by hand\n`;
  const body = `export const mantineTheme = ${JSON.stringify(theme, null, 2)} as const;\n`;
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, header + body, 'utf-8');
}

try {
  const tokens = readTokens();
  const theme = buildTheme(tokens);
  writeThemeTs(theme);
  console.log('✔ Generated', OUT_FILE);
} catch (err) {
  console.error('Failed to generate Mantine theme:', err);
  process.exit(1);
}
