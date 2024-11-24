import { Given, When, Then } from "../fixtures";
import { expect } from "@playwright/test";

Given("I amz on Playwright home page", async ({ page }) => {
  await page.goto("https://playwright.dev");
});

When("I clickz link {string}", async ({ page }, name: string) => {
  await page.getByRole("link", { name }).click();
});

Then("I seez in title {string}", async ({ page }, text: string) => {
  await expect(page).toHaveTitle(new RegExp(text));
});
