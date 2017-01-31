var  express =require("express");
var  app = express();
var bodyParser= require("body-parser");
var mongoose = require("mongoose");
var campground =require("./models/campground");
var seeds = require("./seeds");

seedDB();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost/yelp-camp");

//schema Setup


// campground.create({
//   name:"lakes",
//   image:"http://www.escapehere.com/wp-content/uploads/2013/07/820x480xBlue-Lake-Australia-820x480.jpg.pagespeed.ic.ewgsVxcoEV.jpg",
//   desc:"kfojfijijufrin8dui8cjnfdiutuneirhtnurtyytr"
// },function(err,grounds){
//   if(err)
//     console.log("error is here",err);
//   else {
//     console.log(grounds);
//   }
// });



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
})
app.get("/grounds/new",function(req,res){
  res.render("new");
})

app.get("/grounds/:id",function(req,res){
   campground.findById(req.params.id,function(err,foundGround){
    if(err){
      console.log("error occured",err);
    }else {
      res.render("show",{ground:foundGround});
    }
  });

})

app.listen(3000,function(){
  console.log("yelp camp server on 3000");
})
