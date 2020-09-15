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

var commentRoutes =require("./routes/comments");
var campgroundRoutes=require("./routes/campgrounds");
var indexRoutes=require("./routes/index");
app.use(express.static(__dirname + "/public"))
seedDB();


mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");



//passport configuration
app.use(require("express-session")({
	secret:"Once again Bittu wins cutest dog!",
	resave: false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next) {
	res.locals.currentUser=req.user;
	next();
});


//requiring routes
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);












app.listen(3000,'localhost',function() {
	// body...
	console.log("Listening to port"+3000);
	console.log("Yelpcamp Local Server has Started");

});