
var solr = require ('solr-client');

PORT_SOLR = 8983 ;
HOST = '192.168.1.103' ;

var solrClient = solr.createClient ( '127.0.0.1' , 8983 ) ;

solrClient.autoCommit = true ;

// Delete every document
solrClient.delete('id','*',function(err,obj){
   if(err){
   	console.log(err);
   }else{
   	console.log(obj);	
   }
}); 