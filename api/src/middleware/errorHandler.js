const moment = require('moment');
const { NotFoundError } = require('../error/NotFoundError');
const logger = require('../util/logger')(module);

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  let {
    statusCode = 500, message, level = 'CRITICAL', code,
  } = error;
  if (error.response) {
    statusCode = error.response.status;
    if (error.response.data) {
      message = error.response.data.message;
      level = error.response.data.level;
      code = error.response.data.code;
    }
  }
  if (error.constructor === NotFoundError) statusCode = 404;
  logger.error(`Error while processing request : ${req.method} : ${req.originalUrl}`);
  logger.error(`Error: ${error.message}`);

  res.status(statusCode).json({
    message,
    level,
    timestamp: moment(),
    code,
  });
};
module.exports = errorHandler;
