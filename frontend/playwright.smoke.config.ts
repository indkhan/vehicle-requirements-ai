import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://127.0.0.1:5189";
const harness = (port: number) => ({
  command: `npm run dev:harness -- --port ${port} --strictPort`,
  url: `http://127.0.0.1:${port}`,
  reuseExistingServer: false,
  timeout: 60_000,
  env: {
    FRONTEND_CONTRACT_HARNESS: "1",
    VITE_CONTRACT_HARNESS: "true",
    VITE_API_MODE: "real",
    VITE_API_BASE_URL: "/api/v1",
    VITE_DEMO_WORKSPACE_ID: "standard_autonomous",
    VITE_DEMO_API_TOKEN: "harness-token",
  },
});

export default defineConfig({
  testDir: "./testing/browser/smoke",
  timeout: 60_000,
  workers: 1,
  retries: 0,
  forbidOnly: !!process.env.CI,
  outputDir: "./test-results/smoke",
  reporter: [
    ["list"],
    ["html", { outputFolder: "./playwright-report/smoke", open: "never" }],
  ],
  use: {
    baseURL,
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"], defaultBrowserType: "chromium", baseURL: "http://127.0.0.1:5190" },
    },
  ],
  // Each viewport gets its own in-memory fixture state; the harness has one run per workspace.
  webServer: [harness(5189), harness(5190)],
});
