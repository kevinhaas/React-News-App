/*
 * Created by Kevo on 6/14/2016.
 */

const express = require("express"),
	  router  = express.Router(),
	  axios   = require("axios"),
	  Favorite = require("../models/favorites-model");

router.route("/favorites")
	.post(function (req, res, next) {

		var headline = req.body.headline;
		var snippet  = req.body.snippet;
		var url      = req.body.url;
		var imgUrl   = req.body.imgUrl;
		// var hearts   = req.body.hearts;

		console.log(headline, snippet, url);

		var favArticle = new Favorite({
			headline: headline,
			snippet: snippet,
			url: url,
			imgUrl: imgUrl,
            hearts: 1,
            userIps: req.headers['x-forwarded-for'] || req.connection.remoteAddress
		});

		favArticle.save(function (err) {
			if (err) {

				console.log(err);
                Favorite.findOneAndUpdate({ headline: headline }, { $inc: { hearts: 1 }}, function (err, data) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        console.log(data);
                    }
                })

			}
			else {
				console.log("article saved to mongo");
			}
		})

	})
	.get(function (req, res) {

		console.log("favorites GET route");

		Favorite.find({}, function (err, data) {
			if (err) {
				console.log(err);
			}
			else {
				console.log(data);
			}
			res.json(data)
		});
	})
    .put(function (req, res) {
        console.log("PUT route working");
        console.log(req.body.headline);
        console.log(req.body.hearts);

        var headline = req.body.headline;

        Favorite.findOneAndUpdate({ headline: headline }, { $inc: { hearts: 1 }}, function (err, data) {
            if (err) {
                console.error(err);
            }
            else {
                console.log(data);
            }
        })


    });

module.exports = router;