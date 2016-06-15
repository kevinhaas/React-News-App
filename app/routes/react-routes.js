/*
 * Created by Kevo on 6/14/2016.
 */

import React from "react";
import {Route} from "react-router";
import Home from "../components/home";
import Footer from "../components/footer";

export default (
	<Route>
			<Route path="/" component={Home} />
			<Route path="/footer" component={Footer} />
	</Route>
);