/*
 * Created by Kevo on 6/20/2016.
 */

import React from "react";
import axios from "axios";
import CopyToClipboard from "react-copy-to-clipboard";
// import console from "../../cfgs/console";
import { Link } from "react-router";

class FavoriteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favRes: [],
      copied: false
    };
  }

  componentDidMount() {
    this.getFavoriteArticles();
  }

  // copies article URL to the clipboard //
  copyUrlClick() {
    toastr.success("URL copied to clipboard");

    this.setState({
      copied: true
    });
  }

  // onClick for heart - adds 1 to that favorite's heart count //
  addHeart(fav) {
    axios
      .post("/favorites", {
        headline: fav.headline,
        hearts: fav.hearts
      })
      .then(res => {
        if (res.data == "HEART ADDED") {
          setTimeout(() => {
            toastr.success("<3'd: " + fav.headline);
          }, 300);
        } else {
          toastr.success("Added to Favorites: " + fav.headline);
        }
      })
      .catch(err => {
        console.error(err);
      });

    setTimeout(() => {
      axios.get("/favorites").then(res => {
        this.setState({
          favRes: res.data
        });
      });
    }, 1000);
  }

  // fetches articles for the desired query //
  // TODO: if articleRes === 0 then display no results message and prompt to search again //
  getFavoriteArticles() {
    axios
      .get("/favorites")
      .then(favs => {
        this.setState({
          favRes: favs.data
        });
      })
      .catch(error => {
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
                {fav.imgUrl === "no pic" ? (
                  <a href={fav.url} target="#blank" className="media-left">
                    <img
                      className="placeHolderImg"
                      src={
                        "https://static01.nyt.com/images/icons/t_logo_291_black.png"
                      }
                    />
                  </a>
                ) : (
                  <a href={fav.url} target="#blank" className="media-left">
                    <img
                      className="resImg"
                      src={"https://nytimes.com/" + fav.imgUrl}
                    />
                  </a>
                )}

                <div className="media-body">
                  <i
                    className="fa fa-heart"
                    aria-hidden="true"
                    onClick={this.addHeart.bind(this, fav)}
                  >
                    {fav.hearts}
                  </i>

                  <CopyToClipboard
                    text={fav.url}
                    onCopy={this.copyUrlClick.bind(this)}
                  >
                    <i className="fa fa-share-alt" aria-hidden="true"></i>
                  </CopyToClipboard>

                  <a href={fav.url} target="#blank">
                    <h4 className="media-heading">
                      <strong>{fav.headline}</strong>
                    </h4>
                  </a>
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
            <img
              id="logoImg"
              src={"https://static01.nyt.com/images/icons/t_logo_291_black.png"}
            />

            <h2 id="favListTitle">Favorites</h2>
          </div>

          <div className="row">{favArticleRender}</div>
        </div>
      </div>
    );
  }
}

export default FavoriteList;
