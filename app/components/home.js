/*
 * Created by Kevo on 6/14/2016.
 */

import React from "react";
import axios from "axios";
// import {Link} from "react-router";
// import HomeStore from "../stores/HomeStore";
// import HomeActions from "../actions/HomeActions";

class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log("home page component mounted!");
	}

	componentWillUnmount() {
		console.log("home page component unMounted")
	}

	onChange(state) {
		this.setState(state);
	}

	handleClick() {
		// details here
	}

	render() {

			return (
				<div id="searchBody">

					<div className="jumbotron">
						<div className="container">
							<h1 id="title">React NYT Article Search</h1>
						</div>
					</div>

					<div className="panel panel-default" id="searchPanel">
						<div className="panel-body">

							<label htmlFor="searchQuery">Search Articles by Keyword:</label>
							<input type="text" name="searchQuery" className="form-control"/>

						</div>
					</div>
				</div>
			);
	};
}

export default Home;