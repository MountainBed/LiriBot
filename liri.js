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

function queryString () {
  for (var i = 0; i < searchArray.length; i++) {
    if (i > 0) {
      searchString = searchString + "+" + searchArray[i];
    } else {
      searchString = searchArray[i];
    }
  }
};
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
  if (searchQuery === "") {
    searchQuery = "The+Sign+Ace+of+Base";
  }
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
function findMovie (searchQuery) {
  if (searchQuery === "") {
    searchQuery = "Mr+Nobody";
  }
  request("http://www.omdbapi.com/?t=" + searchQuery + "&y=&plot=short&apikey=40e9cece", function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var movieInfo = JSON.parse(body);

      if (movieInfo.Title === undefined || movieInfo.Title === null) {
        console.log("Movie not found.");
        return;
      }

      console.log("****Results for " + movieInfo.Title + "****");
      console.log("Title: " + movieInfo.Title);
      for (var i = 0; i < movieInfo.Ratings.length; i++) {
        console.log(movieInfo.Ratings[i].Source + ": " + movieInfo.Ratings[i].Value);
      }
      console.log("Production country: " + movieInfo.Country);
      console.log("Language: " + movieInfo.Language);
      console.log("Plot: " + movieInfo.Plot);
      console.log("Actors: " + movieInfo.Actors);
    } else {
      console.log("There was an error: " + error);
    }
  });
};
function randomCommand () {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    var output = data.split(",");
    command = output[0];
    for (var i = 1; i < output.length; i++) {
      if (i > 0) {
        searchString = searchString + "+" + output[i];
      } else {
        searchString = output[i];
      }
    }

    switch (command) {
      case "my-tweets":
        findTweet();
        break;
      case "spotify-this-song":
        findTrack(searchString);
        break;
      case "movie-this":
        findMovie(searchString);
        break;
      default:
        console.log("This is not a recognized command.");
    }
  });
};

function mainApp () {
  queryString();

  switch (command) {
    case "my-tweets":
      findTweet();
      break;
    case "spotify-this-song":
      findTrack(searchString);
      break;
    case "movie-this":
      findMovie(searchString);
      break;
    case "do-what-it-says":
      randomCommand();
      break;
    default:
      console.log("This is not a recognized command.");
  }
}

mainApp();
