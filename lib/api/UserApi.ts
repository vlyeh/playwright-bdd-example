import { BaseApi } from "./BaseApi";
import { User } from "../helpers/types";

export class UserApi extends BaseApi {
  protected url = "users";

  getUsers() {
    return this.getAll<User>();
  }

  createUser(data: User) {
    return this.create(data);
  }

  getUserById(userId: number) {
    return this.get<User>(userId);
  }

  fullUpdateUserById(data: Partial<User>, userId: number) {
    return this.update(userId, "put", data);
  }

  updateUserById(data: Partial<User>, userId: number) {
    return this.update<Partial<User>>(userId, "patch", data);
  }

  deleteUserById(userId: number) {
    return this.remove(userId);
  }
}
