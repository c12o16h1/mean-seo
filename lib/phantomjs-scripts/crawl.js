'use strict';
var TIMEOUT_INITIAL = 1000;
var TIMEOUT_INTERVAL = 333;
var TIMEOUT_MAX = 5000;
/**
 * Module dependencies
 */
var page = require("webpage").create(),
	system = require('system'),
	url = system.args[1];

page.viewportSize = {
	width: 1440,
	height: 900
};
/**
 * Function to compare sources
 * @param oldPageContent
 * @param newPageContent
 * @returns {boolean}
 */
	var pageIsSame = function(oldPageContent, newPageContent){
		var oldLength = 0;
		var newLength = 1;
		if(oldPageContent && oldPageContent.length){
			oldLength = oldPageContent.length;
		}
		if(newPageContent && newPageContent.length){
			newLength = newPageContent.length;
		}
		return (newLength === oldLength);
	};

/**
 * PhantomJS script
 */
page.open(url, function(status) {
	// If PhantomJS successfully crawled
	if (status !== "success") {
		console.log("===! Unable to access network\n");
		// Exiting PhantomJS process
		phantom.exit();
	} else {
		var pageOpenedAt = Date.now();
		setTimeout(function(){
			var oldPage = page.content;
			var pageStateInterval = setInterval(function(){
				//Stop when page stops loading
				if(pageIsSame(oldPage, page.content)){
					console.log(page.content);
					clearInterval(pageStateInterval);
					// Exiting PhantomJS process
					phantom.exit();
				//Keep wait untill page loads or max wait time reached
				}else{
					//Stop after max timeout
					if(Date.now() > (TIMEOUT_MAX + pageOpenedAt)){
						console.log(page.content);
						clearInterval(pageStateInterval);
						// Exiting PhantomJS process
						phantom.exit();
					}else{
						oldPage = page.content;
					}
				}
			}, TIMEOUT_INTERVAL);
		}, TIMEOUT_INITIAL)
	}

});