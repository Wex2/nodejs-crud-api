import Log from "./index";

export type TGetLog = () => Log;

export type TWrite = (
  msg: string,
  newLine?: number,
  space?: number,
) => void;

export type TClear = () => void;
