
// PORT = 6379 ;
// HOST = '192.168.1.103' ;

// var redis = require ( 'node-redis' ) ,
// 	client = redis.createClient ( PORT , HOST ) ;

var Solr = require ( './solr.class' ) ;
c = new Solr() ;
c.createClient();

var Parser = require ( './parser.class' ) ;

p = new Parser () ;
p.on ( 'endParse' , parseEnded ) ;//function () { console.log ( 'Number of articles: ' + p.articole.length ) ; } ) ;

url = 'http://www.hotnews.ro/rss/'
p.request ( url ) ;


function parseEnded ()
{
//	c.on ( 'solrAddCompleted' , function () { console.log ( 'uat' ) ; } ) ;
	console.log ( p.articole.length ) ;
	c.add ( p.articole ) ;
}

// url = 'http://jurnalul.ro/rss/sport.xml'
// p.request ( url );

// url = 'http://www.hotnews.ro/rss/economie'
// p.request ( url ) ;

// url = 'http://www.hotnews.ro/rss/sport'
// p.request ( url ) ;

// url = 'http://jurnalul.ro/rss/bani-afaceri.xml'
// p.request ( url ) ;