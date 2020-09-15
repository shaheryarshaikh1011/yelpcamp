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

router.post("/campgrounds",function(req,res) {
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
router.get("/campgrounds/new",function (req,res) {
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


module.exports=router;