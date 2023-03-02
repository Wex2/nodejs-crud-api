import { Server as THttpServer, createServer } from "http";

import Router from "../../routers";
import Balancer from "../Balancer";
import Log from "../Log";
import ResponseCreator from "../ResponseCreator";
import {
  Method,
  TDelete,
  TGet,
  TListenServer,
  TMethodHandler,
  TMethodHandlerList,
  TMethodRouteTable,
  TPost,
  TPut,
  TRouteHandler,
  TRouteTable,
  TSetBalancer,
  TSetRoutes,
  TListen,
} from "./types";
import { createReg, trimSlash } from "./utils";
import cluster from "cluster";

const log = Log.getLog();

const methodHandlerList: TMethodHandlerList = {
  [Method.GET]: "get",
  [Method.POST]: "post",
  [Method.PUT]: "put",
  [Method.DELETE]: "delete",
};

class Server {
  private readonly rc: ResponseCreator;
  private readonly baseUrl: string;

  private readonly server: THttpServer;
  private balancer: Balancer | null = null;

  private isStarted: boolean = false;
  private routeTable: TRouteTable = {
    [Method.GET]: [],
    [Method.POST]: [],
    [Method.PUT]: [],
    [Method.DELETE]: [],
  };

  public constructor(baseUrl: string) {
    this.rc = new ResponseCreator();
    this.server = createServer(this.listenServer);
    this.baseUrl = baseUrl;

    const router = new Router();
    const routes = router.getRoutes();
    this.setRoutes(routes);
  }

  private listenServer: TListenServer = (response, request) => {
    const { method, url } = response;

    if (this.balancer !== null && this.balancer.getClusterNum() !== 0) {
      this.balancer.handle(response, request);

      return;
    }

    if (method === undefined || url === undefined) {
      this.rc.status404(request, "Endpoint Not Found");

      return;
    }

    const trimmedUrl = trimSlash(url);

    const handlerName: string = cluster.isPrimary ? "Server" : "Cluster";

    // LOGGING
    const pid = process.pid;
    log.write(
      `SERVER: Request for ${handlerName} #${pid} METHOD: "${method}"; API: "${trimmedUrl}">>`
    );

    const routeTable: TMethodRouteTable = this.routeTable[method as Method];

    const route = routeTable.find(([reg, _handler]) => reg.test(trimmedUrl));

    if (route === undefined) {
      this.rc.status404(request, "Endpoint Not Found");

      return;
    }

    const handler: TRouteHandler = route[1];
    const routeData = route[0].exec(trimmedUrl);

    handler(
      response,
      request,
      (routeData === null ? null : routeData[1]) || null
    );
  };

  private setRoutes: TSetRoutes = (routes) => {
    routes.forEach(([method, url, handler]) => {
      const methodHandler = this[methodHandlerList[method]] as TMethodHandler;

      methodHandler(url, handler);
    });
  };

  public listen: TListen = (port, host, cb) => {
    if (this.isStarted) {
      return;
    }

    this.server.listen(port, host, cb);
    this.isStarted = true;
  };

  public setBalancer: TSetBalancer = (balancer) => {
    this.balancer = balancer;
  };

  public get: TGet = (route, handler) => {
    const trimmed: string = trimSlash(route);
    const routeUrl = `${this.baseUrl}/${trimmed}`;

    this.routeTable[Method.GET].push([createReg(routeUrl), handler]);
  };

  public post: TPost = (route, handler) => {
    const trimmedRoute = trimSlash(route);
    const routeUrl = `${this.baseUrl}/${trimmedRoute}`;

    this.routeTable[Method.POST].push([createReg(routeUrl), handler]);
  };

  public put: TPut = (route, handler) => {
    const trimmedRoute = trimSlash(route);
    const routeUrl = `${this.baseUrl}/${trimmedRoute}`;

    this.routeTable[Method.PUT].push([createReg(routeUrl), handler]);
  };

  public delete: TDelete = (route, handler) => {
    const trimmedRoute = trimSlash(route);
    const routeUrl = `${this.baseUrl}/${trimmedRoute}`;

    this.routeTable[Method.DELETE].push([createReg(routeUrl), handler]);
  };
}

export default Server;
