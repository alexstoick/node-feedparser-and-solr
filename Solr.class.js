var solr_lib = require ('solr-client') ,
	events = require ( 'events' ) ;


module.exports = Solr ;


function Solr() {
	events.EventEmitter.call(this);
	this.HOST = '37.139.8.146' ;
	this.PORT_SOLR = 8983 ;
	this.client = null ;
}

Solr.super_ = events.EventEmitter;
Solr.prototype = Object.create(events.EventEmitter.prototype, {
	constructor: {
		value: Solr,
		enumerable: false
	}
});

Solr.prototype.createClient = function () {

	var self = this ;
	self.client = solr_lib.createClient ( self.HOST , self.PORT_SOLR ) ;
	self.client.autoCommit = true ;
	console.log ( 'Created SOLR client' ) ;
}

Solr.prototype.add = function ( object , fct ) {

	var self = this ;
	var client = self.client ;

	client.add ( object , fct ) ;

}

Solr.prototype.addCompleted = function ( error , response ) {

	if ( error )
		console.log ( error ) ;
	else
	{
		console.log ( 'Added to SOLR successfully' ) ;
	}

}