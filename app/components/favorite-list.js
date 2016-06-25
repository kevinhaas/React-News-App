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
			favRes: [],
			copied: false,
			favline: "",
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

	handleClick(fav) {
		console.log("heart +1 click working");

		axios.post("/favorites", {
			favline: fav.favline,
			hearts: fav.hearts
		})
			.then(function (res) {

				console.log(res);

				if (res.data == "HEART ADDED") {
					setTimeout(function() {
						toastr.success("<3'd: " + fav.favline);
					}, 300)
				}
				else {
					toastr.success("Added to Favorites: " + fav.favline);
				}

			})
			.catch(function (err) {
				console.error(err);
			});

		setTimeout(() => {
			axios.get("/favorites")
				.then((res) => {
					console.log(res);

					this.setState({
						favRes: res.data
					});

				})
		}, 1000);

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
					favRes: favs.data
				});
			})
			.catch(function (error) {
				if (error.response) {
					console.error(error.response.data);
					console.error(error.response.status);
					console.error(error.response.favers);
				} else {
					console.error("Error", error.message);
				}
			});
	}

	render() {

		let favArticleRender = this.state.favRes.map((fav, index) => {

			return (
				<div key={fav._id} id="searchBody">

					<div className="panel panel-default" id="resultPanel">
						<div className="panel-body">

							<div className="media">

                                {fav.imgUrl === "no pic" ?

                                    <a href={fav.web_url} target="#blank" className="media-left">
                                        <img className="placeHolderImg" src={"https://static01.nyt.com/images/icons/t_logo_291_black.png"} />
                                    </a>

                                    :

                                    <a href={fav.web_url} target="#blank" className="media-left">
                                        <img className="resImg" src={"https://nytimes.com/" + fav.imgUrl} />
                                    </a>
                                }

								<div className="media-body">

									<i className="fa fa-heart" aria-hidden="true" onClick={this.handleClick.bind(this, fav)}>{fav.hearts}</i>

									<CopyToClipboard text={fav.url}
									                 onCopy={() => this.setState({copied: true})}>
										<i className="fa fa-share-alt" aria-hidden="true"></i>
									</CopyToClipboard>

									<a href={fav.url} target="#blank"><h4 className="media-faving"><strong>{fav.favline}</strong></h4></a>
									<small>{fav.snippet}</small>

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

						<h2 id="favListTitle">Favorites</h2>

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