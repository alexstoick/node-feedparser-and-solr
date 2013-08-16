var express = require('express') ;
var app = express() ;

var Main_lib = require ( './Main.class' ) ;
var Parser_lib = require ( './Parser.class' ) ;

var redis_lib = require ( 'node-redis' ) ;
var mysql_lib = require ( 'mysql' ) ;
var Solr_lib = require ( './Solr.class' ) ;

HOST = '37.139.8.146' ;

var solr = new Solr_lib( HOST , 8983 ) ;
solr.createClient();


var redis = redis_lib.createClient ( 6379, HOST ) ;
redis.on ( 'connect' , function () { console.log ( 'Connected to Redis') ; } ) ;
redis.on ( 'error', function (err) {
	console.log('RedisError ' + err);
});

var mysql = mysql_lib.createPool ({
	host: HOST ,
	user : 'root',
	passsword: 'Wireless123',
	database: 'stiriAPI',
	connectionLimit: 100
}) ;

app.listen ( 3000 ) ;
console.log ( 'Listening on port 3000' ) ;

app.get ( '/' , function ( req , res) {

	if ( req.query.feedId == null )
	{
		res.send ( 400 , 'Wrong parameters' ) ;
	}
	else
	{
		if ( req.query.date == null )
		{
			date = new Date() ;
			date.setHours( date.getHours() - 24 ) ;
		}
		else
			date = req.query.date ;

		var main = new Main_lib ( redis , mysql , solr , new Date ( date ) , req.query.feedId ) ;

		res.header("Content-Type", "application/json; charset=utf-8");

		main.makeRequest ( req.query.url  ) ;

		main.on ( 'finished' , function () {
			object = { "feedId": req.query.feedId , articles: main.articles } ;
			console.log ( main.articles.length ) ;
			console.log ( main.articles[0].date ) ;
			res.send( object );
		} ) ;
	}
});

app.get ( '/title' , function ( req , res ) {

	if ( req.query.url == null )
	{
		res.send ( 400 , 'Wrong parameters' ) ;
	}
	else
	{
		var parser = new Parser_lib ( this ) ;

		parser.on ( 'feedTitle' , function ( title ) {
			res.send ( title ) ;
		} ) ;
		parser.request ( req.query.url ) ;

	}

});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});
