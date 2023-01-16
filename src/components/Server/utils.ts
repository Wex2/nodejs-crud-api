import { TCreateReg, TReplaceRoute, TTrimSlash } from "./types";


export const trimSlash: TTrimSlash = (str) => {
  return str.replaceAll(/^\/|\/$/g, "");
};

export const replaceRoute: TReplaceRoute = (route) => {
  return route.replace(/\/\*$/, "/(.+)");
};

export const createReg: TCreateReg = (route) => {
  const replaced: string = replaceRoute(route);

  return new RegExp(`^${replaced}$`);
};
