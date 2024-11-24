import { fixtures as test } from "../lib/api/apiFixtures";
import { validateSchema } from "../lib/data/schemas/userSchema";
import { user_schema } from "../lib/data/schemas/users";

test.describe("Schema validation tests", () => {
  test("Users schema validation", async ({ userApi }) => {
    const response = await userApi.getUsers();
    validateSchema(user_schema, response.body);
  });
});
