import Cluster from "./components/Cluster";
import Server from "./components/Server";

import { API_URL } from "./constants";
import config from "./configuration/default";

const server = new Server(API_URL);

const { multi } = config;

const cluster = new Cluster(server, multi);
cluster.start();
