events = require('events') ;

module.exports = Parser;

function Parser () {
	events.EventEmitter.call(this);
}

// inherit events.EventEmitter
Parser.super_ = events.EventEmitter;
Parser.prototype = Object.create(events.EventEmitter.prototype, {
	constructor: {
		value: Parser,
		enumerable: false
	}
});