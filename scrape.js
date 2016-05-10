/*   Copyright © 2015 by Victor G. Didia. All rights reserved.    */

var cheerio = require("cheerio"),
    request = require("request"),
    assert = require('assert'),
    readline = require('readline');

// variables for input at commandline
var answer = '';
//variable for readline that creates an interface for input and output
var rl = readline.createInterface(process.stdin, process.stdout);

rl.question("Enter a url you'd like to scrape: ", function(answer) {
    console.log("URL entered: ", answer);
    scrape(answer); 
});


/* Scrape function sets cases for tags*/  
   function scrape(answer){
	request(answer, function(error,response,html){
        	//load the HTML with the Cheerio module
        	var $ = cheerio.load(html);
        	var results = [];
		var tagTarget = '';
		rl.question("Which tag would you like to target?", (tagTarget) => {
			console.log("\x1b[32m", tagTarget + ' tags will targeted!', "\x1b[0m");
			$(tagTarget).each(function(){
				switch(tagTarget){
					case 'meta':
						var tagContent = $(this).attr('content');
						results.push(tagContent);
						break;
					case 'img':
						var tagContent = $(this).attr('src');
						results.push(tagContent);
					default:
						var tagContent = $(this);
						var data = tagContent.text();
						data = data.replace(/(\r\n|\n|\r|\t\s+)/gm,"").trim();
						results.push(data);
						break;
				}
			});
			console.log( "\x1b[31m", results);
			rl.close();
			process.stdin.destroy();
		});
	});
}


