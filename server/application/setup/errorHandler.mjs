import logger from "../../infrastructure/logger.mjs";
import HttpError from "../constants/HttpError.mjs";

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let stack = '';

  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    message = err.message;
    stack = err.stack;
  }
  
  logger.error({ error: message, stack });
  res.status(statusCode).jsonp({ error: message });
};

export default errorHandler;