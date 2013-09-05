var mysql_lib = require ( 'mysql' ) ;
var async = require ( 'async' ) ;
var request = require ( 'request' ) ;

HOST = '37.139.26.80' ;

var mysql = mysql_lib.createPool ({
	host: HOST ,
	user : 'root',
	passsword: 'Wireless123',
	database: 'stiriAPI',
	connectionLimit: 250
}) ;



feeds = [{"url":"http://www.gsp.ro/rss.xml","id":112},{"url":"http://www.hotnews.ro/rss","id":113},{"url":"http://www.hotnews.ro/rss/sport","id":114},{"url":"http://www.hotnews.ro/rss/life","id":115},{"url":"http://www.hotnews.ro/rss/revista","id":116},{"url":"http://www.theverge.com/rss/index.xml","id":117},{"url":"http://www.adevarul.ro/rss/","id":118},{"url":"http://news.nationalgeographic.com/index.rss","id":119},{"url":"http://rss.nytimes.com/services/xml/rss/nyt/Sports.xml","id":120},{"url":"http://rss.cnn.com/rss/edition.rss","id":121},{"url":"http://rss.cnn.com/rss/edition_world.rss","id":122},{"url":"http://feeds2.feedburner.com/thenextweb","id":123},{"url":"http://feeds.feedburner.com/TechCrunch/","id":124},{"url":"http://www.antena3.ro/rss","id":125},{"url":"http://feeds.feedburner.com/prosport/zWZD","id":126},{"url":"http://www.sport.ro/rss","id":127},{"url":"http://marca.feedsportal.com/rss/portada.xml","id":128},{"url":"http://www.skysports.com/rss/0,20514,11827,00.xml","id":129},{"url":"http://feeds.foxnews.com/foxnews/scitech","id":130},{"url":"http://newsfeed.zeit.de/index","id":131},{"url":"http://feeds.feedburner.com/elise/simplyrecipes","id":132},{"url":"http://www.hackaday.com/rss.xml","id":133},{"url":"http://rss.news.yahoo.com/rss/topstories","id":134},{"url":"http://rssfeeds.usatoday.com/usatoday-NewsTopStories","id":135},{"url":"http://feeds.huffingtonpost.com/huffingtonpost/LatestNews","id":136},{"url":"http://www.guardian.co.uk/world/usa/rss","id":137},{"url":"http://feeds.feedburner.com/Inspiredtaste","id":138},{"url":"http://frozenroyalty.net/feed/","id":139},{"url":"http://feeds.arstechnica.com/arstechnica/index/","id":140},{"url":"http://www.techdirt.com/techdirt_rss.xml","id":141},{"url":"http://www.thinkgeek.com/thinkgeek.rss","id":142},{"url":"http://feeds.feedburner.com/TechViral","id":143},{"url":"http://www.engadget.com/rss.xml","id":144},{"url":"http://rss.cnn.com/rss/cnn_topstories.rss","id":145},{"url":"http://www.npr.org/rss/rss.php?id=1001","id":146},{"url":"http://feeds.abcnews.com/abcnews/topstories","id":147},{"url":"http://feeds.reuters.com/reuters/topNews?irpc=69","id":148},{"url":"http://www.rue89.com/homepage/feed","id":149},{"url":"http://www.lemonde.fr/rss/sequence/0,2-3208,1-0,0.xml","id":150},{"url":"http://newsrss.bbc.co.uk/rss/newsonline_world_edition/front_page/rss.xml","id":151},{"url":"http://www.elpais.com/rss/feed.html?feedId=1022","id":152},{"url":"http://rss.slashdot.org/Slashdot/slashdot","id":153},{"url":"http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml","id":154},{"url":"http://www.guardian.co.uk/rssfeed/0,,1,00.xml","id":155},{"url":"http://feeds.wired.com/wired/index","id":156},{"url":"http://ikeahacker.blogspot.com/feeds/posts/default","id":157},{"url":"http://www.instructables.com/tag/type:instructable/rss.xml","id":158},{"url":"http://www.adafruit.com/blog/feed/","id":159},{"url":"http://www.hellobrit.com/global/rss-feed/","id":160},{"url":"http://www.doityourself.com/rss","id":161},{"url":"http://feeds.popularmechanics.com/pm/blogs/automotive_news","id":162},{"url":"http://gofugyourself.celebuzz.com/atom.xml","id":163},{"url":"http://apair-andaspare.blogspot.com/feeds/posts/default","id":164},{"url":"http://www.livecreatingyourself.com/feeds/posts/default","id":165},{"url":"http://www.bettys.com.br/feed/","id":166},{"url":"http://www.i-do-it-yourself.com/feed/","id":167},{"url":"http://damonpoole.blogspot.com/feeds/posts/default","id":168},{"url":"http://feeds.feedburner.com/smittenkitchen","id":169},{"url":"http://feeds.homedepot.ca/rss/diy","id":170},{"url":"http://doityourselflady.blogspot.com/feeds/posts/default","id":171},{"url":"http://feeds.feedburner.com/food52-TheAandMBlog","id":172},{"url":"http://blog.foodnetwork.com/fn-dish/feed/","id":173},{"url":"http://www.loveandoliveoil.com/feed","id":174},{"url":"http://www.latartinegourmande.com/feed/","id":175},{"url":"http://chocolateandzucchini.com/index.rdf","id":176},{"url":"http://www.joythebaker.com/blog/feed/","id":177},{"url":"http://www.ourbestbites.com/feeds/posts/default","id":178},{"url":"http://www.saveur.com/rss_newrecipes.jsp","id":179},{"url":"http://bittersweetblog.wordpress.com/feed/","id":180},{"url":"http://www.acouplecooks.com/feed/","id":181},{"url":"http://feeds.feedblitz.com/delicieux","id":182},{"url":"http://www.davidlebovitz.com/archives/index.rdf","id":183},{"url":"http://www.101cookbooks.com/index.rdf","id":184},{"url":"http://feeds.gawker.com/deadspin/vip","id":185},{"url":"http://bleacherreport.com/articles/feed","id":186},{"url":"http://rss.cnn.com/rss/si_topstories.rss","id":187},{"url":"http://snowboarding.transworld.net/feed/","id":188},{"url":"http://sports.espn.go.com/espn/rss/news","id":189},{"url":"http://www.bruinsnation.com/atom/","id":190},{"url":"http://rss.news.yahoo.com/rss/sports","id":191},{"url":"http://feeds.feedburner.com/Angelswin","id":192},{"url":"http://www.ziplist.com/discovery/trending_recipes.rss?source=feedly","id":193},{"url":"http://www.westhesportsguy.com/feeds/posts/default","id":194},{"url":"http://snowboardmag.com/feed","id":195},{"url":"http://feeds.ibt.com/feeds/r35f8.rss","id":196},{"url":"http://feeds.feedburner.com/Grantland","id":197},{"url":"http://vimeo.com/channels/111750/videos/rss","id":198},{"url":"http://www.cnn.com/partners/google/si_topstories.rss","id":199},{"url":"http://www.takingbadschotz.com/?feed=rss2","id":200},{"url":"http://www.index.hr/sport/rss.ashx","id":201},{"url":"http://www.repubblica.it/rss/sport/rss2.0.xml","id":202},{"url":"http://feeds.feedburner.com/Techcrunch","id":203},{"url":"http://feeds.gawker.com/lifehacker/vip","id":204},{"url":"http://feeds.mashable.com/Mashable","id":205},{"url":"http://bits.blogs.nytimes.com/feed/","id":206},{"url":"http://www.theverge.com/rss/full.xml","id":207},{"url":"http://www.readwriteweb.com/rss.xml","id":208},{"url":"http://feeds.ibt.com/feeds/k1v75.rss","id":209},{"url":"http://feeds.gawker.com/gizmodo/full","id":210},{"url":"http://www.digitaltrends.com/feed/?key=f00edf6a58d2a8740e624dda919cab37","id":211},{"url":"http://feeds.boingboing.net/boingboing/iBag","id":212},{"url":"http://tech-book-store.amazon.com/blog/feed/recentPosts.rss","id":213},{"url":"http://www.theregister.co.uk/excerpts.rss","id":214},{"url":"http://feeds.ign.com/ign/games-all","id":215},{"url":"http://feeds.gawker.com/kotaku/vip","id":216},{"url":"http://www.wired.com/gamelife/feed/","id":217},{"url":"http://feeds.arstechnica.com/arstechnica/gaming/","id":218},{"url":"http://www.polygon.com/rss/index.xml","id":219},{"url":"http://tagn.wordpress.com/feed/","id":220},{"url":"http://www.indiegames.com/blog/atom.xml","id":221},{"url":"http://www.flesheatingzipper.com/feed/","id":222},{"url":"http://feeds.feedburner.com/RockPaperShotgun","id":223},{"url":"http://www.gamespot.com/misc/rss/gamespot_updates_news.xml","id":224},{"url":"http://www.miniclip.com/games/en/feed.xml","id":225},{"url":"http://www.gamespot.com/rss/game_updates.php","id":226},{"url":"http://ps3fanboy.com/rss.xml","id":227},{"url":"http://rss.1up.com/rss?x=1","id":228},{"url":"http://rss.gamespot.com/misc/rss/gamespot_updates_xbox_360.xml","id":229},{"url":"http://www.jeuxvideo.com/rss/rss-pc.xml","id":230},{"url":"http://feeds.wired.com/Gamelife","id":231},{"url":"http://gnn.gamer.com.tw/rss.xml","id":232},{"url":"http://gdata.youtube.com/feeds/base/users/GoProCamera/uploads?alt=rss","id":233},{"url":"http://gdata.youtube.com/feeds/base/users/JimmyKimmelLive/uploads?alt=rss","id":234},{"url":"http://www.gamespot.com/rss/game_updates.php?platform=5","id":235},{"url":"http://gdata.youtube.com/feeds/base/users/DiscoveryNetworks/uploads?alt=rss","id":236},{"url":"http://gdata.youtube.com/feeds/base/users/TEDtalksDirector/uploads?alt=rss","id":237},{"url":"http://gdata.youtube.com/feeds/base/users/NBA/uploads","id":238},{"url":"http://gdata.youtube.com/feeds/base/users/TheEllenShow/uploads?alt=rss","id":239},{"url":"http://gdata.youtube.com/feeds/base/users/redbull/uploads?alt=rss","id":240},{"url":"http://gdata.youtube.com/feeds/base/users/vsauce/uploads?alt=rss","id":241},{"url":"http://gdata.youtube.com/feeds/base/users/TheNewYorkTimes/uploads?alt=rss","id":242},{"url":"http://gdata.youtube.com/feeds/base/users/TheVerge/uploads?alt=rss","id":243},{"url":"http://gdata.youtube.com/feeds/base/users/GOODMagazine/uploads?alt=rss","id":244},{"url":"http://gdata.youtube.com/feeds/base/users/ESPN/uploads?alt=rss","id":245},{"url":"http://gdata.youtube.com/feeds/base/users/techcrunch/uploads?alt=rss","id":246},{"url":"http://gdata.youtube.com/feeds/base/standardfeeds/top_rated?client=ytapi-youtube-browse","id":247},{"url":"http://youtube.com/rss/global/top_viewed_today.rss","id":248},{"url":"http://gdata.youtube.com/feeds/base/standardfeeds/most_viewed?client=ytapi-youtube-browse","id":249},{"url":"http://youtubejpblog.blogspot.com/feeds/posts/default","id":250},{"url":"http://b.hatena.ne.jp/video/rss","id":251},{"url":"http://feeds.arstechnica.com/arstechnica/apple/","id":252},{"url":"http://daringfireball.net/index.xml","id":253},{"url":"http://www.maclife.com/articles/all/feed","id":254},{"url":"http://www.loopinsight.com/feed/","id":255},{"url":"http://feeds.feedburner.com/cultofmac/bFow","id":256},{"url":"http://appleinsider.com/rss/feedly_wwdc","id":257},{"url":"http://www.macrumors.com/macrumors.xml","id":258},{"url":"http://www.tuaw.com/rss.xml","id":259},{"url":"http://www.apple.com/main/rss/hotnews/hotnews.rss","id":260},{"url":"http://www.appleinsider.com/appleinsider.rss","id":261},{"url":"http://appleinsider.com/rss/feedly","id":262},{"url":"http://feeds.macrumors.com/MacRumors-All","id":263},{"url":"http://theappleblog.com/feed/","id":264},{"url":"http://images.apple.com/fr/main/rss/hotnews/hotnews.rss","id":265},{"url":"http://images.apple.com/jp/main/rss/hotnews/hotnews.rss","id":266},{"url":"http://www.macrumors.com/iphone/iphone.xml","id":267},{"url":"http://www.macrumors.com/page2.xml","id":268},{"url":"http://androidandme.com/feed/","id":269},{"url":"http://www.androidcentral.com/feed","id":270},{"url":"http://androidcommunity.com/feed/","id":271},{"url":"http://www.talkandroid.com/feed/","id":272},{"url":"http://android.appstorm.net/feed/","id":273},{"url":"http://www.androidguys.com/feed/","id":274},{"url":"http://phandroid.com/feed/","id":275},{"url":"http://benno.id.au/blog/feed/","id":276},{"url":"http://www.elandroidelibre.com/feed/","id":277},{"url":"http://www.helloandroid.com/rss.xml","id":278},{"url":"http://feeds.feedburner.com/elandroidelibre","id":279},{"url":"http://feeds.feedburner.com/Androidiani","id":280},{"url":"http://cultofandroid.com/feed/rss/","id":281},{"url":"http://www.androidpit.de/de/android/blog/subscribe/atom.xml","id":282},{"url":"http://www.xatakandroid.com/index.xml","id":283},{"url":"http://feeds2.feedburner.com/PlanetAndroidCom","id":284},{"url":"http://www.android-hk.com/feed/","id":285},{"url":"http://www.androidpolice.com/feed/","id":286},{"url":"http://feeds.feedburner.com/blogspot/hsDu","id":287},{"url":"http://www.penny-arcade.com/rss.xml","id":288},{"url":"http://cultofmac.com.feedsportal.com/c/33797/f/606249/index.rss","id":289}]
//feeds = [ { "url":"http://www.apple.com/main/rss/hotnews/hotnews.rss" , "id" : 260 } ]

