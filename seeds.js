var mongoose = require("mongoose");
var campground = require("./models/campground");
var comment = require("./models/comment");
var data = [
  {name:"mountains",
  image:"https://images.pexels.com/photos/27403/pexels-photo-27403.jpg?h=350&auto=compress&cs=tinysrgb",
  desc:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu f"
  },
  {name:"mountains",
  image:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSnus8X0SrEtwdF1MNPCJ0oSZAh4GnwyszmP0muSpuMWW1zIc0O",
  desc:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu f"
  },
  {name:"mountains",
  image:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTgiWlF5H_lOmudkQ_E25mar4IheQYgImzWMZ7XY3q9yUOcmwyCgQ",
  desc:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu f"
  },

];

var comment
function seedDB(){
  //remove all campgrounds
  campground.remove({},function(err){
    if (err) {
      console.log("error took place");
    }else {
      console.log("wiped");
      data.forEach(function(seed){
        campground.create(seed,function(err,data){
          if (err) {
            console.log("error took place");
          }
          else {
            console.log("data added");
            comment.create({
              text:"balasdl asdasd",
              author:"jajaja lalala"
            },function(err,comment){
              if (err) {
                console.log('error took place');
              }else
                campground.comments.push(comment);
                campground.save();
                console.log("comment added to the post");
            })
          }
        })
      });
    }
  });

}

module.exports = seedDB;
