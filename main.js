
url = 'http://www.hotnews.ro/rss/'
title = 'hotnews' ;

var start = new Date();

PORT = 6379 ;
HOST = '192.168.1.103' ;

var FeedParser = require('FeedParser') ,
	request = require ( 'request') ,
	redis = require ( 'node-redis' ) ,
	client = redis.createClient ( PORT , HOST ) ;

id = 0;

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

			id ++ ;

			// console.log('Got article: %s', id.toString() ) ; //item.link ) ; //item.title || item.description);

			key = "id" + id.toString() ;

			// client.hmset ( key , 'url' , item.link ) ;
			// client.hmset ( key , 'title' , item.title ) ;
			// client.hmset ( key , 'description' , item.description ) ;

			// client.sadd ( title , key ) ;
		}
	})
	.on('end' , requestFinished );


function requestFinished()
{
	end = new Date() ;

	console.log ( "It all took from completed:" + (end - start) ) ;
}

end = new Date() ;
console.log ( "It all took:" + (end - start) ) ;
