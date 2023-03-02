import { Method } from "../../components/Server/types";
import UsersController from "../../controllers/UsersController";
import { TRouteList } from "../types";
import { IUserRouter, TGetRoutes } from "./types";

class UsersRouter implements IUserRouter {
  private userController: UsersController;

  private readonly routes: TRouteList;

  public constructor() {
    this.userController = new UsersController();

    this.routes = [
      [Method.GET, "users", this.userController.getAllUsers],
      [Method.GET, "users/*", this.userController.getUser],
      [Method.POST, "users", this.userController.createUser],
      [Method.PUT, "users/*", this.userController.updateUser],
      [Method.DELETE, "users/*", this.userController.deleteUser],
    ];
  }

  public getRoutes: TGetRoutes = () => this.routes;
}

export default UsersRouter;
