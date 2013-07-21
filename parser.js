
url = 'http://www.hotnews.ro/rss/'
title = 'hotnews' ;


var FeedParser = require('FeedParser') ,
	request = require ( 'request') ;

Parser.prototype.request = function ( url )
{
	var self = this ;
	var self.startDate = new Date() ;

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
			console.log('===== %s =====', meta.title);
		})
		.on('readable', function() {
			var stream = this, item;
			while (item = stream.read()) {

				this.id ++ ;

				// console.log('Got article: %s', id.toString() ) ; //item.link ) ; //item.title || item.description);

				//key = "id" + id.toString() ;

				// client.hmset ( key , 'url' , item.link ) ;
				// client.hmset ( key , 'title' , item.title ) ;
				// client.hmset ( key , 'description' , item.description ) ;

				// client.sadd ( title , key ) ;
			}
		})
		.on('end' , self.emmitRequestFinished );

		return self;
}


Parser.prototype.emmitRequestFinished = function ( )
{
	var self = this ;
	self.emit ( 'endParse' ) ;
	self.requestFinished();
}

Parser.prototype.requestFinished = function ()
{
	var self = this ;
	var self.end = new Date() ;

	console.log ( "It all took from completed:" + (self.end - self.startDate) ) ;
}
