var Twit = require('twit');

var config = require('../config');

var T = new Twit(config);

function generateTweet(){

	var randomNum = Math.floor(Math.random() * 100);

	var tweet = {
		status: "This is a test post and " + randomNum + " is a #randomNumber !"
	}

	function post(err, data, response){
		if(err){
			console.log("Oops! Something went wrong!");
		}
		else{
			console.log("Tweet is up on twitter!");
		}
	}

	T.post('statuses/update', tweet, post);

}

generateTweet();
setInterval(generateTweet,1000*20);  //Trigger the generateTweet() method every 20 seconds