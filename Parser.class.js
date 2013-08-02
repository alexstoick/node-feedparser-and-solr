

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

	self.startDate = new Date() ;

	request(url)
		.on('error', function (error) {
			console.error(error);
		})
		.pipe(new FeedParser())
		.on('error', function (error) {
			console.error(error);
		})
		.on('meta', function (meta) {
			console.log ( 'Feed title:  ' + meta.title ) ;
		})
		.on('readable', function() {
			var stream = this, item;
			while (item = stream.read()) {

				var articol = {
						description : item.description , //content for SOLR
						title : item.title ,
						url : item.link
					}
				self.articole.push ( articol ) ;
				self.emit ( 'newArticle' , item.link , item.title , item.description , item.pubDate ) ;
				self.start ++ ;

			}
		})
		.on('end' , function () { self.emmitRequestFinished(self) } );

		return self;
}

Parser.prototype.emmitRequestFinished = function ( parent )
{
	var self = parent ;
	self.end = new Date() ;
	console.log ( "Duration: "  + (self.end - self.startDate) ) ;
	self.emit ( 'endParse' ) ;
}
