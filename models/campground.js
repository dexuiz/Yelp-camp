var mongoose = require("mongoose");
var schema = new mongoose.Schema({
  name:String,
  image:String,
  desc:String
})

module.exports = mongoose.model("campground",schema);
