import { faker } from "@faker-js/faker";
import { User } from "../../helpers/types";

const userData = {
  validUser: (): User => ({
    name: "Book Titleeer",
    gender: "female",
    email: faker.internet.email(),
    status: "active"
  }),

  //Use any to allow invalid data for testing
  customUser: (data: any): User =>
    ({
      name: data.name || "Custom name",
      gender: data.gender || "female",
      email: data.email || faker.internet.email(),
      status: data.status || "active"
    }) as User,

  updateFieldsUser: (data: Partial<User>): User => ({
    name: data.name || "Updated user",
    gender: data.gender || "male",
    email: data.email || faker.internet.email(),
    status: data.status || "inactive"
  }),

  updateEmail: () => ({
    email: faker.internet.email()
  })
};

export { userData };
