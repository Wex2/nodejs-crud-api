import { v4 as generateId } from "uuid";

import { IUserModel, TCreate, TUserData } from "./types";

class UserModel implements IUserModel {
  public id: string;
  public username: string;
  public age: number;
  public hobbies: Array<string>;

  private constructor(username: string, age: number, hobbies: Array<string>) {
    this.id = generateId();
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }

  public static create: TCreate = (data) => {
    if (typeof data !== "object") {
      return null;
    }

    const { username, age, hobbies } = data as TUserData;

    if (
      typeof username !== "string" ||
      typeof age !== "number" ||
      !Array.isArray(hobbies) ||
      !hobbies.every((value) => typeof value === "string")
    ) {
      return null;
    }

    return new UserModel(username, age, hobbies);
  };
}

export default UserModel;
