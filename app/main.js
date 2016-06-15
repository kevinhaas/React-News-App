/*
 * Created by Kevo on 6/14/2016.
 */

import React from "react";
import ReactDOM from "react-dom";
import Router from "react-router";
import createBrowserHistory from "history/lib/createBrowserHistory";
import routes from "./routes/react-routes";

let history = createBrowserHistory();

ReactDOM.render(
	<Router history={history}>
		{routes}
	</Router>,

	document.getElementById("app")
);