var Main_lib = require ( './main.class' ) ;
var sleep = require ('sleep') ;

var main = new Main_lib ( ) ;

url = 'http://www.hotnews.ro/rss/'

setTimeout ( apelDelayed , 100 ) ;

function apelDelayed ()
{
	main.makeRequest ( url ) ;
}
