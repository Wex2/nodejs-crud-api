import { TRouteList } from "../types";

export interface IUserRouter {
  getRoutes: TGetRoutes;
}

export type TGetRoutes = () => TRouteList;
