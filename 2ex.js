var express = require('express') ;
var app = express() ;

var Main_lib = require ( './refactor.class' ) ;


var redis_lib = require ( 'node-redis' ) ;
var mysql_lib = require ( 'mysql' ) ;
var Solr_lib = require ( './Solr.class' ) ;

HOST = '37.139.8.146' ;

var solr = new Solr_lib( HOST , 8983 ) ;
solr.createClient();


var redis = redis_lib.createClient ( 6379, HOST ) ;
redis.on ( 'connect' , function () { console.log ( 'Connected to Redis') ; } ) ;
redis.on ( 'error', function (err) {
	console.log('Redis Error ' + err);
});

var mysql = mysql_lib.createConnection ({
	host: HOST ,
	user : 'root',
	passsword: 'Wireless123',
	database: 'stiriAPI'
}) ;

mysql.connect( function (err ) {
	if ( err )
		console.log ( err ) ;
	else
		console.log ( 'Connected to MySQL')
} ) ;


app.listen ( 3000 ) ;
console.log ( 'Listening on port 3000' ) ;

app.get ( '/' , function ( req , res) {

	if ( req.query.date == null )
	{
		date = new Date() ;
		date.setHours( date.getHours() - 24 ) ;
	}
	else
		date = req.query.date ;

	var main = new Main_lib ( redis , mysql , solr , new Date ( date )) ;

	apelDelayed ( req.query.url , main ) ;

	main.parser.on ( 'endParse' , function () {
		object = { "feedId": req.query.feedId , articles: main.articles } ;
		//console.log ( main.articles.length ) ; 
		res.send( object );
	} ) ;

});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

function apelDelayed ( url , main )
{
 	setTimeout ( function () { main.makeRequest ( url ) ; } , 100 ) ;
}
