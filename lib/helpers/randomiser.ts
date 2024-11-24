import { faker } from "@faker-js/faker";

export function randomEmail() {
  return faker.internet.email();
}
