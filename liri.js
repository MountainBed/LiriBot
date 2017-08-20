var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
const chalk = require("chalk");
var keys = require("./keys.js");

var newSpot = new Spotify({
  id: "a831ec9eca53413a81ad8d4b2f388ed4",
  secret: "0553b281fdd741c489b5df2835ac292b"
});
var client = new Twitter(keys.twitterKeys);
var twitterHandle = "@helloworldXIK";
var command = process.argv[2];
var searchArray = process.argv.slice(3);
var searchString = "";

function findMovie (searchQuery) {
  request("http://www.omdbapi.com/?t=" + searchQuery + "&y=&plot=short&apikey=40e9cece", function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var movieInfo = JSON.parse(body);

      console.log("****Results for " + movieInfo.Title + "****");
      console.log("Title: " + movieInfo.Title);
      console.log("IMDB rating: " + movieInfo.Ratings[0].Value);
      console.log("Rotten Tomatoes rating: " + movieInfo.Ratings[1].Value);
      console.log("Production country: " + movieInfo.Country);
      console.log("Language: " + movieInfo.Language);
      console.log("Plot: " + movieInfo.Plot);
      console.log("Actors: " + movieInfo.Actors);
    }
  });
}

function findTweet () {
  client.get("statuses/user_timeline", function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(chalk.red("\"" + tweets[tweets.length - 1 - i].text + "\""));
        console.log(chalk.blue("   " + twitterHandle + " on " + tweets[tweets.length - 1 - i].created_at) + "\n");
      }
    } else {
      console.log("There was an error.");
    }
  });
};

function findTrack (searchQuery) {
  newSpot.search({ type: "track", query: searchQuery }, function (err, data) {
    if (err) {
      console.log("Error occurred: " + err);
      return;
    }
    var songInfo = data.tracks.items[0];
    console.log("===========");
    console.log("Artist: " + songInfo.artists[0].name);
    console.log("Album: " + songInfo.album.name);
    console.log("Name: " + songInfo.name);
    console.log("Link: " + songInfo.preview_url);
  });
};
function queryString () {
  for (var i = 0; i < searchArray.length; i++) {
    if (i > 0) {
      searchString = searchString + "+" + searchArray[i];
    } else {
      searchString = searchArray[i];
    }
  }
};

function mainApp () {
  queryString();

  switch (command) {
    case "my-tweets":
      console.log("Twitter");
      break;
    case "spotify-this-song":
      console.log("spotify");
      break;
    case "movie-this":
      console.log("movie");
      break;
    case "do-what-it-says":
      console.log("Text file");
      break;
  }
}

mainApp();
