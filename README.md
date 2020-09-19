# yelpcamp

# Routes

* INDEX  /campgrounds
* NEW    /campgrounds/new
* CREATE /campgrounds
* SHOW   /campgrounds/:id

* NEW    /campgrounds/:id/comments/new  GET
* CREATE /campgrounds/:id/comments	  POST

# initial routes
* add landing page
* add campgrounds page

* each campground has
* name
* image

# layout and styling

* header footer
* add in bootstrap


# create new cg
* setup cg route
* add body-parser
* setup form
* add basic unstyled form


# style
* add better header
* make cg display in grid

# navbar and form
* add navbar
* style new cg form

# show page
* make show page

# refactor mongoose code
* use module.exports
* requre everthing correctly

# add seeds file
* add seeds file
* run seeds file everytime server starts

# add comment model
* make error go away
* display comments

# comment new/create
* discuss nested routes
* add comment new and create routes
* add new comment form

# style show page

* add sidebar to show page
* display comments nicely

# add User model

* install all packages needed for auth
* define user model

# passport

* configure passport

# register routes

* add register route
* register template

# login routes

* add login routes
* login template

# logout/Navbar

* add logout route
* prevent user from adding comment if not signed in
* add links to navbar
* show/hide auth links correctly


# show/hide links
* show/hide auth links in navbar correctly


# refactor the code
* use express router to reorganize all routes


## users + comments
* Associate Users and Comments
* Save Author's name to a comment Automatically

## users + campgrounds
* prevent unauth from creating cg
* save uname+id to new cg

## Editing CG
* add methd override
* add edit route for cg
* link to edit page
* add update route
* fix $set prob

## deleting cg
* add destroy
* add delete

## authorization
* user cn only edit his/her cg
* user can only del his/her cg
* hide/show edit n del btn

# site online at
https://yelpcamp1011.herokuapp.com/



