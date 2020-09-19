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
				res.redirect("back")
			}
			
		}
	});
	}
	else
	{
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
				res.redirect("back")
			}
			
		}
	});
	}
	else
	{
		res.redirect("back");
	}
};
	// body...
middlewareObj.isLoggedIn=function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};


module.exports=middlewareObj;