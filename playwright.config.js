import { defineConfig } from '@playwright/test';

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || '8123';
const baseURL = process.env.BASE_URL || `http://${host}:${port}`;

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    headless: true,
    viewport: { width: 360, height: 640 },
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  webServer: {
    command: 'node scripts/serve.mjs',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 15_000,
  },
});