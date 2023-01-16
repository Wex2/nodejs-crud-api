import {
  ClientRequest,
  IncomingMessage,
  RequestOptions,
  ServerResponse,
  request,
} from "http";

import { IProxy, TStart } from "./types";

class Proxy implements IProxy {
  private readonly options: RequestOptions;
  private readonly res: ServerResponse;
  private req: IncomingMessage;
  private isStarted: boolean;

  constructor(
    req: IncomingMessage,
    res: ServerResponse,
    port: number,
    hostname: string,
  ) {
    this.req = req;
    this.res = res;
    this.options = {
      hostname: hostname,
      port: port,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };
    this.isStarted = false;
  }

  public start: TStart = () => {
    if (this.isStarted) {
      return;
    }

    const clientReq: ClientRequest = request(this.options, (clientRes) => {
      if (clientRes.statusCode === undefined) {
        return;
      }

      this.res.writeHead(clientRes.statusCode, clientRes.headers);

      clientRes.pipe(this.res, { end: true });
    });

    this.req.pipe(clientReq);
    this.isStarted = true;
  };
}

export default Proxy;
