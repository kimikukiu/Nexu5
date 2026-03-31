#!/bin/bash

export PATH=$PATH:/etc/xcompile/i586/bin

i586-gcc -Os -D BOT_ARCH=\"x86\" -D X32 -Wl,--gc-sections -DDEBUG -fdata-sections -ffunction-sections -e __start -nostartfiles -static ~/dlr/main.c -o Helios
