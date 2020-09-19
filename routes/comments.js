var express=require("express");
var router= express.Router();
var Campground=require("../models/campground");
var Comment =require("../models/comment");
var middleware=require("../middleware");


//new comments form
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req,res) {
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


//comments create
router.post("/campgrounds/:id/comments",middleware.isLoggedIn,function(req,res) {
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
					req.flash("error","something went wrong");
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
					req.flash("success","Added comment");
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

//edit route
router.get("/campgrounds/:id/comments/:comments_id/edit",middleware.checkCommentOwnership,function(req,res) {
	Comment.findById(req.params.comments_id,function(err,foundComment) {
		if(err)
		{
			res.redirect("back");
		}
		else
		{
			res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
		}
	})
	
});

//comment update route
router.put("/campgrounds/:id/comments/:comments_id/edit",middleware.checkCommentOwnership,function(req,res) {
	Comment.findByIdAndUpdate(req.params.comments_id,req.body.comment,function(err,updatedComment) {
		// body...
		if(err)
		{
			res.redirect("back");
		}
		else
		{
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
})

//commment destroy route
router.delete("/campgrounds/:id/comments/:comments_id",middleware.checkCommentOwnership,function(req,res) {
	Comment.findByIdAndRemove(req.params.comments_id,function(err) {
		if(err)
		{
			res.redirect("back");
		}
		else
		{
			req.flash("success","Comment deleted");
			res.redirect("/campgrounds/"+req.params.id);
		}
		// body...
	})
})



module.exports=router;