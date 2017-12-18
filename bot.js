console.log("Wassup Twitter");

var Twit = require('twit');

var config = require('./config');

// console.log(config);  --> Sanity Check

var T = new Twit(config);
