var mongoose = require("mongoose");
var passLocMon = require("passport-local-mongoose");
var UserSchema =new mongoose.Schema({
  username:String,
  password:String
});

UserSchema.plugin(passLocMon);
module.exports= mongoose.model("User",UserSchema);