//feeds = [ {	url: "http://www.gsp.ro/rss.xml", id: 112 } ]
//feeds = [ {	url: "http://feeds2.feedburner.com/thenextweb" , id: 123 } ]

contor = 0 ;
mysql_query = "UPDATE newssources SET image = "  ;

base_request_url = "http://localhost:3000/title?url=" ;

//console.log ( feeds.length ) ;

async.each ( feeds , processFeed , function ( err ) {
	if ( err )
		console.log ( 'async error ' + err ) ;
}) ;


function processFeed ( item , callback )
{

	var url = item["url"] ;
	var id = item["id"] ;
	var request_url = base_request_url + url ;

	request ( request_url , function ( err , response , body ) {
		if ( response.statusCode == 200 )
		{
			var parsed = JSON.parse ( body ) ;
			var image = parsed["image"] ;
			mysql.getConnection ( function ( err , conn ) {
				if ( err )
					console.log ( 'Cannot get connection ' + err ) ;
				else
				{
					//console.log ( image + " " + id ) ;
					if ( image == null )
					{
						contor ++ ;
						//console.log ( contor ) ;
					}
					else
					{
						//console.log ( image + " " + id ) ;
						var personal_query = mysql_query + "'" + image + "' WHERE id = " + id ;
						//console.log ( personal_query ) ;
						conn.query ( personal_query , function ( err , res ) {
							if ( err )
								console.log ( err ) ;
							// else
							// 	console.log ( res["message"] ) ;
							conn.release();
						}) ;
					}
				}
			}) ;
		}
	})
}