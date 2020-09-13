var express = require("express");
var app= express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var Campground=require("./models/campground");
var Comment =require("./models/comment");
var User    =require("./models/user");
var seedDB=require("./seeds");

app.use(express.static(__dirname + "/public"))
seedDB();


mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");




app.get("/",function(req,res) {
	// body...
	res.render("landing.ejs");
})


app.get("/campgrounds",function(req,res) {
	
	Campground.find({},function(err,allcampgrounds) {
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render("campgrounds/index.ejs",{campgrounds:allcampgrounds});
		}
		// body...
	})
	
	// body...
})

app.post("/campgrounds",function(req,res) {
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var newCampground={name:name,image:image,description:desc};
	Campground.create(newCampground,function(err,newlyCreated) {
		// body...if(err)
		if(err)
		{
			console.log(err);
		}
		else
		{	
			res.redirect("/campgrounds");
		}
	})
	
	// body...
})
app.get("/campgrounds/new",function (req,res) {
	// body...
	res.render("campgrounds/new.ejs");
})


app.get("/campgrounds/:id",function(req,res) {
	//find cg by id
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground) {
		// body...
		if(err)
		{
			console.log(err);		
		}
		else
		{

			res.render("campgrounds/show",{campground:foundCampground});
		}
	})
	
	// body...
});



//=====================================================
//comments routes
//===============================================================

app.get("/campgrounds/:id/comments/new",function(req,res) {
	// body...
	//find cg by id
	Campground.findById(req.params.id,function(err,campground) {
		// body...
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render("comments/new",{campground:campground});
		}
	})
	
});


app.post("/campgrounds/:id/comments",function(req,res) {
	//lookup cg using id
	Campground.findById(req.params.id,function(err,campground) {
		if(err)
		{
			console.log(err);
			res.redirect("/campgrounds");
		}
		else
		{
			//create new comment
			Comment.create(req.body.comment,function(err,comment) {
				if(err)
				{
					console.log(err);
				}
				else
				{
					campground.comments.push(comment);
					campground.save();
					//show page
					res.redirect("/campgrounds/"+campground._id);
				}
				// body...
			})
		}
		// body...
	})
	
	//connect comment to cg
	//redirect to show page

})

app.listen(3000,'localhost',function() {
	// body...
	console.log("Listening to port"+3000);
	console.log("Yelpcamp Local Server has Started");

});