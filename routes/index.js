var express=require("express");
var router= express.Router();
var passport=require("passport");
var User    =require("../models/user");


//landing page
router.get("/",function(req,res) {
	// body...
	res.render("landing.ejs");
});

//show register form
router.get("/register",function(req,res) {
	res.render("register");
	// body...
});

//handle signup logic
router.post("/register",function(req,res) {
	// body...
	var newUser = new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user) {
		// body...
		if(err)
		{
			return res.render("register", {"error": err.message});
		}
		passport.authenticate("local")(req,res,function() {
			// body...
			req.flash("success","Welcome to Yelpcamp "+user.username);
		    res.redirect("/campgrounds");
		});
	});
});


//login routes

//show login form
router.get("/login",function(req,res) {
	// body...
	res.render("login");
});

//handling login logic
router.post("/login",passport.authenticate("local",
	{
		successRedirect:"/campgrounds",
	 	failureRedirect:"/login"
	 }),function(req,res) {
	// body...
	
});

//logout route
router.get("/logout",function(req,res) {
	req.logout();
	req.flash("success","Logged you out");
	res.redirect("/campgrounds");
});






//middleware


module.exports=router;