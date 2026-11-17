// Minimal static file server for local development and e2e tests. No dependencies.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 8123);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('Invalid PORT env value; expected an integer 1-65535');
  process.exit(1);
}
const ALLOWED_HOSTS = new Set([`${host}:${port}`, `localhost:${port}`, host, 'localhost']);
const BLOCKED_DIRS = new Set(['Operation', 'node_modules', 'test-results', 'playwright-report']);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
};

createServer(async (req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, `http://${host}:${port}`).pathname);
  } catch {
    res.writeHead(400);
    res.end('Bad request');
    return;
  }
  const requestHost = (req.headers.host || '').toLowerCase();
  if (!ALLOWED_HOSTS.has(requestHost)) {
    res.writeHead(403);
    res.end('Forbidden host');
    return;
  }
  const segments = pathname.split('/').filter(Boolean);
  if (segments.some((s) => s.startsWith('.') || BLOCKED_DIRS.has(s))) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  const target = normalize(join(root, pathname.endsWith('/') ? join(pathname, 'index.html') : pathname));
  if (target !== root && !target.startsWith(root + sep)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  try {
    const body = await readFile(target);
    res.writeHead(200, { 'Content-Type': MIME[extname(target).toLowerCase()] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(port, host, () => {
  console.log(`Serving ${root} at http://${host}:${port}`);
});
