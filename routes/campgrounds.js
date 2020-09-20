var express=require("express");
var router= express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware");
router.get("/campgrounds",function(req,res) {
	console.log("user"+req.user+"visited cg page");
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

router.post("/campgrounds",middleware.isLoggedIn,function(req,res) {
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var price=req.body.price;
	var author={
		id:req.user._id,
		username:req.user.username
	};
	var newCampground={name:name,image:image,description:desc,author:author,price:price};

	Campground.create(newCampground,function(err,newlyCreated) {
		// body...if(err)
		if(err)
		{
			console.log(err);
		}
		else
		{	
			console.log("newlyCreated cg is"+newlyCreated);
			res.redirect("/campgrounds");
		}
	})
	
	// body...
})
router.get("/campgrounds/new",middleware.isLoggedIn,function (req,res) {
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

//edit cg route
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res) {
	//is user logged in at all

		Campground.findById(req.params.id,function(err,foundCampground) {
		
				res.render("campgrounds/edit",{campground:foundCampground});
			
			});
});
//update cg route
router.put("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res) {
	//find and update

	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground) {
		// body...
		if(err)
		{
				res.redirect("/campgrounds")
		}
		else
		{
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
	//redir
});

router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res) {
	// body...
	Campground.findByIdAndRemove(req.params.id,function(err) {
		if(err)
		{
			res.redirect("/campgrounds");
		// body...
		}
		else
		{
			res.redirect("/campgrounds");
		}
	})
});



module.exports=router;