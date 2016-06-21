/*
 * Created by Kevo on 6/14/2016.
 */

const express = require("express"),
	  router  = express.Router(),
	  axios   = require("axios"),
	  Favorite = require("../models/favorites-model");

router.route("/favorites")
	.post(function (req, res) {

		var headline = req.body.headline;
		var snippet  = req.body.snippet;
		var url      = req.body.url;
		// var imgUrl   = req.body.imgUrl;
		
		console.log(headline, snippet, url);

		var favArticle = new Favorite({
			headline: headline,
			snippet: snippet,
			url: url
		});

		favArticle.save(function (err) {
			if (err) {
				console.log(err);
			}
			else {
				console.log("article saved to mongo");
			}
		})

});

module.exports = router;