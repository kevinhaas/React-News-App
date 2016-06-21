/*
 * Created by Kevo on 6/14/2016.
 */

import React from "react";
import {Route} from "react-router";
import App from "../components/app";
import ArticleList from "../components/article-list";
import FavoriteList from "../components/favorite-list";
import Footer from "../components/footer";

// define paths for you components here
export default (
		<Route component={App}>
			<Route path="/" component={ArticleList} />
			<Route path="/favorite" component={FavoriteList} />
		</Route>
);