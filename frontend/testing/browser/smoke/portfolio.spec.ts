import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Keep CI independent of hosted models and external providers; API fixtures use real localhost HTTP.
  await page.route("**/*", (route) => {
    const url = new URL(route.request().url());
    return url.hostname === "127.0.0.1" ? route.continue() : route.abort();
  });
});

test("supported collection → upload → evidence → decision → exact-version export → recovery", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "5 Series", exact: true }).click();
  await page.getByRole("combobox", { name: "Variant" }).selectOption("G60-i5-M60-xDrive");
  await page.getByRole("button", { name: "Explore G60" }).click();
  await expect(page).toHaveURL(/#workspace$/);
  await expect(page.getByRole("note", { name: "Synthetic contract harness" })).toBeVisible();
  await expect(page.getByLabel("Vehicle", { exact: true })).toHaveValue("g60-i5-m60");

  await page.getByLabel("Upload files").setInputFiles({
    name: "ci-synthetic-feedback.xlsx",
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    buffer: Buffer.from("Synthetic upload interaction fixture; never parsed as customer evidence."),
  });
  await expect(page.getByRole("button", { name: "Start analysis", exact: true })).toBeEnabled();
  const created = page.waitForResponse((response) =>
    response.url().endsWith("/api/v1/runs") && response.request().method() === "POST",
  );
  await page.getByRole("button", { name: "Start analysis", exact: true }).click();
  const response = await created;
  expect(response.status()).toBe(202);
  expect(response.request().postDataJSON().vehicle_id).toBe("g60-i5-m60");
  expect(response.headers()["x-request-id"]).toMatch(/^harness-/);
  await expect(page.getByText("proposals ready", { exact: true })).toBeAttached();

  await page.getByRole("region", { name: "Suggestions", exact: true })
    .getByRole("button", { name: "Review", exact: true }).first().click();
  const review = page.getByRole("dialog", { name: "Review suggestion" });
  await review.getByRole("button", { name: "Defer", exact: true }).click();
  await expect(review.getByRole("alert")).toHaveText("Add a decision note.");
  await review.getByText("Customer evidence", { exact: true }).click();
  await review.getByRole("button", { name: "Open source dashboard-E1", exact: true }).click();
  const source = page.getByRole("dialog", { name: "Source reference" });
  await expect(source).toContainText("Feedback, row 12, cells A12");
  await source.getByRole("button", { name: "Close source" }).click();
  await review.getByRole("textbox", { name: "Decision note" })
    .fill("Synthetic CI review: defer pending a scoped usability study.");
  await review.getByRole("button", { name: "Defer", exact: true }).click();
  await expect(review.getByRole("status")).toHaveText("Decision recorded");
  await review.getByRole("button", { name: "Close review", exact: true }).click();

  await page.getByRole("combobox", { name: "More review views" }).selectOption("History");
  await page.getByText("Decision note", { exact: true }).click();
  await expect(page.getByText("Synthetic CI review: defer pending a scoped usability study.", { exact: true })).toBeVisible();
  await page.getByText("Versions & exports", { exact: true }).click();
  await page.getByRole("button", { name: "Request exact-version export", exact: true }).click();
  const download = page.getByRole("link", { name: "Download authorized export" });
  await expect(download).toBeVisible();
  const artifactURL = new URL((await download.getAttribute("href"))!, page.url());
  expect(artifactURL.origin).toBe(new URL(page.url()).origin);
  const artifact = await page.request.get(artifactURL.href);
  expect(artifact.ok()).toBe(true);
  expect(await artifact.json()).toMatchObject({
    synthetic: true,
    proposal_set_version: 1,
    variant_ids: ["variant-digital"],
  });

  await page.reload();
  await expect(page.getByRole("combobox", { name: "More review views" })).toHaveValue("History");
  await expect(page.getByText("proposals ready", { exact: true })).toBeAttached();
  await page.getByText("Decision note", { exact: true }).click();
  await expect(page.getByText("Synthetic CI review: defer pending a scoped usability study.", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("browse-only trim cannot silently start analysis on a different baseline", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "5 Series", exact: true }).click();
  await page.getByRole("combobox", { name: "Variant" }).selectOption("G60-520i");
  await page.getByRole("button", { name: "Explore G60" }).click();
  await expect(page.getByText(/No baseline asset for this vehicle/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Add files", exact: true })).toBeDisabled();
  await expect(page.getByLabel("Vehicle", { exact: true })).not.toHaveValue("g60-i5-m60");
  await page.getByRole("button", { name: "Back to the BMW journey" }).click();
  await expect(page.getByRole("combobox", { name: "Variant" })).toHaveValue("G60-520i");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
