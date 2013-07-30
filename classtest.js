module.exports = Test ;

Test.prototype = Object.create ( Test ) ;

var redis_lib = require ( 'node-redis' ) ;

function Test ()
{
	this.PORT = 6379 ;
	this.HOST = '192.168.1.103' ;
	this.redis = null ;
	this.redis = redis_lib.createClient ( this.PORT , this.HOST ) ;
	this.redis.on ( 'connect' , function () { console.log ( 'Connected to Redis') ; } ) ;
	this.redis.on('error', function (err) {
		console.log('Error ' + err);
	});
	this.text = "uat da fac";
}

Test.prototype.moarTest = function () {

	this.redis.exists ( 'lol' , function ( err ,res ) { console.log ( err + " " + res ) ; } ) ;
	console.log ( this.text ) ;
	console.log ( this.HOST ) ;
}