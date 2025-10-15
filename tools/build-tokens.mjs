import fs from 'node:fs';


const SRC = 'tokens.json';
const OUT = 'src/styles/tokens.css';


if (!fs.existsSync(SRC)) {
console.error('tokens.json not found at repo root');
process.exit(1);
}


const raw = JSON.parse(fs.readFileSync(SRC, 'utf8'));


function collect(obj, path = [], acc = {}) {
for (const [k, v] of Object.entries(obj)) {
if (v && typeof v === 'object' && '$value' in v) {
acc[[...path, k].join('-')] = v.$value;
} else if (v && typeof v === 'object') {
collect(v, [...path, k], acc);
} else {
acc[[...path, k].join('-')] = v;
}
}
return acc;
}


const flat = collect(raw);


function resolveRefs(map) {
const byDot = Object.fromEntries(
Object.entries(map).map(([k, v]) => [k.replace(/-/g, '.'), v])
);
const re = /\{([^}]+)\}/g;


function resolveVal(val, stack = new Set()) {
if (typeof val !== 'string') return val;
return val.replace(re, (_, refPath) => {
if (stack.has(refPath)) return val;
const found = byDot[refPath] ?? map[refPath.replace(/\./g, '-')] ?? val;
stack.add(refPath);
return resolveVal(found, stack);
});
}


const out = {};
for (const [k, v] of Object.entries(map)) out[k] = resolveVal(v);
return out;
}


const finalMap = resolveRefs(flat);


let css = '/* Generated from tokens.json. Do not edit. */\n:root {\n';
for (const [name, value] of Object.entries(finalMap)) {
css += ` --${name}: ${value};\n`;
}
css += '}\n';


fs.mkdirSync('src/styles', { recursive: true });
fs.writeFileSync(OUT, css);
console.log(`✅ Wrote ${OUT}`);