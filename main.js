
PORT = 6379 ;
HOST = '192.168.1.102' ;

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
	database: 'stiriapi'
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
query = 'INSERT INTO articles SET ?' ;



parserURL = 'http://localhost:4567/?url=' ;

parser.on ( 'endParse' , parseEnded ) ;//function () { console.log ( 'Number of articles: ' + parser.articole.length ) ; } ) ;
parser.on ( 'newArticle' , newArticle ) ;

//url = 'http://www.hotnews.ro/rss/'
url = 'http://localhost/test.xml'
parser.request ( url ) ;




function newArticle ( url , title , description )
{
	set =  { url: url , title: title , text: 'uat uat' , description: description , created_at: date , updated_at: date } ;

	redis.exists ( url , function ( err , res) {

		if ( res == 0 )
		{
			//key does not exist
			console.log ( 'Key does not exist' ) ;

			//get parserizer

			url = 'http://sport.hotnews.ro/stiri-fotbal-15206485-tas-rapid-ramane-liga-1-cererea-concordiei-fost-respinsa.htm' ;
			request.get ( parserURL + url , function ( err , response, body ) { console.log ( err + " " + response + " " + body ) ; } ) ;

		}
		else
		{
			console.log ( 'Key exists. Skipping ... ' ) ;
		}

	} ) ;

	//connection.query ( query , set ) ; // function ( err , result ) { console.log ( result) ; })
}


function processRedisResponse ( err , res )
{
	if ( res == 0 )
	{
		//key does not exist
		console.log ( 'Key does not exist' ) ;

		redis.set ( )

	}
	else
	{
		console.log ( 'Key exists. Skipping ... ' ) ;
	}
}

function parseEnded ()
{
//	c.on ( 'solrAddCompleted' , function () { console.log ( 'uat' ) ; } ) ;
//	console.log ( parser.articole.length ) ;
//	c.add ( parser.articole ) ;
}

// url = 'http://jurnalul.ro/rss/sport.xml'
// parser.request ( url );

// url = 'http://www.hotnews.ro/rss/economie'
// parser.request ( url ) ;

// url = 'http://www.hotnews.ro/rss/sport'
// parser.request ( url ) ;

// url = 'http://jurnalul.ro/rss/bani-afaceri.xml'
// parser.request ( url ) ;

