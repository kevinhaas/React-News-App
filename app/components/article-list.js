/*
 * Created by Kevo on 6/17/2016.
 */

import React from "react";
import axios from "axios";
import {Link} from "react-router";
// import HomeStore from "../stores/HomeStore";
// import HomeActions from "../actions/HomeActions";

class articleList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			headline: [],
			inputValue: []
		}
	}

	getLatestArticles() {

		var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
			url += "?" + $.param({
					"api-key": "fe6f6fe9125b4c14b9ab13721eaf350e",
					"q": "phish"
			});

		axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=fe6f6fe9125b4c14b9ab13721eaf350e")
			.then((res) => {
				console.log(res.data.response.docs);
				// console.log(url);

				this.setState({
					headline: res.data.response.docs
				});
			})
			.catch(function (error) {
				if (error.response) {
					// The request was made, but the server responded with a status code
					// that falls out of the range of 2xx
					console.error(error.response.data);
					console.error(error.response.status);
					console.error(error.response.headers);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.error('Error', error.message);
				}
			});
	}

	getSearchArticles() {

		// let searchQuery = this.state.inputValue.toString();
		// "q": searchQuery


		// var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
		// 	url += "?" + $.param({
		// 		"api-key": "fe6f6fe9125b4c14b9ab13721eaf350e"
		// 	});

		axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=fe6f6fe9125b4c14b9ab13721eaf350e&q=" + this.state.inputValue)
			.then((res) => {
				console.log(res.data.response.docs);

				this.setState({
					headline: res.data.response.docs
				});
			})
			.catch(function (error) {
				if (error.response) {
					// The request was made, but the server responded with a status code
					// that falls out of the range of 2xx
					console.error(error.response.data);
					console.error(error.response.status);
					console.error(error.response.headers);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.error('Error', error.message);
				}
			});
	}

	componentDidMount() {
		console.log("articleList component mounted!");
		this.getLatestArticles();
	}

	componentWillUnmount() {
		console.log("articleList component unMounted")
	}

	onChange(e) {
		this.setState({ inputValue: e.target.value });

		console.log(this.props.inputValue);
		console.log(this.state.inputValue)
	}

	handleClick() {
		console.log(this.state.inputValue)
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state.inputValue);
		this.getSearchArticles();
	}

// <a className="media-left" href="#">
// <img id="resImg" src={"https://nytimes.com/" + head.multimedia[0].url} />
// </a>

	render() {

		console.log(this.state);

		let articleRender = this.state.headline.map((head, index) => {

			return (
				<div key={head._id} id="searchBody">

					<div className="panel panel-default" id="resultPanel">
						<div className="panel-body">

							<div className="media">

								<div className="media-body">

										{head.multimedia.length === 0 ?

											<p>no pic</p>

												:

											<a className="media-left" href="#">
												<img id="resImg" src={"https://nytimes.com/" + head.multimedia[0].url} />
											</a>
										}

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
					<img onClick={this.handleClick.bind(this)} id="logoImg" src={"https://static01.nyt.com/images/icons/t_logo_291_black.png"} />
				</div>

				<form className="navbar-form navbar-left" role="search" onSubmit={this.handleSubmit.bind(this)}>
					<div className="form-group">
						<input type="text" className="form-control" placeholder="Begin news search..." value={this.state.inputValue} onChange={this.onChange.bind(this)} />
					</div>
					<button type="submit" className="btn btn-default">Search</button>
				</form>

				<div className="row">
					{articleRender}
				</div>

			</div>
		);
	};
}

export default articleList;