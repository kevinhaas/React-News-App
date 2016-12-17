/*
 * Created by Kevo on 6/14/2016.
 */

"use strict"; 

require("babel-register");
const express        = require("express"),
	  app            = express(),
	  http           = require("http"),
	  bodyParser     = require("body-parser"),
	  favicon        = require("serve-favicon"),
	  expressWinston = require("express-winston"),
	  mongoose       = require("mongoose"),
	  moment         = require("moment"),
	  now            = moment().format(),
	  cfg            = require("./cfgs/kevcfg"),
	  logger         = require("./cfgs/logger");

// MONGO CONNECTION //
mongoose.connect(cfg.mongoUrl, cfg.dbCfg);
const db = mongoose.connection;

db.on("error", ((err) => {
	logger.info("MongoDB Error:", err)
}));

db.once("open", (() => {
	logger.info("MongoDB connection successful!")
}));

// SERVER INITIALIZATION //
const PORT = process.env.port || 3012,
	  server = http.createServer(app),
	  io = require("socket.io")(server);

server.listen(PORT);
server.on("error", onError);
logger.info("Server listening on " + PORT + " @ " + now);

// EXPRESS MIDDLEWARE //
app.use(expressWinston.logger({
	winstonInstance: logger, // declare logger instance to be used with middleware
	meta: false,
	msg: "HTTP {{req.statusCode}} {{req.method}} {{req.url}} {{req.responseTime}}ms",
	expressFormat: true, // use default express/morgan format
	colorStatus: true,
	ignoreRoute: ((req, res) => { return false; }) // skips messages based on req/res
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(favicon(__dirname + "/public/favicon.ico"));

// ROUTES //
app.use("/", require("./app/routes/api-routes"));
app.use("/", require("./app/routes/html-routes"));

// gracefulExits //
process.on("SIGINT", (() => {
	logger.info("Mongoose gracefulExit...");
	db.disconnect(() => {
		process.exit();
	});
}));

// event listener for HTTP server "error" event
function onError(error) {
	if (error.syscall !== "listen") {
		throw error;
	}

	let bind = typeof PORT === "string"
		? "Pipe " + PORT
		: "Port " + PORT;

	// errors related to initializing the server
	switch (error.code) {
		case "EACCES":
			logger.error(bind + " requires elevated privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			logger.error(bind + " is already in use");
			process.exit(1);
			break;
		default:
			throw error;
	}
}
