var express=require("express");
var router= express.Router();
var Campground=require("../models/campground");
router.get("/campgrounds",function(req,res) {
	console.log(req.user);
	Campground.find({},function(err,allcampgrounds) {
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render("campgrounds/index.ejs",{campgrounds:allcampgrounds,currentUser:req.user});
		}
		// body...
	})
	
	// body...
})

router.post("/campgrounds",isLoggedIn,function(req,res) {
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var author={
		id:req.user._id,
		username:req.user.username
	};
	var newCampground={name:name,image:image,description:desc,author:author};

	Campground.create(newCampground,function(err,newlyCreated) {
		// body...if(err)
		if(err)
		{
			console.log(err);
		}
		else
		{	
			console.log("newlyCreated cg"+newlyCreated);
			res.redirect("/campgrounds");
		}
	})
	
	// body...
})
router.get("/campgrounds/new",isLoggedIn,function (req,res) {
	// body...
	res.render("campgrounds/new.ejs");
})


router.get("/campgrounds/:id",function(req,res) {
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

//middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};


module.exports=router;