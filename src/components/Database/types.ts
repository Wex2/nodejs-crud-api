import UserModel from "../../models/UserModel";
import Database from "./index";

export enum TableName {
  USERS = "USERS",
}

export type TTableValue<T extends TableName> = T extends TableName.USERS
  ? TUsersTable
  : never;

export type TTableOneValue<T extends TableName> = T extends TableName.USERS
  ? TUserData
  : never;

export type TTableValueAsArray<T extends TableName> = T extends TableName.USERS
  ? Array<TUserData>
  : never;

export type TTableData = TUserData;

export type TTable<T extends TTableData> = { [key: number]: T };

export type TUsersTable = TTable<TUserData>;

export type TUserData = {
  id: string;
  username: string;
  age: number;
  hobbies: Array<string>;
};

export type TPostData<T extends TableName> = T extends TableName.USERS
  ? UserModel
  : never;

export type TPutData<T extends TableName> = T extends TableName.USERS
  ? UserModel
  : never;

export type TGetTable = <T extends TableName>(
  tableName: T
) => Promise<TTableValue<T> | null>;

export type TUpdateTable = <T extends TableName>(
  tableName: T,
  data: TTableValue<T>
) => Promise<boolean>;

export interface IDatabase {
  get: TGet;
  post: TPost;
  put: TPut;
  delete: TDelete;
}

export type TGetDB = () => Database;

export type TClearDB = () => void;

export type TGet = <T extends TableName>(
  tableName: T,
  id?: number
) => Promise<TTableValueAsArray<T> | TTableOneValue<T> | null>;

export type TPost = <T extends TableName>(
  tableName: T,
  data: TPostData<T>
) => Promise<TPostData<T>>;

export type TPut = <T extends TableName>(
  tableName: T,
  id: number,
  data: TPutData<T>
) => Promise<TPutData<T> | null>;

export type TDelete = <T extends TableName>(
  tableName: T,
  id: number
) => Promise<boolean>;
