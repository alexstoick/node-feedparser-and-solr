
// PORT = 6379 ;
// HOST = '192.168.1.103' ;

// var redis = require ( 'node-redis' ) ,
// 	client = redis.createClient ( PORT , HOST ) ;

// var Solr = require ( './solr.class' ) ;
// c = new Solr() ;
// c.createClient();

var mysql = require ( 'mysql' ) ;
var connection = mysql.createConnection ({
	host: 'localhost',
	user : 'root',
	passsword: '',
	database: 'stiriapi'
}) ;
connection.connect( function (err ) {
	if ( err )
		console.log ( err ) ;
	else
		console.log ( 'Connected to MySQL')
} ) ;

var date = new Date();

query = 'INSERT INTO articles SET ?' ;


var Parser = require ( './parser.class' ) ;

p = new Parser () ;
p.on ( 'endParse' , parseEnded ) ;//function () { console.log ( 'Number of articles: ' + p.articole.length ) ; } ) ;
p.on ( 'newArticle' , newArticle ) ;

url = 'http://www.hotnews.ro/rss/'
p.request ( url ) ;




function newArticle ( url , title , description )
{
	set =  { url: url , title: title , text: 'uat uat' , description: description , created_at: date , updated_at: date } ;
	connection.query ( query , set ) ; // function ( err , result ) { console.log ( result) ; })
}

function parseEnded ()
{
//	c.on ( 'solrAddCompleted' , function () { console.log ( 'uat' ) ; } ) ;
//	console.log ( p.articole.length ) ;
connection.query ( query , p.articole ) ;
//	c.add ( p.articole ) ;
}

url = 'http://jurnalul.ro/rss/sport.xml'
p.request ( url );

url = 'http://www.hotnews.ro/rss/economie'
p.request ( url ) ;

url = 'http://www.hotnews.ro/rss/sport'
p.request ( url ) ;

url = 'http://jurnalul.ro/rss/bani-afaceri.xml'
p.request ( url ) ;

