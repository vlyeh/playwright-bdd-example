import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig, cucumberReporter } from "playwright-bdd";
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.TOKEN);
console.log(process.env.ENV_URL);

const testDir = defineBddConfig({
  features: "features/**/*.feature",
  steps: "features/**/*.ts",
});

export default defineConfig({
  use: {
    baseURL: process.env.ENV_URL,
    extraHTTPHeaders: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: 'Bearer '+ process.env.TOKEN
    },
    screenshot: "on",
    trace: "on",
  },
  testDir,
  reporter: [
    cucumberReporter("html", {
      outputFile: "cucumber-report/index.html",
      externalAttachments: true,
      attachmentsBaseURL: "http://127.0.0.1:8080/data",
    }),
    ["html", { open: "never" }],
  ],
  projects: [
    {
      name: "api",
      use: { ...devices["REST API"] },
    },
  ],
});
