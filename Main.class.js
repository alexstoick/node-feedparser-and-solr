
module.exports = Main  ;

var redis_lib = require ( 'node-redis' ) ;
var mysql_lib = require ( 'mysql' ) ;
var Solr_lib = require ( './Solr.class' ) ;
var Parser_lib = require ( './Parser.class' ) ;
var request = require ( 'request') ;
var events = require ( 'events' ) ;

Main.super_ = events.EventEmitter;
Main.prototype = Object.create(events.EventEmitter.prototype, {
	constructor: {
		value: Main,
		enumerable: false
	}
});


function Main ( currentDate )
{

	events.EventEmitter.call(this);
	this.PORT = 6379 ;
	this.HOST = '37.139.8.146' ;
	this.date = new Date();
	this.mysql_query = 'INSERT INTO articles SET ?' ;
	this.parserURL = 'http://37.139.8.146:8080/?url=' ;

	this.redis = null ;
	this.redis = redis_lib.createClient ( this.PORT , this.HOST ) ;
	this.redis.on ( 'connect' , function () { console.log ( 'Connected to Redis') ; } ) ;
	this.redis.on ( 'error', function (err) {
		console.log('Error ' + err);
	});

	this.mysql = mysql_lib.createConnection ({
		host: '37.139.8.146',
		user : 'root',
		passsword: 'Wireless123',
		database: 'stiriAPI'
	}) ;

	this.mysql.connect( function (err ) {
		if ( err )
			console.log ( err ) ;
		else
			console.log ( 'Connected to MySQL')
	} ) ;


	this.articles_proccessed = 0 ;
	this.parser = new Parser_lib ( this ) ;
	this.parser.on ( 'newArticle' , this.newArticle ) ;

	this.currentDate = currentDate ;

	console.log ( 'data creata:' + this.currentDate ) ;

	var p = this.parser ;
	var procesate = this.articles_proccessed ;
	var self = this ;

	this.parser.on ( 'endParse' , function () {
		self.count = p.articole.length ;
		console.log ( "Finished parsing " + self.count + " procesate:" + self.articles_proccessed ) ;
	}) ;


	this.solr = new Solr_lib() ;
	this.solr.createClient();

}

Main.prototype.makeRequest = function ( url )
{
	this.parser.request ( url ) ;
}

Main.prototype.newArticle = function ( url , title , description , pubDate ) {

	//console.log ( url + " " + title + " " + description ) ;
	var self = this.current_instance ;

	if ( self.currentDate < pubDate )
	{
		self.emit ( 'newArticleSinceUpdate' , url , title , description ) ;
	}

	self.redis.exists ( url , function ( err , res) {

		if ( res == 0 )
		{
			//key does not exist
			console.log ( 'Key does not exist' ) ;

			self.redis.set ( url , "processed" ) ;
			//get parserizer

			request.get ( self.parserURL + url , function ( err , response, body ) {
				console.log ( 'Request completed' ) ;
				self.addToSolrAndMySQL ( url , title , description , body , self ) ;
			}) ;

		}
		else
		{
			console.log ( 'Key exists. Skipping ... ' ) ;
			self.articles_proccessed ++ ;
			if ( self.articles_proccessed == self.count )
			{
				self.emit ( 'finished' ) ;
			}
		}

	} ) ;

}

Main.prototype.addToSolrAndMySQL = function ( url , title , description , response , instance )
{
	var self = instance ;
	parsed = JSON.parse ( response ) ;
	text = parsed ["response"] ;

	mysql_set =  { url: url , title: title , text: text , description: description , created_at: self.date , updated_at: self.date } ;
	solr_set  =  { url: url , title: title , content: text , description: description , last_modified: self.date}

	self.solr.add ( solr_set , function ( err , res ) {

		console.log ( 'Added to Solr') ;

		instance.articles_proccessed ++ ;
		console.log ( instance.articles_proccessed ) ;
		if ( instance.articles_proccessed == instance.count )
		{
			self.emit ( 'finished' ) ;
		}
	}) ;

	self.mysql.query ( self.mysql_query , mysql_set , function ( err , res ) {
		console.log ( "Added to MySQL" ) ;

	}) ;
}
