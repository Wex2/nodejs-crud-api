import detEnv from "dotenv";

import { TConfig } from "./types";

detEnv.config();

const config: TConfig = {
  // @ts-ignore
  multi: process.env["MULTI"] || false,
  env: process.env["NODE_ENV"] || "development",
  port: Number(process.env["PORT"]) || 8080,
  host: process.env["HOST"] || "localhost",
};

export default config;
