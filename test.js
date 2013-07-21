// var events = require('events');

// function Door(colour) {
// 	this.colour = colour;
// 	events.EventEmitter.call(this);
// 	this.open = function()
// 	{
// 		this.emit('open');
// 	}
// }

// Door.prototype.__proto__ = events.EventEmitter.prototype;
// var frontDoor = new Door('brown');
// frontDoor.on('open', function() {
// 		console.log('ring ring ring');
// 	});

// frontDoor.open();

var parser = require ( './parser' ) ;

p = new Parser () ;

url = 'http://www.hotnews.ro/rss/'

p.requst ( url )
 .on ( 'endParse' , function () { console.log ( 'not bad' ) ; } ) ;