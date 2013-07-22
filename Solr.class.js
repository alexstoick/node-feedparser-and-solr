var solr_lib = require ('solr-client') ,
	events = require ( 'events' ) ;


module.exports = Solr ;


function Solr() {
	events.EventEmitter.call(this);
	this.HOST = '127.0.0.1' ;
	this.PORT_SOLR = 8983 ;
	this.client = null ;
}


// inherit events.EventEmitter
Solr.super_ = events.EventEmitter;
Solr.prototype = Object.create(events.EventEmitter.prototype, {
	constructor: {
		value: Solr,
		enumerable: false
	}
});

Solr.prototype.createClient = function () {

	var self = this ;
	this.client = solr_lib.createClient ( self.HOST , self.PORT_SOLR ) ;

}

Solr.prototype.add = function ( object ) {

	var self = this ;
	var client = self.client ;


	client.autoCommit = true ;
	client.add ( object , self.addCompleted ) ;

}

Solr.prototype.addCompleted = function ( error , response ) {

	var self = this ;

	if ( error )
		console.log ( error ) ;
	else
	{
		self.emmit ( 'solrAddCompleted' ) ;
		console.log ( 'Objects added to solr successfully' ) ;
	}

}

Solr.prototype.wipe = function () {
	var self = this ;
	var client = self.client ;

	client.delete ( 'id' , '*' , self.wipeCompleted ) ;
}

Solr.prototype.wipeCompleted = function ( error , response ) {

	if ( error )
	{
		console.log ( error ) ;
	}
	else
	{
		console.log ( 'Wiped data from Solr successfully' ) ;
		self.emmit ( 'wipeCompleted' ) ;
	}

}