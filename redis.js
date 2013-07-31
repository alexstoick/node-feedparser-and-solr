var redis = require ('node-redis') ;

var client = redis.createClient ( 6379 , '37.139.8.146' )

// client.hset ( 'test' , 'abc' , '333') ;

 client.on ( 'connect' , function () { console.log ( 'Connected to Redis') ; } ) ;
// console.log ( client.hget ( 'test' ) ) ;

	client.on('error', function (err) {
		console.log('Error ' + err);
	});


	// client.hmset( 'id2', 'url' ,'fb.com' ) ;
	// client.hmset( 'id2', 'title' , 'facebook' ) ;
	// client.hmset( 'id2', 'description' , 'fucking shit' ) ;

	// client.hget ( 'id2' , 'url' , function ( err , obj) {
	// 	console.log ( obj.toString() ) ;
	// }) ;

	//client.sadd ( 'hotnews' , 'id1' , 'id2' )