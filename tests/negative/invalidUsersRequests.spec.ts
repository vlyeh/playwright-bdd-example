import { expect } from "@playwright/test";
import { fixtures as test } from "../../lib/api/apiFixtures";
import {
  createUserWithEmail,
  validateErrorMessage
} from "../../lib/helpers/apiHelper";
import { randomEmail } from "../../lib/helpers/randomiser";
import { userData } from "../../lib/data/mocks/userMocks";

test.describe("Users test negative scenarious", () => {
  const invalidEmail = ["Alice", "@", 1223];
  for (const emailInvalid of invalidEmail) {
    test(`Create user with wrong email: ${emailInvalid}`, async ({
      userApi
    }) => {
      const response = await userApi.createUser(
        userData.customUser({ email: emailInvalid })
      );
      expect(response.status).toBeFalsy();

      validateErrorMessage(response.body, "email", "is invalid");
    });
  }

  test("Create user with empty email", async ({ userApi }) => {
    const response = await userApi.createUser(
      userData.customUser({ email: "  " })
    );
    expect(response.statusCode === 422).toBeTruthy();
    validateErrorMessage(response.body, "email", "can't be blank");
  });

  test("Create user with existing email", async ({ userApi }) => {
    const email = randomEmail();
    const user = await userApi.createUser(
      userData.customUser({ email: email })
    );
    const wrongUserResponse = await userApi.createUser(
      userData.customUser({ email: email })
    );
    expect(wrongUserResponse.statusCode === 422).toBeTruthy();
    validateErrorMessage(
      wrongUserResponse.body,
      "email",
      "has already been taken"
    );
  });

  test("Create user with empty name", async ({ userApi }) => {
    const response = await userApi.createUser(
      userData.customUser({ name: "  " })
    );
    expect(response.statusCode === 422).toBeTruthy();
    validateErrorMessage(response.body, "name", "can't be blank");
  });

  test("Create user with empty status", async ({ userApi }) => {
    const response = await userApi.createUser(
      userData.customUser({ status: "  " })
    );
    expect(response.statusCode === 422).toBeTruthy();
    validateErrorMessage(response.body, "status", "can't be blank");
  });

  const invalidStatus = ["Alice", "@", 1223, {}, ["sdsd", "sdsd"]];
  for (const statusInvalid of invalidStatus) {
    test(`Create user with ${statusInvalid} status`, async ({ userApi }) => {
      const response = await userApi.createUser(
        userData.customUser({ status: statusInvalid })
      );
      expect(response.statusCode === 422).toBeTruthy();
      validateErrorMessage(response.body, "status", "can't be blank");
    });
  }

  const invalidGender = ["Alice", "@", 1223, "женский", " "];
  for (const gender of invalidGender) {
    test(`Create user with ${gender} gender`, async ({ userApi }) => {
      const response = await userApi.createUser(
        userData.customUser({ gender: gender })
      );
      expect(response.statusCode === 422).toBeTruthy();
      validateErrorMessage(
        response.body,
        "gender",
        "can't be blank, can be male of female"
      );
    });
  }

  test("Get  details of not existing user", async ({ userApi }) => {
    const response = await userApi.getUserById(1234);
    expect(response.statusCode === 404).toBeTruthy();
  });

  test("Retrieve posts when user does not exist", async ({ userApi }) => {
    const response = await userApi.getUserPosts(145);
    expect(response.statusCode === 200).toBeTruthy();
    expect(response.body.length).toBe(0);
  });

  test("Delete not existing user", async ({ userApi }) => {
    const response = await userApi.deleteUserById(123);
    expect(response.statusCode === 404).toBeTruthy();
  });

  //BUG: PUT incorrectly supports partial updates: https://www.ietf.org/rfc/rfc7231.txt
  test("Update only 1 user field using put method", async ({ userApi }) => {
    const user = await createUserWithEmail(userApi);
    const updatedFieldObject = userData.updateEmail();
    const response = await userApi.fullUpdateUserById(
      updatedFieldObject,
      user.id
    );
    expect.soft(response.statusCode === 404).toBeTruthy();
    expect(test.info().errors).toHaveLength(0);
  });
});
