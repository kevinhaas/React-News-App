/*
 * Created by Kevo on 6/20/2016.
 */

import React from "react";
import axios from "axios";
import CopyToClipboard from "react-copy-to-clipboard";
import {Link} from "react-router";

class FavoriteList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			articleRes: [],
			searchQuery: [],
			copied: false,
			headline: "",
			snippet: "",
			url: "",
			imgUrl: ""
		}
	}

	componentDidMount() {
		console.log("favoriteList component mounted!");
		this.getFavoriteArticles();
	}

	componentWillUnmount() {
		console.log("favoriteList component unMounted")
	}

	onChange() {
	}
	
	handleClick(head) {
		console.log("heart'd!");

		console.log(head.headline.main, head.snippet, head.web_url);

		axios.post("/favorites", {
			headline: head.headline.main,
			snippet: head.snippet,
			url: head.web_url
		})
			.then(function (res) {
				console.log(res);
			})
			.catch(function (err) {
				console.log(err);
			})

	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state.searchQuery);
		this.getSearchArticles();
	}

	// grabs latest articles on page load //
	getLatestArticles() {

		var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
		url += "?" + $.param({
				"api-key": "fe6f6fe9125b4c14b9ab13721eaf350e"
			});

		axios.get(url)
			.then((res) => {
				console.log(res.data.response.docs);

				this.setState({
					articleRes: res.data.response.docs,
					searchQuery: ""
				});
			})
			.catch(function (error) {
				if (error.response) {
					console.error(error.response.data);
					console.error(error.response.status);
					console.error(error.response.headers);
				} else {
					console.error("Error", error.message);
				}
			});
	}

	// fetches articles for the desired query //
	// TODO: if articleRes === 0 then display no results message and prompt to search again //
	getSearchArticles() {

		var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
		url += "?" + $.param({
				"api-key": "fe6f6fe9125b4c14b9ab13721eaf350e",
				"q"      : this.state.searchQuery
			});

		axios.get(url)
			.then((res) => {
				console.log(res.data.response.docs);

				this.setState({
					articleRes: res.data.response.docs,
					searchQuery: ""
				});
			})
			.catch(function (error) {
				if (error.response) {
					console.error(error.response.data);
					console.error(error.response.status);
					console.error(error.response.headers);
				} else {
					console.error("Error", error.message);
				}
			});
	}

	render() {

		console.log(this.state);

		let articleRender = this.state.articleRes.map((head, index) => {

			// if (head.multimedia.length === 0) {
			// 	console.log(this);
			// 	console.log(head.multimedia[0].url);
			// 	head.multimedia[0].url = "boop";
			// 	console.log(head.multimedia[0].url);
			// }

			return (
				<div key={head._id} id="searchBody">

					<div className="panel panel-default" id="resultPanel">
						<div className="panel-body">

							<div className="media">

								{head.multimedia.length === 0 ?

									<a className="media-left">
										<img className="placeHolderImg" src={"https://static01.nyt.com/images/icons/t_logo_291_black.png"} />
									</a>

									:

									<a className="media-left">
										<img className="resImg" src={"https://nytimes.com/" + head.multimedia[0].url} />
									</a>
								}

								<div className="media-body">

									<i className="fa fa-heart" aria-hidden="true" onClick={this.handleClick.bind(this, head)}></i>

									<CopyToClipboard text={head.web_url}
									                 onCopy={() => this.setState({copied: true})}>
										<i className="fa fa-share-alt" aria-hidden="true"></i>
									</CopyToClipboard>

									<a href={head.web_url} target="#blank"><h4 className="media-heading">{head.headline.main}</h4></a>
									<small>{head.snippet}</small>

								</div>

							</div>

						</div>
					</div>

				</div>
			);
		});

		return (
			<div className="wrapper">
				<div className="container">

					<div className="text-center">

						<img id="logoImg" src={"https://static01.nyt.com/images/icons/t_logo_291_black.png"} />

						<form className="form" role="search" onSubmit={this.handleSubmit.bind(this)}>
							<div className="form-group">
								<input ref="refTest" type="text" className="form-control" placeholder="Search the NYT" value={this.state.searchQuery} onChange={this.onChange.bind(this)} />
							</div>
							<button type="submit" className="btn btn-default" id="searchBtn">Search</button>
						</form>

					</div>

					<div className="row">
						{articleRender}
					</div>

				</div>
			</div>
		);
	};
}

export default articleList;