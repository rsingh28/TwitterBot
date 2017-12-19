console.log("Wassup Twitter");

var Twit = require('twit');

var config = require('./config');

// console.log(config);  --> Sanity Check

var T = new Twit(config);

// ================== Retrieving 5 tweets that have the word "BitCoin" in it ===================

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

// =============================================================================================

// ================== First Post made to Twitter using the Bot! ================================

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

// =============================================================================================