
var express = require ( 'express' ) ;
var mysql_lib = require ( 'mysql') ;

var app = express () ;

var mysql = mysql_lib.createPool ({
	host: '37.139.8.146' ,
	user : 'root',
	passsword: 'Wireless123',
	database: 'stiriAPI',
	connectionLimit: 100
}) ;

date = '2013-08-22 00:00:00';
feed = 112 ;

app.listen ( 3500 ) ;

app.get ( '/' , function ( web_req , web_res ) {


	web_res.header("Content-Type", "application/json; charset=utf-8");

	if ( web_req.query.feedId == null )
	{
		res.send ( 400 , 'Wrong parameters' ) ;
	}

	feed = web_req.query.feedId ;

	if ( web_req.query.date == null )
		query = "SELECT DISTINCT url, title, text, created_at FROM articles WHERE `feed` = '"+feed+"' ORDER BY created_at DESC LIMIT 30" ;
	else
		query = "SELECT DISTINCT url, title, text, created_at FROM articles WHERE `created_at` > '"+web_req.query.date+"' AND `feed` = '"+feed+"' ORDER BY created_at DESC" ;

	mysql.getConnection ( function ( err , mysql_conn ) {

		var conn = mysql_conn;
		console.log ( 'got connection') ;

		conn.query ( query , function ( err , res ) {

			console.log ( err ) ;
			object = { "feedId": feed , "articles": res }
			web_res.send( object ) ;

		}) ;

	})

}) ;

