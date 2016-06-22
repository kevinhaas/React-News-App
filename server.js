/*
 * Created by Kevo on 6/14/2016.
 */

require("babel-register");
const express        = require("express"),
	  app            = express(),
	  http           = require("http"),
	  bodyParser     = require("body-parser"),
	  favicon        = require("serve-favicon"),
	  logger         = require("./cfgs/logger"),
	  expressWinston = require("express-winston"),
	  mongoose       = require("mongoose"),
	  cfg            = require("./cfgs/kevcfg");

const moment = require("moment"),
	  now    = moment().format();

// MONGO CONNECTION //
mongoose.connect(cfg.mongoUrl, cfg.dbCfg);
const db = mongoose.connection;

db.on("error", function(err) {
	logger.info("MongoDB Error:", err)
});

db.once("open", function() {
	logger.info("MongoDB connection successful!")
});

// SERVER INITIALIZATION //
const PORT = process.env.port || 5000,
	  server = http.createServer(app),
	  io = require("socket.io")(server);

server.listen(PORT);
server.on("error", onError);
logger.info("Server listening on " + PORT + " @ " + now);

// SOCKET.IO //
var onlineUsers = 0;
io.sockets.on("connection", function(socket) {
	onlineUsers++;

	io.sockets.emit("onlineUsers", { onlineUsers: onlineUsers });

	socket.on("disconnect", function () {
		onlineUsers--;
		io.sockets.emit("onlineUsers", { onlineUsers: onlineUsers });
	});
});

// EXPRESS MIDDLEWARE //
app.use(expressWinston.logger({
	winstonInstance: logger, // declare logger instance to be used with middleware
	meta: false,
	msg: "HTTP {{req.statusCode}} {{req.method}} {{req.url}} {{req.responseTime}}ms",
	expressFormat: true, // use default express/morgan format
	colorStatus: true,
	ignoreRoute: function (req, res) { return false; } // skips messages based on req/res
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use(favicon(__dirname + "/public/favicon.ico"));

// ROUTES //
app.use("/", require("./app/routes/api-routes"));
app.use("/", require("./app/routes/html-routes"));

// event listener for HTTP server "error" event
function onError(error) {
	if (error.syscall !== "listen") {
		throw error;
	}

	var bind = typeof PORT === "string"
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