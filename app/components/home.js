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
		this.state = {
			headline: [],
			body: []
		}
	}

	getLatestArticles() {
		var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
		url += '?' + $.param({
				'api-key': "fe6f6fe9125b4c14b9ab13721eaf350e"
			});

		axios.get(url)
			.then((res) => {
				console.log(res.data.response.docs);
				var response = [];

				for (var i = 0; i < res.data.response.docs.length; i++) {
					var test = res.data.response.docs[i];

					response.push(test.headline.main);
					console.log(response);

					// console.log(test.headline.main);
					// console.log(test.snippet);

					this.setState({
						headline: response,
						body: test.snippet
					})
				}
			})
			.catch((err) => {
				console.error(err);
			})
	}

	componentDidMount() {
		console.log("home page component mounted!");
		this.getLatestArticles();
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

		console.log(this.state);

		let articleList = this.state.headline.map((head, index) => {

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
										<img src="http://placehold.it/64x64"/>
									</a>
									<div className="media-body">
										<h4>INDEX {index +1}</h4>
										<h4 className="media-heading">{head}</h4>
										<small>{this.state.body}</small>

									</div>
								</div>

							</div>
						</div>

					</div>
				);
			});

		return (
			<div className="container">
				<h3 className="text-center">WIP</h3>
				<div className="row">
					{articleList}
				</div>

			</div>
		);
	};
}

export default Home;