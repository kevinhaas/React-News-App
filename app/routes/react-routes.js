/*
 * Created by Kevo on 6/14/2016.
 */

import React from "react";
import {Route} from "react-router";
import Home from "../components/home";
import Footer from "../components/footer";

// define paths for you components here
export default (
	<Route>
			<Route path="/" component={Home} />
			<Route path="/boop" component={Footer} />
	</Route>
);