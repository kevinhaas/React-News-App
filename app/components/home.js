/*
 * Created by Kevo on 6/14/2016.
 */

import React from "react";
// import {Link} from "react-router";
// import HomeStore from "../stores/HomeStore";
// import HomeActions from "../actions/HomeActions";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
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

				<div className="panel panel-default" id="resultPanel">
					<div className="panel-body">

						<div className="media">
							<a className="media-left" href="#">
								<img src="http://placehold.it/64x64" />
							</a>
							<div className="media-body">
								<h4 className="media-heading"></h4>
								Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus
								odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
								Donec lacinia congue felis in faucibus.
							</div>
						</div>

					</div>
				</div>

			</div>
		);
	};
}

export default Home;