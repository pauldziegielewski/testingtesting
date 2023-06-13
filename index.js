//import required modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const trakt = require("./modules/trakt/api");
// const traktAuth = require("./modules/trakt/oauth");

//set up Express app
const app = express();
const port = process.env.PORT || 8888;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//setup public folder
app.use(express.static(path.join(__dirname, "public")));

let accessToken;

//PAGE ROUTES
app.get("/", async (request, response) => {
  let movies = await trakt.getTrendingMovies();
  // console.log(movies);
  response.render("index", { title: "Movies", movieList: movies });
});

app.get("/ratings/:id", async (request, response) => {
  let ratings = await trakt.getMovieRatings(request.params.id);
  let info = await trakt.getMovieSummary(request.params.id);
  // RENDERING A RESPONSE
  response.render("ratings", {
    title: "Movie ratings",
    ratings: ratings,
    movieInfo: info,
  });
});


// ***********************************************
// PAGE ROUTING TO SHOW 15 SHOWS
// ***********************************************
app.get("/shows", async (request, response) => {
  let shows = await trakt.getShows();
  response.render("shows", { title: "Top shows", topShows: shows });
});





app.get("/page-requiring-oauth", async (request, response) => {
  if (accessToken) {
    let userData = await trakt.getUserData("YOUR_SLUG", accessToken); //function to display secured data
    console.log(userData);
  } else {
    let authUrl = traktAuth.startAuthorizing(); //if no accessToken, kickstart the OAuth process
    response.redirect(authUrl);
  }
});
app.get("/authorize", async (request, response) => {
  if (request.query.code && !accessToken) {
    token = await traktAuth.getAccessToken(request.query.code); //if there is code, get access token
    if (token.access_token) {
      accessToken = token.access_token;
      response.redirect("/page-requiring-oauth");
    }
  } else {
    //kickstart authorizing
    console.log("start again");
  }
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
