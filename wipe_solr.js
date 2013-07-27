
var solr = require ('solr-client');

PORT_SOLR = 8983 ;
HOST = '192.168.1.102' ;

var solrClient = solr.createClient ( HOST  , PORT_SOLR ) ;

solrClient.autoCommit = true ;

// Delete every document
solrClient.delete('id','*',function(err,obj){
   if(err){
   	console.log(err);
   }else{
   	console.log(obj);
   }
});