/*
 * Created by Kevo on 6/21/2016.
 */

const mongoose = require("mongoose");

const Favorites = new mongoose.Schema({
	headline: {type: String, unique: true},
	snippet: String,
	url: String,
	imgUrl: String,
	hearts: {type: Number, default: 0},
    userIps: [{type: String}]
},
{
	timestamps: true
});

module.exports = mongoose.model("Favorites", Favorites);