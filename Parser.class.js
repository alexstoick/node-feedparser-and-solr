

var FeedParser = require('feedparser') ,
	request = require ( 'request') ;
var events = require('events') ;

module.exports = Parser;

function Parser ( current_instance ) {
	events.EventEmitter.call(this);
	this.current_instance = current_instance ;
	this.start = 0 ;
	this.articole = [] ;
}

// inherit events.EventEmitter
Parser.super_ = events.EventEmitter;
Parser.prototype = Object.create(events.EventEmitter.prototype, {
	constructor: {
		value: Parser,
		enumerable: false
	}
});

Parser.prototype.request = function ( url )
{
	var self = this ;

	request(url)
		.on('error', function (error) {
			self.emit ( 'errorUrl' ) ;
			console.log ( error ) ;
		})
		.pipe(new FeedParser())
		.on('error', function (error) {
			self.emit ( 'errorUrlNotFeed' ) ;
			console.log ( error ) ;
		})
		.on('meta', function (meta) {
			//console.log ( meta ) ;
			self.emit ( 'feedTitle' , meta.title ,( "http://www.google.com/s2/favicons?domain=" + meta["link"] ) ) ;
		}) ;

}
