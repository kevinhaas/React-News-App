/*
 * Created by Kevo on 6/14/2016.
 */

const express  = require("express"),
	  router   = express.Router(),
	  axios    = require("axios"),
      moment   = require("moment"),
      now      = moment().format(),
      logger   = require("../../cfgs/logger"),
      Favorite = require("../models/favorites-model"),
      Query    = require("../models/query-model");

router.route("/favorites")
	.post((req, res) => {
        logger.info(req.body.imgUrl);

		let headline = req.body.headline;
		let snippet  = req.body.snippet;
		let url      = req.body.url;
		let imgUrl   = req.body.imgUrl;

		logger.info(headline, snippet, url, imgUrl);

		let favArticle = new Favorite({
			headline: headline,
			snippet: snippet,
			url: url,
			imgUrl: imgUrl,
            hearts: 1,
            userIps: req.headers['x-forwarded-for'] || req.connection.remoteAddress
		});

		favArticle.save((err) => {

			if (err) {
				logger.info(err);

                Favorite.findOneAndUpdate({ headline: headline }, { $inc: { hearts: 1 }}, ((err, data) => {

                    if (err) {
                        logger.error(err);
                        res.send("ERROR ADDING HEART")
                    } else {
                        logger.info(data);
                        res.send("HEART ADDED");
                    }
                }));
			} else {
				logger.info("Article Saved To Mongo @ " + now);
                res.send("ARTICLE SAVED: " + headline);
			}
		})

	})
	.get((req, res) => {
		logger.info("favorites GET route");

		Favorite.find({},((err, data) => {
			if (err) {
				logger.info(err);
			} else {
				logger.info(data);
			}
			res.json(data)
		}));
	})
    .put((req, res) => {
        logger.info("PUT route working");
        logger.info(req.body.headline);
        logger.info(req.body.hearts);

        let headline = req.body.headline;

        Favorite.findOneAndUpdate({ headline: headline }, { $inc: { hearts: 1 }},((err, data) => {
            if (err) {
                logger.error(err);
            } else {
                logger.info(data);
            }
        }));
    });

router.route("/queries")
    .post((req, res) => {
        logger.info("query post working!");
        logger.info(req.body);

        let query = req.body.searchQuery;

        let userQuery = new Query({
            userQuery: query,
            userIp: req.headers['x-forwarded-for'] || req.connection.remoteAddress
        });

        userQuery.save((err) => {
            if (err) {
                logger.error(err);
                res.send("ERROR ADDING QUERY: " + err)
            } else {
                logger.info("User Query Info Saved @ " + now);
                res.send("QUERY ADDED: " + query)
            }
        })
    });

module.exports = router;