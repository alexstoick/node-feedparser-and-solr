var Solr = require ( './solr.class' ) ;

o = new Solr() ;

o.createClient () ;

console.log (o.client.ping () ) ;