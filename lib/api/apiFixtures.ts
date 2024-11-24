import { test as base } from "@playwright/test";
import { UserApi } from "./UserApi";
import { DataTable } from "playwright-bdd";

type ApiFixtures = {
  userApi: UserApi;
  dataTable: DataTable;
};

const fixtures = base.extend<ApiFixtures>({
  userApi: async ({ request }, use) => {
    const userApi = new UserApi(request);
    await use(userApi);
  },
});

export { fixtures };

