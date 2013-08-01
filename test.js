var Main_lib = require ( './Main.class' ) ;
var sleep = require ('sleep') ;

var main = new Main_lib ( ) ;

//url = 'http://www.hotnews.ro/rss/'

var links = [
				{"url": "http://www.hotnews.ro/rss/revista"},
				{"url": "http://www.hotnews.ro/rss/"} ,
				{"url": "http://www.hotnews.ro/rss/revista"},
				{"url": "http://www.hotnews.ro/rss/english"},
				{"url": "http://www.gsp.ro/rss.xml"}
			]

length = links.length ;

for ( i = 0 ; i < length ; ++ i )
{
	console.log ( links[i]["url"] ) ;
	apelDelayed ( links[i]["url"] ) ;
}

function apelDelayed ( url )
{
 	setTimeout ( function () { main.makeRequest ( url ) ; } , 100 ) ;
}
