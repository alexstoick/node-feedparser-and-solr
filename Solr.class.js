var solr_lib = require ('solr-client') ,
	events = require ( 'events' ) ;


module.exports = Solr ;


function Solr( HOST , PORT ) {
	events.EventEmitter.call(this);
	this.HOST = HOST ;
	this.PORT_SOLR = PORT ;
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

Solr.prototype.add = function ( object , callback ) {

	var self = this ;
	var client = self.client ;

	client.add ( object , callback ) ;

}

Solr.prototype.addCompleted = function ( error , response ) {

	if ( error )
		console.log ( error ) ;
	else
	{
		console.log ( 'Added to SOLR successfully' ) ;
	}

}