
PORT = 6379 ;
HOST = '192.168.1.103' ;

var redis = require ( 'node-redis' ) ,
	client = redis.createClient ( PORT , HOST ) ;

var Parser = require ( './parser' ) ;

p = new Parser () ;

url = 'http://www.hotnews.ro/rss/'

p.request ( url )
 .on ( 'endParse' , function () { console.log ( p.start ) ; } ) ;

url = 'http://jurnalul.ro/rss/sport.xml'

 p.request ( url );