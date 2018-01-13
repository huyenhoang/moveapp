// app dependencies
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride = require("method-override"),
    
    // required models    
    User            = require("./models/user")
    
    
// required for routes
var indexRoutes         = require("./routes/index")
    
// App configurations
mongoose.connect("mongodb://localhost/moveapp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+ "/public"));
app.use(methodOverride("_method"));

// Passport configurations
app.use(require("express-session")({
    secret: "This is the secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// Routes
app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The MOVE Server Has Started!");
});