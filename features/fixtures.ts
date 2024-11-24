import { test as base, createBdd} from 'playwright-bdd';
import { UserApi } from "../lib/api/UserApi";

// type Fixtures = {
//   // set types of your fixtures
// };

export const test = base.extend<{
  userApi: UserApi;
}>({
  userApi: async ({ request }, use) => {
    const userApi = new UserApi(request); // Pass Playwright's `request` context to your API class
    await use(userApi)
  },
});

export const { Given, When, Then } = createBdd(test);
export { expect } from "@playwright/test";