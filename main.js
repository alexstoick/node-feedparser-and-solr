
PORT = 6379 ;
HOST = '192.168.1.103' ;

var redis = require ( 'node-redis' ) ,
	client = redis.createClient ( PORT , HOST ) ;

var Parser = require('./parser') ;

var p = new Parser() ;

uat.on ( 'endParse' , function () { console.log ( 'not bad' ) ; } ) ;
var uat = p.request ( url ) ;




