var express = require('express') ;
var app = express() ;


app.listen ( 3000 ) ;
console.log ( 'Listening on port 3000' ) ;

app.get ( '/' , function ( req , res) {

	console.log ( req.query.url ) ;

});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});