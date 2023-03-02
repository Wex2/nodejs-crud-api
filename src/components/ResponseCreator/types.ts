import { ServerResponse } from "http";

export enum StatusCode {
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,

  BAD_REQUEST = 400,
  PAGE_NOT_FOUND = 404,

  INTERNAL_SERVER_ERROR = 500,
}

export interface IResponseCreator {
  status200: TStatus200;
  status201: TStatus201;
  status204: TStatus204;
  status400: TStatus400;
  status404: TStatus404;
  status500: TStatus500;
}

export type TStatus200 = (response: ServerResponse, data?: {}) => void;
export type TStatus201 = (response: ServerResponse, data?: {}) => void;
export type TStatus204 = (response: ServerResponse) => void;
export type TStatus400 = (response: ServerResponse, message?: string) => void;
export type TStatus404 = (response: ServerResponse, message?: string) => void;
export type TStatus500 = (response: ServerResponse, message?: string) => void;
