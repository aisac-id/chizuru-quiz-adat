// Harness lint: 300 LoC limit per source file + forbidden code patterns. No dependencies.
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolveRoot();
const MAX_LOC = 300;
const SKIP_DIRS = new Set(['node_modules', '.git', 'test-results', 'playwright-report', 'assets', 'promo', 'Operation']);
const SOURCE_EXT = new Set(['.js', '.mjs', '.css', '.html']);
const FORBIDDEN = [
  { re: /\beval\s*\(/, why: 'eval is forbidden' },
  { re: /new\s+Function\s*\(/, why: 'new Function is forbidden' },
  { re: /document\.write\s*\(/, why: 'document.write is forbidden' },
  { re: /\.innerHTML\s*=\s*(?!['"]\s*['"])/, why: 'innerHTML with dynamic content is forbidden; use textContent' },
];

function resolveRoot() {
  return fileURLToPath(new URL('..', import.meta.url)).replace(/[\\/]+$/, '');
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) yield* walk(full);
    } else if (SOURCE_EXT.has(extname(entry.name))) {
      yield full;
    }
  }
}

function extname(name) {
  const i = name.lastIndexOf('.');
  return i < 0 ? '' : name.slice(i).toLowerCase();
}

const findings = [];
for await (const file of walk(root)) {
  const rel = relative(root, file).split(sep).join('/');
  const text = await readFile(file, 'utf8');
  const lines = text.split('\n');
  if (lines.length > MAX_LOC) findings.push(`${rel}: ${lines.length} lines (limit ${MAX_LOC})`);
  lines.forEach((line, i) => {
    for (const { re, why } of FORBIDDEN) {
      if (re.test(line)) findings.push(`${rel}:${i + 1}: ${why}`);
    }
  });
}

if (findings.length) {
  console.error('LINT: GAGAL\n' + findings.join('\n'));
  process.exit(1);
}
console.log('LINT: LULUS (300 LoC/file + forbidden patterns)');