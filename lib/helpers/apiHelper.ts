import { APIResponse, expect } from "@playwright/test";
import { UserApi } from "../api/UserApi";
import { randomEmail } from "./randomiser";
import { userData } from "../data/mocks/userMocks";

export function validateErrorMessage(
  body: {},
  field: string,
  errorMessage: string
) {
  expect(body).toMatchObject([
    {
      field: field,
      message: errorMessage
    }
  ]);
}

export async function createUserWithEmail(userApi: UserApi) {
  const email = randomEmail();
  const { body: user } = await userApi.createUser(
    userData.customUser({ email: email })
  );
  return user;
}
