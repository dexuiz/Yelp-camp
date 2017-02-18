var express =require("express");
var router = express.Router();
var campground = require("../models/campground");
var Comment = require("../models/comment");


router.get("/grounds/:id/comments/new",isLoggedIn,function(req,res){
  campground.findById(req.params.id,function(err,data){
    if (err) {
      console.log("error took place");
    }else {
      res.render("comments/new",{ground:data})
    }
  });
});


router.post("/grounds/:id/comments",function(req,res){
  campground.findById(req.params.id,function(err,data){
    if (err) {
      console.log("error took place");
      res.redirect("/grounds");
    }else {
      Comment.create(req.body.comment,function(err,comment){
        if (err) {
          console.log("error took place ");
        }else {
          data.comments.push(comment);
          data.save();
          res.redirect("/grounds/"+req.params.id)
        }
      })
    }
  })
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return  next();
  }
  res.redirect("/login");
}

module.exports= router;
