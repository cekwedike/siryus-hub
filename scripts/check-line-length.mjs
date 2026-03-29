import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const MAX = 1500;

const exts = new Set(['.astro', '.ts', '.tsx', '.js', '.mjs', '.css']);

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name === '.git') continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (exts.has(path.extname(name))) out.push(full);
  }
  return out;
}

const files = walk(path.join(root, 'src'));
const bad = [];

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/).length;
  if (lines > MAX) {
    bad.push({ file: path.relative(root, file), lines });
  }
}

if (bad.length) {
  console.error(`Files exceeding ${MAX} lines:`);
  for (const { file, lines } of bad) {
    console.error(`  ${lines}\t${file}`);
  }
  process.exit(1);
}

console.log(`check-line-length: OK (max ${MAX} lines, ${files.length} files scanned).`);
