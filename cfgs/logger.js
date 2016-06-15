/*
 * Created by Kevo on 6/14/2016.
 */

const winston = require("winston"),
	  fs      = require("fs");

// creates log file if it doesn't exist on server start
// if (!fs.existsSync(process.cwd() + "/logs/all-logs.log")) {
// 	fs.writeFileSync(process.cwd() + "/logs/all-logs.log");
// }

// declare new winston instance & transports
var logger = new(winston.Logger) ({
	level: "debug",
	transports: [
		new (winston.transports.Console) ({
			prettyPrint: true,
			colorize: true
		}),
		new (winston.transports.File) ({
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