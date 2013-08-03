var mysql = require ( 'mysql' ) ;

var connection_pool = mysql.createPool ({
	host: '37.139.8.146',
	user : 'root',
	passsword: 'Wireless123',
	database: 'stiriAPI'
}) ;

connection_pool.on ( 'error' , function ( err ) {
	console.log ( err.code ) ;
})

connection_pool.getConnection ( function ( err , mysql_con ) {

	connection = mysql_con ;

})

// connection.connect( function (err ) {
// 	if ( err )
// 		console.log ( err ) ;
// 	else
// 		console.log ( 'Connected to MySQL')
// } ) ;

// var date = new Date();
// query = 'INSERT INTO articles SET ?' ;
// set =  { url: 'abcurl' , title:'dayum_title' , text: 'uat' , description:'short summary' , created_at: date , updated_at: date } ;

// connection.query ( query , set , function ( err , result ) { console.log ( err ) ; })