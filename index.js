"use strict";

var tsmanager = require('./lib/tsmanager');

var option = process.argv[2];

if(option == "show"){
	tsmanager.showEpisodes(function(){

	});
}

if(option == "move"){
	tsmanager.moveEpisodes(function(){
		console.log("Done");
	});
}

if(option == "watchEpisodes"){
	tsmanager.watchForEpisodes(function(){
		console.log("Done: " + new Date());
	});
}