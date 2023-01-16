import { API_URL } from "../src/constants";
import config from "../src/configuration/default";

const { port, host } = config;

export const TEST_API = `http://${host}:${port}/${API_URL}`;
