import { test as base } from "@playwright/test";
import { UserApi } from "./UserApi";

type ApiFixtures = {
  userApi: UserApi;
};

const fixtures = base.extend<ApiFixtures>({
  userApi: async ({ request }, use) => {
    const userApi = new UserApi(request);
    await use(userApi);
  }
});

export { fixtures };
