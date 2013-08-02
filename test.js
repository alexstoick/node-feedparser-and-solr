var Main_lib = require ( './Main.class' ) ;
var sleep = require ('sleep') ;

//url = 'http://www.hotnews.ro/rss/'

var links = [
				{"url": "http://www.theverge.com/rss/index.xml"},
			]

length = links.length ;

var articles = [] ;


var myDate = new Date();
myDate.setHours ( myDate.getHours() - 6 ) ;

var main = new Main_lib ( myDate ) ;



for ( i = 0 ; i < length ; ++ i )
{
	apelDelayed ( links[i]["url"] ) ;
}

function apelDelayed ( url )
{
 	setTimeout ( function () { main.makeRequest ( url ) ; } , 100 ) ;
}

main.parser.on ( 'endParse' , function () { console.log ( articles) ; } ) ;

main.on ( 'finished' , function () { console.log ( 'terminat de parsat' ) ; } ) ;

main.on ( 'newArticleSinceUpdate' , function ( url , title , description ) {
	article = { url: url , title: title , description: description } ;

	articles.push ( article ) ;
})