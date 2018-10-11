require("dotenv").config();
var keys = require("./keys");                       //pulls data from from keys.js
var Spotify = require("node-spotify-api");          //pulls from spotify api
var request = require("request");                   //references request installation
var moment = require('moment');                     //references moment installation
var spotify = new Spotify(keys.spotify);            //constructor for spotify
var fs = require("fs");                             //references fs installation 

function doWhatItSays(command, title) {             //do what it says stored as function to call to all other commands, ie "move-this", "concert-this", "spotfiy-this-song"

    if (command === "concert-this") {               //concert-this option pulled bandsInTown api

        var artist = process.argv.slice(3).join(" ")
        console.log(artist);
      
        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        request(queryURL, function (error, response, body) {
            if (error) {
                return console.log("Error:", error);
            }

            var result = JSON.parse(body)[0];
            console.log("========================================");
            console.log("Venue name " + result.venue.name);
            console.log("Venue location " + result.venue.city);
            console.log("Date of Event " + moment(result.datetime).format("MM/DD/YYYY"));
            console.log("========================================");
        });

    } else if (command === "spotify-this-song") {          //spotify-this-song options pulled from spotify API

        if (!title) {
            title = "the%20sign%20artist:ace%20of%20base"; // default song
        }

        spotify.search({ type: 'track', query: title }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("========================================");
            console.log("Artist:", data.tracks.items[0].artists[0].name);
            console.log("Song:", data.tracks.items[0].name);
            console.log("Album:", data.tracks.items[0].album.name);
            console.log("Preview:", data.tracks.items[0].preview_url);
            console.log("========================================");
        });

    } else if (command === "movie-this") {          //movie-this function pulled from omdb

        if (!title) {
            title = "Mr. Nobody";                   // default movie
        }

        var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + title;
        request(queryURL, function (error, response, body) {
            if (error) {
                return console.log("Error:", error);
            }

            var parsedBody = JSON.parse(body);
            var rotten;

                                                    // loop through to find rating
            for (var i = 0; i < parsedBody.Ratings.length; i++) {
                if (parsedBody.Ratings[i]["Source"] === "Rotten Tomatoes") {
                    rotten = parsedBody.Ratings[i]["Value"];
                    i = parsedBody.Ratings.length;
                }
            }

            console.log("========================================");
            console.log("Title:", parsedBody.Title);
            console.log("Year:", parsedBody.Year);
            console.log("IMDB Rating:", parsedBody.imdbRating);
            console.log("Rotten Tomatoes Rating:", rotten);
            console.log("Country:", parsedBody.Country);
            console.log("Language:", parsedBody.Language);
            console.log("Plot:", parsedBody.Plot);
            console.log("Actors:", parsedBody.Actors);
            console.log("========================================");
        });

    }
    else if (command === "do-what-it-says") {   //do what it says draws from fs to read random.txt
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            };

            var dataArray = data.split(",");
            doWhatItSays(dataArray[0], dataArray[1]);
        })
    }

}


doWhatItSays(process.argv[2], process.argv[3]);
