import { cpus } from "os";

import config from "./configuration/default";
import { TClusterData, TClusterDataList } from "./types";

const { host, port } = config;

export const API_URL: string = "api";

export const clusterDataList: TClusterDataList = cpus().map<TClusterData>(
  (_, index) => {
    return {
      host,
      port: port + 1 + index,
      isReady: false,
    };
  }
);
