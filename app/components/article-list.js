/*
 * Created by Kevo on 6/17/2016.
 */

import React from "react";
import axios from "axios";
import CopyToClipboard from "react-copy-to-clipboard";
import {Link} from "react-router";

class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articleRes: [],
            searchQuery: [],
            copied: false,
            favRes: [],
            imgUrl: [],
            hearts: []
        }
    }

    componentDidMount() {
        console.log("articleList component mounted!");
        this.getLatestArticles();
    }

    componentWillUnmount() {
        console.log("articleList component unMounted")
    }

    onChange(e) {
        this.setState({
            searchQuery: e.target.value
        });
    }

    // addHeartClick() {
    //     axios.get("/favorites")
    //         .then((res) => {
    //             console.log(res);
    //
    //             var heartData = [];
    //
    //             for (var i = 0; i < res.data.length; i++) {
    //                 // console.log(res.data[i].headline);
    //
    //                 heartData.push(res.data[i].hearts)
    //             }
    //
    //             console.log(heartData);
    //
    //             this.setState({
    //                 favRes: res.data,
    //                 hearts: heartData
    //             });
    //         })
    // }

    addNewFavorite(head) {

        console.log("heart'd!");
        console.log(head.headline.main, head.snippet, head.web_url);
        console.log(this.refs.heartRef);

        var imgUrl = "";

        if (head.multimedia.length === 0) {
            imgUrl = "no pic"
        }
        else {
            imgUrl = head.multimedia[0].url;
        }

        axios.post("/favorites", {
            headline: head.headline.main,
            snippet: head.snippet,
            url: head.web_url,
            imgUrl: imgUrl
        })
        .then(function (res) {

            console.log(res);

            if (res.data == "HEART ADDED") {
                setTimeout(function() {
                toastr.success("<3'd: " + head.headline.main);
            }, 500)
            }
            else {
                toastr.success("Added to Favorites: " + head.headline.main);
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

    copyUrlClick() {
        console.log("URL copies to clipboard");
        toastr.success("URL copied to clipboard");

        this.setState({
            copied: true
        });
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

        axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=fe6f6fe9125b4c14b9ab13721eaf350e")
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

                        var heartData = [];

                        for (var i = 0; i < res.data.length; i++) {
                            // console.log(res.data[i].headline);

                            heartData.push(res.data[i].hearts)
                        }

                        console.log(heartData);

                        this.setState({
                            favRes: res.data,
                            hearts: heartData
                        });
                    })
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

        // IF no query is defined, set URL to getLatestArticle() URL //
        if (this.state.searchQuery == "") {
            url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=fe6f6fe9125b4c14b9ab13721eaf350e"
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
        console.log(this.state.favRes);
        console.log(this.props);

        // for (var i = 0; i < this.state.hearts.length; i++) {
        //     console.log(this.state.hearts[i]);
        // }

        let articleRender = this.state.articleRes.map((head, articleIndex) => {

                return (
                    <div id="searchBody">

                        <div className="panel panel-default" id="resultPanel">
                            <div className="panel-body">

                                <div key={head._id} className="media">

                                    {head.multimedia.length === 0 ?

                                        <a href={head.web_url} target="#blank" className="media-left">
                                            <img className="placeHolderImg" src={"https://static01.nyt.com/images/icons/t_logo_291_black.png"} />
                                        </a>

                                        :

                                        <a href={head.web_url} target="#blank" className="media-left">
                                            <img className="resImg" src={"https://nytimes.com/" + head.multimedia[0].url} />
                                        </a>
                                    }

                                   <div className="media-body">

                                       <i className="fa fa-heart" aria-hidden="true" onClick={this.addNewFavorite.bind(this, head)}>

                                            {this.state.favRes.map((data, heartIndex) => {

                                                return head.snippet == data.snippet ?

                                                    <span ref="heartRef" key={data._id} id={heartIndex}>{data.hearts}</span>

                                                    :

                                                    null
                                            })}

                                       </i>

                                       <CopyToClipboard text={head.web_url} onCopy={this.copyUrlClick.bind(this)}>
                                            <i className="fa fa-share-alt" aria-hidden="true"></i>
                                        </CopyToClipboard>

                                        <a href={head.web_url} target="#blank"><h4 className="media-heading"><strong>{head.headline.main}</strong></h4></a>
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