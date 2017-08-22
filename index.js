//dependencies
var keys= require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

//puling and storing twitterkeys in local variables
var keyList=keys.twitterKeys;
var arrayKeys=[];
for (var key in keyList) {
	 arrayKeys.push(keyList[key]);
}

var key1=arrayKeys[0];
var key2=arrayKeys[1];
var key3=arrayKeys[2];
var key4=arrayKeys[3];
//creating new twitter client for user based authentification
var client = new Twitter({
  consumer_key: key1,
  consumer_secret: key2,
  access_token_key: key3,
  access_token_secret: key4
});

//console.log(client);

//puling and storing spotify keys in local variables
var skeyList=keys.spotifyKeys;
var arraySpotKeys=[];
for (var key in skeyList) {
	 arraySpotKeys.push(skeyList[key]);
}

var Spotkey1=arraySpotKeys[0];
var Spotkey2=arraySpotKeys[1];

var input= process.argv[2];

//usage of twitter API
if(input==="my-tweets"){
	twitter();
}

	function twitter(){
var params = {screen_name: 'bryan_sylla', count:'20'};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	console.log("THESE ARE YOUR " + params.count + " LAST TWEETS.\n");
  	for(i=0;i<tweets.length;i++){
  			console.log("TWEET: " + tweets[i].text,"TIME CREATED: " + tweets[i].created_at);
	}
	//console.log(i);
  }
  else
  	console.log("there was an error");
});

}

//usage of spotify API
if(input==="spotify-this-song"){
	var query="";
spotify(query);
}
function spotify(query){

 
var spotify = new Spotify({
  id: Spotkey1,
  secret: Spotkey2
});
//query builder that takes all arguments after process.argv[2] 

 for(k=3;k<process.argv.length;k++){
 	 query= query + process.argv[k] + " ";
 	
 }
 //console.log(process.argv.length);
 console.log(query);
 //default query if no argument is entered
if(query==""){
query="The Sign";
spotify.search({ type: 'track', query: query }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
//console.log(data); 
//console.log(data.tracks.items);
	for(i=0;i<data.tracks.items.length;i++){
		for(j=0;j<data.tracks.items[i].artists.length;j++)
		if(data.tracks.items[i].artists[j].name=="Ace of Base" && data.tracks.items[i].name=="The Sign" ){
			console.log("ARTIST(S)");
			for(j=0;j<data.tracks.items[i].artists.length;j++)
				console.log("Artist: " + data.tracks.items[i].artists[j].name);
				console.log("TRACK NAME: " + data.tracks.items[i].name);
				console.log("PREVIEW LINK: " + data.tracks.items[i].external_urls.spotify);
				console.log("ALBUM NAME: " + data.tracks.items[i].album.name + "\n");
		}
	}
});
}

else{
spotify.search({ type: 'track', query: query }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
//console.log(data); 
//console.log(data.tracks.items);
for(i=0;i<data.tracks.items.length;i++){
	console.log("ARTIST(S)");
for(j=0;j<data.tracks.items[i].artists.length;j++)
console.log("Artist: " + data.tracks.items[i].artists[j].name);
console.log("TRACK NAME: " + data.tracks.items[i].name);
console.log("PREVIEW LINK: " + data.tracks.items[i].external_urls.spotify);
console.log("ALBUM NAME: " + data.tracks.items[i].album.name + "\n");
}
});
}
}


if(input==="movie-this"){
	var title="";
omdb(title);
}

function omdb(title){
 
 for(k=3;k<process.argv.length;k++)
 	 title= title + process.argv[k] + " ";
 	
 	if(title=="")
 		title="Mr. Nobody";
 	
// Then run a request to the OMDB API with the movie specified
request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("The title of the movie is: " + JSON.parse(body).Title);
    console.log("The year the movie came out was: " + JSON.parse(body).Year);
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    console.log("The Rotten Tomatoes rating of the movie: " + JSON.parse(body).Ratings[1].Value);
    console.log("The movie was produced in: " + JSON.parse(body).Country);
    console.log("The language of the movie is: " + JSON.parse(body).Language);
    console.log("The plot of the movie is: " + JSON.parse(body).Plot);
    console.log("The actors in the movie are: " + JSON.parse(body).Actors);
  }
});
}

if(input==="do-what-it-says"){
commandtextreader();

}

	function commandtextreader(){
// This block of code will read from the "random.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  console.log(data);

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  console.log(dataArr);

  input=dataArr[0];
  var input2=dataArr[1];
  

 if(input==="my-tweets"){
	twitter();
}

if(input==="spotify-this-song"){
spotify(input2);
}

if(input==="movie-this"){
omdb(input2);
}


});

}

