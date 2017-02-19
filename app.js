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
var methodOverride=require("method-override");

var commentRoutes =require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

//seedDB();//no seeding required as of now
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost/yelp-camp");
app.use(express.static(__dirname +"/public"));
app.use(methodOverride("_method"))
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

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);



app.listen(3000,function(){
  console.log("yelp camp server on 3000");
})
