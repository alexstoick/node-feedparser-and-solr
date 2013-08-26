var express = require('express') ;
var app = express() ;

var Parser_lib = require ( './Parser.class' ) ;

app.listen ( 3500 ) ;
console.log ( 'Listening on port 3500' ) ;

app.get ( '/title' , function ( req , res ) {

	if ( req.query.url == null )
	{
		res.send ( 400 , 'Wrong parameters' ) ;
	}
	else
	{
		var parser = new Parser_lib ( this ) ;

		parser.on ( 'feedTitle' , function ( title ) {
			object = { "title" : title , "error" : null }
			res.send ( object ) ;
		} ) ;
		parser.on( 'errorUrl' , function () {
			object = { "error" : "Invalid URL" }
			res.send ( object ) ;
		})
		parser.on ( 'errorUrlNotFeed' , function () {
			object = { "error" : "URL is not a Feed" }
			res.send ( object ) ;
		})
		parser.request ( req.query.url ) ;

	}

});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});
