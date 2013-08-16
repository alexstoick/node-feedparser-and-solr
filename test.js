var Parser_lib = require ( './Parser.class' ) ;

url = "http://www.hotnews.ro/rss/sport"
//url = "http://www.theverge.com/rss/index.xml" ;
parser = new Parser_lib ( this ) ;

parser.request ( url ) ;
