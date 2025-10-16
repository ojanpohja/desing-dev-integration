import fs from 'node:fs';
import path from 'node:path';

const TOKENS_PATH = path.resolve('tokens/tokens.json');
const OUT_DIR = path.resolve('src/theme');
const OUT_FILE = path.join(OUT_DIR, 'mantine-theme.ts');

function readTokens() {
  const raw = fs.readFileSync(TOKENS_PATH, 'utf-8');
  return JSON.parse(raw);
}
function pick(obj, pathArray, fb) {
  return pathArray.reduce((acc, key) => (acc && acc[key] != null ? acc[key] : undefined), obj) ?? fb;
}
function value(node, fb) { return node ? (node.$value ?? node.value ?? fb) : fb; }
function asNumber(x, fb) { const n = Number(x); return Number.isFinite(n) ? n : fb; }

// ---- helpers to generate a 10-step scale from a single hex ----
function hexToRgb(hex) {
  const m = hex.replace('#','').match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return null;
  return { r: parseInt(m[1],16), g: parseInt(m[2],16), b: parseInt(m[3],16) };
}
function rgbToHsl({r,g,b}) {
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  let h,s,l=(max+min)/2;
  if(max===min){ h=s=0; } else {
    const d=max-min;
    s = l>0.5 ? d/(2-max-min) : d/(max+min);
    switch(max){
      case r: h=(g-b)/d + (g<b?6:0); break;
      case g: h=(b-r)/d + 2; break;
      case b: h=(r-g)/d + 4; break;
    }
    h/=6;
  }
  return {h,s,l};
}
function hslToHex({h,s,l}) {
  function hue2rgb(p,q,t){ if(t<0)t+=1; if(t>1)t-=1;
    if(t<1/6) return p+(q-p)*6*t;
    if(t<1/2) return q;
    if(t<2/3) return p+(q-p)*(2/3-t)*6;
    return p;
  }
  let r,g,b;
  if(s===0){ r=g=b=l; } else {
    const q=l<0.5? l*(1+s) : l+s-l*s;
    const p=2*l-q;
    r=hue2rgb(p,q,h+1/3);
    g=hue2rgb(p,q,h);
    b=hue2rgb(p,q,h-1/3);
  }
  const toHex = x => ('0' + Math.round(x*255).toString(16)).slice(-2);
  return '#' + toHex(r) + toHex(g) + toHex(b);
}
function generateScale(baseHex) {
  const rgb = hexToRgb(baseHex);
  if (!rgb) return Array(10).fill(baseHex);
  const hsl = rgbToHsl(rgb);
  const stops = [0.97,0.92,0.86,0.78,0.68,0.58,0.50,0.44,0.38,0.32];
  return stops.map(L => hslToHex({ h: hsl.h, s: Math.min(1, hsl.s*1.02), l: L }));
}

function readPrimaryScale(tokens) {
  const core = tokens.core ?? {};
  const brand = tokens.brand ?? {};

  // 1) Tokens Studio shape: brand.colors.primary.{0..9}
  const primaryObj = pick(brand, ['colors','primary'], null);
  if (primaryObj && typeof primaryObj === 'object') {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      const t = primaryObj[String(i)];
      const hex = value(t, null);
      if (!hex) return null;
      arr.push(hex);
    }
    return arr;
  }

  // 2) Array shape: brand.palette.primary-scale.$value = [..10 hex]
  const arr = value(pick(brand, ['palette','primary-scale']), null);
  if (Array.isArray(arr) && arr.length === 10) return arr;

  // 3) Single color: core.Brand.primary (or core.brand.primary or core.colors.primary)
  const single =
    value(pick(core, ['Brand','primary']), null) ||
    value(pick(core, ['brand','primary']), null) ||
    value(pick(core, ['colors','primary']), null);
  if (single) return generateScale(single);

  return null;
}

function buildTheme(tokens) {
  const core = tokens.core ?? {};

  const fontFamily = value(
    pick(core, ['fontFamily','base']),
    'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif'
  );

  // fontSizes must be strings in Mantine v7
  const fontSizes = {};
  for (const k of ['xs','sm','md','lg','xl']) {
    const v = pick(core, ['fontSizes', k]);
    if (v != null) {
      const n = asNumber(value(v, undefined), undefined);
      if (n != null) fontSizes[k] = `${n}px`;
    }
  }

  // spacing must be strings in Mantine v7
  const spacing = {};
  for (const k of ['xs','sm','md','lg','xl']) {
    const v = pick(core, ['spacing', k]);
    if (v != null) {
      const n = asNumber(value(v, undefined), undefined);
      if (n != null) spacing[k] = `${n}px`;
    }
  }

  // radius must be strings in Mantine v7
  const radius = {};
  for (const k of ['xs','sm','md','lg','xl']) {
    const v = pick(core, ['radius', k]);
    if (v != null) {
      const n = asNumber(value(v, undefined), undefined);
      if (n != null) radius[k] = `${n}px`;
    }
  }

  const primaryScale = readPrimaryScale(tokens) ?? [
    '#e7eeff','#cbdcff','#a9c5ff','#87adff','#6998ff',
    '#4f86ff','#3a79ff','#2b6df5','#245fe0','#1b4bb8'
  ];

  return {
    fontFamily,
    fontSizes: Object.fromEntries(Object.entries(fontSizes).filter(([,v]) => v != null)),
    spacing:  Object.fromEntries(Object.entries(spacing ).filter(([,v]) => v != null)),
    radius:   Object.fromEntries(Object.entries(radius  ).filter(([,v]) => v != null)),
    colors: { primary: primaryScale },
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
