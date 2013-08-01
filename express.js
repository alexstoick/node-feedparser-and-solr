var express = require('express') ;
var app = express() ;

var Main_lib = require ( './Main.class' ) ;

var main = new Main_lib ( ) ;

app.listen ( 3000 ) ;
console.log ( 'Listening on port 3000' ) ;

app.get ( '/' , function ( req , res) {

	main.parser.articole = [] ;
	console.log ( req.query.url ) ;
	apelDelayed ( req.query.url ) ;
	main.parser.on ( 'endParse' , function () { res.send ( main.parser.articole ) ; } ) ;
	//res.send ( 'request ok') ;

});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

function apelDelayed ( url )
{
 	setTimeout ( function () { main.makeRequest ( url ) ; } , 100 ) ;
}
