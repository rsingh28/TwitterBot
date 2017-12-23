console.log("Wassup Twitter");

var Twit = require('twit');

var config = require('../config');

// console.log(config);  --> Sanity Check

var T = new Twit(config);

var fs = require('fs');

// ================== Retrieving 5 tweets that have the word "BitCoin" in it ===================

function retreive(){
	var params = {
		q: 'bitcoin',
		count: 5
	}

	T.get('search/tweets', params, search);

	function search(err, data, response){
	//console.log(data);
		var tweet = data.statuses;
		for(var i=0 ; i<tweet.length ; i++){
			console.log(i+1 + " : " + tweet[i].text);
		}
	}
}

//retreive();

// =============================================================================================

// ================== First Post made to Twitter using the Bot! ================================

function firstTweet(){
	var twitterPost = {
		status: "Hello World! This is the first post by this ChatBot!"
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

//firstTweet();

// =============================================================================================

// ================== Mentioning a new follower in a tweet! ====================================

function newFollowerTweet(){
	var stream = T.stream('user');

	stream.on('follow', newFollow);

	function newFollow(data){
		var name = data.source.name;
		var screenName = data.source.screen_name;
		console.log(screenName + " followed me!!");
		tweetIt("Hello, @" + screenName + ", I am a friendly bot. Thanks for following me " + name + "!");
	}

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
}
//newFollowerTweet();

// =============================================================================================

// ============================= Posting an image/media  =======================================

function postPic(){
	var pic = fs.readFileSync('../Media/HarryPotter.jpg', { encoding: 'base64' });

	T.post('media/upload', { media_data: pic }, upload);

	function upload(err, data, response){
		var id = data.media_id_string;

		var tweet = {
			status: "Harry Potter is one of the best movies ever @jk_rowling ‏@HarryPotterFilm #nodeJs #codingLife",
			media_ids: [id]
		}

		T.post('statuses/update', tweet, post);

		function post(err, data, response) {
			if(err){
				console.log("Oops! Something went wrong!");
			}
			else{
				console.log("Tweet is up on twitter!");
			}
		}
	}

}
postPic();

// =============================================================================================
