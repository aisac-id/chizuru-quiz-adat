// Anti-hardcode scan: detect secrets/credentials in committed code & config. No dependencies.
// Reports location + pattern name only; never prints matched secret values.
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url)).replace(/[\\/]+$/, '');
const SKIP_DIRS = new Set(['node_modules', '.git', 'test-results', 'playwright-report', 'assets', 'promo', 'Operation']);
const SKIP_FILES = new Set(['package-lock.json', '.env.example']);
const SCAN_EXT = new Set(['.js', '.mjs', '.css', '.html', '.json', '.yml', '.yaml', '.sh', '.cmd', '.ps1']);
const PATTERNS = [
  { name: 'private-key', re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  { name: 'aws-access-key', re: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: 'github-token', re: /\bgh[pousr]_[A-Za-z0-9]{36,}\b/ },
  { name: 'slack-token', re: /\bxox[baprs]-[A-Za-z0-9-]{10,}/ },
  { name: 'db-connection-string', re: /\b(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?):\/\/[^\s'"]*:[^\s'"]*@/ },
  { name: 'bearer-token', re: /\bBearer\s+[A-Za-z0-9_\-.=]{20,}/ },
  { name: 'assigned-secret', re: /\b(?:api[_-]?key|apikey|secret|token|password|passwd|pwd)\b\s*[:=]\s*['"][A-Za-z0-9_\-./+]{16,}['"]/i },
];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) yield* walk(full);
    } else {
      const i = entry.name.lastIndexOf('.');
      const ext = i < 0 ? '' : entry.name.slice(i).toLowerCase();
      if (SCAN_EXT.has(ext) && !SKIP_FILES.has(entry.name)) yield full;
    }
  }
}

const findings = [];
for await (const file of walk(root)) {
  const rel = relative(root, file).split(sep).join('/');
  const text = await readFile(file, 'utf8');
  text.split('\n').forEach((line, i) => {
    for (const { name, re } of PATTERNS) {
      if (re.test(line)) findings.push(`${rel}:${i + 1}: pattern ${name}`);
    }
  });
}

if (findings.length) {
  console.error('CHECK-HARDCODE: GAGAL\n' + findings.join('\n'));
  process.exit(1);
}
console.log('CHECK-HARDCODE: LULUS (no secrets detected in code/config)');