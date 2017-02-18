var express =require("express");
var router = express.Router();
var campground = require("../models/campground");
var Comment = require("../models/comment");
var passport = require("passport");
var User = require("../models/user");

router.get("/",function(req,res){
  console.log("yelp camp is on");
  res.render("home");
});

router.get("/register",function(req,res){
    res.render("register");
});

router.post("/register",function(req,res){
  console.log("register post route");
  var newUser = new User({username:req.body.username});
  User.register(newUser, req.body.password,function(err,user){
    if (err) {
      console.log("error",err);
      return res.render("register");
    }else {
      res.redirect("/grounds");
    }
  });
})


router.get("/login",function(req,res){
  res.render("login");
});

router.post("/login",passport.authenticate("local",{successRedirect:"/grounds",failureRedirect:"/login"}),function(req,res){

})

router.get("/logout",function(req,res){
  req.logout();
  res.redirect("/grounds");
})



function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return  next();
  }
  res.redirect("/login");
}

module.exports= router;
