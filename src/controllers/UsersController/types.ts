import { IncomingMessage, ServerResponse } from "http";

export interface IUsersController {
  getAllUsers: TGetAllUsers;
  getUser: TGetUser;
  createUser: TCreateUser;
  updateUser: TUpdateUser;
  deleteUser: TDeleteUser;
}

export type TGetReqData = (
  request: IncomingMessage,
) => Promise<{ [key: string]: any } | null>;

export type TGetAllUsers = (
  req: IncomingMessage,
  res: ServerResponse,
  data: string | null,
) => Promise<void>;

export type TGetUser = (
  req: IncomingMessage,
  res: ServerResponse,
  urlData: string | null,
) => Promise<void>;

export type TCreateUser = (
  req: IncomingMessage,
  res: ServerResponse,
  urlData: string | null,
) => Promise<void>;

export type TUpdateUser = (
  req: IncomingMessage,
  res: ServerResponse,
  urlData: string | null,
) => Promise<void>;

export type TDeleteUser = (
  req: IncomingMessage,
  res: ServerResponse,
  urlData: string | null,
) => Promise<void>;
