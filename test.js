var Parser_lib = require ( './Parser.class' ) ;

//url = "http://www.hotnews.ro/rss/sport"
//url = "http://www.theverge.com/rss/index.xml" ;
//url = "http://feeds2.feedburner.com/thenextweb" ;
url="http://feeds.feedburner.com/TechCrunch/";
//url = "http://www.gsp.ro/rss.xml" ;
parser = new Parser_lib ( this ) ;

parser.request ( url ) ;
