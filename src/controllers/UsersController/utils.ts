import { TGetReqData } from "./types";

export const getReqData: TGetReqData = (request) => {
  return new Promise((response, reject) => {
    try {
      let body = "";

      request.on("data", (chunk) => {
        body += chunk.toString();
      });

      request.on("end", () => {
        try {
          const json = JSON.parse(body.toString());
          response(json);
        } catch {
          reject();
        }
      });
    } catch (error) {
      response(null);
    }
  });
};
