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
set =  { url: 'abcurl' , title:'dayum_title' , text: 'uat' , description:'short summary' , created_at: date , updated_at: date } ;

connection.query ( query , set , function ( err , result ) { console.log ( result) ; })