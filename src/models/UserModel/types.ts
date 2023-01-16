import UserModel from "./index";

export type TUserData = {
  username: unknown;
  age: unknown;
  hobbies: unknown;
};

/*
  UserModel
 */

export interface IUserModel {}

/*
  Methods
 */

export type TCreate = (data: {}) => UserModel | null;
