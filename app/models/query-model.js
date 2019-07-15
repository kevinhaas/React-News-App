/*
 * Created by Kevo on 6/23/2016.
 */

const mongoose = require("mongoose");

const Queries = new mongoose.Schema(
  {
    userQuery: String,
    userIp: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Queries", Queries);
