import { IncomingMessage, ServerResponse } from "http";

export interface IBalancer {
  handle: THandle;
  addCluster: TAddCluster;
  getClusterNum: TGetClusterNum;
}

export type TAddCluster = (id: number) => void;
export type TGetClusterNum = () => number;
export type THandle = (req: IncomingMessage, res: ServerResponse) => void;
export type TChangeCluster = () => void;
