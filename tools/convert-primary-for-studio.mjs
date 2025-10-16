import fs from 'node:fs';

const path = 'tokens/tokens.json';
const json = JSON.parse(fs.readFileSync(path, 'utf-8'));
json.brand = json.brand || {};

function ensureTokenSetOrder(j) {
  j.$metadata = j.$metadata || {};
  j.$metadata.tokenSetOrder = Array.isArray(j.$metadata.tokenSetOrder) ? j.$metadata.tokenSetOrder : [];
  if (!j.$metadata.tokenSetOrder.includes('brand')) j.$metadata.tokenSetOrder.push('brand');
}

function hexToRgb(hex) {
  const m = hex.replace('#','').match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return null;
  return { r: parseInt(m[1],16), g: parseInt(m[2],16), b: parseInt(m[3],16) };
}
function rgbToHsl({r,g,b}) { r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b); let h,s,l=(max+min)/2;
  if(max===min){ h=s=0; } else { const d=max-min; s=l>0.5? d/(2-max-min) : d/(max+min);
    switch(max){ case r: h=(g-b)/d + (g<b?6:0); break; case g: h=(b-r)/d + 2; break; case b: h=(r-g)/d + 4; break; } h/=6; }
  return {h,s,l};
}
function hslToHex({h,s,l}) {
  function hue2rgb(p,q,t){ if(t<0)t+=1; if(t>1)t-=1;
    if(t<1/6) return p+(q-p)*6*t; if(t<1/2) return q; if(t<2/3) return p+(q-p)*(2/3-t)*6; return p; }
  let r,g,b;
  if(s===0){ r=g=b=l; } else { const q=l<0.5? l*(1+s) : l+s-l*s; const p=2*l-q;
    r=hue2rgb(p,q,h+1/3); g=hue2rgb(p,q,h); b=hue2rgb(p,q,h-1/3); }
  const toHex = x => ('0'+Math.round(x*255).toString(16)).slice(-2);
  return '#'+toHex(r)+toHex(g)+toHex(b);
}
function generateScale(hex) {
  const rgb = hexToRgb(hex); if (!rgb) return Array(10).fill(hex);
  const hsl = rgbToHsl(rgb);
  const stops = [0.97,0.92,0.86,0.78,0.68,0.58,0.50,0.44,0.38,0.32];
  return stops.map(L => hslToHex({ h: hsl.h, s: Math.min(1, hsl.s*1.02), l: L }));
}

// 1) try array at brand.palette.primary-scale
let scale = json?.brand?.palette?.['primary-scale']?.$value;
if (!Array.isArray(scale) || scale.length !== 10) {
  // 2) else single at core.Brand.primary / core.brand.primary / core.colors.primary
  const single = json?.core?.Brand?.primary?.$value
    || json?.core?.brand?.primary?.$value
    || json?.core?.colors?.primary?.$value;
  if (single) scale = generateScale(single);
}

if (!Array.isArray(scale) || scale.length !== 10) {
  console.error('Could not find a 10-shade primary scale or a single primary color to derive from.');
  process.exit(1);
}

json.brand.colors = json.brand.colors || {};
json.brand.colors.primary = {};
for (let i = 0; i < 10; i++) {
  json.brand.colors.primary[String(i)] = { "$type": "color", "$value": scale[i] };
}

ensureTokenSetOrder(json);
fs.writeFileSync(path, JSON.stringify(json, null, 2));
console.log('✔ Updated tokens/tokens.json with brand.colors.primary.{0..9}');
