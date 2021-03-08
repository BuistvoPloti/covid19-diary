const { log, logError } = require("../utils/logger.utils");
const { handleErrorResponse } = require("../utils/response-helpers");

const errorHandler = (err, _req, _res, next) => {
  logError(err.message || "Unknown error occurred. Error message was not specified.");
  return next();
};

const resourceNotFoundHandler = (req, res) => {
  const statusCode = 404;
  const errorDetail = {
    message: `Resource ${req.path} not found`,
  };
  logError(errorDetail);
  return handleErrorResponse(res, errorDetail, statusCode);
};

module.exports = {
  resourceNotFoundHandler,
  errorHandler
};
