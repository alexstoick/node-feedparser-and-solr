
PORT = 6379 ;
HOST = '192.168.1.103' ;

var redis_lib = require ( 'node-redis' ) ;
var mysql_lib = require ( 'mysql' ) ;
var Solr_lib = require ( './solr.class' ) ;
var Parser_lib = require ( './parser.class' ) ;
var request = require ( 'request') ;

var parser = new Parser_lib () ;
var	redis = redis_lib.createClient ( PORT , HOST ) ;
var solr = new Solr_lib() ;
var mysql = mysql_lib.createConnection ({
	host: 'localhost',
	user : 'root',
	passsword: '',
	database: 'stiriAPI'
}) ;


redis.on('error', function (err) {
	console.log('Error ' + err);
});


solr.createClient();

mysql.connect( function (err ) {
	if ( err )
		console.log ( err ) ;
	else
		console.log ( 'Connected to MySQL')
} ) ;


var date = new Date();
mysql_query = 'INSERT INTO articles SET ?' ;

//parserURL = 'http://localhost:4567/?url=' ;
parserURL = 'http://192.168.1.103:8080/?url=' ;

parser.on ( 'newArticle' , newArticle ) ;
parser.on ( 'endParse' , function () { console.log ( "Finished parsing" ) ; }) ;

//url = 'http://jurnalul.ro/rss/sport.xml'
url = 'http://jurnalul.ro/rss' ;
//url = 'http://www.hotnews.ro/rss/economie' ;
//url = 'http://www.hotnews.ro/rss/'

parser.request ( url ) ;




function newArticle ( url , title , description )
{
	redis.exists ( url , function ( err , res) {

		if ( res == 0 )
		{
			//key does not exist
			console.log ( 'Key does not exist' ) ;

			//get parserizer

			request.get ( parserURL + url , function ( err , response, body ) {
				console.log ( 'Request completed' ) ;
				addToSolrAndMySQL ( url , title , description , body ) ;
			}) ;


		}
		else
		{
			console.log ( 'Key exists. Skipping ... ' ) ;
		}

	} ) ;
}

function addToSolrAndMySQL ( url , title , description , response )
{
	parsed = JSON.parse ( response ) ;
	text = parsed ["response"] ;

	mysql_set =  { url: url , title: title , text: text , description: description , created_at: date , updated_at: date } ;
	solr_set  =  { url: url , title: title , content: text , description: description }

	mysql.query ( mysql_query , mysql_set , function ( err , res) {
		solr_set["id"] = res.insertId ;
		redis.set ( url , res.insertId ) ;
		solr.add ( solr_set ) ;
	}) ;
}
