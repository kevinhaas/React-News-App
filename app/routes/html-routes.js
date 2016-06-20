/*
 * Created by Kevo on 6/15/2016.
 */

const express     = require("express"),
	  router      = express.Router(),
	  React       = require("react"),
	  ReactDOM    = require("react-dom/server"),
	  ReactRouter = require("react-router"),
	  routes      = require("./react-routes"),
	  axios       = require("axios"),
	  swig        = require("swig");

// SERVER SIDE RENDERING //
router.use(function (req, res) {
		ReactRouter.match({routes: routes.default, location: req.url}, function (err, redirectLocation, renderProps) {
			if (err) {
				res.status(500).send(err.message);
			} else if (redirectLocation) {
				res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
			} else if (renderProps) {
				var html = ReactDOM.renderToString(React.createElement(ReactRouter.RoutingContext, renderProps));
				var page = swig.renderFile("./public/views/index.html", {html: html});
				res.status(200).send(page);
			} else {
				res.status(404).send("404 - Page Not Found");
			}
		});
	});

// CLIENT SIDE RENDER ONLY //
// router.route("/*")
// 	.get(function (req, res) {
// 		res.sendFile(process.cwd() + "/public/views/index.html");
// 	});

module.exports = router;