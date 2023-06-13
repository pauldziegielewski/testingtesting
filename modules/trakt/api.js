const trakt = "https://api.trakt.tv"; //base URL for any Trakt API requests

/*
 * Functions for Trakt API requests.
 */
async function getTrendingMovies() {
  let reqUrl = `${trakt}/movies/trending`;
  console.log(reqUrl);
  var response = await fetch(
    reqUrl,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": process.env.TRAKT_CLIENT_ID
      }
    }
  );
  return await response.json();
}


// FUNCTION TO GET MOVIE RATINGS
async function getMovieRatings(id) {
  let reqUrl = `${trakt}/movies/${id}/ratings`;
  let response = await fetch(
    reqUrl,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": process.env.TRAKT_CLIENT_ID
      }
    }
  );
  return await response.json(); // convert response to JSON and return it
}


async function getMovieSummary(id) {
  let reqUrl = `${trakt}/movies/${id}`;
  let response = await fetch(
    reqUrl, 
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": process.env.TRAKT_CLIENT_ID
      }
    }
  );
  return await response.json();
}


// ---------------- FUNCTION for LAB - getShows()
async function getShows() {
  const limit = 15;
  let reqUrl = `${trakt}/shows/popular?limit=${limit}`;
  let response = await fetch( reqUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": 2,
      "trakt-api-key": process.env.TRAKT_CLIENT_ID
    }
  }
  );
  return await response.json();
}




async function getUserData(slug, token) {
  let reqUrl = `${trakt}/users/${slug}`;
  var response = await fetch(
    reqUrl,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": process.env.TRAKT_CLIENT_ID,
        "Authorization": `Bearer ${token}`,
      }
    }
  );
  return await response.json();
}

module.exports = {
  getTrendingMovies,
  getMovieRatings,
  getMovieSummary,
  getShows,
  getUserData
};