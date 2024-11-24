import { Given, When, Then } from "../fixtures";
import { expect } from "@playwright/test";
import { randomEmail } from "../../lib/helpers/randomiser";
import { userData } from "../../lib/data/mocks/userMocks";
import { createUserWithEmail } from "../../lib/helpers/apiHelper";
import { DataTable } from "playwright-bdd";
import { user_schema } from "../../lib/data/schemas/users";
import { validateSchema } from '../../lib/data/schemas/userSchema';

let createdUser: any;
let response: any;
let email: string;

Given("I have a random email", () => {
    email = randomEmail();
});

When("I create a user with the random email", async ({ userApi }) => {
    response = await userApi.createUser(userData.customUser({ email }));
    createdUser = response.body;
});

Then("the response should have status code {int}", ({}, statusCode) => {
    expect.soft(response.statusCode).toBe(statusCode);
});

Then("the response body should include:", async ({}, data: DataTable) => {
    const expectedValues = data.rowsHash();
    for (const [key, value] of Object.entries(expectedValues)) {
    expect.soft(createdUser[key]).toBe(value);
    }
});

Then("the email should match the created email", () => {
    expect.soft(createdUser.email).toBe(email);
});

Given("I have created a user", async ({ userApi }) => {
    createdUser = await createUserWithEmail(userApi);
});

When("I fetch the details of the user by ID", async ({ userApi }) => {
    response = await userApi.getUserById(createdUser.id);
});

Then("the response body should include the created user's details", () => {
    expect.soft(response.body.email).toBe(createdUser.email);
});

Given("I have updated user details with a new email", () => {
    email = randomEmail();
});

When("I update the user with the new details", async ({ userApi }) => {
    response = await userApi.fullUpdateUserById(
    userData.updateFieldsUser({ email }),
    createdUser.id
    );
    createdUser = response.body;
});

Given("I have updated only the email of the user", () => {
    email = randomEmail();
});

When("I update the user with the partial details", async ({ userApi }) => {
    const updatedFieldObject = {email: email};
    response = await userApi.updateUserById(updatedFieldObject, createdUser.id);
    createdUser = response.body;
});

When("I delete the user by ID", async ({ userApi }) => {
    response = await userApi.deleteUserById(createdUser.id);
});

Then("the email should match the updated email", () => {
    expect.soft(createdUser.email).toBe(email);
});

Given('I have access to the Users API', async () => {
    // No additional setup required, step included for readability
});

    When('I fetch the users\' data', async ({userApi}) => {
    response = await userApi.getUsers(); // Call the getUsers function
});

    Then('the response should match the defined user schema', async () => {
    expect(response).toBeDefined(); // Ensure the response is not undefined
    validateSchema(user_schema, response.body); // Validate the schema
});