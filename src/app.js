//imports
const path = require ("path");
const express = require ("express");
const hbs = require ("hbs");
const geocodeUtil = require("./utils/geocode")
const forecastUtil = require("./utils/forecast")


//initiate the server
const app = express(); 


//load the static assets
var assetsPath = path.join (__dirname, "../assets");
app.use(express.static(assetsPath));

//set the view engine
app.set("view engine", "hbs"); // HBS is ExpressJS view engine
//app.set("view", path.join(__dirname, "../templates")); //use this if you want to use customized name (e.g. "templates") for the Views folder instead of "views"
hbs.registerPartials (path.join(__dirname, "../views/partials")); // set the partial views location


//configure the server
app.get("", function (req, res){ //path is empty string which means the root route (the index page)
    //render hbs view
    res.render("index", //this name needs to match the name created in views folder (index.hbs)
    { // this is the data to be passed to the view
        title: "Weather App",
        message: "This is Index page",
        name: "Adham Suwan @ Index" 
    }); 
});
app.get("/help", function (req, res){ //help page route
    res.render("help", {
        title: "Help Page",
        message: "Hi, How can I help?",
        name: "Adham Suwan @ Help"
    }); 
});
app.get("/about", function (req, res){ //about page route
    res.render("about", {
        title: "About Me",
        message: "This is About page",
        name: "Adham Suwan @ About"
    }); 
});
app.get("/weather", function (req, res){ //weather page route
    var addressValue = req.query.address;
    if (!addressValue){
        return res.send ({
            error: "You must provide address value"
        });
    }

    //now using the address as input to the geocode function, and continue exactly as in weather-app
    geocodeUtil.geocodeFunc (addressValue, function (geocodeError, geocodeData){
        if (geocodeError){
            return res.send({ 
                error: geocodeError
            });
        }
        forecastUtil.forecastFunc (geocodeData.latitude, geocodeData.longitude, function (forecastError, forecastData){
            if (forecastError){
                return res.send({ 
                    error: forecastError
                });
            }
            return res.send({ 
                forecast: forecastData,
                location: geocodeData.location,
                address: addressValue
            });    
        });
    
    });
});


app.get ("/products", function (req, res){
    var searchValue = req.query.search; //when entering "/products?search=games", this variable will be "games"
    if (!searchValue){
        return res.send ({
            error: "You must provide a search value"
        });
    }
    console.log (searchValue);
    return res.send ({
        products:[]
    });
});

app.get ("/help/*", function (req, res){ //help error page route; This is should come last
    res.render("404", {
        title: "Help 404 Not Found",
        message: "Help article not found",
        name: "Adham Suwan @ help error"
    }); 
});

app.get ("*", function (req, res){ //general error page route; match anything that has not been matched above. This is should come last
    res.render("404", {
        title: "404 Not Found",
        message: "My 404 page",
        name: "Adham Suwan @ general error"
    }); 
});

//start the server
app.listen(3000, function(){
    console.log("Server is up on port 3000");
});

