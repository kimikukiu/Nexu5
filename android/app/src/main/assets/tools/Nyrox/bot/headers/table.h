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

#define TABLE_DOMAIN			1
#define TABLE_SCAN_DOMAIN		2

#define TABLE_EXEC_SUCCESS		3

#define TABLE_KILLER_PROC		4
#define TABLE_KILLER_EXE		5
#define TABLE_KILLER_FD			6
#define TABLE_KILLER_TCP		7
#define TABLE_KILLER_MAPS		8
#define TABLE_MAPS_APEX         9
#define TABLE_MAPS_LIGHT        10
#define TABLE_MAPS_TSUNAMI      11
#define TABLE_RANDOM            12

#define TABLE_MAX_KEYS			13

void table_init(void);
void table_unlock_val(uint8_t);
void table_lock_val(uint8_t); 
char *table_retrieve_val(int, int *);

static void add_entry(uint8_t, char *, int);
static void toggle_obf(uint8_t);
