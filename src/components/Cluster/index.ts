import cluster, { Worker } from "cluster";

import config from "../../configuration/default";
import { clusterDataList } from "../../constants";
import { TClusterData } from "../../types";
import Balancer from "../Balancer";
import Log from "../Log";
import Server from "../Server";
import { ICluster, TStart } from "./types";

const log = Log.getLog();

const { port, host } = config;

class Cluster implements ICluster {
  private server: Server;
  private readonly port: number;
  private readonly host: string;
  private readonly isPrimary: boolean;

  private isStarted: boolean = false;

  constructor(server: Server, multi: boolean = false) {
    this.server = server;
    this.isPrimary = cluster.isPrimary;

    if (cluster.isPrimary) {
      this.port = port;
      this.host = host;

      log.clear();
      log.write(
        `SERVER: Server #${process.pid} is starting (HOST:${host}, PORT:${port})`
      );

      if (!multi) {
        return;
      }

      const balancer = new Balancer(clusterDataList);
      this.server.setBalancer(balancer);

      log.write("SERVER: Clustering is starting");
      log.write(`SERVER: Number of clusters: ${clusterDataList.length}`);

      clusterDataList.forEach(() => {
        const cl = cluster.fork();

        cl.on("message", (msg: string) => {
          if (msg === "ready") {
            balancer.addCluster(cl.id);
          }
        });
      });
    } else {
      const worker = cluster.worker as Worker;

      const { id } = worker;
      const { port, host } = clusterDataList[id - 1] as TClusterData;

      this.port = port;
      this.host = host;
    }
  }

  public start: TStart = () => {
    if (this.isStarted) {
      return;
    }

    if (this.isPrimary) {
      this.server.listen(this.port, this.host);
    } else {
      this.server.listen(this.port, this.host, () => {
        if (process.send !== undefined) {
          process.send("ready");
        }
      });
    }

    const executor: string = this.isPrimary ? "Server" : "Cluster";

    log.write(
      `SERVER: ${executor} #${process.pid} started (HOST:${this.host}, PORT:${this.port})`
    );

    this.isStarted = true;
  };
}

export default Cluster;
