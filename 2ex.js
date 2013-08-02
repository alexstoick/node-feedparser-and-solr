var express = require('express') ;
var app = express() ;

var Main_lib = require ( './Main.class' ) ;



app.listen ( 3500 ) ;
console.log ( 'Listening on port 3500' ) ;

app.get ( '/' , function ( req , res) {

	var main = new Main_lib ( new Date ( req.query.date )) ;
	articles = [] ;

	apelDelayed ( req.query.url , main ) ;

	main.on ( 'newArticleSinceUpdate' , function ( url , title , description ) {
		article = { url: url , title: title , description: description } ;
		articles.push ( article ) ;
	}) ;

	main.parser.on ( 'endParse' , function () { res.send ( articles ) ; } ) ;


});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

function apelDelayed ( url , main )
{
 	setTimeout ( function () { main.makeRequest ( url ) ; } , 100 ) ;
}
