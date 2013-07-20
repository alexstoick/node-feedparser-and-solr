var solr = require ('solr-client');

PORT_REDIS = 6379 ;
PORT_SOLR = 8983 ;
HOST = '192.168.1.103' ;

var redis = require ( 'node-redis' ) ,
	client = redis.createClient ( PORT_REDIS , HOST ) ;

start = 100 ;
var articole = [] ;

var total = 0 ;
client.scard ( 'hotnews' , function ( err , reply ) { total = parseInt(reply) ; } ) ;


client.smembers ( 'hotnews' , function ( err , reply ) {

		if ( err )
			console.log ( err );
		else
		{
			reply.forEach(function (val, index) {

				client.hmget ( val , 'description' , 'url' , 'title' , procesareObiect ) ;

			} ) ;
		}
	});

function procesareObiect ( err , obj )
{

	// 0  - description
	// 1 - url
	// 2 - title
	++start ;
//	console.log ( obj[0].toString() ) ;
	description = obj[0].toString() ;
//	console.log ( obj[1].toString() ) ;
	url = obj[1].toString() ;
//	console.log ( obj[2].toString() ) ;
	title = obj[2].toString() ;

	var articol = {
		id: start ,
		content : description ,
		title : title ,
		url : url
	}

	articole.push ( articol ) ;
	//console.log ( articole.length ) ;
	if ( articole.length == total )
	{
		console.log ( 'win' ) ;
		addToSolr();
	}

}

function addToSolr ( )
{
	var solrClient = solr.createClient ( HOST, PORT_SOLR ) ;

	solrClient.autoCommit = true ;

	solrClient.add(articole,function(err,obj){
			if(err){
				console.log(err);
			}else{
				console.log(obj);
			}
		});

}

// var query2 = client.createQuery()
// 				   .q({content : '*pid*'});
// 				   //.fl('keywords') ;
// client.search(query2,function(err,obj){
//    if(err){
//    	console.log(err);
//    }else{
//    	console.log ( obj["response"]["docs"]) ;
//    }
// });
