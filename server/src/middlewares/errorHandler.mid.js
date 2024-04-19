import winston from "../utils/logger/winston.js";

const errorHandler = function errorHandler(error, req, res, next) {
  if (!error.statusCode || error.statusCode === 500) {
    error.statusCode = 500;
    winston.fatal(error.message);
  } else {
    winston.error(error.message);
  }
  let statusCode = error.statusCode || 500;
  let message = error.message;
  if (error.errors) {
    const validationErrors = Object.keys(error.errors).map((key) => ({
      field: key,
      message: error.errors[key].message,
    }));
    message += " - Validation Errors: " + JSON.stringify(validationErrors);
  }
  return res.json({
    statusCode,
    message,
  });
};

export default errorHandler;
