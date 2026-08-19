const { test, expect } = require("@playwright/test");
const path = require("path");

test("Check home page text", async ({ page }) => {
  // Load the local index.html file directly in the browser
  const filePath = `file://${path.resolve(__dirname, "../index.html")}`.replace(/\\/g, "/");
  await page.goto(filePath);

  // Check that the header text is correct
  const header = page.locator("#header");
  await expect(header).toBeVisible();
  await expect(header).toContainText("Hello Bala, Welcome to the Live App");
});

