var express = require("express");
var router=express.Router();
var campground=require("../models/campground")

router.get("/grounds",function(req,res){
console.log("bc");

  campground.find({},function(err,campgrounds){
    if(err){
      console.log("error detected");
    }else {
      res.render("campgrounds",{grounds:campgrounds , current:req.user});
    }
  })
})

router.post("/grounds",function(req,res){
console.log(req.user);
var author={
  id:req.user._id,
  username:req.user.username
};
 campground.create({name:req.body.newName , image:req.body.newImage ,desc:req.body.newDesc ,author:author},function(err,ground){
   if(err)
      console.log("error generated",err);
    else {
      console.log(ground);
      console.log("add done");
      res.redirect("/grounds");

    }
 });
});


router.get("/grounds/new",isLoggedIn,function(req,res){
  res.render("new");
});

//show route
router.get("/grounds/:id",function(req,res){
   campground.findById(req.params.id).populate("comments").exec(function(err,foundGround){
    if(err){
      console.log("error occured",err);
    }else {
      res.render("show",{ground:foundGround, current:req.user});
    }
  });

});

//edit route
router.get("/grounds/:id/edit",checkOwnership,function(req,res){

    campground.findById(req.params.id,function(err,foundGround){
          res.render("edit",{campground:foundGround});

    });
});


//update route
router.put("/grounds/:id",checkOwnership,function(req,res){
  console.log(req.body.ground);
  campground.findByIdAndUpdate(req.params.id,req.body.ground,function(err,updGround){
    if (err) {
      console.log('error took place',err);
      res.redirect("/grounds")
    }else {
      res.redirect("/grounds/"+req.params.id);
    }
  });
});
//delete route
router.delete("/grounds/:id/",checkOwnership,function(req,res){
  campground.findByIdAndRemove(req.params.id ,function(err,delGround){
    if (err) {
      console.log("error took place",err);
      res.redirect("/grounds");
    }else {
      res.redirect("/grounds");
    }
  })
});


function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return  next();
  }
  res.redirect("/login");
}


function checkOwnership(req,res,next){
  if(req.isAuthenticated()){
    campground.findById(req.params.id,function(err,foundGround){
      if (err) {
        console.log("error took place",err);
        res.redirect("back");
      }else {
        if(foundGround.author.id.equals(req.user._id))
          next();
        else {
          res.redirect("back");
        }
      }
    });
  }else {
    res.redirect("back");
  }
}


module.exports= router;
