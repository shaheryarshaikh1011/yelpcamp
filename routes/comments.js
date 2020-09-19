var express=require("express");
var router= express.Router();
var Campground=require("../models/campground");
var Comment =require("../models/comment");


//new comments form
router.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res) {
	// body...
	//find cg by id
	console.log(req.params.id);
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


//comments create
router.post("/campgrounds/:id/comments",isLoggedIn,function(req,res) {
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
					//add username and id to comment
					comment.author.id=req.user._id;
					comment.author.username=req.user.username;
					comment.save();
					//save comments
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
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

});


//middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};


module.exports=router;