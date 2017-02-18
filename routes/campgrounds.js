var express = require("express");
var router=express.Router();
var campground=require("../models/campground")

router.get("/grounds",function(req,res){
console.log("bc");
console.log(req.user);
  campground.find({},function(err,campgrounds){
    if(err){
      console.log("error detected");
    }else {
      res.render("campgrounds",{grounds:campgrounds , current:req.user});
    }
  })
})

router.post("/grounds",function(req,res){

 campground.create({name:req.body.newName , image:req.body.newImage ,desc:req.body.newDesc},function(err,campgrounds){
   if(err)
      console.log("error generated",err);
    else {
      console.log("add done");
      res.redirect("/grounds");

    }
 });
});


router.get("/grounds/new",function(req,res){
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

module.exports= router;
