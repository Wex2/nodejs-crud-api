import UsersRouter from "./UsersRouter";
import { IRouter, TGetRoutes, TRouteList } from "./types";

class Router implements IRouter {
  private readonly routes: TRouteList;

  constructor() {
    const usersRouter = new UsersRouter();

    const userRoutes = usersRouter.getRoutes();

    this.routes = [...userRoutes];
  }

  getRoutes: TGetRoutes = () => {
    return this.routes;
  };
}

export default Router;
