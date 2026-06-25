import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for the accessibility (axe) end-to-end suite.
 * Tests live in ./e2e and run against a freshly booted `next dev` server.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    // basePath is '/sci-fi-crawl' (see next.config.ts), so the app is served under that path.
    baseURL: "http://localhost:3000/sci-fi-crawl/",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    // Health-check the basePath URL: the root path returns 404 under basePath, which
    // Playwright does not treat as "ready".
    url: "http://localhost:3000/sci-fi-crawl",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
