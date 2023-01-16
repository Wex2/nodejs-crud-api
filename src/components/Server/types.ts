import { IncomingMessage, ServerResponse } from "http";

import { TRouteList } from "../../routers/types";
import Balancer from "../Balancer";
import Server from "./index";

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type TMethodHandlerList = {
  [key in Method]: keyof Server;
};
export type TMethodHandler = (route: string, handler: TRouteHandler) => void;

export type TRouteHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  data: string | null
) => void;

export type TRoutePair = [RegExp, TRouteHandler];
export type TMethodRouteTable = Array<TRoutePair>;
export type TRouteTable = { [k in Method]: TMethodRouteTable };

export type TListenServer = (
  response: IncomingMessage,
  request: ServerResponse
) => void;
export type TSetRoutes = (routes: TRouteList) => void;
export type TListen = (port: number, host: string, cb?: TCb) => void;
export type TSetBalancer = (balancer: Balancer) => void;
export type TGet = (route: string, handler: TRouteHandler) => void;
export type TPost = (route: string, handler: TRouteHandler) => void;
export type TPut = (route: string, handler: TRouteHandler) => void;
export type TDelete = (route: string, handler: TRouteHandler) => void;

export type TCb = () => void;

export type TTrimSlash = (str: string) => string;
export type TReplaceRoute = (route: string) => string;
export type TCreateReg = (route: string) => RegExp;
