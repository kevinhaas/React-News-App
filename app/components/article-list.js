/*
 * Created by Kevo on 6/17/2016.
 */

import React from "react";
import axios from "axios";
import CopyToClipboard from "react-copy-to-clipboard";
import console from "../../cfgs/kevcfg";
import {Link} from "react-router";

class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articleRes: [],
            searchQuery: [],
            favRes: [],
            copied: false
        }
    }

    componentDidMount() {
        console.log("articleList component mounted!");
        this.getLatestArticles();
    }

    onChange(e) {
        this.setState({
            searchQuery: e.target.value
        });
    }

    // copies article URL to the clipboard //
    copyUrlClick() {
        toastr.success("URL copied to clipboard");

        this.setState({
            copied: true
        });
    }

    // IF an article has no heats, it gets added to favorites //
    // IF an article has existing hearts, it gets another heart added to the total //
    addNewFavorite(article) {

        console.log("heart'd!");
        console.log(article.headline.main, article.snippet, article.web_url);
        console.log(this.refs.heartRef);

        // check for valid imgUrl //
        let imgUrl;

        // IF no thumbnail for the article //
        if (article.multimedia.length === 0) {
            imgUrl = "no pic"
        } else {
            imgUrl = article.multimedia[0].url;
        }

        // POST either new article or +1 heart to the favorites collection THEN display appropriate toastr and setState //
        axios.post("/favorites", {
            headline: article.headline.main,
            snippet: article.snippet,
            url: article.web_url,
            imgUrl: imgUrl
        })
        .then((res) => {
            console.log(res);

            if (res.data == "HEART ADDED") {
                setTimeout(() => {
                toastr.success("<3'd: " + article.headline.main);
            }, 300)
            } else {
                toastr.success("Added to Favorites: " + article.headline.main);
            }
        })
        .catch((err) => {
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

    // search button //
    handleSubmit(event) {
        event.preventDefault();
        this.getSearchArticles();
    }

    // grabs latest articles on page load //
    getLatestArticles() {

        let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += "?" + $.param({
                "api-key": kevcfg.nytApiKey
            });

        axios.get(url)
            .then((res) => {
                console.log(res.data.response.docs);

                this.setState({
                    articleRes: res.data.response.docs,
                    searchQuery: ""
                });

                // get hearts count for current search results //
                axios.get("/favorites")
                    .then((res) => {
                        console.log(res);

                        this.setState({
                           favRes: res.data
                        });
                    })
            })
            .catch((err) => {
                if (err.response) {
                    console.error(err.response.data);
                    console.error(err.response.status);
                    console.error(err.response.headers);
                } else {
                    console.error("Error", err.message);
                }
            });
    }

    // fetches articles for the desired query //
    // TODO: if articleRes === 0 then display no results message and prompt to search again //
    getSearchArticles() {

        let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += "?" + $.param({
                "api-key": "e051855bb5e34d84b7f68c0d9dcb7b58",
                "q"      : this.state.searchQuery
            });

        // IF no query is defined, set URL to getLatestArticle() URL //
        if (this.state.searchQuery == "") {
            url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=e051855bb5e34d84b7f68c0d9dcb7b58"
        }
	
        axios.get(url)
            .then((res) => {
                console.log(res.data.response.docs);

                axios.post("/queries", {
                    searchQuery: this.state.searchQuery
                });

                this.setState({
                    articleRes: res.data.response.docs,
                    searchQuery: ""
                });

            })
            .catch((err) => {
                if (error.response) {
                    console.error(err.response.data);
                    console.error(err.response.status);
                    console.error(err.response.headers);
                } else {
                    console.error("Error", err.message);
                }
            });
    }

    render() {

        console.log(this.state);
        console.log(this.state.favRes);
        console.log(this.props);

        let articleRender = this.state.articleRes.map((article, articleIndex) => {

                return (
                    <div id="searchBody">

                        <div className="panel panel-default" id="resultPanel">
                            <div className="panel-body">

                                <div key={article._id} className="media">

                                    {article.multimedia.length === 0 ?

                                        <a href={article.web_url} target="#blank" className="media-left">
                                            <img className="placeHolderImg" src={"https://static01.nyt.com/images/icons/t_logo_291_black.png"} />
                                        </a>

                                        :

                                        <a href={article.web_url} target="#blank" className="media-left">
                                            <img className="resImg" src={"https://nytimes.com/" + article.multimedia[0].url} />
                                        </a>
                                    }

                                   <div className="media-body">

                                       <i className="fa fa-heart" aria-hidden="true" onClick={this.addNewFavorite.bind(this, article)}>

                                            {this.state.favRes.map((data, heartIndex) => {

                                                return article.snippet == data.snippet ?

                                                    <span ref="heartRef" key={data._id} id={heartIndex}>{data.hearts}</span>

                                                    :

                                                    null
                                            })}

                                       </i>

                                       <CopyToClipboard text={article.web_url} onCopy={this.copyUrlClick.bind(this)}>
                                            <i className="fa fa-share-alt" aria-hidden="true"></i>
                                        </CopyToClipboard>

                                        <a href={article.web_url} target="#blank"><h4 className="media-heading"><strong>{article.headline.main}</strong></h4></a>
                                        <small>{article.snippet}</small>

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
                                <input type="text" className="form-control" placeholder="Search the NYT" value={this.state.searchQuery} onChange={this.onChange.bind(this)} />
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

export default ArticleList;
