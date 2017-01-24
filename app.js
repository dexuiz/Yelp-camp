var  express =require("express");
var  app = express();
app.set("view engine","ejs");
var bodyParser= require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

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
  res.render("campgrounds",{grounds:grounds});
})

app.post("/grounds",function(req,res){
 console.log("You accessed the post route");
 grounds.push({name:req.body.newName , image:req.body.newImage});
 res.redirect("/grounds");
})
app.get("/grounds/new",function(req,res){
  res.render("new");
})

app.listen(3000,function(){
  console.log("yelp camp server on 3000");
})
