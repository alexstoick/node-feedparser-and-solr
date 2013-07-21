var Parser = require ( './parser' ) ;

p = new Parser () ;

url = 'http://www.hotnews.ro/rss/'

p.request ( url )
 .on ( 'endParse' , function () { console.log ( 'not bad' ) ; } ) ;