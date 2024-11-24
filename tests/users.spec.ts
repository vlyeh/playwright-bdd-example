import { expect } from "@playwright/test";
import { fixtures as test } from "../lib/api/apiFixtures";
import { randomEmail } from "../lib/helpers/randomiser";
import { createUserWithEmail } from "../lib/helpers/apiHelper";
import { userData } from "../lib/data/mocks/userMocks";

test.describe("Users test", () => {
  test("Create user", async ({ userApi }) => {
    const email = randomEmail();
    const response = await userApi.createUser(
      userData.customUser({ email: email })
    );
    expect.soft(response.status).toBeTruthy();
    expect.soft(response.statusCode === 201).toBeTruthy();
    expect.soft(Array.isArray(response.body)).toBeFalsy();
    expect.soft(response.body.gender).toBe("female");
    expect.soft(response.body.email).toBe(email);
    expect.soft(response.body.name).toBe("Custom name");
    expect.soft(response.body.status).toBe("active");
    expect(test.info().errors).toHaveLength(0);
  });

  test("Get user details", async ({ userApi }) => {
    const user = await createUserWithEmail(userApi);
    const response = await userApi.getUserById(user.id);
    expect.soft(Array.isArray(response.body)).toBeFalsy();
    expect.soft(response.statusCode === 200).toBeTruthy();
    expect.soft(response.body.email).toBe(user.email);
    expect(test.info().errors).toHaveLength(0);
  });

  test("Update full user details", async ({ userApi }) => {
    const user = await createUserWithEmail(userApi);
    const updatedEmail = randomEmail();
    const response = await userApi.fullUpdateUserById(
      userData.updateFieldsUser({ email: updatedEmail }),
      user.id
    );
    expect.soft(response.status).toBeTruthy();
    expect.soft(response.statusCode === 200).toBeTruthy();
    expect.soft(Array.isArray(response.body)).toBeFalsy();
    expect.soft(response.body.gender).toBe("male");
    expect.soft(response.body.email).toBe(updatedEmail);
    expect.soft(response.body.name).toBe("Updated user");
    expect.soft(response.body.status).toBe("inactive");
    expect(test.info().errors).toHaveLength(0);
  });

  test("Update only 1 user field", async ({ userApi }) => {
    const user = await createUserWithEmail(userApi);
    const updatedFieldObject = userData.updateEmail();
    const response = await userApi.updateUserById(updatedFieldObject, user.id);
    expect.soft(response.status).toBeTruthy();
    expect.soft(response.statusCode === 200).toBeTruthy();
    expect.soft(response.body.gender).toBe(user.gender);
    expect.soft(response.body.email).toBe(updatedFieldObject.email);
    expect.soft(response.body.name).toBe(user.name);
    expect.soft(response.body.status).toBe(user.status);
    expect(test.info().errors).toHaveLength(0);
  });

  test("Delete user", async ({ userApi }) => {
    const user = await createUserWithEmail(userApi);
    const response = await userApi.deleteUserById(user.id);
    expect(response.statusCode === 204).toBeTruthy();
  });
});
