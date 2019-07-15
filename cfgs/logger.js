/*
 * Created by Kevo on 6/14/2016.
 */

const winston = require("winston");

// declare new winston instance & transports
let logger = new winston.Logger({
  level: "debug",
  transports: [
    new winston.transports.Console({
      prettyPrint: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: "./logs/all-logs.log",
      handleExceptions: true,
      prettyPrint: true
    })
  ]
});

winston.addColors({
  debug: "green",
  info: "cyan",
  silly: "magenta",
  warn: "yellow",
  error: "red"
});

// logger.info("test");
// logger.warn("test");
// logger.error("test");
// logger.debug("test");
// logger.silly("test");

module.exports = logger;
