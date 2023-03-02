export type TClusterDataList = Array<TClusterData>;

export type TClusterData = {
  host: string;
  port: number;
  isReady: boolean;
};
