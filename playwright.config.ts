import { defineConfig } from '@playwright/test';

// Configuration for the data‑driven testing examples. We set baseURL to
// GitHub's public API. The tests in this project call the API using
// Playwright's request context and demonstrate iterating over multiple
// datasets. GitHub's API is used because it reliably returns predictable
// data for known users【484780404485020†L20-L36】.
export default defineConfig({
  testDir: './tests',
  timeout: 20 * 1000,
  use: {
    baseURL: 'https://api.github.com',
    browserName: 'chromium',
    headless: true,
  },
  reporter: [['list'], ['html']],
});
