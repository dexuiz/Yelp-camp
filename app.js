var  express =require("express");
var  app = express();
var bodyParser= require("body-parser");
var mongoose = require("mongoose");
var campground =require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment")
seedDB();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost/yelp-camp");
app.use(express.static(__dirname +"/public"));
//schema Setup



app.get("/",function(req,res){
  console.log("yelp camp is on");
  res.render("home");
});


app.get("/grounds",function(req,res){
  campground.find({},function(err,campgrounds){
    if(err){
      console.log("error detected");
    }else {
      res.render("campgrounds",{grounds:campgrounds});
    }
  })
})

app.post("/grounds",function(req,res){
 console.log(req.body.newDesc);

 campground.create({name:req.body.newName , image:req.body.newImage ,desc:req.body.newDesc},function(err,campgrounds){
   if(err)
      console.log("error generated",err);
    else {
      console.log("add done");
      res.redirect("/grounds");

    }
 });
});
app.get("/grounds/new",function(req,res){
  res.render("new");
});

//show route
app.get("/grounds/:id",function(req,res){
   campground.findById(req.params.id).populate("comments").exec(function(err,foundGround){
    if(err){
      console.log("error occured",err);
    }else {
      res.render("show",{ground:foundGround});
    }
  });

});


app.get("/grounds/:id/comments/new",function(req,res){
  campground.findById(req.params.id,function(err,data){
    if (err) {
      console.log("error took place");
    }else {
      res.render("comments/new",{ground:data})
    }
  });
});

app.post("/grounds/:id/comments",function(req,res){
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


app.listen(3000,function(){
  console.log("yelp camp server on 3000");
})
