
url = 'http://www.hotnews.ro/rss/'
title = 'hotnews' ;


var FeedParser = require('FeedParser') ,
	request = require ( 'request') ;
var events = require('events') ;

module.exports = Parser;

function Parser () {
	events.EventEmitter.call(this);
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
	//self.start = 0 ;
	self.startDate = new Date() ;

	request(url)
		.on('error', function (error) {
		console.error(error);
		})
		.on('complete', function () { requestFinished() ; } )
		.pipe(new FeedParser())
		.on('error', function (error) {
			console.error(error);
		})
		.on('meta', function (meta) {
			self.title = meta.title ;
			console.log('===== %s =====', meta.title);
		})
		.on('readable', function() {
			var stream = this, item;
			while (item = stream.read()) {

				var articol = {
						id: self.start ,
						description : item.description , //content for SOLR
						title : item.title ,
						url : item.link
					}

				self.articole.push ( articol ) ;
				self.emit ( 'newArticle' , item.link , item.title , item.description ) ;
				self.start ++ ;

			}
		})
		.on('end' , function () { self.emmitRequestFinished(self) } );

		return self;
}

Parser.prototype.emmitRequestFinished = function ( parent )
{
	var self = parent ;
	self.emit ( 'endParse' ) ;
	self.end = new Date() ;

	console.log ( "Duration: "  + (self.end - self.startDate) ) ;
}
