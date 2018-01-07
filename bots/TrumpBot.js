console.log("Wassup Twitter");

var Twit = require('twit');

var config = require('../config');

var fs = require('fs');

var T = new Twit(config);

function tweetIt(tweet){

	T.post('statuses/update', tweet, post); 

	function post(err, data, response) {
		if(err){
			console.log("Oops! Something went wrong!");
			console.log(err);
		}
		else{
			console.log("Tweet is up on twitter!");
		}
	}
}

function apology(text){
	var pic = fs.readFileSync('../Media/sorryPup.jpg', { encoding: 'base64' });

	T.post('media/upload', { media_data: pic }, upload);

	function upload(err, data, response){
		var id = data.media_id_string;

		var tweet = {
			status: text,
			media_ids: [id]
		}

		tweetIt(tweet);
	}

}

var stream = T.stream('statuses/filter', { follow: '25073877' });

stream.on('tweet', function (data) {
	var twitterId = data.user.screen_name;
	if(twitterId != 'realDonaldTrump'){
		return;
	}

	console.log(data);

	console.log(twitterId + " posted!");
	var randomNum = Math.floor(Math.random() * 100);
	apology("@" + twitterId + " tweeted again :( . I would like to apologize on his behalf #RandomNumber" + randomNum);
});
