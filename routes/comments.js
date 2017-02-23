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
          comment.author.id=req.user._id;
          comment.username= req.user.username;
          console.log(req.user.username);
          data.comments.push(comment);
          data.save();
          console.log(comment);
          res.redirect("/grounds/"+req.params.id)
        }
      })
    }
  })
})


router.get('/grounds/:id/comments/:cid/edit',function(req,res){
  Comment.findById(req.params.cid,function(err,foundComment){
    if(err){
      console.log("error took place ",err);
    }else{
      res.render("comments/edit",{ground_id:req.params.id,comment:foundComment})
    }
  });
});

router.put("/grounds/:id/comments/:cid",function(req,res){
  Comment.findByIdAndUpdate(req.params.cid,req.body.comment,function(err,upComment){
    if(err){
      console.log("erorr took place",err);
      res.redirect("back");
    }else {
      res.redirect("/grounds/"+req.params.id);
    }
  })
});

router.delete("/grounds/:id/comments/:cid",function(req,res){
  Comment.findByIdAndRemove(req.params.cid,function(err,dGround){
    if (err) {
      console.log("error took place");
      res.redirect("back");

    }else {
      res.redirect("/grounds/"+req.params.id);
    }
  })
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return  next();
  }
  res.redirect("/login");
}

module.exports= router;
