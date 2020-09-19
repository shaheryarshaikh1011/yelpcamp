//all middleware
var Campground=require("../models/campground");
var Comment =require("../models/comment");
var middlewareObj={}

middlewareObj.checkCampgroundOwnership = function(req,res,next) {
	// body...
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCampground) {
		if(err)
		{
			req.flash("error","campground not found");
			res.redirect("back");
		}
		else
		{
			//does user own it
			if(foundCampground.author.id.equals(req.user._id))
			{
				next();
			}
			else
			{
				req.flash("error","you dnt have permission to do that");
				res.redirect("back")
			}
			
		}
	});
	}
	else
	{
		req.flash("error","you need to be logged in to do that");
		res.redirect("back");
	}
};

middlewareObj.checkCommentOwnership = function(req,res,next) {
	// body...
	if(req.isAuthenticated()){
		Comment.findById(req.params.comments_id,function(err,foundComment) {
		if(err)
		{
			res.redirect("back");
		}
		else
		{
			//does user own it
			if(foundComment.author.id.equals(req.user._id))
			{
				next();
			}
			else
			{
				req.flash("error","no permission to do that");
				res.redirect("back")
			}
			
		}
	});
	}
	else
	{
		req.flash("error","you need to be logged in to do that");
		res.redirect("back");
	}
};
	// body...
middlewareObj.isLoggedIn=function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","you need to be logged in 1st");
	res.redirect("/login");
};


module.exports=middlewareObj;