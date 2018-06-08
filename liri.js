require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var Twitter = require('twitter');
var myTweets = [];

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];


if (command === "my-tweets") {
    twentyTweets();
}

if (command === "spotify-this-song") {
    spotifySearch();
}

//Display last 20 Tweets
function twentyTweets(){
    var params = {screen_name: 'allie4u_', count: 20, exclude_replies:true, trim_user:true};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
      if(!error){
            console.log(tweets)
            myTweets = tweets;

            for(i=0; i<myTweets.length; i++){
                console.log("Tweet: " + myTweets[i].text);
                console.log("Date: " + myTweets[i].created_at);
                console.log('--------------------------------------');
            }
        }
      else{
        console.log('Error');
      }
    });
  }

//search spotify

var songToSearch = process.argv[3]
if (songToSearch === null) {
    songToSearch = 'The Sign' 
} 
else {
    songToSearch = process.argv[3]
}
//leaving it blank is not working for me 
function spotifySearch(){
    spotify.search({ type: 'track', query: songToSearch}, function(error, data){
      if(!error){
        for(var i = 0; i < data.tracks.items.length; i++){
          var song = data.tracks.items[i];
          console.log("Artist: " + song.artists[0].name);
          console.log("Song: " + song.name);
          console.log("Preview: " + song.preview_url);
          console.log("Album: " + song.album.name);
          console.log("-----------------------");
        }
      } else{
        console.log('Error occurred.');
      }
    });
  }
  

  //did not complete the omdb request portion