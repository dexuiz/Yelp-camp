var  express =require("express");
var  app = express();
var bodyParser= require("body-parser");
var mongoose = require("mongoose");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost/yelp-camp");
//schema Setup

var schema = new mongoose.Schema({
  name:String,
  image:String,
  desc:String
})

var campground = mongoose.model("campground",schema);

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

var grounds =[
  {name:'mountains' ,image:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/K%C3%B6lpinsee_bei_Jabel.jpg/330px-K%C3%B6lpinsee_bei_Jabel.jpg"},
  {name:'lakes' ,image:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/K%C3%B6lpinsee_bei_Jabel.jpg/330px-K%C3%B6lpinsee_bei_Jabel.jpg"},
  {name:'parks', image:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/K%C3%B6lpinsee_bei_Jabel.jpg/330px-K%C3%B6lpinsee_bei_Jabel.jpg"}
];

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
