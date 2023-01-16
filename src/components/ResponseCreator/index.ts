import {
  IResponseCreator,
  StatusCode,
  TStatus200,
  TStatus201,
  TStatus204,
  TStatus400,
  TStatus404,
  TStatus500,
} from "./types";

class ResponseCreator implements IResponseCreator {
  status200: TStatus200 = (response, data) => {
    response.statusCode = StatusCode.SUCCESS;

    if (data !== undefined) {
      const json = JSON.stringify(data);

      response.setHeader("Content-Type", "application/json");
      response.end(json);
    } else {
      response.end();
    }
  };

  status201: TStatus201 = (response, data) => {
    response.statusCode = StatusCode.CREATED;

    if (data !== undefined) {
      const json = JSON.stringify(data);

      response.setHeader("Content-Type", "application/json");
      response.end(json);
    } else {
      response.end();
    }
  };

  status204: TStatus204 = (response): void => {
    response.statusCode = StatusCode.NO_CONTENT;

    response.end();
  };

  status400: TStatus400 = (response, message = "Bad Request") => {
    response.statusCode = StatusCode.BAD_REQUEST;
    response.setHeader("Content-Type", "application/json");

    const jsonMessage = JSON.stringify({
      message,
      statusCode: StatusCode.BAD_REQUEST,
    });

    response.end(jsonMessage);
  };

  status404: TStatus404 = (response, message = "Page Not Found") => {
    response.statusCode = StatusCode.PAGE_NOT_FOUND;
    response.setHeader("Content-Type", "application/json");

    const jsonMessage = JSON.stringify({
      message,
      statusCode: StatusCode.PAGE_NOT_FOUND,
    });

    response.end(jsonMessage);
  };

  status500: TStatus500 = (response, message = "Internal Server Error") => {
    response.statusCode = StatusCode.INTERNAL_SERVER_ERROR;
    response.setHeader("Content-Type", "application/json");

    const jsonMessage = JSON.stringify({
      message,
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
    });

    response.end(jsonMessage);
  };
}

export default ResponseCreator;
