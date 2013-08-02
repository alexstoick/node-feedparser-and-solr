
module.exports = Main  ;

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


function Main ( redis , mysql , solr , currentDate )
{

	events.EventEmitter.call(this);

	this.date = new Date();
	this.mysql_query = 'INSERT INTO articles SET ?' ;
	this.parserURL = 'http://37.139.8.146:8080/?url=' ;

	this.redis = redis ;
	this.solr = solr ;
	this.mysql = mysql ;

	this.parser = new Parser_lib ( this ) ;
	this.articles_proccessed = 0 ;
	this.parser.on ( 'newArticle' , this.newArticle ) ;

	this.currentDate = currentDate ;
	this.articles = [] ;

}

Main.prototype.makeRequest = function ( url )
{
	this.parser.request ( url ) ;
}

Main.prototype.newArticle = function ( url , title , description , pubDate ) {

	var self = this.current_instance ;

	if ( self.currentDate < pubDate )
	{
		article = { url: url , title: title , description: description } ;
		self.articles.push ( article ) ;
		self.emit ( 'newArticleSinceUpdate' , url , title , description ) ;
	}

	self.redis.exists ( url , function ( err , res) {

		if ( res == 0 )
		{
			//Setup key in redis
			self.redis.set ( url , 'updated' ) ;

			//get parserizer
			request.get ( self.parserURL + url , function ( err , response, body ) {
				if ( err )
					console.log ( 'request error' + err ) ;
				self.addToSolrAndMySQL ( url , title , description , body , self ) ;
			}) ;

		}
		else
		{
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

		instance.articles_proccessed ++ ;
		if ( instance.articles_proccessed == instance.count )
		{
			self.emit ( 'finished' ) ;
		}
	}) ;

	self.mysql.query ( self.mysql_query , mysql_set , function ( err , res ) {
		//mysql callback
		if ( err )
			console.log ( err ) ;
	}) ;
}
