console.log("Wassup Twitter");

var Twit = require('twit');

var config = require('../config');

// console.log(config);  --> Sanity Check

var T = new Twit(config);

function tweetIt(text){
	var twitterPost = {
		status: text
	}

	T.post('statuses/update', twitterPost, post); 

	function post(err, data, response) {
		if(err){
			console.log("Oops! Something went wrong!");
		}
		else{
			console.log("Tweet is up on twitter!");
		}
	}
}


var stream = T.stream('statuses/filter', { follow: '3106272854' });

stream.on('tweet', function (data) {
	console.log(data.user.screen_name + " posted!");

	tweetIt("@" + data.user.screen_name + " just posted!");

});
