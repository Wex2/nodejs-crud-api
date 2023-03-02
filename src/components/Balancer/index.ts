import { TClusterData, TClusterDataList } from "../../types";
import Proxy from "../Proxy";
import {
  IBalancer,
  TAddCluster,
  TChangeCluster,
  TGetClusterNum,
  THandle,
} from "./types";

class Balancer implements IBalancer {
  private readonly clusterDataList: TClusterDataList;
  private readonly numOfClusters: number;
  private nextCluster: number;
  private clusterIds: Array<number> = [];

  public constructor(clusterDataList: TClusterDataList) {
    this.clusterDataList = clusterDataList;
    this.numOfClusters = clusterDataList.length;
    this.nextCluster = 0;
  }

  public addCluster: TAddCluster = (id) => {
    this.clusterIds.push(id);
  };

  public getClusterNum: TGetClusterNum = () => this.clusterIds.length;

  public handle: THandle = (req, res) => {
    const { host, port } = this.clusterDataList[
      this.nextCluster
    ] as TClusterData;

    if (!this.clusterIds.includes(this.nextCluster)) {
      this.changeCluster();
      this.handle(req, res);
      return;
    }

    new Proxy(req, res, port, host).start();

    this.changeCluster();

    return true;
  };

  private changeCluster: TChangeCluster = () => {
    if (this.nextCluster === this.numOfClusters - 1) {
      this.nextCluster = 0;
    } else {
      this.nextCluster++;
    }
  };
}

export default Balancer;
