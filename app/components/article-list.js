/*
 * Created by Kevo on 6/17/2016.
 */

import React from "react";
import axios from "axios";
// import {Link} from "react-router";
// import HomeStore from "../stores/HomeStore";
// import HomeActions from "../actions/HomeActions";

class articleList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			headline: []
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

				this.setState({
					headline: res.data.response.docs
					// body: test.snippet
				});
			})
			.catch((err) => {
				console.error(err);
			})
	}

	getSearchArticles() {
		var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
		url += '?' + $.param({
				'api-key': "fe6f6fe9125b4c14b9ab13721eaf350e"
			});

		axios.get(url)
			.then((res) => {
				console.log(res.data.response.docs);

				this.setState({
					headline: res.data.response.docs
					// body: test.snippet
				});
			})
			.catch((err) => {
				console.error(err);
			})
	}

	componentDidMount() {
		console.log("articleList component mounted!");
		this.getLatestArticles();
	}

	componentWillUnmount() {
		console.log("articleList component unMounted")
	}

	onChange(state) {
		this.setState(state);
	}

	handleClick() {
		// details here
	}

	render() {

		console.log(this.state);

		var articleList = this.state.headline.map((head, index) => {

			return (
				<div key={head._id} id="searchBody">

					<div className="panel panel-default" id="resultPanel">
						<div className="panel-body">

							<div className="media">

								<a className="media-left" href="#">
									<img id="resImg" src={"https://nytimes.com/" + head.multimedia[0].url} />
								</a>

								<div className="media-body">

									<h4>INDEX {index +1}</h4>
									<h4 className="media-heading">{head.headline.main}</h4>
									<small>{head.snippet}</small>

								</div>
							</div>

						</div>
					</div>

				</div>
			);
		});

		return (
			<div className="container">
				<div className="text-center">
					<img id="logoImg" src={"https://static01.nyt.com/images/icons/t_logo_291_black.png"} />
				</div>
				<div className="row">
					{articleList}
				</div>

			</div>
		);
	};
}

export default articleList;