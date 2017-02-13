var  express =require("express");
var  app = express();
var bodyParser= require("body-parser");
var mongoose = require("mongoose");
var campground =require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var passport =require("passport");
var localStrategy=require("passport-local");
var User= require("./models/user");
seedDB();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost/yelp-camp");
app.use(express.static(__dirname +"/public"));
app.use(function(req,res,next){
  res.locals.current = req.user;
  next();
});
//

app.use(require("express-session")({
  secret:"dexuiz is me",
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get("/",function(req,res){
  console.log("yelp camp is on");
  res.render("home");
});


app.get("/grounds",function(req,res){
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

app.post("/grounds",function(req,res){

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
      res.render("show",{ground:foundGround, current:req.user});
    }
  });

});


app.get("/grounds/:id/comments/new",isLoggedIn,function(req,res){
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


app.get("/register",function(req,res){
    res.render("register");
});

app.post("/register",function(req,res){
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


app.get("/login",function(req,res){
  res.render("login");
});

app.post("/login",passport.authenticate("local",{successRedirect:"/grounds",failureRedirect:"/login"}),function(req,res){

})

app.get("/logout",function(req,res){
  req.logout();
  res.redirect("/grounds");
})



function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return  next();
  }
  res.redirect("/login");
}


app.listen(3000,function(){
  console.log("yelp camp server on 3000");
})
