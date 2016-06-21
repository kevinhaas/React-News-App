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
			favArticleRes: [],
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

	handleClick() {

	}

	handleSubmit(event) {

	}

	// fetches articles for the desired query //
	// TODO: if articleRes === 0 then display no results message and prompt to search again //
	getFavoriteArticles() {

		axios.get("/favorites")
			.then((favs) => {
				console.log(favs);

				this.setState({
					favArticleRes: favs.data
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

		let favArticleRender = this.state.favArticleRes.map((head, index) => {

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

									<a className="media-left">
										<img className="placeHolderImg" src={"https://static01.nyt.com/images/icons/t_logo_291_black.png"} />
									</a>

								<div className="media-body">

									<i className="fa fa-heart" aria-hidden="true" onClick={this.handleClick.bind(this, head)}></i>

									<CopyToClipboard text={head.url}
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
						{favArticleRender}
					</div>

				</div>
			</div>
		);
	};
}

export default FavoriteList;