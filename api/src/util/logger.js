const config = require('config');
const winston = require('winston');
const moment = require('moment');

const loggers = {};

const getLoggerName = (info) => {
  if (info.filename) {
    const parts = info.filename.split('/');
    if (parts.length > 2) return `${parts[parts.length - 2]}/${parts.pop()}`;
    return info.filename;
  }
  return config.appName;
};
const tsFormat = () => moment().format('YYYY-MM-DD_HH:mm:ss:SSSS');
const logFormat = winston.format.printf((info) => `${JSON.stringify(info)}`);

const consoleTransport = new (winston.transports.Console)({
  level: config.logLevel,
  timestamp: tsFormat,
  colorize: true,
});

module.exports = (callingModule) => {
  const loggerName = getLoggerName(callingModule);
  if (loggers[loggerName]) return loggers[loggerName];

  const { format } = winston;

  const logger = winston.createLogger({
    format: format.combine(
      format.label({ label: loggerName }),
      format.timestamp(),
      logFormat,
    ),
    transports: [consoleTransport],
  });

  loggers[loggerName] = logger;
  return logger;
};
